import { PageTitle } from "$/components/PageTitle"
import {
  useSpring
} from "@kaioken-core/hooks"

const Page = () => {
  const [value, setValue] = useSpring(100, {
    damping: .2,
    stiffness: 0.1
  })

  const onClick = () => {
    setValue(300)
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
