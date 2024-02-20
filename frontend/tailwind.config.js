/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F8FAFC", // Example primary color
        secondary: "#6574cd", // Example secondary color
        accent: "#ff9900", // Example accent color
        background: "#f8f9fa", // Example background color
        text1: "#727374", // Example text color
        text2: "#6B7B90", // Example text color
        text3: "#E2E8F0", // Example text color

        TurqouiseBlue: "#00789E", // Turqouise Blue - Also Secondary Text Color for popout effect
        DarkGrey: "#334155", // Dark Grey - Also Main Text Color
        LightBlue: "#EDFFFF", // Light Blue
        LightGrey: "#F8FAFC", // Light Grey
        White: "#FFFFFF", // White
        InputBox: "#F8F8F8", // Input Box background
        Selected: "#EDFFFF", // Use this for focus element if something is clicked
      },
      fontFamily: {
        standard: ["Inter", "sans-serif"], // CustomFont1 with fallback to sans-serif
      },
      fontSize: {
        27: "27px",
        16: "16px",
        14: "14px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
