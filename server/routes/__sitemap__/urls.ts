// `defineSitemapEventHandler` is registered as a server auto-import by
// @nuxtjs/sitemap. Importing it explicitly from '#imports' typechecked as a
// missing export because the module registers it directly rather than
// re-exporting it there; the auto-import resolves at build time.

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

  for (const p of products) {
    const group = p.group === 'belt-conveyor' ? 'belt-conveyor' : 'lainnya'
    urls.push({ loc: `/produk/${p.slug}`, lastmod: p.updatedAt })
    urls.push({ loc: `/produk/${group}/${(p.category as string).toLowerCase().replace(/\s+/g, '-')}`, lastmod: p.updatedAt })
  }

  for (const a of articles) {
    urls.push({ loc: `/artikel/${a.slug}`, lastmod: a.updatedAt ?? a.publishedAt })
  }

  for (const s of services) {
    urls.push({ loc: `/jasa/${s.slug}`, lastmod: s.updatedAt })
  }

  return urls
})
