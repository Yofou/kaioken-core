import { signal, useEffect, useRef } from "kaioken"

type RefFnArg = {
  delta: number
  timestamp: DOMHighResTimeStamp
}

type RefFnOptions = {
  fpsLimit?: number
  immediate?: boolean
}

const useRafFn = (callback: (arg: RefFnArg) => void, options: RefFnOptions) => {
  const isActive = signal(false);
  const refId = useRef<null | number>(null)
  const intervalLimit = options?.fpsLimit ? 1000 / options.fpsLimit : null
  let previousFrameTimestamp = 0

  const rafLoop = (timestamp: DOMHighResTimeStamp) => {
    if (!isActive.value || !window) return
    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp

    const delta = timestamp - previousFrameTimestamp
    if (intervalLimit && delta < intervalLimit) {
      refId.current = window.requestAnimationFrame(rafLoop)
      return
    }

    previousFrameTimestamp = timestamp
    callback({ delta, timestamp })
    refId.current = window.requestAnimationFrame(rafLoop)
  }

  const start = () => {
    if (!isActive.value && window) {
      isActive.value = true
      previousFrameTimestamp = 0
      if (refId.current != null) {
        window.cancelAnimationFrame(refId.current)
        refId.current = null;
      }
      refId.current = window.requestAnimationFrame(rafLoop)
    }
  }

  const stop = () => {
    isActive.value = false
    if (refId.current != null && window) {
      window.cancelAnimationFrame(refId.current)
      refId.current = null
    }
  }

  useEffect(() => {
    if (options.immediate) {
      start()
    }

    return () => {
      stop()
    }
  }, [])

  return {
    start,
    stop,
    isActive: isActive.value,
  }
}

export {
  useRafFn,
  useRafFn as useRequestAnimationFrame,
  useRafFn as useRafAnimationFrameFn,
}
