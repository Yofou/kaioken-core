import { useActiveElement } from "@kaioken-core/hooks"
import { sideEffectsEnabled, useMemo } from "kaioken"

export const UseActiveElementExample: Kaioken.FC = () => {
  const node = useActiveElement()
  const content = useMemo(() => {
    if (sideEffectsEnabled() && node === document.body) return null
    return node?.textContent 
  }, [node])
  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>{content ?? 'nothing is focused'}</p>
    <button>1</button>
    <button>2</button>
    <button>3</button>
  </div>
}
