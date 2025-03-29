import { useWindowPosition } from "@kaioken-core/hooks"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseWindowPositionExample = () => {
  const { screenX, screenY } = useWindowPosition()
  return (
    <DemoContainer className="p-4 font-cabin flex gap-2 flex-col">
      <p>Move your window around</p>
      <p>
        X: {screenX.value}, Y: {screenY.value}
      </p>
    </DemoContainer>
  )
}
