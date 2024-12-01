import { useEffect, useSignal, useComputed } from "kaioken"
import { useMouse } from "./useMouse"
import { useEventListener } from "./useEventListener"

export const useMouseInElement = (
  target: Kaioken.MutableRefObject<HTMLElement | null>
) => {
  const { mouse } = useMouse()
  const elementX = useSignal(0)
  const elementY = useSignal(0)
  const elementPositionX = useSignal(0)
  const elementPositionY = useSignal(0)
  const elementWidth = useSignal(0)
  const elementHeight = useSignal(0)
  const isOutside = useSignal(true)
  const mouseX = useComputed(() => mouse.value.x)
  const mouseY = useComputed(() => mouse.value.y)

  useEffect(() => {
    const el = target.current
    if (!el) return

    const { left, top, width, height } = el.getBoundingClientRect()

    const tempElementPositionX = left + window.scrollX
    const tempElementPositionY = top + window.scrollY

    elementPositionX.value = tempElementPositionX
    elementPositionY.value = tempElementPositionY
    elementWidth.value = width
    elementHeight.value = height

    const elX = mouse.value.x - tempElementPositionX
    const elY = mouse.value.y - tempElementPositionY

    const tempIsOutside =
      width === 0 ||
      height === 0 ||
      elX < 0 ||
      elY < 0 ||
      elX > width ||
      elY > height
    isOutside.value = tempIsOutside

    if (!tempIsOutside) {
      elementX.value = elX
      elementY.value = elY
    }
  }, [target.current, mouse.value.x, mouse.value.y])

  useEventListener(
    "mouseleave",
    () => {
      isOutside.value = true
    },
    {
      ref: () => document,
    }
  )

  return {
    x: mouseX,
    y: mouseY,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
  }
}
