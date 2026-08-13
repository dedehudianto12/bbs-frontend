// Regenerates public/images/og-home.webp — the link preview card.
//
// This matters more here than it looks. A large share of this site's traffic
// arrives from a WhatsApp forward, and the OG image is the entire first
// impression in that thread. What it replaced was a black card with a bright
// green rounded-square mark that was not the BBS logo, in a colour absent from
// the palette, with corners in a system pinned to radius 0, carrying the old
// headline.
//
// nuxt-og-image would normally own this, but it is disabled in nuxt.config
// (v6.7.4 crashes on `originalName.split is not a function`), so the card is a
// static asset generated here and committed.
//
// Fonts are not installed in this environment — Inter is loaded from the Google
// CDN at runtime — so the TTF is passed in by path and nothing but the .webp is
// added to the repo. Grab it from
// https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter[opsz,wght].ttf
//
// Usage, from the repo root:
//   node scripts/og-image.mjs /path/to/Inter.ttf public/images/og-home.webp
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const FONT = process.argv[2]
const OUT = process.argv[3] ?? 'public/images/og-home.webp'

if (!FONT) {
  console.error('usage: node scripts/og-image.mjs <path-to-Inter.ttf> [outfile]')
  process.exit(1)
}

const W = 1200
const H = 630
const M = 48 // frame inset

const PAPER = '#F4F2EE'
const LINE = '#E2E0DB'
const INK = '#1C1E22'
const MUTED = '#5B6068'
const GOLD = '#d6b045'

const logo = readFileSync('public/bbs-logo.svg', 'utf8')
// Strip the XML prolog/doctype so it can be inlined, and pin a render size.
const logoInner = logo
  .replace(/<\?xml[^>]*\?>/, '')
  .replace(/<!DOCTYPE[^>]*>/, '')
  .replace(/width="100%"/, 'width="232"')
  .replace(/height="100%"/, 'height="122"')

// Background: paper with the site's hairline frame, plus a gold rule under the
// logo. Radius 0 throughout, same as every surface on the site.
const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="${M}" y="${M}" width="${W - M * 2}" height="${H - M * 2}"
        fill="none" stroke="${LINE}" stroke-width="2"/>
  <line x1="${M}" y1="${M + 150}" x2="${W - M}" y2="${M + 150}" stroke="${LINE}" stroke-width="2"/>
  <line x1="${M}" y1="${H - M - 92}" x2="${W - M}" y2="${H - M - 92}" stroke="${LINE}" stroke-width="2"/>
  <rect x="${M}" y="${M + 148}" width="120" height="4" fill="${GOLD}"/>
</svg>`

function text(markup, width, opts = {}) {
  return sharp({
    text: {
      text: markup,
      font: 'Inter',
      fontfile: FONT,
      rgba: true,
      width,
      align: opts.align ?? 'left',
      spacing: opts.spacing ?? 0,
      dpi: opts.dpi ?? 72,
    },
  })
    .png()
    .toBuffer()
}

const headline = await text(
  `<span font="Inter Bold 62px" foreground="${INK}" letter_spacing="-1200">Conveyor berhenti?\nSambung lagi dalam <span foreground="${GOLD}">2–3 hari</span>.</span>`,
  W - M * 2 - 64,
  { spacing: 14 },
)

const sub = await text(
  `<span font="Inter Medium 25px" foreground="${MUTED}">Onsite joint &amp; reparasi — di pabrik Anda atau di workshop kami.</span>`,
  W - M * 2 - 64,
)

const brand = await text(
  `<span font="Inter SemiBold 20px" foreground="${INK}" letter_spacing="3000">CV BINTANG BERJAYA SATU</span>`,
  700,
)

const domain = await text(
  `<span font="Inter Medium 20px" foreground="${MUTED}" letter_spacing="1200">bintangberjayasatu.com</span>`,
  360,
  { align: 'right' },
)

const hm = await sharp(headline).metadata()
const sm = await sharp(sub).metadata()
const bm = await sharp(brand).metadata()
const dm = await sharp(domain).metadata()

const logoBuf = await sharp(Buffer.from(logoInner)).png().toBuffer()
const lm = await sharp(logoBuf).metadata()

const footerY = H - M - 92 + Math.round((92 - bm.height) / 2)

await sharp(Buffer.from(bg))
  .composite([
    { input: logoBuf, left: M + 32, top: M + Math.round((150 - lm.height) / 2) },
    { input: headline, left: M + 32, top: M + 150 + 56 },
    { input: sub, left: M + 32, top: M + 150 + 56 + hm.height + 30 },
    { input: brand, left: M + 32, top: footerY },
    { input: domain, left: W - M - 32 - dm.width, top: H - M - 92 + Math.round((92 - dm.height) / 2) },
  ])
  .webp({ quality: 92 })
  .toFile(OUT)

console.log('wrote', OUT, `${W}x${H}`, 'headline h=', hm.height, 'sub h=', sm.height)
