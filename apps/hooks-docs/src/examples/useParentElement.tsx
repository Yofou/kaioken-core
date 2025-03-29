import { useParentElement } from "@kaioken-core/hooks"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseParentElementExample: Kaioken.FC = () => {
  const parentElm = useParentElement()
  console.log("parentElm", parentElm.value)

  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Open console to see parent element</p>
    </DemoContainer>
  )
}
