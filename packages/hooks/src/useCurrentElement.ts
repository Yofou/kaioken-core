import { shouldExecHook, useHook, useState } from "kaioken"

export const  findMountedDomRecursive = <T extends Element>(
  vNode?: Kaioken.VNode
): T | undefined => {
  if (!vNode) return undefined
  const stack: Kaioken.VNode[] = [vNode]
  while (stack.length) {
    const n = stack.pop()!
    if (n.dom?.isConnected && !(n.dom instanceof Text)) return n.dom as any as T | undefined
    if (n.sibling) stack.push(n.sibling)
    if (n.child) stack.push(n.child)
  }
  return undefined
}

export const useCurrentElement = <T extends Element>() => {
  if (!shouldExecHook()) return

  const [elm, setElm] = useState<T | undefined>(undefined)

  return useHook("useCurrentElement", {}, ({ vNode, queueEffect }) => {
    queueEffect(() => {
      setElm(findMountedDomRecursive<T>(vNode.child))
    })
    return elm
  })
}
