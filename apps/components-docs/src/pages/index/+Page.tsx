import { Dialog } from "@kaioken-core/components"
import { signal } from "kaioken"

export { Page }

function Page() {
  const isOpen = signal(false)
  return (
    <Dialog.Root
      open={isOpen}
      onInteractOutside={(e) => {
        e.preventDefault()
      }}
    >
      <Dialog.Trigger asChild>
        <label>span</label>
      </Dialog.Trigger>

      <Dialog.Container>
        <Dialog.Content>
          <Dialog.Title>This is a title</Dialog.Title>

          <Dialog.Description>Boop</Dialog.Description>
        </Dialog.Content>
      </Dialog.Container>
    </Dialog.Root>
  )
}
