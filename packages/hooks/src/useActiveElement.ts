import { useEffect, useState } from "kaioken"
import { useEventListener } from "./useEventListener"

type ActiveElementOptions = {
  deep?: boolean
}

export const useActiveElement = (options: ActiveElementOptions = {}) => {
  const deep = options.deep ?? true
  const [activeElement, setActiveElement] = useState<Element | null>(null)

  const getDeepActiveElement = () => {
    let element = document?.activeElement
    if (deep) {
      while (element?.shadowRoot) element = element?.shadowRoot?.activeElement
    }
    return element
  }

  const update = () => {
    setActiveElement(getDeepActiveElement())
  }

  useEventListener(
    "focus",
    (event) => {
      if (event.relatedTarget === null) {
        update()
      }
    },
    {
      capture: true,
    }
  )

  useEventListener("blur", update, {
    capture: true,
  })

  useEffect(update, [])

  return [activeElement]
}
