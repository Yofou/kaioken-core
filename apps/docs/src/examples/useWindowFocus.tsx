import { useWindowFocus } from "@kaioken-core/hooks"
import { twMerge } from "tailwind-merge"

export const UseWindowFocusExample = () => {
  const [isFocused] = useWindowFocus()
  return <div className="p-4 font-cabin flex gap-2 flex-col bg-[#0a0a0a]">
    <p>Click in and out of your window</p>
    <p>is Window focused: <span className={twMerge(
      "text-red font-semibold",
      isFocused && "text-[green]"
    )}>{`${isFocused}`}</span></p>
  </div>
}
