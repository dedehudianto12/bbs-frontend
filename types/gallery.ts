import { z } from 'zod'

export const galleryItemSchema = z.object({
  id: z.string().min(1),
  image: z.string().min(1),
  caption: z.string().min(1),
  location: z.string().optional(),
})

export type GalleryItem = z.infer<typeof galleryItemSchema>
