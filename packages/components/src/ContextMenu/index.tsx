import {
  createContext,
  ElementProps,
  signal,
  Signal,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "kaioken"
import { Slot } from "../Slot"
import { Dialog } from "../../lib/main"
import { computePosition, flip, shift } from "@floating-ui/dom"
import { useAwareKeyDown } from "../utils"

export const RootContext = createContext<{
  open: Signal<boolean>
  coords: Signal<{
    x: number
    y: number
  } | null>
  containerRef: Kaioken.MutableRefObject<HTMLElement | null>
  highlightRef: Kaioken.MutableRefObject<HTMLElement | null>
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
  const containerRef = useRef<HTMLElement | null>(null)
  const highlightRef = useRef<HTMLElement | null>(null)
  const rootContextValue = useMemo(() => {
    return {
      open: props.open ?? internalOpen,
      coords,
      containerRef,
      highlightRef,
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
// ContextMenu Container
///////////////////

type ContainerProps = ElementProps<"div"> & {
  asChild?: boolean
}
export const Container: Kaioken.FC<ContainerProps> = (props) => {
  const { asChild, ...rest } = props
  const rootContext = useContext(RootContext)
  const onRef = (el: HTMLDialogElement | null) => {
    if (!rootContext || rootContext.coords.value == null) return
    if (el) {
      rootContext.containerRef.current = el
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
    } else {
      rootContext.containerRef.current = el
    }
  }

  if (!rootContext) {
    console.warn(
      "ContextMenu.Root context was not found in ContextMenu.Content"
    )
    return
  }

  return (
    <Dialog.Container {...rest} asChild={asChild} ref={onRef}>
      {props.children}
    </Dialog.Container>
  )
}
Container.displayName = "ContextMenu.Container"

///////////////////
// ContextMenu Content
///////////////////

export const Content: typeof Dialog.Content = (props) => {
  const rootContext = useContext(RootContext)

  const treeWalker = useMemo(() => {
    if (!rootContext?.containerRef?.current) {
      return null
    }

    return document.createTreeWalker(
      rootContext.containerRef.current,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode(node) {
          if (
            node instanceof HTMLElement &&
            node.dataset["kcContextKeyboard"]
          ) {
            return NodeFilter.FILTER_ACCEPT
          }
          return NodeFilter.FILTER_SKIP
        },
      }
    )
  }, [rootContext?.containerRef?.current])

  useEffect(() => {
    if (!rootContext) {
      return
    }
    rootContext.highlightRef.current = null
  }, [])

  useAwareKeyDown(["ArrowDown", "ArrowUp"], (e) => {
    if (!treeWalker || !rootContext) return

    if (rootContext.highlightRef.current) {
      treeWalker.currentNode = rootContext.highlightRef.current

      if (e.key === "ArrowDown") {
        const next = treeWalker.nextNode() as HTMLElement
        if (!next) return
        rootContext.highlightRef.current = next
        next.focus()
      } else if (e.key === "ArrowUp") {
        const prev = treeWalker.previousNode() as HTMLElement
        if (!prev) return
        rootContext.highlightRef.current = prev
        prev.focus()
      }
    } else {
      treeWalker.currentNode = treeWalker.root

      if (e.key === "ArrowDown") {
        const first = treeWalker.firstChild() as HTMLElement
        if (!first) return
        rootContext.highlightRef.current = first
        first.focus()
      } else if (e.key === "ArrowUp") {
        const last = treeWalker.lastChild() as HTMLElement
        if (!last) return
        rootContext.highlightRef.current = last
        last.focus()
      }
    }

    console.log(treeWalker.currentNode)
  })

  return <Dialog.Content {...props} />
}
Content.displayName = "ContextMenu.Content"

///////////////////
// ContextMenu Item
///////////////////

type ItemProps = ElementProps<"div"> & {
  asChild?: boolean
}

export const Item: Kaioken.FC<ItemProps> = (props) => {
  const { asChild, children, ...rest } = props
  const rootContext = useContext(RootContext)
  const ref = useRef<HTMLDivElement>(null)
  const Component = asChild ? Slot : "div"

  return (
    <Component
      {...rest}
      data-kc-context-keyboard
      tabIndex={-1}
      ref={ref}
      onmouseenter={() => {
        if (!rootContext || !ref.current) {
          return
        }

        rootContext.highlightRef.current = ref.current
      }}
      onmouseleave={() => {
        if (!rootContext) {
          return
        }

        rootContext.highlightRef.current = null
      }}
    >
      {children}
    </Component>
  )
}
