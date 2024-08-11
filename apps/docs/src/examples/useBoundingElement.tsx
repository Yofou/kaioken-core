import { useActiveElement, useElementBounding } from "@kaioken-core/hooks"
import { sideEffectsEnabled, useMemo, useRef } from "kaioken"

export const UseBoundingElementExample: Kaioken.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const bounding = useElementBounding(textAreaRef)
  return <div className="p-4 font-cabin  gap-4 h-[500px]  bg-[#0a0a0a]">
    <textarea className="resize w-full h-full" ref={textAreaRef} value={JSON.stringify(bounding, null, 2)} />
  </div>
}
