import { useWindowSize } from "@kaioken-core/hooks"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseWindowSizeExample = () => {
  const { width, height } = useWindowSize()
  return (
    <DemoContainer className="p-4 font-cabin flex gap-2 flex-col">
      <p>Resize your window</p>
      <p>
        Width: {width.value}px, Height: {height.value}px
      </p>
    </DemoContainer>
  )
}
