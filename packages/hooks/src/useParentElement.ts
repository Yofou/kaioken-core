import { shouldExecHook, useHook, useState } from "kaioken"

const findParentElm = <T extends Element>(
  node: Kaioken.VNode
): T | undefined => {
  if (node.dom == null && node.parent) return findParentElm(node.parent)
  return node.dom as T | undefined
}

export const useParentElement = <T extends Element>() => {
  if (!shouldExecHook()) return

  const [elm, setElm] = useState<T | undefined>(undefined)

  return useHook("useParentElement", {}, ({ vNode, queueEffect }) => {
    queueEffect(() => {
      setElm(findParentElm<T>(vNode))
    })
    return elm
  })
}
