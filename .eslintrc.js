module.exports = {
  parserOptions: {
    project: './tsconfig.json'
  },
  extends: [
    'xo',
    'xo-typescript',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ]
}
