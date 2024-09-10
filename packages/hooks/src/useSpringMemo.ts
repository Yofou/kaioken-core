import { depsRequireChange, sideEffectsEnabled, useHook } from "kaioken"
import { SpringOpts, Task, TickContext } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { tickSpring } from "./motion/spring"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export const useSpringMemo = <T>(
  factory: () => T,
  deps: unknown[],
  opts = {} as Partial<SpringOpts>
): T => {
  if (!sideEffectsEnabled()) return factory()

  return useHook(
    "useSpringMemo",
    {
      deps,
      value: undefined as T,
      lastTime: undefined as number | undefined,
      task: undefined as Task | undefined,
      lastValue: undefined as T,
      targetValue: undefined as T,
      invMass: 1,
      invMassRecoveryRate: 0,
      cancelTask: false,
    },
    ({ hook, isInit, update }) => {
      if (isInit) {
        hook.deps = deps
        hook.value = factory()
        hook.lastValue = structuredClone(hook.value)
        hook.targetValue = structuredClone(hook.value)

        hook.cleanup = () => {
          if (hook.task) {
            hook.task.abort()
          }
        }
      } else if (depsRequireChange(deps, hook?.deps)) {
        hook.deps = deps
        const spring: SpringOpts = {
          ...opts,
          damping: opts.damping ?? 0.8,
          stiffness: opts.stiffness ?? 0.15,
          precision: opts.precision ?? 0.01,
        }
        const newValue = factory()
        hook.targetValue = newValue

        if (
          newValue == null ||
          opts.hard ||
          (spring.stiffness >= 1 && spring.damping >= 1)
        ) {
          hook.cancelTask = true
          hook.lastTime = raf.now()
          hook.lastValue = newValue
          hook.value = hook.targetValue
          update()
          return hook.value
        } else if (opts.soft) {
          const rate = opts.soft === true ? 0.5 : +opts.soft
          hook.invMassRecoveryRate = 1 / (rate * 60)
          hook.invMass = 0 // infinite mass, unaffected by spring forces
        }

        if (!hook.task) {
          hook.lastTime = raf.now()
          hook.cancelTask = false

          hook.task = loop((now) => {
            if (hook.cancelTask) {
              hook.cancelTask = false
              hook.task = undefined
              return false
            }
            hook.invMass = Math.min(hook.invMass + hook.invMassRecoveryRate, 1)
            const ctx: TickContext = {
              inv_mass: hook.invMass,
              opts: spring,
              settled: true,
              dt: ((now - (hook.lastTime ?? raf.now())) * 60) / 1000,
            }
            const nextValue = tickSpring(
              ctx,
              hook.lastValue,
              hook.value,
              hook.targetValue
            )
            hook.lastTime = now
            hook.lastValue = hook.value
            hook.value = nextValue
            update()
            if (ctx.settled) {
              hook.task = undefined
            }
            return !ctx.settled
          })
        }
      }

      return hook.value
    }
  )
}
