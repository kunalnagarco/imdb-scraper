module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: true,
    mocha: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-unused-expressions": "off",
    indent: ['error', 4]
  },
};
