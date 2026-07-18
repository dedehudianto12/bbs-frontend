import { z } from 'zod'

export const articleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string(),
  image: z.string(),
  tag: z.string().min(1),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD'),
  author: z.string().min(1),
})

export type Article = z.infer<typeof articleSchema>
