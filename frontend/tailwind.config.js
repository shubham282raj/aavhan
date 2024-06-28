/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "custom-bounce": "custom-bounce 1s infinite",
      },
    },
  },
  plugins: [],
};
