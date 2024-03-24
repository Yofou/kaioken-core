import { useEffect, useState } from "kaioken"

export const useMediaQuery = (query: string) => {
  const [isSupported, setIsSupported] = useState(false)
  const [matches, setMatches] = useState(false)
  let mediaQuery: MediaQueryList | undefined

  const handler = (event: MediaQueryListEvent) => {
    setMatches(event.matches)
  }

  const cleanup = () => {
    if (!mediaQuery)
      return
    if ('removeEventListener' in mediaQuery)
      mediaQuery.removeEventListener('change', handler)
    else
      // @ts-expect-error deprecated API
      mediaQuery.removeListener(handler)
  }

  useEffect(() => {
    cleanup()
    if (!isSupported) return;

    mediaQuery = window.matchMedia(query)

    if ('addEventListener' in mediaQuery)
      mediaQuery.addEventListener('change', handler)
    else
      // @ts-expect-error deprecated API
      mediaQuery.addListener(handler)

    setMatches(mediaQuery.matches)
  }, [query])

  useEffect(() => {
    setIsSupported(window && 'ResizeObserver' in window)
  }, [])

  return [matches]
}
