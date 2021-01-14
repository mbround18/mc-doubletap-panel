const {merge} = require('lodash');
require('dotenv').config();
const {discord} = require('./config/auth/strategies/discord');
const nuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'mc-graphql-admin',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
    script: []
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/toasted.client.ts'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/vuetify'
  ],

  vuetify: {
    theme: {
      dark: true
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  auth: {
    vuex: {
      namespace: 'auth'
    },
    redirect: {
      callback: '/auth/invoke'
    },
    strategies: {
      local: false
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
export default merge(
  nuxtConfig,
  {
    auth: {
      strategies: {
        discord
      }
    }
  },
  {
    env: {
      ENDPOINT_URL: process.env.ENDPOINT_URL
    }
  }
);
