import { shouldExecHook, useHook } from "kaioken"
import { getNodeGlobalContext } from 'kaioken/utils'

type ComponentTree = {
  name: string,
  node: Kaioken.VNode,
  child?: ComponentTree,
  sibling?: ComponentTree
}

export const crawlDownAndGetComponents = (
  vNode?: Kaioken.VNode
) => {
  if (!vNode) return []

  const components: ComponentTree = {
    name: (vNode.type as Function).name,
    node: vNode,
  }

  let lastInstance: ComponentTree = components
  const stack: { type: "child" | "sibling" | "root", node: Kaioken.VNode }[] = [{ type: "root", node: vNode }]

  while (stack.length != 0) {
    const { type, node } = stack.pop()!

    if (type != 'root' && node.type && node.type instanceof Function && node.type.name != 'fragment') {
      lastInstance[type] = {
        node,
        name: node.type.name,
      }

      const temp = lastInstance[type]
      if (temp) {
        lastInstance = temp
      }
    }

    if (node.sibling) stack.push({ type: 'sibling', node: node.sibling })
    if (node.child) stack.push({ type: 'child', node: node.child, })
  }

  return components
}

export const useRootNode = () => {
  if (!shouldExecHook()) {
    return 
  }

  return useHook("useRootNode", {}, ({ queueEffect, vNode }) => {
    const globalCtx = getNodeGlobalContext(vNode)
    console.log(globalCtx)
    let output = crawlDownAndGetComponents(globalCtx)
    queueEffect(() => {
       output = crawlDownAndGetComponents(vNode)
    })

    return output
  })
}
