export const Pages = new Map([
  [
    "/state/useEffectDeep",
    {
      name: "useEffectDeep",
    },
  ],
  [
    "/state/useEffectDebounce",
    {
      name: "useEffectDebounce",
    },
  ],
  [
    "/state/useEffectThrottle",
    {
      name: "useEffectThrottle",
    },
  ],
  [
    "/browser/useClickOutside",
    {
      name: "useClickOutside",
    },
  ],
  [
    "/browser/useEventListener",
    {
      name: "useEventListener",
    },
  ],
  [
    "/browser/useIntersectionObserver",
    {
      name: "useIntersectionObserver",
    },
  ],
  [
    "/browser/useMutationObserver",
    {
      name: "useMutationObserver",
    },
  ],
  [
    "/browser/useResizeObserver",
    {
      name: "useResizeObserver",
    },
  ],
  [
    "/browser/useKeyStroke",
    {
      name: "useKeyStroke",
    },
  ],
  [
    "/browser/useMediaQuery",
    {
      name: "useMediaQuery",
    },
  ],
  [
    "/browser/useMouse",
    {
      name: "useMouse",
    },
  ],
  [
    "/browser/useMouseInElement",
    {
      name: "useMouseInElement",
    },
  ],
  [
    "/browser/useStartTyping",
    {
      name: "useStartTyping",
    },
  ],
  [
    "/browser/useWindowFocus",
    {
      name: "useWindowFocus",
    },
  ],
  [
    "/browser/useWindowPosition",
    {
      name: "useWindowPosition",
    },
  ],
  [
    "/browser/useWindowScroll",
    {
      name: "useWindowScroll",
    },
  ],
  [
    "/browser/useWindowSize",
    {
      name: "useWindowSize",
    },
  ],
  [
    "/elements/useActiveElement",
    {
      name: "useActiveElement",
    },
  ],
  [
    "/elements/useParentElement",
    {
      name: "useParentElement",
    },
  ],
  [
    "/elements/useCurrentElement",
    {
      name: "useCurrentElement",
    },
  ],
  [
    "/elements/useElementBounding",
    {
      name: "useElementBounding",
    },
  ],
  [
    "/elements/useElementByPoint",
    {
      name: "useElementByPoint",
    },
  ],
  [
    "/elements/useElementVisibility",
    {
      name: "useElementVisibility",
    },
  ],
  [
    "/elements/useTextareaAutoSize",
    {
      name: "useTextareaAutoSize",
    },
  ],
  [
    "/animations/tween",
    {
      name: "tween",
    },
  ],
  [
    "/animations/useTweenMemo",
    {
      name: "useTweenMemo",
    },
  ],
  [
    "/animations/spring",
    {
      name: "spring",
    },
  ],
  [
    "/animations/useSpringMemo",
    {
      name: "useSpringMemo",
    },
  ],
  [
    "/animations/useRafFn",
    {
      name: "useRafFn",
    },
  ],
])

export const getPrevAndNextRoute = (currentRoute: string) => {
  if (!Pages.has(currentRoute)) {
    console.warn("Cannot find route")
    return [null, null] as const
  }

  const keys = [...Pages.keys()]
  const values = [...Pages.values()]

  const routeIndex = keys.indexOf(currentRoute)
  const getObjWithRoute = (index: number) => {
    const value = values[index]
    if (!value) return null

    return {
      ...value,
      route: keys[index],
    }
  }

  return [
    getObjWithRoute(routeIndex - 1),
    getObjWithRoute(routeIndex + 1),
  ] as const
}

export const PagesByGroup = () => {
  const groupedPages = new Map<
    string,
    {
      name: string
      url: string
    }[]
  >()

  for (let key of Pages.keys()) {
    const group = key.split("/")[1]

    if (!groupedPages.has(group)) {
      groupedPages.set(group, [{ name: Pages.get(key)!.name, url: key }])
    } else {
      const arr = groupedPages.get(group)
      arr!.push({ name: Pages.get(key)!.name, url: key })
    }
  }

  return groupedPages
}
