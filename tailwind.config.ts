import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      Marineblue: "#02295a",
      Purplishblue: "#473dff",
      Pastelblue: "#adbeff",
      Lightblue: "#bfe2fd",
      Strawberryred: "#ed3548",
      Coolgray: "#9699ab",
      Lightgray: "#d6d9e6",
      Magnolia: "#f0f6ff",
      Alabaster: "#fafbff",
      White: "#ffffff",
    },
  },
  plugins: [],
};
export default config;
