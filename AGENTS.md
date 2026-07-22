# AGENTS.md — BBS Conveyor Website

This document is the single source of truth for every AI coding agent working on this project.

Read this file completely before making any changes.

---

# 1. Project Overview

## Business

**Company**
CV Bintang Berjaya Satu (BBS Conveyor)

**Tagline**

Connecting Power and Motion to Drive Industrial Excellence

**Industry**

Industrial Conveyor Supplier

- Belt Conveyor
- Conveyor Components
- Industrial Rollers
- Conveyor Engineering
- Installation Services

---

## Project Goal

Rebuild the old WordPress website into a modern, fast, SEO-friendly B2B company profile.

This website is primarily content-driven.

Content is managed using **Nuxt Studio**.

The website should feel premium, modern, trustworthy, and lightweight.

---

## Target Users

### Visitor

Industrial companies looking for:

- conveyor products
- engineering services
- industrial solutions

### Content Editor

Internal BBS staff.

Editors should be able to update content without touching code.

---

# 2. Architecture

This project follows a **Content-First Architecture**.

Nuxt Studio is the source of truth.

There is **no backend API** for managing content.

```
Nuxt Studio
      │
      ▼
Nuxt Content
      │
      ▼
Nuxt Website
      │
      ▼
Vercel
```

Never introduce an unnecessary backend.

---

# 3. Tech Stack

| Layer              | Technology                               |
| ------------------ | ---------------------------------------- |
| Framework          | Nuxt 4                                   |
| CMS                | Nuxt Studio                              |
| Content            | Nuxt Content                             |
| Styling            | Tailwind CSS                             |
| Images             | Nuxt Studio Assets (Cloudinary optional) |
| Validation         | Zod                                      |
| Hosting            | Vercel                                   |
| Image Optimization | Nuxt Image                               |

---

# 4. Folder Structure

```
app/
components/
content/
layouts/
pages/
assets/
public/
types/
utils/
content.config.ts
```

Inside content:

```
content/

products/

services/

industries/

blog/

pages/
```

Never place dynamic content inside `/assets`.

All editable content belongs inside `/content`.

---

# 5. Content Collections

## Products

Fields

- title
- slug
- category
- thumbnail
- gallery
- excerpt
- body
- featured
- order

---

## Services

Fields

- title
- slug
- thumbnail
- excerpt
- body

---

## Industries

Fields

- title
- slug
- icon
- description

---

## Blog

Fields

- title
- slug
- thumbnail
- excerpt
- author
- publishedAt
- tags
- body

---

## Pages

Examples

- About
- Contact
- Privacy Policy
- Terms

Fields

- title
- body

---

# 6. Homepage

Homepage content should also be editable.

Create collections for:

Hero

Why Choose Us

Company Information

CTA

SEO

Homepage layout should remain fixed.

Only content is editable.

Never allow editors to modify layout.

---

# 7. Routing

Products

/products

/products/[slug]

Services

/services

/services/[slug]

Industries

/industries/[slug]

Blog

/blog

/blog/[slug]

Pages

/about

/contact

---

# 8. Components

Components must remain reusable.

Prefer composition over duplication.

Examples

ProductCard

ProductGrid

IndustryCard

BlogCard

SectionTitle

CTASection

HeroSection

Do not couple components to specific pages.

---

# 9. Design System

Color palette comes from the official BBS Conveyor logo.

Never hardcode colors.

Use CSS variables.

Gold is an accent color only.

Do not create large gold backgrounds.

Spacing should feel generous.

Use plenty of white space.

Typography should prioritize readability.

Animations should be subtle.

Avoid flashy effects.

---

# 10. Coding Standards

Always use

```
<script setup lang="ts">
```

Never use

```
any
```

Use Zod schemas.

Use composables when logic is reused.

Prefer server components and SSR where appropriate.

Do not fetch content manually if Nuxt Content already provides it.

---

# 11. Content Rules

Content is loaded only through Nuxt Content.

Never create REST endpoints for:

Products

Articles

Services

Industries

Pages

Use queryCollection() and Nuxt Content utilities.

---

# 12. Images

Dynamic images belong to Nuxt Studio Assets.

Use

```
<NuxtImg>
```

instead of

```
<img>
```

whenever possible.

Optimize every image.

---

# 13. SEO

Every public page must include

- title
- description
- Open Graph image
- canonical URL

Generate metadata from content whenever possible.

Blog articles should support:

- published date
- author
- reading time
- tags

---

# 14. Performance

The website should prioritize

- SEO
- Accessibility
- Core Web Vitals

Avoid unnecessary JavaScript.

Prefer server rendering.

Keep Lighthouse scores above

Performance ≥ 95

SEO ≥ 100

Accessibility ≥ 95

Best Practices ≥ 95

---

# 15. Deployment

Production hosting

Vercel

Content Management

Nuxt Studio

Deployment should remain automatic.

Git is the source of truth.

---

# 16. Agent Workflow

Before making code changes

1. Analyze the existing implementation.

2. Explain what will change.

3. Explain why.

4. Produce a migration plan.

5. Wait for approval if the refactor is large.

Never perform massive refactors without explaining them first.

---

# 17. Things the Agent Must Never Do

Do not introduce a backend unless explicitly requested.

Do not introduce a database for content.

Do not duplicate content.

Do not hardcode business data inside Vue components.

Do not fetch content through REST APIs.

Do not redesign existing UI unless requested.

Do not introduce large UI frameworks.

Do not install unnecessary dependencies.

Do not create tightly coupled components.

Always keep the project modular, maintainable, and content-driven.
