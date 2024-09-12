import { Signal } from "kaioken"

const setPolyRef = (
  ref: Kaioken.Signal<any> | Kaioken.MutableRefObject<any>,
  value: Element
) => {
  if (Signal.isSignal(ref)) {
    Signal.setValueSilently(ref, value)
  } else if (ref instanceof Function) {
    ref(value)
  } else if (ref && "current" in ref) {
    ref.current = value
  }
}

export const mergeEventProps = (slotProps: any, childProps: any) => {
  const newProps: Record<any, any> = {}

  for (let key of Object.keys(slotProps)) {
    if (key.startsWith("on") && childProps[key]) {
      newProps[key] = (...args: any[]) => {
        childProps[key]?.(...args)
        slotProps[key]?.(...args)
      }
      continue
    } else if (key === "ref") {
      newProps[key] = (el: Element) => {
        setPolyRef(childProps[key], el)
        setPolyRef(slotProps[key], el)
      }

      continue
    }

    newProps[key] = slotProps[key]
  }

  return newProps as any
}
