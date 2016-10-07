module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true
  },
  plugins: [
    "prefer-let"
  ],
  rules: {
    "prefer-let/prefer-let": 2
  }
};
