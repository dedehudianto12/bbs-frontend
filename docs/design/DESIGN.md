# DESIGN.md — Design System

This document defines the visual design language for the project.

All pages and components should follow these guidelines.

Consistency is more important than creativity.

---

# Design Philosophy

The website should communicate:

- Professionalism
- Reliability
- Engineering Excellence
- Industrial Expertise

The visual style should feel

- Modern
- Clean
- Minimal
- Premium
- Trustworthy

Avoid decorative or trendy UI that distracts from the content.

---

# Design Principles

Every interface should prioritize

1. Clarity
2. Readability
3. Simplicity
4. Consistency
5. Accessibility

Users should find information quickly.

---

# Layout

Use a centered container.

Recommended max width

```
1280px
```

Standard horizontal padding

```
Mobile
16px

Tablet
24px

Desktop
32px
```

---

# Spacing

Use an 8-point spacing system.

Examples

```
4
8
16
24
32
48
64
96
128
```

Avoid arbitrary spacing values.

---

# Border Radius

Small

```
8px
```

Medium

```
12px
```

Large

```
16px
```

Extra Large

```
24px
```

Avoid excessive rounded corners.

---

# Shadows

Use subtle shadows.

Cards

Small shadow.

Dropdowns

Medium shadow.

Avoid heavy shadows.

---

# Color Palette

Primary

Industrial Yellow

Secondary

Dark Gray

Background

White

Surface

Light Gray

Text

Near Black

Success

Green

Warning

Amber

Error

Red

Colors should provide sufficient contrast.

---

# Typography

Use one font family.

Recommended

Geist

or

Inter

Fallback

system-ui

---

# Font Scale

Display

48–64px

H1

40px

H2

32px

H3

24px

H4

20px

Body

16px

Small

14px

Caption

12px

---

# Font Weight

Heading

600–700

Body

400

Button

600

Avoid extremely thin fonts.

---

# Buttons

Primary

Filled

Secondary

Outline

Ghost

Text only

Danger

Red

Buttons should have

- hover state
- focus state
- disabled state

---

# Cards

Cards should

- have consistent padding
- use subtle borders
- use minimal shadows
- avoid excessive decoration

---

# Forms

Inputs should

- have labels
- show validation messages
- use consistent spacing

Never rely on placeholders as labels.

---

# Icons

Use

Lucide

Only one icon library should be used.

Icons should support the content,
not replace text.

---

# Images

Use high-quality images.

Prefer

- Real products
- Installations
- Factory environments
- Engineering work

Avoid

- Generic stock photos
- AI-generated office people
- Decorative imagery

Always optimize images.

Use

```
<NuxtImg>
```

---

# Responsive Design

Design mobile-first.

Breakpoints

```
Mobile

↓

Tablet

↓

Desktop
```

Never hide important content.

Reflow layouts instead.

---

# Navigation

Navbar should remain simple.

Include

- Logo
- Main Navigation
- Primary CTA

Avoid large multi-level menus unless required.

---

# Hero Section

A hero should contain

- Badge (optional)
- Headline
- Description
- Primary CTA
- Secondary CTA (optional)
- Supporting image

Keep the message concise.

---

# Sections

Every section should contain

- Section title
- Short description (optional)
- Main content

Maintain consistent spacing between sections.

---

# Animations

Animations should be subtle.

Allowed

- Fade
- Slide
- Scale
- Opacity

Avoid

- Bounce
- Spin
- Flash
- Long transitions

Duration

150–300ms

---

# Accessibility

Maintain sufficient color contrast.

Every image must have alt text.

Interactive elements must support keyboard navigation.

Focus states must always be visible.

---

# Empty States

Display

- Illustration (optional)
- Title
- Description
- CTA

Avoid blank screens.

---

# Loading States

Use skeleton loaders where appropriate.

Never leave users wondering if content is loading.

---

# Error States

Show

- Clear message
- Suggested action
- Retry option (when applicable)

Avoid exposing technical errors to users.

---

# Consistency Rules

The same component should always look the same.

Buttons should not change style between pages.

Cards should share the same visual language.

Typography should remain consistent.

---

# Agent Rules

When designing a new page

1. Follow PAGE_BLUEPRINTS.md
2. Reuse UI_PATTERNS.md
3. Reuse COMPONENTS.md
4. Follow this design system

Do not invent new visual styles unless explicitly requested.

---

# Things the Agent Must Never Do

Do not mix multiple visual styles.

Do not use inconsistent spacing.

Do not overuse colors.

Do not overuse animations.

Do not create multiple button styles for the same purpose.

Always prioritize clarity and consistency.
