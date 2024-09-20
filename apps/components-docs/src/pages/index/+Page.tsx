import { Checkbox } from "@kaioken-core/components"

export { Page }

function Page() {
  return (
    <>
      <Checkbox.Item className={"flex gap-4"}>
        <Checkbox.Indicator
          className={
            "w-6 h-6 border border-red-500 rounded-sm grid place-content-center"
          }
        >
          X
        </Checkbox.Indicator>
        Boop
      </Checkbox.Item>
    </>
  )
}
