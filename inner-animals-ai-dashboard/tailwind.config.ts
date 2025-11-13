import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from Logo
        brand: {
          cyan: {
            light: "#00D4FF",
            DEFAULT: "#00B8E6",
            dark: "#0096C7",
          },
          blue: {
            electric: "#0077FF",
          },
        },
        // Neural/Tech Palette
        neural: {
          dark: "#0A0E1A",
          slate: "#1E2538",
          gray: "#2D3548",
        },
        circuit: {
          silver: "#8B95A8",
          white: "#E8ECEF",
        },
        // Glow Colors
        glow: {
          cyan: "#00F0FF",
          blue: "#0088FF",
        },
        // Semantic Colors
        success: "#00FFB8",
        warning: "#FFB800",
        error: "#FF4466",
        info: "#00B8E6",
        // Default shadcn colors (keeping for compatibility)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["Inter", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
        body: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",      // 12px
        sm: "0.875rem",     // 14px
        base: "1rem",       // 16px
        lg: "1.125rem",     // 18px
        xl: "1.25rem",      // 20px
        "2xl": "1.5rem",    // 24px
        "3xl": "1.875rem",  // 30px
        "4xl": "2.25rem",   // 36px
        "5xl": "3rem",      // 48px
        "6xl": "3.75rem",   // 60px
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-cyan-lg": "0 0 40px rgba(0, 212, 255, 0.5)",
        "glow-blue": "0 0 20px rgba(0, 119, 255, 0.3)",
        "glow-blue-lg": "0 0 40px rgba(0, 119, 255, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
