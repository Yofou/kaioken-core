import { useParentElement } from "@kaioken-core/hooks"
import { useEffect, type ElementProps } from "kaioken"

export function PageTitle({
  children,
  className,
  ...props
}: ElementProps<"h1">) {

  const boop = useParentElement()
  useEffect(() => {
      console.log(boop)
  }, [boop])
  return <h1 className={`text-5xl ${className ?? ""}`}>{children} boop</h1>
}
