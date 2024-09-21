import { DemoContainer } from "$/components/DemoContainer"
import { useCurrentElement } from "@kaioken-core/hooks"
import { useEffect } from "kaioken"

export const UseCurrentElementExample: Kaioken.FC = () => {
  const currentElm = useCurrentElement()
  useEffect(()=>{
    console.log("current element", currentElm.peek())
  },[])
  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Open console to see current element</p>
    </DemoContainer>
  )
}
