import { tween } from "@kaioken-core/hooks"
import { useComputed, useSignal } from "kaioken"
import * as easingFunctions from "@kaioken-core/hooks/easing"
import { DemoContainer } from "$/components/DemoContainer"
import { Input } from "$/components/Input"
import { Button } from "$/components/Button"

export const UseTweenExample: Kaioken.FC = () => {
  const duration = useSignal(500)
  const nextValue = useSignal(0)

  const currentValue = tween(0)
  const easing = useSignal("linear")
  const easingFunc = useComputed(() => {
    return easingFunctions[easing.value]
  })

  const onUpdateValue = async () => {
    await currentValue.set(nextValue.value, {
      duration: duration.value,
      easing: easingFunc.value,
    })
  }

  const onCancel = () => {
    currentValue.set(nextValue.value, {
      duration: 0,
    })
  }

  const displayValue = useComputed(() => {
    return Math.round((currentValue.value + Number.EPSILON) * 100) / 100
  })

  const deg = useComputed(() => {
    return `rotate: -${180 - (currentValue.value / 5000) * 180}deg`
  })

  return (
    <div className="relative">
      <p className="absolute top-[12.5rem] left-1/2 md:top-[250px] md:left-[700px] text-white text-center -translate-x-1/2 font-cabin text-[2rem] z-10">
        {displayValue}
      </p>
      <div className="absolute top-[10rem] scale-[0.9] left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:left-[500px] md:scale-150">
        <div className="wrapper overflow-hidden">
          <div className="circle-out w-[400px] h-[200px] bg-black rounded-t-[380px] border-[100px] border-[#ededed] border-b-[0] relative">
            <div
              className="circle w-[400px] h-[200px] bg-black rounded-t-[380px] border-[100px] border-b-0 border-red origin-bottom absolute z-[1] bottom-0 left-[-100px]"
              style={deg}
            />
          </div>
        </div>
      </div>

      <DemoContainer className="flex gap-2 pt-[20rem] md:p-4 flex-col">
        <label className="flex flex-col w-full md:w-[200px]">
          Duration:
          <Input
            type="number"
            value={duration}
            oninput={(e) => (duration.value = e.target.valueAsNumber)}
          />
        </label>
        <label className="flex flex-col w-full md:w-[200px]">
          Next Value:
          <Input
            type="number"
            min={0}
            max={5000}
            value={nextValue}
            oninput={(e) => (nextValue.value = e.target.valueAsNumber)}
          />
        </label>

        <label className="flex flex-col w-full md:w-[200px]">
          Next Value:
          <select
            className="h-12 w-full cursor-default rounded-md border border-gray-800 bg-[#121212] p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none placeholder:text-gray-500 focus:border-red focus:outline-none appearance-none"
            onchange={(e) => (easing.value = e.target.value)}
          >
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
          <Button className="bg-red p-1 rounded-lg" onclick={onUpdateValue}>
            Update Current Value
          </Button>
          <Button className="bg-red p-1 rounded-lg" onclick={onCancel}>
            Cancel
          </Button>
        </div>
      </DemoContainer>
    </div>
  )
}
