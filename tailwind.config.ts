import type { Config } from "tailwindcss";

export default <Config>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        averta: [
          "Averta Std",
          "-apple-system",
          "Roboto",
          "Helvetica",
          "sans-serif",
        ],
        karla: ["Karla", "-apple-system", "Roboto", "Helvetica", "sans-serif"],
      },
      colors: {
        "iconscout-blue": "#0092E4",
        "iconscout-dark": "#2E334C",
        "iconscout-gray": "#5A607D",
        "iconscout-light-gray": "#FAFAFC",
        "iconscout-border": "#EBEDF5",
      },
      spacing: {
        "18": "4.5rem",
        "21": "5.25rem",
      },
    },
  },
  plugins: [],
};
