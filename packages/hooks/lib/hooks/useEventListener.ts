import { useEffect } from "kaioken"

export type Arrayable<T> = T[] | T

export const useEventListener = <E extends keyof WindowEventMap>(
	event: E, 
	listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
	options: AddEventListenerOptions
) => {
	useEffect(() => {
    window.addEventListener(event, listener as any, options)

    return () => window.removeEventListener(event, listener as any, options)
  }, [options])
}
