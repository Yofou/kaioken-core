import { Signal } from "kaioken"
import { styleObjectToCss } from "kaioken/utils"

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

const styleStringToObject = (value: string | null | undefined) => {
  if (!value) return {}
  return Object.fromEntries(
    value
      .split(";")
      .filter((item) => item.trim().length > 1)
      .map((item) => item.split(":"))
  )
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
    } else if (key === "style") {
      const childStyle =
        typeof childProps[key] === "object"
          ? childProps[key]
          : styleStringToObject(childProps[key])
      const slotStyle =
        typeof slotProps[key] === "object"
          ? slotProps[key]
          : styleStringToObject(slotProps[key])

      newProps[key] = styleObjectToCss({
        ...childStyle,
        ...slotStyle,
      })

      continue
    }

    newProps[key] = slotProps[key]
  }

  return newProps as any
}
