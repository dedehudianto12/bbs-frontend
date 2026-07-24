// ponytail: static nav — was content/config/navigation.yml, move to backend if it changes often
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
  { label: 'Artikel', href: '/artikel' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Kontak', href: '/kontak' },
]

export const navCta = {
  label: 'Hubungi Kami',
  href: '/kontak',
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
      { label: 'Kontak', href: '/kontak' },
    ],
  },
]
