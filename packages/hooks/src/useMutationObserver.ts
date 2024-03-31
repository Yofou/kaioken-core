import { cleanupHook, depsRequireChange, shouldExecHook, useHook, useState } from "kaioken"


export function useEffect(
  callback: () => void | (() => void),
  deps?: unknown[]
): void {
  if (!shouldExecHook()) return
  return useHook(
    "useEffect",
    { callback, deps },
    ({ hook, oldHook, queueEffect }) => {
      console.log('identity check', deps === oldHook?.deps, oldHook?.deps)
      if (depsRequireChange(deps, oldHook?.deps)) {
        hook.deps = deps
        if (oldHook) {
          cleanupHook(oldHook)
        }
        queueEffect(() => {
          const cleanup = callback()
          if (cleanup && typeof cleanup === "function") {
            hook.cleanup = cleanup
          }
        })
      }
    }
  )
}

export const useMutationObserver = (
  ref: Kaioken.Ref<Element>,
  callback: MutationCallback,
  options: MutationObserverInit | undefined = undefined
) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(true)
  // TODO: use ref here, dildo
  let observer: MutationObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  useEffect(() => {
    console.log("callback")
    cleanup()
    if (isSupported && ref.current && isListening) {
      observer = new MutationObserver(callback)
      observer.observe(ref.current, options)
    }
  }, [ref.current, isListening, isSupported, callback])

  useEffect(() => {
    setIsSupported(window && "MutationObserver" in window)
  }, [callback])

  const start = () => {
    setIsListening(true)
  }

  const stop = () => {
    setIsListening(true)
  }

  return {
    isSupported,
    start,
    stop,
  }
}
