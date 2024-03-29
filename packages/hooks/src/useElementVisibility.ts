import { useRef, useState } from "kaioken"
import { useIntersectionObserver } from "./useIntersectionObserver"

export const useElementVisibility = () => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<Element>(null)

  useIntersectionObserver(ref, (items) => {
    let latestTime = 0
    let isIntersecting = false

    items.forEach(item => {
      if (item.time >= latestTime) {
        latestTime = item.time
        isIntersecting = item.isIntersecting
      }
    })

    setIsVisible(isIntersecting)
  })

  return [ref, isVisible] as const
}
