import { PageTitle } from "$/components/PageTitle"
import {
  useSpring
} from "@kaioken-core/hooks"

const Page = () => {
  const [value, setValue] = useSpring(100, {
    damping: 0.1,
    stiffness: 0.3,
  })

  const onClick = () => {
    setValue(x => x + 100, { hard: true }).then(() => console.log('finish'))
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
