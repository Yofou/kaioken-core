import { sideEffectsEnabled, useEffect } from "kaioken"
import { SpringOpts } from "./motion/types"
import { spring, SpringSignal } from "./useSpring"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export const useSpringMemo = <T>(
  factory: () => T,
  deps: unknown[],
  opts = {} as Partial<SpringOpts>
): SpringSignal<T> => {
  const internalSignal = spring(factory(), opts)
  if (!sideEffectsEnabled()) return internalSignal

  useEffect(() => {
    internalSignal.set(factory(), opts)
  }, deps)

  return internalSignal
}
