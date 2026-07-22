import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  group: z.enum(['belt-conveyor', 'lainnya']),
  kategori: z.string(),
  category: z.string(),
  description: z.string(),
  detail: z.string(),
  image: z.string().nullable(),
  specs: z.record(z.string(), z.string()),
})

export type Product = z.infer<typeof productSchema>
