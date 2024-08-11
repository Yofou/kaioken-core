import {useState } from "kaioken"
import { useEffectThrottle } from '@kaioken-core/hooks'

export const UseEffectThrottleExample: Kaioken.FC = () => {
  const [count, setCount] = useState(0)

  useEffectThrottle(() => {
    console.log('count change!');
  }, [count], {
    maxWait: 1000,
  })

  const onClick = () => {
    setCount(count + 1)
  }


  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Open console to see logs</p>
    <div className="flex gap-4 rounded-lg items-center">
      <button className="bg-red p-1" onclick={onClick}>Click me!</button>
      <p>count: {count}</p>
    </div>
  </div>
}
