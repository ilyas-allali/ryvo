import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#FAFAF7",
          secondary: "#F3F1EB",
          card: "#FFFFFF",
          dark: "#0D1E15",
        },
        primary: {
          DEFAULT: "#2A5240",
          light: "#3D6B54",
          dark: "#1C3A2B",
          glow: "rgba(42,82,64,0.18)",
        },
        accent: {
          DEFAULT: "#B8935A",
          light: "#D4AF7A",
          glow: "rgba(184,147,90,0.2)",
        },
        brand: {
          border: "rgba(42,82,64,0.1)",
          "border-hover": "rgba(42,82,64,0.25)",
          muted: "#8A9E97",
          secondary: "#4A5E56",
          text: "#1A2B24",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        "blink": "blink 1s step-end infinite",
        "scan": "scan 3s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern": "radial-gradient(circle, rgba(42,82,64,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "48px 48px",
      },
      boxShadow: {
        "glow-primary": "0 0 40px rgba(42,82,64,0.2), 0 0 80px rgba(42,82,64,0.08)",
        "glow-accent": "0 0 32px rgba(184,147,90,0.25)",
        "card": "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        "card-hover": "0 16px 56px rgba(0,0,0,0.1), 0 4px 16px rgba(42,82,64,0.08)",
        "elevated": "0 24px 64px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)",
        "input": "0 0 0 3px rgba(42,82,64,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
