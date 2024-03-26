import { type ElementProps } from "kaioken"

export const Boop = () => <p>Hello world</p>

export function PageTitle({
  children,
  className,
  ...props
}: ElementProps<"h1">) {

  return <>
    <Boop />
    <Boop />
  </>
}
