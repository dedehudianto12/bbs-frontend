import { defineSitemapEventHandler } from '#imports'

// ponytail: sitemap URLs from Nuxt Content collections
export default defineSitemapEventHandler(async () => {
  // Fetch all dynamic content for sitemap
  const [products, blogPosts, services, industries, pages] = await Promise.all([
    queryCollection('products').all(),
    queryCollection('blog').all(),
    queryCollection('services').all(),
    queryCollection('industries').all(),
    queryCollection('pages').all(),
  ])

  const urls: { loc: string; lastmod?: string }[] = []

  // Products
  for (const p of products as any[]) {
    const group = p.group === 'belt-conveyor' ? 'belt-conveyor' : 'lainnya'
    urls.push({ loc: `/produk/${p.slug}`, lastmod: p.updatedAt })
    urls.push({ loc: `/produk/${group}/${(p.category as string).toLowerCase().replace(/\s+/g, '-')}`, lastmod: p.updatedAt })
  }

  // Blog
  for (const a of blogPosts as any[]) {
    urls.push({ loc: `/artikel/${a.slug}`, lastmod: a.updatedAt ?? a.publishedAt })
  }

  // Services
  for (const s of services as any[]) {
    urls.push({ loc: `/jasa/${s.slug}`, lastmod: s.updatedAt })
  }

  // Industries
  for (const i of industries as any[]) {
    urls.push({ loc: `/industries/${i.slug}`, lastmod: i.updatedAt })
  }

  // Static pages (privacy, terms, etc.)
  for (const pg of pages as any[]) {
    urls.push({ loc: `/${pg.slug}`, lastmod: pg.updatedAt })
  }

  return urls
})
