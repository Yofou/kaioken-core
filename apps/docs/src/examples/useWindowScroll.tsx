import { useWindowScroll } from "@kaioken-core/hooks"

export const UseWindowScrollExample = () => {
  const { setY, setX } = useWindowScroll()
  return <div 
    className="p-4 font-cabin flex gap-2 bg-[#0a0a0a]"
  >
    <button className="py-1 px-4 rounded-lg bg-red text-white" onclick={() => setY(50, 'smooth')}>Scroll Y</button>
    <button className="py-1 px-4 rounded-lg bg-red text-white" onclick={() => setX(50, 'smooth')}>Scroll X</button>
  </div>
}
