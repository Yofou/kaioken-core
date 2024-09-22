import { useClickOutside, useKeyDown } from "@kaioken-core/hooks"
import { createContext, signal, Signal, useCallback, useContext } from "kaioken"

export type UnwrapContext<T extends Kaioken.Context<any>> = NonNullable<
  ReturnType<T["default"]>
>

export const KeyboardContext = createContext<{
  uid: string
  isActive: Signal<boolean>
  start: () => void
  stop: () => void
  __dev?: string
} | null>(null)
type KeyboardParams = Parameters<typeof useKeyDown>
KeyboardContext.displayName = "Keyboard.Context"

export const keyboardStack = signal([] as string[])

export const useAwareKeyDown = (
  key: KeyboardParams[0],
  handler: KeyboardParams[1],
  options?: KeyboardParams[2]
) => {
  const keyboardCtx = useContext(KeyboardContext)
  const innerHandler: KeyboardParams[1] = useCallback(
    (e) => {
      if (keyboardCtx?.isActive?.value) {
        handler(e)
      }
    },
    [handler]
  )

  return useKeyDown(key, innerHandler, options)
}

type ClickoutFunc = typeof useClickOutside
export const useAwareClickOutside: ClickoutFunc = (key, handler, options) => {
  const keyboardCtx = useContext(KeyboardContext)
  const innerHandler: typeof handler = useCallback(
    (e) => {
      if (keyboardCtx?.isActive?.value) {
        handler(e)
      }
    },
    [handler]
  )

  return useClickOutside(key, innerHandler, options)
}

export const setPolyRef = (
  ref: Kaioken.Signal<any> | Kaioken.MutableRefObject<any> | Function,
  value: Element | null
) => {
  if (Signal.isSignal(ref)) {
    ref.sneak(value)
  } else if (ref instanceof Function) {
    ref(value)
  } else if (ref && "current" in ref) {
    ref.current = value
  }
}
