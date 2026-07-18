# ADMIN_AGENTS.md — BBS Conveyor Admin Panel

Dokumen ini adalah panduan khusus untuk area admin panel (`pages/admin/*`, `components/admin/*`). Baca **AGENTS.md terlebih dahulu** untuk konteks project secara umum (tech stack, design tokens, konvensi kode dasar) — dokumen ini hanya berisi hal-hal spesifik admin panel dan tidak mengulang apa yang sudah ada di sana.

---

## 1. Prinsip Utama

- Admin panel adalah **area terpisah secara visual** dari situs publik — tidak perlu terikat dengan design token publik (gold/ink/dst) secara ketat. Fokus admin panel adalah **fungsional dan jelas**, bukan branding.
- Semua modul admin sementara jalan dengan **mock data + mock auth**, karena backend Go belum ada. Setiap composable admin harus ditulis seolah-olah memanggil API asli (`async function`, shape response konsisten) supaya nanti tinggal ganti implementasi, bukan refactor total — sama seperti pola mock data di frontend publik.
- **Reka UI dipakai di sini** (lihat bagian 2) — beda dari halaman publik yang murni custom Tailwind tanpa component library tambahan. Reka UI dipilih karena unstyled (Anda tetap kontrol penuh tampilan lewat Tailwind), jadi prinsip "custom look" tetap konsisten dengan situs publik — bedanya cuma logic aksesibilitas (dialog, dropdown, dst) sudah disediakan, tidak perlu dibangun dari nol.

---

## 2. Setup Reka UI

**Update kedua: PrimeVue digantikan Reka UI** (sebelumnya bernama Radix Vue, di-rebrand awal 2025 — nama package baru `reka-ui`). Ini pilihan final. Alasan:
- Reka UI adalah **fondasi asli** yang dipakai shadcn-vue di baliknya — jadi dapat manfaat inti yang dicari sejak awal (aksesibilitas: keyboard nav, ARIA attributes, focus management, positioning) tanpa CLI generator yang rewel seperti shadcn-vue kemarin
- Instalasi murni `npm install`, tidak ada proses generate/copy file yang bisa gagal
- **Unstyled** — logic dan aksesibilitas sudah ditangani Reka UI, tapi tampilan 100% dikontrol lewat Tailwind, konsisten dengan gaya kerja project ini di situs publik (custom Tailwind, bukan theme generic)

**Instalasi:**
```bash
npm install reka-ui
```

Tidak perlu modul Nuxt khusus atau konfigurasi `nuxt.config.ts` — Reka UI adalah component library biasa, diimpor langsung per komponen saat dipakai:
```vue
<script setup lang="ts">
import { DialogRoot, DialogTrigger, DialogContent, DialogOverlay } from 'reka-ui'
</script>
```

**Pola kerja**: Reka UI kasih komponen "Root/Trigger/Content/dst" tanpa styling — Anda bungkus jadi komponen custom sendiri di `components/admin/ui/` dengan Tailwind classes, mirip pola shadcn tapi ditulis manual dan lebih sederhana (tidak perlu `cva` kecuali mau bikin sistem variant kompleks). Contoh: bikin `components/admin/ui/Dialog.vue` yang membungkus `DialogRoot`/`DialogContent` dari Reka UI dengan styling Anda sendiri, lalu dipakai berulang di seluruh admin panel.

Komponen Reka UI yang kemungkinan dibutuhkan: `Dialog` (untuk form modal/konfirmasi hapus), `DropdownMenu`, `Select`, `Toast`, `Tabs`, `Checkbox`. Untuk `DataTable` dengan sorting/pagination, Reka UI tidak menyediakan ini secara langsung — pertimbangkan tambah **TanStack Table** (`@tanstack/vue-table`, headless, cuma logic tabel) di atas Reka UI kalau tabel produk/artikel nanti butuh sorting/filter/pagination yang lumayan kompleks. Untuk versi awal, tabel HTML biasa dengan Tailwind mungkin sudah cukup — evaluasi setelah lihat kebutuhan nyata di modul Galeri (modul pertama yang dibangun).

---

## 3. Auth Flow

**Sementara (mock, sebelum backend Go ada):**
- `pages/admin/login.vue` — form email/username + password, tidak benar-benar validasi ke server. Login sukses kalau cocok dengan kredensial dummy yang di-hardcode di `composables/useAuth.ts` (misal `admin@bbsconveyor.com` / `admin123`) — **beri komentar jelas di kode bahwa ini sementara dan wajib diganti saat integrasi backend**
- Simpan status login di state sederhana (misal `useState` Nuxt atau cookie non-HttpOnly untuk sementara) — bukan pola final, cukup untuk development
- `middleware/admin-auth.ts` cek status ini, redirect ke `/admin/login` kalau belum login

**Nanti (setelah backend Go ada):**
- Login sesungguhnya POST ke endpoint backend, backend set JWT di HttpOnly cookie
- `useAuth.ts` composable-nya tetap sama secara interface (`login()`, `logout()`, `isAuthenticated`), cuma isi implementasinya diganti dari mock ke fetch asli — halaman dan middleware yang consume composable ini **tidak perlu diubah**

