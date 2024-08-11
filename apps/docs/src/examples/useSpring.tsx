import { GlowBg } from "$/components/GlowBG"
import { useSpring } from "@kaioken-core/hooks"
import { useRef, useState } from "kaioken"

export const UseSpringExample: Kaioken.FC = () => {
  const nextValue = useRef(100)
  const [damping, setDamping] = useState(0.8)
  const [stiffness, setStiffness] = useState(0.15)
  const [precision, setPrecision] = useState(0.01)
  const [currentValue, setCurrentValue] = useSpring(100)

  const onUpdateValue = async () => {
    nextValue.current = nextValue.current === 100 ? 350 : 100

    await setCurrentValue(nextValue.current, {
      damping,
      stiffness,
      precision
    })
  }

  const onCancel = async () => {
    await setCurrentValue(nextValue.current, {
      hard: true,
    })
  }


  return <div className="p-4 w-full font-cabin grid grid-cols-2 gap-2 bg-glass rounded-xl relative min-h-[380px]">
    <GlowBg />
    <div className="flex flex-col gap-2 isolate">
      <label className="flex flex-col w-[200px]">
        Damping:
        <input type="number" value={damping} oninput={(e) => setDamping(e.target.valueAsNumber)} />
      </label>
      <label className="flex flex-col w-[200px]">
        Stiffness:
        <input type="number" value={stiffness} oninput={(e) => setStiffness(e.target.valueAsNumber)} />
      </label>
      <label className="flex flex-col w-[200px]">
        precision:
        <input type="number" value={precision} oninput={(e) => setPrecision(e.target.valueAsNumber)} />
      </label>
      <div className="flex gap-2 mt-2">
        <button className="bg-red p-1 rounded-lg" onclick={onUpdateValue}>
          Change
        </button>
        <button className="bg-red p-1 rounded-lg" onclick={onCancel}>
          Cancel
        </button>
      </div>
    </div>

    <div className="w-full h-full grid place-content-center isolate">
      <div className="w-[var(--dim)] h-[var(--dim)] bg-red rounded-full" style={`--dim: ${currentValue}px`} />
    </div>
  </div>
}
