module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // JavaScript rules
    'prefer-const': 'error',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // Ignore unused parameters prefixed with '_'
        varsIgnorePattern: '^_', // Ignore unused variables prefixed with '_'
        ignoreRestSiblings: true,
      },
    ],
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    // TypeScript rules
    '@typescript-eslint/array-type': [
      'warn',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    // React rules
    'react/jsx-fragments': ['warn', 'syntax'], // Shorthand syntax for React fragments
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['ts', 'tsx'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
