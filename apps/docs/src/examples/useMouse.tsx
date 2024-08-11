import { useMouse } from "@kaioken-core/hooks"

export const UseMouseExample: Kaioken.FC = () => {
  const result = useMouse()
  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Move your mouse around</p>
    <p>Client X: {result.client.x}px, Y: {result.client.y}px</p>
    <p>Mouse X: {result.mouse.x}px, Y: {result.mouse.y}px</p>
    <p>Delta X: {result.delta.x}px, Y: {result.delta.y}px</p>
  </div>
}
