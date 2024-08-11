import { useWindowPosition } from "@kaioken-core/hooks"

export const UseWindowPositionExample = () => {
  const { screenX, screenY } = useWindowPosition()
  return <div 
    className="p-4 font-cabin flex gap-2 flex-col bg-[#0a0a0a]"
  >
    <p>Move your window around</p>
    <p>X: {screenX}, Y: {screenY}</p>
  </div>
}
