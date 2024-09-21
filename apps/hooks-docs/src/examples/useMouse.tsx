import { DemoContainer } from "$/components/DemoContainer"
import { useMouse } from "@kaioken-core/hooks"

export const UseMouseExample: Kaioken.FC = () => {
  const result = useMouse()
  return (
    <DemoContainer className="p-4 font-cabin flex gap-2 flex-col">
      <p>Move your mouse around</p>
      <p>
        Client X: {result.client.value.x}px, Y: {result.client.value.y}px
      </p>
      <p>
        Mouse X: {result.mouse.value.x}px, Y: {result.mouse.value.y}px
      </p>
      <p>
        Delta X: {result.delta.value.x}px, Y: {result.delta.value.y}px
      </p>
    </DemoContainer>
  )
}
