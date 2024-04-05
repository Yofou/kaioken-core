import { PageTitle } from "$/components/PageTitle"
import {
  useTween
} from "@kaioken-core/hooks"
import {
   elasticInOut
} from "@kaioken-core/hooks/easing"


const Page = () => {
  const [value, setValue] = useTween(100, {
    duration: 1000,
    easing: elasticInOut,
  })

  const onClick = () => {
    setValue(400)
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
