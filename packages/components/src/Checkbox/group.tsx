import { createContext } from "kaioken"

export const GroupContext = createContext<{} | null>(null)
GroupContext.displayName = "CheckboxGroup.Context"

///////////////////
// CheckboxGroup Root
///////////////////

type RootProps = {}
export const Root: Kaioken.FC<RootProps> = () => {
  return <GroupContext.Provider value={{}}></GroupContext.Provider>
}
