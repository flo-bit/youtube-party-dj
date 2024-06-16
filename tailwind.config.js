import colors from 'tailwindcss/colors';


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./backend/**/*.{html,ts,tsx}", "./frontend/**/*.{html,ts,tsx}", "./common/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: colors.rose,
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

