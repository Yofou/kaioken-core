import { sideEffectsEnabled, useSignal, useHook } from "kaioken"

export const findMountedDomRecursive = <T extends Element>(
  vNode?: Kaioken.VNode | null
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
  const elm = useSignal<T | undefined>(undefined)
  if (!sideEffectsEnabled()) return elm

  return useHook("useCurrentElement", {}, ({ vNode, queueEffect }) => {
    queueEffect(() => {
      const newElm = findMountedDomRecursive<T>(vNode.child)
      if (newElm != elm.value) {
        elm.value = newElm
      }
    })
    return elm
  })
}
