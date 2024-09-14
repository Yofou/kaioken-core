import { createContext, useContext, useEffect, useMemo, useRef } from "kaioken"
import { Slot } from "../Slot"
import {
  autoUpdate,
  Boundary,
  computePosition,
  flip,
  offset,
  Placement,
} from "@floating-ui/dom"

type RootProps = {
  side?: Placement
  sideGap?: number
  avoidCollisions?: boolean
  collisionBoundary?: CollisionBoundary
  collisionPadding?: number
  disablePopover?: boolean
}

type ConvertBoundaryToRef<T extends Boundary> = T extends string
  ? T
  : Kaioken.MutableRefObject<T | null>
type CollisionBoundary = ConvertBoundaryToRef<Boundary>
const accessCollisionBoundary = (
  value?: CollisionBoundary
): Boundary | null | undefined => {
  if (value == null || typeof value === "string") {
    return value
  }

  return value.current
}

const FloatingContext = createContext<{
  anchorRef: Kaioken.RefObject<HTMLElement>
  popoverRef: Kaioken.RefObject<HTMLElement>
  side: Placement
  sideGap: number
  avoidCollisions: boolean
  collisionBoundary: CollisionBoundary
  collisionPadding: number
  disablePopover: boolean
} | null>(null)

export const Root: Kaioken.FC<RootProps> = (props) => {
  const anchorRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const value = useMemo(() => {
    return {
      anchorRef,
      popoverRef,
      side: props.side ?? "bottom",
      sideGap: props.sideGap ?? 0,
      avoidCollisions: props.avoidCollisions ?? true,
      collisionBoundary: props.collisionBoundary ?? "clippingAncestors",
      collisionPadding: props.collisionPadding ?? 0,
      disablePopover: props.disablePopover ?? false,
    }
  }, [
    props.side,
    props.sideGap,
    props.avoidCollisions,
    accessCollisionBoundary(props.collisionBoundary),
  ])

  return (
    <FloatingContext.Provider value={value}>
      {props.children}
    </FloatingContext.Provider>
  )
}

export const Anchor: Kaioken.FC = (props) => {
  const floatingContext = useContext(FloatingContext)

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Anchor")
    return props.children
  }

  return <Slot ref={floatingContext.anchorRef}>{props.children}</Slot>
}

export const Content: Kaioken.FC = (props) => {
  const floatingContext = useContext(FloatingContext)

  useEffect(() => {
    if (
      floatingContext?.popoverRef.current &&
      floatingContext.disablePopover === false
    ) {
      floatingContext?.popoverRef.current.showPopover()
    }
  }, [floatingContext?.popoverRef.current, floatingContext?.disablePopover])

  useEffect(() => {
    if (
      !floatingContext ||
      !floatingContext.anchorRef.current ||
      !floatingContext.popoverRef.current
    ) {
      return
    }

    const cleanup = autoUpdate(
      floatingContext.anchorRef.current,
      floatingContext.popoverRef.current,
      async () => {
        if (
          floatingContext.anchorRef.current &&
          floatingContext.popoverRef.current
        ) {
          const { x, y } = await computePosition(
            floatingContext.anchorRef.current,
            floatingContext.popoverRef.current,
            {
              strategy: "fixed",
              placement: floatingContext.side,
              middleware: [
                offset(floatingContext.sideGap),
                floatingContext.avoidCollisions &&
                  flip({
                    boundary:
                      accessCollisionBoundary(
                        floatingContext.collisionBoundary
                      ) ?? undefined,
                    padding: floatingContext.collisionPadding,
                  }),
              ],
            }
          )

          Object.assign(floatingContext.popoverRef.current.style, {
            position: "fixed",
            top: `var(--kaioken-components-floating-top, ${y}px)`,
            left: `var(--kaioken-components-floating-left, ${x}px)`,
          })
        }
      }
    )

    return () => cleanup()
  }, [
    floatingContext?.popoverRef.current,
    floatingContext?.anchorRef.current,
    floatingContext?.side,
    floatingContext?.avoidCollisions,
    accessCollisionBoundary(floatingContext?.collisionBoundary),
    floatingContext?.collisionPadding,
  ])

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Content")
    return props.children
  }

  return (
    <Slot
      popover={floatingContext.disablePopover ? null : "manual"}
      ref={floatingContext.popoverRef}
    >
      {props.children}
    </Slot>
  )
}
