import { useEffect, useRef, useState } from "kaioken"

type RefFnArg =  {
  delta: number,
  timestamp: DOMHighResTimeStamp
}

type RefFnOptions = {
  fpsLimit?: number,
  immediate?: boolean,
}

export const useRafFn = (
  callback: (arg: RefFnArg) => void,
  options: RefFnOptions
) => {
  const [isActive, setIsActive] = useState(false)
  const refId = useRef<null | number>(null)
  const intervalLimit = options?.fpsLimit ? 1000 / options.fpsLimit : null
  let previousFrameTimestamp = 0

  function loop(timestamp: DOMHighResTimeStamp) {
    if (!isActive || !window)
      return

    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp

    const delta = timestamp - previousFrameTimestamp

    if (intervalLimit && delta < intervalLimit) {
      refId.current = window.requestAnimationFrame(loop)
      return
    }

    previousFrameTimestamp = timestamp
    callback({ delta, timestamp })
    refId.current = window.requestAnimationFrame(loop)
  }

  const start = () => {
    if (!isActive && window) {
      setIsActive(true)
      previousFrameTimestamp = 0
      refId.current = window.requestAnimationFrame(loop)
    }
  }

  const stop = () => {
    setIsActive(false)
    if (refId.current != null && window) {
      window.cancelAnimationFrame(refId.current)
      refId.current = null
    }
  }

  useEffect(() => {
    if (isActive && !refId.current) {
      start()
    } else {
      stop
    }
  }, [isActive])

  useEffect(() => {
    if (options.immediate && !refId.current) {
      start()
    }
  }, [])

  return {
    start,
    stop,
    isActive,
  }
}
