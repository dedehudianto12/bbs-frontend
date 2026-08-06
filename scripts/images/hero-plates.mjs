import sharp from 'sharp'

// Frames for the hero plate on the homepage.
//
// H+0 and H+1 are cut here. The last two predate this file and are kept as they
// are; if either is ever recut, add it alongside rather than reaching for the
// original ad-hoc command.
//
// Every frame the plate cross-fades is 0.612 portrait — HeroSection hardcodes
// width="1120" height="1829" on the <img>, and those attributes reserve the box
// by ratio, not by pixel count. So a frame may differ in size from its siblings
// as long as the ratio matches, which is what lets this one stay at its native
// width instead of being stretched up to 1120.

const B = '/mnt/c/Users/ThinkPad/Documents/BBS/Photo'
const OUT = 'public/images/hero'

// ── H+0, survei: a surveyor in hi-vis and hard hat working a clipboard over a
// customer's belt, the line running away from the camera and the rest of the
// crew at work behind him. The one frame in the hero that shows a person doing
// the job rather than a machine doing it.
//
// The crop is set by where he stands, not by the composition. He runs y=465 to
// y=2451 of the 2836 usable rows — 70% of the plate's height — and the mobile
// cell is 4:3 landscape against a 0.612 portrait plate, so it shows 46% of
// those rows. There is no crop of this photograph that puts a standing figure
// whole inside a landscape cell: the full-height person needs a frame 2648px
// wide at 4:3 and the source is 2254. So the crop maximises what is around
// him instead — full 2836 rows, no vertical trim at all — and homepage.ts
// anchors high (`50% 20%`) so his head clears the top edge in every cell shape
// the figure takes. The frame cuts him at the chest on a phone, at the chest
// on a tablet, and below the knee on desktop; it never cuts his head.
//
// x=518 is the only band that works: the window is 1736 wide and he ends at
// x=2226, so anything left of 518 clips his arm and anything right of it runs
// past the plate's own edge.
await sharp(`${B}/hero-2.png`)
  .rotate()
  .extract({ left: 518, top: 0, width: 1736, height: 2836 })
  .resize({ width: 1120, kernel: 'lanczos3' })
  .webp({ quality: 80 })
  .toFile(`${OUT}/hero-2-survei.webp`)

// ── H+1, pengukuran: a tape measure laid across a black rubber belt on the
// press bed, reading 20cm where the belt edge meets the aluminium clamp bar.
// Replaces hero-1-survei.webp, the hi-vis surveyor against a plant conveyor.
//
// The source is 1446×1407 — near square, against a plate that wants 0.612
// portrait — so full height is the binding constraint and 584px of width has
// to go. It comes off the left. Cropping from x=292 keeps the tape running
// corner to corner, lands the red 20 on the belt edge rather than in dead
// rubber, and brings the clamp bar and its bolts into the right edge. It also
// pushes out the blue crate on the far left and the photographer's dark glove
// on the far right, which are the only two things in the frame that read as
// clutter instead of as the job.
//
// Not resized. 862 wide is under the 1120 of the other three, but upscaling a
// phone frame buys bytes and no detail — same call as the jasa plates.
await sharp(`${B}/hero-big-measure.jpg`)
  .rotate()
  .extract({ left: 292, top: 0, width: 862, height: 1407 })
  .webp({ quality: 80 })
  .toFile(`${OUT}/hero-1-ukur.webp`)

for (const name of ['hero-2-survei', 'hero-1-ukur']) {
  const m = await sharp(`${OUT}/${name}.webp`).metadata()
  console.log(name.padEnd(14), `${m.width}x${m.height}`, (m.width / m.height).toFixed(4))
}
