import { Item, Grid } from "@kaioken-core/sortable"
import { Signal, useSignal } from "kaioken"
import Muuri, { DragSortGetter } from "muuri"

type KanbanSectionProps = {
  header: string
  headerColor?: string
  itemGridRef?: Signal<Muuri | null>
  dragSort?: DragSortGetter
}
export const KanbanSection: Kaioken.FC<KanbanSectionProps> = (props) => {
  const isDragging = useSignal(false)

  return (
    <Item
      className={`w-1/3 h-full px-[10px] ${isDragging.value ? "z-10" : "z-0"}`}
      innerClassName="bg-[#f0f0f0] rounded-[8px] h-full"
    >
      <div
        className={
          "section-header cursor-grab p-4 rounded-t-[8px] flex justify-center items-center bg-[var(--color)]"
        }
        style={`--color: ${props.headerColor}`}
      >
        <h2 className={"font-bold"}>{props.header}</h2>
      </div>

      <div className={"w-full h-full pt-6 p-4"}>
        <Grid
          className={"w-full flex flex-col"}
          ref={props.itemGridRef}
          itemDraggingClass="z-10"
          dragEnabled
          dragSort={props.dragSort}
          onDragStart={() => (isDragging.value = true)}
          onDragReleaseEnd={() => (isDragging.value = false)}
        >
          {props.children}
        </Grid>
      </div>
    </Item>
  )
}

type KanbanItem = {}
export const KanbanItem: Kaioken.FC<KanbanItem> = (props) => {
  return (
    <Item
      className={"w-full mb-[8px]"}
      innerClassName="bg-white w-full rounded-[4px] text-black p-[20px] shadow-[0px_1px_3px_0_rgba(0,0,0,0.2)]"
    >
      <p>{props.children}</p>
    </Item>
  )
}
