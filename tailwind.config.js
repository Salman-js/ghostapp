module.exports = {
  content: [
    './src/Screens/**/*.{js,ts,jsx,tsx}',
    './src/Components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
      },
      colors: {
        'regal-darker': '#271b2d',
        'regal-dark': '#202427',
      },
    },
  },
  plugins: [],
};
