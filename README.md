# BBS Conveyor — frontend

Marketing site for **CV Bintang Berjaya Satu** (BBS Conveyor), a supplier of belt
conveyors, rollers, and material-handling components based in Cakung, East
Jakarta.

Nuxt 4 · Vue 3 · Tailwind 3 · deployed to Cloudflare Pages. All copy is Bahasa
Indonesia.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Cloudflare Pages output in dist/
npm run preview
```

The backend API runs separately. Copy `.env.example` to `.env`:

```
NUXT_PUBLIC_API_BASE=http://localhost:8080/api
```

**Use the absolute URL, not `/api`.** A relative base cannot be resolved during
server-side rendering — `nitro.devProxy` only rewrites requests made by the
browser — so with `/api` every page renders its loading skeleton on the server
and fills in only after hydration. That hides SSR bugs during development and
makes the site look broken with JavaScript disabled.

## Content

Everything under produk, jasa, artikel, industri and galeri comes from the
backend and is edited through the admin panel at `/admin`. Product photos,
gallery entries and articles are all uploaded there; nothing is hardcoded.

Static copy not worth a database round trip lives in `data/` — `homepage.ts` for
hero and section copy, `contact.ts` for phone numbers, address and marketplace
links, `navigation.ts` for the menus.

## Ground rules

These are load-bearing. The codebase has been cleaned of violations more than
once, and each fix is documented where it happened.

**No fabricated data.** Every number, spec, certification and client name shown
to a user must come from the backend or from the client in writing. A homepage
statistics block, a growth chart, a company timeline and three hero spec
callouts have all been deleted for failing this. Where data is missing, design
around its absence honestly rather than inventing a placeholder that looks real.

**Motion.** One easing curve for the whole system —
`--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, mirrored as `EASE_OUT_CSS` in
`utils/motion.ts`. Do not add a second, near-identical one.

- Never `transition: all`. Name the properties.
- Gate hover behind `@media (hover: hover) and (pointer: fine)` — touch devices
  fire `:hover` on tap and leave elements stuck. Tailwind's `hover:` variants
  are already gated via `hoverOnlyWhenSupported`.
- Handle `prefers-reduced-motion` on every animation.
- Give anything clickable an `:active` state.

**Geometry.** Border radius is pinned to 0 across the public surface, including
focus rings.

**Type.** JetBrains Mono is reserved for datasheet keys, values and numerals —
`.spec-key`, `.spec-val`, `.num`. Never prose, never eyebrows.

**WhatsApp.** Every conversion terminates in WhatsApp; there is no lead
endpoint. Build links with `waLink()` from `utils/whatsapp.ts` and always pass a
`WaContext`, so the prefilled message tells sales which page and product the
click came from. Never hand-write a `wa.me` URL.

**Mobile first, literally.** The primary device is a mid-range Android at 360px.
Check that width before the desktop grid.

## Layout notes

`.frame` is the framed page column — `max-w-6xl` with continuous 1px side
borders. Hairline grids are built with `gap-px` over a background in the border
colour, so the gutters *are* the borders.
