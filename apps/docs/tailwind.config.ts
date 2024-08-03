import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    colors: {
      grey: {
        700: '#1e1e1e',
        900: '#151313'
      },
      red: '#ea495e',
      black: '#000',
      white: '#FFF',
    },
    fontFamily: {
      cabin: ["'Cabin Variable'", 'sans-serif']
    }
  },
  plugins: [],
} satisfies Config
