# Image source masters

SVG masters for the raster assets in `public/`. The site is illustration-only
(no photography) — regenerate the exports from these files, don't edit the
rasters directly.

| Master | Export | Used by |
| --- | --- | --- |
| `logo.svg` | `public/logo.png` (512×512) | schema.org `logo` in `nuxt.config.ts` |
| `og-home.svg` | `public/images/og-home.webp` (1200×630) | `ogImage` (homepage meta + `content/homepage/seo.md`) |
| `hero-conveyor.svg` | `public/images/hero-conveyor.webp` (1600×900) | `content/homepage/hero.md` |

Regenerate with sharp (not a project dependency — install anywhere and point at it):

```sh
npm i sharp --prefix /tmp/svg-export
node -e "
const sharp = require('/tmp/svg-export/node_modules/sharp')
;(async () => {
  await sharp('assets/images/logo.svg').png().toFile('public/logo.png')
  await sharp('assets/images/og-home.svg').webp({ quality: 92 }).toFile('public/images/og-home.webp')
  await sharp('assets/images/hero-conveyor.svg').webp({ quality: 92 }).toFile('public/images/hero-conveyor.webp')
})()"
```

Note: the OG/wordmark text uses `DejaVu Sans` because that's what the export
environment had installed; swap to Inter in the SVG if the export host has it.
