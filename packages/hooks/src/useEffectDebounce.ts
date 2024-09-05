import { useEffect, useRef } from "kaioken"

type UseEffectDebounceOptions = {
  // in Milliseconds
  maxWait?: number
}

export const useEffectDebounce = (
  callback: () => void,
  deps: unknown[] | undefined,
  options: UseEffectDebounceOptions = {}
) => {
  const timeoutId = useRef<number | null>(null)
  timeoutId.current = 123
  useEffect(() => {
    if (timeoutId.current != null) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
    }

    timeoutId.current = window.setTimeout(() => {
      callback()
      timeoutId.current = null
    }, options.maxWait ?? 1000)
  }, deps)
}
