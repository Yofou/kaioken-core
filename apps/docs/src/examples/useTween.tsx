import { useTween } from "@kaioken-core/hooks"
import { useMemo, useState } from "kaioken"
import * as easingFunctions from '@kaioken-core/hooks/easing'

export const UseTweenExample: Kaioken.FC = () => {
  const [duration, setDuration] = useState(500)
  const [currentValue, setCurrentValue] = useTween(0)
  const [nextValue, setNextValue] = useState(0)
  const [hasFinished, setHasFinished] = useState(false)
  const [easing, setEasing] = useState('linear')
  const easingFunc = useMemo(() => {
    return easingFunctions[easing]
  }, [easing])

  const onUpdateValue = async () => {
    setHasFinished(false)

    await setCurrentValue(nextValue, {
      duration,
      easing: easingFunc
    })

    setHasFinished(true)
  }

  const onCancel = () => {
    setCurrentValue(nextValue, {
      duration: 0,
    })
    setHasFinished(true)
  }

  return <div className="p-4 font-cabin flex gap-2 flex-col bg-[#0a0a0a]">
    <p>Current value: {currentValue}</p>
    <p>Has finished: {`${hasFinished}`}</p>
    <label className="flex flex-col w-[200px]">
      Duration:
      <input type="number" value={duration} oninput={(e) => setDuration(e.target.valueAsNumber)} />
    </label>
    <label className="flex flex-col w-[200px]">
      Next Value:
      <input type="number" value={nextValue} oninput={(e) => setNextValue(e.target.valueAsNumber)} />
    </label>

    <label className="flex flex-col w-[200px]">
      Next Value:
      <select onchange={(e) => setEasing(e.target.value)}>
        <option value="linear">Linear</option>
        <option value="backInOut">Back in out</option>
        <option value="backIn">Back in</option>
        <option value="backOut">Back out</option>
        <option value="bounceOut">Bounce out</option>
        <option value="bounceInOut">Bounce in out</option>
        <option value="bounceIn">Bounce in</option>
        <option value="circInOut">Circ in out</option>
        <option value="circIn">Circ in</option>
        <option value="circOut">Circ out</option>
        <option value="cubicInOut">Cubic in out</option>
        <option value="cubicIn">Cubic in</option>
        <option value="cubicOut">Cubic out</option>
        <option value="elasticInOut">Elastic in out</option>
        <option value="elasticIn">Elastic in</option>
        <option value="elasticOut">Elastic out</option>
        <option value="expoInOut">Expo in out</option>
        <option value="expoIn">Expo in</option>
        <option value="expoOut">Expo out</option>
        <option value="quadInOut">Quad in out</option>
        <option value="quadIn">Quad in</option>
        <option value="quadOut">Quad out</option>
        <option value="quartInOut">Quart in out</option>
        <option value="quartIn">Quart in</option>
        <option value="quartOut">Quart out</option>
        <option value="quintInOut">Quint in out</option>
        <option value="quintIn">Quint in</option>
        <option value="quintOut">Quint out</option>
        <option value="sineInOut">Sine in out</option>
        <option value="sineIn">Sine in</option>
        <option value="sineOut">Sine out</option>
      </select>
    </label>
    

    <div className="flex gap-2 mt-2">
    <button className="bg-red p-1 rounded-lg" onclick={onUpdateValue}>
      Update Current Value
    </button>
    <button className="bg-red p-1 rounded-lg"  onclick={onCancel}>
      Cancel
    </button>
    </div>
  </div>
}
