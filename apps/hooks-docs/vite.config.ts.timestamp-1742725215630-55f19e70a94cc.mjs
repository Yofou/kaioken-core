// vite.config.ts
import path from "node:path"
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@22.13.10_lightningcss@1.29.2/node_modules/vite/dist/node/index.js"
import ssr from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vike@0.4.181_vite@5.3.5_@types+node@22.13.10_lightningcss@1.29.2_/node_modules/vike/dist/esm/node/plugin/index.js"
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.15.0_kaioken@0.35.10/node_modules/vite-plugin-kaioken/dist/index.js"
import mdx from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@mdx-js+rollup@3.0.1_rollup@4.19.0/node_modules/@mdx-js/rollup/index.js"
import shiki from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@shikijs+rehype@1.12.1/node_modules/@shikijs/rehype/dist/index.mjs"
import {
  transformerTwoslash,
  rendererRich,
} from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@shikijs+twoslash@1.12.1_typescript@5.5.4/node_modules/@shikijs/twoslash/dist/index.mjs"
import sitemapPlugin from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-sitemap@0.7.1/node_modules/vite-plugin-sitemap/dist/index.js"

// src/utils/meta.ts
var Pages = /* @__PURE__ */ new Map([
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
    "/animations/useTween",
    {
      name: "useTween",
    },
  ],
  [
    "/animations/useTweenMemo",
    {
      name: "useTweenMemo",
    },
  ],
  [
    "/animations/useSpring",
    {
      name: "useSpring",
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

// vite.config.ts
import rehypeAutolinkHeadings from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/rehype-autolink-headings@7.1.0/node_modules/rehype-autolink-headings/index.js"
import rehypeSlug from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/rehype-slug@6.0.0/node_modules/rehype-slug/index.js"
var __vite_injected_original_dirname =
  "/Users/nathanewen/github/kaioken-core/apps/hooks-docs"
var hoverHighlight = rendererRich({
  hast: {
    popupTypes: {
      properties: {
        popover: "manual",
      },
    },
  },
})
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      $: path.join(__vite_injected_original_dirname, "src"),
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
            },
          ],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
            },
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3V0aWxzL21ldGEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvaG9va3MtZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25hdGhhbmV3ZW4vZ2l0aHViL2thaW9rZW4tY29yZS9hcHBzL2hvb2tzLWRvY3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25hdGhhbmV3ZW4vZ2l0aHViL2thaW9rZW4tY29yZS9hcHBzL2hvb2tzLWRvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCBzc3IgZnJvbSBcInZpa2UvcGx1Z2luXCJcbmltcG9ydCBrYWlva2VuIGZyb20gXCJ2aXRlLXBsdWdpbi1rYWlva2VuXCJcbmltcG9ydCBtZHggZnJvbSBcIkBtZHgtanMvcm9sbHVwXCJcbmltcG9ydCBzaGlraSwgeyB0eXBlIFJlaHlwZVNoaWtpT3B0aW9ucyB9IGZyb20gXCJAc2hpa2lqcy9yZWh5cGVcIlxuaW1wb3J0IHsgdHJhbnNmb3JtZXJUd29zbGFzaCwgcmVuZGVyZXJSaWNoIH0gZnJvbSBcIkBzaGlraWpzL3R3b3NsYXNoXCJcbmltcG9ydCBzaXRlbWFwUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1zaXRlbWFwXCJcbmltcG9ydCB7IFBhZ2VzIH0gZnJvbSBcIi4vc3JjL3V0aWxzL21ldGFcIlxuaW1wb3J0IHJlaHlwZUF1dG9saW5rSGVhZGluZ3MsIHtcbiAgT3B0aW9ucyBhcyBBdXRvTGlua09wdGlvbnMsXG59IGZyb20gXCJyZWh5cGUtYXV0b2xpbmstaGVhZGluZ3NcIlxuaW1wb3J0IHJlaHlwZVNsdWcgZnJvbSBcInJlaHlwZS1zbHVnXCJcblxuY29uc3QgaG92ZXJIaWdobGlnaHQgPSByZW5kZXJlclJpY2goe1xuICBoYXN0OiB7XG4gICAgcG9wdXBUeXBlczoge1xuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBwb3BvdmVyOiBcIm1hbnVhbFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSlcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAge1xuICAgICAgZW5mb3JjZTogXCJwcmVcIixcbiAgICAgIC4uLm1keCh7XG4gICAgICAgIGpzeDogZmFsc2UsXG4gICAgICAgIGpzeEltcG9ydFNvdXJjZTogXCJrYWlva2VuXCIsXG4gICAgICAgIGpzeFJ1bnRpbWU6IFwiYXV0b21hdGljXCIsXG4gICAgICAgIHJlaHlwZVBsdWdpbnM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBzaGlraSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGhlbWU6IFwiZ2l0aHViLWRhcmtcIixcbiAgICAgICAgICAgICAgdHJhbnNmb3JtZXJzOiBbXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtZXJUd29zbGFzaCh7XG4gICAgICAgICAgICAgICAgICBleHBsaWNpdFRyaWdnZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgICByZW5kZXJlcjogaG92ZXJIaWdobGlnaHQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9IGFzIFJlaHlwZVNoaWtpT3B0aW9ucyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIHJlaHlwZVNsdWcsXG4gICAgICAgICAgW1xuICAgICAgICAgICAgcmVoeXBlQXV0b2xpbmtIZWFkaW5ncyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYmVoYXZpb3I6IFwid3JhcFwiLFxuICAgICAgICAgICAgfSBhcyBBdXRvTGlua09wdGlvbnMsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIH0sXG4gICAgc3NyKHtcbiAgICAgIHByZXJlbmRlcjoge1xuICAgICAgICBub0V4dHJhRGlyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBrYWlva2VuKCksXG4gICAge1xuICAgICAgZW5mb3JjZTogXCJwb3N0XCIsXG4gICAgICAuLi5zaXRlbWFwUGx1Z2luKHtcbiAgICAgICAgaG9zdG5hbWU6IFwiaHR0cHM6Ly9ob29rcy5rYWlva2VuLWNvcmUuZGV2L1wiLFxuICAgICAgICBvdXREaXI6IFwiZGlzdC9jbGllbnRcIixcbiAgICAgICAgZHluYW1pY1JvdXRlczogW1wiL1wiLCAuLi5bLi4uUGFnZXMua2V5cygpXV0sXG4gICAgICB9KSxcbiAgICB9LFxuICBdLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL25hdGhhbmV3ZW4vZ2l0aHViL2thaW9rZW4tY29yZS9hcHBzL2hvb2tzLWRvY3Mvc3JjL3V0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvaG9va3MtZG9jcy9zcmMvdXRpbHMvbWV0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvaG9va3MtZG9jcy9zcmMvdXRpbHMvbWV0YS50c1wiO2V4cG9ydCBjb25zdCBQYWdlcyA9IG5ldyBNYXAoW1xuICBbXG4gICAgXCIvc3RhdGUvdXNlRWZmZWN0RGVlcFwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlRWZmZWN0RGVlcFwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9zdGF0ZS91c2VFZmZlY3REZWJvdW5jZVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlRWZmZWN0RGVib3VuY2VcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgXCIvc3RhdGUvdXNlRWZmZWN0VGhyb3R0bGVcIixcbiAgICB7XG4gICAgICBuYW1lOiBcInVzZUVmZmVjdFRocm90dGxlXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2Jyb3dzZXIvdXNlQ2xpY2tPdXRzaWRlXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VDbGlja091dHNpZGVcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgXCIvYnJvd3Nlci91c2VFdmVudExpc3RlbmVyXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VFdmVudExpc3RlbmVyXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2Jyb3dzZXIvdXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcIixcbiAgICB7XG4gICAgICBuYW1lOiBcInVzZUludGVyc2VjdGlvbk9ic2VydmVyXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2Jyb3dzZXIvdXNlTXV0YXRpb25PYnNlcnZlclwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlTXV0YXRpb25PYnNlcnZlclwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZVJlc2l6ZU9ic2VydmVyXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VSZXNpemVPYnNlcnZlclwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZUtleVN0cm9rZVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlS2V5U3Ryb2tlXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2Jyb3dzZXIvdXNlTWVkaWFRdWVyeVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlTWVkaWFRdWVyeVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZU1vdXNlXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VNb3VzZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZU1vdXNlSW5FbGVtZW50XCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VNb3VzZUluRWxlbWVudFwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZVN0YXJ0VHlwaW5nXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VTdGFydFR5cGluZ1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZVdpbmRvd0ZvY3VzXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VXaW5kb3dGb2N1c1wiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZVdpbmRvd1Bvc2l0aW9uXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VXaW5kb3dQb3NpdGlvblwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9icm93c2VyL3VzZVdpbmRvd1Njcm9sbFwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlV2luZG93U2Nyb2xsXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2Jyb3dzZXIvdXNlV2luZG93U2l6ZVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlV2luZG93U2l6ZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9lbGVtZW50cy91c2VBY3RpdmVFbGVtZW50XCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VBY3RpdmVFbGVtZW50XCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2VsZW1lbnRzL3VzZVBhcmVudEVsZW1lbnRcIixcbiAgICB7XG4gICAgICBuYW1lOiBcInVzZVBhcmVudEVsZW1lbnRcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgXCIvZWxlbWVudHMvdXNlQ3VycmVudEVsZW1lbnRcIixcbiAgICB7XG4gICAgICBuYW1lOiBcInVzZUN1cnJlbnRFbGVtZW50XCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2VsZW1lbnRzL3VzZUVsZW1lbnRCb3VuZGluZ1wiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlRWxlbWVudEJvdW5kaW5nXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2VsZW1lbnRzL3VzZUVsZW1lbnRCeVBvaW50XCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VFbGVtZW50QnlQb2ludFwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9lbGVtZW50cy91c2VFbGVtZW50VmlzaWJpbGl0eVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlRWxlbWVudFZpc2liaWxpdHlcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgXCIvZWxlbWVudHMvdXNlVGV4dGFyZWFBdXRvU2l6ZVwiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlVGV4dGFyZWFBdXRvU2l6ZVwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9hbmltYXRpb25zL3VzZVR3ZWVuXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VUd2VlblwiLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBcIi9hbmltYXRpb25zL3VzZVR3ZWVuTWVtb1wiLFxuICAgIHtcbiAgICAgIG5hbWU6IFwidXNlVHdlZW5NZW1vXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2FuaW1hdGlvbnMvdXNlU3ByaW5nXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VTcHJpbmdcIixcbiAgICB9LFxuICBdLFxuICBbXG4gICAgXCIvYW5pbWF0aW9ucy91c2VTcHJpbmdNZW1vXCIsXG4gICAge1xuICAgICAgbmFtZTogXCJ1c2VTcHJpbmdNZW1vXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwiL2FuaW1hdGlvbnMvdXNlUmFmRm5cIixcbiAgICB7XG4gICAgICBuYW1lOiBcInVzZVJhZkZuXCIsXG4gICAgfSxcbiAgXSxcbl0pXG5cbmV4cG9ydCBjb25zdCBnZXRQcmV2QW5kTmV4dFJvdXRlID0gKGN1cnJlbnRSb3V0ZTogc3RyaW5nKSA9PiB7XG4gIGlmICghUGFnZXMuaGFzKGN1cnJlbnRSb3V0ZSkpIHtcbiAgICBjb25zb2xlLndhcm4oXCJDYW5ub3QgZmluZCByb3V0ZVwiKVxuICAgIHJldHVybiBbbnVsbCwgbnVsbF0gYXMgY29uc3RcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBbLi4uUGFnZXMua2V5cygpXVxuICBjb25zdCB2YWx1ZXMgPSBbLi4uUGFnZXMudmFsdWVzKCldXG5cbiAgY29uc3Qgcm91dGVJbmRleCA9IGtleXMuaW5kZXhPZihjdXJyZW50Um91dGUpXG4gIGNvbnN0IGdldE9ialdpdGhSb3V0ZSA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaW5kZXhdXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICAuLi52YWx1ZSxcbiAgICAgIHJvdXRlOiBrZXlzW2luZGV4XSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gW1xuICAgIGdldE9ialdpdGhSb3V0ZShyb3V0ZUluZGV4IC0gMSksXG4gICAgZ2V0T2JqV2l0aFJvdXRlKHJvdXRlSW5kZXggKyAxKSxcbiAgXSBhcyBjb25zdFxufVxuXG5leHBvcnQgY29uc3QgUGFnZXNCeUdyb3VwID0gKCkgPT4ge1xuICBjb25zdCBncm91cGVkUGFnZXMgPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICB7XG4gICAgICBuYW1lOiBzdHJpbmdcbiAgICAgIHVybDogc3RyaW5nXG4gICAgfVtdXG4gID4oKVxuXG4gIGZvciAobGV0IGtleSBvZiBQYWdlcy5rZXlzKCkpIHtcbiAgICBjb25zdCBncm91cCA9IGtleS5zcGxpdChcIi9cIilbMV1cblxuICAgIGlmICghZ3JvdXBlZFBhZ2VzLmhhcyhncm91cCkpIHtcbiAgICAgIGdyb3VwZWRQYWdlcy5zZXQoZ3JvdXAsIFt7IG5hbWU6IFBhZ2VzLmdldChrZXkpIS5uYW1lLCB1cmw6IGtleSB9XSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYXJyID0gZ3JvdXBlZFBhZ2VzLmdldChncm91cClcbiAgICAgIGFyciEucHVzaCh7IG5hbWU6IFBhZ2VzLmdldChrZXkpIS5uYW1lLCB1cmw6IGtleSB9KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBncm91cGVkUGFnZXNcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsT0FBTyxVQUFVO0FBQ2xXLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBd0M7QUFDL0MsU0FBUyxxQkFBcUIsb0JBQW9CO0FBQ2xELE9BQU8sbUJBQW1COzs7QUNQOFUsSUFBTSxRQUFRLG9CQUFJLElBQUk7QUFBQSxFQUM1WDtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRHRLRCxPQUFPLDRCQUVBO0FBQ1AsT0FBTyxnQkFBZ0I7QUFadkIsSUFBTSxtQ0FBbUM7QUFjekMsSUFBTSxpQkFBaUIsYUFBYTtBQUFBLEVBQ2xDLE1BQU07QUFBQSxJQUNKLFlBQVk7QUFBQSxNQUNWLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsR0FBRyxLQUFLLEtBQUssa0NBQVcsS0FBSztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1A7QUFBQSxNQUNFLFNBQVM7QUFBQSxNQUNULEdBQUcsSUFBSTtBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsaUJBQWlCO0FBQUEsUUFDakIsWUFBWTtBQUFBLFFBQ1osZUFBZTtBQUFBLFVBQ2I7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLGNBQ0UsT0FBTztBQUFBLGNBQ1AsY0FBYztBQUFBLGdCQUNaLG9CQUFvQjtBQUFBLGtCQUNsQixpQkFBaUI7QUFBQSxrQkFDakIsVUFBVTtBQUFBLGdCQUNaLENBQUM7QUFBQSxjQUNIO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0U7QUFBQSxZQUNBO0FBQUEsY0FDRSxVQUFVO0FBQUEsWUFDWjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsSUFBSTtBQUFBLE1BQ0YsV0FBVztBQUFBLFFBQ1QsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELFFBQVE7QUFBQSxJQUNSO0FBQUEsTUFDRSxTQUFTO0FBQUEsTUFDVCxHQUFHLGNBQWM7QUFBQSxRQUNmLFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFBQSxNQUMzQyxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
