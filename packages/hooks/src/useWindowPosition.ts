import { useState } from "kaioken";
import { useRafFn } from "./useRafFn";

export const useWindowPosition = () => {
  const [screenX, setScreenX] = useState(0)
  const [screenY, setScreenY] = useState(0)

  useRafFn(() => {
    if (window.screenX !== screenX) {
      setScreenX(window.screenX)
    }

    if (window.screenY !== screenY) {
      setScreenY(window.screenY)
    }
  }, { immediate: true  })

  return {
    screenX,
    screenY,
  }
};
