# PAGE_BLUEPRINTS.md — Page Architecture

This document defines the page composition for every major page in the project.

Pages should be assembled from reusable UI patterns.

Never invent a completely new page structure unless explicitly requested.

Consistency across pages is more important than uniqueness.

---

# Page Philosophy

Every page should answer a business question.

Visitors should immediately understand

Who?

↓

What?

↓

Why?

↓

How?

↓

What's Next?

Every page should naturally guide visitors toward contacting BBS Conveyor.

---

# Homepage

Purpose

Introduce BBS Conveyor and guide visitors toward products and services.

Blueprint

```
Navbar

↓

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

Industries We Serve

↓

Company Statistics

↓

Latest Articles

↓

Call To Action

↓

Footer
```

Content Source

- homepage/hero
- homepage/company
- homepage/why-choose-us
- products (featured)
- services (featured)
- industries
- blog (latest)

---

# Products Listing

Purpose

Display every available product.

Blueprint

```
Navbar

↓

Hero

↓

Section Introduction

↓

Category Filter (optional)

↓

Product Grid

↓

CTA

↓

Footer
```

Content Source

products/

---

# Product Detail

Purpose

Explain one product in detail.

Blueprint

```
Navbar

↓

Breadcrumb

↓

Product Hero

↓

Overview

↓

Applications

↓

Benefits

↓

Gallery

↓

Specifications (optional)

↓

Related Products

↓

CTA

↓

Footer
```

Content Source

products/[slug]

---

# Services Listing

Purpose

Present available services.

Blueprint

```
Navbar

↓

Hero

↓

Section Introduction

↓

Service Grid

↓

CTA

↓

Footer
```

Content Source

services/

---

# Service Detail

Purpose

Explain one service.

Blueprint

```
Navbar

↓

Breadcrumb

↓

Hero

↓

Overview

↓

Benefits

↓

How We Work

↓

Industries Served

↓

FAQ (optional)

↓

CTA

↓

Footer
```

Content Source

services/[slug]

---

# Industries Listing

Purpose

Display industries served.

Blueprint

```
Navbar

↓

Hero

↓

Section Introduction

↓

Industry Grid

↓

CTA

↓

Footer
```

Content Source

industries/

---

# Industry Detail

Purpose

Explain how BBS serves a specific industry.

Blueprint

```
Navbar

↓

Breadcrumb

↓

Hero

↓

Industry Overview

↓

Common Challenges

↓

Recommended Products

↓

Related Services

↓

Related Articles

↓

CTA

↓

Footer
```

Content Source

industries/[slug]

---

# Blog Listing

Purpose

Display educational content.

Blueprint

```
Navbar

↓

Hero

↓

Featured Article

↓

Article Grid

↓

Pagination

↓

CTA

↓

Footer
```

Content Source

blog/

---

# Blog Detail

Purpose

Educate visitors.

Blueprint

```
Navbar

↓

Breadcrumb

↓

Article Header

↓

Article Content

↓

Related Articles

↓

CTA

↓

Footer
```

Content Source

blog/[slug]

---

# About

Purpose

Build trust.

Blueprint

```
Navbar

↓

Hero

↓

Company Story

↓

Mission & Vision

↓

Core Values

↓

Why Choose Us

↓

Statistics

↓

CTA

↓

Footer
```

Content Source

pages/about

---

# Contact

Purpose

Help visitors contact BBS.

Blueprint

```
Navbar

↓

Hero

↓

Contact Information

↓

Google Maps

↓

Contact Form

↓

Business Hours

↓

FAQ (optional)

↓

Footer
```

Content Source

pages/contact

---

# Search Results (Future)

Blueprint

```
Navbar

↓

Search Header

↓

Search Results

↓

Pagination

↓

Footer
```

---

# 404

Blueprint

```
Navbar

↓

404 Illustration

↓

Title

↓

Description

↓

Primary Button

↓

Footer
```

---

# Privacy Policy

Blueprint

```
Navbar

↓

Page Header

↓

Content

↓

Footer
```

---

# Terms & Conditions

Blueprint

```
Navbar

↓

Page Header

↓

Content

↓

Footer
```

---

# Future Pages

## Projects

```
Navbar

↓

Hero

↓

Project Grid

↓

Project Detail Preview

↓

CTA

↓

Footer
```

---

## Careers

```
Navbar

↓

Hero

↓

Why Work With Us

↓

Open Positions

↓

Application CTA

↓

Footer
```

---

## FAQ

```
Navbar

↓

Hero

↓

FAQ Categories

↓

Accordion

↓

CTA

↓

Footer
```

---

# Common Rules

Every page should begin with

```
Navbar
```

Every page should end with

```
CTA

↓

Footer
```

Every inner page should include

```
Breadcrumb
```

where appropriate.

---

# Content Hierarchy

Every page should answer these questions in order

1. What is this page about?

↓

2. Why is it important?

↓

3. How can BBS help?

↓

4. What should visitors do next?

---

# CTA Rules

Every page should end with one clear action.

Examples

- Request a Quote
- Contact Our Team
- Talk to an Engineer
- View Products

Never end a page without a CTA.

---

# Responsive Rules

Each blueprint must support

Desktop

Tablet

Mobile

Do not remove important sections on mobile.

Reflow layouts instead.

---

# Agent Rules

When creating a new page

1. Identify the page type.
2. Use the matching blueprint.
3. Reuse existing UI patterns.
4. Reuse existing components.
5. Only introduce a new blueprint if no existing one fits.

---

# Things the Agent Must Never Do

Do not invent random page layouts.

Do not reorder sections without a valid UX reason.

Do not omit CTA sections.

Do not duplicate existing blueprints.

Always prioritize consistency across the website.
