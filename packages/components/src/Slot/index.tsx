import { isVNode } from "kaioken/utils"
import { mergeEventProps } from "./utils"
import { cloneVNode } from "kaioken"

export const Slottable: Kaioken.FC = (props) => {
  return props.children
}
Slottable.displayName = "Slottable"

export const Slot: Kaioken.FC<any> = ({ children, ...props }) => {
  if (isVNode(children)) {
    const childClone = cloneVNode(children)
    childClone.props = {
      ...children.props,
      ...mergeEventProps(props, children.props),
      children: children.props.children,
    }
    return childClone
  } else if (typeof children === "object" && Array.isArray(children)) {
    const slottable: Kaioken.VNode = children.find((child) => {
      if (isVNode(child)) {
        return child.type === Slottable
      }
      return false
    })
    if (isVNode(slottable?.props?.children)) {
      const slottableChildClone = cloneVNode(slottable.props.children)
      slottableChildClone.props = {
        ...slottable.props.children.props,
        ...mergeEventProps(props, slottable.props.children.props),
        children: slottable.props.children.props.children,
      }

      slottable.props.children = slottableChildClone
      return children
    } else if (typeof slottable === "object" && Array.isArray(slottable)) {
      console.warn("Slottable should only contain one child")
      return children
    }
  }

  console.warn("failed to apply props onto a vnode")
  return children
}
Slot.displayName = "Slot"
