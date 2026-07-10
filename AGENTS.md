# AGENTS.md — BBS Conveyor Frontend

Dokumen ini adalah panduan kerja untuk AI coding agent (dan siapa pun yang berkontribusi) di project rework website **CV Bintang Berjaya Satu (BBS Conveyor)**. Baca seluruh dokumen ini sebelum membuat perubahan apa pun.

---

## 1. Ringkasan Project

- **Nama bisnis**: CV Bintang Berjaya Satu (dikenal publik sebagai "BBS Conveyor")
- **Tagline**: "Connecting Power and Motion to Drive Industrial Excellence"
- **Domain bisnis**: Supplier belt conveyor, roller, komponen industri untuk manufaktur, tambang, dan pengolahan
- **Tujuan rework**: website lama (WordPress + Slider Revolution) diganti menjadi lebih profesional, ringan, dan punya admin panel untuk update artikel & produk
- **Target pengguna**: (1) calon klien B2B yang mencari supplier conveyor, (2) admin internal BBS yang update konten

---

## 2. Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend framework | Nuxt 3 (Vue 3, Composition API, `<script setup>`) |
| Styling | Tailwind CSS |
| Hosting frontend | Vercel |
| Backend API | Go (chi router, pgx/v5) — repo terpisah |
| Database | PostgreSQL (Railway) |
| Auth admin | JWT (dikirim via HttpOnly cookie dari backend) |
| Image storage | Cloudflare R2 / S3-compatible |
| Rich text editor (admin artikel) | Tiptap |

Frontend project ini **hanya mengurus presentasi dan admin UI**. Semua logic bisnis, validasi data, dan auth dilakukan di backend Go. Jangan simpan logic bisnis penting di frontend.

---

## 3. Struktur Folder

```
bbs-conveyor-frontend/
├── app.vue
├── nuxt.config.ts
├── tailwind.config.ts
├── package.json
├── .env.example
├── assets/
│   ├── css/main.css          # Tailwind base + font imports
│   └── images/                # logo, ikon statis (bukan gambar produk)
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue
│   │   ├── AppFooter.vue
│   │   └── AppHero.vue
│   ├── product/
│   │   ├── ProductCard.vue
│   │   ├── ProductGrid.vue
│   │   └── ProductFilter.vue
│   ├── article/
│   │   ├── ArticleCard.vue
│   │   └── ArticleGrid.vue
│   ├── industry/
│   │   └── IndustryCard.vue
│   ├── ui/                    # komponen generik: Button, Badge, SectionLabel, Input
│   └── admin/
│       ├── AdminSidebar.vue
│       ├── AdminTable.vue
│       └── forms/
│           ├── ProductForm.vue
│           └── ArticleForm.vue
├── composables/
│   ├── useApi.ts              # wrapper fetch ke backend Go
│   ├── useAuth.ts             # login/logout/session admin
│   ├── useProducts.ts
│   ├── useArticles.ts
│   └── useIndustries.ts
├── layouts/
│   ├── default.vue            # navbar + footer publik
│   └── admin.vue              # sidebar admin, tanpa navbar publik
├── middleware/
│   └── admin-auth.ts          # redirect ke /admin/login jika belum login
├── pages/
│   ├── index.vue
│   ├── produk/
│   │   ├── belt-conveyor/
│   │   │   └── [kategori].vue     # pvc-belt, pu, flat-belt, rubber-belt
│   │   ├── lainnya/
│   │   │   └── [kategori].vue     # timing-belt, fastener, cleat, gravity-roll
│   │   └── [slug].vue             # halaman detail satu produk (semua kategori share ini)
│   ├── jasa/
│   │   ├── index.vue              # listing semua jasa
│   │   └── [slug].vue             # incline-cleated-belt, profile-guide-belt, reparasi, onsite-joint
│   ├── galeri.vue             # foto instalasi/proyek — trust signal B2B
│   ├── artikel/
│   │   ├── index.vue          # gabungan konten "Blog" + "Sharing & Tips" situs lama — jangan dipisah lagi
│   │   └── [slug].vue
│   ├── tentang-kami.vue
│   ├── kontak.vue
│   └── admin/
│       ├── login.vue
│       ├── index.vue          # dashboard ringkas
│       ├── produk/
│       │   ├── index.vue
│       │   ├── tambah.vue
│       │   └── [id]/edit.vue
│       └── artikel/
│           ├── index.vue
│           ├── tambah.vue
│           └── [id]/edit.vue
├── types/
│   ├── product.ts
│   ├── article.ts
│   ├── industry.ts
│   └── service.ts             # untuk konten "Jasa" — struktur berbeda dari product.ts
└── public/
    └── favicon.ico
```

