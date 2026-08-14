type MaybeGetter<T> = T | (() => T)

export interface SeoInput {
  /** Page title WITHOUT the site suffix — @nuxtjs/seo appends that itself. */
  title: MaybeGetter<string | null | undefined>
  description: MaybeGetter<string | null | undefined>
  /** Path or absolute URL. Falls back to the site OG image. */
  image?: MaybeGetter<string | null | undefined>
  type?: 'website' | 'article'
}

// The only OG asset in public/. A relative og:image is the most common reason a
// share preview renders blank, so everything below is absolutised.
const DEFAULT_OG_IMAGE = '/images/og-home.webp'

function read<T>(v: MaybeGetter<T>): T {
  return typeof v === 'function' ? (v as () => T)() : v
}

function clean(v: string | null | undefined): string {
  return (v ?? '').trim()
}

/**
 * Page meta for the public surface.
 *
 * This exists for one reason above the others: `useSeoMeta` captures plain
 * values at setup time, and four pages were passing values derived from
 * `useAsyncData`. On a fresh SSR load the fetch has already awaited so the tag
 * is right, but on client-side navigation between two products (or two
 * articles, or two categories) `setup` re-runs and returns *before* the new
 * fetch resolves — so the title and description stayed on the previous page's
 * values. pages/jasa/[slug].vue was the only one passing getters.
 *
 * So every field is handed to `useSeoMeta` as a getter here, including the
 * static ones. A getter over a constant costs nothing and removes the whole
 * class of bug rather than the four instances of it that exist today.
 */
export function useSeo(input: SeoInput) {
  const site = useSiteConfig()

  // Read once in setup — see components/shared/Breadcrumb.vue for why the
  // useSiteConfig() values are captured rather than read inside the getters.
  const origin = String(site.url ?? '').replace(/\/$/, '')
  const siteName = clean(site.name) || 'BBS Conveyor'
  const siteDescription = clean(site.description)

  const absolute = (path: string) =>
    /^https?:\/\//.test(path) ? path : `${origin}${path.startsWith('/') ? path : `/${path}`}`

  // An empty description is worse than none: produk/[slug].vue passed
  // `description ?? ''`, which shipped content="" for any product whose
  // description was blank in the admin panel.
  const title = () => clean(read(input.title)) || siteName
  const description = () => clean(read(input.description)) || siteDescription
  const image = () => absolute(clean(read(input.image ?? null)) || DEFAULT_OG_IMAGE)

  useSeoMeta({
    title,
    description,

    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: () => input.type ?? 'website',

    // Only 2 of the 13 original call sites set any twitter tag.
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })

  // Deliberately not setting ogUrl or canonical: @nuxtjs/seo's
  // automaticDefaults already emits both from site.url + site.trailingSlash,
  // and a second source of truth for the page's own URL is exactly what the
  // trailing-slash cleanup is trying to avoid.
}
