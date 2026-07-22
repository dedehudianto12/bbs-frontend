import { z } from 'zod'

export const industrySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().nullable(),
  productSlugs: z.array(z.string()),
})

export type Industry = z.infer<typeof industrySchema>
