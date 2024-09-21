import { DemoContainer } from "$/components/DemoContainer"
import { useParentElement } from "@kaioken-core/hooks"
import { useEffect } from "kaioken"

export const UseParentElementExample: Kaioken.FC = () => {
  const parentElm = useParentElement()
  useEffect(()=>{
    console.log("parentElm", parentElm?.peek())
  },[])
  return (
    <DemoContainer className="p-4 font-cabin flex gap-4 flex-col">
      <p>Open console to see parent element</p>
    </DemoContainer>
  )
}
