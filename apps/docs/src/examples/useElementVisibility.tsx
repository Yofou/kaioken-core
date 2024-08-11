import { useElementVisibility } from "@kaioken-core/hooks"
import { Portal, sideEffectsEnabled,  } from "kaioken"
import { twMerge } from "tailwind-merge"

export const UseElementVisibilityExample: Kaioken.FC = () => {
  const [ref, isVisible] = useElementVisibility()
  return <>
    <div className={"p-4 font-cabin h-[350px] overflow-scroll flex-col bg-[#0a0a0a]"}>
      <div className="w-full h-[700px]">
        <p>Is visible boolean bottom right</p>
        <p ref={ref}>Scroll down</p>
      </div>
    </div>

    <div className="fixed bottom-4 text-center right-4 p-2 bg-[#0a0a0a]">
      Text no longer visible <span className={twMerge('text-red', isVisible && 'text-[lime]')}>{`${isVisible}`}</span>
    </div>
  </>
}
