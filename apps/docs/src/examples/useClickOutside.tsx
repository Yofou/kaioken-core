import { useClickOutside } from "@kaioken-core/hooks"
import { useRef, useState } from "kaioken"

export const UseClickOutsideExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  useClickOutside(ref, () => {
    setIsOpen(false)
  })
  return <>
    <div className={"p-4 font-cabin flex gap-2 justify-start flex-col bg-[#0a0a0a]"}>
      <button className="bg-red px-2 py-1 rounded-lg" onclick={() => setIsOpen(true)}>Open model</button>
    </div> 

    {isOpen && <div className="w-full h-screen fixed top-0 left-0 bg-black/20 grid place-items-center">
      <div ref={ref} className="max-w-[600px] h-[200px] rounded-lg bg-black w-full grid place-items-center">
        <p>Click outside to close</p>
      </div>
    </div>}
  </>
}
