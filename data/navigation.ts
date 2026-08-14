import { waLink } from '~/utils/whatsapp'
import { internalPath } from '~/utils/url'

type NavLink = { label: string; href: string; children?: NavLink[] }

// Every href below is written bare and normalised to the trailing-slash form
// on the way out, because that is what site.trailingSlash makes canonical.
// Normalising here rather than by editing 14 string literals means the next
// link someone adds is correct without their having to know the rule — and the
// header and footer cannot drift apart on it.
const withSlash = <T extends NavLink>(link: T): T => ({
  ...link,
  href: internalPath(link.href),
  ...(link.children ? { children: link.children.map(withSlash) } : {}),
})

// static nav — was content/config/navigation.yml, move to backend if it changes often
//
// Artikel + Galeri are grouped under "Wawasan" rather than sitting at the top
// level: logo + 7 links + WhatsApp icon-button + CTA collides below ~1100px.
// Grouping reuses NavigationDropdown, which Produk already uses.
export const headerNav: NavLink[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Produk',
    href: '/produk',
    children: [
      { label: 'Semua Produk', href: '/produk' },
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
].map(withSlash)

// Stays Indonesian. An English CTA on an otherwise wholly Indonesian site
// reads as imported rather than premium. Goes straight to WhatsApp with a
// prefilled message — there is no form to route it to.
export const navCta = {
  label: 'Minta Penawaran',
  href: waLink(),
}

export const footerColumns = [
  {
    title: 'Produk',
    links: [
      { label: 'Semua Produk', href: '/produk' },
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
].map((col) => ({ ...col, links: col.links.map(withSlash) }))
