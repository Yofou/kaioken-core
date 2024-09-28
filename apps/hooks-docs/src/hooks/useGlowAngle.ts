import { disableAnimation } from "$/utils/disableAnimation"
import { useElementBounding, useMouse, useTweenMemo } from "@kaioken-core/hooks"
import { computed, useRef } from "kaioken"

function minAbs(x: number, y: number, old: number) {
  return Math.abs(x - old) < Math.abs(y - old) ? x : y
}

export const useGlowAngle = <T extends HTMLElement>(duration = 500) => {
  const ref = useRef<T | null>(null)
  const asideBounding = useElementBounding(ref)
  const asideX = computed(() => {
    return asideBounding.width.value / 2 + asideBounding.left.value
  })
  const asideY = computed(() => {
    return asideBounding.height.value / 2 + asideBounding.top.value
  })

  const { mouse } = useMouse()

  const oldAngle = useRef<number | null>(null)

  // in the future it could be possible to make a purely tween "computed" that doesn't rely on us subbing to any components
  const angle = useTweenMemo(
    () => {
      const newAngle =
        Math.atan2(mouse.value.y - asideY.value, mouse.value.x - asideX.value) *
        (180 / Math.PI)

      if (!oldAngle.current) {
        oldAngle.current = newAngle
        return newAngle
      } else if (disableAnimation.value) {
        return oldAngle.current
      }

      const cycles = (oldAngle.current / 360) | 0

      // cycles being one full rotation
      // we compare if we should use the angle as is or one cycle back or forward
      const resultAngle = minAbs(
        minAbs(
          newAngle + cycles * 360,
          newAngle + (cycles - 1) * 360,
          oldAngle.current
        ),
        newAngle + (cycles + 1) * 360,
        oldAngle.current
      )

      oldAngle.current = resultAngle

      return resultAngle
    },
    [
      mouse.value.x,
      mouse.value.y,
      asideX.value,
      asideY.value,
      disableAnimation.value,
    ],
    {
      duration,
    }
  )

  const displayAngle = computed(() => {
    return `${angle.value | 0}deg`
  })

  return [ref, displayAngle] as const
}
