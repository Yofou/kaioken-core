// vite.config.ts
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.12/node_modules/vite/dist/node/index.js"
import dts from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.12_rollup@4.19.0_typescript@5.5.4_vite@5.3.5_@types+node@20.14.12_/node_modules/vite-plugin-dts/dist/index.mjs"
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.10.6_kaioken@0.28.4/node_modules/vite-plugin-kaioken/dist/index.js"
var vite_config_default = defineConfig({
  build: {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2NvbXBvbmVudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9uYXRoYW5ld2VuL2dpdGh1Yi9rYWlva2VuLWNvcmUvcGFja2FnZXMvY29tcG9uZW50cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2NvbXBvbmVudHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIlxuaW1wb3J0IGthaW9rZW4gZnJvbSBcInZpdGUtcGx1Z2luLWthaW9rZW5cIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgZW50cnk6IFtcIi4vbGliL21haW4udHN4XCJdLFxuICAgICAgbmFtZTogXCJLYWlva2VuQ29yZVwiLFxuICAgICAgZmlsZU5hbWU6IChleHRlbnNpb24sIG5hbWUpID0+XG4gICAgICAgIGV4dGVuc2lvbiA9PT0gXCJlc1wiID8gYCR7bmFtZX0uanNgIDogYCR7bmFtZX0uJHtleHRlbnNpb259LmpzYCxcbiAgICB9LFxuXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFtcImthaW9rZW5cIiwgXCJrYWlva2VuL3V0aWxzXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICBrYWlva2VuOiBcIkthaW9rZW5cIixcbiAgICAgICAgICBcImthaW9rZW4vdXRpbHNcIjogXCJLYWlva2VuXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBrYWlva2VuKCksXG4gICAgZHRzKHtcbiAgICAgIHJvbGx1cFR5cGVzOiBmYWxzZSxcbiAgICAgIGV4Y2x1ZGU6IFtcInZpdGUuY29uZmlnLnRzXCJdLFxuICAgIH0pLFxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxvQkFBb0I7QUFDMVgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUVwQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLENBQUMsZ0JBQWdCO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsU0FDcEIsY0FBYyxPQUFPLEdBQUcsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVM7QUFBQSxJQUM1RDtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFdBQVcsZUFBZTtBQUFBLE1BQ3JDLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULGlCQUFpQjtBQUFBLFFBQ25CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixJQUFJO0FBQUEsTUFDRixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsZ0JBQWdCO0FBQUEsSUFDNUIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
