import { signal } from "kaioken"
import { useEventListener } from "./useEventListener"

export const useMouse = () => {
  const mouse = signal({ x: 0, y: 0 })
  const delta = signal({ x: 0, y: 0 })
  const client = signal({ x: 0, y: 0 })

  useEventListener("mousemove", (event) => {
    mouse.value = {
      x: event.x,
      y: event.y,
    }

    delta.value = {
      x: event.movementX,
      y: event.movementY,
    }

    client.value = {
      x: event.clientX,
      y: event.clientY,
    }
  })

  return { mouse, delta, client }
}
