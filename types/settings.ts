import { z } from 'zod'

export const settingsSchema = z.object({
  waSales1: z.string().regex(/^62\d{8,12}$/, 'Nomor WA harus diawali 62 (contoh: 6281234567890)'),
  waSales2: z.string().regex(/^62\d{8,12}$/, 'Nomor WA harus diawali 62 (contoh: 6281234567890)'),
  alamat: z.string().min(1, 'Alamat tidak boleh kosong'),
  jamOperasional: z.string().min(1, 'Jam operasional tidak boleh kosong'),
  email: z.string().email('Format email tidak valid'),
  companyProfilePdfUrl: z.string(),
})

export type Settings = z.infer<typeof settingsSchema>
