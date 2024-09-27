import { Button } from "$/components/Button"
import { DemoContainer } from "$/components/DemoContainer"
import { Input } from "$/components/Input"
import { spring } from "@kaioken-core/hooks"
import { computed, signal, useRef } from "kaioken"

export const UseSpringExample: Kaioken.FC = () => {
  const nextValue = useRef(100)
  const damping = signal(0.8)
  const stiffness = signal(0.15)
  const precision = signal(0.01)
  const currentValue = spring(100)

  const onUpdateValue = async () => {
    nextValue.current = nextValue.current === 100 ? 350 : 100

    await currentValue.set(nextValue.current, {
      damping: damping.value,
      stiffness: stiffness.value,
      precision: precision.value,
    })
  }

  const onCancel = async () => {
    await currentValue.set(nextValue.current, {
      hard: true,
    })
  }

  const dim = computed(() => {
    return `--dim: ${currentValue.value}px`
  })

  return (
    <div className="relative">
      <div
        className="w-[var(--dim)] h-[var(--dim)] bg-red scale-75 md:scale-100 rounded-full absolute top-[12rem] left-1/2 md:left-[calc(100%-250px)] md:top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
        style={dim}
      />
      <DemoContainer className="[background:rgba(25,18,18,0.3)] pt-[24rem] md:pt-4 grid grid-cols-1 md:grid-cols-2 gap-2 min-h-[380px]">
        <div className="flex flex-col w-full md:w-[210px] gap-2 items-start">
          <label className="flex flex-col w-full">
            Damping:
            <Input
              type="number"
              value={damping.value}
              oninput={(e) => (damping.value = e.target.valueAsNumber)}
            />
          </label>
          <label className="flex flex-col w-full">
            Stiffness:
            <Input
              type="number"
              value={stiffness.value}
              oninput={(e) => (stiffness.value = e.target.valueAsNumber)}
            />
          </label>
          <label className="flex flex-col w-full">
            Precision:
            <Input
              type="number"
              value={precision.value}
              oninput={(e) => (precision.value = e.target.valueAsNumber)}
            />
          </label>
          <div className="flex w-full flex-wrap gap-2 mt-2">
            <Button onclick={onUpdateValue}>Change</Button>
            <Button onclick={onCancel}>Cancel</Button>
          </div>
        </div>
      </DemoContainer>
    </div>
  )
}
