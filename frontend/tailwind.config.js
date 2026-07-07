/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B58900', // Golden accent
          dark: '#916d00',
          light: '#fcf8e3',
        },
        brandgreen: {
          DEFAULT: '#2d6a4f', // Forest green
          dark: '#1b4332',
          light: '#d8f3dc',
        },
        whatsapp: '#25D366',
        charcoal: {
          light: '#374151',
          DEFAULT: '#1f2937',
          dark: '#111827',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
