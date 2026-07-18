import { z } from 'zod'

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const kategoriSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  label: z.string().min(1),
  group: z.enum(['belt-conveyor', 'lainnya']),
  order: z.number().int().min(0),
})

export type Kategori = z.infer<typeof kategoriSchema>

// ponytail: JASA_SLUGS tetap sebagai static constant — slug jasa
// diambil dari useServices(), bukan dari modul Kategori Produk.
export const JASA_SLUGS = [
  { slug: 'incline-cleated-belt', label: 'Incline Cleated Belt' },
  { slug: 'profile-guide-belt', label: 'Profile Guide Belt' },
  { slug: 'jasa-reparasi', label: 'Jasa Reparasi' },
  { slug: 'jasa-onsite-joint', label: 'Jasa Onsite Joint' },
] as const

export type JasaSlug = (typeof JASA_SLUGS)[number]['slug']

export function getSlugs(items: ReadonlyArray<{ slug: string }>): string[] {
  return items.map((i) => i.slug)
}
