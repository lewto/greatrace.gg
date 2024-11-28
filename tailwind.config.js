/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'speed-lines': 'speed-lines 3s linear infinite',
        'gg-racing': 'gg-racing 2s ease-in-out',
        'trail': 'trail 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '0.5',
            boxShadow: '0 0 20px rgba(255, 24, 1, 0.2)'
          },
          '50%': { 
            opacity: '1',
            boxShadow: '0 0 40px rgba(255, 24, 1, 0.4)'
          },
        },
        'speed-lines': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'gg-racing': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '25%': { transform: 'translateX(100px)', opacity: '0' },
          '26%': { transform: 'translateX(-100px)', opacity: '0' },
          '50%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'trail': {
          '0%': { transform: 'scaleX(0)', opacity: '1' },
          '100%': { transform: 'scaleX(1)', opacity: '0' },
        },
      }
    },
  },
  plugins: [],
};