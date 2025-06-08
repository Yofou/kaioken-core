import { useCurrentElement } from "@kaioken-core/hooks"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseCurrentElementExample: Kaioken.FC = () => {
  const currentElm = useCurrentElement()
  console.log("current element", currentElm.value)
  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Open console to see current element</p>
    </DemoContainer>
  )
}
