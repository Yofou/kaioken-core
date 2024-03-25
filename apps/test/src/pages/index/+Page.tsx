import { PageTitle } from "$/components/PageTitle"
import { useEventListener } from "@kaioken-core/hooks"
import {
  useElementBounding,
  useTextareaAutoSize,
  useParentElement,
  useActiveElement
} from "@kaioken-core/hooks"
import { useEffect, useRef, useState } from "kaioken"

export { Page }

function Page() {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [count, setCount] = useState(0)
  const inc = () => setCount(count + 1)
  const { width, height } = useElementBounding(ref)
  useTextareaAutoSize(ref, {})
  const person = useRef<{ age: number }>({ age: 0 })

  const [active] = useActiveElement()


  useEventListener('input', () => {
    if (person.current) {
      person.current.age += 1
      console.log(person)
    }
  }, {
    ref: () => ref.current,
  })

  console.log(active)


  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <PageTitle>Home</PageTitle>
      <p>
        {width} - {height}
      </p>
      <textarea className="w-full" ref={ref}></textarea>
      <div className="py-4">
      <button onclick={inc}>{count}
      </button>
      </div>
    </div>
  )
}
