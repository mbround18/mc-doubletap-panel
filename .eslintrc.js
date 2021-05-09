module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:vue/essential", "standard"],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["prettier", "vue", "@typescript-eslint"],
  rules: {
    semi: 2,
    "no-useless-constructor": "off",
    quotes: ["error", "double"]
  }
};
