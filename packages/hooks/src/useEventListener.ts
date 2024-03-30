import { useEffect } from "kaioken"

export type Arrayable<T> = T[] | T

export type EventMap = WindowEventMap & DocumentEventMap
export type EventTarget = Window | Element | Document

export const useEventListener = <E extends keyof EventMap>(
  event: E,
  listener: Arrayable<(this: Window, ev: EventMap[E]) => any>,
  options: AddEventListenerOptions & {
    ref?: (() => EventTarget | null) | null
  } = {}
) => {
  useEffect(() => {
    let pointer: EventTarget = window
    const _listener = listener

    const elm = options?.ref?.()
    if (elm) {
      pointer = elm
    } else if (options.ref) {
      console.warn("useEventListener ref failed, using window")
    }

    pointer.addEventListener(event, _listener as any, options)
    return () => {
      pointer.removeEventListener(event, _listener as any, options)
    }
  }, [options])
}
