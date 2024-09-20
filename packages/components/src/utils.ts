import { useKeyDown } from "@kaioken-core/hooks"
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
