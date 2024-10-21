/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "custom-bounce": "custom-bounce 1s infinite",
        wiper: "wipe 3s ease-in-out infinite",
      },
      keyframes: {
        wipe: {
          "0%": { transform: "translateX(-100%) rotate(45deg)" },
          "33.33%": { transform: "translateX(100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) rotate(45deg)" },
        },
      },
      fontFamily: {
        custom: ["Custom", "sas-serif"],
      },
    },
  },
  plugins: [],
};
