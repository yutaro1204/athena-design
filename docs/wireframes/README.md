# Wireframe Catalog

A comprehensive catalog of all wireframe designs for this project, including their components, responsive versions, and implementation status.

## Table of Contents

- [Overview](#overview)
- [Wireframes](#wireframes)
- [Quick Reference](#quick-reference)
- [Component Library](#component-library)
- [Usage Guide](#usage-guide)

---

## Overview

This directory contains all wireframe designs for the project. Each wireframe is assigned a unique 4-digit ID (0001, 0002, etc.) and organized in its own subdirectory with:

- Original desktop wireframe SVG
- Responsive wireframe variations
- Extracted reusable components
- Related documentation

**Total Wireframes**: 1
**Total Components**: 7
**Last Updated**: 2026-02-15

---

## Wireframes

### 0001 - TCG Landing Page

**Status**: ✅ Complete with Components
**Type**: Landing Page
**Created**: 2026-02-14
**Dimensions**: 1200×2400px (Desktop)

#### Description

A dark-themed landing page for a Trading Card Game (TCG) featuring:

- Hero section with split layout and dual CTAs
- 3-column feature grid highlighting game mechanics
- Product showcase with 3 card packs
- Timeline section for upcoming releases
- Company information with newsletter signup
- Minimal footer with legal links

#### Files

- 📄 **Wireframe**: [`0001/tcg-landing-page-wireframe.svg`](0001/tcg-landing-page-wireframe.svg)
- 📱 **Responsive (768px)**: [`0001/768/tcg-landing-page-responsive-wireframe.svg`](0001/768/tcg-landing-page-responsive-wireframe.svg)
- 💻 **Responsive (1024px)**: [`0001/1024/tcg-landing-page-responsive-wireframe.svg`](0001/1024/tcg-landing-page-responsive-wireframe.svg)
- 🧩 **Components**: [`0001/components/`](0001/components/) (7 components)

#### Design System

**Color Palette**:

- Background: `#1a1a2e` (Dark Navy)
- Secondary: `#16213e` (Lighter Navy)
- Section BG: `#0f3460` (Deep Blue)
- Accent: `#e94560` (Bright Red/Pink)
- Text Primary: `#e0e0e0` (Light Gray)
- Text Secondary: `#a0a0a0` (Medium Gray)

**Typography**:

- Headings: Arial, sans-serif, bold, 24-42px
- Body: Arial, sans-serif, regular, 13-18px
- Labels: Arial, sans-serif, italic, 11px

#### Sections

1. **Header/Navigation** (80px)
   - Logo with brand color
   - 3 navigation links

2. **Hero Section** (500px)
   - Split layout: content left, image right
   - Large headline (2 lines)
   - Supporting text
   - Primary CTA (filled button)
   - Secondary CTA (outlined button)

3. **Features Section** (480px)
   - Section title with accent underline
   - 3-column grid
   - Icon circles with emoji placeholders
   - Feature titles and descriptions

4. **Available Packs Section** (420px)
   - Section title
   - 3 product cards with images, names, prices
   - Carousel indicator

5. **Upcoming Releases Section** (380px)
   - Section title
   - 3 timeline cards with thumbnails, dates, descriptions, CTAs

6. **Company Information Section** (240px)
   - 4-column grid: About, Community, Support, Newsletter
   - Email input and subscribe button

7. **Footer** (80px)
   - Copyright text
   - Legal links

#### Components Extracted

See [`0001/components/README.md`](0001/components/README.md) for full component library.

| Category | Component                       | Size       | Use Case            |
| -------- | ------------------------------- | ---------- | ------------------- |
| Headers  | `header-logo-nav.svg`           | 1200×80px  | Navigation bar      |
| Heroes   | `hero-split-cta.svg`            | 1200×500px | Landing page banner |
| Sections | `feature-grid-3col.svg`         | 1200×480px | Feature highlights  |
| Sections | `product-cards-3col.svg`        | 1200×420px | Product listings    |
| Sections | `timeline-cards-3col.svg`       | 1200×380px | Event schedules     |
| Sections | `info-grid-4col-newsletter.svg` | 1200×240px | Company info + form |
| Footers  | `footer-copyright-links.svg`    | 1200×80px  | Legal footer        |

#### Implementation Status

| Task                       | Status         | Notes                                      |
| -------------------------- | -------------- | ------------------------------------------ |
| Wireframe Created          | ✅ Complete    | Desktop version (1200×2400px)              |
| Components Extracted       | ✅ Complete    | 7 reusable components                      |
| Responsive Design (768px)  | ✅ Complete    | Mobile-first breakpoint                    |
| Responsive Design (1024px) | ✅ Complete    | Tablet/desktop breakpoint                  |
| Assets List Generated      | ✅ Complete    | [`docs/assets-list.md`](../assets-list.md) |
| React Component            | ✅ Complete    | `src/App.tsx`                              |
| Responsive Classes Applied | ✅ Complete    | Mobile-first Tailwind CSS                  |
| Assets Integrated          | ✅ Complete    | All images imported                        |
| Tested                     | 🔄 In Progress | Review in browser                          |

#### Related Files

- Asset Requirements: [`docs/assets-list.md`](../assets-list.md)
- React Component: `src/App.tsx`
- Assets Directory: `docs/assets/`

#### Skills Used

```bash
/create-page-wireframe "TCG landing page with hero, features, products"
/create-components-from-wireframe 0001
/create-responsive-design 0001 768
/create-responsive-design 0001 1024
/create-required-assets-list 0001
/create-page-from-wireframe 0001
/apply-responsive-design 0001 768
/apply-required-assets
```

---

## Quick Reference

### All Wireframes at a Glance

| ID   | Name             | Type    | Status      | Desktop   | Mobile    | Components | Updated    |
| ---- | ---------------- | ------- | ----------- | --------- | --------- | ---------- | ---------- |
| 0001 | TCG Landing Page | Landing | ✅ Complete | 1200×2400 | 768, 1024 | 7          | 2026-02-14 |
| 0002 | -                | -       | ⏳ Planned  | -         | -         | -          | -          |
| 0003 | -                | -       | ⏳ Planned  | -         | -         | -          | -          |

**Legend**:

- ✅ Complete
- 🔄 In Progress
- ⏳ Planned
- ❌ Blocked

---

## Component Library

### Available Components Across All Wireframes

#### Headers (1 component)

| Component             | Source | Size      | Description                |
| --------------------- | ------ | --------- | -------------------------- |
| `header-logo-nav.svg` | 0001   | 1200×80px | Logo left, nav links right |

#### Heroes (1 component)

| Component            | Source | Size       | Description                 |
| -------------------- | ------ | ---------- | --------------------------- |
| `hero-split-cta.svg` | 0001   | 1200×500px | Split layout with dual CTAs |

#### Sections (4 components)

| Component                       | Source | Size       | Description                        |
| ------------------------------- | ------ | ---------- | ---------------------------------- |
| `feature-grid-3col.svg`         | 0001   | 1200×480px | 3-column feature grid with icons   |
| `product-cards-3col.svg`        | 0001   | 1200×420px | 3-column product cards with prices |
| `timeline-cards-3col.svg`       | 0001   | 1200×380px | 3-column timeline/schedule cards   |
| `info-grid-4col-newsletter.svg` | 0001   | 1200×240px | 4-column info with newsletter form |

#### Footers (1 component)

| Component                    | Source | Size      | Description                          |
| ---------------------------- | ------ | --------- | ------------------------------------ |
| `footer-copyright-links.svg` | 0001   | 1200×80px | Simple footer with copyright + links |

### Component Reusability

Components can be mixed and matched to create new page layouts:

**Example Layout 1** (Simple Landing):

```
header-logo-nav (80px)
+ hero-split-cta (500px)
+ feature-grid-3col (480px)
+ footer-copyright-links (80px)
= 1140px total
```

**Example Layout 2** (Product Page):

```
header-logo-nav (80px)
+ hero-split-cta (500px)
+ product-cards-3col (420px)
+ timeline-cards-3col (380px)
+ footer-copyright-links (80px)
= 1460px total
```

**Example Layout 3** (Full Landing):

```
header-logo-nav (80px)
+ hero-split-cta (500px)
+ feature-grid-3col (480px)
+ product-cards-3col (420px)
+ timeline-cards-3col (380px)
+ info-grid-4col-newsletter (240px)
+ footer-copyright-links (80px)
= 2180px total
```

---

## Usage Guide

### Viewing Wireframes

**In Browser**:

```bash
# Open SVG file directly in any modern browser
open docs/wireframes/0001/tcg-landing-page-wireframe.svg
```

**In Design Tools**:

- Figma: File → Import → Select SVG
- Sketch: File → Add → Select SVG
- Adobe XD: File → Import → Select SVG
- Inkscape: File → Open → Select SVG

### Creating New Wireframes

```bash
# 1. Create new wireframe
/create-page-wireframe "Your page description"
# → Creates: docs/wireframes/{NNNN}/{page-name}-wireframe.svg

# 2. Extract components (optional)
/create-components-from-wireframe {NNNN}
# → Creates: docs/wireframes/{NNNN}/components/

# 3. Create responsive versions (optional)
/create-responsive-design {NNNN} 768
/create-responsive-design {NNNN} 1024
```

### Using Existing Components

When creating a new wireframe, reference existing components for consistency:

1. Browse component library in this catalog
2. Copy component SVG files to new wireframe directory (if needed)
3. Customize colors, text, and layout as needed
4. Maintain the design system (colors, typography)

### Implementing Wireframes

```bash
# Full implementation workflow
/create-page-from-wireframe {NNNN}
/create-required-assets-list {NNNN}
/apply-responsive-design {NNNN} 768
# [Create and place assets]
/apply-required-assets
npm run dev
```

### Updating the Catalog

When adding a new wireframe:

1. Create the wireframe with `/create-page-wireframe`
2. Add a new section to this catalog with:
   - Wireframe ID and name
   - Description and status
   - File paths
   - Design system details
   - Sections breakdown
   - Components extracted
   - Implementation status
3. Update the Quick Reference table
4. Update component library if new components were added
5. Update the "Total Wireframes" count in Overview

---

## Statistics

### Design Metrics

- **Total Wireframes**: 1
- **Total Sections**: 7 (across all wireframes)
- **Total Components**: 7 (reusable)
- **Responsive Breakpoints**: 2 (768px, 1024px)
- **Average Wireframe Height**: 2400px
- **Design System**: Dark theme with consistent palette

### Implementation Metrics

- **Wireframes Implemented**: 1/1 (100%)
- **Components with Responsive Designs**: 1/1 (100%)
- **Assets Lists Generated**: 1/1 (100%)
- **React Components Created**: 1/1 (100%)

---

## Design System Standards

All wireframes in this catalog follow these standards:

### Color Standards

- Dark theme preferred for consistency
- Accent color for CTAs and highlights
- High contrast text (WCAG AA minimum)
- Consistent border and background colors

### Layout Standards

- Desktop width: 1200px
- Mobile-first responsive approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Grid-based layouts (2-col, 3-col, 4-col)

### Component Standards

- Self-contained SVG files
- ViewBox dimensions match content
- Consistent padding and spacing
- Reusable across pages
- Component labels in bottom-left corner

### Typography Standards

- Font family: Arial, sans-serif (system font)
- Heading sizes: 20-42px
- Body sizes: 13-18px
- Label sizes: 11-12px
- Consistent font weights (regular, bold)

---

## Version History

### v1.0 (2026-02-15)

- Initial catalog created
- Wireframe 0001 (TCG Landing Page) completed
- 7 reusable components extracted
- Responsive designs for 768px and 1024px
- Full React implementation with assets

---

## Resources

### Tools

- **SVG Editors**: Figma, Sketch, Adobe XD, Inkscape
- **Browsers**: Chrome, Firefox, Safari (for viewing SVGs)
- **React**: For implementing wireframes as components
- **Tailwind CSS v4**: For styling with mobile-first approach

### Documentation

- [Project README](../../README.md) - Skills overview and workflow
- [Claude Instructions](../../CLAUDE.md) - AI assistant guidelines
- [Assets List](../assets-list.md) - Asset requirements for wireframe 0001
- [Component Library](0001/components/README.md) - Reusable component docs

### Skills Reference

| Skill                               | Purpose                                    |
| ----------------------------------- | ------------------------------------------ |
| `/create-page-wireframe`            | Create new wireframe designs               |
| `/create-components-from-wireframe` | Extract reusable components                |
| `/create-page-from-wireframe`       | Implement React components                 |
| `/create-responsive-design`         | Create responsive wireframe visualizations |
| `/apply-responsive-design`          | Apply responsive Tailwind classes          |
| `/create-required-assets-list`      | Generate asset requirements                |
| `/apply-required-assets`            | Integrate assets into components           |

---

## Contributing

When adding new wireframes to this catalog:

1. **Follow naming conventions**: Use 4-digit IDs (0001, 0002, etc.)
2. **Use consistent design system**: Follow color and typography standards
3. **Document thoroughly**: Include descriptions, sections, components
4. **Extract components**: Create reusable components when patterns emerge
5. **Create responsive versions**: Design for mobile, tablet, and desktop
6. **Update this catalog**: Add new entry with complete information
7. **Test implementation**: Verify React component works correctly

---

**Maintained by**: Development Team
**Last Catalog Update**: 2026-02-15
**Catalog Version**: 1.0

For questions or suggestions, refer to the [Claude Instructions](../../CLAUDE.md) or project documentation.
