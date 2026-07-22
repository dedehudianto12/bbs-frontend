# CONTENT.md — Content Architecture

This document defines how content is organized throughout the project.

Nuxt Studio is the source of truth.

All editable content must live inside the `/content` directory.

Never hardcode business content inside Vue components.

---

# Philosophy

This project follows a **Content-First Architecture**.

Content should be:

- reusable
- modular
- easy to edit
- SEO friendly
- human readable

Content should never depend on a backend API.

---

# Directory Structure

```
content/

├── products/
├── services/
├── industries/
├── blog/
├── pages/
└── homepage/
```

Every content type should have its own collection.

Never mix unrelated content.

---

# Products

Location

```
content/products/
```

Example

```
content/products/

pvc-conveyor-belt.md

rubber-conveyor-belt.md

roller.md
```

Required fields

```yaml
title:
slug:
category:
thumbnail:
gallery:
excerpt:
featured:
order:
```

Example

```yaml
---
title: PVC Conveyor Belt
slug: pvc-conveyor-belt
category: Belt Conveyor
thumbnail: /products/pvc.jpg

gallery:
  - /products/pvc-1.jpg
  - /products/pvc-2.jpg

excerpt: High quality PVC conveyor belt for industrial applications.

featured: true

order: 1
---
```

Markdown body

```
Overview

Applications

Benefits

Technical Information

Call To Action
```

---

# Services

Location

```
content/services/
```

Required fields

```yaml
title:
slug:
thumbnail:
excerpt:
order:
```

Recommended body

```
Overview

Benefits

Process

Why Choose BBS

CTA
```

---

# Industries

Location

```
content/industries/
```

Required fields

```yaml
title:
slug:
icon:
thumbnail:
excerpt:
order:
```

Body should explain

- Industry challenges
- How BBS helps
- Recommended products
- CTA

---

# Blog

Location

```
content/blog/
```

Required fields

```yaml
title:
slug:
thumbnail:
excerpt:
author:
publishedAt:
tags:
featured:
```

Example

```yaml
---
title: How to Maintain Conveyor Belts
slug: maintain-conveyor-belt

author: BBS Conveyor

publishedAt: 2026-07-22

thumbnail: /blog/maintenance.jpg

tags:
  - Maintenance
  - Conveyor

featured: false
---
```

Recommended article structure

```
Introduction

Problem

Solution

Best Practices

Conclusion

CTA
```

---

# Static Pages

Location

```
content/pages/
```

Examples

```
about.md

contact.md

privacy-policy.md

terms.md
```

Fields

```yaml
title:
description:
```

---

# Homepage

Location

```
content/homepage/
```

Homepage should not be hardcoded.

Create collections for

Hero

Company

Why Choose Us

Statistics

Featured Products

Featured Services

Featured Articles

CTA

SEO

---

## Hero

```
hero.md
```

Fields

```yaml
headline:
subheadline:

primaryCTA:
primaryLink:

secondaryCTA:
secondaryLink:

image:
```

---

## Company

Fields

```yaml
companyName:

tagline:

description:
```

---

## Statistics

Fields

```yaml
projects:

years:

clients:

engineers:
```

---

## Why Choose Us

Instead of hardcoding cards, create a list.

Example

```yaml
items:
  - title:
    description:
    icon:

  - title:
    description:
    icon:
```

---

## CTA

Fields

```yaml
headline:

description:

buttonText:

buttonLink:
```

---

# Images

Images should be stored in Nuxt Studio Assets.

Never store image URLs inside Vue components.

Reference images only from content.

Use

```
<NuxtImg>
```

whenever possible.

---

# Slugs

Every public content must have a slug.

Slug rules

- lowercase
- kebab-case
- unique
- immutable

Good

```
pvc-conveyor-belt
```

Bad

```
PVC Conveyor Belt
```

---

# SEO

Every public content should include

```yaml
seo:
  title:

  description:

  ogImage:
```

Do not duplicate titles.

Descriptions should be concise.

---

# Ordering

Do not sort content manually inside Vue components.

Every collection should expose

```yaml
order:
```

Sorting should use this field.

---

# Featured Content

Use

```yaml
featured:
```

instead of hardcoding homepage items.

Homepage should automatically load

- featured products
- featured blog articles
- featured services

---

# Rich Content

Long-form content should use Markdown.

Never store HTML inside frontmatter.

Use headings correctly.

Example

```
#

##

###

```

Avoid skipping heading levels.

---

# Naming Convention

Files

```
kebab-case.md
```

Images

```
kebab-case.webp
```

Collections

Plural

```
products

services

industries

blog

pages
```

---

# Content Writing Guidelines

Titles

Short.

Clear.

Professional.

Avoid clickbait.

Descriptions

Explain business value first.

Avoid excessive marketing language.

Write for industrial buyers.

---

# Agent Rules

Always create content using the structures defined in this document.

Never invent additional fields unless explicitly required.

Never duplicate information across collections.

Prefer reusable collections over page-specific content.

Content should remain editable through Nuxt Studio without requiring code changes.
