import path from "node:path"
import { defineConfig } from "vite"
import ssr from "vike/plugin"
import kaioken from "vite-plugin-kaioken"
import mdx from "@mdx-js/rollup"
import shiki, { type RehypeShikiOptions } from "@shikijs/rehype"
import { transformerTwoslash, rendererRich } from "@shikijs/twoslash"
import sitemapPlugin from "vite-plugin-sitemap"
import { Pages } from "./src/utils/meta"

const hoverHighlight = rendererRich({
  hast: {
    popupTypes: {
      properties: {
        popover: "manual",
      },
    },
  },
})

export default defineConfig({
  resolve: {
    alias: {
      $: path.join(__dirname, "src"),
    },
  },
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        jsx: false,
        jsxImportSource: "kaioken",
        jsxRuntime: "automatic",
        rehypePlugins: [
          [
            shiki,
            {
              theme: "github-dark",
              transformers: [
                transformerTwoslash({
                  explicitTrigger: true,
                  renderer: hoverHighlight,
                }),
              ],
            } as RehypeShikiOptions,
          ],
        ],
      }),
    },
    ssr({
      prerender: {
        noExtraDir: true,
      },
    }),
    kaioken(),
    {
      enforce: "post",
      ...sitemapPlugin({
        hostname: "https://hooks.kaioken-core.dev/",
        outDir: "dist/client",
        dynamicRoutes: ["/", ...[...Pages.keys()]],
      }),
    },
  ],
})
