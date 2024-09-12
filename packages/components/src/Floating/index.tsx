import { createContext, useContext, useEffect, useMemo, useRef } from "kaioken"
import { Slot } from "../Slot"
import { autoUpdate } from "@floating-ui/dom"

type RootProps = {}
const FloatingContext = createContext<{
  anchorRef: Kaioken.RefObject<HTMLElement>
  popoverRef: Kaioken.RefObject<HTMLElement>
} | null>(null)

export const Root: Kaioken.FC<RootProps> = (props) => {
  const anchorRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const value = useMemo(() => {
    return {
      anchorRef,
      popoverRef,
    }
  }, [])

  return (
    <FloatingContext.Provider value={value}>
      {props.children}
    </FloatingContext.Provider>
  )
}

export const Anchor: Kaioken.FC = (props) => {
  const floatingContext = useContext(FloatingContext)

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Anchor")
    return props.children
  }

  return <Slot ref={floatingContext.anchorRef}>{props.children}</Slot>
}

export const Content: Kaioken.FC = (props) => {
  const floatingContext = useContext(FloatingContext)

  useEffect(() => {
    if (
      !floatingContext ||
      !floatingContext.anchorRef.current ||
      !floatingContext.popoverRef.current
    ) {
      return
    }

    const cleanup = autoUpdate(
      floatingContext.anchorRef.current,
      floatingContext.popoverRef.current,
      () => {}
    )

    return () => cleanup()
  }, [floatingContext?.popoverRef, floatingContext?.anchorRef])

  if (!floatingContext) {
    console.log("Floating.Root context was not found in Floating.Content")
    return props.children
  }

  return <Slot ref={floatingContext.popoverRef}>{props.children}</Slot>
}
