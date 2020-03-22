module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  rules: {
    'default-case': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-duplicate-imports': 'error',
    'no-lonely-if': 'error',
    'no-magic-numbers': 'off',
    // Disabled because this flags styled-components multiline template literals
    'no-unexpected-multiline': 'off',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: 'return',
        prev: '*',
      },
      {
        blankLine: 'always',
        next: 'block-like',
        prev: '*',
      },
      {
        blankLine: 'always',
        next: '*',
        prev: 'block-like',
      },
      {
        blankLine: 'always',
        next: 'break',
        prev: '*',
      },
      {
        blankLine: 'always',
        next: 'continue',
        prev: '*',
      },
    ],
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
      },
    ],
    'prefer-destructuring': 'error',
    'prefer-const': 'warn',
    'prefer-object-spread': 'error',
    'prefer-rest-params': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    'sort-keys': 'off',
    'sort-vars': 'error',
    yoda: 'error',
  },
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
}
