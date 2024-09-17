import {
  createContext,
  ElementProps,
  signal,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "kaioken"
import { UnwrapContext, useAwareKeyDown } from "../utils"
import { Slot } from "../Slot"
import { useClickOutside, useKeyDown } from "@kaioken-core/hooks"
import * as KeyboardStack from "../KeyboardStack"

///////////////////
// Dialog Root
//////////////////
type RootProps = {
  open?: Kaioken.Signal<boolean>
  onInteractOutside?: ElementProps<"div">["onclick"]
  onKeyDownEscape?: ElementProps<"div">["onkeydown"]
}

const RootContext = createContext<{
  open: Kaioken.Signal<boolean>
  titleId: Kaioken.Signal<string | null>
  descriptionId: Kaioken.Signal<string | null>
  onInteractOutside?: ElementProps<"div">["onclick"]
  onKeyDownEscape?: ElementProps<"div">["onkeydown"]
} | null>(null)

export const Root: Kaioken.FC<RootProps> = (props) => {
  const _open = signal(false)
  const open = props.open ?? _open
  const titleId = signal<string | null>(null)
  const descriptionId = signal<string | null>(null)

  const providerValue = useMemo(() => {
    return {
      open,
      titleId,
      descriptionId,
      onInteractOutside: props.onInteractOutside,
      onKeyDownEscape: props.onKeyDownEscape,
    } as UnwrapContext<typeof RootContext>
  }, [props.open, props.onInteractOutside, props.onKeyDownEscape])

  return (
    <RootContext.Provider value={providerValue}>
      {props.children}
    </RootContext.Provider>
  )
}
Root.displayName = "Dialog.Root"

//////////////////
// Dialog Trigger
//////////////////

type TriggerProps = ElementProps<"button"> & {
  asChild?: boolean
  disableClick?: boolean
}

export const Trigger: Kaioken.FC<TriggerProps> = ({ asChild, ...props }) => {
  const rootContext = useContext(RootContext)
  const Comp = asChild ? Slot : "button"

  const onClick = (e: MouseEvent) => {
    props.onclick?.call(window, e)
    if (props.disableClick) return

    if (!rootContext) {
      console.warn("Dialog.Root context was not found in Dialog.Trigger")
      return
    }
    rootContext.open.value = !rootContext.open.value
  }

  return (
    <Comp {...props} onclick={onClick}>
      {props.children}
    </Comp>
  )
}
Trigger.displayName = "Dialog.Trigger"

///////////////////
// Dialog Title
///////////////////

type TitleProps = ElementProps<"h2"> & {
  asChild?: boolean
}

export const Title: Kaioken.FC<TitleProps> = ({ asChild, ...props }) => {
  const rootContext = useContext(RootContext)
  const Comp = asChild ? Slot : "h2"

  const titleId = useMemo(() => crypto.randomUUID().split("-")[0], [])

  useEffect(() => {
    if (rootContext == null) return

    rootContext.titleId.value = titleId
  }, [titleId])

  if (!rootContext) {
    console.warn("Dialog.Root context was not found in Dialog.Title")
    return
  }

  return (
    <Comp id={rootContext.titleId.value ?? undefined} {...props}>
      {props.children}
    </Comp>
  )
}
Title.displayName = "Dialog.Title"

////////////////////////
// Dialog Description
////////////////////////

type DescriptionProps = ElementProps<"p"> & {
  asChild?: boolean
}

export const Description: Kaioken.FC<DescriptionProps> = ({
  asChild,
  ...props
}) => {
  const rootContext = useContext(RootContext)
  const Comp = asChild ? Slot : "p"
  const descriptionId = useMemo(() => crypto.randomUUID().split("-")[0], [])

  useEffect(() => {
    if (rootContext == null) return

    rootContext.descriptionId.value = descriptionId
  }, [descriptionId])

  if (!rootContext) {
    console.warn("Dialog.Root context was not found in Dialog.Description")
    return null
  }

  return (
    <Comp id={rootContext.descriptionId.value ?? undefined} {...props}>
      {props.children}
    </Comp>
  )
}
Description.displayName = "Dialog.Description"

///////////////////
// Dialog Container
///////////////////

type ContainerProps = ElementProps<"dialog"> & {
  asChild?: boolean
  forceMount?: boolean
}

export const Container: Kaioken.FC<ContainerProps> = ({
  asChild,
  ...props
}) => {
  const rootContext = useContext(RootContext)
  const ref = useRef<HTMLElement>(null)

  const featureAttrs = useMemo(() => {
    const attrs = {}

    if (rootContext?.titleId?.value) {
      // @ts-expect-error
      attrs.ariaLabelledBy = rootContext.titleId.value
    }
    if (rootContext?.descriptionId?.value) {
      // @ts-expect-error
      attrs.ariaDescribedBy = rootContext.descriptionId.value
    }

    if (asChild) {
      // @ts-expect-error
      attrs.popover = "manual"
    }

    return attrs
  }, [rootContext?.descriptionId?.value, rootContext?.titleId?.value, asChild])

  useLayoutEffect(() => {
    if (!ref.current || rootContext?.open?.value === false) {
      return
    }

    if (!asChild) {
      ;(ref.current as HTMLDialogElement).showModal()
    } else {
      ref.current.showPopover()
    }
  }, [rootContext?.open?.value, asChild])

  if (!rootContext) {
    console.warn("Dialog.Root context was not found in Dialog.Container")
    return null
  }

  const Comp = asChild ? Slot : "dialog"
  return props.forceMount || rootContext.open.value ? (
    <KeyboardStack.Root __dev="Dialog">
      <Comp {...props} {...featureAttrs} ref={ref as any}>
        {props.children}
      </Comp>
    </KeyboardStack.Root>
  ) : null
}
Container.displayName = "Dialog.Container"

///////////////////
// Dialog Content
///////////////////

type ContentProps = ElementProps<"p"> & {
  asChild?: boolean
  disableInteractOutside?: boolean
}

export const Content: Kaioken.FC<ContentProps> = ({ asChild, ...props }) => {
  const rootContext = useContext(RootContext)
  const ref = useRef<HTMLElement>(null)

  useKeyDown("Escape", (e) => {
    if (!rootContext || rootContext.open.value === false) {
      return
    }

    e.preventDefault()
  })

  useAwareKeyDown("Escape", (e) => {
    if (!rootContext || rootContext.open.value === false) {
      return
    }

    rootContext?.onKeyDownEscape?.bind(window)?.(e)
    rootContext.open.value = false
  })

  useClickOutside(
    ref,
    (e) => {
      if (!rootContext || rootContext.open.value === false) {
        return
      }

      rootContext?.onInteractOutside?.bind(window)?.(e)
      if (props.disableInteractOutside) return

      rootContext.open.value = false
    },
    {
      passive: false,
    }
  )

  const Comp = asChild ? Slot : "div"
  return (
    <Comp {...props} ref={ref as any}>
      {props.children}
    </Comp>
  )
}
Content.displayName = "Dialog.Content"
