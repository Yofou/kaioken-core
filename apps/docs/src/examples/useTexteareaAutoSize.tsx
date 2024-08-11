import { useTextareaAutoSize } from "@kaioken-core/hooks"
import { useModel } from "kaioken"

export const UseTextareaAutoSizeExample = () => {
  const [ref, value] = useModel<HTMLTextAreaElement>('Press enter to resize text area')
  const controls  = useTextareaAutoSize(ref)

  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <textarea ref={ref} value={value} />
  </div>
}
