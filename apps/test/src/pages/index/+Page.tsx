import { PageTitle } from "$/components/PageTitle"
import {
  useElementBounding,
  useElementVisibility,
  useEventListener,
  useRootNode,
} from "@kaioken-core/hooks"
import { useRef, useState } from "kaioken"

const Page = () => {
  const [ref, isVisible] = useElementVisibility()
  const [opacity, setOpacity] = useState(1)

  const mouseMove = () => {
    console.log(opacity)
  }

  const click = () => {
    setOpacity(opacity + 1)
  }
  
  useEventListener('mousemove', mouseMove, {}, [opacity])
  useEventListener('click', click, {}, [opacity])
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
