import { Button } from "$/components/Button"
import { DemoContainer } from "$/components/DemoContainer"
import { useRafFn } from "@kaioken-core/hooks"
import { computed, signal } from "kaioken"

export const UseRafFnExample: Kaioken.FC = () => {
  const count = signal(0)
  const delta = signal(0)
  const controls = useRafFn(
    ({ delta: _delta }) => {
      count.value += 1
      delta.value = _delta
    },
    {
      fpsLimit: 60,
      immediate: true,
    }
  )

  const roundedDelta = computed(() => {
    return Math.round(delta.value)
  })

  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Frames: {count}</p>
      <p>Delta: {roundedDelta}ms</p>
      <p>FPS: 60</p>
      <p>isPaused: {`${!controls.isActive}`}</p>
      <div className="flex gap-4">
        <Button onclick={() => controls.stop()}>Stop</Button>
        <Button
          className="bg-red p-1"
          onclick={() => {
            controls.start()
          }}
        >
          Start
        </Button>
      </div>
    </DemoContainer>
  )
}