**Aturan penempatan file:**
- Komponen yang dipakai lebih dari satu halaman → `components/`
- Komponen yang cuma dipakai satu halaman spesifik → boleh inline di file page tersebut, jangan buat komponen terpisah untuk satu pemakaian
- Semua pemanggilan API lewat `composables/`, jangan `fetch()` langsung di dalam komponen atau page

---

## 4. Design Tokens

Palet warna diturunkan dari logo resmi CV Bintang Berjaya Satu (gold + hitam). Definisikan sebagai CSS variable di `assets/css/main.css` dan mapping ke Tailwind config — **jangan hardcode hex code di komponen**.

```css
:root {
  --color-ink: #1A1A18;        /* teks utama, background gelap (footer) */
  --color-gold: #CBA135;       /* aksen utama, CTA, label section */
  --color-gold-dark: #8A6D1F;  /* hover state, teks aksen di atas putih */
  --color-neutral: #6B6A64;    /* teks sekunder */
  --color-bg-soft: #F5F4F0;    /* placeholder image, section alternate */
  --color-border: #E5E3DC;
}
```

**Aturan pemakaian warna:**
- Gold **tidak** dipakai sebagai warna latar besar (section penuh) — hanya untuk aksen: label kecil di atas heading, tombol CTA utama, garis bawah/badge
- Tombol CTA utama: background gold, teks `--color-ink` (bukan putih)
- Tombol sekunder: outline netral, transparan
- Dark section (kalau dipakai, misal footer) pakai `--color-ink`, teks di atasnya pakai putih/`--color-bg-soft`

**Tipografi:**
- Heading: font bold/condensed yang senada dengan wordmark logo (bukan Inter default) — cek dulu apakah klien punya brand font resmi, kalau tidak ada gunakan alternatif dengan karakter serupa (mis. font sans-serif dengan weight 600-700)
- Body: sans-serif netral, regular weight, line-height minimal 1.6 untuk paragraf

---

## 5. Konvensi Kode

- Semua komponen Vue pakai `<script setup lang="ts">`
- Nama file komponen: PascalCase (`ProductCard.vue`)
- Nama composable: camelCase dengan prefix `use` (`useProducts.ts`)
- Props dan emit didefinisikan dengan `defineProps<T>()` dan `defineEmits<T>()` bertipe, bukan runtime declaration
- Jangan pakai `any` — definisikan tipe di `types/` dan reuse
- Teks UI (label, button, heading statis) dalam Bahasa Indonesia. Nama variabel/fungsi dalam Bahasa Inggris
- Gunakan `useFetch`/`useAsyncData` Nuxt untuk data fetching di halaman (SSR-friendly), bukan `onMounted` + manual fetch

---

## 6. Integrasi API (Backend Go)

- Base URL API disimpan di `.env` sebagai `NUXT_PUBLIC_API_BASE`
- Semua request lewat `composables/useApi.ts` yang sudah handle base URL, header, dan error handling terpusat
- Endpoint publik (produk, artikel, industri) tidak butuh auth
- Endpoint admin (`/admin/*` di backend) butuh JWT — dikirim otomatis via HttpOnly cookie, jangan simpan token di localStorage
- Struktur response API mengikuti pola yang sama dengan project ticketing sebelumnya: `{ data, error }` — cek dokumentasi API backend sebelum asumsi shape response

---

## 7. Halaman Admin

- Layout `admin.vue` terpisah total dari layout publik — tidak ada navbar/footer publik di dalam admin
- Setiap halaman di bawah `pages/admin/` (kecuali `login.vue`) wajib pakai middleware `admin-auth`
- Form produk dan artikel pakai komponen `admin/forms/` yang reusable untuk mode "tambah" dan "edit" (bedakan lewat prop `mode`)
- Artikel pakai Tiptap untuk rich text; simpan output sebagai HTML atau JSON terstruktur (samakan dengan format yang backend expect — cek API contract dulu)
- Upload gambar produk/artikel langsung ke endpoint backend yang handle upload ke R2, jangan upload langsung dari frontend ke storage provider

---

## 8. SEO & Performa

