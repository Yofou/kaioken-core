import {
  createContext,
  Signal,
  signal,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "kaioken"
import * as Floating from "../Floating"
import * as KeyboardStack from "../KeyboardStack"
import { Slot } from "../Slot"
import { convexHull, getCorners, isPointInConvexPolygon } from "./utils"
import { KeyboardContext, useAwareKeyDown } from "../utils"

//////////////////
// Tooltip Root
//////////////////

const TooltipContext = createContext<{
  open: Signal<boolean>
  tooltipRef: Kaioken.MutableRefObject<number | null>
  disableEsc: boolean
} | null>(null)
TooltipContext.displayName = "Tooltip.Context"

export { TooltipContext as Context }

type RootProps = Floating.RootProps & {
  open?: Signal<boolean>
  disableEsc?: boolean
}

export const Root: Kaioken.FC<RootProps> = (props) => {
  const { open, ...floatingProps } = props
  const _internalOpen = signal(false)
  const tooltipRef = useRef<number | null>(null)
  const tooltip = useMemo(() => {
    return {
      open: open ?? _internalOpen,
      tooltipRef,
      disableEsc: props.disableEsc ?? false,
    }
  }, [open, props.disableEsc])

  useEffect(() => {
    return () => {
      if (tooltipRef.current != null) {
        window.clearTimeout(tooltipRef.current)
      }
    }
  }, [])

  return (
    <Floating.Root {...floatingProps}>
      <KeyboardStack.Root __dev="Tooltip" immediate={false}>
        <TooltipContext.Provider value={tooltip}>
          {props.children}
        </TooltipContext.Provider>
      </KeyboardStack.Root>
    </Floating.Root>
  )
}
Root.displayName = "Tooltip.Root"

//////////////////
// Tooltip Trigger
//////////////////

type TriggerProps = {
  disablePointerEnter?: boolean
  disablePointerLeave?: boolean
}
export const Trigger: Kaioken.FC<TriggerProps> = (props) => {
  const tooltipContext = useContext(TooltipContext)
  const floatingContext = useContext(Floating.FloatingContext)

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (tooltipContext === null || floatingContext === null) {
      console.log("Tooltip.Root context was not found in Tooltip.Trigger")
      return
    } else if (
      floatingContext.anchorRef.current == null ||
      floatingContext.popoverRef.current == null
    ) {
      return
    }

    const anchorBounding =
      floatingContext.anchorRef.current.getBoundingClientRect()
    const popoverBounding =
      floatingContext.popoverRef.current.getBoundingClientRect()

    const points = [
      ...getCorners(anchorBounding),
      ...getCorners(popoverBounding),
    ]
    const hull = convexHull(points)

    const isInside = isPointInConvexPolygon({ x: e.x, y: e.y }, hull)
    if (isInside && tooltipContext.tooltipRef.current != null) {
      window.clearTimeout(tooltipContext.tooltipRef.current)
      tooltipContext.tooltipRef.current = null
    } else if (
      isInside === false &&
      tooltipContext.tooltipRef.current == null
    ) {
      onPointerLeave()
    }
  }, [])

  const onPointerLeave = useCallback(() => {
    if (props.disablePointerEnter) return

    if (tooltipContext === null) {
      console.log("Tooltip.Root context was not found in Tooltip.Content")
      return
    }

    tooltipContext.tooltipRef.current = window.setTimeout(() => {
      tooltipContext.open.value = false
      window.removeEventListener("pointermove", onPointerMove)
      tooltipContext.tooltipRef.current = null
    }, 250)
  }, [])

  const onPointerEnter = useCallback(() => {
    if (props.disablePointerEnter) return

    if (tooltipContext === null) {
      console.log("Tooltip.Root context was not found in Tooltip.Trigger")
      return
    }

    if (tooltipContext.tooltipRef.current != null) {
      window.clearTimeout(tooltipContext.tooltipRef.current)
    }

    tooltipContext.open.value = true
    window.addEventListener("pointermove", onPointerMove)
  }, [])

  useAwareKeyDown("Escape", () => {
    if (tooltipContext === null) {
      console.log("Tooltip.Root context was not found in Tooltip.Content")
      return
    }

    if (tooltipContext.disableEsc) {
      return
    }

    tooltipContext.open.value = false
    if (tooltipContext.tooltipRef.current != null) {
      window.clearTimeout(tooltipContext.tooltipRef.current)
      tooltipContext.tooltipRef.current = null
    }
  })

  return (
    <Floating.Anchor>
      <Slot onpointerenter={onPointerEnter}>{props.children}</Slot>
    </Floating.Anchor>
  )
}
Trigger.displayName = "Tooltip.Trigger"

//////////////////
// Tooltip Content
//////////////////

type ContentProps = {
  forceMount?: boolean
}
export const Content: Kaioken.FC<ContentProps> = (props) => {
  const tooltipContext = useContext(TooltipContext)
  const keyboardContext = useContext(KeyboardContext)

  useEffect(() => {
    if (keyboardContext == null || tooltipContext == null) {
      return
    }

    if (tooltipContext.open.value) {
      keyboardContext.start()
    }

    return () => {
      keyboardContext.stop()
    }
  }, [tooltipContext?.open?.value])

  if (tooltipContext === null) {
    console.log("Tooltip.Root context was not found in Tooltip.Content")
    return null
  }

  return (
    (props.forceMount || tooltipContext.open.value) && (
      <Floating.Content>
        <Slot>{props.children}</Slot>
      </Floating.Content>
    )
  )
}
Content.displayName = "Tooltip.Content"
