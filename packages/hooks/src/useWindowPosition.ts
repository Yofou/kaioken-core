import { useSignal } from "kaioken"
import { useRafFn } from "./useRafFn"

export const useWindowPosition = () => {
  const screenX = useSignal(0)
  const screenY = useSignal(0)

  useRafFn(
    () => {
      if (window.screenX !== screenX.value) {
        screenX.value = window.screenX
      }

      if (window.screenY !== screenY.value) {
        screenY.value = window.screenY
      }
    },
    { immediate: true }
  )

  return {
    screenX,
    screenY,
  }
}
