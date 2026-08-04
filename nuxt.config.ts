// ── Security headers ────────────────────────────────────────────────────────
//
// The Go API already sets a full set of these on its own responses; the Nuxt
// app was sending none, so every page the browser actually renders was
// unprotected. Applied through routeRules so the cloudflare-pages preset writes
// them into dist/_headers.
//
// The CSP's connect-src is derived from NUXT_PUBLIC_API_BASE rather than
// hardcoded. A relative base ("/api") is same-origin and needs nothing extra;
// an absolute base needs its origin allowed or every fetch on the site is
// blocked. Getting this wrong takes the whole site down, which is why it is
// computed instead of guessed — but note it is resolved at BUILD time, so
// changing the API host requires a redeploy, not just an env edit.
const API_BASE = process.env.NUXT_PUBLIC_API_BASE || "/api";
const apiOrigin = (() => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return ""; // relative path — same-origin, covered by 'self'
  }
})();

// Because connect-src is resolved here, at build time, a deployable build that
// runs without NUXT_PUBLIC_API_BASE — or with a developer's localhost value —
// emits a CSP that blocks every API call the deployed site makes. The build
// itself succeeds and exits 0; the failure only appears in the browser, on
// every page at once, as empty skeletons with console errors. That is the worst
// possible place to discover it, so the build fails here instead.
//
// Gated on the *command*, not on NODE_ENV. `nuxt prepare` (which runs as
// postinstall) and `nuxt typecheck` both evaluate this file with NODE_ENV
// already set to "production", so keying off NODE_ENV alone made `npm install`
// fail on a fresh clone. Only `build` and `generate` produce a deployable
// artifact, and only they need to be strict.
//
// ALLOW_LOCALHOST_API=1 opts out, for deliberately building the production
// bundle against a local API to inspect the output.
const isDeployableBuild = process.argv.some(
  (a) => a === "build" || a === "generate",
);
if (isDeployableBuild && process.env.ALLOW_LOCALHOST_API !== "1") {
  if (!process.env.NUXT_PUBLIC_API_BASE) {
    throw new Error(
      "NUXT_PUBLIC_API_BASE is not set. A deployable build needs the absolute " +
        "API URL: it is baked into the CSP's connect-src, and without it every " +
        "request from the deployed site is blocked. Set it in the Cloudflare " +
        "Pages project's environment variables.",
    );
  }
  if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(API_BASE)) {
    throw new Error(
      `NUXT_PUBLIC_API_BASE points at localhost (${API_BASE}). That value would ` +
        "be compiled into the production CSP and the deployed site could not " +
        "reach its API. Set it to the public API URL, or set " +
        "ALLOW_LOCALHOST_API=1 if this build is only for local inspection.",
    );
  }
}

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required: Nuxt inlines the hydration payload as a
  // <script> block, and nothing here is user-controlled.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // blob: covers the admin's object-URL image previews; cartocdn is the Leaflet
  // basemap on the Kontak page; cloudinary is where uploaded images are served.
  "img-src 'self' data: blob: https://res.cloudinary.com https://*.basemaps.cartocdn.com https://www.google-analytics.com",
  `connect-src 'self' ${apiOrigin} https://www.google-analytics.com`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP,
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Kept in lockstep with compatibility_date in wrangler.toml — this one picks
  // which polyfills Nitro bundles, that one picks what the Worker runtime
  // provides. See the note there for why the date cannot go below 2025-09-15.
  compatibilityDate: "2025-09-15",
  // Nuxt 4 defaults srcDir to `app/`; keep the existing flat root layout
  // (pages/, components/, layouts/, assets/, app.vue all live at the root)
  // so the `~`/`@` aliases resolve to the project root as they did on Nuxt 3.
  srcDir: ".",
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      // Google Analytics is no longer injected here. `import.meta.env` is
      // resolved at *build* time, so the tag was baked into the bundle and a
      // deployment that set NUXT_PUBLIC_GA_ID as a runtime variable got no
      // analytics at all with nothing to indicate why. It now lives in
      // plugins/analytics.client.ts, which reads runtimeConfig at run time.
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/bbs-logo.svg" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
        },
      ],
    },
  },

  components: {
    dirs: [{ path: "~/components", pathPrefix: false }],
  },

  // ── Site identity (digunakan oleh semua sub-module SEO) ──
  site: {
    url: "https://bbsconveyor.com",
    name: "BBS Conveyor",
    description:
      "CV Bintang Berjaya Satu — Solusi Belt & Roller Conveyor Industri",
    defaultLocale: "id",
  },

  // ── OG Image auto-generate ──
  ogImage: {
    enabled: false, // disabled — nuxt-og-image@6.7.4 crashes (originalName.split is not a function)
  },

  // ── Sitemap ──
  sitemap: {
    autoLastmod: true,
    sources: ["/__sitemap__/urls"],
    credits: false,
  },

  // ── Robots ──
  // /admin was crawlable: the previous group allowed "/" with no exclusions and
  // public/_robots.txt carried a bare `Disallow:`, so the login page was a
  // candidate for indexing. The disallow here is belt; the `robots: false`
  // route rule below is braces (it emits X-Robots-Tag + a noindex meta tag,
  // which is what actually removes a page already in an index).
  robots: {
    enabled: true,
    credits: false,
    groups: [{ userAgent: "*", allow: ["/"], disallow: ["/admin"] }],
  },

  // ── Schema.org JSON-LD ──
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "CV Bintang Berjaya Satu",
      alternateName: "BBS Conveyor",
      description:
        "Supplier belt conveyor, roller, dan komponen industri terpercaya di Indonesia.",
      url: "https://bbsconveyor.com",
      logo: "/bbs-logo.svg",
      sameAs: ["https://wa.me/6281287859061"],
      contactPoint: {
        contactType: "Sales",
        telephone: "+6281287859061",
        email: "sales@bbsconveyor.com",
      },
      address: {
        addressLocality: "Jakarta Timur",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
        streetAddress: "Jl. Pulo Bangka, RT.1/RW.9, Pulo Gebang, Kec. Cakung",
      },
    },
  },

  // ── SEO utils (canonical, i18n, etc.) ──
  seo: {
    fallbackTitle: true,
    automaticDefaults: true,
  },

  routeRules: {
    // The admin panel is a private SPA. Rendering it on the server bought
    // nothing — the auth guard is client-only by necessity (the session cookie
    // is not readable during SSR), so every admin URL used to stream a full
    // dashboard shell to the browser and only then redirect to /login. Turning
    // SSR off removes that flash of admin UI and keeps the panel's markup off
    // the wire entirely for anyone who is not signed in.
    "/admin/**": {
      ssr: false,
      robots: false,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    },
    "/**": { headers: SECURITY_HEADERS },
  },

  // Static generation friendly
  nitro: {
    preset: "cloudflare-pages",
    // Stated explicitly as well as in wrangler.toml. Nitro infers this by
    // walking up for a wrangler config, and an inference that silently falls
    // back to "off" produces a worker that builds fine and then fails on a
    // Node built-in at request time. Declaring it removes the guesswork from
    // the build; wrangler.toml still carries the flag for Cloudflare itself.
    cloudflare: {
      nodeCompat: true,
    },
    // proxy /api → backend in dev (no CORS), production uses NUXT_PUBLIC_API_BASE
    devProxy: {
      '/api': { target: 'http://localhost:8080/api', changeOrigin: true },
    },
    prerender: {
      routes: [
        "/",
        "/produk/belt-conveyor",
        "/produk/lainnya",
        "/jasa",
        "/artikel",
        "/tentang-kami",
        "/kontak",
        "/galeri",
      ],
    },
  },

  // The four Cloudinary entries that used to live here are gone. Nothing in the
  // app ever read them — uploads go to the Go API as multipart form data and it
  // talks to Cloudinary server-side — and `cloudinaryApiKey` sat in the *public*
  // block, which ships to the browser in the hydration payload. An unused
  // credential in the client bundle is pure liability.
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
      gaId: process.env.NUXT_PUBLIC_GA_ID || "",
    },
  },
});
