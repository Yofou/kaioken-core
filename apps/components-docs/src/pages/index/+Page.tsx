import { Dialog, Tooltip, RadioGroup } from "@kaioken-core/components"
import { signal } from "kaioken"

export { Page }

const TestTooltip = () => {
  return (
    <Tooltip.Root sideGap={16} side={"top-start"}>
      <Tooltip.Trigger>
        <button className="w-[50px] h-[50px] rounded-full bg-red-500">
          <span className="sr-only">You have to hover over this</span>
        </button>
      </Tooltip.Trigger>

      <Tooltip.Content>
        <p className="w-[400px] p-4 bg-white text-black shadow-black shadow-2xl rounded-full">
          This will float now
        </p>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

function Page() {
  const radioValue = signal("hello")
  const dialogValue = signal(true)
  return (
    <Dialog.Root open={dialogValue}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <TestTooltip />

      <Dialog.Container className="m-0 w-full open:flex justify-center items-start p-10 bg-transparent max-w-[unset] h-full max-h-[unset]">
        <Dialog.Content className="max-w-[500px] flex flex-col text-black w-screen p-8 bg-white rounded-xl">
          <RadioGroup.Root
            loop={false}
            value={radioValue}
            className={
              "flex flex-col focus:outline focus-within:outline-1 focus-within:outline-red-500"
            }
          >
            <RadioGroup.Item className={"group"} value="hello">
              <p className={"group-has-[input[checked]]:bg-red-500"}>Boop</p>
            </RadioGroup.Item>
            <RadioGroup.Item id={"testing"} value="world1" asChild>
              <label className={"[input:checked+&]:bg-red-500"}>Boop</label>
            </RadioGroup.Item>
            <RadioGroup.Item value="world2" required>
              <p className={"[input:checked+&]:bg-red-500"}>Boop</p>
            </RadioGroup.Item>
            <RadioGroup.Item value="world3" required>
              <p className={"[input:checked+&]:bg-red-500"}>Boop</p>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </Dialog.Content>
      </Dialog.Container>
    </Dialog.Root>
  )
}
