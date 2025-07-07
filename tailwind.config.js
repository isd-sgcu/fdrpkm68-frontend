/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'zen-dots': ['"Zen Dots"', 'cursive'],
        'ibm-plex-thai': ['IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
