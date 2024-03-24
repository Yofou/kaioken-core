import { useEffect } from "kaioken";

export type Arrayable<T> = T[] | T;

export const useEventListener = <E extends keyof WindowEventMap>(
  event: E,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options: AddEventListenerOptions & { ref?: () => Element | null } = {}
) => {
  useEffect(() => {
    let pointer: Window | Element = window;

    const elm = options?.ref?.()
    if (elm) {
      pointer = elm
    } else if (options.ref) {
      console.warn('useEventListener ref failed, using window')
    }


    pointer.addEventListener(event, listener as any, options);
    return () => {
      pointer.removeEventListener(event, listener as any, options);
    };
  }, [options]);
};
