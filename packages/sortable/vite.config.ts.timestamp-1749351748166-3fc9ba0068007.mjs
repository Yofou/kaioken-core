// vite.config.ts
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.12_lightningcss@1.30.1/node_modules/vite/dist/node/index.js"
import dts from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.12_rollup@4.19.0_typescript@5.5.4_vite@5.3.5_@types+n_etegdhzl6ly7nvrjfwydadn3bi/node_modules/vite-plugin-dts/dist/index.mjs"
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.20.1_kaioken@0.40.1/node_modules/vite-plugin-kaioken/dist/index.js"
var vite_config_default = defineConfig({
  build: {
    minify: false,
    lib: {
      entry: ["./lib/main.tsx"],
      name: "KaiokenCore",
      fileName: (extension, name) =>
        extension === "es" ? `${name}.js` : `${name}.${extension}.js`,
    },
    rollupOptions: {
      external: ["kaioken", "kaioken/utils", "muuri"],
      output: {
        globals: {
          kaioken: "Kaioken",
          "kaioken/utils": "Kaioken",
        },
      },
    },
  },
  plugins: [
    kaioken(),
    dts({
      rollupTypes: false,
      exclude: ["vite.config.ts"],
    }),
  ],
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL3NvcnRhYmxlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL3NvcnRhYmxlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uYXRoYW5ld2VuL2dpdGh1Yi9rYWlva2VuLWNvcmUvcGFja2FnZXMvc29ydGFibGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IGthaW9rZW4gZnJvbSBcInZpdGUtcGx1Z2luLWthaW9rZW5cIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIG1pbmlmeTogZmFsc2UsXG5cbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBbXCIuL2xpYi9tYWluLnRzeFwiXSxcbiAgICAgIG5hbWU6IFwiS2Fpb2tlbkNvcmVcIixcbiAgICAgIGZpbGVOYW1lOiAoZXh0ZW5zaW9uLCBuYW1lKSA9PlxuICAgICAgICBleHRlbnNpb24gPT09IFwiZXNcIiA/IGAke25hbWV9LmpzYCA6IGAke25hbWV9LiR7ZXh0ZW5zaW9ufS5qc2AsXG4gICAgfSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJrYWlva2VuXCIsIFwia2Fpb2tlbi91dGlsc1wiLCBcIm11dXJpXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICBrYWlva2VuOiBcIkthaW9rZW5cIixcbiAgICAgICAgICBcImthaW9rZW4vdXRpbHNcIjogXCJLYWlva2VuXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBrYWlva2VuKCksXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiBmYWxzZSxcbiAgICAgIGV4Y2x1ZGU6IFtcInZpdGUuY29uZmlnLnRzXCJdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVYsU0FBUyxvQkFBb0I7QUFDcFgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUVwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFFUixLQUFLO0FBQUEsTUFDSCxPQUFPLENBQUMsZ0JBQWdCO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsU0FDcEIsY0FBYyxPQUFPLEdBQUcsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVM7QUFBQSxJQUM1RDtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFdBQVcsaUJBQWlCLE9BQU87QUFBQSxNQUM5QyxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxpQkFBaUI7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLGdCQUFnQjtBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
