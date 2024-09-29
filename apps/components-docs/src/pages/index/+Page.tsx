import { ContextMenu } from "@kaioken-core/components"

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
        >
          <ContextMenu.Item asChild>
            <button>button 1</button>
          </ContextMenu.Item>
          <ContextMenu.Item asChild>
            <button>button 2</button>
          </ContextMenu.Item>
          <ContextMenu.Item asChild>
            <button>button 3</button>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Container>
    </ContextMenu.Root>
  )
}

function Page() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"w-full"} />
      <TestContextMenu />
    </div>
  )
}
