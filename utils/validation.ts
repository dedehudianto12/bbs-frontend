import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  group: z.enum(['belt-conveyor', 'lainnya']),
  kategori: z.string().min(1, 'Kategori wajib diisi'),
  description: z.string().default(''),
  detail: z.string().default(''),
  image: z.string().nullable().default(null),
  specs: z.string().default('{}'),
})

export const articleSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  excerpt: z.string().min(1, 'Excerpt wajib diisi'),
  content: z.string().default(''),
  tag: z.string().default(''),
  image: z.string().nullable().default(null),
  author: z.string().min(1, 'Author wajib diisi'),
  publishedAt: z.string().min(1, 'Tanggal wajib diisi'),
})

export const serviceSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  shortDescription: z.string().min(1, 'Deskripsi singkat wajib diisi'),
  fullDescription: z.string().default(''),
})

export const gallerySchema = z.object({
  image: z.string().min(1, 'URL gambar wajib diisi'),
  caption: z.string().min(1, 'Caption wajib diisi'),
  location: z.string().nullable().default(null),
})

export const industrySchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  description: z.string().default(''),
  image: z.string().nullable().default(null),
  productSlugs: z.string().default(''),
})

export type ProductForm = z.infer<typeof productSchema>
export type ArticleForm = z.infer<typeof articleSchema>
export type ServiceForm = z.infer<typeof serviceSchema>
export type GalleryForm = z.infer<typeof gallerySchema>
export type IndustryForm = z.infer<typeof industrySchema>
