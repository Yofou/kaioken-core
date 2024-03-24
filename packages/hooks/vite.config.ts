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
      external: ['kaioken'],
      output: {
        globals: {
          kaioken: 'Kaioken',
        },
      },
    },
  },
  plugins: [kaioken(), dts({ 
    rollupTypes: false,
  })]
})
