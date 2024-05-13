/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./public/profile.html", "./public/main.html", "./public/signup.html", "./public/login.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

