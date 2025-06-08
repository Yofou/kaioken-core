import { Slot } from "@kaioken-core/components/Slot"
import {
  createContext,
  Derive,
  ElementProps,
  Signal,
  useEffect,
  useRef,
  useSignal,
  useWatch,
} from "kaioken"
import Muuri from "muuri"
import { type GridOptions, type GridEvents } from "muuri"

type Eventify<T extends string> = `on${Capitalize<T>}`

type EventifyObject<T> = {
  [K in keyof T as Eventify<string & K>]: T[K]
}

type KaiokenGridEvents = EventifyObject<GridEvents>

type GridProps = Kaioken.FCProps<
  {
    ref?: Kaioken.MutableRefObject<Muuri | null> | Signal<Muuri | null>
    asChild?: boolean
    position?: "relative" | "absolute" | "fixed"
  } & Omit<ElementProps<"div">, "ref"> &
    GridOptions &
    Partial<KaiokenGridEvents>
>

export const GridProvider = createContext<Kaioken.Signal<Muuri | null> | null>(
  null
)

const ComponentEventToGridEvent: Record<
  keyof KaiokenGridEvents,
  keyof GridEvents
> = {
  onAdd: "add",
  onMove: "move",
  onSend: "send",
  onFilter: "filter",
  onSort: "sort",
  onRemove: "remove",
  onDestroy: "destroy",
  onDragEnd: "dragEnd",
  onHideEnd: "hideEnd",
  onReceive: "receive",
  onShowEnd: "showEnd",
  onDragInit: "dragInit",
  onDragMove: "dragMove",
  onDragStart: "dragStart",
  onHideStart: "hideStart",
  onLayoutEnd: "layoutEnd",
  onShowStart: "showStart",
  onBeforeSend: "beforeSend",
  onDragScroll: "dragScroll",
  onLayoutAbort: "layoutAbort",
  onLayoutStart: "layoutStart",
  onSynchronize: "synchronize",
  onBeforeReceive: "beforeReceive",
  onDragReleaseEnd: "dragReleaseEnd",
  onDragReleaseStart: "dragReleaseStart",
}

export const Grid = (props: GridProps) => {
  const {
    asChild,
    position = "relative",
    ref,
    children,
    onAdd,
    onMove,
    onSend,
    onFilter,
    onSort,
    onRemove,
    onDestroy,
    onDragEnd,
    onHideEnd,
    onReceive,
    onShowEnd,
    onDragInit,
    onDragMove,
    onDragStart,
    onHideStart,
    onLayoutEnd,
    onShowStart,
    onBeforeSend,
    onDragScroll,
    onLayoutAbort,
    onLayoutStart,
    onSynchronize,
    onBeforeReceive,
    onDragReleaseEnd,
    onDragReleaseStart,
    ...rest
  } = props

  const Events = {
    onAdd,
    onMove,
    onSend,
    onFilter,
    onSort,
    onRemove,
    onDestroy,
    onDragEnd,
    onHideEnd,
    onReceive,
    onShowEnd,
    onDragInit,
    onDragMove,
    onDragStart,
    onHideStart,
    onLayoutEnd,
    onShowStart,
    onBeforeSend,
    onDragScroll,
    onLayoutAbort,
    onLayoutStart,
    onSynchronize,
    onBeforeReceive,
    onDragReleaseEnd,
    onDragReleaseStart,
  }

  const MuuriModule = useSignal<typeof Muuri | null>(null)
  const Container = asChild ? Slot : "div"
  const containerRef = useSignal<HTMLDivElement | null>(null)
  const muuriInstance = useSignal<Muuri | null>(null)
  const attachedEvents = useRef<Record<string, Function>>({})
  const hasLoaded = useSignal(false)

  useEffect(() => {
    import("muuri").then(({ default: Grid }) => {
      MuuriModule.value = Grid
      hasLoaded.value = true
    })
  }, [])

  const handleGridInit = () => {
    if (!containerRef.value) {
      return () => {}
    } else if (MuuriModule.peek()) {
      muuriInstance.value = new (MuuriModule.value as typeof Muuri)(
        containerRef.value,
        rest
      )

      if (Signal.isSignal(ref)) {
        ref.sneak(muuriInstance.value)
      } else if (ref) {
        ref.current = muuriInstance.value
      }

      return () => {
        if (muuriInstance.value) {
          muuriInstance.value.destroy()
        }

        if (Signal.isSignal(ref)) {
          ref.value = null
        } else if (ref) {
          ref.current = null
        }
      }
    }
  }

  useWatch(handleGridInit)
  useEffect(handleGridInit, [rest.dragSort, hasLoaded.value])

  const handleEventAttaching = () => {
    const cleanupFn = () => {
      if (
        !muuriInstance.value ||
        Object.keys(attachedEvents.current).length === 0
      ) {
        return
      }

      for (let [eventFnName, eventFn] of Object.entries(
        attachedEvents.current
      )) {
        const eventName =
          ComponentEventToGridEvent[eventFnName as keyof KaiokenGridEvents]

        muuriInstance.value.off(eventName, eventFn as any)
      }
    }

    if (!muuriInstance.value || !hasLoaded.value) {
      return cleanupFn
    }

    for (let [eventFnName, eventFn] of Object.entries(Events)) {
      if (!eventFn || attachedEvents.current[eventFnName]) {
        continue
      }

      const eventName =
        ComponentEventToGridEvent[eventFnName as keyof KaiokenGridEvents]
      muuriInstance.value.on(eventName, eventFn)

      attachedEvents.current[eventName] = eventFn
    }

    return cleanupFn
  }

  useWatch(handleEventAttaching)
  useEffect(handleEventAttaching, [
    onAdd,
    onMove,
    onSend,
    onFilter,
    onSort,
    onRemove,
    onDestroy,
    onDragEnd,
    onHideEnd,
    onReceive,
    onShowEnd,
    onDragInit,
    onDragMove,
    onDragStart,
    onHideStart,
    onLayoutEnd,
    onShowStart,
    onBeforeSend,
    onDragScroll,
    onLayoutAbort,
    onLayoutStart,
    onSynchronize,
    onBeforeReceive,
    onDragReleaseEnd,
    onDragReleaseStart,
  ])

  return (
    <GridProvider.Provider value={muuriInstance}>
      <Container ref={containerRef} style={`position: ${position}`} {...rest}>
        <Derive from={hasLoaded}>
          {(loaded) => {
            return loaded ? children : null
          }}
        </Derive>
      </Container>
    </GridProvider.Provider>
  )
}
