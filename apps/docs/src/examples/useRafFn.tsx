import { useRafFn } from '@kaioken-core/hooks'
import { useEffect, useState } from 'kaioken'

export const UseRafFnExample: Kaioken.FC = () => {
  const [count, setCount] = useState(0)
  const [delta, setDelta] = useState(0)
  const controls = useRafFn(({ delta }) => {
    setCount(($count) => $count + 1)
    setDelta(delta)
  }, {
    fpsLimit: 60,
    immediate: true,
  })


  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <p>Frames: {count}</p>
    <p>Delta: {Math.round(delta)}ms</p>
    <p>FPS: 60</p>
    <p>isPaused: {`${controls.isActive}`}</p>
    <div className="flex gap-4">
      <button className="bg-red p-1"  onclick={() => controls.stop()}>stop</button>
      <button className="bg-red p-1" onclick={() => {
        controls.start()
      }}>start</button>
    </div>
  </div>
}
