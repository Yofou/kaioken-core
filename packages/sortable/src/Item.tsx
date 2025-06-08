import {
  ElementProps,
  useContext,
  useEffect,
  useSignal,
  useWatch,
} from "kaioken"
import { GridProvider } from "./Grid"
import { Signal } from "kaioken"
import { Item as MuuriItem } from "muuri"

type ItemProps = Kaioken.FCProps<
  Omit<ElementProps<"div">, "ref"> & {
    innerClassName?: string
    innerStyle?: string
    innerProps?: ElementProps<"div">
    ref?: Kaioken.MutableRefObject<MuuriItem | null> | Signal<MuuriItem | null>
  }
>

export const Item = (props: ItemProps) => {
  const {
    innerProps = {},
    innerStyle,
    innerClassName,
    children,
    ref,
    ...outerProps
  } = props
  const itemEl = useSignal<HTMLDivElement | null>(null)
  const gridInstance = useContext(GridProvider)

  useEffect(() => {
    return () => {
      gridInstance?.value?.remove
    }
  }, [])

  useWatch(() => {
    if (!itemEl.value || !gridInstance?.value) {
      return () => {}
    }

    let itemInstance = gridInstance.value.getItem(itemEl.value)
    if (!itemInstance) {
      ;[itemInstance] = gridInstance.value.add(itemEl.value)
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
    <div style={"position: absolute;"} {...outerProps} ref={itemEl}>
      <div style={innerStyle} className={innerClassName} {...innerProps}>
        {children}
      </div>
    </div>
  )
}
