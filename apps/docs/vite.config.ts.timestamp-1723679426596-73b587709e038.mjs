// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.12/node_modules/vite/dist/node/index.js";
import ssr from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vike@0.4.181_vite@5.3.5_@types+node@20.14.12_/node_modules/vike/dist/esm/node/plugin/index.js";
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.8.0_kaioken@0.25.3/node_modules/vite-plugin-kaioken/dist/index.js";
import mdx from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@mdx-js+rollup@3.0.1_rollup@4.19.0/node_modules/@mdx-js/rollup/index.js";
import shiki from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@shikijs+rehype@1.12.1/node_modules/@shikijs/rehype/dist/index.mjs";
import {
  transformerTwoslash
} from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/@shikijs+twoslash@1.12.1_typescript@5.5.4/node_modules/@shikijs/twoslash/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/nathanewen/github/kaioken-core/apps/docs";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      $: path.join(__vite_injected_original_dirname, "src")
    }
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
              transformers: [transformerTwoslash({
                explicitTrigger: true
              })]
            }
          ]
        ]
      })
    },
    ssr(),
    kaioken()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25hdGhhbmV3ZW4vZ2l0aHViL2thaW9rZW4tY29yZS9hcHBzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25hdGhhbmV3ZW4vZ2l0aHViL2thaW9rZW4tY29yZS9hcHBzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCBzc3IgZnJvbSBcInZpa2UvcGx1Z2luXCJcbmltcG9ydCBrYWlva2VuIGZyb20gXCJ2aXRlLXBsdWdpbi1rYWlva2VuXCJcbmltcG9ydCBtZHggZnJvbSBcIkBtZHgtanMvcm9sbHVwXCJcbmltcG9ydCBzaGlraSwgeyB0eXBlIFJlaHlwZVNoaWtpT3B0aW9ucyB9IGZyb20gXCJAc2hpa2lqcy9yZWh5cGVcIjtcbmltcG9ydCB7XG4gIHRyYW5zZm9ybWVyVHdvc2xhc2gsXG59IGZyb20gJ0BzaGlraWpzL3R3b3NsYXNoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICQ6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwic3JjXCIpLFxuICAgIH0sXG4gIH0sXG5cdHBsdWdpbnM6IFtcbiAgICB7XG4gICAgICBlbmZvcmNlOiBcInByZVwiLFxuICAgICAgLi4ubWR4KHtcbiAgICAgICAganN4OiBmYWxzZSxcbiAgICAgICAganN4SW1wb3J0U291cmNlOiBcImthaW9rZW5cIixcbiAgICAgICAganN4UnVudGltZTogXCJhdXRvbWF0aWNcIixcbiAgICAgICAgcmVoeXBlUGx1Z2luczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHNoaWtpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aGVtZTogXCJnaXRodWItZGFya1wiLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm1lcnM6IFt0cmFuc2Zvcm1lclR3b3NsYXNoKHtcbiAgICAgICAgICAgICAgICBleHBsaWNpdFRyaWdnZXI6IHRydWVcbiAgICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgfSBhcyBSZWh5cGVTaGlraU9wdGlvbnMsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgIH0sXG5cdFx0c3NyKCksIFxuXHRcdGthaW9rZW4oKVxuXHRdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1QsT0FBTyxVQUFVO0FBQ2hWLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBd0M7QUFDL0M7QUFBQSxFQUNFO0FBQUEsT0FDSztBQVJQLElBQU0sbUNBQW1DO0FBVXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEdBQUcsS0FBSyxLQUFLLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNOO0FBQUEsTUFDRSxTQUFTO0FBQUEsTUFDVCxHQUFHLElBQUk7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLFlBQVk7QUFBQSxRQUNaLGVBQWU7QUFBQSxVQUNiO0FBQUEsWUFDRTtBQUFBLFlBQ0E7QUFBQSxjQUNFLE9BQU87QUFBQSxjQUNQLGNBQWMsQ0FBQyxvQkFBb0I7QUFBQSxnQkFDakMsaUJBQWlCO0FBQUEsY0FDbkIsQ0FBQyxDQUFDO0FBQUEsWUFDSjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0YsSUFBSTtBQUFBLElBQ0osUUFBUTtBQUFBLEVBQ1Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
