import { useState, useEffect, useRef } from "kaioken"


export const useMutationObserver = (
  ref: Kaioken.Ref<Element | null>,
  callback: MutationCallback,
  options: MutationObserverInit | undefined = undefined
) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(true)
  const observer = useRef<MutationObserver | undefined>(undefined)
  const cleanup = () => {
    if (observer.current) {
      observer.current?.disconnect?.()
      observer.current = undefined
    }
  }

  useEffect(() => {
    if (isSupported && ref.current && isListening) {
      observer.current = new MutationObserver(callback)
      observer.current.observe(ref.current, options)
    }

    return cleanup 
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
