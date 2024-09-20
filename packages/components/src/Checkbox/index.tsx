import {
  createContext,
  ElementProps,
  signal,
  Signal,
  useCallback,
  useContext,
  useMemo,
} from "kaioken"
import { Slot } from "../Slot"
import { styleObjectToCss } from "kaioken/utils"

const ItemContext = createContext<{
  checked: Signal<boolean>
} | null>(null)
ItemContext.displayName = "Checkbox.ItemContext"

///////////////////
// Checkbox Item
///////////////////

type ItemProps = ElementProps<"label"> & {
  checked?: Signal<boolean>
  asChild?: boolean
  name?: string
}
export const Item: Kaioken.FC<ItemProps> = (props) => {
  const { asChild, name, checked: propChecked, ...rest } = props
  const internalChecked = signal(false)
  const checked = propChecked ?? internalChecked
  const inputStyles = useMemo(() => {
    return styleObjectToCss({
      pointerEvents: "none",
      opacity: "0",
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: "0",
    })
  }, [])
  const onInput = useCallback<NonNullable<ElementProps<"input">["oninput"]>>(
    (e) => {
      checked.value = e.target.checked
    },
    []
  )
  const checkboxItemContext = useMemo(() => {
    return {
      checked,
    }
  }, [])

  const Comp = asChild ? Slot : "label"

  return (
    <ItemContext.Provider value={checkboxItemContext}>
      <Comp {...rest}>
        <input
          type="checkbox"
          style={inputStyles}
          name={name}
          oninput={onInput}
          checked={checked}
        />
        {props.children}
      </Comp>
    </ItemContext.Provider>
  )
}
Item.displayName = "Checkbox.Item"

///////////////////
// Checkbox Indicator
///////////////////

type IndicatorProps = ElementProps<"span"> & {
  asChild?: boolean
  forceMount?: boolean
}
export const Indicator: Kaioken.FC<IndicatorProps> = (props) => {
  const { asChild, forceMount, children, ...rest } = props
  const Comp = asChild ? Slot : "span"
  const checkboxItemContext = useContext(ItemContext)

  if (checkboxItemContext === null) {
    console.warn("Checkbox.Item context was not found in Checkbox.Indicator")
    return null
  }

  return (
    <Comp {...rest}>
      {checkboxItemContext.checked.value || forceMount === true
        ? children
        : null}
    </Comp>
  )
}
Indicator.displayName = "Checkbox.Indicator"
