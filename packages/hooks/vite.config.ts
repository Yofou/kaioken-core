import { defineConfig } from 'vite'
import kaioken from "vite-plugin-kaioken"

export default defineConfig({
  build: {
    lib: {
      entry: './lib/main.ts',
      name: 'KaiokenCore',
      fileName: 'main'
    }
  },
  plugins: [kaioken()]
})
