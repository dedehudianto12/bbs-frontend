import { defineSitemapEventHandler } from '#imports'

// ponytail: sitemap URLs from backend API
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

  const [products, articles, services, industries] = await Promise.all([
    fetchAll('/produk'),
    fetchAll('/artikel'),
    fetchAll('/jasa'),
    fetchAll('/industri'),
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

  for (const i of industries) {
    urls.push({ loc: `/industries/${i.slug}`, lastmod: i.updatedAt })
  }

  return urls
})
