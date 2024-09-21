// vite.config.ts
import path from "node:path"
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.12/node_modules/vite/dist/node/index.js"
import ssr from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vike@0.4.195_vite@5.3.5_@types+node@20.14.12_/node_modules/vike/dist/esm/node/plugin/index.js"
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.10.7_kaioken@0.29.5/node_modules/vite-plugin-kaioken/dist/index.js"
var __vite_injected_original_dirname =
  "/Users/nathanewen/github/kaioken-core/apps/components-docs"
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      $: path.join(__vite_injected_original_dirname, "src"),
    },
  },
  server: {
    hmr: {
      port: 24679,
    },
  },
  plugins: [ssr(), kaioken()],
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvY29tcG9uZW50cy1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL2FwcHMvY29tcG9uZW50cy1kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uYXRoYW5ld2VuL2dpdGh1Yi9rYWlva2VuLWNvcmUvYXBwcy9jb21wb25lbnRzLWRvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcbmltcG9ydCBzc3IgZnJvbSBcInZpa2UvcGx1Z2luXCJcbmltcG9ydCBrYWlva2VuIGZyb20gXCJ2aXRlLXBsdWdpbi1rYWlva2VuXCJcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInNyY1wiKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBobXI6IHtcbiAgICAgIHBvcnQ6IDI0Njc5LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtzc3IoKSwga2Fpb2tlbigpXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdXLE9BQU8sVUFBVTtBQUNqWCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxhQUFhO0FBSHBCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEdBQUcsS0FBSyxLQUFLLGtDQUFXLEtBQUs7QUFBQSxJQUMvQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7QUFDNUIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
