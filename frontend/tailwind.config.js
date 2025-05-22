/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '4px',
      },
      colors: {
        background: '#f8f5f0',
        primary: '#4d3a2c',
        secondary: '#6b705c',
        accent: '#4b5563',
        muted: '#a0a09f',
      },
    },
  },
  plugins: [],

}

