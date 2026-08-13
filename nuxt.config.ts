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

// ── Which domain this build belongs to ──────────────────────────────────────
//
// This drives the canonical tag, og:url, the sitemap's <loc> entries and the
// Sitemap: line in robots.txt — so deploying this same bundle to a second
// domain without changing it publishes a site whose every page tells Google
// "do not index me, index the other domain instead". The pages would be
// crawled and then dropped, and nothing in the build output or the browser
// would look wrong.
//
// As of the bintangberjayasatu.com migration the Pages project serves BOTH
// bintangberjayasatu.com and the legacy bbsconveyor.com. One build can only
// declare one canonical origin, and it must be the new domain: that is what
// tells Google the two hosts are the same site and moves the existing ranking
// signals onto the new name instead of splitting them.
//
// Set NUXT_SITE_URL per Cloudflare Pages project if the old domain ever needs
// its own separately-indexed deployment.
const SITE_URL = process.env.NUXT_SITE_URL || "https://bintangberjayasatu.com";

if (isDeployableBuild) {
  // Echoed because the failure mode above is silent: the only way to catch a
  // build canonicalised to the wrong domain is to see which one it used.
  console.log(`[seo] canonical origin for this build: ${SITE_URL}`);
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
    // Motion for Vue — the Vue port of Framer Motion. Used in exactly one
    // place: the hero's four-frame sequence (components/home/HeroSection.vue).
    // Auto-imports <Motion> and tree-shakes to the features actually
    // referenced, so the copy reveals elsewhere on the page stay on the CSS
    // keyframes they were already tuned for rather than being rewritten to
    // justify the dependency.
    "motion-v/nuxt",
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
    url: SITE_URL,
    name: "BBS Conveyor",
    description:
      "CV Bintang Berjaya Satu — Solusi Belt & Roller Conveyor Industri",
    defaultLocale: "id",
    // Cloudflare Pages serves prerendered pages at the trailing-slash form and
    // 308s the bare path to it. The sitemap and the canonical tag were both
    // emitting the bare form, so every URL we submitted to Google was a
    // redirect, landing on a page whose canonical pointed back at the URL that
    // redirects. Declaring it here makes canonical, sitemap and hosting agree.
    trailingSlash: true,
    // The staging deployment served `index, follow` and an allow-all
    // robots.txt, so a preview build was a crawlable duplicate of the live
    // site. Setting NUXT_SITE_INDEXABLE=false on Cloudflare Pages' *preview*
    // environment flips @nuxtjs/robots to noindex/nofollow plus a Disallow-all
    // robots.txt for those builds only.
    //
    // This covers branch previews. It does NOT cover the project's own
    // *.pages.dev hostname, which serves the production build: that one has to
    // be handled in Cloudflare (restrict access to the pages.dev subdomain, or
    // put Access in front of it) because prerendered files are served straight
    // from the CDN and never reach the Worker where a host check could run.
    indexable: process.env.NUXT_SITE_INDEXABLE !== "false",
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
      // Follows the deployment. The @id references in the emitted graph are
      // built from this, so a hardcoded value on a second domain produces JSON-LD
      // that claims to describe a page on a host it is not served from.
      url: SITE_URL,
      logo: "/bbs-logo.svg",
      sameAs: ["https://wa.me/6287758161166"],
      contactPoint: {
        contactType: "Sales",
        telephone: "+6287758161166",
        email: "bbsconveyor@yahoo.com",
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
    // ── Pages whose content lives in the API are never prerendered ──────────
    //
    // /produk/belt-conveyor and /produk/lainnya used to be in the prerender
    // list below, so Cloudflare served a static HTML file built from whatever
    // the API returned at *deploy* time. A product added or edited in the admin
    // panel never appeared there — while /produk/belt-conveyor/pvc-belt, which
    // fetches the identical endpoint but rendered in the Worker, showed it
    // immediately. Same fetch, same data source; only the timing differed. That
    // asymmetry is what made it look like the listing page was reading from
    // somewhere else.
    //
    // Every route below renders per request in the Worker instead, so the
    // public site always matches the admin panel. It is still server-rendered
    // HTML — crawlers and the initial paint are unaffected, only TTFB moves
    // from CDN-static to a Worker round trip.
    //
    // Stated as route rules rather than only by shortening prerender.routes,
    // because the link crawler can reach a page on its own: whoever turns
    // crawlLinks back on must not be able to silently re-freeze these.
    "/": { prerender: false },
    "/produk/**": { prerender: false },
    "/artikel/**": { prerender: false },
    "/jasa/**": { prerender: false },
    "/galeri": { prerender: false },
    // The sitemap's URLs come from the API too (server/routes/__sitemap__/
    // urls.ts), so a prerendered sitemap lists the products that existed at the
    // last deploy and omits everything added since.
    "/sitemap.xml": { prerender: false },
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
      // Crawling existed to reach the product, article and service detail
      // pages, and those are precisely the pages that must no longer be frozen
      // at build time; the route rules above refuse them now, so all the
      // crawler can do is walk links that lead nowhere.
      //
      // It also decides the sitemap. @nuxtjs/sitemap hooks itself into the
      // prerender pass whenever prerender.routes is non-empty AND crawlLinks is
      // on, and writes a static dist/sitemap.xml. Since those URLs come from
      // the API (server/routes/__sitemap__/urls.ts), that would freeze the
      // product list all over again in the one file Google reads — and the
      // `/sitemap.xml` route rule above does not prevent it, the module
      // prerenders it through its own hook. Turning this off is what keeps the
      // sitemap generated per request, listing what the admin panel holds now.
      crawlLinks: false,
      ignore: ["/admin"],
      // The only two pages whose content is hardcoded in the repo. Everything
      // else reads the API and is served by the Worker.
      routes: ["/tentang-kami", "/kontak"],
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
