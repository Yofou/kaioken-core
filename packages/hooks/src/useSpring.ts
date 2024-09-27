import {
  ReadonlySignal,
  sideEffectsEnabled,
  Signal,
  signal,
  useHook,
} from "kaioken"
import { noop } from "kaioken/utils"
import { SpringOpts, TickContext, type Task } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { tickSpring } from "./motion/spring"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export const useSpring = <T>(
  initial: T,
  opts = {} as Partial<SpringOpts>
): [
  ReadonlySignal<T>,
  (value: T, opts?: Partial<SpringOpts>) => Promise<void>,
] => {
  const internalSignal = signal(initial)
  if (!sideEffectsEnabled()) {
    return [
      internalSignal,
      noop as any as (value: T, opts?: Partial<SpringOpts>) => Promise<void>,
    ]
  }

  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts

  return useHook(
    "useSpring",
    () => ({
      signal: undefined as any as Signal<T>,
      dispatch: noop as any as (
        value: T,
        opts?: Partial<SpringOpts>
      ) => Promise<void>,
      lastTime: undefined as number | undefined,
      task: undefined as Task | undefined,
      currentToken: undefined as object | undefined,
      lastValue: structuredClone(initial),
      targetValue: structuredClone(initial),
      invMass: 1,
      invMassRecoveryRate: 0,
      cancelTask: false,
    }),
    ({ hook, isInit }) => {
      if (isInit) {
        hook.signal = internalSignal
        hook.dispatch = (setter: T, opts = {} as SpringOpts) => {
          const spring: SpringOpts = {
            stiffness,
            damping,
            precision,
            ...opts,
          }

          const newValue = setter

          hook.targetValue = newValue
          hook.currentToken = {}
          const token = hook.currentToken
          if (
            newValue == null ||
            opts.hard ||
            (spring.stiffness >= 1 && spring.damping >= 1)
          ) {
            hook.cancelTask = true
            hook.lastTime = raf.now()
            hook.lastValue = newValue
            hook.signal.value = hook.targetValue
            return Promise.resolve()
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
              hook.invMass = Math.min(
                hook.invMass + hook.invMassRecoveryRate,
                1
              )
              const ctx: TickContext = {
                inv_mass: hook.invMass,
                opts: spring,
                settled: true,
                dt: ((now - (hook.lastTime ?? raf.now())) * 60) / 1000,
              }
              const nextValue = tickSpring(
                ctx,
                hook.lastValue,
                hook.signal.value,
                hook.targetValue
              )
              hook.lastTime = now
              hook.lastValue = hook.signal.value
              hook.signal.value = nextValue
              if (ctx.settled) {
                hook.task = undefined
              }
              return !ctx.settled
            })
          }

          return new Promise((fulfil) => {
            hook.task?.promise.then(() => {
              if (token === hook.currentToken) fulfil(undefined)
            })
          })
        }
        hook.cleanup = () => {
          if (hook.task) {
            hook.task.abort()
          }
        }
      }

      return [hook.signal, hook.dispatch] as [
        ReadonlySignal<T>,
        (value: T, opts?: Partial<SpringOpts>) => Promise<void>,
      ]
    }
  )
}
