import { useEffect, useState } from "kaioken"

export const useIntersectionObserver = (
  ref: Kaioken.Ref<Element>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit | undefined = undefined
) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(true)
  let observer: IntersectionObserver | undefined

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }

  useEffect(() => {
    cleanup()
    if (isSupported && ref.current && isListening) {
      observer = new IntersectionObserver(callback, options)
      observer.observe(ref.current)
    }
  }, [ref.current, isListening])

  useEffect(() => {
    setIsSupported(window && "IntersectionObserver" in window)
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
