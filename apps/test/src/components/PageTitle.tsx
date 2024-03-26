import { type ElementProps } from "kaioken"

export const Boop = () => <p>Hello world</p>

export function PageTitle({
  children,
  className,
  ...props
}: ElementProps<"h1">) {

  return <div>
    <h1 className={`text-5xl ${className ?? ""}`}>{children} boop</h1>
    <p></p>
    <Boop />
    <Boop />
  </div>
}
