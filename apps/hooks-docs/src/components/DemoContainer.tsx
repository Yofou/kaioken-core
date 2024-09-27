import { disableAnimation } from "$/utils/disableAnimation"
import { ElementProps } from "kaioken"
import { twMerge } from "tailwind-merge"

type DemoContainerProps = {
  className?: string
  ref?: ElementProps<"div">["ref"]
}
export const DemoContainer: Kaioken.FC<DemoContainerProps> = (props) => {
  const { ref, className, ...rest } = props
  return (
    <div
      ref={ref}
      className={twMerge(
        "p-4 w-full font-cabin bg-glass-red rounded-xl relative",
        className
      )}
      onmouseover={() => (disableAnimation.value = true)}
      onmouseout={() => (disableAnimation.value = false)}
      {...rest}
    >
      {props.children}
    </div>
  )
}
