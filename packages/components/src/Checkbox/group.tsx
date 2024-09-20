import { createContext, Signal, useMemo } from "kaioken"

export const GroupContext = createContext<{} | null>(null)
GroupContext.displayName = "CheckboxGroup.Context"

///////////////////
// CheckboxGroup Root
///////////////////

type RootProps = {
  checked: Signal<string[]>
}
export const Root: Kaioken.FC<RootProps> = (props) => {
  const contextValue = useMemo(() => {}, [])
  return (
    <GroupContext.Provider value={{}}>{props.children}</GroupContext.Provider>
  )
}
