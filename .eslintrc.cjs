/**
 * @see https://github.com/import-js/eslint-plugin-import/issues/1174
 */
const path = require('node:path');
const fs = require('node:fs');

const PACKAGES_DIR = 'packages';
const APPS_DIR = 'apps';
const WORKSPACES = [APPS_DIR, PACKAGES_DIR];

/**
 *
 * @param {string} dir
 * @returns {string}
 */
const getAbsPath = (dir) => path.resolve(__dirname, dir);

/**
 *
 * @param {string} dir
 * @returns {string[]}
 */
const getFolders = (dir) =>
  fs
    .readdirSync(dir)
    .filter(
      (entry) =>
        entry.substring(0, 1) !== '.' && fs.lstatSync(path.resolve(dir, entry)).isDirectory(),
    );

const importResolvers = WORKSPACES.map(getAbsPath)
  .map((dir) => getFolders(dir).map((folder) => path.resolve(dir, folder, 'tsconfig.json')))
  .flat();

const importExtraneousDirs = WORKSPACES.map(getAbsPath)
  .map((dir) => getFolders(dir).map((folder) => path.resolve(dir, folder)))
  .flat();

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },

    'import/resolver': {
      typescript: {
        /**
         * @see https://github.com/import-js/eslint-plugin-import/issues/2301
         */
        project: ['tsconfig.json', ...importResolvers],
      },
    },
  },
  rules: {
    indent: 'off',
    'no-restricted-exports': 'off',
    /* @typescript-eslint */
    '@typescript-eslint/indent': 'off',
    /* import */
    'import/extensions': 'off',
    /* react-hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    /* react */
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    /**
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
     * @see https://github.com/airbnb/javascript/blob/f0df3a8680479ff0b897cd98a1eab6b156899214/packages/eslint-config-airbnb-base/rules/imports.js#L72-L95
     */
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [__dirname, ...importExtraneousDirs],
        devDependencies: true,
      },
    ],

    'prettier/prettier': ['error', { singleQuote: true }],
  },
  overrides: [
    {
      files: [
        'config/**',
        '.eslintrc.cjs',
        'jest.config.ts',
        'postcss.config.js',
        'tailwind.config.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
      },
    },
  ],
};
