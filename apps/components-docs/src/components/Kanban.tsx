import { Item, Grid } from "@kaioken-core/sortable"
import { Signal } from "kaioken"
import Muuri, { DragSortGetter } from "muuri"

type KanbanSectionProps = {
  header: string
  headerColor?: string
  signal?: Signal<any[]>
  boardGridRef?: Signal<Muuri | null>
  itemGridRef?: Signal<Muuri | null>
  dragSort?: DragSortGetter
  dragContainer?: Kaioken.RefObject<HTMLDivElement>
}
export const KanbanSection: Kaioken.FC<KanbanSectionProps> = (props) => {
  return (
    <Item
      className={"w-1/3 h-full px-[10px]"}
      innerClassName="bg-[#f0f0f0] rounded-[8px] h-full "
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
          className={`w-full flex flex-col z-0`}
          ref={props.itemGridRef}
          itemDraggingClass="z-10"
          dragEnabled
          dragSort={props.dragSort}
          signal={props.signal}
          dragContainer={props.dragContainer?.current}
          onDragInit={(item) => {
            item.getElement()!.style.width = item.getWidth() + "px"
            item.getElement()!.style.height = item.getHeight() + "px"
          }}
          onDragReleaseEnd={(item) => {
            item.getElement()!.style.width = ""
            item.getElement()!.style.height = ""
            item.getGrid()!.refreshItems([item])
          }}
          onLayoutStart={() => {
            console.log("trigger")
            props.boardGridRef?.value?.refreshItems().layout()
          }}
        >
          {props.children}
        </Grid>
      </div>
    </Item>
  )
}

type KanbanItem = {
  key: string
}
export const KanbanItem: Kaioken.FC<KanbanItem> = (props) => {
  return (
    <Item
      className={"w-full mb-[8px]"}
      innerClassName="bg-white w-full rounded-[4px] text-black p-[20px] shadow-[0px_1px_3px_0_rgba(0,0,0,0.2)]"
      key={props.key}
    >
      <p>{props.children}</p>
    </Item>
  )
}
