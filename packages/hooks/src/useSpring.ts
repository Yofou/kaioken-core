import { sideEffectsEnabled, Signal, useHook, useVNode } from "kaioken"
import { SpringOpts, TickContext, type Task } from "./motion/types"
import { loop, raf } from "./motion/loop"
import { tickSpring } from "./motion/spring"

/*
  Adapted from https://github.com/sveltejs/svelte/tree/main/packages/svelte/src/motion
  Distributed under MIT License https://github.com/sveltejs/svelte/blob/main/LICENSE.md
*/

export class SpringSignal<T> extends Signal<T> {
  lastTime: number | undefined
  task: Task | undefined
  currentToken: object | undefined
  lastValue: T
  targetValue: T
  invMass: number
  invMassRecoveryRate: number
  cancelTask: boolean
  options: Partial<SpringOpts>

  constructor(initial: T, options?: Partial<SpringOpts>, displayName?: string) {
    super(initial, displayName)

    this.options = options ?? {}
    ;(this.lastTime = undefined), (this.task = undefined)
    this.currentToken = undefined
    this.lastValue = structuredClone(initial)
    this.targetValue = structuredClone(initial)
    this.invMass = 1
    this.invMassRecoveryRate = 0
    this.cancelTask = false
  }

  #setInternal(next: T) {
    this.sneak(next)
    this.notify()
  }

  set(next: T, opts = {} as Partial<SpringOpts>) {
    const spring: SpringOpts = {
      stiffness: this.options.stiffness ?? 0.15,
      damping: this.options.damping ?? 0.8,
      precision: this.options.precision ?? 0.01,
      ...opts,
    }

    const newValue = next

    this.targetValue = newValue
    this.currentToken = {}
    const token = this.currentToken
    if (
      newValue == null ||
      opts.hard ||
      (spring.stiffness >= 1 && spring.damping >= 1)
    ) {
      this.cancelTask = true
      this.lastTime = raf.now()
      this.lastValue = newValue
      this.#setInternal(this.targetValue)
      return Promise.resolve()
    } else if (opts.soft) {
      const rate = opts.soft === true ? 0.5 : +opts.soft
      this.invMassRecoveryRate = 1 / (rate * 60)
      this.invMass = 0 // infinite mass, unaffected by spring forces
    }

    if (!this.task) {
      this.lastTime = raf.now()
      this.cancelTask = false

      this.task = loop((now) => {
        if (this.cancelTask) {
          this.cancelTask = false
          this.task = undefined
          return false
        }
        this.invMass = Math.min(this.invMass + this.invMassRecoveryRate, 1)
        const ctx: TickContext = {
          inv_mass: this.invMass,
          opts: spring,
          settled: true,
          dt: ((now - (this.lastTime ?? raf.now())) * 60) / 1000,
        }
        const nextValue = tickSpring(
          ctx,
          this.lastValue,
          this.value,
          this.targetValue
        )
        this.lastTime = now
        this.lastValue = this.value

        this.#setInternal(nextValue)
        if (ctx.settled) {
          this.task = undefined
        }
        return !ctx.settled
      })
    }

    return new Promise((fulfil) => {
      this.task?.promise.then(() => {
        if (token === this.currentToken) fulfil(undefined)
      })
    })
  }
}

export const spring = <T>(
  initial: T,
  options?: Partial<SpringOpts>,
  displayName?: string
) => {
  const internalSignal = new SpringSignal(initial, options, displayName)
  if (!sideEffectsEnabled()) {
    return internalSignal
  }

  try {
    useVNode()
    return useHook(
      "useSpring",
      {
        signal: undefined as any as SpringSignal<T>,
      },
      ({ hook, isInit }) => {
        if (isInit) {
          hook.signal = internalSignal
          hook.cleanup = () => {
            if (hook.signal.task) {
              hook.signal.task.abort()
            }

            SpringSignal.subscribers(hook.signal).clear()
          }
        }

        return hook.signal
      }
    )
  } catch {
    return internalSignal
  }
}
