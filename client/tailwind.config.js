/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        rd: "725px",
        // md: "840px",
        // lg: "1000px",
      },
    },
  },
  plugins: [], 
  important: true,
};
