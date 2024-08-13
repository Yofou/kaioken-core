import { Button } from "$/components/Button"
import { DemoContainer } from "$/components/DemoContainer"
import { usePageContext } from "$/context/pageContext"
import { useElementBounding, useElementByPoint, useMouse, useSpringMemo, useTweenMemo } from "@kaioken-core/hooks"
import { Portal, signal, useMemo, useRef, useVNode } from "kaioken"

export const UseSaraDemo2: Kaioken.FC = (props) => {
  const count = signal(0)
  const tweenCount = useSpringMemo(() => {
    return count.value
  }, [count.value])
  console.log('boop')

  return <DemoContainer>
    <Button onclick={() => count.value += 10}>Click me</Button>
    <p>{tweenCount}</p>
  </DemoContainer>
}

export const UseSaraDemo: Kaioken.FC = (props) => {
  const { isClient } = usePageContext()
  const { mouse } = useMouse()
  const { element } = useElementByPoint({
    x: mouse.x,
    y: mouse.y
  })

  const isItemContainer = useMemo(() => {
    if (!element) return null

    const hasProjectCard = element.closest('.project-card')
    if (hasProjectCard) {
      return hasProjectCard
    }

    return null
  }, [element])


  const hard = useRef(false)
  const cardBounding = useElementBounding({ current: isItemContainer })
  const tweenedBounding = useSpringMemo(() => {
    hard.current = cardBounding.width === 0
    return {
      width: cardBounding.width,
      height: cardBounding.height,
      top: cardBounding.top,
      left: cardBounding.left
    }
  }, [cardBounding], {
    hard: hard.current
  })


  console.log(useVNode())

  return <DemoContainer className="w-full p-8 rounded-lg flex flex-col gap-4">
    <h3 className="text-[1.5rem] font-bold text-white col-span-full">Cool things</h3>

    <div className="grid grid-cols-3 grid-rows-2 auto-rows-min gap-4 w-full">
     {isClient && <Portal container={document.body}>
       {(() => {
        return <div 
        className="bg-red shadow-xl shadow-red fixed -z-10 rounded-lg scale-[1.05] transition-opacity" 
          style={{
            width: `${tweenedBounding.width}px`,
            height: `${tweenedBounding.height}px`,
            top:`${tweenedBounding.top}px`, 
            left: `${tweenedBounding.left}px`, 
            opacity: isItemContainer == null ? `0` : `1`,
          }}
        />
       })()}
      </Portal>}

    <div className="p-8 border border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>Personal-Website</p>
      <p>Keeping track of my things</p>
    </div>

    <div className="p-8 border  border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>TimeZones-in-Svelte</p>
      <p>Time Zone Compare - Made with Svelte kit</p>
    </div>

    <div className="p-8 border border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>unprofessional</p>
      <p>Portfolio website, but less professional</p>
    </div>

    <div className="p-8 border border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>image-galary</p>
      <p>Pictures From 2013 -2023</p>
    </div>

    <div className="p-8 border border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>gemini-chat-application</p>
      <p>Simple use case of Gemeni models</p>
    </div>

    <div className="p-8 border border-white/50 rounded-lg flex flex-col gap-8 project-card bg-[#181818]">
      <p>Travel-Designer</p>
      <p>An online Travel Application with the usage of Trip Advisor API, Using React and NodeJS , as Well as Vite For Bundling.</p>
    </div>
    </div>
  </DemoContainer>
}
