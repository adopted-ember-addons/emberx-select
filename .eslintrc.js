module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: ['eslint:recommended'],
  env: {
    browser: true
  },
  plugins: [
    'ember',
    "prefer-let"
  ],
  rules: {
    "ember/no-jquery": 2,
    "prefer-let/prefer-let": 2
  }
};