- Setiap halaman publik wajib set `useSeoMeta()` (title, description) — penting karena artikel per-industri/per-kota adalah strategi SEO utama klien
- Gambar produk pakai `<NuxtImg>` dengan lazy loading, bukan `<img>` biasa
- Hindari client-only rendering untuk konten yang perlu terindeks (produk, artikel) — pastikan SSR jalan normal untuk halaman-halaman ini

---

## 9. Struktur Navbar

**Update dari client (final, override struktur navbar versi sebelumnya):**

1. **Belt Conveyor** (dropdown) — PVC Belt, PU, Flat Belt, Rubber Belt
   → link ke `/produk/belt-conveyor/[kategori]`
2. **Produk Lainnya** (dropdown) — Timing Belt, Fastener, Cleat, Gravity Roll
   → link ke `/produk/lainnya/[kategori]`
3. **Jasa** (dropdown) — Incline Cleated Belt, Profile Guide Belt, Jasa Reparasi, Jasa Onsite Joint
   → link ke `/jasa/[slug]`
   → **Penting**: ini bukan kategori produk, ini layanan/servis. Butuh tipe data terpisah (`types/service.ts`, `useServices` composable, mock data sendiri) — jangan dipaksakan pakai struktur produk yang sama.
4. **Tentang Kami** (`/tentang-kami`)
5. **Artikel** (`/artikel`) — gabungan dari "Blog" dan "Sharing & Tips" di situs lama, jangan dipisah lagi
6. **Kontak** (`/kontak`)

Tidak ada menu "Galeri" atau "Industri" terpisah di level navbar utama — halaman `/galeri` tetap ada sebagai halaman tersendiri (linked dari homepage section atau footer), tapi tidak wajib jadi item navbar utama karena client tidak memintanya di struktur ini.

**Kebutuhan teknis untuk dropdown navbar:**
- `AppNavbar.vue` perlu didesain ulang untuk support submenu on-hover (desktop) dan accordion/expand (mobile) — bukan lagi flat link list
- Setiap dropdown item (Belt Conveyor, Produk Lainnya, Jasa) sendiri juga harus bisa diklik langsung ke halaman listing-nya (bukan cuma trigger dropdown), sebelum user pilih sub-kategori
- Gunakan komponen reusable untuk dropdown, misal `components/layout/NavDropdown.vue`, supaya tidak duplikasi markup 3x untuk Belt Conveyor/Produk Lainnya/Jasa

CTA di kanan navbar: "Hubungi Kami" → ke `/kontak`. Situs lama punya dua nomor sales WhatsApp terpisah (Sales 1 & Sales 2) — pertimbangkan ini saat desain halaman kontak, jangan cuma satu nomor generik.

## 10. Urutan Section Homepage

Urutan ini final, ikuti persis — jangan menyusun ulang tanpa diskusi:

1. **HeroSection** — statis, termasuk tombol unduh Company Profile PDF (fitur asli yang harus dipertahankan, penting untuk keperluan procurement B2B)
2. **ProductCategoriesSection** — grid kategori produk (data dari useProducts)
3. **WhyChooseUsSection** — "Kenapa Pilih BBS Conveyor", 5 value proposition statis (Kualitas, Harga Bersaing, Lead Time Cepat, Customer Oriented, Responsif) — konten asli dari situs lama, jangan dihilangkan
4. **IndustriesSection** — industri yang dilayani (data dari useIndustries)
5. **LatestArticlesSection** — artikel terbaru, 3 entri terakhir (data dari useArticles)

## 11. Yang Harus Dikonfirmasi Sebelum Implementasi Lanjut

- [ ] Kontrak API final dari backend Go (endpoint, shape response, error format)
- [ ] Apakah artikel butuh kategori/tag, atau cukup satu label sederhana
- [ ] Apakah produk butuh varian (ukuran, ketebalan) atau cukup satu entri per produk
- [ ] Font resmi brand (kalau klien punya brand guideline lebih detail dari logo)

---

## 12. Yang Tidak Boleh Dilakukan Agent

- Jangan generate dummy content berbahasa Inggris untuk teks yang akan tampil ke user publik (semua public-facing copy harus Bahasa Indonesia)
- Jangan install library UI framework besar (Vuetify, PrimeVue, dll) — styling murni Tailwind + komponen custom
- Jangan taruh API key atau secret apa pun di kode frontend — semua lewat `.env` dan tidak pernah di-commit
- Jangan ubah struktur folder di atas tanpa alasan kuat — kalau perlu struktur baru, diskusikan dulu sebelum eksekusi