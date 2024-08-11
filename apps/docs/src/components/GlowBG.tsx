import { useGlowAngle } from "$/hooks/useGlowAngle"

type GlowBgProps = {
  duration?: number
}
export const GlowBg: Kaioken.FC<GlowBgProps> = (props) => {
  const [glowRef, angle] = useGlowAngle(props.duration) 
  console.table({ angle })
  return <div 
    ref={glowRef}
    style={`--angle: ${angle ?? '0deg'};--border-color: linear-gradient(var(--angle), #070707, #ea495e50); --bg-color: linear-gradient(#191212, #191212)`}
    className="w-full border-2 border-[#0000] [background:padding-box_var(--bg-color),_border-box_var(--border-color)] bg-center h-full inset-0 absolute pointer-events-none rounded-xl" 
  />
}
