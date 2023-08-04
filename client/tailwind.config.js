/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "main":"#6e237e",
        "sec":"#573589"
      }
    },
  },
  plugins: [],
}
