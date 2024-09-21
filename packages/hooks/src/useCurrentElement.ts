import { sideEffectsEnabled, signal, useHook } from "kaioken"

export const findMountedDomRecursive = <T extends Element>(
  vNode?: Kaioken.VNode
): T | undefined => {
  if (!vNode) return undefined
  const stack: Kaioken.VNode[] = [vNode]
  while (stack.length) {
    const n = stack.pop()!
    if (n.dom?.isConnected && !(n.dom instanceof Text))
      return n.dom as any as T | undefined
    if (n.sibling) stack.push(n.sibling)
    if (n.child) stack.push(n.child)
  }
  return undefined
}

export const useCurrentElement = <T extends Element>() => {
  const elm = signal<T | undefined>(undefined)
  if (!sideEffectsEnabled()) return elm


  return useHook("useCurrentElement", {}, ({ vNode, queueEffect }) => {
    queueEffect(() => {
      elm.value = findMountedDomRecursive<T>(vNode.child)
    })
    return elm
  })
}
