import { signal } from "kaioken"
import { useRafFn } from "./useRafFn"

export const useWindowPosition = () => {
  const screenX = signal(0)
  const screenY = signal(0)

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
