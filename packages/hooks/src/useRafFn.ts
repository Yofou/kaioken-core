import { useEffect, useRef } from "kaioken"

type RefFnArg = {
  delta: number
  timestamp: DOMHighResTimeStamp
}

type RefFnOptions = {
  fpsLimit?: number
  immediate?: boolean
}

const useRafFn = (callback: (arg: RefFnArg) => void, options: RefFnOptions) => {
  const isActive = useRef(false);
  const refId = useRef<null | number>(null)
  const intervalLimit = options?.fpsLimit ? 1000 / options.fpsLimit : null
  let previousFrameTimestamp = 0

  const rafLoop = (timestamp: DOMHighResTimeStamp) => {
    if (!isActive.current || !window) return
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
    if (!isActive.current && window) {
      isActive.current = true;
      previousFrameTimestamp = 0
      if (refId.current != null) {
        window.cancelAnimationFrame(refId.current)
        refId.current = null;
      }
      refId.current = window.requestAnimationFrame(rafLoop)
    }
  }

  const stop = () => {
    isActive.current = false;
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
      stop();
    }
  }, [options.immediate, callback])

  return {
    start,
    stop,
    isActive: isActive.current,
  }
}

export {
  useRafFn,
  useRafFn as useRequestAnimationFrame,
  useRafFn as useRafAnimationFrameFn,
}
