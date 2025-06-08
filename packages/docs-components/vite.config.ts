import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import kaioken from "vite-plugin-kaioken"
import tailwindcss from "@tailwindcss/vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

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
      external: [
        "kaioken",
        "kaioken/utils",
        "@kaioken-core/components",
        "@kaioken-core/hooks",
      ],
      output: {
        globals: {
          kaioken: "Kaioken",
          "kaioken/utils": "Kaioken",
        },
      },
    },
  },
  plugins: [
    tailwindcss(),
    kaioken(),
    dts({
      rollupTypes: false,
      exclude: ["vite.config.ts"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "lib/config.css",
          dest: "./",
        },
      ],
    }),
  ],
})
