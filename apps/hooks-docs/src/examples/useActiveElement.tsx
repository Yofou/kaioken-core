import { useActiveElement } from "@kaioken-core/hooks"
import { sideEffectsEnabled, useMemo } from "kaioken"
import { Button, DemoContainer } from "@kaioken-core/private-docs-components"

export const UseActiveElementExample: Kaioken.FC = () => {
  const node = useActiveElement()
  const content = useMemo(() => {
    if (sideEffectsEnabled() && node.value === document.body) return null
    return node.value?.textContent
  }, [node.value])
  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>{content ?? "Nothing is focused."}</p>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
    </DemoContainer>
  )
}
