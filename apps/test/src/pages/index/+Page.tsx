import { PageTitle } from "$/components/PageTitle"
import {
  useElementByPoint,
  useWindowPosition
} from "@kaioken-core/hooks"
import { useState } from "kaioken"

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const x = useWindowPosition()
  console.log(x)

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
