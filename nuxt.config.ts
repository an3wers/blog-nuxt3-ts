// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.scss"],
  modules: [
    "@pinia/nuxt",
    "nuxt-lodash",
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  runtimeConfig: {
    authKey: process.env.AUTH_KEY,
  },
});
