/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        man: ['"Manrope"', "sans-serif"],
        nun: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
}

