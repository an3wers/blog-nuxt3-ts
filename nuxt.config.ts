// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/main.scss"],
  modules: [
    '@pinia/nuxt',
    // ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],
  runtimeConfig: {
    authKey: 'AIzaSyCcFderO-gm1_ki1Z1UhzpGfh0AXY9OKkw'
  }
});
