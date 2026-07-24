# Nuxt Studio Setup

## Overview

Nuxt Studio is the visual CMS/editor for `@nuxt/content`. It gives editors a UI to create, edit, and publish markdown content directly in production without touching Git.

- **Module:** `nuxt-studio` v1.7.0
- **Docs:** https://nuxt.studio

## Packages Installed

- `nuxt-studio` ^1.7.0 — the CMS module (already present)

## Configuration Changes

### nuxt.config.ts

Added a `studio` block:

```ts
studio: {
  route: "/_studio",
  repository: {
    provider: "github",
    owner: process.env.STUDIO_REPO_OWNER || "dedehudianto12",
    repo: process.env.STUDIO_REPO_NAME || "bbs-frontend",
    branch: process.env.STUDIO_REPO_BRANCH || "main",
    private: true,
  },
}
```

All repository values fall back to env vars so nothing is hardcoded in production.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `STUDIO_GITHUB_CLIENT_ID` | ✅ Production | GitHub OAuth App Client ID |
| `STUDIO_GITHUB_CLIENT_SECRET` | ✅ Production | GitHub OAuth App Client Secret |
| `STUDIO_REPO_OWNER` | No | Override repo owner (default: `dedehudianto12`) |
| `STUDIO_REPO_NAME` | No | Override repo name (default: `bbs-frontend`) |
| `STUDIO_REPO_BRANCH` | No | Override branch (default: `main`) |

### Creating the GitHub OAuth App

1. Go to https://github.com/settings/developers → **New OAuth App**
2. Fill in:
   - **Application name:** BBS Conveyor Studio
   - **Homepage URL:** `https://bbsconveyor.com`
   - **Authorization callback URL:** `https://bbsconveyor.com/_studio/auth/github`
3. Copy the **Client ID** and **Client Secret** into your deployment env vars.

## How Editors Use Nuxt Studio

1. Deploy the site with SSR (`nuxt build` — Vercel recommended).
2. Navigate to `https://bbsconveyor.com/_studio`.
3. Sign in with GitHub (must be a collaborator on the repository).
4. The Studio UI shows all content collections from `content.config.ts`:
   - **Blog** — create/edit articles with form-based frontmatter + markdown body
   - **Products** — manage product pages, specs, gallery
   - **Services** — manage service pages
   - **Industries** — manage industry pages
   - **Gallery** — manage gallery entries
   - **Pages** — static pages (Tentang Kami, Kontak)
   - **Homepage Config** — edit `content/config/homepage.yml` via form
   - **Navigation** — edit `content/config/navigation.yml` via form
5. Edits are committed directly to the `main` branch → CI/CD deploys the changes.

### Local Development

Run `npm run dev` — a floating edit button appears bottom-left. File changes sync to the local filesystem in real time. No auth needed. Use `git` to commit.

## Deployment Notes

- **Must use SSR** (`nuxt build`, not `nuxt generate`). Studio needs server routes for auth.
- **Vercel:** works out of the box with `nuxt build`.
- Git integration commits to `main` branch by default. Make sure CI/CD deploys on push to `main`.

## Collections Schema

All collections in `content.config.ts` use Zod schemas. Studio auto-generates form fields from these schemas. The current collections:

| Collection | Source | Type |
|---|---|---|
| `products` | `products/*.md` | page |
| `services` | `services/*.md` | page |
| `industries` | `industries/*.md` | page |
| `blog` | `blog/*.md` | page |
| `gallery` | `gallery/*.md` | page |
| `pages` | `pages/*.md` | page |
| `homepage` | `homepage/*.md` | page |
| `homepageConfig` | `config/homepage.yml` | data |
| `navigation` | `config/navigation.yml` | data |

## Cloudinary (Future)

Image fields (`thumbnail`, `image`, `gallery[]`, `ogImage`) are already typed as URL strings — compatible with Cloudinary external URLs. When Cloudinary integration is added:

- Upload images via Cloudinary widget
- Store the returned URL in the frontmatter field
- No schema changes needed

Recommended blog frontmatter:

```yaml
---
title: string
description: string
cover: string          # Cloudinary URL
publishedAt: string    # ISO date
category: string
tags: string[]
---
```
