module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  plugins: [
    "prefer-let"
  ],
  rules: {
    "prefer-let/prefer-let": 2
  }
};
