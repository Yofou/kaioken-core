import { shouldExecHook, useHook } from "kaioken"
import { getNodeGlobalContext } from "kaioken/dist/utils"

type ComponentTree = {
  name: string
  node: Kaioken.VNode
  child?: ComponentTree
  sibling?: ComponentTree
}

type NodeWrapper = {
  type: "child" | "sibling" | "root"
  node: Kaioken.VNode
  parentComponentTree?: ComponentTree
}

export const crawlDownAndGetComponents = (vNode?: Kaioken.VNode) => {
  if (!vNode) return []

  let components: ComponentTree | null = null
  let lastInstance: ComponentTree | null = components
  const stack: NodeWrapper[] = [{ type: "root", node: vNode }]

  while (stack.length != 0) {
    let { type, node, parentComponentTree } = stack.pop()!

    if (
      type != "root" &&
      node.type &&
      node.type instanceof Function &&
      node.type.name != "fragment"
    ) {
      if (components == null) {
        components = {
          name: node.type.name,
          node,
        }
        parentComponentTree = components
      }

      if (parentComponentTree) {
        parentComponentTree[type] = {
          node,
          name: node.type.name,
        }

        const temp: ComponentTree | undefined = parentComponentTree[type]
        if (temp) {
          lastInstance = temp
        }
      }
    }

    if (node.sibling)
      stack.push({
        type: "sibling",
        node: node.sibling,
        parentComponentTree: lastInstance ?? undefined,
      })
    if (node.child)
      stack.push({
        type: "child",
        node: node.child,
        parentComponentTree: lastInstance ?? undefined,
      })
  }

  return components
}

export const useRootNode = () => {
  if (!shouldExecHook()) {
    return
  }

  return useHook("useRootNode", {}, ({ queueEffect, vNode }) => {
    const globalCtx = getNodeGlobalContext(vNode)
    let output = crawlDownAndGetComponents(globalCtx.rootNode)
    queueEffect(() => {
      output = crawlDownAndGetComponents(globalCtx.rootNode)
    })

    return output
  })
}
