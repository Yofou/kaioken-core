import { PageTitle } from "$/components/PageTitle"
import {
  useWindowPosition,
  useMouseInElement,
} from "@kaioken-core/hooks"
import { useRef, useState } from "kaioken"

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const data = useMouseInElement(ref)

  const onClick = () => {
    setShowPageTitle(true)
  }

  return (
    <div className="findMe h-[200vh]" ref={ref}>
      <button onclick={onClick}>Boop</button>
      { showPageTitle && <PageTitle /> }
    </div>
  )
}

export { Page }
