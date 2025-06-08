import { ContextMenu, Tooltip } from "@kaioken-core/components"
import {
  Signal,
  useCallback,
  useComputed,
  useEffect,
  useMemo,
  useRef,
  useSignal,
  useWatch,
} from "kaioken"
import * as Sortable from "@kaioken-core/sortable"
import Grid, { type Item } from "muuri"

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
  const grid1 = useSignal(null)
  const grid2 = useSignal(null)
  const grid3 = useSignal(null)

  const dragSort = useCallback(() => {
    if (!grid1.value || !grid2.value || !grid3.value) {
      return []
    }

    return [grid1.value, grid2.value, grid3.value]
  }, [])
  return (
    <div className={"w-full flex justify-center mx-auto gap-10"}>
      <Sortable.Grid
        className="w-full max-w-[500px] border border-red-300"
        dragEnabled
        ref={grid1}
        dragSort={dragSort}
        dragAxis="xy"
      >
        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-black h-[300px]"}>Hello world</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-red-950 h-[300px]"}>Boop 1</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-green-950 h-[300px]"}>Boop 2</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-purple-950 h-[300px]"}>Boop 3</div>
        </Sortable.Item>
      </Sortable.Grid>

      <Sortable.Grid
        className="w-full max-w-[501px] border border-green-300"
        ref={grid2}
        dragSort={dragSort}
        dragEnabled
        dragAxis="xy"
      >
        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-black h-[300px]"}>Hello world</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-red-950 h-[300px]"}>Boop 1</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-green-950 h-[300px]"}>Boop 2</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-purple-950 h-[300px]"}>Boop 3</div>
        </Sortable.Item>
      </Sortable.Grid>

      <Sortable.Grid
        className="w-full max-w-[501px] border border-green-300"
        ref={grid3}
        dragSort={dragSort}
        dragEnabled
        dragAxis="xy"
      >
        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-black h-[300px]"}>Hello world</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-red-950 h-[300px]"}>Boop 1</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-green-950 h-[300px]"}>Boop 2</div>
        </Sortable.Item>

        <Sortable.Item className={"w-full max-w-[500px]"}>
          <div className={"w-full bg-purple-950 h-[300px]"}>Boop 3</div>
        </Sortable.Item>
      </Sortable.Grid>
    </div>
  )
}
