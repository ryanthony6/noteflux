/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      // padding: "16px",
    },
    extend: {
      colors: {
        primary: "#020D19",
        secondary: "#f4f5f4",
        light: "#fdfeff",
      },
    },
  },
  plugins: [],
};
