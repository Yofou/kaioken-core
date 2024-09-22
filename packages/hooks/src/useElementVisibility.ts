import { useRef, signal } from "kaioken"
import { useIntersectionObserver } from "./useIntersectionObserver"

export const useElementVisibility = <T extends Element = Element>() => {
  const isVisible = signal(false)
  const ref = useRef<T | null>(null)

  useIntersectionObserver(ref, (items) => {
    let latestTime = 0
    let isIntersecting = false

    items.forEach((item) => {
      if (item.time >= latestTime) {
        latestTime = item.time
        isIntersecting = item.isIntersecting
      }
    })

    isVisible.value = isIntersecting
  })

  return [ref, isVisible] as const
}
