import { sideEffectsEnabled, useHook, Signal, useVNode } from "kaioken"
import { getInterpolator } from "./motion/utils"
import { Task, TweenedOptions } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { linear } from "../lib/easing"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

/** TODO: Make a PR in kaioken to export makeReadonly */

export class TweenSignal<T> extends Signal<T> {
  #task: Task | undefined
  #defaults: TweenedOptions<T>

  constructor(initial: T, options?: TweenedOptions<T>, displayName?: string) {
    super(initial, displayName)

    this.#task = undefined
    this.#defaults = options ?? {}
  }

  #setInternal(next: T) {
    this.sneak(next)
    this.notify()
  }

  set(next: T, options = {} as TweenedOptions<T>) {
    const newState = next

    if (newState == null) {
      this.#setInternal(newState)
      return Promise.resolve()
    }

    let previousTask = this.#task

    let started = false
    let {
      delay = 0,
      duration = 400,
      easing = linear,
      interpolate = getInterpolator,
    } = { ...this.#defaults, ...options }

    if (duration === 0) {
      if (previousTask) {
        previousTask.abort()
        previousTask = undefined
      }

      this.#setInternal(newState)
      return Promise.resolve()
    }

    const start = raf.now() + delay
    let fn: (t: number) => T
    this.#task = loop((now) => {
      if (now < start) return true
      if (!started) {
        fn = interpolate(this.value, newState)
        if (typeof duration === "function") {
          duration = duration(this.value, newState)
        }
        started = true
      }
      if (previousTask) {
        previousTask.abort()
        previousTask = undefined
      }
      const elapsed = now - start
      if (elapsed > (duration as number)) {
        this.#setInternal(newState)
        return false
      }

      this.#setInternal(fn(easing(elapsed / (duration as number))))
      this.notify()
      return true
    })

    return this.#task.promise
  }

  /**
   * @description cancels the request animation frame loop that's handling interpolation, It's likely you'll never need to call this yourself
   */
  abortTask() {
    if (this.#task) {
      this.#task.abort()
    }
  }
}

export const tween = <T>(
  initial: T,
  defaults = {} as TweenedOptions<T>,
  displayName?: string
): TweenSignal<T> => {
  const internalSignal = new TweenSignal(initial, defaults, displayName)
  if (!sideEffectsEnabled()) {
    return internalSignal
  }

  try {
    // This will throw an exception if we're not in a kaioken component context "environment"
    // Thanks moose :))
    useVNode()
    return useHook(
      "useTween",
      {
        signal: undefined as any as TweenSignal<T>,
      },
      ({ hook, isInit }) => {
        if (isInit) {
          hook.signal = internalSignal
          hook.cleanup = () => {
            hook.signal.abortTask()
            TweenSignal.subscribers(hook.signal).clear()
          }
        }

        return hook.signal
      }
    )
  } catch {
    return internalSignal
  }
}
