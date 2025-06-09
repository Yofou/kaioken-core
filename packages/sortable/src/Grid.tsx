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
import { _internalGridToSignal, hasLastItemMovedGrid } from "./util"

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
    signal?: Signal<any[]>
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
    signal,
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
      console.log("creatinging muri")
      muuriInstance.value = new (MuuriModule.value as typeof Muuri)(
        containerRef.value,
        rest
      )

      if (Signal.isSignal(ref)) {
        ref.sneak(muuriInstance.value)
      } else if (ref) {
        ref.current = muuriInstance.value
      }

      if (signal) {
        _internalGridToSignal.set(muuriInstance.value, signal)
      }

      return () => {
        if (muuriInstance.value) {
          muuriInstance.value.destroy()
          _internalGridToSignal.delete(muuriInstance.value)
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

  const onDragRelease: GridEvents["dragReleaseEnd"] = () => {
    if (signal?.value) {
      signal.notify()
    }
  }

  useWatch(() => {
    if (!muuriInstance.value || !hasLoaded.value || !signal?.value) {
      return () => {}
    }

    const onSend: GridEvents["send"] = (data) => {
      const fromGridSignal = _internalGridToSignal.get(data.fromGrid)
      const toGridSignal = _internalGridToSignal.get(data.toGrid)
      hasLastItemMovedGrid.value = true

      if (!fromGridSignal || !toGridSignal) {
        console.warn(
          "Sent Item from or to a grid, not hooked up with @kaioken-core/sortable"
        )
        return
      }

      const fromCopy = [...fromGridSignal.value]
      fromCopy.splice(data.fromIndex, 1)

      const toCopy = [...toGridSignal.value]
      toCopy.splice(data.toIndex, 0, fromGridSignal.value[data.fromIndex])

      fromGridSignal.sneak(fromCopy)
      toGridSignal.sneak(toCopy)

      const triggerVNodeUpdate = () => {
        fromGridSignal.notify()
        data.toGrid.off("dragReleaseEnd", triggerVNodeUpdate)
      }
      data.toGrid.on("dragReleaseEnd", triggerVNodeUpdate)
    }

    const onMove: GridEvents["move"] = (data) => {
      if (!signal.value) {
        return
      }

      const copy = [...signal.value]
      if (data.action === "move") {
        copy.splice(data.fromIndex, 1)
        copy.splice(data.toIndex, 0, signal.value[data.fromIndex])
      } else if (data.action === "swap") {
        ;[copy[data.toIndex], copy[data.fromIndex]] = [
          copy[data.fromIndex],
          copy[data.toIndex],
        ]
      }

      signal.sneak(copy)
    }

    muuriInstance.value.on("move", onMove)
    muuriInstance.value.on("dragReleaseEnd", onDragRelease)
    muuriInstance.value.on("send", onSend)

    return () => {
      if (muuriInstance.value) {
        muuriInstance.value.off("move", onMove)
        muuriInstance.value.off("dragReleaseEnd", onDragRelease)
        muuriInstance.value.off("send", onSend)
      }
    }
  })

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
