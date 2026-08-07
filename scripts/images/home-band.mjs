import sharp from 'sharp'

// The two-up photo band in ServiceLeadTimeBanner on the homepage.
//
// Only the left plate is cut here; onsite-instalasi.webp on the right predates
// this file and is kept as it is.

const B = '/mnt/c/Users/ThinkPad/Documents/BBS'
const OUT = 'public/images'

// ── Left plate: a cleated incline belt climbing to a bagging hopper, shot from
// the floor. Replaces onsite-line.webp, the hard-hatted technician standing
// beside a food-line conveyor.
//
// The source is a 720x1544 phone frame letterboxed black, content rows 132 to
// 1490, and it has people in it — a crouching fitter at the head pulley up at
// y=316..427, and an operator filling the bottom third from y≈705 down. The
// band between them is the only crop of this photograph with nobody in it, and
// it is what the crop takes: y=440 to y=700, hard against both figures, full
// width. 260 rows is thin against a 720px width, but the banner's cell is a
// short landscape strip and the belt runs corner to corner through it, so the
// crop's own shape is close to the shape it is displayed in.
//
// 720 wide, not upscaled: the band renders at about 600 CSS px and upscaling a
// phone frame past its native width buys bytes and no detail — the same call
// as the jasa plates.
await sharp(`${B}/Photo/hero-left.jpg`)
  .rotate()
  .extract({ left: 0, top: 440, width: 720, height: 260 })
  .webp({ quality: 78 })
  .toFile(`${OUT}/onsite-incline.webp`)

const m = await sharp(`${OUT}/onsite-incline.webp`).metadata()
console.log('onsite-incline'.padEnd(18), `${m.width}x${m.height}`)
