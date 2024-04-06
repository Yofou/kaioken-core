import { PageTitle } from "$/components/PageTitle"
import {
  useSpring
} from "@kaioken-core/hooks"
import { useState } from "kaioken"

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const [value, setValue] = useSpring(100, {
    damping: 0.1,
    stiffness: 0.3,
  })

  const onClick = () => {
    setShowPageTitle(true)
    setValue(x => x + 100, { hard: true }).then(() => console.log('finish'))
  }

  return (
    <div className="findMe h-[200vh]">
      <button onclick={onClick}>Boop</button>
      { showPageTitle && <PageTitle /> }
    </div>
  )
}

export { Page }
