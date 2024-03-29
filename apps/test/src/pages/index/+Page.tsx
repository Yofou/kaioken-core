import { PageTitle } from "$/components/PageTitle"
import {
  useElementBounding,
  useElementVisibility,
  useRootNode,
} from "@kaioken-core/hooks"
import { useRef } from "kaioken"

const Page = () => {
  const [ref, isVisible] = useElementVisibility()
  console.log(isVisible)

  return (
    <div className="findMe h-[200vh]">
      <PageTitle />
      <PageTitle />
      <div>1123</div>
      <textarea ref={ref} />
    </div>
  )
}

export { Page }
