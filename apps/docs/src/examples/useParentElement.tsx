import { useParentElement } from "@kaioken-core/hooks"

export const UseParentElementExample: Kaioken.FC = () => {
  const parentElm = useParentElement()
  console.log('parentElm', parentElm)
  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Open console to see parent element</p>
  </div>
}
