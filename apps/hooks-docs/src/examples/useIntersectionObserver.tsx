import { DemoContainer } from "$/components/DemoContainer"
import { useIntersectionObserver } from "@kaioken-core/hooks"
import { useSignal, useRef } from "kaioken"

export const UseIntersectionObserverExample: Kaioken.FC = () => {
  const isVisible = useSignal(false)
  const dir = useSignal("down")
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useIntersectionObserver(ref, (intersections) => {
    isVisible.value = intersections[0].isIntersecting
    const containerHeight = containerRef.current!.scrollHeight
    const top = intersections[0].boundingClientRect.top
    dir.value = top < containerHeight / 2 ? "up" : "down"
  })

  return (
    <DemoContainer>
      <div ref={containerRef} className="w-full h-[300px] overflow-y-scroll">
        <div className="mb-[600px]" />
        <div ref={ref}>
          <p className="text-center">When viewing me...</p>
        </div>
        <div className="mt-[600px]" />
      </div>

      <p className="text-center mt-4 text-[1.5rem] font-bold">
        Element is {!isVisible.value && "not"} in view
      </p>
      <p
        className="text-center mb-4 font-semibold"
        innerHTML={isVisible.value ? "&nbsp;" : `Scroll ${dir}`}
      />
    </DemoContainer>
  )
}
