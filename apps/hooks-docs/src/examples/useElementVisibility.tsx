import { DemoContainer } from "$/components/DemoContainer"
import { usePageContext } from "$/context/pageContext"
import { useElementVisibility } from "@kaioken-core/hooks"
import { Portal } from "kaioken"
import { twMerge } from "tailwind-merge"

export const UseElementVisibilityExample: Kaioken.FC = () => {
  const [ref, isVisible] = useElementVisibility<HTMLParagraphElement>()
  const { isClient } = usePageContext()

  return (
    <>
      <DemoContainer className={"p-4 font-cabin h-[350px] overflow-y-scroll"}>
        <div className="w-full h-[700px]">
          <p>Is visible boolean bottom right</p>
          <p ref={ref}>Scroll down</p>
        </div>
      </DemoContainer>

      {isClient && (
        <Portal container={document.body}>
          <DemoContainer className="w-max text-white fixed bottom-4  right-4 z-10">
            <p className="text-center">
              Text no longer visible{" "}
              <span
                className={twMerge("text-red", isVisible.value && "text-[lime]")}
              >{`${isVisible.value}`}</span>
            </p>
          </DemoContainer>
        </Portal>
      )}
    </>
  )
}
