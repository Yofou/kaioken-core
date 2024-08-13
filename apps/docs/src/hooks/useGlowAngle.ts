import { useElementBounding, useMouse, useTweenMemo } from "@kaioken-core/hooks"
import { useMemo, useRef } from "kaioken"

export const useGlowAngle = (duration = 500) => {
  const ref = useRef<HTMLElement | null>(null)
  const asideBounding = useElementBounding(ref)
  const [asideX, asideY] = useMemo(() => {
    return [
      (asideBounding.width / 2) + asideBounding.left,
      (asideBounding.height / 2) + asideBounding.top
    ] as const
  }, [asideBounding.top, asideBounding.left, asideBounding.width, asideBounding.height])
  const { mouse } = useMouse()

  const angle = useTweenMemo(() => {
    const _angle = Math.atan2(
      mouse.y - asideY,
      mouse.x - asideX,
    ) * (180 / Math.PI)

    return _angle + 70
  }, [mouse.x, mouse.y, asideX, asideY], {
    duration,
  })

  return [ref, `${Math.round(angle) % 360}deg`] as const
}
