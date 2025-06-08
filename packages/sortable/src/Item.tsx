import {
  ElementProps,
  useContext,
  useLayoutEffect,
  useSignal,
  useWatch,
} from "kaioken"
import { GridProvider } from "./Grid"
import { Signal } from "kaioken"
import { Item as MuuriItem } from "muuri"
import { _internalGridToSignal, hasLastItemMovedGrid } from "./util"

type ItemProps = Kaioken.FCProps<
  Omit<ElementProps<"div">, "ref"> & {
    innerClassName?: string
    innerStyle?: string
    innerProps?: ElementProps<"div">
    ref?: Kaioken.MutableRefObject<MuuriItem | null> | Signal<MuuriItem | null>
    index?: number
  }
>

export const Item = (props: ItemProps) => {
  const {
    innerProps = {},
    innerStyle,
    key,
    innerClassName,
    children,
    ref,
    index,
    ...outerProps
  } = props
  const itemEl = useSignal<HTMLDivElement | null>(null)
  const gridInstance = useContext(GridProvider)

  useLayoutEffect(() => {
    if (!gridInstance?.value) {
      return () => {}
    }

    if (index != null) {
      const previousItem = gridInstance.value.getItem(index)

      if (
        previousItem?.getElement()?.dataset.sortableKey === key &&
        hasLastItemMovedGrid.peek()
      ) {
        console.log("removing", previousItem, previousItem?.getElement())
        gridInstance.value.remove([previousItem!])
        previousItem?.getElement()?.remove()
      }
    }
  }, [])

  useWatch(() => {
    if (!itemEl.value || !gridInstance?.value) {
      return () => {}
    }

    let itemInstance = gridInstance.value.getItem(itemEl.value)

    if (!itemInstance) {
      ;[itemInstance] = gridInstance.value.add(
        itemEl.value,
        index != null
          ? {
              index,
              layout: "instant",
            }
          : {}
      )
    }

    if (ref && Signal.isSignal(ref)) {
      ref.value = itemInstance
    } else if (ref) {
      ref.current = itemInstance
    }

    return () => {
      if (itemInstance) {
        gridInstance.value?.remove([itemInstance], {
          layout: "instant",
        })
      }

      if (ref && Signal.isSignal(ref)) {
        ref.value = null
      } else if (ref) {
        ref.current = null
      }
    }
  })

  return (
    <div
      style={"position: absolute;"}
      data-sortable-key={key}
      {...outerProps}
      ref={itemEl}
    >
      <div style={innerStyle} className={innerClassName} {...innerProps}>
        {children}
      </div>
    </div>
  )
}
