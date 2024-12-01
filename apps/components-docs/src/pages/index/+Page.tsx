import { Checkbox, CheckboxGroup } from "@kaioken-core/components"
import { useSignal } from "kaioken"

export { Page }

function Page() {
  const values = useSignal<string[]>([])
  return (
    <div className={"flex flex-col gap-4"}>
      <CheckboxGroup.Root checked={values}>
        <Checkbox.Item className={"flex gap-4"} value="value 1">
          Boop
        </Checkbox.Item>
        <Checkbox.Item className={"flex gap-4"} value="value 2">
          Boop
        </Checkbox.Item>
      </CheckboxGroup.Root>
    </div>
  )
}
