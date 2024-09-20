import { useEffect, useState } from "kaioken"
import { useMouse } from "./useMouse"
import { useEventListener } from "./useEventListener"

export const useMouseInElement = (
  target: Kaioken.MutableRefObject<HTMLElement | null>
) => {
  const { mouse } = useMouse()
  const [elementX, setElementX] = useState(0)
  const [elementY, setElementY] = useState(0)
  const [elementPositionX, setElementPositionX] = useState(0)
  const [elementPositionY, setElementPositionY] = useState(0)
  const [elementWidth, setElementWidth] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [isOutside, setIsOutside] = useState(true)

  useEffect(() => {
    const el = target.current
    if (!el) return

    const { left, top, width, height } = el.getBoundingClientRect()

    const tempElementPositionX = left + window.scrollX
    const tempElementPositionY = top + window.scrollY

    setElementPositionX(tempElementPositionX)
    setElementPositionY(tempElementPositionY)
    setElementWidth(width)
    setElementHeight(height)

    const elX = mouse.value.x - tempElementPositionX
    const elY = mouse.value.y - tempElementPositionY

    const tempIsOutside =
      width === 0 ||
      height === 0 ||
      elX < 0 ||
      elY < 0 ||
      elX > width ||
      elY > height
    setIsOutside(tempIsOutside)

    if (!tempIsOutside) {
      setElementX(elX)
      setElementY(elY)
    }
  }, [target.current, mouse.value.x, mouse.value.y])

  useEventListener(
    "mouseleave",
    () => {
      setIsOutside(true)
    },
    {
      ref: () => document,
    }
  )

  return {
    x: mouse.value.x,
    y: mouse.value.y,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
  }
}
