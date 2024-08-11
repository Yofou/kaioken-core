import { useCallback, useEffect, useState } from "kaioken"
import { useEventListener } from "./useEventListener"

export const useWindowScroll = (behavior: ScrollBehavior = "auto") => {
  const [x, _setX] = useState(0)
  const [y, _setY] = useState(0)

  const update = () => {
    _setX(window.scrollX)
    _setY(window.scrollY)
  }

  useEffect(update, [])
  useEventListener("scroll", update, {
    capture: false,
    passive: true,
  })

  const setX = useCallback((value: number, behaviourOverride?: ScrollBehavior) => {
    scrollTo({ left: value, behavior: behaviourOverride ?? behavior })
  }, [])

	const setY = useCallback((value: number, behaviourOverride?: ScrollBehavior) => {
    scrollTo({ top: value, behavior: behaviourOverride ?? behavior })
  }, [])

  return { x, y, setX, setY }
}
