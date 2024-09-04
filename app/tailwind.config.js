/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include Angular's HTML and TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // Add DaisyUI as a plugin
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add themes you want to support
  },
};
