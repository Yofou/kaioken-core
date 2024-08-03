import { useState } from "kaioken"
import { useEffectDeep } from '@kaioken-core/hooks'

export const UseEffectDeepExample: Kaioken.FC = () => {
  const [context, setContext] = useState({
    count: 0,
    name: ''
  })

  useEffectDeep(() => {
    console.log('I will trigger when count and name change despite context being the same object reference')
  }, [context])

  const onClick = () => {
    setContext(($context) => {
      $context.count += 1
      return $context
    })
  }

  const onInput = (e: InputEvent) => {
    setContext(($context) => {
      if (e.target instanceof HTMLInputElement) {
        $context.name = e.target.value
      }

      return $context
    })
  }

  return <div className="">
    <button onclick={onClick}>Click me!</button>
  </div>
}
