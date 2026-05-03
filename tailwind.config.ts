import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0b0f1a",
          soft: "#111827",
          card: "#161c2c",
          elevated: "#1c2538",
        },
        border: {
          DEFAULT: "#283044",
          soft: "#1f2738",
        },
        accent: {
          DEFAULT: "#7c5cff",
          soft: "#a78bfa",
          glow: "#5b8cff",
        },
        success: "#22c55e",
        danger: "#ef4444",
        warning: "#f59e0b",
        muted: "#94a3b8",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(124,92,255,0.4), 0 8px 24px -8px rgba(124,92,255,0.45)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
