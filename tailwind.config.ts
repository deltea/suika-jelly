import type { Config } from 'tailwindcss';

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        background: "#060607",
        primary: "#FFCBB5",
      }
    }
  },

  plugins: []
} satisfies Config;
