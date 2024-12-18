/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // Include TypeScript and HTML files if needed
  theme: {
    extend: {
      screens: {}, // You can define custom breakpoints here if needed
      fontFamily: {
        inter: ['Inter var', 'sans-serif'],
      },
      boxShadow: {
        card: '0 0 1px 0 rgba(189,192,207,0.06), 0 10px 16px -1px rgba(189,192,207,0.2)',
        cardhover: '0 0 1px 0 rgba(189,192,207,0.06), 0 10px 16px -1px rgba(189,192,207,0.4)',
      },
    },
  },
  plugins: [],
};
