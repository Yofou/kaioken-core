import {
  createContext,
  ElementProps,
  useSignal,
  Signal,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "kaioken"
import { Slot } from "../Slot"
import { styleObjectToString } from "kaioken/utils"
import { GroupContext } from "./group"

export const ItemContext = createContext<{
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
  value?: string
}
export const Item: Kaioken.FC<ItemProps> = (props) => {
  const { asChild, name, value, checked: propChecked, ...rest } = props
  const internalChecked = useSignal(false)
  const checked = propChecked ?? internalChecked
  const inputStyles = useMemo(() => {
    return styleObjectToString({
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
  const groupContext = useContext(GroupContext, false)

  const Comp = asChild ? Slot : "label"

  // @TODO: make effect in kaioken and use that instead
  useEffect(() => {
    if (!groupContext || value == null) return

    if (checked.value && !groupContext.group.value.includes(value)) {
      groupContext.group.value.push(value)
      groupContext.group.notify()
    } else {
      const index = groupContext.group.value.findIndex((item) => item === value)
      if (index != -1) {
        groupContext.group.value.splice(index, 1)
        groupContext.group.notify()
      }
    }
  }, [checked.value, groupContext])

  useEffect(() => {
    return () => {
      if (!groupContext || value == null) return

      const index = groupContext.group.value.findIndex((item) => item === value)
      if (index != -1) {
        groupContext.group.value.splice(index, 1)
        groupContext.group.notify()
      }
    }
  }, [])

  return (
    <ItemContext.Provider value={checkboxItemContext}>
      <Comp {...rest}>
        <input
          type="checkbox"
          style={inputStyles}
          name={name}
          value={value}
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
