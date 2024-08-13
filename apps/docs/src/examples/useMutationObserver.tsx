import { DemoContainer } from "$/components/DemoContainer"
import { useMutationObserver } from "@kaioken-core/hooks"
import { signal, useEffect, useRef } from "kaioken"
import { twMerge } from "tailwind-merge"

export const UseMutationObserverExample: Kaioken.FC = () => {
  const el = useRef<HTMLElement | null>(null)
  const style = signal({})
  const className = signal('')
  const changes = signal<(string | null)[]>([])

  useMutationObserver(el, (mutation) => {
    if (mutation[0]) {
      changes.value.push(mutation[0].attributeName)
      changes.notify()
    }
  }, {
    attributes: true
  })

  useEffect(() => {
    let shouldClear = [true, true]
    const classNameTimeoutId = setTimeout(() => {
      className.value = 'test'
      shouldClear[1] = false
    }, 1000)

    const styleTimeoutId = setTimeout(() => {
      style.value = { color: 'red' } 
      shouldClear[0] = false
    }, 500)

    return () => {
      if (shouldClear[0]) clearTimeout(styleTimeoutId)
      if (shouldClear[1]) clearTimeout(classNameTimeoutId)
    }
  }, [])

  return <DemoContainer>
    <div ref={el} className={twMerge("w-full p-4 bg-grey-700 rounded-lg flex flex-col", className.value)} style={style.value}>
      {changes.value.map(attr => {
        return <p>Mutation Attribute: {attr}</p>
      })}
    </div>
  </DemoContainer>
}
