import { PageTitle } from "$/components/PageTitle"
import {
} from "@kaioken-core/hooks"
import { useState } from "kaioken"

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)

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
