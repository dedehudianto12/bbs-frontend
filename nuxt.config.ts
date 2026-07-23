// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Nuxt 4 defaults srcDir to `app/`; keep the existing flat root layout
  // (pages/, components/, layouts/, assets/, app.vue all live at the root)
  // so the `~`/`@` aliases resolve to the project root as they did on Nuxt 3.
  srcDir: '.',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/content', '@nuxtjs/seo', 'v-gsap-nuxt'],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  // ── Site identity (digunakan oleh semua sub-module SEO) ──
  site: {
    url: 'https://bbsconveyor.com',
    name: 'BBS Conveyor',
    description: 'CV Bintang Berjaya Satu — Solusi Belt & Roller Conveyor Industri',
    defaultLocale: 'id',
  },

  // ── OG Image auto-generate ──
  ogImage: {
    enabled: false, // ponytail: disabled — nuxt-og-image@6.7.4 crashes (originalName.split is not a function)
  },

  // ── Sitemap ──
  sitemap: {
    autoLastmod: true,
    sources: [
      '/__sitemap__/urls',
    ],
    credits: false,
  },

  // ── Robots ──
  robots: {
    enabled: true,
    credits: false,
    groups: [
      { userAgent: '*', allow: ['/'] },
    ],
  },

  // ── Schema.org JSON-LD ──
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'CV Bintang Berjaya Satu',
      alternateName: 'BBS Conveyor',
      description: 'Supplier belt conveyor, roller, dan komponen industri terpercaya di Indonesia.',
      url: 'https://bbsconveyor.com',
      logo: '/logo.png',
      sameAs: [
        'https://wa.me/6281234567890',
      ],
      contactPoint: {
        contactType: 'Sales',
        telephone: '+6281234567890',
        email: 'info@bbsconveyor.com',
      },
      address: {
        addressLocality: 'Jakarta Timur',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
        streetAddress: 'Jl. Industri Raya No. 123, Kawasan Industri Pulogadung',
      },
    },
  },

  // ── SEO utils (canonical, i18n, etc.) ──
  seo: {
    fallbackTitle: true,
    automaticDefaults: true,
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