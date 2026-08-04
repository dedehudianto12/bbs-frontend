import sharp from 'sharp'

// Photographs for the Jasa page, cut from the client's own site-activity set.
//
// The Untitled11_* PNGs are 2254×2994 watermarked plates: the photograph fills
// the width and runs to y≈2790, below which is a white strip carrying the "©
// property of CV Bintang Berjaya Satu" line. Every crop stops short of that
// strip. 113516 is the odd one — its composition is rotated inside the plate,
// so the strip sits on the left edge and rotate(-90) lands it at the foot.
//
// Widths are capped at the source's own: several of these are 720–960px phone
// frames, and upscaling to 1400 buys nothing but bytes.

const B = '/mnt/c/Users/ThinkPad/Documents/BBS'
const OUT = 'public/images'

/** @type {[string, string, {rotate?: number, crop: {left:number,top:number,width:number,height:number}, width?: number}][]} */
const JOBS = [
  // ── Masthead: an on-site splice at a food plant, two techs feeding a blue
  // belt through the portable press. Replaces the 113516 survey briefing, where
  // the engineer's gesturing hand was motion-blurred right at the focal point.
  // Native 900px and no watermark — the only frame in the set that is both — so
  // it is kept at source width rather than upscaled. Cropped 3:4 off the empty
  // ceiling: portrait fills the masthead's tall right-hand column, and the 3:2
  // object-cover the page falls back to on mobile still lands on the press.
  ['Activity foto/site joint belt.jpeg', 'jasa-site-splice', {
    crop: { left: 0, top: 350, width: 900, height: 1200 }, // 3:4
    width: 900,
  }],

  // ── Survei & ukur: tape measure against a live conveyor at a mill.
  ['Activity foto/Untitled11_20260731113700.png', 'jasa-ukur', {
    crop: { left: 0, top: 820, width: 2254, height: 1690 }, // 4:3
    width: 1200,
  }],


  // ── Profile guide: the guide-welding rig laying a green V-guide onto a PVC
  // belt. The one photograph on the site that shows that service being done.
  ['Activity foto/Untitled11_20260731112833.png', 'jasa-guide', {
    crop: { left: 0, top: 500, width: 2254, height: 1690 }, // 4:3
    width: 1200,
  }],

  // ── Cold joint: the splice clipped and squared on the bench before bonding.
  ['Activity foto/Untitled11_20260730171438.png', 'jasa-coldjoint', {
    crop: { left: 0, top: 900, width: 2254, height: 1690 }, // 4:3
    width: 1200,
  }],

  // ── Workshop floor: the crew handling a green diamond-top belt.
  ['Activity foto/Untitled11_20260730171536.png', 'jasa-workshop', {
    crop: { left: 0, top: 1000, width: 2254, height: 1503 }, // 3:2
    width: 1200,
  }],

  // ── Incline in service: sidewall/cleat buckets climbing a guarded incline.
  ['Activity foto/penyambungan lokasi incline.jpeg', 'jasa-incline', {
    crop: { left: 0, top: 300, width: 1127, height: 845 }, // 4:3
    width: 1127,
  }],


  // ── Reparasi: rebuilding a stainless conveyor frame, grinder in hand.
  ['Activity foto/sushi conveyer.jpeg', 'jasa-reparasi', {
    crop: { left: 0, top: 180, width: 720, height: 540 }, // 4:3
    width: 720,
  }],

  // ── Onsite joint: the finished line running product at the customer's plant.
  ['Activity foto/penyambungan belt yogurt.jpeg', 'jasa-onsite', {
    crop: { left: 0, top: 330, width: 720, height: 540 }, // 4:3
    width: 720,
  }],

  // ── Hot joint: the heated platen of the press, seen down its length.
  ['Random/item5.jpeg', 'jasa-hotjoint', {
    crop: { left: 0, top: 350, width: 960, height: 720 }, // 4:3
    width: 960,
  }],
]

for (const [src, name, opt] of JOBS) {
  const base = opt.rotate ? sharp(`${B}/${src}`).rotate(opt.rotate) : sharp(`${B}/${src}`).rotate()
  await base
    .extract(opt.crop)
    .resize({ width: opt.width, kernel: 'lanczos3' })
    .webp({ quality: 78 })
    .toFile(`${OUT}/${name}.webp`)
  const m = await sharp(`${OUT}/${name}.webp`).metadata()
  console.log(name.padEnd(22), `${m.width}x${m.height}`)
}
