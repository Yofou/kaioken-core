import { PageTitle } from "$/components/PageTitle"
import {
  useElementBounding,
  useRootNode,
} from "@kaioken-core/hooks"
import { useRef } from "kaioken"
import { getCurrentNode, getNodeGlobalContext } from "kaioken/utils"
import { contexts } from 'kaioken/dist/globals'

const Page = () => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const { width, height } = useElementBounding(ref)
  //  const rootNode = useRootNode()
  const node = getCurrentNode()
  console.log(contexts)
  console.log(node, getNodeGlobalContext(node!))

  return (
    <div className="findMe">
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
