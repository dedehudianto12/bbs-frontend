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
  //
  // The Photo/ batch carries this same splice as a 2254px plate, so it is used
  // here instead of the 900px `site joint belt.jpeg` that shipped first. That
  // trades the old frame's one advantage — it was the only unwatermarked one —
  // for 2.5x the width on the largest photograph on the site. Worth it: the
  // watermark is centre-weighted and this scene is bright and busy enough that
  // it lands almost invisibly, where on a flat belt it would read as a stamp.
  //
  // Cropped 3:4 off the empty ceiling: portrait fills the masthead's tall
  // right-hand column, and the 3:2 object-cover the page falls back to on
  // mobile still lands on the press. Height stops at 2836 + the 336 top offset,
  // clear of the white "© property of" strip at the foot of every plate.
  ['Photo/Untitled11_20260805150756.png', 'jasa-site-splice', {
    crop: { left: 202, top: 336, width: 1875, height: 2500 }, // 3:4
    width: 1200,
  }],

  // ── Survei & ukur: tape measure against a live conveyor at a mill.
  // Cut 3:2 rather than 4:3, and started higher up the plate: the page frames
  // this one at 3:2, so a 4:3 plate lost 100px to object-cover and the crop
  // took the surveyor's helmet with it. At 3:2 the frame is the photograph,
  // and he stands in it head to boots.
  ['Activity foto/Untitled11_20260731113700.png', 'jasa-ukur', {
    crop: { left: 0, top: 600, width: 2254, height: 1503 }, // 3:2
    width: 1200,
  }],


  // ── Profile guide: a technician running a hot-air welder along a green
  // guide laid on a white PVC belt, rolls of belt stock behind him. Supplied by
  // the client in the Photo/ batch, replacing the rig-only frame.
  //
  // 960x1280 portrait against a 4:3 plate, so 560 rows have to go and the only
  // question is which. Both ends carry something: his hard hat is at the top of
  // the source, the welder and the guide strip at the bottom. top=60 is the one
  // window that holds both — the helmet stays whole and the tool clears the
  // foot of the frame. Anchored any higher and the guide, which is the service
  // this plate is illustrating, is half cut off by the bottom edge.
  ['Photo/guide-profile.jpg', 'jasa-guide', {
    crop: { left: 0, top: 60, width: 960, height: 720 }, // 4:3
    width: 960,
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


  // ── Reparasi: welding up a curved conveyor frame on the workshop floor,
  // arc lit, the frame's whole sweep across the plate. Supplied by the client
  // in the Photo/ batch, replacing the `sushi conveyer` grinding frame.
  //
  // Same shape as jasa-onsite below: a 720x1544 phone screenshot letterboxed
  // black, content rows 132–1411. Cropped 4:3 from y=480 so the welder sits at
  // the arc and the empty yellow floor at the foot is dropped. 720 wide, its
  // own — see the width note at the top of this file.
  ['Photo/jasa-reparasi.jpg', 'jasa-reparasi', {
    crop: { left: 0, top: 480, width: 720, height: 540 }, // 4:3
    width: 720,
  }],

  // ── Onsite joint: two technicians closing the portable press on a blue belt
  // inside a food plant, hairnets and gowns on, the line's own control box and
  // crates behind them. Supplied by the client, replacing the 596px phone video
  // frame of the finished tube line — this is a still, 2254px, and it shows the
  // work rather than its result.
  //
  // 4:3 off a 2254x2994 watermarked plate, so 1300 rows have to go and the
  // frame cannot hold both the near tech's hairnet and the foot of the press:
  // 580→2544 is 1964 tall and 4:3 at that height needs more width than the
  // plate has. The press wins — it is the service. top=850 takes the top of his
  // cap and keeps the tool whole, both faces, and the belt. The bottom stops at
  // 2540, clear of the white "© property of" strip at y≈2830.
  ['Photo/onside-joint.png', 'jasa-onsite', {
    crop: { left: 0, top: 850, width: 2254, height: 1690 }, // 4:3
    width: 1200,
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
