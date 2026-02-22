# Wireframe Component Library

This directory contains reusable wireframe components that can be used across multiple page designs. Each component is a self-contained SVG file following the dark theme design system.

## Design System

### Color Palette

- **Background**: `#1a1a2e` (dark navy)
- **Secondary Background**: `#16213e` (lighter navy)
- **Section Background**: `#0f3460` (deep blue)
- **Accent**: `#e94560` (bright red/pink)
- **Border**: `#0f3460`, `#4a5568` (blue/gray variants)
- **Text Primary**: `#e0e0e0` (light gray)
- **Text Secondary**: `#a0a0a0` (medium gray)
- **Text Muted**: `#666` (dark gray)

### Typography

- **Headings**: Arial, sans-serif, bold
- **Body**: Arial, sans-serif, regular
- **Font Sizes**: 11px-42px range

## Component Categories

### Headers

Components for navigation and branding.

#### `headers/header-logo-nav.svg`

- **Size**: 1200×80px
- **Layout**: Logo on left, navigation links on right
- **Use Cases**: Main site header, app navigation bar
- **Customization**: Replace "LOGO" text and navigation link labels

---

### Heroes

Large banner sections for page introductions.

#### `heroes/hero-split-cta.svg`

- **Size**: 1200×500px
- **Layout**: Split layout with content on left, visual on right
- **Features**:
  - Main headline (2 lines)
  - Supporting description text
  - Primary CTA button (filled, accent color)
  - Secondary CTA button (outlined, white)
  - Image placeholder on right side
- **Use Cases**: Landing page hero, product introductions
- **Customization**: Update headline, description, button labels, and image placeholder

---

### Sections

#### `sections/feature-grid-3col.svg`

- **Size**: 1200×480px
- **Layout**: Section title with 3-column grid of feature cards
- **Features**:
  - Centered section title with accent underline
  - 3 cards with icon circles
  - Each card has: icon, title, description (2 lines)
- **Use Cases**: Feature highlights, benefits section, service offerings
- **Customization**: Update section title, icons (emoji), card titles, and descriptions

#### `sections/product-cards-3col.svg`

- **Size**: 1200×420px
- **Layout**: Section title with 3 product cards + "more" indicator
- **Features**:
  - Centered section title with accent underline
  - 3 cards with image placeholder, name, and price
  - Arrow indicator for additional items
- **Use Cases**: Product listings, pricing plans, service packages
- **Customization**: Update section title, product names, prices

#### `sections/timeline-cards-3col.svg`

- **Size**: 1200×380px
- **Layout**: Section title with 3 horizontal timeline cards
- **Features**:
  - Centered section title with accent underline
  - 3 cards with thumbnail image, title, date, description, and CTA button
  - Each card has outlined button
- **Use Cases**: Event schedules, roadmaps, upcoming releases, news timeline
- **Customization**: Update section title, event titles, dates, descriptions, button labels

#### `sections/info-grid-4col-newsletter.svg`

- **Size**: 1200×240px
- **Layout**: 4-column grid with newsletter signup in last column
- **Features**:
  - 3 information columns with title and text
  - Newsletter column with email input and subscribe button
- **Use Cases**: Footer information, company details, newsletter signup
- **Customization**: Update column titles and content, newsletter button label

---

### Footers

#### `footers/footer-copyright-links.svg`

- **Size**: 1200×80px
- **Layout**: Copyright text on left, legal links on right
- **Features**:
  - Copyright notice
  - 3 legal/policy links
- **Use Cases**: Site footer, legal information bar
- **Customization**: Update copyright year/company, link labels

---

## Usage Guidelines

### 1. Viewing Components

Open SVG files directly in a browser or SVG editor (Figma, Sketch, Illustrator, Inkscape) to view and edit.

### 2. Customizing Components

- **Text Content**: Replace placeholder text with your content
- **Colors**: Maintain the dark theme or adjust colors consistently
- **Icons**: Replace emoji placeholders with actual SVG icons or keep as is
- **Images**: Replace `[Image]` placeholders with actual image references

### 3. Combining Components

Stack components vertically to create complete page wireframes:

```
1. headers/header-logo-nav.svg
2. heroes/hero-split-cta.svg
3. sections/feature-grid-3col.svg
4. sections/product-cards-3col.svg
5. sections/timeline-cards-3col.svg
6. sections/info-grid-4col-newsletter.svg
7. footers/footer-copyright-links.svg
```

### 4. Creating New Components

When creating new reusable components:

- Use the same color palette
- Follow the naming convention: `{category}/{component-name}.svg`
- Include component label in bottom-left corner
- Set appropriate viewBox dimensions
- Document in this README

### 5. Integration with Skills

These components can be used with the custom Claude Code skills:

```bash
# Create a new page wireframe from components
/create-page-wireframe "Combine hero-split-cta, feature-grid-3col, and footer components"

# Or manually create a composite wireframe by combining component SVGs
```

## Component Matrix

| Category | Component                 | Width  | Height | Use Case                  |
| -------- | ------------------------- | ------ | ------ | ------------------------- |
| Headers  | header-logo-nav           | 1200px | 80px   | Navigation bar            |
| Heroes   | hero-split-cta            | 1200px | 500px  | Landing page banner       |
| Sections | feature-grid-3col         | 1200px | 480px  | Feature highlights        |
| Sections | product-cards-3col        | 1200px | 420px  | Product listings          |
| Sections | timeline-cards-3col       | 1200px | 380px  | Event schedules           |
| Sections | info-grid-4col-newsletter | 1200px | 240px  | Company info + newsletter |
| Footers  | footer-copyright-links    | 1200px | 80px   | Legal footer              |

## Examples

### Landing Page Layout

```
Total height: 2080px

- header-logo-nav.svg (80px)
- hero-split-cta.svg (500px)
- feature-grid-3col.svg (480px)
- product-cards-3col.svg (420px)
- info-grid-4col-newsletter.svg (240px)
- footer-copyright-links.svg (80px)
```

### Product Page Layout

```
Total height: 1760px

- header-logo-nav.svg (80px)
- hero-split-cta.svg (500px)
- product-cards-3col.svg (420px)
- timeline-cards-3col.svg (380px)
- info-grid-4col-newsletter.svg (240px)
- footer-copyright-links.svg (80px)
```

## Responsive Considerations

These wireframes are designed for desktop (1200px width). When creating responsive designs:

1. **Mobile (375px-768px)**:
   - Stack horizontally-aligned elements vertically
   - Reduce padding and font sizes
   - Convert multi-column grids to single column
   - Make buttons full-width

2. **Tablet (768px-1024px)**:
   - Reduce grid columns (3-col → 2-col)
   - Adjust spacing proportionally
   - Maintain horizontal layouts where possible

3. **Use `/create-responsive-design` skill**:
   ```bash
   /create-responsive-design {wireframe-id} 768
   ```

## Maintenance

When updating components:

1. Update the component SVG file
2. Update this README with any changes
3. Consider backward compatibility with existing pages
4. Test component combinations
5. Document breaking changes

---

**Version**: 1.0
**Last Updated**: 2026-02-15
**Components**: 7
**Categories**: 4 (Headers, Heroes, Sections, Footers)
