/** @type {import('tailwindcss').Config} */
export default {

  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {

      css: {
        ':root': { // This target ensures the variables are globally available
          '--font-orbitron': '"Orbitron Variable", sans-serif',
          '--font-ibm-plex-sans-thai': '"IBM Plex Sans Thai", sans-serif',
          '--font-zen-dots': '"Zen Dots", cursive',
        },
      },

    },
  },
  plugins: [],
}