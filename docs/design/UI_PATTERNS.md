# UI_PATTERNS.md — Reusable UI Patterns

This document defines reusable UI patterns for the project.

Every page should be built by combining these patterns.

Do not invent new layouts unless explicitly requested.

Consistency is more important than originality.

---

# Philosophy

Every page is composed from reusable sections.

Pattern

↓

Section

↓

Component

↓

Primitive UI

The same pattern should be reused across multiple pages.

---

# Pattern 1 — Hero

Purpose

Introduce the page.

Structure

```
Headline

↓

Description

↓

Primary CTA

↓

Secondary CTA (optional)

↓

Hero Image
```

Components

- HeroSection
- Button
- Badge (optional)

Used on

- Home
- Products
- Services
- Industries
- Blog
- About

---

# Pattern 2 — Section Introduction

Purpose

Introduce a section before displaying content.

Structure

```
Section Title

↓

Section Description
```

Components

- SectionTitle
- SectionDescription

Used on

Every page.

---

# Pattern 3 — Grid Layout

Purpose

Display multiple items.

Structure

```
Section Title

↓

Grid

↓

Cards
```

Examples

Products

Services

Industries

Articles

Team

Projects

---

# Pattern 4 — Featured Content

Purpose

Highlight important content.

Structure

```
Featured Card

↓

Supporting Cards
```

Examples

Featured Product

Featured Article

Featured Service

---

# Pattern 5 — Content + Image

Purpose

Explain something.

Structure

```
Text

↓

Image
```

Alternate layout

```
Image

↓

Text
```

Used for

About

Company

Mission

Technology

Engineering

---

# Pattern 6 — Feature Grid

Purpose

Show company strengths.

Structure

```
Section Title

↓

Description

↓

3–6 Feature Cards
```

Examples

Why Choose Us

Advantages

Capabilities

Solutions

---

# Pattern 7 — Statistics

Purpose

Build trust.

Structure

```
Title

↓

Statistics Grid
```

Examples

20+

Years Experience

500+

Projects

100+

Clients

---

# Pattern 8 — Timeline

Purpose

Explain processes.

Structure

```
Section Title

↓

Timeline Items
```

Examples

Installation Process

How We Work

Project Flow

---

# Pattern 9 — Gallery

Purpose

Display images.

Structure

```
Title

↓

Responsive Gallery
```

Examples

Projects

Installations

Products

Factory

---

# Pattern 10 — Testimonial

Purpose

Build credibility.

Structure

```
Title

↓

Customer Cards
```

Each card

Company

Quote

Person

Position

---

# Pattern 11 — FAQ

Purpose

Answer common questions.

Structure

```
Title

↓

Accordion
```

Limit

5–10 questions.

---

# Pattern 12 — Related Content

Purpose

Encourage exploration.

Structure

```
Section Title

↓

Grid

↓

Related Items
```

Examples

Related Products

Related Articles

Related Services

---

# Pattern 13 — CTA

Purpose

Encourage contact.

Structure

```
Headline

↓

Description

↓

Primary Button

↓

Secondary Button (optional)
```

Every major page should end with a CTA.

---

# Pattern 14 — Contact

Purpose

Provide contact information.

Structure

```
Contact Information

↓

Map

↓

Contact Form
```

---

# Pattern 15 — Logo Cloud

Purpose

Display trust.

Structure

```
Section Title

↓

Logo Grid
```

Examples

Clients

Partners

Certifications

---

# Pattern 16 — Breadcrumb

Purpose

Improve navigation.

Structure

```
Home

↓

Category

↓

Current Page
```

Used on

All inner pages.

Never use on homepage.

---

# Pattern 17 — Empty State

Purpose

Handle missing content gracefully.

Structure

```
Illustration

↓

Title

↓

Description

↓

CTA
```

Examples

No Articles

No Products

Search Not Found

---

# Pattern 18 — Loading State

Purpose

Improve perceived performance.

Structure

Skeleton

↓

Content

Never show blank pages.

---

# Pattern 19 — 404 Page

Structure

```
404

↓

Title

↓

Description

↓

Return Home Button
```

---

# Pattern 20 — Footer

Structure

```
Company

↓

Products

↓

Services

↓

Quick Links

↓

Contact

↓

Social Media

↓

Copyright
```

Footer should appear on every page.

---

# Recommended Page Composition

## Homepage

```
Hero

↓

Company Introduction

↓

Why Choose Us

↓

Featured Products

↓

Featured Services

↓

Industries

↓

Statistics

↓

Latest Articles

↓

CTA

↓

Footer
```

---

## Product Detail

```
Breadcrumb

↓

Hero

↓

Overview

↓

Gallery

↓

Applications

↓

Benefits

↓

Related Products

↓

CTA

↓

Footer
```

---

## Service Detail

```
Breadcrumb

↓

Hero

↓

Overview

↓

Benefits

↓

Process

↓

Industries Served

↓

FAQ

↓

CTA

↓

Footer
```

---

## Industry Detail

```
Breadcrumb

↓

Hero

↓

Industry Challenges

↓

Recommended Products

↓

Services

↓

Related Articles

↓

CTA

↓

Footer
```

---

## Blog Detail

```
Breadcrumb

↓

Article Hero

↓

Article Content

↓

Related Articles

↓

CTA

↓

Footer
```

---

## About

```
Hero

↓

Company Story

↓

Mission & Vision

↓

Why Choose Us

↓

Statistics

↓

CTA

↓

Footer
```

---

## Contact

```
Hero

↓

Contact Information

↓

Map

↓

Contact Form

↓

FAQ

↓

Footer
```

---

# Pattern Rules

Prefer existing patterns.

Avoid creating one-off layouts.

Reuse sections whenever possible.

Every new page should be assembled from existing patterns.

If a new layout is required,

document it in this file first.

---

# Things the Agent Must Never Do

Do not create random page layouts.

Do not change section order without reason.

Do not skip CTA sections.

Do not invent new card styles for the same content type.

Do not duplicate patterns.

Always prioritize consistency over uniqueness.
