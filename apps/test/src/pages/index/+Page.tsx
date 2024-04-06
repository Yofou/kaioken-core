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
      <PageTitle />
      <PageTitle />
      <div>1123</div>
      <button onclick={onClick}>Boop</button>

      <div className="w-[var(--dim)] h-[var(--dim)] bg-red-500" style={`--dim: ${value}px`}></div>
    </div>
  )
}

export { Page }
