import { useComputed, useCallback, useEffect, useMemo } from "kaioken"
import { KeyboardContext, keyboardStack } from "../utils"

type RootProps = {
  immediate?: boolean
  __dev?: string
}

export const Root: Kaioken.FC<RootProps> = (props) => {
  const immediate = props.immediate ?? true
  const uid = useMemo(() => {
    return crypto.randomUUID()
  }, [])
  const isActive = useComputed(() => {
    return keyboardStack.value.at(0) === uid
  })

  const start = useCallback(() => {
    if (!keyboardStack.value.includes(uid)) {
      keyboardStack.value = [uid, ...keyboardStack.value]
    }
  }, [])

  const stop = useCallback(() => {
    if (keyboardStack.value.includes(uid)) {
      keyboardStack.value = keyboardStack.value.filter((id) => id != uid)
    }
  }, [])

  useEffect(() => {
    if (immediate) {
      start()
    }

    return () => {
      if (immediate) {
        stop()
      }
    }
  }, [])

  return (
    <KeyboardContext.Provider
      value={{
        uid,
        isActive,
        start,
        stop,
      }}
    >
      {props.children}
    </KeyboardContext.Provider>
  )
}
Root.displayName = "KeyboardStack.Root"
