import sharp from 'sharp'

// Client logos for the "Dipercaya Oleh" band on the home page.
//
// The five source files are what the clients handed over, and they are not a
// set: canvases range from 200x200 to 800x245, baked-in padding from 0% to 95%
// of the frame, and only J&T ships with an alpha channel. Rendering them at a
// shared CSS height would put Polytron (7.7:1) next to J&T (4.75:1 inside a
// square) and make one look three times the weight of the other.
//
// So each mark is trimmed to its own ink and then scaled to equal *optical
// area* rather than equal height. Area is the closest cheap proxy for how much
// a mark weighs on the page: s = sqrt(TARGET_AREA / (w * h)). NUDGE is the
// hand-correction on top, and it is not decoration — a badge carrying two
// lines of type (Sari Roti, Indah Kiat) needs more area than a single-word
// mark to stay legible at the same perceived weight.
//
// Nothing is keyed, recoloured, or desaturated here. Four of the five sources
// use white as an interior colour — Indah Kiat's spiral, Sari Roti's lower
// panel — so keying white to transparent would repaint another company's
// trademark in #F4F2EE. The band renders them on white cells instead.
//
//   node scripts/images/client-logos.mjs

const SRC = '/mnt/c/Users/ThinkPad/Documents/BBS/Client'
const OUT = 'public/images/clients'

// Display box at the largest breakpoint (lg:grid-cols-6 inside max-w-6xl gives
// ~192px cells). Assets are emitted at 2x this for retina; the <img> carries
// the 1x numbers so there is no layout shift.
const TARGET_AREA = 2300
const MAX_W = 132
const MAX_H = 44
const DPR = 2

const LOGOS = [
  // J&T's mark is 133x28 of ink floating in a 200x200 canvas — 95% padding.
  // Nudged up because the italic sits optically lighter than Polytron's
  // upright bold at the same computed area.
  { src: 'JNT.png', out: 'jnt', nudge: 1.08 },
  // Script wordmark, so it carries more visual mass per unit area than the
  // geometric marks; scaled a touch up to keep the descender readable.
  { src: 'PT HILON.jpg', out: 'hilon', nudge: 1.1 },
  // Mark + wordmark + a "pulp and paper products" sub-line that has to survive.
  { src: 'PT IKPP.png', out: 'indah-kiat', nudge: 1.15 },
  // A self-contained badge, not a wordmark: two lines of type inside a frame.
  // Needs materially more area than the others or the sub-line turns to mush.
  { src: 'SARIROTI.png', out: 'sari-roti', nudge: 1.35 },
  // Already tight-cropped at 600x78 with zero padding, and the widest ratio in
  // the set. Solid upright bold reads heaviest of the five at equal area, so
  // it is pulled back rather than left to dominate the row.
  { src: 'polytron.png', out: 'polytron', nudge: 0.88 },
]

const results = []

for (const { src, out, nudge } of LOGOS) {
  // threshold 12 rather than the default: the JPEG source has compression
  // noise around the ink, and a tighter threshold leaves a ragged margin.
  const trimmed = await sharp(`${SRC}/${src}`).trim({ threshold: 12 }).png().toBuffer()
  const { width: tw, height: th } = await sharp(trimmed).metadata()

  const scale = Math.min(
    Math.sqrt(TARGET_AREA / (tw * th)) * nudge,
    MAX_W / tw,
    MAX_H / th,
  )
  const w = Math.round(tw * scale)
  const h = Math.round(th * scale)

  await sharp(trimmed)
    .resize({ width: w * DPR, kernel: 'lanczos3' })
    // Lossless: these are flat-colour marks on white, and lossy WebP rings
    // visibly along a hard red/white edge at this size. The files are a few kB.
    .webp({ lossless: true, effort: 6 })
    .toFile(`${OUT}/${out}.webp`)

  results.push({ out, from: `${tw}x${th}`, display: `${w}x${h}`, w, h })
}

console.table(results)
