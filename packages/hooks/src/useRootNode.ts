import { shouldExecHook, useEffect, useHook, useState } from "kaioken"
import { getNodeGlobalContext } from "kaioken/utils.js"

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
        lastInstance = parentComponentTree
      } else if (parentComponentTree) {
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

  // TODO: Having predefined hooks inside of usHook can be problematic, it's wise to not use them inside
  return useHook("useRootNode", { hasMounted: false }, ({ vNode }) => {
    const globalCtx = getNodeGlobalContext(vNode)
    const [state, setState] = useState<any | null>(null);
    useEffect(() => {
      setState(crawlDownAndGetComponents(globalCtx.rootNode))
    }, [])

    return state
  })
}
