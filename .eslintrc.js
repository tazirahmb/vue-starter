module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/error',
    'plugin:import/warning',
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  plugins: ['vue', 'jest', 'sonar-js', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: true,
    jest: true,
  },
  // rules: {},
  // overrides: {},
  // global: {},
};
