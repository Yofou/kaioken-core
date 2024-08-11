import { useKeyStroke } from "@kaioken-core/hooks"
import { signal } from "kaioken"

const transformKeys = (key: string) => {
  if (key === ' ') {
    return 'Space'
  }

  return key
}

export const UseKeyStrokeExample = () => {
  const keysPressed = signal<string[]>([])

  useKeyStroke(true, (e) => {
    keysPressed.value.push(
      transformKeys(e.key)
    )
    keysPressed.notify()
  })

  return <div className="p-4 font-cabin h-[350px] flex items-start content-start gap-4 overflow-y-scroll flex-wrap bg-[#0a0a0a]">
    {keysPressed.value.map((key) => {
      return <button className="px-4 py-2 bg-red text-white rounded-lg capitalize">{key}</button>
    })}
  </div>
}
