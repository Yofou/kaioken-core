import { cleanupHook, depsRequireChange, sideEffectsEnabled, useHook } from "kaioken"

const isSupported = "window" in globalThis && "IntersectionObserver" in globalThis.window
export const useIntersectionObserver = (
  ref: Kaioken.Ref<Element | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit | undefined = undefined
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

  // TODO: get rid of deps array
  return useHook(
    'useIntersectionObserver',
    {
      intersectionObserver: null as IntersectionObserver | null,
      deps: [ref.current],
    },
    ({ isInit, hook, queueEffect }) => {
      if (isInit) {
        hook.intersectionObserver = new IntersectionObserver(callback, options)
        hook.cleanup = () => {
          hook.intersectionObserver?.disconnect?.()
          hook.intersectionObserver = null
        }
      }

      queueEffect(() => {
        if (depsRequireChange([ref.current], hook.deps)) {
          hook.deps = [ref.current]
          hook.intersectionObserver?.disconnect?.()
          if (ref.current) {
            hook.intersectionObserver?.observe(ref.current)
          }
        }
      })

      return {
        isSupported,
        start: () => {
          if (hook.intersectionObserver != null) {
            return
          }
          hook.intersectionObserver = new IntersectionObserver(callback, options)
          if (ref.current) {
            hook.intersectionObserver.observe(ref.current)
          }

          hook.cleanup = () => {
            hook.intersectionObserver?.disconnect?.()
            hook.intersectionObserver = null
          }
        },
        stop: () => {
          cleanupHook(hook)
        },
      }
    }
  )
}
