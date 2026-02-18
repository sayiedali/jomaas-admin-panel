/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "p-red": "#AE1217",
        "p-blue": "#005B89",
        "p-yellow": "#FCB900",
        "p-border": "#8989896a",
        "p-brown":"#61443E",
        "d-yellow":"#CE9700",
        "footer-white":"#eeeeee"
      },
    },
  },
  plugins: [],
}
