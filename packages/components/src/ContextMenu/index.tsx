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
export const Content: Kaioken.FC<ContentProps> = (props) => {
  const { asChild, ...rest } = props
  const Component = asChild ? Slot : Dialog.Container
  const rootContext = useContext(RootContext)
  const onRef = (el: HTMLDialogElement | null) => {
    if (!rootContext || rootContext.coords.value == null) return
    if (el) {
      // mount
      el.style.setProperty("margin", "0")
      el.style.setProperty("top", `${rootContext.coords.value.y}px`)
      el.style.setProperty("left", `${rootContext.coords.value.x}px`)
    } else {
      // unmount
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
      <Dialog.Content asChild={asChild}>{props.children}</Dialog.Content>
    </Component>
  )
}
Content.displayName = "ContextMenu.Content"
