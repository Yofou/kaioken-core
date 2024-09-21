import { createContext, Signal, useMemo } from "kaioken"

export const GroupContext = createContext<{
  group: Signal<string[]>
} | null>(null)
GroupContext.displayName = "CheckboxGroup.Context"

///////////////////
// CheckboxGroup Root
///////////////////

type RootProps = {
  checked: Signal<string[]>
}
export const Root: Kaioken.FC<RootProps> = (props) => {
  const contextValue = useMemo(() => {
    return {
      group: props.checked,
    }
  }, [props.checked])

  return (
    <GroupContext.Provider value={contextValue}>
      {props.children}
    </GroupContext.Provider>
  )
}
