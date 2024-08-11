import { useCurrentElement } from "@kaioken-core/hooks"

export const UseCurrentElementExample: Kaioken.FC = () => {
  const currentElm = useCurrentElement()
  console.log('current element', currentElm)
  
  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Open console to see current element</p>
  </div>
}
