import { useEffect, signal } from "kaioken"
import { useEventListener } from "./useEventListener"
import { useMediaQuery } from "./useMediaQuery"

export const useWindowSize = (listenOrientation: boolean = true) => {
  const width = signal(0)
  const height = signal(0)

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
