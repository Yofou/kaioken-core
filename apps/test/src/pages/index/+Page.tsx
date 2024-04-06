import { PageTitle } from "$/components/PageTitle"
import {
  useElementByPoint,
  useMouse,
} from "@kaioken-core/hooks"
import { useState } from "kaioken"

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const { mouse } = useMouse();
  const { element } = useElementByPoint({
    x: mouse.x,
    y: mouse.y,
  })
  console.log(element)

  const onClick = () => {
    setShowPageTitle(true)
  }

  return (
    <div className="findMe h-[200vh]">
      <button onclick={onClick}>Boop</button>
      { showPageTitle && <PageTitle /> }
    </div>
  )
}

export { Page }