---

## 4. Layout & Navigasi Admin

**Penerapan layout otomatis**: layout `admin` diterapkan lewat satu `middleware/admin-layout.global.ts` yang otomatis assign layout ke semua rute `/admin/*` (kecuali `/admin/login`) via `setPageLayout('admin')` — bukan dengan menulis `definePageMeta({ layout: 'admin' })` di tiap halaman satu-satu. Ini mencegah halaman baru lupa di-set layout-nya (seperti yang sempat terjadi di halaman Galeri). Halaman baru di bawah `pages/admin/` otomatis dapat layout ini tanpa perlu konfigurasi tambahan, kecuali memang sengaja mau standalone seperti `login.vue`.

`layouts/admin.vue` — sidebar kiri + area konten kanan. Sidebar berisi 6 menu sesuai modul (lihat AGENTS.md bagian 7.1):

1. Dashboard (ringkasan sederhana — jumlah produk, artikel, dst)
2. Produk
3. Jasa
4. Galeri
5. Artikel
6. Kategori Produk
7. Pengaturan Umum

Sidebar collapse jadi hamburger di mobile — admin panel juga harus tetap bisa dipakai dari HP meski utamanya didesain untuk desktop.

---

## 5. Pola CRUD Generik

**Keputusan final: tambah dan edit pakai modal/dialog di halaman list yang sama — BUKAN halaman terpisah.** Ini beda dari rencana awal di AGENTS.md (yang sempat menyebut `tambah.vue` dan `[id]/edit.vue` sebagai halaman sendiri) — override itu dengan pola ini karena kita sudah punya `components/admin/ui/Dialog.vue` berbasis Reka UI, dan modal lebih cepat dipakai untuk skala form admin panel ini (field tidak terlalu banyak per modul).

Semua modul list-based (Produk, Jasa, Galeri, Artikel, Kategori Produk) mengikuti pola yang sama, satu URL per modul:

- **`pages/admin/[modul]/index.vue`** — satu-satunya halaman per modul. Berisi:
  - Tabel/grid daftar data
  - Tombol "Tambah [Modul]" di kanan atas → membuka `Dialog` berisi form kosong (mode create)
  - Aksi edit per baris → membuka `Dialog` yang sama, form terisi data existing (mode edit)
  - Aksi hapus per baris → membuka `Dialog` konfirmasi terpisah sebelum benar-benar hapus
- **Komponen form** (`components/admin/forms/[Modul]Form.vue`) — satu komponen dipakai untuk mode create maupun edit lewat prop `mode: 'create' | 'edit'` dan `initialData` (kosong/undefined untuk create), di-render di dalam `Dialog`
- **State dialog** (buka/tutup, mode aktif, data yang sedang diedit) dikelola di `index.vue` masing-masing modul lewat `ref` sederhana — tidak perlu state management global untuk ini
- **Hapus**: selalu lewat dialog konfirmasi terpisah, tidak langsung hapus dari klik tombol
- **Feedback**: toast/notifikasi sederhana setelah create/update/delete berhasil atau gagal (Reka UI punya primitif `Toast` kalau mau, atau notifikasi sederhana custom cukup untuk awal)

Bangun pola ini di **Galeri dulu** (paling sederhana — tidak ada relasi ke kategori/grup) sebagai referensi, baru direplikasi ke modul lain.

---

## 6. Catatan Khusus Per Modul

- **Produk**: form perlu dropdown grup (Belt Conveyor/Produk Lainnya) yang lalu memfilter dropdown kategori sesuai grup terpilih (dependent dropdown) — ambil daftar kategori dari modul Kategori Produk, bukan hardcode ulang dari `types/category.ts`
- **Artikel**: pakai Tiptap untuk field konten. Field lain tetap input biasa (judul, kategori/tag, tanggal publish)
- **Kategori Produk**: form hanya punya field label, grup (Belt Conveyor/Produk Lainnya), dan urutan. Field slug **read-only** setelah kategori dibuat — ditampilkan tapi disabled di form edit, dengan keterangan kecil "Slug tidak bisa diubah setelah kategori dibuat"
- **Pengaturan Umum**: bukan CRUD list, satu form saja (single record). Field: nomor WA Sales 1, nomor WA Sales 2, alamat, jam operasional, email, upload file PDF company profile (gunakan input file sederhana, preview nama file yang sudah ada kalau sedang edit)

---

## 7. Yang Tidak Boleh Dilakukan Agent (khusus admin)

- Jangan buat form kategori produk yang mengizinkan edit slug — ini melanggar aturan di AGENTS.md 7.1
- Jangan hardcode kredensial mock auth di lebih dari satu tempat — cukup di `useAuth.ts`
- Jangan pakai Reka UI (atau komponen turunannya di `components/admin/ui/`) di luar folder `components/admin/` dan `pages/admin/`
- Jangan implementasi upload file (galeri, PDF company profile) dengan asumsi endpoint storage tertentu — untuk sementara cukup simulasikan (misal simpan sebagai object URL lokal atau base64 di mock state), beri komentar bahwa ini akan diganti ke upload R2 asli saat backend siap