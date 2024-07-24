import { PageTitle } from "$/components/PageTitle"
import { useRef, useState } from "kaioken"
import { useTween } from '@kaioken-core/hooks'

const Page = () => {
  const [showPageTitle, setShowPageTitle] = useState(false)
  const ref = useRef<HTMLElement>(null)

	const [result, setResult] = useTween(0)

  const onClick = () => {
    setShowPageTitle(true)
		setResult(10)
  }

  return (
    <div className="findMe h-[200vh]">
      <button ref={ref} onclick={onClick}>Boop</button>
			<p>{result}</p>.
      { showPageTitle && <PageTitle /> }
    </div>
  )
}

export { Page }
