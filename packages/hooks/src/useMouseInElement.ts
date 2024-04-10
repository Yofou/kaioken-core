import { useEffect, useState } from "kaioken"
import { useMouse } from "./useMouse";
import { useEventListener } from "./useEventListener";

export const useMouseInElement = (
  target: Kaioken.Ref<HTMLElement>,
) => {
  const { mouse } = useMouse()
  const [elementX, setElementX] = useState(0);
  const [elementY, setElementY] = useState(0);
  const [elementPositionX, setElementPositionX] = useState(0);
  const [elementPositionY, setElementPositionY] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [isOutside, setIsOutside] = useState(true);

  useEffect(() => {
    const el = target.current;
    if (!el) return;

    const {
      left,
      top,
      width,
      height,
    } = el.getBoundingClientRect();

    const tempElementPositionX = left + window.scrollX
    const tempElementPositionY = top + window.scrollY

    setElementPositionX(tempElementPositionX)
    setElementPositionY(tempElementPositionY)
    setElementWidth(width)
    setElementHeight(height)

    const elX = mouse.x - tempElementPositionX
    const elY = mouse.y - tempElementPositionY

    const tempIsOutside = width === 0 || height === 0 ||elX < 0 || elY < 0 || elX > width || elY > height
    setIsOutside(
      tempIsOutside
    )

    if (!tempIsOutside) {
      setElementX(elX)
      setElementY(elY)
    } 
  }, [target.current, mouse.x, mouse.y])

  useEventListener('mouseleave', () => {
    setIsOutside(true)
  }, {
    ref: () => document
  })

  return {
    x: mouse.x,
    y: mouse.y,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementHeight,
    elementWidth,
    isOutside,
  }
}
