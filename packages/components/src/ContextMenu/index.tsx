import {
  createContext,
  ElementProps,
  signal,
  Signal,
  useCallback,
  useContext,
  useMemo,
} from "kaioken"
import { Slot } from "../Slot"
import { Dialog } from "../../lib/main"
import { computePosition, flip, shift } from "@floating-ui/dom"

export const RootContext = createContext<{
  open: Signal<boolean>
  coords: Signal<{
    x: number
    y: number
  } | null>
} | null>(null)
RootContext.displayName = "ContextMenu.Context"

///////////////////
// ContextMenu Root
///////////////////

type RootProps = {
  open?: Signal<boolean>
}
export const Root: Kaioken.FC<RootProps> = (props) => {
  const internalOpen = signal(false)
  const coords = signal<{ x: number; y: number } | null>(null)
  const rootContextValue = useMemo(() => {
    return {
      open: props.open ?? internalOpen,
      coords,
    }
  }, [])

  return (
    <RootContext.Provider value={rootContextValue}>
      <Dialog.Root open={rootContextValue.open}>{props.children}</Dialog.Root>
    </RootContext.Provider>
  )
}
Root.displayName = "ContextMenu.Root"

///////////////////
// ContextMenu Trigger
///////////////////

type TriggerProps = ElementProps<"div"> & {
  asChild?: boolean
}
export const Trigger: Kaioken.FC<TriggerProps> = (props) => {
  const { asChild, ...rest } = props
  const Component = asChild ? Slot : "div"
  const rootContext = useContext(RootContext)
  const onContextMenu = useCallback<
    NonNullable<ElementProps<"div">["oncontextmenu"]>
  >((e) => {
    e.preventDefault()
    if (!rootContext) return

    rootContext.open.value = true
    rootContext.coords.value = { x: e.x, y: e.y }
  }, [])

  if (!rootContext) {
    console.warn(
      "ContextMenu.Root context was not found in ContextMenu.Trigger"
    )
    return
  }

  return (
    <Component {...rest} oncontextmenu={onContextMenu}>
      {props.children}
    </Component>
  )
}
Trigger.displayName = "ContextMenu.Trigger"

///////////////////
// ContextMenu Content
///////////////////

type ContentProps = ElementProps<"div"> & {
  asChild?: boolean
}
export const Container: Kaioken.FC<ContentProps> = (props) => {
  const { asChild, ...rest } = props
  const Component = asChild ? Slot : Dialog.Container
  const rootContext = useContext(RootContext)
  const onRef = (el: HTMLDialogElement | null) => {
    if (!rootContext || rootContext.coords.value == null) return
    if (el) {
      // mount

      const referenceEl = {
        getBoundingClientRect() {
          return {
            x: 0,
            y: 0,
            top: rootContext.coords.value?.y ?? 0,
            left: rootContext.coords.value?.x ?? 0,
            bottom: 0,
            right: 0,
            width: 1,
            height: 1,
          }
        },
      }
      computePosition(referenceEl, el, {
        placement: "bottom-start",
        strategy: "fixed",
        middleware: [flip(), shift()],
      }).then((result) => {
        el.style.setProperty("margin", "0")
        el.style.setProperty("top", `${result.y}px`)
        el.style.setProperty("left", `${result.x}px`)
      })
    }
  }

  if (!rootContext) {
    console.warn(
      "ContextMenu.Root context was not found in ContextMenu.Content"
    )
    return
  }

  return (
    <Component {...rest} asChild={asChild ? asChild : undefined} ref={onRef}>
      {props.children}
    </Component>
  )
}
Container.displayName = "ContextMenu.Container"

export const Content: typeof Dialog.Content = Dialog.Content.bind({})
Content.displayName = "ContextMenu.Content"
