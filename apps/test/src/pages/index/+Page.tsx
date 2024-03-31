import { PageTitle } from "$/components/PageTitle"
import {
  useElementBounding,
  useElementVisibility,
  useEventListener,
  useMutationObserver,
  useRootNode,
  useTextareaAutoSize,
} from "@kaioken-core/hooks"
import { useCallback, useRef, useState } from "kaioken"

const Page = () => {
  const [opacity, setOpacity] = useState(1)

  const mouseMove = () => {
    console.log(opacity)
  }

  const click = () => {
    setOpacity(opacity + 1)
  }
  
  //  useEventListener('mousemove', mouseMove, {}, [opacity])
  useEventListener('click', click, {}, [opacity])

  const ref = useRef<HTMLTextAreaElement>(null);
  const test = useCallback(() => {
      console.log(opacity)
  }, [opacity])

  useTextareaAutoSize(ref)

  useMutationObserver(ref, test, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
  })

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
