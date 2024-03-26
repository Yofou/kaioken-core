import { PageTitle } from "$/components/PageTitle"
import {
  useElementBounding,
  useRootNode,
} from "@kaioken-core/hooks"
import { useRef } from "kaioken"

const Page = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { width, height } = useElementBounding(ref)
  const rootNode = useRootNode()
  console.log(rootNode)

  return (
    <div className="findMe">
      <PageTitle />
      <PageTitle />
      <div>1123</div>
      <textarea ref={ref} />
      <p>
        {width} - {height}
      </p>
    </div>
  )
}

export { Page }
