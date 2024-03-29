module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ["@stylistic/js"],
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // indent: ["error", 2],
    // "linebreak-style": ["error", "windows"],
    // quotes: ["error", "double"],
    // semi: ["error", "always"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/linebreak-style": ["error", "windows"],
    "@stylistic/js/quotes": ["error", "double"],
    "@stylistic/js/semi": ["error", "always"],
    "no-console": 0,
  },
};
