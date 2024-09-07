// https://vike.dev/onRenderClient
import type { OnRenderClientAsync, PageContextClient } from "vike/types"
import { hydrate } from "kaioken/ssr/client"
import type { AppContext } from "kaioken"
import { getTitle } from "./utils"
import { App } from "./App"

let appContext: AppContext<{ pageContext: PageContextClient }> | undefined

let lastPage: string | null = null
export const onRenderClient: OnRenderClientAsync = async (pageContext) => {
  const container = document.getElementById("page-root")!

  if (pageContext.isHydration || !appContext) {
    appContext = await hydrate(App, container, { pageContext })
    return
  }

  document.title = getTitle(pageContext)
  console.log('new', pageContext.urlPathname, 'last', lastPage)
  try {
    await appContext.setProps(() => ({ pageContext }))
  } catch (e) {
    console.log('catched setProp error', e)
  }
  console.log('new', pageContext.urlPathname, 'last', lastPage)
  lastPage = pageContext.urlPathname
}
