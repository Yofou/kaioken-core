import { KanbanItem, KanbanSection } from "$/components/Kanban"
import { Grid } from "@kaioken-core/sortable"
import { For, useCallback, useRef, useSignal, useWatch } from "kaioken"
import Muuri from "muuri"

function Page() {
  const boardGrid = useSignal<Muuri | null>(null)
  const todoGrid = useSignal<Muuri | null>(null)
  const workingGrid = useSignal<Muuri | null>(null)
  const doneGrid = useSignal<Muuri | null>(null)

  const todoItems = useSignal(
    [
      {
        id: "#1",
        value: "Item #1",
      },
      {
        id: "#2",
        value: "Item #2",
      },
      {
        id: "#3",
        value: "Item #3",
      },
      {
        id: "#4",
        value: "Item #4",
      },
      {
        id: "#5",
        value: "Item #5",
      },
    ],
    "todo items"
  )

  const workingItems = useSignal(
    [
      {
        id: "#6",
        value: "Item #6",
      },
      {
        id: "#7",
        value: "Item #7",
      },
      {
        id: "#8",
        value: "Item #8",
      },
      {
        id: "#9",
        value: "Item #9",
      },
      {
        id: "#10",
        value: "Item #10",
      },
    ],
    "working items"
  )

  const doneItems = useSignal(
    [
      {
        id: "#11",
        value: "Item #11",
      },
      {
        id: "#12",
        value: "Item #12",
      },
      {
        id: "#13",
        value: "Item #13",
      },
      {
        id: "#14",
        value: "Item #14",
      },
      {
        id: "15",
        value: "Item #15",
      },
    ],
    "done items"
  )

  const dragSort = useCallback(() => {
    return [todoGrid.value!, workingGrid.value!, doneGrid.value!]
  }, [])

  const dragContainer = useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={dragContainer}
        className={"drag-container fixed w-full top-0 left-0 z-20"}
      ></div>
      <Grid
        className={"bg-white w-full h-full"}
        ref={boardGrid}
        dragAxis="xy"
        dragEnabled={true}
        dragHandle={".section-header"}
      >
        <KanbanSection
          header="TODO"
          headerColor="#4A9FF9"
          itemGridRef={todoGrid}
          dragSort={dragSort}
          signal={todoItems}
          dragContainer={dragContainer}
        >
          <For each={todoItems}>
            {(item) => {
              return <KanbanItem key={item.id}>{item.value}</KanbanItem>
            }}
          </For>
        </KanbanSection>

        <KanbanSection
          header="WORKING"
          headerColor="#f9944a"
          itemGridRef={workingGrid}
          dragSort={dragSort}
          signal={workingItems}
          dragContainer={dragContainer}
        >
          <For each={workingItems}>
            {(item) => {
              return <KanbanItem key={item.id}>{item.value}</KanbanItem>
            }}
          </For>
        </KanbanSection>

        <KanbanSection
          header="DONE"
          headerColor="#2ac06d"
          itemGridRef={doneGrid}
          dragSort={dragSort}
          signal={doneItems}
          dragContainer={dragContainer}
        >
          <For each={doneItems}>
            {(item) => {
              return <KanbanItem key={item.id}>{item.value}</KanbanItem>
            }}
          </For>
        </KanbanSection>
      </Grid>
    </>
  )
}

export { Page }
