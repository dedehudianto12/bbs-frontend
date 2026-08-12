import sharp from 'sharp'

// The two-up photo band in ServiceLeadTimeBanner on the homepage.
//
// Only the left plate is cut here; onsite-instalasi.webp on the right predates
// this file and is kept as it is.

const B = '/mnt/c/Users/ThinkPad/Documents/BBS'
const OUT = 'public/images'

// ── Left plate: a green sortation belt running loaded through a customer's
// packing hall, the guide rails and the transfer chute across it. Replaces
// onsite-incline.webp, the cleated incline belt cut from hero-left.jpg — that
// frame was belt on both sides of the band, and this half of the copy is "tim
// teknisi kami melakukan inspeksi ... langsung di lokasi", which wants a
// working plant, not a product shot.
//
// The source is a 720x1600 phone video frame letterboxed black, content rows
// ≈155 to ≈1440. Cut 720x360 from y=470, walked down from 300 in two steps at
// the client's direction. The windows above it were tried and left: y=160 is
// the crew and the carton pallet with the belt barely in it (and both faces in
// it), y=300 and y=380 keep the operator and the hall behind him but spend the
// top of the strip on ceiling clutter and cabling. At 470 the frame is the belt
// itself, loaded and moving, edge to edge — no people in it, which the two in
// the hero above already cover.
//
// 2:1, cut to the shape the band actually displays (the cell is roughly 600x280
// at md), and that is the whole reason this crop is 360 rows rather than 260. A
// strip cut tighter than its box does not get shown wider — object-cover fills
// the box either way — it just arrives pre-zoomed and then loses more off the
// top and bottom in the browser, which is how the 260-row cut ended up reading
// as a close-up of a hi-vis vest. At 2:1 almost nothing is cropped again, so
// the frame the crop chooses is the frame that shows: the run of the line, the
// roller section feeding it, and the plant around it.
//
// Two earlier cuts of this same plant stood here: Photo/jasa-onsite.jpg (596px,
// soft) and Photo/hero-left-2.jpg (720px, but its best window was a vest and a
// bare belt rail). left-1.jpeg is the same hall shot wide enough to show the
// line as a line.
//
// This is the one plate in the band that IS upscaled past its source width, and
// deliberately. The band renders at about 600 CSS px, so at native width a 2x
// screen resamples it in the browser with no sharpening and this frame — a
// compressed phone video still, soft to begin with — read as visibly blurry.
// Resampling to 2x with lanczos3 plus an unsharp pass adds no detail, but it
// puts the sharpening under our control instead of the browser's, and the
// result holds an edge at retina density. q88 rather than 78 because the
// sharpen pass gives the encoder ringing to chew on at lower quality.
await sharp(`${B}/Photo/left-1.jpeg`)
  .rotate()
  .extract({ left: 0, top: 470, width: 720, height: 360 })
  .resize({ width: 1440, kernel: 'lanczos3' })
  .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.2 })
  .webp({ quality: 88 })
  .toFile(`${OUT}/onsite-teknisi.webp`)

const m = await sharp(`${OUT}/onsite-teknisi.webp`).metadata()
console.log('onsite-teknisi'.padEnd(18), `${m.width}x${m.height}`)
