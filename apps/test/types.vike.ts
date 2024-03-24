//https://vike.dev/pageContext#custom

declare global {
  namespace Vike {
    interface PageContext {
      abortReason?: string | { notAdmin: true }
      abortStatusCode?: number
      is404?: boolean

      Page: () => JSX.Element
      Layout: () => JSX.Element
      title: string | ((ctx: PageContext) => string)

      config: {
        title: string | ((ctx: PageContext) => string)
        Page: () => JSX.Element
        Layout?: () => JSX.Element
      }

      routeParams: Record<string, string>

      data: Record<string, unknown>
    }
  }
}

export {}
