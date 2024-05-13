/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./public/profile.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

