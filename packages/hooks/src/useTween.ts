import { sideEffectsEnabled, useHook } from "kaioken"
import { noop } from "kaioken/utils"
import { getInterpolator } from "./motion/utils"
import { Task, TweenedOptions } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { linear } from "../lib/easing"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export const useTween = <T>(
  initial: T | (() => T),
  defaults = {} as TweenedOptions<T>
): [
  T,
  (value: Kaioken.StateSetter<T>, options?: TweenedOptions<T>) => Promise<void>,
] => {
  if (!sideEffectsEnabled()) {
    return [
      initial instanceof Function ? initial() : initial,
      noop as () => Promise<void>,
    ]
  }

  return useHook(
    "useTween",
    {
      value: undefined as T,
      dispatch: noop as any as (
        value: Kaioken.StateSetter<T>,
        options?: TweenedOptions<T>
      ) => Promise<void>,
      task: undefined as Task | undefined,
      targetValue: undefined as T,
    },
    ({ hook, isInit, update }) => {
      if (isInit) {
        hook.value = initial instanceof Function ? initial() : initial
        hook.dispatch = (
          setter: Kaioken.StateSetter<T>,
          options = {} as TweenedOptions<T>
        ) => {
          const newState =
            setter instanceof Function ? setter(hook.value) : setter
          hook.targetValue = newState

          if (newState == null) {
            hook.value = newState
            update()
            return Promise.resolve()
          }

          let previousTask = hook.task

          let started = false
          let {
            delay = 0,
            duration = 400,
            easing = linear,
            interpolate = getInterpolator,
          } = { ...defaults, ...options }

          if (duration === 0) {
            if (previousTask) {
              previousTask.abort()
              previousTask = undefined
            }

            hook.value = newState
            update()
            return Promise.resolve()
          }

          const start = raf.now() + delay
          let fn: (t: number) => T
          hook.task = loop((now) => {
            if (now < start) return true
            if (!started) {
              fn = interpolate(hook.value, newState)
              if (typeof duration === "function") {
                duration = duration(hook.value, newState)
              }
              started = true
            }
            if (previousTask) {
              previousTask.abort()
              previousTask = undefined
            }
            const elapsed = now - start
            if (elapsed > (duration as number)) {
              hook.value = newState
              update()
              return false
            }

            hook.value = fn(easing(elapsed / (duration as number)))
            update()
            return true
          })

          return hook.task.promise
        }

        hook.cleanup = () => {
          if (hook.task) {
            hook.task.abort()
          }
        }
      }

      return [hook.value, hook.dispatch] as [
        T,
        (
          value: Kaioken.StateSetter<T>,
          options?: TweenedOptions<T>
        ) => Promise<void>,
      ]
    }
  )
}
