import { useEffect, useState } from "kaioken"

export const useResizeObserver = (
  ref: Kaioken.Ref<Element | null>,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions | undefined = undefined
) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(true)
  let observer: ResizeObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  useEffect(() => {
    cleanup()
    if (isSupported && ref.current && isListening) {
      observer = new ResizeObserver(callback)
      observer.observe(ref.current, options)
    }
  }, [ref.current, isListening])

  useEffect(() => {
    setIsSupported(window && "ResizeObserver" in window)
  }, [])

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
