# SEO.md — Search Engine Optimization Guidelines

This document defines the SEO standards for the project.

Every public page should follow these guidelines.

SEO should be generated automatically whenever possible using Nuxt Content metadata.

---

# SEO Philosophy

The website represents a B2B industrial company.

SEO should prioritize

- Search Intent
- Readability
- Structured Information
- Fast Loading
- Helpful Content

Never optimize only for search engines.

Always write for humans first.

---

# Global SEO

Every page must include

- Title
- Meta Description
- Canonical URL
- Open Graph Image
- Open Graph Title
- Open Graph Description
- Twitter Card

Use Nuxt SEO utilities where appropriate.

Never leave metadata empty.

---

# Title Guidelines

Recommended length

50–60 characters

Format

```

Primary Keyword | BBS Conveyor

```

Examples

Good

```

PVC Conveyor Belt | BBS Conveyor

```

```

Industrial Conveyor Solutions | BBS Conveyor

```

Bad

```

Home

```

```

Welcome

```

Avoid duplicate titles.

---

# Meta Description

Recommended length

140–160 characters

Should explain

- what the page is
- business value
- call to action

Example

```

High quality PVC conveyor belts for industrial applications.
Reliable engineering support from BBS Conveyor.

```

Do not repeat keywords unnaturally.

---

# URL Structure

Use

```

/products/pvc-conveyor-belt

/services/conveyor-installation

/industries/mining

/blog/how-to-maintain-conveyor-belt

```

Rules

- lowercase
- kebab-case
- short
- descriptive

Never include IDs.

---

# Canonical URL

Every page should define a canonical URL.

Avoid duplicate content.

---

# Open Graph

Every page should include

- title
- description
- image

Images should have

Recommended size

1200 × 630

Never use missing images.

---

# Twitter Card

Use

```

summary_large_image

```

---

# Content SEO

Every collection should contain

```

seo:

title:

description:

image:

```

Generate metadata from these fields.

---

# Product Pages

Every product page should include

- Product Name
- Description
- Applications
- Benefits
- CTA

Avoid thin content.

Recommended

500+ words.

---

# Service Pages

Structure

Overview

Benefits

Process

Industries

CTA

---

# Industry Pages

Structure

Overview

Challenges

Solutions

Recommended Products

CTA

---

# Blog Articles

Structure

Introduction

Problem

Solution

Best Practices

Conclusion

CTA

Recommended length

1000–2000 words

Use proper heading hierarchy.

---

# Heading Structure

Use only one

```

<h1>

```

per page.

Hierarchy

```

H1

↓

H2

↓

H3

↓

H4

```

Never skip heading levels.

Bad

```

H1

↓

H4

```

---

# Internal Linking

Every page should link to related content.

Examples

Product

↓

Related Services

↓

Related Industries

↓

Related Articles

Articles should link to

- products
- services
- other articles

Avoid orphan pages.

---

# Images

Every image must include

alt

Example

Good

```

PVC Conveyor Belt installed in food manufacturing plant

```

Bad

```

image1

```

Use descriptive filenames.

Good

```

pvc-conveyor-belt.webp

```

Bad

```

IMG001.jpg

```

Always use

```

<NuxtImg>

```

---

# Structured Data

Implement JSON-LD where appropriate.

Homepage

Organization

Products

Product

Articles

Article

Breadcrumbs

BreadcrumbList

Contact Page

LocalBusiness

---

# Breadcrumbs

Every inner page should display breadcrumbs.

Example

```

Home

↓

Products

↓

PVC Conveyor Belt

```

---

# Sitemap

Generate sitemap automatically.

Include

- products
- services
- industries
- blog
- pages

Exclude

404

Draft content

Private routes

---

# Robots

Allow indexing for

- public pages

Disallow

- admin
- drafts
- previews

---

# Performance

SEO depends on performance.

Optimize

Images

Fonts

JavaScript

CSS

Use lazy loading below the fold.

Avoid layout shift.

---

# Accessibility

SEO and accessibility work together.

Every page should

- use semantic HTML
- have proper labels
- support keyboard navigation
- maintain sufficient contrast

---

# Link Strategy

Internal links should describe their destination.

Good

```

View PVC Conveyor Belt

```

Bad

```

Click Here

```

---

# Content Freshness

Products

Update only when information changes.

Services

Review every 6 months.

Articles

Publish regularly.

Old articles should be reviewed periodically.

---

# Content Quality

Write for engineers, procurement teams, and industrial buyers.

Avoid

- clickbait
- keyword stuffing
- excessive marketing language

Content should be informative and trustworthy.

---

# Agent Rules

Always generate SEO metadata from content collections.

Never hardcode metadata inside Vue pages.

Prefer reusable SEO composables.

Every public page must be indexable unless explicitly disabled.

Always include structured data when appropriate.

---

# Things the Agent Must Never Do

Do not duplicate titles.

Do not duplicate meta descriptions.

Do not generate keyword-stuffed content.

Do not leave images without alt text.

Do not use generic titles like "Home" or "Welcome".

Do not create pages without metadata.

Do not expose draft content to search engines.

Always prioritize helpful, accurate, and human-readable content.
