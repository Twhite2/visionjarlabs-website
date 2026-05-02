/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef6fe',
          100: '#d9ecfd',
          200: '#bce0fa',
          300: '#8ecdf7',
          400: '#5ab3f2',
          500: '#47a2f5',
          600: '#2b86e0',
          700: '#226bc4',
          800: '#2156a0',
          900: '#1e4885',
          950: '#142e57',
        },
        secondary: {
          50: '#eef6fe',
          100: '#d9ecfd',
          200: '#bce0fa',
          300: '#8ecdf7',
          400: '#5ab3f2',
          500: '#47a2f5',
          600: '#2b86e0',
          700: '#226bc4',
          800: '#2156a0',
          900: '#1e4885',
          950: '#142e57',
        },
        surface: {
          50: '#fdfdfb',
          100: '#f6f6f3',
          200: '#e9e9e3',
          300: '#d7d7cd',
          400: '#bbbbac',
          500: '#a1a191',
          600: '#878778',
          700: '#6c6c5f',
          800: '#58584d',
          900: '#494941',
          950: '#02162f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
