import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
      },
      animation: {
        "fade-up":     "fadeUp 0.6s ease-out forwards",
        "float":       "float 6s ease-in-out infinite",
        "float-slow":  "float 9s ease-in-out infinite",
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
        "spin-slow":   "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(34,197,94,0)" },
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 70%, #15803d 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,253,244,0.9) 100%)",
      },
      boxShadow: {
        "card":   "0 4px 24px -4px rgba(21, 128, 61, 0.12), 0 2px 8px -2px rgba(21,128,61,0.08)",
        "card-hover": "0 16px 40px -8px rgba(21, 128, 61, 0.22), 0 4px 16px -4px rgba(21,128,61,0.14)",
        "result": "0 24px 60px -12px rgba(21, 128, 61, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
