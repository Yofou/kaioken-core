import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import kaioken from "vite-plugin-kaioken"

export default defineConfig({
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
