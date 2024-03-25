import { useEffect, useState } from "kaioken"
import { useEventListener } from "./useEventListener"

export const useDocumentVisibility = () => {
  const [isVisible, setIsVisible] = useState(true)

  const update = () => {
    setIsVisible(document.visibilityState === "visible")
  }

  useEffect(update, [])
  useEventListener("visibilitychange", update, {
    ref: () => document,
  })

  return [isVisible]
}
