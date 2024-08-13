import { useEffect, useRef, signal } from "kaioken"


export const useMutationObserver = (
  ref: Kaioken.Ref<Element | null>,
  callback: MutationCallback,
  options: MutationObserverInit | undefined = undefined
) => {

  const isSupported = signal(false)
  const isListening = signal(true)
  const observer = useRef<MutationObserver | undefined>(undefined)
  const cleanup = () => {
    if (observer.current) {
      observer.current?.disconnect?.()
      observer.current = undefined
    }
  }

  useEffect(() => {
    isSupported.value = (window && "MutationObserver" in window)
  }, [callback])

  useEffect(() => {
    if (isSupported.value && ref.current && isListening.value) {
      observer.current = new MutationObserver(callback)
      observer.current.observe(ref.current, options)
    }

    return cleanup
  }, [ref.current, isListening.value, isSupported.value])

  const start = () => {
    isListening.value = true
  }

  const stop = () => {
    isListening.value = false
  }

  return {
    isSupported,
    start,
    stop,
  }
}
