import { signal, useEffect } from "kaioken"
import { useEventListener } from "./useEventListener"

type ActiveElementOptions = {
  deep?: boolean
}

export const useActiveElement = (options: ActiveElementOptions = {}) => {
  const deep = options.deep ?? true
  const activeElement = signal<Element | null>(null)

  const getDeepActiveElement = () => {
    let element = document?.activeElement
    if (deep) {
      while (element?.shadowRoot) element = element?.shadowRoot?.activeElement
    }
    return element
  }

  const update = () => {
    activeElement.value = getDeepActiveElement()
  }

  useEventListener("focus", update, {
    capture: true,
  })

  useEventListener(
    "blur",
    (event) => {
      if (event.relatedTarget === null) {
        update()
      }
    },
    {
      capture: true,
    }
  )

  useEffect(update, [])
  return activeElement
}
