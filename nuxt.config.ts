// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },
  runtimeConfig: {
    public: {
      // Override via NUXT_PUBLIC_API_BASE di .env
      apiBase: 'http://localhost:8080',
    },
  },
})