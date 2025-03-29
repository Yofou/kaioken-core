import { useMediaQuery } from "@kaioken-core/hooks"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseMediaQueryExample = () => {
  const [isLargerThanPixels] = useMediaQuery("(min-width: 684px)")
  const [prefersLightMode] = useMediaQuery("(prefers-color-scheme: light)")
  return (
    <DemoContainer className="p-4 font-cabin flex-col">
      <p>is larger than or equal to 684px: {`${isLargerThanPixels.value}`}</p>
      <p>prefersLight: {`${prefersLightMode.value}`}</p>
    </DemoContainer>
  )
}
