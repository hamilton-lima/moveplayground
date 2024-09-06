/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include Angular's HTML and TypeScript files
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ["1rem", "1.5rem"], // 0.75rem * 2
        sm: ["1.125rem", "1.75rem"], // 0.875rem * 2
        base: ["1.25rem", "1.75rem"], // 1rem * 2
        lg: ["1.5rem", "2rem"], // 1.125rem * 2
        xl: ["2rem", "2.5rem"], // 1.25rem * 2
        "2xl": ["2.5rem", "3rem"], // 1.5rem * 2
        "3xl": ["3rem", "3.5rem"], // 1.875rem * 2
        "4xl": ["3.5rem", "4rem"], // 2.25rem * 2
        "5xl": ["4.5rem", "1"], // 3rem * 2
        "6xl": ["5.25rem", "1"], // 3.75rem * 2
        "7xl": ["6rem", "1"], // 4.5rem * 2
      },
    },
  },
  plugins: [
    require("daisyui"), // Add DaisyUI as a plugin
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add themes you want to support
  },
};

