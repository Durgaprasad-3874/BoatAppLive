/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        boat: {
          red: "#ff0000",
          crimson: "#d90429",
          dark: "#0b0c0e",
          surface: "#14161a",
          card: "#191c21",
          border: "#252932"
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
