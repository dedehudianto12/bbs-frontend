import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      source: 'products/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        group: z.enum(['belt-conveyor', 'lainnya']),
        kategori: z.string(),
        category: z.string(),
        thumbnail: z.string().optional(),
        gallery: z.array(z.string()).default([]),
        excerpt: z.string(),
        specs: z.record(z.string(), z.string()).default({}),
        featured: z.boolean().default(false),
        order: z.number().default(99),
      }),
    }),
    services: defineCollection({
      type: 'page',
      source: 'services/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        thumbnail: z.string().optional(),
        gallery: z.array(z.string()).default([]),
        excerpt: z.string(),
        order: z.number().default(99),
      }),
    }),
    industries: defineCollection({
      type: 'page',
      source: 'industries/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        icon: z.string().optional(),
        thumbnail: z.string().optional(),
        excerpt: z.string(),
        productSlugs: z.array(z.string()).default([]),
        order: z.number().default(99),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        thumbnail: z.string().optional(),
        excerpt: z.string(),
        author: z.string(),
        publishedAt: z.string(),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
      }),
    }),
    gallery: defineCollection({
      type: 'page',
      source: 'gallery/*.md',
      schema: z.object({
        image: z.string(),
        caption: z.string(),
        location: z.string().optional(),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
    homepage: defineCollection({
      type: 'page',
      source: 'homepage/*.md',
      schema: z.object({
        section: z.enum(['hero', 'company', 'why-choose-us', 'statistics', 'cta', 'seo']),
      }),
    }),
  },
})
