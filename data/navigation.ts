import { waLink } from '~/utils/whatsapp'

// static nav — was content/config/navigation.yml, move to backend if it changes often
//
// Artikel + Galeri are grouped under "Wawasan" rather than sitting at the top
// level: logo + 7 links + WhatsApp icon-button + CTA collides below ~1100px.
// Grouping reuses NavigationDropdown, which Produk already uses.
export const headerNav = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Produk',
    href: '/produk/belt-conveyor',
    children: [
      { label: 'Belt Conveyor', href: '/produk/belt-conveyor' },
      { label: 'Produk Lainnya', href: '/produk/lainnya' },
    ],
  },
  { label: 'Jasa', href: '/jasa' },
  {
    label: 'Wawasan',
    href: '/artikel',
    children: [
      { label: 'Artikel', href: '/artikel' },
      { label: 'Galeri Proyek', href: '/galeri' },
    ],
  },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Kontak', href: '/kontak' },
]

// Stays Indonesian. An English CTA on an otherwise wholly Indonesian site
// reads as imported rather than premium. Goes straight to WhatsApp with a
// prefilled message — there is no form to route it to.
export const navCta = {
  label: 'Minta Penawaran',
  href: waLink({ halaman: 'Navigasi utama' }),
}

export const footerColumns = [
  {
    title: 'Produk',
    links: [
      { label: 'Belt Conveyor', href: '/produk/belt-conveyor' },
      { label: 'Produk Lainnya', href: '/produk/lainnya' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { label: 'Jasa Kami', href: '/jasa' },
      { label: 'Konsultasi', href: '/kontak' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '/tentang-kami' },
      { label: 'Artikel', href: '/artikel' },
      { label: 'Galeri Proyek', href: '/galeri' },
      { label: 'Kontak', href: '/kontak' },
    ],
  },
]
