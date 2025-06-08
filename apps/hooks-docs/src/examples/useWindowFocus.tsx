import { useWindowFocus } from "@kaioken-core/hooks"
import { twMerge } from "tailwind-merge"
import { DemoContainer } from "@kaioken-core/private-docs-components"

export const UseWindowFocusExample = () => {
  const [isFocused] = useWindowFocus()
  return (
    <DemoContainer className="p-4 font-cabin flex gap-2 flex-col">
      <p>Click in and out of your window</p>
      <p>
        is Window focused:{" "}
        <span
          className={twMerge(
            "text-red font-semibold",
            isFocused.value && "text-[lime]"
          )}
        >{`${isFocused.value}`}</span>
      </p>
    </DemoContainer>
  )
}
