import { useCallback, useState } from "kaioken"
import { useRafFn } from "./useRafFn"

type useElementByPointOptions<M extends boolean = false> = {
  x: number,
  y: number,
  multiple?: M,
  immediate?: boolean,
}

type UseElementByPointReturn<M extends boolean = false> = {
  element: M extends true ? HTMLElement[] : HTMLElement | null,
  start: () => void,
  stop: () => void,
  isActive: boolean,
}

export const useElementByPoint = <M extends boolean = false,>(
  options: useElementByPointOptions<M>
) => {
  const {
    x,
    y,
    multiple,
    immediate = true,
  } = options

  const [element, setElement] = useState<any>(null)
  const cb = useCallback(() => {
    setElement(
      multiple 
        ? document.elementsFromPoint(x, y) ?? []
        : document.elementFromPoint(x, y) ?? null
    )
  }, [x, y])

  const controls = useRafFn(cb, { immediate })

  return {
    element,
    ...controls
  } as UseElementByPointReturn<M>
}
