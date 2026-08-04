import sharp from 'sharp'
const [,, src, out, deg, w] = process.argv
await sharp(src).rotate(Number(deg)).resize({ width: Number(w) }).jpeg({quality:78}).toFile(out)
const m = await sharp(out).metadata(); console.log(out.split('/').pop(), m.width+'x'+m.height)
