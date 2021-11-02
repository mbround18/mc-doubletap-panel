const { merge } = require("lodash");
require("dotenv").config();
const { discord } = require("./config/auth/strategies/discord");
const nuxtConfig = {
  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  ssr: true,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Minecraft GraphQL Panel",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/toasted.client.ts"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "@nuxtjs/auth",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
  ],

  vuetify: {
    theme: {
      dark: true,
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},
  auth: {
    vuex: {
      namespace: "auth",
    },
    redirect: {
      login: "/",
      logout: "/",
      callback: "/auth/invoke",
    },
    strategies: {
      local: false,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, ctx) {
      config.module.rules = config.module.rules.filter((rule) => {
        return !rule.test.test("derp.mjsx");
      });
      config.module.rules.unshift({
        test: /\.(m?[tj]sx?)$/i,
        exclude: /(node_modules)/,
        use: "swc-loader",
      });
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"),
      });
    },
  },
};
export default merge(
  nuxtConfig,
  {
    auth: {
      strategies: {
        discord,
      },
    },
  },
  {
    env: {
      ENDPOINT_URL: process.env.ENDPOINT_URL,
    },
  }
);
