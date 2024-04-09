import { shouldExecHook, useHook } from "kaioken"
import { getNodeAppContext } from "kaioken/utils.js"

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

  // TODO: Figure out how to recrawl on node updates
  return useHook(
    "useRootNode", 
    { 
      hasMounted: false, 
      value: undefined as ComponentTree | undefined,
    }, 
    ({ vNode, hook, oldHook, queueEffect, update }) => {
      const ctx = getNodeAppContext(vNode)
      if (!oldHook && ctx) {
        hook.value = crawlDownAndGetComponents(ctx.rootNode) as ComponentTree 
      }

      queueEffect(() => {
        if (!hook.hasMounted && ctx) {
          hook.hasMounted = true
          hook.value = crawlDownAndGetComponents(ctx.rootNode) as ComponentTree
          update();
        }
      })

      return hook.value
    }
  )
}
