const animate = require("tailwindcss-animate");
const forms = require("@tailwindcss/forms");
const typography = require("@tailwindcss/typography");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif', "Noto Color Emoji"],
    },
    extend: {
      colors: {
        'primary': withOpacity('--color-primary'),
        'primary-border': withOpacity('--color-primary-border'),
        'primary-hover': withOpacity('--color-primary-hover'),
      }
    },
  },
  plugins: [animate, forms, typography],
};