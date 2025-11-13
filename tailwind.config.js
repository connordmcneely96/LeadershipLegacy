/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from Inner Animals Logo
        brand: {
          cyan: {
            light: '#00D4FF',
            DEFAULT: '#00B8E6',
            dark: '#0096C7',
          },
          blue: {
            electric: '#0077FF',
          },
        },
        // Neural/Tech Palette
        neural: {
          dark: '#0A0E1A',
          slate: '#1E2538',
          gray: '#2D3548',
        },
        circuit: {
          silver: '#8B95A8',
          white: '#E8ECEF',
        },
        // Glow Colors
        glow: {
          cyan: '#00F0FF',
          blue: '#0088FF',
        },
        // Semantic Colors
        success: '#00FFB8',
        warning: '#FFB800',
        error: '#FF4466',
        info: '#00B8E6',
      },
      fontFamily: {
        display: ['Inter', 'SF Pro Display', '-apple-system', 'system-ui', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 119, 255, 0.3)',
        'glow-blue-lg': '0 0 40px rgba(0, 119, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
