/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      customGray: 'rgb(0, 245, 245)',
      boxShadow: {
        'custom-light': '0 0px 5px rgba(219, 219, 219)',
        'custom-heavy': '0 0px 15px rgba(0, 0, 0)'
      },
    },
  },
  plugins: [],
}