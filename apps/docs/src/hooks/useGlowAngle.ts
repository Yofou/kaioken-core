import { useElementBounding, useMouse, useTween } from "@kaioken-core/hooks"
import { useEffect, useMemo, useRef } from "kaioken"

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

  const [angle, setAngle] = useTween(() => {
    const _angle = Math.atan2(
      mouse.y - asideY,
      mouse.x - asideX,
    ) * (180 / Math.PI)

    return Math.round(_angle - 90)
  }, {
    duration,
  })

  useEffect(() => {
    const _angle = Math.atan2(
      mouse.y - asideY,
      mouse.x - asideX,
    ) * (180 / Math.PI)

    setAngle(_angle + 70)
  }, [mouse.x, mouse.y, asideX, asideY])

  return [ref, `${Math.round(angle) % 360}deg`] as const
}
