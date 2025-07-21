/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#39509A',
          50: '#F4F7FC',
          100: '#E9EFF9',
          200: '#D3DFF3',
          300: '#BDCFED',
          400: '#A7BFE7',
          500: '#39509A',
          600: '#2D407B',
          700: '#21305C',
          800: '#16203D',
          900: '#0A101E',
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: 'hsl(var(--background-dark))',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          dark: 'hsl(var(--foreground-dark))',
        },
      },
    },
  },
  plugins: [],
} 