const path = require('node:path');
const tailwindcssForms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // content: ['./packages/cient/*.html', './packages/client/src/**/*.tsx'],
  /**
   * @see https://github.com/tailwindlabs/tailwindcss/issues/6393#issuecomment-1080723375
   */
  content: [path.join(__dirname, 'apps/**/*.html'), path.join(__dirname, 'apps/**/*.tsx')],
  plugins: [tailwindcssForms],
};
