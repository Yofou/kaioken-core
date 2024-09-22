import { sideEffectsEnabled, signal, useHook } from "kaioken"

const findParentElm = <T extends Element>(
  node: Kaioken.VNode
): T | undefined => {
  if (node.dom == null && node.parent) return findParentElm(node.parent)
  return node.dom as T | undefined
}

export const findMountedDomRecursive = <T extends Element>(
  vNode?: Kaioken.VNode
): T | undefined => {
  if (!vNode) return undefined
  const stack: Kaioken.VNode[] = [vNode]
  while (stack.length) {
    const n = stack.pop()!
    if (n.dom?.isConnected) return n.dom as any as T | undefined
    if (n.parent) stack.push(n.parent)
  }
  return undefined
}

export const useParentElement = <T extends Element>() => {
  const elm = signal<T | undefined>(undefined)
  if (!sideEffectsEnabled()) return elm

  return useHook("useParentElement", {}, ({ vNode, queueEffect }) => {
    queueEffect(() => {
      const newElm = findParentElm<T>(vNode)
      if (newElm != elm.value) {
        elm.value = newElm
      }
    })
    return elm
  })
}
