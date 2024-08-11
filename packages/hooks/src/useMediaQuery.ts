import { signal, useEffect, useState } from "kaioken"

export const useMediaQuery = (query: string) => {
  const isSupported = signal(false)
  const [matches, setMatches] = useState(false)
  let mediaQuery: MediaQueryList | undefined

  const handler = (event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }

  const cleanup = () => {
    if (!mediaQuery) return
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler)
    // @ts-expect-error deprecated API
    else mediaQuery.removeListener(handler)
  }

  useEffect(() => {
    isSupported.value = window && "ResizeObserver" in window
  }, [])

  useEffect(() => {
    cleanup()
    if (!isSupported.value) return

    mediaQuery = window.matchMedia(query)

    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler)
    // @ts-expect-error deprecated API
    else mediaQuery.addListener(handler)

    setMatches(mediaQuery.matches)
  }, [query])

  return [matches]
}
