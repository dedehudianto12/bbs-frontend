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

/** @type {[string, string, {rotate?: number, crop: {left:number,top:number,width:number,height:number}, width?: number, quality?: number}][]} */
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

  // ── Incline in service: a green cleated belt seen down the length of the
  // incline, cleats in rank, the crew and the press at the head of the run.
  // Supplied by the client in the Photo/ batch, replacing the older frame.
  //
  // 1200x1600 portrait, so 700 rows go. top=560 is where the near cleats start:
  // above it is only the grey wall and the ceiling lamp's flare, and the crop
  // still reaches the technicians and the portable press at the top of the run.
  ['Photo/incline-cleated.jpeg', 'jasa-incline', {
    crop: { left: 0, top: 560, width: 1200, height: 900 }, // 4:3
    width: 1200,
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

  // ── Hot joint, the method plate: a technician laying up the joint on the
  // press bed, the belt's fingers clipped with binder clips before the platen
  // comes down. Client-supplied, and it is now the Hot joint card's photograph;
  // the red platen frame above (jasa-hotjoint) moved to the Cold joint card
  // when the two were found swapped. The filenames are crossed as a result —
  // the card each file feeds is named in data/services.ts, which is the only
  // place the pairing is decided.
  //
  // 1204x1600 portrait cut 4:3 at top=349: that band holds both hands, the
  // clipped joint and the press plate, and drops the empty floor the lower
  // third is made of.
  ['Photo/hot-joint.jpeg', 'jasa-joint-hot', {
    crop: { left: 0, top: 349, width: 1204, height: 903 }, // 4:3
    width: 1200,
    quality: 82,
  }],

  // ── Lokasi pengerjaan, left: a technician measuring an installed belt in the
  // customer's line. Replaces jasa-ukur.webp.
  //
  // A 720x1600 phone screenshot letterboxed black, content rows 132–1411. The
  // section renders 3:2, not the 4:3 the plates above use, so the crop is
  // 720x480 from y=330 — high enough to keep the whole hard hat, low enough to
  // hold the tape and the belt he is measuring.
  ['Photo/jasa-left.jpg', 'jasa-lokasi-onsite', {
    crop: { left: 0, top: 330, width: 720, height: 480 }, // 3:2
    width: 1200,
    quality: 82,
  }],

  // ── Lokasi pengerjaan, right: two of the crew handling a green PVC belt
  // among the wrapped rolls at Pulo Gebang. Replaces jasa-workshop.webp.
  //
  // 3000x4000, so 2000 rows go. top=1600 keeps the roof trusses that establish
  // the building and lands the crew and the green belt in the lower half where
  // the eye goes; below 3600 is bare floor.
  ['Photo/jasa-right.jpg', 'jasa-lokasi-workshop', {
    crop: { left: 0, top: 1600, width: 3000, height: 2000 }, // 3:2
    width: 1200,
    quality: 82,
  }],
]

for (const [src, name, opt] of JOBS) {
  const base = opt.rotate ? sharp(`${B}/${src}`).rotate(opt.rotate) : sharp(`${B}/${src}`).rotate()
  await base
    .extract(opt.crop)
    .resize({ width: opt.width, kernel: 'lanczos3' })
    .webp({ quality: opt.quality ?? 78 })
    .toFile(`${OUT}/${name}.webp`)
  const m = await sharp(`${OUT}/${name}.webp`).metadata()
  console.log(name.padEnd(22), `${m.width}x${m.height}`)
}
