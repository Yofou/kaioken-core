import { isVNode } from "kaioken/utils"
import { mergeEventProps } from "./utils"

export const Slottable: Kaioken.FC = (props) => {
  return props.children
}
Slottable.displayName = "Slottable"

export const Slot: Kaioken.FC<any> = ({ children, ...props }) => {
  if (isVNode(children)) {
    children.props = {
      ...children.props,
      ...mergeEventProps(props, children.props),
      children: children.props.children,
    }
    return children
  } else if (typeof children === "object" && Array.isArray(children)) {
    const slottable: Kaioken.VNode = children.find((child) => {
      if (isVNode(child)) {
        return child.type === Slottable
      }
      return false
    })
    if (isVNode(slottable?.props?.children)) {
      slottable.props.children.props = {
        ...slottable.props.children.props,
        ...mergeEventProps(props, slottable.props.children.props),
        children: slottable.props.children.props.children,
      }
      return children
    } else if (typeof slottable === "object" && Array.isArray(slottable)) {
      console.warn(
        "2 dimensional plus children structure, need to handle this case somehow"
      )
      return children
    }
  }

  console.warn("failed to apply props onto a vnode")
  return children
}
Slot.displayName = "Slot"
