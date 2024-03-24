import { useEffect, useState } from "kaioken"
import { useEventListener } from "./useEventListener"
import { useResizeObserver } from "./useResizeObserver"
import { useMutationObserver } from "./useMutationObserver"

type UseElementBoundingOptions = {
  windowScroll?: boolean,
  windowResize?: boolean,
  immediate?: boolean
}

export const useElementBounding = (ref: Kaioken.Ref<Element>, options: UseElementBoundingOptions = {
  windowScroll: true,
  windowResize: true,
}) => {
  const windowScroll = options?.windowScroll ?? true
  const windowResize = options?.windowResize ?? true
  const immediate = options.immediate ?? true

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [top, setTop]= useState(0)
  const [right, setRight]= useState(0)
  const [bottom, setBottom]= useState(0)
  const [left, setLeft]= useState(0)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const update = () => {
    const el = ref.current

    if (!el) {
        setWidth(0)
        setHeight(0)
        setTop(0);
        setRight(0)
        setBottom(0);
        setLeft(0);
        setX(0)
        setY(0)
      return
    }

    const rect = el.getBoundingClientRect()
    setWidth(rect.width)
    setHeight(rect.height)
    setTop(rect.top);
    setRight(rect.right)
    setBottom(rect.bottom);
    setLeft(rect.left);
    setX(rect.x)
    setY(rect.y)
  }

  
  useResizeObserver(ref, update)
  useMutationObserver(ref, update, {
    attributeFilter: ['style', 'class'],
  })

  if (windowScroll) {
    useEventListener('scroll', update, { capture: true, passive: true })
  }

  if (windowResize) {
    useEventListener('resize', update, { passive: true })
  }

  useEffect(() => {
    if (immediate) {
      update()
    }
  }, [])

  return {
    width,
    height,
    top,
    right,
    bottom,
    left,
    x,
    y,
    update
  }
}
