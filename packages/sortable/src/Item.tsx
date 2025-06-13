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
    ...outerProps
  } = props
  const itemEl = useSignal<HTMLDivElement | null>(null)
  const gridInstance = useContext(GridProvider)

  useLayoutEffect(() => {
    if (!gridInstance?.value) {
      return () => {}
    }

    const previousItem = hasLastItemMovedGrid.peek()
    // @ts-expect-error
    const index = gridInstance.value._items.indexOf(previousItem)
    if (
      previousItem?.getElement()?.dataset?.sortableKey === key &&
      itemEl.value
    ) {
      gridInstance.value.remove([previousItem!])
      previousItem?.getElement()?.remove()
      gridInstance.value.add(
        itemEl.value,
        index != null
          ? {
              index,
              layout: "instant",
            }
          : {}
      )
    }

    return () => {}
  }, [])

  useWatch(() => {
    if (!itemEl.value || !gridInstance?.value) {
      return () => {}
    }

    let itemInstance = gridInstance.value.getItem(itemEl.value)

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
      key={key}
      {...outerProps}
      ref={itemEl}
    >
      <div style={innerStyle} className={innerClassName} {...innerProps}>
        {children}
      </div>
    </div>
  )
}
