# GitHub Copilot Instructions

## Project Overview

This project is the official website of **Al Musleh Foundation School (AMFS)**.

The website represents a premium educational institution with multiple campuses and should reflect professionalism, trust, academic excellence, and modern education.

The website is currently being developed incrementally.

Current phase:

- Coming Soon Landing Page
- About Us
- Campus Information
- Contact
- Admissions
- News & Events
- Gallery
- Student Portal
- Parent Portal

The project must be structured so it can easily scale in the future.

---

# Tech Stack

Use modern frontend technologies.

- HTML5
- Tailwind CSS
- Vanilla JavaScript (ES6+)
- Responsive Design
- Mobile First
- Semantic HTML
- JSON-based content
- Component-based architecture

Do NOT introduce React, Vue, Angular or other frameworks unless explicitly requested.

---

# Coding Principles

Always write code that is:

- Clean
- Readable
- Modular
- Reusable
- Maintainable
- Well commented
- SEO friendly
- Accessible (WCAG)
- Production ready

Avoid duplicate code.

Prefer reusable components.

---

# File Organization

Follow this structure.

```
/
│
├── index.html
├── about.html
├── campuses.html
├── contact.html
├── admissions.html
│
├── assets/
│   ├── css/
│   ├── js/
│   ├── icons/
│   └── images/
│
├── data/
│   ├── school.json
│   ├── campus.json
│   ├── social.json
│   └── navigation.json
│
├── components/
│   ├── navbar.js
│   ├── footer.js
│   ├── campus-card.js
│   ├── hero.js
│   ├── stats.js
│   └── social-links.js
│
└── .github/
    └── copilot-instructions.md
```

---

# Branding

Follow the official Al Musleh Foundation School branding.

The attached school logo is the source of truth.

Use these colors.

## Primary Colors

Royal Blue

#3D63B8

Sky Blue

#37A9E8

Navy Blue

#243C7D

## Accent Colors

Academic Gold

#F6DD24

Knowledge Orange

#F68A1F

Orange should only be used sparingly.

## Neutral Colors

White

#FFFFFF

Off White

#F8FAFC

Light Gray

#E9EEF5

Border Gray

#D7DEE8

Dark Gray

#4B5563

Charcoal

#2B2F38

---

# Never Use

Do NOT use

- Purple
- Violet
- Pink gradients
- Neon colors
- AI-looking gradients
- Cyberpunk themes
- Heavy glassmorphism
- Excessive shadows
- Dark mode by default

The website should resemble a premium school rather than an AI startup.

---

# Design Language

Design should be

- Elegant
- Spacious
- Modern
- Professional
- Trustworthy
- Academic
- Timeless

Use

- Rounded corners (12–16px)
- Soft shadows
- White backgrounds
- Smooth transitions
- Minimal gradients
- Plenty of whitespace

---

# Animations

Animations should be subtle.

Allowed

- Fade In
- Slide Up
- Hover Lift
- Counter Animation
- Smooth Scroll
- Soft Hover Effects

Avoid flashy animations.

---

# Typography

Prefer modern fonts such as

- Inter
- Poppins
- Nunito Sans

Headings should be bold.

Body text should maximize readability.

Maintain a clear visual hierarchy.

---

# Images

Use

- High-quality photographs
- Premium vector illustrations
- School-related imagery

Never use

- Cartoon characters
- Generic AI illustrations
- Pixelated images

Prefer SVG logos whenever possible.

---

# Icons

Use Heroicons, Lucide Icons, or Font Awesome.

Icons should use Royal Blue.

Gold may be used for highlights.

---

# Responsive Design

Desktop

Tablet

Mobile

All pages must be fully responsive.

Never hardcode widths.

Prefer Flexbox and CSS Grid.

---

# Accessibility

Always include

- alt text
- aria-label
- semantic HTML
- keyboard accessibility
- sufficient color contrast

---

# Performance

Optimize for performance.

Use

- Lazy loading
- SVG logos
- Optimized images
- Minimal JavaScript
- Deferred scripts

Avoid unnecessary libraries.

---

# SEO

Every page should include

Title
Description
Open Graph tags
Twitter Card tags
Canonical URL
Structured headings
Semantic HTML

---

# Data Management

Do NOT hardcode content.
Load content from JSON whenever possible.

Examples
school.json
campus.json
navigation.json
social.json

---

# JSON Rules

Each JSON file should be easy for non-developers to edit.

Use descriptive keys.

Example

```json
{
  "name": "Muslehuddin Campus",
  "address": "",
  "contact": "",
  "mapUrl": ""
}
```

Never use magic values.

---

# Components

Always build reusable components.

Examples

Navbar
Footer
Hero
CTA
Statistics
Campus Card
Teacher Card
Gallery Card
News Card
Social Links
Breadcrumb
Section Header

Do not duplicate component logic.

---

# Future Pages

Design every component with future expansion in mind.

Expected pages include

- Home
- About
- Admissions
- Academics
- Campuses
- Gallery
- Events
- News
- Contact
- Careers
- Student Portal
- Parent Portal
- Fee Payment

---

# School Statistics

Current values

Campuses: 5

Students: 1500+

Certified Teachers: 200+

These values should come from JSON.

---

# Campus Information

The school currently has

- Muslehuddin Campus (Head Campus)
- Turabi Campus
- Ali Hajveri Campus
- Ghazali Campus
- Noori Campus

Campus cards should be rendered dynamically from JSON.

Never hardcode campus HTML.

---

# Code Style

Prefer

const

arrow functions

template literals

async/await

descriptive variable names

Use ESLint-friendly code.

Avoid nested callbacks.

Avoid inline JavaScript.

---

# Naming Convention

Files

kebab-case

Variables

camelCase

Constants

UPPER_CASE

Components

PascalCase (if classes/modules are used)

---

# Comments

Write meaningful comments.

Explain why rather than what.

---

# GitHub Copilot Behavior

When generating code:

- Follow existing project structure.
- Reuse existing components before creating new ones.
- Keep designs consistent across all pages.
- Never introduce random colors.
- Never invent branding that differs from the school logo.
- Prefer configuration-driven and JSON-driven implementations.
- Prioritize maintainability over cleverness.
- Generate production-quality, responsive, and accessible code by default.
- If multiple implementation options exist, choose the simplest, most scalable solution.