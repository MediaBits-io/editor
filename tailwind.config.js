const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    mode: 'layers',
    enabled: process.env.TAILWIND_ENV === 'production',
    content: [
      './client/public/**/*.html',
      './client/**/*.ts',
      './client/**/*.tsx',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
