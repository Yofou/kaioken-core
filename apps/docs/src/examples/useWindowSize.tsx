import { useWindowSize } from "@kaioken-core/hooks"

export const UseWindowSizeExample = () => {
  const { width, height } = useWindowSize()
  return <div 
    className="p-4 font-cabin flex gap-2 flex-col bg-[#0a0a0a]"
  >
    <p>Resize your window</p>
    <p>Width: {width}px, Height: {height}px</p>
  </div>
}
