const path = require('node:path');

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    /**
     * @see https://github.com/tailwindlabs/tailwindcss/issues/6393#issuecomment-1080723375
     */
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
