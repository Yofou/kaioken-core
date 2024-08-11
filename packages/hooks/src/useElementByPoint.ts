import { signal, useEffect, useState } from "kaioken"
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
  const _x = signal(x)
  const _y = signal(y)
  const cb = () => {
    setElement(
      multiple 
        ? document.elementsFromPoint(_x.value, _y.value) ?? []
        : document.elementFromPoint(_x.value, _y.value) ?? null
    )
  }

  const controls = useRafFn(cb, { immediate })

  useEffect(() => {
    _x.value = x
    _y.value = y
  }, [x, y])

  return {
    element,
    ...controls
  } as UseElementByPointReturn<M>
}
