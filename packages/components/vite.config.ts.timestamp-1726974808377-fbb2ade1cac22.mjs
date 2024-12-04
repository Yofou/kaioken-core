// vite.config.ts
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.12/node_modules/vite/dist/node/index.js"
import dts from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.12_rollup@4.19.0_typescript@5.5.4_vite@5.3.5_@types+node@20.14.12_/node_modules/vite-plugin-dts/dist/index.mjs"
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.10.7_kaioken@0.29.5/node_modules/vite-plugin-kaioken/dist/index.js"
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
      external: ["kaioken", "kaioken/utils"],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2NvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uYXRoYW5ld2VuL2dpdGh1Yi9rYWlva2VuLWNvcmUvcGFja2FnZXMvY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IGthaW9rZW4gZnJvbSBcInZpdGUtcGx1Z2luLWthaW9rZW5cIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIG1pbmlmeTogZmFsc2UsXG5cbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiBbXCIuL2xpYi9tYWluLnRzeFwiXSxcbiAgICAgIG5hbWU6IFwiS2Fpb2tlbkNvcmVcIixcbiAgICAgIGZpbGVOYW1lOiAoZXh0ZW5zaW9uLCBuYW1lKSA9PlxuICAgICAgICBleHRlbnNpb24gPT09IFwiZXNcIiA/IGAke25hbWV9LmpzYCA6IGAke25hbWV9LiR7ZXh0ZW5zaW9ufS5qc2AsXG4gICAgfSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJrYWlva2VuXCIsIFwia2Fpb2tlbi91dGlsc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAga2Fpb2tlbjogXCJLYWlva2VuXCIsXG4gICAgICAgICAgXCJrYWlva2VuL3V0aWxzXCI6IFwiS2Fpb2tlblwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAga2Fpb2tlbigpLFxuICAgIGR0cyh7XG4gICAgICByb2xsdXBUeXBlczogZmFsc2UsXG4gICAgICBleGNsdWRlOiBbXCJ2aXRlLmNvbmZpZy50c1wiXSxcbiAgICB9KSxcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZWLFNBQVMsb0JBQW9CO0FBQzFYLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFFcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBRVIsS0FBSztBQUFBLE1BQ0gsT0FBTyxDQUFDLGdCQUFnQjtBQUFBLE1BQ3hCLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLFNBQ3BCLGNBQWMsT0FBTyxHQUFHLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxTQUFTO0FBQUEsSUFDNUQ7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxXQUFXLGVBQWU7QUFBQSxNQUNyQyxRQUFRO0FBQUEsUUFDTixTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxpQkFBaUI7QUFBQSxRQUNuQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLGdCQUFnQjtBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
