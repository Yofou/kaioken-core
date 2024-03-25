import { useEffect, useRef } from "kaioken"

type UseEffectThrottleOptions = {
  // in Milliseconds
  maxWait?: number,
} 

export const useEffectThrottle = (
  callback: () => void, 
  deps: unknown[] | undefined,
  options: UseEffectThrottleOptions = {}
) => {
  const lastEffectTrigger = useRef<number | null>(null)
  const maxWait = options.maxWait ?? 0

  useEffect(() => {
    if (
      lastEffectTrigger.current == null || 
      Date.now() >= lastEffectTrigger.current + maxWait
    ) {
      lastEffectTrigger.current = Date.now()
      callback()
    }
  }, deps)
}
