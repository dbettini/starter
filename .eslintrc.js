module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    sourceType: "script",
    ecmaVersion: 9,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [
      "error",
      "double",
    ],
    strict: [
      "error",
      "global",
    ],
    // "object-curly-newline": ["error", { "multiline": true }]
  },
};
