import { Dialog, Tooltip } from "@kaioken-core/components"
import { computed, signal } from "kaioken"

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
  const zindex = signal(100)
  const styles = zindex.map((i) => `z-index: ${i}`)
  const onClick = () => {
    zindex.value += 1
  }
  console.log("redefined")
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog {styles}</Dialog.Trigger>

      <Dialog.Container
        className="m-0 w-full flex justify-center items-start p-10 bg-transparent max-w-[unset] h-full max-h-[unset]"
        style={styles}
      >
        <Dialog.Content className="max-w-[500px] flex flex-col text-black w-screen p-8 bg-white rounded-xl">
          <button onclick={onClick}>1</button>
          <button>2</button>
          <button>3</button>
          <TestTooltip />
        </Dialog.Content>
      </Dialog.Container>
    </Dialog.Root>
  )
}
