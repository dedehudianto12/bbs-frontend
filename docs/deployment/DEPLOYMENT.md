# DEPLOYMENT.md — Deployment & Infrastructure

This document defines how the project should be deployed.

Deployment should remain simple, reliable, and automated.

The project is a static/content-driven Nuxt application powered by Nuxt Studio.

There is no backend service.

---

# Deployment Philosophy

This project follows:

Git → Vercel → Production

Never deploy manually.

Git is always the source of truth.

---

# Infrastructure

Frontend

Nuxt 4

Content

Nuxt Studio

Hosting

Vercel

Version Control

GitHub

Images

Nuxt Studio Assets

Optional

Cloudinary

---

# Deployment Flow

```

Developer

↓

Git Push

↓

GitHub

↓

Vercel Build

↓

Production

```

Every merge into the production branch should automatically trigger deployment.

---

# Branch Strategy

main

Production

develop

Development

feature/\*

Feature branches

bugfix/\*

Bug fixes

Never develop directly on main.

---

# Preview Deployments

Every Pull Request should create

a Preview Deployment.

Purpose

- QA
- Client Review
- Internal Testing

Never merge code without reviewing the preview deployment.

---

# Environment

Production

```

main

```

Preview

```

Pull Request

```

Development

```

local

```

Never mix environments.

---

# Environment Variables

Only keep variables that are actually required.

Examples

```

NUXT_SITE_URL

NUXT_PUBLIC_SITE_URL

NUXT_STUDIO_TOKEN

```

Avoid unnecessary environment variables.

Never expose secrets through public runtime config.

---

# Domains

Primary

```

bbsconveyor.com

```

Optional

```

www.bbsconveyor.com

```

Always redirect

www

↓

root domain

or vice versa.

Only one canonical domain should exist.

---

# SSL

HTTPS is mandatory.

Never deploy without SSL.

Force HTTPS redirects.

---

# Images

Images should be optimized automatically.

Always use

```

<NuxtImg>

```

Preferred formats

- WebP
- AVIF

Fallback

JPEG

Never upload extremely large images.

Recommended

under 500 KB

Maximum

2 MB

---

# Static Assets

Place non-editable assets inside

```

public/

```

Editable assets belong in

Nuxt Studio Assets.

Never mix them.

---

# Build Rules

Production builds must

- complete successfully
- have no TypeScript errors
- have no lint errors
- have no broken routes

Build failures must block deployment.

---

# Content Deployment

Content updates made through Nuxt Studio should

commit to Git

↓

trigger deployment

↓

publish automatically

Editors should never need to manually redeploy.

---

# Caching

Enable

Static asset caching

Image caching

CDN caching

Do not aggressively cache HTML.

Fresh content should become visible after deployment.

---

# Compression

Enable

- Brotli
- Gzip

whenever supported.

---

# Sitemap

Generate automatically during build.

Include

- Products
- Services
- Industries
- Blog
- Pages

Exclude

- Drafts
- Preview routes
- Error pages

---

# Robots

Automatically generate robots.txt

Production

Allow indexing.

Preview

Disallow indexing.

---

# Analytics

Supported

Google Analytics

Google Search Console

Microsoft Clarity

Plausible

Analytics should not block page rendering.

Load analytics after the page becomes interactive.

---

# Monitoring

Monitor

Deployment failures

Broken links

404 pages

Core Web Vitals

Lighthouse

SEO

Accessibility

---

# Backup

GitHub is the primary backup.

Content should always exist inside Git.

Never store critical business content only in local files.

---

# Rollback

If deployment fails

Rollback using

previous successful deployment

inside Vercel.

Never manually edit production files.

---

# Performance Targets

Lighthouse

Performance

95+

SEO

100

Accessibility

95+

Best Practices

95+

---

# Security

Never expose

tokens

API keys

private URLs

inside source code.

Always use environment variables.

Keep dependencies updated.

---

# Nuxt Studio Setup

## How Nuxt Studio Works

Nuxt Studio is a hosted CMS that connects directly to your GitHub repository.

No npm module or plugin is required beyond `@nuxt/content`.

Studio reads `content.config.ts` to discover collections and their schemas, then provides a visual editor for all content files in the `content/` directory.

## Connecting a Project

1. Push the project to a GitHub repository.
2. Go to [nuxt.studio](https://nuxt.studio) and sign in with GitHub.
3. Import the repository — Studio auto-detects `@nuxt/content` and `content.config.ts`.
4. Grant read/write access to the `content/` directory.

## Editing Content

- Navigate to any collection in the Studio sidebar.
- Edit frontmatter fields using the form UI (auto-generated from Zod schemas).
- Edit Markdown body with the built-in editor.
- Upload images via Studio Assets.
- Changes are committed directly to the GitHub repository.
- Each commit triggers a Vercel redeploy automatically.

## Collections Auto-Discovery

Studio discovers collections from `content.config.ts`:
- `type: 'page'` → Markdown files with frontmatter + body
- `type: 'data'` → YAML/JSON configuration files
- `source` glob → determines which files belong to the collection
- `schema` (Zod) → generates the form UI and validates input

## Adding a New Collection

1. Add a new `defineCollection()` entry in `content.config.ts`.
2. Create the corresponding directory under `content/` (e.g., `content/team/`).
3. Add a `.md` or `.yml` file as a starting template.
4. Push to GitHub — Studio picks up the new collection automatically.

No Vue component changes are needed for data-only additions. If the new collection needs to be displayed on the website, update the relevant page component to query it via `queryCollection()`.

## Local Development

```bash
npm install
npm run dev
```

Content edits made locally in `content/` are reflected immediately (HMR).

Edits made in Nuxt Studio are committed to Git — pull before starting local work to avoid conflicts.

## Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `NUXT_SITE_URL` | Canonical site URL for sitemap | Production only |
| `NUXT_STUDIO_TOKEN` | Studio API token (auto-managed by Studio) | No — Studio handles this |

# Agent Workflow

Before deployment

Verify

✓ Build succeeds

✓ No console errors

✓ Images optimized

✓ Metadata exists

✓ Sitemap generated

✓ Robots generated

✓ No broken links

✓ No TypeScript errors

✓ No lint errors

After deployment

Verify

Homepage

Products

Services

Industries

Blog

Contact

404 page

Mobile responsiveness

---

# Things the Agent Must Never Do

Do not deploy from local builds.

Do not commit secrets.

Do not bypass CI/CD.

Do not manually edit production files.

Do not disable HTTPS.

Do not publish broken builds.

Always use automated deployments.
