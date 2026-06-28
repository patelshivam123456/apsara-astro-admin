/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./hooks/**/*.{js,jsx}", "./utils/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#05070f",
        night: "#090b14",
        gold: {
          50: "#fff8df",
          100: "#fcebb6",
          300: "#efc567",
          500: "#d39a2a",
          700: "#9a6418"
        }
      },
      boxShadow: {
        glow: "0 20px 80px rgba(211, 154, 42, 0.18)",
        soft: "0 18px 48px rgba(2, 6, 23, 0.12)"
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fff2ba 0%, #d39a2a 45%, #8f5512 100%)",
        "panel-dark": "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))"
      }
    }
  },
  plugins: []
};
