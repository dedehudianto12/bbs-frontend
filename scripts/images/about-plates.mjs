import sharp from 'sharp'
const B = '/mnt/c/Users/ThinkPad/Documents/BBS/Activity foto'
const OUT = 'public/images'

// ── Konsultasi: BBS staff and a customer's people around a table in the
// Pulo Gebang office, drawings out. Native landscape and the only frame in the
// set with no watermark on it. Cropped 2:1 off the left, which keeps the table
// and drops a stretch of empty desks.
await sharp(`${B}/servey.jpeg`).rotate()
  .extract({ left: 0, top: 10, width: 1400, height: 700 })
  .webp({ quality: 80 }).toFile(`${OUT}/about-konsultasi.webp`)

// ── Workshop: the hot press in Pulo Gebang with a green PVC belt draped over
// the bed, control box in the foreground. The room itself, not a product in it.
await sharp(`${B}/Untitled11_20260730171453.png`).rotate()
  .extract({ left: 0, top: 477, width: 2254, height: 1503 })
  .resize({ width: 1400, kernel: 'lanczos3' })
  .webp({ quality: 78 }).toFile(`${OUT}/about-workshop.webp`)

// ── Tim: the whole crew at one table. Shot portrait-rotated with no EXIF
// orientation to correct it, hence the explicit -90 — .rotate() alone leaves it
// on its side. Cropped past the watermark strip along the foot.
await sharp(`${B}/Untitled11_20260731113407.png`).rotate(-90)
  .extract({ left: 0, top: 126, width: 2994, height: 1664 })
  .resize({ width: 1400, kernel: 'lanczos3' })
  .webp({ quality: 78 }).toFile(`${OUT}/about-tim.webp`)

for (const f of ['about-konsultasi', 'about-workshop', 'about-tim']) {
  const m = await sharp(`${OUT}/${f}.webp`).metadata()
  console.log(f, `${m.width}x${m.height}`)
}
