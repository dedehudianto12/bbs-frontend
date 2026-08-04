import sharp from 'sharp'
const [,, src, out, w] = process.argv
const m = await sharp(src).rotate().metadata()
console.log(src.split('/').pop(), m.width + 'x' + m.height)
await sharp(src).rotate().resize({ width: Number(w) || 900 }).jpeg({ quality: 78 }).toFile(out)
