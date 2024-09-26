import { useEffect, signal } from "kaioken"
import { useEventListener } from "./useEventListener"

export const useWindowFocus = () => {
  const focused = signal(false)

  useEffect(() => {
    focused.value = window.document.hasFocus()
  }, [])

  useEventListener("focus", () => {
    focused.value = true
  })

  useEventListener("blur", () => {
    focused.value = false
  })

  return [focused]
}
