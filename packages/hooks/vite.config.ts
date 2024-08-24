import { defineConfig } from 'vite'
import kaioken from "vite-plugin-kaioken"
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: ['./lib/main.ts', './lib/easing.ts'],
      name: 'KaiokenCore',
      fileName: (extension, name) => extension === 'es'  ? `${name}.js` : `${name}.${extension}.js`,
    },

    rollupOptions: {
      external: ['kaioken', 'kaioken/utils'],
      output: {
        globals: {
          "kaioken": 'Kaioken',
          "kaioken/utils.js": 'Kaioken',
        },
      },
    },
  },
  plugins: [
    // @ts-ignore this is type fucked rn
    kaioken(), 
    dts({
      rollupTypes: false,
      exclude: ['vite.config.ts']
    })
  ]
})
