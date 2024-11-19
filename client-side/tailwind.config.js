/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        rustOrange: '#D84315',
        burntYellow: '#FFB300',
        softCream: '#FFF8E1',
        oliveGreen: '#8BC34A',
        hoverBurntYellow: '#E69A00',
      },
        screens: {
          xs: '475px',
        },
      animation: {
        shimmer: 'shimmer 5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
