import { useCallback, useEffect, signal } from "kaioken"
import { useEventListener } from "./useEventListener"

export const useWindowScroll = (behavior: ScrollBehavior = "auto") => {
  const x = signal(0)
  const y = signal(0)

  const update = () => {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  useEffect(update, [])
  useEventListener("scroll", update, {
    capture: false,
    passive: true,
  })

  const setX = useCallback(
    (value: number, behaviourOverride?: ScrollBehavior) => {
      scrollTo({ left: value, behavior: behaviourOverride ?? behavior })
    },
    []
  )

  const setY = useCallback(
    (value: number, behaviourOverride?: ScrollBehavior) => {
      scrollTo({ top: value, behavior: behaviourOverride ?? behavior })
    },
    []
  )

  return { x, y, setX, setY }
}
