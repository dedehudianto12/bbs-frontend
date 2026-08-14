// `defineSitemapEventHandler` is registered as a server auto-import by
// @nuxtjs/sitemap. Importing it explicitly from '#imports' typechecked as a
// missing export because the module registers it directly rather than
// re-exporting it there; the auto-import resolves at build time.

import { categorySlug } from '~/utils/slug'

// sitemap URLs from backend API
export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string

  async function fetchAll(path: string) {
    try {
      const res = await $fetch<{ data: any[]; error: string | null }>(`${baseURL}${path}`)
      return res.data ?? []
    } catch {
      return []
    }
  }

  // Industries are deliberately not fetched: they have no detail route, so
  // every /industries/:slug URL this used to emit was a 404 in the sitemap.
  const [products, articles, services] = await Promise.all([
    fetchAll('/produk'),
    fetchAll('/artikel'),
    fetchAll('/jasa'),
  ])

  const urls: { loc: string; lastmod?: string }[] = []

  // Listing pages, pushed explicitly rather than left to @nuxtjs/sitemap's
  // route discovery. Discovery's prerender-hook path is off by design here
  // (nitro.prerender.crawlLinks is false and /sitemap.xml is itself
  // prerender:false), which leaves only the static pages/ scan — and relying
  // on that to cover the routes an SEO audit specifically flagged as missing
  // is a bet with no upside. Output is deduplicated, so an explicit push costs
  // nothing if discovery already found them.
  //
  // No lastmod: autoLastmod is on, and inventing a modification date for a
  // listing page is worse than omitting the field.
  const listings = [
    '/',
    '/artikel',
    '/jasa',
    '/galeri',
    '/tentang-kami',
    '/kontak',
  ]
  for (const loc of listings) urls.push({ loc })

  // Category pages are derived from the products that sit in them, so a naive
  // push emitted /produk/belt-conveyor/pvc-belt once per PVC product — 24
  // product rows produced 24 category entries for 8 categories. The sitemap
  // deduplicates on output so this was never wrong, only noisy; collecting them
  // here keeps the newest lastmod of the group rather than whichever product
  // happened to be iterated last.
  const categories = new Map<string, string | undefined>()

  // Guarded on products rather than pushed unconditionally: if the API is down
  // these three pages render the "Gagal memuat produk" panel, and a sitemap
  // that advertises error pages is worse than one that is briefly short.
  if (products.length) {
    for (const loc of ['/produk', '/produk/belt-conveyor', '/produk/lainnya']) urls.push({ loc })
  }

  for (const p of products) {
    const group = p.group === 'belt-conveyor' ? 'belt-conveyor' : 'lainnya'
    urls.push({ loc: `/produk/${p.slug}`, lastmod: p.updatedAt })

    const loc = `/produk/${group}/${categorySlug(p.category as string)}`
    const seen = categories.get(loc)
    if (!seen || (p.updatedAt && p.updatedAt > seen)) categories.set(loc, p.updatedAt)
  }

  for (const [loc, lastmod] of categories) urls.push({ loc, lastmod })

  for (const a of articles) {
    urls.push({ loc: `/artikel/${a.slug}`, lastmod: a.updatedAt ?? a.publishedAt })
  }

  for (const s of services) {
    urls.push({ loc: `/jasa/${s.slug}`, lastmod: s.updatedAt })
  }

  return urls
})
