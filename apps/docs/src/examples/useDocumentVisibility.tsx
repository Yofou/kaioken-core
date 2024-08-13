import { DemoContainer } from "$/components/DemoContainer"
import { useDocumentVisibility } from "@kaioken-core/hooks"
import { signal, useEffect } from "kaioken"

export const UseDocumentVisibilityExample = () => {
  const hasLeftAndCameBack = signal(false)
  const isVisible = useDocumentVisibility()
  console.log(isVisible)

  useEffect(() => {
    if (hasLeftAndCameBack.value === false && isVisible === false) {
      hasLeftAndCameBack.value = true
    }
  }, [hasLeftAndCameBack.value, isVisible])

  return <DemoContainer>
  <p>{hasLeftAndCameBack.value ? 'Welcome Back!' : 'Unfocus window or tab out and come back' }</p>
  </DemoContainer>
}
