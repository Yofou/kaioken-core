import { useStartTyping } from "@kaioken-core/hooks"
import { useRef } from "kaioken"

export const UseStartTypingExample = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  
  useStartTyping(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  return <div className="p-4 font-cabin flex gap-4 flex-col bg-[#0a0a0a]">
    <input className="p-2 rounded-lg" ref={inputRef} placeholder="start typing and it will focus this element" />
    <input className="p-2 rounded-lg" placeholder="typing on this element will not run the callback" />
  </div>
} 
