module.exports = {
  env: {
    browser: true,
  },
  extends: [
    '../.eslintrc.js',
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules:{
    quotes: [
      "error",
      "double",
    ],
  },
};
