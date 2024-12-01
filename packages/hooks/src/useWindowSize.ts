import { useEffect, useSignal } from "kaioken"
import { useEventListener } from "./useEventListener"
import { useMediaQuery } from "./useMediaQuery"

export const useWindowSize = (listenOrientation: boolean = true) => {
  const width = useSignal(0)
  const height = useSignal(0)

  const update = () => {
    if (window) {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
  }

  useEffect(update, [])
  useEventListener("resize", update, { passive: true })

  if (listenOrientation) {
    const [matches] = useMediaQuery("(orientation: portrait)")
    useEffect(update, [matches.value])
  }

  return { width, height }
}
