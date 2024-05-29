/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./backend/**/*.{html,ts,tsx}", "./frontend/**/*.{html,ts,tsx}", "./common/**/*.{html,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}

