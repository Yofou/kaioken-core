import { sideEffectsEnabled, useEffect } from "kaioken"
import { TweenedOptions } from "./motion/types"
import { useTween, TweenSignal } from "./useTween"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export function useTweenMemo<T>(
  factory: () => T,
  deps: unknown[],
  options: TweenedOptions<T> = {}
): TweenSignal<T> {
  const internalSignal = useTween(factory(), options)
  if (!sideEffectsEnabled()) return internalSignal

  useEffect(() => {
    internalSignal.set(factory(), options)
  }, deps)

  return internalSignal
}
