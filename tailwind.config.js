/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      "cyberpunk",
      "synthwave",
      "lemonade",
      "retro",
      "dark",
      "night",
      "forest",
      "luxury",
    ],
  },
  plugins: [require("daisyui")],
}

