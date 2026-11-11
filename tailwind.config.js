/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        coffee: {
          DEFAULT: "#4e2a15",
          soft: "#765137",
        },
        green: {
          DEFAULT: "#769f1a",
          deep: "#4f7d16",
          soft: "#edf6df",
        },
        gold: "#f2b84b",
        sky: "#dff3f7",
        ink: "#1f2933",
        muted: "#667085",
        line: "#e8e1d9",
        surface: "#ffffff",
        page: "#f7f4ef",
        danger: "#b42318",
        warning: "#b7791f",
      },
      fontFamily: {
        sans: ["Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        panel: "0 14px 32px rgba(78, 42, 21, 0.07)",
        hero: "0 18px 40px rgba(78, 42, 21, 0.18)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
  },
  plugins: [],
};
