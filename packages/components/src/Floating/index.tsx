import {
  createContext,
  Signal,
  signal,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "kaioken"
import { Slot } from "../Slot"
import {
  autoUpdate,
  Boundary,
  computePosition,
  flip,
  offset,
  Placement,
} from "@floating-ui/dom"

//////////////////
// Floating Root
//////////////////

export type RootProps = {
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

export const FloatingContext = createContext<{
  anchorRef: Kaioken.RefObject<HTMLElement>
  popoverRef: Kaioken.RefObject<HTMLElement>
  side: Placement
  sideGap: number
  avoidCollisions: boolean
  collisionBoundary: CollisionBoundary
  collisionPadding: number
  disablePopover: boolean
} | null>(null)
FloatingContext.displayName = "Floating.Context"

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
Root.displayName = "Floating.Root"

///////////////////
// Floating Anchor
///////////////////

export const Anchor: Kaioken.FC = (props) => {
  const floatingContext = useContext(FloatingContext)

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Anchor")
    return props.children
  }

  return <Slot ref={floatingContext.anchorRef}>{props.children}</Slot>
}
Anchor.displayName = "Floating.Anchor"

///////////////////
// Floating Content
///////////////////

type ContentProps = {
  placement?: Signal<Placement>
}

export const Content: Kaioken.FC<ContentProps> = (props) => {
  const floatingContext = useContext(FloatingContext)
  const x = signal<number | null>(null, "x")
  const y = signal<number | null>(null, "y")

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
          const {
            x: _x,
            y: _y,
            placement: _placement,
          } = await computePosition(
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
          x.value = _x
          y.value = _y
          if (props.placement) {
            props.placement.value = _placement
          }

          floatingContext.popoverRef.current.style.setProperty(
            "position",
            "fixed"
          )
          floatingContext.popoverRef.current.style.setProperty(
            "top",
            `var(--kaioken-core-floating-top, ${y.value}px)`
          )
          floatingContext.popoverRef.current.style.setProperty(
            "left",
            `var(--kaioken-core-floating-left, ${x.value}px)`
          )
        }
      }
    )

    return () => {
      cleanup()
    }
  }, [
    floatingContext?.popoverRef.current,
    floatingContext?.anchorRef.current,
    floatingContext?.side,
    floatingContext?.avoidCollisions,
    accessCollisionBoundary(floatingContext?.collisionBoundary),
    floatingContext?.collisionPadding,
  ])

  useEffect(() => {
    if (
      floatingContext?.popoverRef.current &&
      floatingContext.disablePopover === false
    ) {
      floatingContext?.popoverRef.current.showPopover()
    }
  }, [floatingContext?.popoverRef.current, floatingContext?.disablePopover])

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Content")
    return props.children
  }

  return (
    <Slot
      popover={floatingContext.disablePopover ? null : "manual"}
      ref={floatingContext.popoverRef}
      style={{
        position: "fixed",
        top: `var(--kaioken-core-floating-top, ${y.value}px)`,
        left: `var(--kaioken-core-floating-left, ${x.value}px)`,
      }}
    >
      {props.children}
    </Slot>
  )
}
Content.displayName = "Floating.Content"
