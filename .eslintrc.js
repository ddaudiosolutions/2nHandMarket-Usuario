module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'standard',
    'eslint-config-prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    indent: 'off',
    semi: ['error', 'always'],
    'max-len': [
      1,
      {
        code: 100,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
      },
    ],
    camelcase: [
      'warn',
      {
        allow: [],
        ignoreDestructuring: true,
        ignoreImports: true,
        ignoreGlobals: true,
      },
    ],
    'no-var': 'warn',
    'dot-notation': 'warn',
    'array-callback-return': 'warn',
    'prefer-promise-reject-errors': 'warn',
    eqeqeq: ['error', 'always'],
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'warn',
  },
};
