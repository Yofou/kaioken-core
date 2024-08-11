import { useGlowAngle } from "$/hooks/useGlowAngle"
import { useTween } from "@kaioken-core/hooks"
import { useEffect, useMemo } from "kaioken"
import { sineInOut } from "@kaioken-core/hooks/easing"

type GlowBgProps = {
  duration?: number
  isFullGlow?: boolean
}
export const GlowBg: Kaioken.FC<GlowBgProps> = (props) => {
  const [glowRef, angle] = useGlowAngle(props.duration) 
  
  const [glow, setGlow] = useTween({
    start1: 0,
    start2: 60,
    finish1: 60,
    finish2: 100
  }, {
    duration: 250,
    easing: sineInOut
  })

  useEffect(() => {
    if (props.isFullGlow) {
      setGlow({
        start1: 0,
        start2: 0,
        finish1: 0,
        finish2: 100
      })
    } else {
      setGlow({
        start1: 0,
        start2: 60,
        finish1: 60,
        finish2: 100
      })
    }
  }, [props.isFullGlow])

  const glowGrad = useMemo(() => {
    return `linear-gradient(var(--angle), #070707 ${glow.start1}% ${glow.finish1}%, #DC143C ${glow.start2}% ${glow.finish2}%)`
  }, Object.values(glow))
  
  return <div 
    ref={glowRef}
    style={`--angle: ${angle ?? '0deg'};--border-color: ${glowGrad}; --bg-color: linear-gradient(#191212, #191212)`}
    className="w-full border-2 border-[#0000] [background:padding-box_var(--bg-color),_border-box_var(--border-color)] bg-center h-full inset-0 absolute pointer-events-none rounded-xl" 
  />
}
