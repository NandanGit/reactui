/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '!./src/stories/**/*.{js,ts,jsx,tsx}', // Comment in development and uncomment in production
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
        secondary: colors.teal,
        success: colors.green,
        warning: colors.yellow,
        danger: colors.red,
        info: colors.sky,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
