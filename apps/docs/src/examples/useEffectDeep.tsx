import { ElementProps, useCurrentNode, useState } from "kaioken"
import { useEffectDeep } from '@kaioken-core/hooks'

export const UseEffectDeepExample: Kaioken.FC = () => {
  const node = useCurrentNode()
  const [context, setContext] = useState({
    count: 0,
    name: ''
  })

  useEffectDeep(() => {
    console.log('I will trigger when count and name change despite context being the same object reference');
  }, [context])

  const onClick = () => {
    setContext(($context) => {
      $context.count += 1
      return $context
    })

    node.ctx.requestUpdate(node)
  }

  const onInput: ElementProps<'input'>['oninput'] = (e) => {
    setContext(($context) => {
      $context.name = e.target.value
      return $context
    })

    node.ctx.requestUpdate(node)
  }

  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Open console to see logs</p>
    <div className="flex gap-4 rounded-lg">
    <button className="bg-red p-1" onclick={onClick}>Click me!</button>
    <input type="text" placeholder="Type name" className="p-1 rounded-lg" value={context.name} oninput={onInput} />
    </div>
  </div>
}
