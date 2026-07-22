import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Reusable sub-schemas
const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
}).optional()

export default defineContentConfig({
  collections: {
    // ── Products ──
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
        seo: seoSchema,
        updatedAt: z.string().optional(),
      }),
    }),

    // ── Services ──
    services: defineCollection({
      type: 'page',
      source: 'services/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        thumbnail: z.string().optional(),
        gallery: z.array(z.string()).default([]),
        excerpt: z.string(),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        seo: seoSchema,
        updatedAt: z.string().optional(),
      }),
    }),

    // ── Industries ──
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
        featured: z.boolean().default(false),
        order: z.number().default(99),
        seo: seoSchema,
        updatedAt: z.string().optional(),
      }),
    }),

    // ── Blog / Articles ──
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
        updatedAt: z.string().optional(),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        seo: seoSchema,
      }),
    }),

    // ── Gallery ──
    gallery: defineCollection({
      type: 'page',
      source: 'gallery/*.md',
      schema: z.object({
        image: z.string(),
        caption: z.string(),
        location: z.string().optional(),
        order: z.number().default(99),
        updatedAt: z.string().optional(),
      }),
    }),

    // ── Static Pages ──
    pages: defineCollection({
      type: 'page',
      source: 'pages/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        seo: seoSchema,
        updatedAt: z.string().optional(),
      }),
    }),

    // ── Legacy homepage sections (homepage/*.md) ──
    // ponytail: kept for backward compat, homepageConfig below is the new source
    homepage: defineCollection({
      type: 'page',
      source: 'homepage/*.md',
      schema: z.object({
        section: z.enum(['hero', 'company', 'why-choose-us', 'statistics', 'cta', 'seo']),
        headline: z.string().optional(),
        subheadline: z.string().optional(),
        primaryCTA: z.string().optional(),
        primaryLink: z.string().optional(),
        secondaryCTA: z.string().optional(),
        secondaryLink: z.string().optional(),
        image: z.string().optional(),
        companyName: z.string().optional(),
        tagline: z.string().optional(),
        description: z.string().optional(),
        items: z.array(z.object({
          title: z.string(),
          description: z.string(),
        })).optional(),
        projects: z.number().optional(),
        years: z.number().optional(),
        clients: z.number().optional(),
        engineers: z.number().optional(),
        buttonText: z.string().optional(),
        buttonLink: z.string().optional(),
        title: z.string().optional(),
        ogImage: z.string().optional(),
      }),
    }),

    // ── Homepage Config (single YAML — Nuxt Studio editable) ──
    homepageConfig: defineCollection({
      type: 'data',
      source: 'config/homepage.yml',
      schema: z.object({
        hero: z.object({
          headline: z.string(),
          subheadline: z.string(),
          primaryCTA: z.string(),
          primaryLink: z.string(),
          secondaryCTA: z.string().optional(),
          secondaryLink: z.string().optional(),
          image: z.string().optional(),
        }),
        company: z.object({
          companyName: z.string(),
          tagline: z.string(),
          description: z.string(),
        }),
        whyChooseUs: z.object({
          items: z.array(z.object({
            title: z.string(),
            description: z.string(),
          })),
        }),
        statistics: z.object({
          projects: z.number(),
          years: z.number(),
          clients: z.number(),
          engineers: z.number(),
        }),
        cta: z.object({
          headline: z.string(),
          description: z.string(),
          buttonText: z.string(),
          buttonLink: z.string(),
        }),
        seo: z.object({
          title: z.string(),
          description: z.string(),
          ogImage: z.string().optional(),
        }),
      }),
    }),

    // ── Navigation ──
    navigation: defineCollection({
      type: 'data',
      source: 'config/navigation.yml',
      schema: z.object({
        header: z.array(z.object({
          label: z.string(),
          href: z.string(),
          children: z.array(z.object({
            label: z.string(),
            href: z.string(),
          })).optional(),
        })),
        cta: z.object({
          label: z.string(),
          href: z.string(),
          external: z.boolean().default(false),
        }),
        footer: z.array(z.object({
          title: z.string(),
          links: z.array(z.object({
            label: z.string(),
            href: z.string(),
          })),
        })),
      }),
    }),
  },
})
