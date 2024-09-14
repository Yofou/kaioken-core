import { Floating } from "@kaioken-core/components"
import { Portal, useRef } from "kaioken"

export { Page }

function Page() {
  return (
    <div className="">
      <Floating.Root sideGap={5} side="bottom">
        <Floating.Anchor>
          <p className="mt-12 w-max">Boop</p>
        </Floating.Anchor>

        <Floating.Content>
          <p className="">This will float now</p>
        </Floating.Content>
      </Floating.Root>
    </div>
  )
}
