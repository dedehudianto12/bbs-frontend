import { z } from 'zod'

export const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  shortDescription: z.string().min(1),
  fullDescription: z.string().min(1),
  images: z.array(z.string()),
})

export type Service = z.infer<typeof serviceSchema>
