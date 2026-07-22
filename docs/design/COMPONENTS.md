# COMPONENTS.md — Component Architecture

This document defines how UI components should be designed and organized.

Components should be reusable, composable, maintainable, and independent.

Never create page-specific components unless absolutely necessary.

---

# Philosophy

Every component should have one responsibility.

Components should:

- be reusable
- receive data through props
- avoid hardcoded business content
- avoid duplicated logic
- remain presentation-focused

Business content belongs in Nuxt Content.

Components are responsible only for rendering.

---

# Component Categories

Organize components into the following structure.

```
components/

layout/
sections/
cards/
ui/
forms/
shared/
icons/
```

---

# Layout Components

Layout components define page structure.

Examples

```
Navbar.vue

Footer.vue

PageContainer.vue

SectionContainer.vue

MainLayout.vue
```

Responsibilities

- Layout only
- No business logic
- No content fetching

---

# Section Components

Sections compose multiple smaller components.

Examples

```
HeroSection.vue

WhyChooseUsSection.vue

ProductsSection.vue

ServicesSection.vue

IndustriesSection.vue

BlogSection.vue

CTASection.vue

StatisticsSection.vue
```

Responsibilities

- Receive data via props
- Compose cards
- Compose UI components

Never hardcode data.

---

# Card Components

Cards display a single content item.

Examples

```
ProductCard.vue

ServiceCard.vue

IndustryCard.vue

BlogCard.vue

FeatureCard.vue
```

Cards should display

- image
- title
- excerpt
- action

Cards should never fetch their own data.

---

# UI Components

Generic reusable UI.

Examples

```
Button.vue

Badge.vue

Tag.vue

Chip.vue

Input.vue

Textarea.vue

Select.vue

Accordion.vue

Modal.vue

Dialog.vue

Pagination.vue

Skeleton.vue
```

These components should never know anything about BBS.

---

# Form Components

Reusable form elements.

Examples

```
ContactForm.vue

NewsletterForm.vue

QuoteRequestForm.vue
```

Forms should

- validate input
- emit events
- remain reusable

Business logic belongs outside.

---

# Shared Components

Examples

```
SectionTitle.vue

SectionDescription.vue

EmptyState.vue

LoadingState.vue

Breadcrumb.vue

SocialLinks.vue

ImageGallery.vue
```

These should be reusable across multiple pages.

---

# Icons

Use only one icon library.

Preferred

Lucide

Do not mix icon libraries.

---

# Component Naming

Use PascalCase.

Good

```
ProductCard.vue
```

Bad

```
productCard.vue

product-card.vue
```

---

# Props

Always define props using TypeScript.

Example

```ts
interface ProductCardProps {
  title: string;
  image: string;
  excerpt: string;
  href: string;
}
```

Avoid

```
any
```

---

# Events

Emit meaningful events.

Good

```
submit

select

close

expand
```

Bad

```
click1

action

test
```

---

# Data Fetching

Only page-level components should fetch content.

Cards should never query Nuxt Content.

Bad

```
ProductCard

↓

queryCollection()
```

Good

```
Page

↓

queryCollection()

↓

ProductGrid

↓

ProductCard
```

---

# Slots

Prefer slots for flexible layouts.

Examples

```
<Card>

<template #header />

<template #body />

<template #footer />

</Card>
```

Avoid excessive props when slots are more appropriate.

---

# Component Size

Ideal

100–200 lines

Maximum

300 lines

If larger,

split into smaller components.

---

# Composition

Prefer

```
HeroSection

↓

HeroContent

HeroImage

HeroCTA
```

Instead of

```
HeroSection

(700 lines)
```

---

# Reusability

Never duplicate components.

If two components are 80% similar,

refactor into one reusable component.

---

# Styling

Use Tailwind utility classes.

Avoid inline styles.

Avoid duplicated class combinations.

Extract repeated patterns when necessary.

---

# Responsive Design

Every component must support

Desktop

Tablet

Mobile

Never hide important content on mobile.

Reflow instead.

---

# Images

Always use

```
<NuxtImg>
```

Do not use

```
<img>
```

unless absolutely necessary.

---

# Accessibility

Buttons

must have labels.

Images

must have alt text.

Forms

must have labels.

Interactive components

must support keyboard navigation.

---

# Animations

Animations should be subtle.

Allowed

Fade

Slide

Scale

Opacity

Avoid

Bounce

Rotate

Flash

Long animations

---

# Error States

Reusable components should support

Loading

Empty

Error

Examples

```
<ProductGrid>

Loading

Empty

Success

Error
```

Never assume data always exists.

---

# Performance

Avoid unnecessary reactivity.

Use computed values.

Lazy load heavy components.

Lazy load below-the-fold sections.

Optimize images.

---

# Agent Rules

Before creating a new component

Ask:

Can an existing component be reused?

If yes,

reuse it.

Do not create duplicate components.

---

# Components That Should Exist

Layout

- Navbar
- Footer
- PageContainer
- SectionContainer

Sections

- HeroSection
- ProductsSection
- ServicesSection
- IndustriesSection
- WhyChooseUsSection
- StatisticsSection
- BlogSection
- CTASection

Cards

- ProductCard
- ServiceCard
- IndustryCard
- BlogCard
- FeatureCard

Shared

- SectionTitle
- Breadcrumb
- SocialLinks
- ImageGallery
- EmptyState
- LoadingState

Forms

- ContactForm
- QuoteRequestForm

UI

- Button
- Badge
- Input
- Textarea
- Select
- Pagination
- Skeleton

---

# Things the Agent Must Never Do

Do not hardcode business data.

Do not fetch content inside reusable components.

Do not create page-specific UI unnecessarily.

Do not duplicate components.

Do not use `any`.

Do not tightly couple components to routes.

Always build components to be reusable across future company profile projects.
