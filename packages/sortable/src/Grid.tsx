import { Slot } from "@kaioken-core/components/Slot"
import {
  createContext,
  ElementProps,
  Signal,
  useEffect,
  useSignal,
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
      import("muuri").then(({ default: Grid }) => {
        MuuriModule.value = Grid
        hasLoaded.value = true
        muuriInstance.value = new (MuuriModule.value as typeof Muuri)(
          containerRef?.value!,
          rest
        )

        if (Signal.isSignal(ref)) {
          ref.sneak(muuriInstance.value)
        } else if (ref) {
          ref.current = muuriInstance.value
        }
      })

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
  //  useWatch(handleGridInit)
  useEffect(handleGridInit, [rest.dragSort, hasLoaded.value])

  const handleEventAttaching = () => {
    if (!muuriInstance.value) {
      return () => {}
    }

    for (let [eventFnName, eventFn] of Object.entries(Events)) {
      if (!eventFn) {
        continue
      }

      const eventName =
        ComponentEventToGridEvent[eventFnName as keyof KaiokenGridEvents]
      muuriInstance.value.on(eventName, eventFn)
    }

    return () => {
      if (!muuriInstance.value) {
        return
      }

      for (let [eventFnName, eventFn] of Object.entries(Events)) {
        if (!eventFn) {
          continue
        }

        const eventName =
          ComponentEventToGridEvent[eventFnName as keyof KaiokenGridEvents]
        muuriInstance.value.off(eventName, eventFn)
      }
    }
  }

  //  useWatch(handleEventAttaching)
  useEffect(handleEventAttaching, [
    muuriInstance.value,
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
        {hasLoaded.value ? children : null}
      </Container>
    </GridProvider.Provider>
  )
}
