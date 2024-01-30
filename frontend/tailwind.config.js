/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F8FAFC', // Example primary color
        secondary: '#6574cd', // Example secondary color
        accent: '#ff9900', // Example accent color
        background: '#f8f9fa', // Example background color
        text1: '#727374', // Example text color
      },
      fontFamily: {
        'standard': ['Inter', 'sans-serif'], // CustomFont1 with fallback to sans-serif
      },

    },
  },
  plugins: [],
};
