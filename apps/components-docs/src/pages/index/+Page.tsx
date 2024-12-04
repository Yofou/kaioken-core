import { ContextMenu, Tooltip } from "@kaioken-core/components"
import { useSignal } from "kaioken"

export { Page }

const TestContextMenu = () => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger
        className={
          "w-[400px] h-[200px] border border-dotted border-white grid place-content-center"
        }
      >
        <p>Trigger me</p>
      </ContextMenu.Trigger>

      <ContextMenu.Container className={"backdrop:hidden"}>
        <ContextMenu.Content
          className={"w-[300px] h-[500px] p-10 flex flex-col gap-2"}
          disableInteractOutside
        >
          <ContextMenu.Item>button 1</ContextMenu.Item>
          <ContextMenu.Item>button 2</ContextMenu.Item>
          <ContextMenu.Item>button 3</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Container>
    </ContextMenu.Root>
  )
}

// TOOLTIP IS CURRENTLY ALWAYS AS CHILD, WE NEED TOO CHANGE
const TestTooltipMenu: Kaioken.FC = () => {
  const isOpen = useSignal(false)

  return (
    <Tooltip.Root open={isOpen} sideGap={16} side="left" avoidCollisions={true}>
      <Tooltip.Trigger>
        <button className={"w-[50px] ml-[50px]"}>Boop</button>
      </Tooltip.Trigger>

      <Tooltip.Content>
        <div className={"backdrop:hidden w-[100px] h-[100px] m-0 p-0"}>
          boop
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  )
}

function Page() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"w-full"} />
      <TestTooltipMenu />
      {/*  <TestContextMenu />  */}
    </div>
  )
}
