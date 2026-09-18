/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#eb510e',
          blue: '#213d83',
          darkBg: '#090d16',
          slateCard: '#111726',
        },
        pageBg: '#F8FAFC',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Times New Roman"', 'Georgia', 'serif'],
      },
      animation: {
        'stroke-draw': 'strokeDraw 2.5s cubic-bezier(0.058, 0.919, 0.184, 0.999) both',
        'fade-in': 'fadeIn 1s ease-out both',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        strokeDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
