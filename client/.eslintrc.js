/* eslint-disable */
const { resolve } = require('path');

module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: '/Users/miladdehghansh/Projects/bitpanda-interview-milad/client/tsconfig.json',
    tsconfigRootDir: '/Users/miladdehghansh/Projects/bitpanda-interview-milad/client',
    ecmaVersion: 2018,
    sourceType: 'module',
    createDefaultProgram: true
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '@vue/typescript',
    'plugin:vue/vue3-essential',
    'airbnb-base'
  ],
  rules: {
    'import/no-unresolved': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'import/order': ['error', {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
      groups: [
        'builtin',
        'external',
        'unknown',
        'internal',
        ['parent', 'sibling'],
        'index',
      ],
      'newlines-between': 'always',
      pathGroups: [
        {
          group: 'internal',
          pattern: '@/**',
        },
        {
          group: 'internal',
          pattern: '@components/**',
        },
      ],
      pathGroupsExcludedImportTypes: [],
    }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'export', 'if'],
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'export'],
        prev: ['const', 'let', 'export'],
      },
    ],
    quotes: ['error', 'single'],
  },

};
