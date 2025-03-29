import { useMouseInElement } from "@kaioken-core/hooks"
import { useComputed, useRef } from "kaioken"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseMouseInElementExample: Kaioken.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const result = useMouseInElement(ref)
  const output = useComputed(() => {
    return JSON.stringify(
      {
        x: result.x.value,
        y: result.y.value,
        elementX: result.elementX.value,
        elementY: result.elementY.value,
        elementPositionX: result.elementPositionX.value,
        elementPositionY: result.elementPositionY.value,
        elementWidth: result.elementWidth.value,
        elementHeight: result.elementHeight.value,
        isOutside: result.isOutside.value,
      },
      null,
      2
    )
  })
  return (
    <DemoContainer
      ref={ref}
      className="p-4 font-cabin flex gap-4 min-h-[300px] flex-col"
    >
      <p>Move your mouse around</p>
      <textarea
        className="w-full resize h-[270px] cursor-default rounded-md border border-gray-800 bg-[#121212] p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none placeholder:text-gray-500 focus:border-red focus:outline-none"
        value={output}
      />
    </DemoContainer>
  )
}
