// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content'],

  css: ['~/assets/css/main.css'],

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  // Site metadata for SEO (used by nuxt-seo-utils / sitemap if added later)
  site: {
    url: 'https://bbsconveyor.com',
    name: 'BBS Conveyor',
    description: 'CV Bintang Berjaya Satu — Solusi Belt & Roller Conveyor Industri',
    defaultLocale: 'id',
  },

  // Static generation friendly
  nitro: {
    prerender: {
      routes: [
        '/',
        '/produk/belt-conveyor',
        '/produk/lainnya',
        '/jasa',
        '/artikel',
        '/tentang-kami',
        '/kontak',
        '/galeri',
      ],
    },
  },
})
