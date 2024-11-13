import type { Config } from 'tailwindcss';

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        background: "#292828",
        primary: "#ebdbb2",
      }
    }
  },

  plugins: []
} satisfies Config;
