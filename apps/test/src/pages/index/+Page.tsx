import { PageTitle } from "$/components/PageTitle"
import {
  useClickOutside,
  useEffectDebounce,
  useEffectThrottle,
  useElementBounding,
  useTextareaAutoSize,
} from "@kaioken-core/hooks"
import { useRef, useState } from "kaioken"

export { Page }

function Page() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [count, setCount] = useState(0)
  const inc = () => setCount(count + 1)
  const { width, height } = useElementBounding(ref)
  useClickOutside(ref, () => {
    //  console.log('click outside')
  })

  useTextareaAutoSize(ref, {})

  useEffectDebounce(
    () => {
      console.log("debounce")
    },
    [count],
    {
      maxWait: 1000,
    }
  )

  useEffectThrottle(
    () => {
      console.log("throttled")
    },
    [count],
    {
      maxWait: 1000,
    }
  )

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PageTitle>Home</PageTitle>
      <p>
        {width} - {height}
      </p>
      <textarea ref={ref}></textarea>
      <div className="py-4">
        <button onclick={inc}>{count}</button>
      </div>
    </div>
  )
}
