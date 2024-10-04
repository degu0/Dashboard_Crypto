/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { Cairo: ["Cairo", "sans-serif"] },
      colors: { "container-dark": "#0e0e11", "bg-dark": "#141318" },
    },
  },
  plugins: [],
  darkMode: "class",
};
