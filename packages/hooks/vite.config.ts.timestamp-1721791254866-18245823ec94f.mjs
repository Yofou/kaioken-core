// vite.config.ts
import { defineConfig } from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.12/node_modules/vite/dist/node/index.js";
import kaioken from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-kaioken@0.7.1_kaioken@0.23.6/node_modules/vite-plugin-kaioken/dist/index.js";
import dts from "file:///Users/nathanewen/github/kaioken-core/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.14.12_rollup@4.19.0_typescript@5.5.4_vite@5.3.4_@types+node@20.14.12_/node_modules/vite-plugin-dts/dist/index.mjs";
var vite_config_default = defineConfig({
  build: {
    minify: false,
    lib: {
      entry: ["./lib/main.ts", "./lib/easing.ts"],
      name: "KaiokenCore",
      fileName: (extension, name) => extension === "es" ? `${name}.js` : `${name}.${extension}.js`
    },
    rollupOptions: {
      external: ["kaioken", "kaioken/utils.js"],
      output: {
        globals: {
          "kaioken": "Kaioken",
          "kaioken/utils": "Kaioken"
        }
      }
    }
  },
  plugins: [kaioken(), dts({
    rollupTypes: false,
    exclude: ["vite.config.ts"]
  })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2hvb2tzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbmF0aGFuZXdlbi9naXRodWIva2Fpb2tlbi1jb3JlL3BhY2thZ2VzL2hvb2tzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9uYXRoYW5ld2VuL2dpdGh1Yi9rYWlva2VuLWNvcmUvcGFja2FnZXMvaG9va3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGthaW9rZW4gZnJvbSBcInZpdGUtcGx1Z2luLWthaW9rZW5cIlxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogWycuL2xpYi9tYWluLnRzJywgJy4vbGliL2Vhc2luZy50cyddLFxuICAgICAgbmFtZTogJ0thaW9rZW5Db3JlJyxcbiAgICAgIGZpbGVOYW1lOiAoZXh0ZW5zaW9uLCBuYW1lKSA9PiBleHRlbnNpb24gPT09ICdlcycgID8gYCR7bmFtZX0uanNgIDogYCR7bmFtZX0uJHtleHRlbnNpb259LmpzYCxcbiAgICB9LFxuXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsna2Fpb2tlbicsICdrYWlva2VuL3V0aWxzLmpzJ10sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIFwia2Fpb2tlblwiOiAnS2Fpb2tlbicsXG4gICAgICAgICAgXCJrYWlva2VuL3V0aWxzXCI6ICdLYWlva2VuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW2thaW9rZW4oKSwgZHRzKHtcbiAgICByb2xsdXBUeXBlczogZmFsc2UsXG4gICAgZXhjbHVkZTogWyd2aXRlLmNvbmZpZy50cyddXG4gIH0pXVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxvQkFBb0I7QUFDM1csT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUVoQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDSCxPQUFPLENBQUMsaUJBQWlCLGlCQUFpQjtBQUFBLE1BQzFDLE1BQU07QUFBQSxNQUNOLFVBQVUsQ0FBQyxXQUFXLFNBQVMsY0FBYyxPQUFRLEdBQUcsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLFNBQVM7QUFBQSxJQUMxRjtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFdBQVcsa0JBQWtCO0FBQUEsTUFDeEMsUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsaUJBQWlCO0FBQUEsUUFDbkI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSTtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFNBQVMsQ0FBQyxnQkFBZ0I7QUFBQSxFQUM1QixDQUFDLENBQUM7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
