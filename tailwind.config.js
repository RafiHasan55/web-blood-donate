// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "synthwave"], // যতো theme চাই দাও
    darkTheme: "dark", // default dark theme
  },
};
