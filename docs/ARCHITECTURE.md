# ARCHITECTURE.md

This document explains how the documentation in this project is organized.

Every AI agent should use this document as the entry point before reading other documentation.

---

# Documentation Philosophy

This project separates concerns into dedicated documentation.

Each document has one responsibility.

Never duplicate rules across documents.

If a rule already exists in another document, reference it instead.

---

# Documentation Structure

```
ARCHITECTURE.md
│
├── AGENTS.md
│
├── DESIGN.md
│
├── PAGE_BLUEPRINTS.md
│
├── UI_PATTERNS.md
│
├── COMPONENTS.md
│
├── CONTENT.md
│
├── WRITING.md
│
├── SEO.md
│
└── DEPLOYMENT.md
```

---

# Responsibilities

## AGENTS.md

Defines how the AI agent should work.

Contains

- Project overview
- Development workflow
- Coding rules
- Tech stack
- General project principles

Read first before making any code changes.

---

## DESIGN.md

Defines the visual language.

Contains

- Colors
- Typography
- Spacing
- Visual hierarchy
- Design philosophy

Read before designing UI.

---

## PAGE_BLUEPRINTS.md

Defines complete page structures.

Contains

- Homepage
- Product Detail
- Blog Detail
- Contact
- About
- Services

Read before creating a new page.

---

## UI_PATTERNS.md

Defines reusable UI layouts.

Examples

- Hero
- CTA
- Feature Grid
- Statistics
- FAQ
- Gallery

Read before creating a new section.

---

## COMPONENTS.md

Defines reusable Vue components.

Contains

- Component hierarchy
- Props
- Naming
- Reusability
- Accessibility

Read before creating components.

---

## CONTENT.md

Defines the CMS structure.

Contains

- Collections
- Fields
- Frontmatter
- Slugs
- Folder organization

Read before adding content collections.

---

## WRITING.md

Defines writing standards.

Contains

- Tone of voice
- Product descriptions
- Blog structure
- CTA writing
- Grammar
- Copywriting

Read before writing content.

---

## SEO.md

Defines SEO standards.

Contains

- Metadata
- Structured data
- Sitemap
- Internal linking
- Canonical URLs

Read before publishing pages.

---

## DEPLOYMENT.md

Defines deployment strategy.

Contains

- Vercel
- GitHub
- Environment variables
- Production deployment
- Preview deployment

Read before deployment.

---

# Common Development Workflows

## Creating a New Page

Read

```
PAGE_BLUEPRINTS.md

↓

UI_PATTERNS.md

↓

COMPONENTS.md

↓

DESIGN.md
```

---

## Creating a New Component

Read

```
COMPONENTS.md

↓

DESIGN.md
```

---

## Creating a New Collection

Read

```
CONTENT.md
```

---

## Writing a Blog Article

Read

```
WRITING.md

↓

SEO.md
```

---

## Creating a New Product

Read

```
CONTENT.md

↓

WRITING.md

↓

SEO.md
```

---

## Redesigning a Section

Read

```
DESIGN.md

↓

UI_PATTERNS.md

↓

COMPONENTS.md
```

---

## Deployment

Read

```
DEPLOYMENT.md
```

---

# Decision Tree

Need to...

Design UI?

↓

DESIGN.md

---

Build a page?

↓

PAGE_BLUEPRINTS.md

---

Build a reusable section?

↓

UI_PATTERNS.md

---

Build a Vue component?

↓

COMPONENTS.md

---

Create CMS data?

↓

CONTENT.md

---

Write content?

↓

WRITING.md

---

Improve SEO?

↓

SEO.md

---

Deploy?

↓

DEPLOYMENT.md

---

# Rule Priority

If multiple documents define the same topic,
follow this order.

1. AGENTS.md
2. PAGE_BLUEPRINTS.md
3. UI_PATTERNS.md
4. COMPONENTS.md
5. DESIGN.md
6. CONTENT.md
7. WRITING.md
8. SEO.md
9. DEPLOYMENT.md

Higher-priority documents override lower-priority documents.

---

# Golden Rules

Never duplicate documentation.

Always reuse existing patterns.

Keep responsibilities separated.

Update documentation whenever architecture changes.

Documentation is part of the project.
