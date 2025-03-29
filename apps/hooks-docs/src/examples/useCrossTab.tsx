import { Button } from "$/components/Button"
import { DemoContainer } from "$/components/DemoContainer"
import { useCrossTab } from "@kaioken-core/hooks"

export const UseCrossTabMainExample = () => {
  const counter = useCrossTab("counter", 0)

  const onClick = () => {
    counter.value += 1
  }

  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>
        Open second{" "}
        <a
          className={"text-red underline"}
          href="/state/useCrossTab/demo"
          target="_blank"
        >
          demo page
        </a>{" "}
        to see state being synchronize across tabs
      </p>
      <div className="flex gap-4 rounded-lg items-center">
        <Button onclick={onClick}>Click me!</Button>
        <p className="text-metalic font-bold uppercase">count: {counter}</p>
      </div>
    </DemoContainer>
  )
}

export const UseCrossTabSecondaryExample = () => {
  const counter = useCrossTab("counter", 0)

  const onClick = () => {
    counter.value += 1
  }

  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <div className="flex gap-4 rounded-lg items-center">
        <Button onclick={onClick}>Click me!</Button>
        <p className="text-metalic font-bold uppercase">count: {counter}</p>
      </div>
    </DemoContainer>
  )
}
