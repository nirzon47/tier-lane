/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            sans: ['Lato', 'sans-serif'],
            zhun: ['ZhunYuan', 'sans-serif'],
         },
         keyframes: {
            wiggle: {
               '0%, 100%': { transform: 'rotate(-3deg)' },
               '50%': { transform: 'rotate(3deg)' },
            },
         },
         animation: {
            wiggle: 'wiggle 0.3s ease-in-out infinite',
         },
      },
   },
   plugins: [require('tailwindcss-animate')],
}
