/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 important for toggle
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // optional but nice to have
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
