// Environment: server
import type { OnRenderHtmlAsync } from "vike/types"
import { dangerouslySkipEscape, escapeInject } from "vike/server"
import { renderToString } from "kaioken"
import { getTitle } from "./utils"
import { App } from "./App"

export const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const pageHtml = renderToString(App, { pageContext })
  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="/kaioken-hook.svg">
        <meta name="description" content="All the hooks you need to build an interactive application">
        <meta property="og:title" content="${getTitle(pageContext)}">
        <meta property="og:description" content="All the hooks you need to build an interactive application">
        <meta property="og:type" content="article">
        <meta property="og:image" content="/ogimg.png">
        <title>${getTitle(pageContext)}</title>
      </head>
      <body>
        <div id="page-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`
}
