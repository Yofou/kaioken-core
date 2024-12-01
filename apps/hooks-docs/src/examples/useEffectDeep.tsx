import { ElementProps, useSignal } from "kaioken"
import { useEffectDeep } from "@kaioken-core/hooks"
import { DemoContainer } from "$/components/DemoContainer"
import { Button } from "$/components/Button"
import { Input } from "$/components/Input"

export const UseEffectDeepExample: Kaioken.FC = () => {
  const context = useSignal({
    count: 0,
    name: "",
  })

  useEffectDeep(() => {
    console.log(
      "I will trigger when count and name change despite context being the same object reference"
    )
  }, [context.value])

  const onClick = () => {
    context.value.count += 1
    context.notify()
  }

  const onInput: ElementProps<"input">["oninput"] = (e) => {
    context.value.name = e.target.value
    context.notify()
  }

  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Open console to see logs</p>
      <div className="flex gap-4 rounded-lg">
        <Button className="w-[100px]" onclick={onClick}>
          Click me!
        </Button>
        <Input
          type="text"
          placeholder="Type name"
          className="grow-0 w-[250px]"
          value={context.value.name}
          oninput={onInput}
        />
      </div>
    </DemoContainer>
  )
}
