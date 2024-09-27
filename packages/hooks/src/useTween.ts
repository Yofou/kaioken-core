import {
  sideEffectsEnabled,
  useHook,
  ReadonlySignal,
  signal,
  Signal,
} from "kaioken"
import { noop } from "kaioken/utils"
import { getInterpolator } from "./motion/utils"
import { Task, TweenedOptions } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { linear } from "../lib/easing"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

/** TODO: Make a PR in kaioken to export makeReadonly */

export const useTween = <T>(
  initial: T,
  defaults = {} as TweenedOptions<T>
): [
  ReadonlySignal<T>,
  (value: T, options?: TweenedOptions<T>) => Promise<void>,
] => {
  const internalSignal = signal(initial)
  if (!sideEffectsEnabled()) {
    return [internalSignal, noop as () => Promise<void>]
  }

  return useHook(
    "useTween",
    {
      signal: undefined as any as Signal<T>,
      dispatch: noop as any as (
        value: T,
        options?: TweenedOptions<T>
      ) => Promise<void>,
      task: undefined as Task | undefined,
      targetValue: undefined as T,
    },
    ({ hook, isInit }) => {
      if (isInit) {
        hook.signal = internalSignal
        hook.dispatch = (setter: T, options = {} as TweenedOptions<T>) => {
          const newState = setter
          hook.targetValue = newState

          if (newState == null) {
            hook.signal.value = newState
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

            hook.signal.value = newState
            return Promise.resolve()
          }

          const start = raf.now() + delay
          let fn: (t: number) => T
          hook.task = loop((now) => {
            if (now < start) return true
            if (!started) {
              fn = interpolate(hook.signal.value, newState)
              if (typeof duration === "function") {
                duration = duration(hook.signal.value, newState)
              }
              started = true
            }
            if (previousTask) {
              previousTask.abort()
              previousTask = undefined
            }
            const elapsed = now - start
            if (elapsed > (duration as number)) {
              hook.signal.value = newState
              return false
            }

            hook.signal.value = fn(easing(elapsed / (duration as number)))
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

      return [hook.signal, hook.dispatch] as [
        ReadonlySignal<T>,
        (value: T, options?: TweenedOptions<T>) => Promise<void>,
      ]
    }
  )
}
