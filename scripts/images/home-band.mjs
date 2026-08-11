import sharp from 'sharp'

// The two-up photo band in ServiceLeadTimeBanner on the homepage.
//
// Only the left plate is cut here; onsite-instalasi.webp on the right predates
// this file and is kept as it is.

const B = '/mnt/c/Users/ThinkPad/Documents/BBS'
const OUT = 'public/images'

// ── Left plate: a technician in hi-vis reaching across a running green food
// line, pouches travelling under the guide rails. Replaces onsite-incline.webp,
// the cleated incline belt cut from hero-left.jpg — that frame was belt on both
// sides of the band, and this half of the copy is "tim teknisi kami melakukan
// inspeksi ... langsung di lokasi", which wants a person on a customer's line.
//
// The source is a 596x1280 phone video frame letterboxed black, content rows
// ≈100 to ≈1130. Cut 596x165 from y=180: the strip takes his shoulder, the
// hi-vis and the reaching arm against the belt, and stops short of his face —
// same rule the previous plate followed, and the two people in the hero already
// carry the crew. The foot of the crop was pulled up from 215 to 165 rows,
// dropping the empty guide rail and the green belt below the hand; the band's
// cell is object-cover so those rows were being cropped off in the browser
// anyway, and they were the softest part of the frame.
//
// This is the one plate in the band that IS upscaled past its source width, and
// deliberately. The band renders at about 600 CSS px, so at native 596 a 2x
// screen resamples it in the browser with no sharpening and this frame — a
// compressed phone video still, soft to begin with — read as visibly blurry.
// Resampling to 2x with lanczos3 plus an unsharp pass adds no detail, but it
// puts the sharpening under our control instead of the browser's, and the
// result holds an edge at retina density. q88 rather than 78 because the
// sharpen pass gives the encoder ringing to chew on at lower quality.
await sharp(`${B}/Photo/jasa-onsite.jpg`)
  .rotate()
  .extract({ left: 0, top: 180, width: 596, height: 165 })
  .resize({ width: 1192, kernel: 'lanczos3' })
  .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2 })
  .webp({ quality: 88 })
  .toFile(`${OUT}/onsite-teknisi.webp`)

const m = await sharp(`${OUT}/onsite-teknisi.webp`).metadata()
console.log('onsite-teknisi'.padEnd(18), `${m.width}x${m.height}`)
