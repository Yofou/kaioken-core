import { cleanupHook, sideEffectsEnabled, useHook } from "kaioken"

type RefFnArg = {
  delta: number
  timestamp: DOMHighResTimeStamp
}

type RefFnOptions = {
  fpsLimit?: number
  immediate?: boolean
}

const useRafFn = (callback: (arg: RefFnArg) => void, options: RefFnOptions) => {
  if (!sideEffectsEnabled()) return {
    isActive: options.immediate ?? false,
    start: () => null,
    stop: () => null,
  }

  const intervalLimit = options?.fpsLimit ? 1000 / options.fpsLimit : null
  return useHook(
    'useRafFn', 
    () => ({
      callback,
      refId: null as number | null,
      previousFrameTimestamp: 0,
      isActive: options.immediate ?? false
    }), 
    ({ isInit, hook, update }) => {
      hook.callback = callback
      const rafLoop: FrameRequestCallback = (timestamp) => {
        if (hook.isActive === false) return
        if (!hook.previousFrameTimestamp) hook.previousFrameTimestamp = timestamp

        const delta = timestamp - hook.previousFrameTimestamp
        if (intervalLimit && delta < intervalLimit) {
          hook.refId = window.requestAnimationFrame(rafLoop)
          return
        }

        hook.previousFrameTimestamp = timestamp
        hook.callback({ delta, timestamp })
        hook.refId = window.requestAnimationFrame(rafLoop)
      }

      if (isInit && options.immediate) {
        hook.isActive = true
        hook.refId = window.requestAnimationFrame(rafLoop)
        hook.cleanup = () => {
          if (hook.refId != null) {
            window.cancelAnimationFrame(hook.refId)
          }
          hook.isActive = false
        }

        update()
      }

      return {
        isActive: hook.isActive,
        start: () => {
          if (hook.isActive === true) return;

          hook.isActive = true
          hook.refId = window.requestAnimationFrame(rafLoop)
          hook.cleanup = () => {
            if (hook.refId != null) {
              window.cancelAnimationFrame(hook.refId)
            }
            hook.isActive = false
          }
          update()
        },
        stop: () => {
          cleanupHook(hook)
          update()
        }
      }
    }
  )
}

export {
  useRafFn,
  useRafFn as useRequestAnimationFrame,
  useRafFn as useRafAnimationFrameFn,
}
