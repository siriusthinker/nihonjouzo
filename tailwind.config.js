/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}