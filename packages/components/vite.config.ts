import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  esbuild: {
    loader: "ts",
  },
  build: {
    lib: {
      entry: ["./lib/main.ts"],
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
    dts({
      rollupTypes: false,
      exclude: ["vite.config.ts"],
    }),
  ],
})
