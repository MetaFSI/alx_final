/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',  "./node_modules/flowbite/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: { 
    }
  },
  plugins: [
     require('tailwindcss-animated'),require('flowbite/plugin')

],
};
