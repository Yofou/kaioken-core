import { defineConfig } from 'vite'
import kaioken from "vite-plugin-kaioken"
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: './lib/main.ts',
      name: 'KaiokenCore',
      fileName: 'main',
    },

    rollupOptions: {
      external: ['kaioken', 'kaioken/dist/utils'],
      output: {
        globals: {
          "kaioken": 'Kaioken',
          "kaioken/utils": 'Kaioken',
        },
      },
    },
  },
  plugins: [kaioken(), dts({
    rollupTypes: false,
    exclude: ['vite.config.ts']
  })]
})
