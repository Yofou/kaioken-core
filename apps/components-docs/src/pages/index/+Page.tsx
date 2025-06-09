import { KanbanItem, KanbanSection } from "$/components/Kanban"
import { Grid } from "@kaioken-core/sortable"
import { useCallback, useSignal } from "kaioken"
import Muuri from "muuri"

function Page() {
  const todoGrid = useSignal<Muuri | null>(null)
  const workingGrid = useSignal<Muuri | null>(null)
  const doneGrid = useSignal<Muuri | null>(null)

  const dragSort = useCallback(() => {
    return [todoGrid.value!, workingGrid.value!, doneGrid.value!]
  }, [])

  return (
    <Grid
      className={"bg-white w-full h-full"}
      dragAxis="x"
      dragEnabled={true}
      dragHandle={".section-header"}
    >
      <KanbanSection
        header="TODO"
        headerColor="#4A9FF9"
        itemGridRef={todoGrid}
        dragSort={dragSort}
      >
        <KanbanItem>Item #1</KanbanItem>
        <KanbanItem>Item #2</KanbanItem>
        <KanbanItem>Item #3</KanbanItem>
        <KanbanItem>Item #4</KanbanItem>
        <KanbanItem>Item #5</KanbanItem>
      </KanbanSection>

      <KanbanSection
        header="WORKING"
        headerColor="#f9944a"
        itemGridRef={workingGrid}
        dragSort={dragSort}
      >
        <KanbanItem>Item #6</KanbanItem>
        <KanbanItem>Item #7</KanbanItem>
        <KanbanItem>Item #8</KanbanItem>
        <KanbanItem>Item #9</KanbanItem>
        <KanbanItem>Item #10</KanbanItem>
      </KanbanSection>

      <KanbanSection
        header="DONE"
        headerColor="#2ac06d"
        itemGridRef={doneGrid}
        dragSort={dragSort}
      >
        <KanbanItem>Item #11</KanbanItem>
        <KanbanItem>Item #12</KanbanItem>
        <KanbanItem>Item #13</KanbanItem>
        <KanbanItem>Item #14</KanbanItem>
        <KanbanItem>Item #15</KanbanItem>
      </KanbanSection>
    </Grid>
  )
}

export { Page }
