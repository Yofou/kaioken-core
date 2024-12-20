import { useSignal, useEffect } from "kaioken"

export const useMediaQuery = (query: string) => {
  const isSupported = useSignal(false)
  const matches = useSignal(false)
  let mediaQuery: MediaQueryList | undefined

  const handler = (event: MediaQueryListEvent) => {
    matches.value = event.matches
  }

  useEffect(() => {
    isSupported.value = window && "ResizeObserver" in window
  }, [])

  useEffect(() => {
    const cleanup = () => {
      if (!mediaQuery) return
      if ("removeEventListener" in mediaQuery)
        mediaQuery.removeEventListener("change", handler)
      // @ts-expect-error deprecated API
      else mediaQuery.removeListener(handler)
    }

    if (!isSupported.value) return cleanup

    mediaQuery = window.matchMedia(query)

    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler)
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler)

    matches.value = mediaQuery.matches

    return cleanup
  }, [query])

  return [matches]
}
