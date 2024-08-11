import { useMouseInElement } from "@kaioken-core/hooks"
import { useRef } from "kaioken"

export const UseMouseInElementExample: Kaioken.FC = () => {
  const ref = useRef<HTMLElement | null>(null)
  const result = useMouseInElement(ref)

  return <div ref={ref} className="p-4 font-cabin flex gap-4 min-h-[300px] flex-col bg-[#0a0a0a]">
    <p>Move your mouse around</p>
    <textarea className="w-full resize h-[270px]" value={ JSON.stringify(result, null, 2) } />
  </div>
}
