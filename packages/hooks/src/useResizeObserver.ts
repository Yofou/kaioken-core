import { cleanupHook, depsRequireChange, sideEffectsEnabled, useHook } from "kaioken"

const isSupported = "window" in globalThis && "ResizeObserver" in globalThis.window

export const useResizeObserver = (
  ref: Kaioken.Ref<Element | null>,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions | undefined = undefined
) => {
  if (!sideEffectsEnabled()) return {
      isSupported,
      start: () => {},
      stop: () => {},
  }

  if (!isSupported) {
    return {
      isSupported,
      start: () => {},
      stop: () => {},
    }
  }

  return useHook(
    'useResizeObserver',
    {
      resizeObserver: null as ResizeObserver | null,
      deps: [ref.current],
    },
    ({ oldHook, hook, queueEffect }) => {
      if (!oldHook) {
        hook.resizeObserver = new ResizeObserver(callback)
        hook.cleanup = () => {
          hook.resizeObserver?.disconnect?.()
          hook.resizeObserver = null
        }
      }

      queueEffect(() => {
        if (depsRequireChange([ref.current], oldHook?.deps)) {
          hook.deps = [ref.current]
          hook.resizeObserver?.disconnect?.()
          if (ref.current) {
            hook.resizeObserver?.observe(ref.current, options)
          }
        }
      })

      return {
        isSupported,
        start: () => {
          if (hook.resizeObserver != null) {
            return
          }
          hook.resizeObserver = new ResizeObserver(callback)
          if (ref.current) {
            hook.resizeObserver.observe(ref.current, options)
          }

          hook.cleanup = () => {
            hook.resizeObserver?.disconnect?.()
            hook.resizeObserver = null
          }
        },
        stop: () => {
          cleanupHook(hook)
        },
      }
    }
  )
}
