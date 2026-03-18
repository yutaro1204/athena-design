---
name: generate-pages-from-wireframes
description: Implements responsive pages directly from SVG wireframes and spec.md
argument-hint: '[framework] [output-path]'
disable-model-invocation: true
---

# Create Page from Wireframes

You are a frontend developer. Your task is to implement a responsive page directly from SVG wireframe files and `spec.md`, This produces functional code quickly with project theme colors and placeholder images — ideal for rapid prototyping.

## Instructions

1. **Parse the arguments**:
   - First argument: framework - "react", "astro", or "html" (optional, will auto-detect if not provided)
   - Second argument: output path (optional, framework-dependent default)
   - All Page wireframes from spec.md are always generated (no selective IDs)
   - Examples:
     - (no args): All Page wireframes, auto-detect framework, default output path
     - `react`: All Page wireframes with React framework
     - `astro src/pages/landing.astro`: All Page wireframes, Astro, custom output path
   - Default output paths by framework:
     - React: `src/App.tsx`
     - Astro: `src/pages/{page-name}.astro`
     - HTML: `index.html`

2. **Read and parse spec.md**:
   - Read `spec.md` from the project root
   - If `spec.md` does not exist, inform the user and stop:
     "No `spec.md` found. Generate it first with `/generate-spec <path-to-requirements> <single|multi>`"
   - Find the **Wireframe Map** table — classify each entry as Page or Component
   - For each selected Page, identify referenced Components
   - Extract spec sections for each Page: Description, Sections, Layout, Key Components, Variants, Props/Data, Notes
   - Extract spec sections for referenced Components: Props, Variants, Layout

3. **Auto-detect framework** (if not explicitly provided):
   - Check for `astro.config.mjs` or `astro.config.ts` → Astro
   - Check for React imports in existing files → React
   - Check `package.json` for "astro" dependency → Astro
   - Check `package.json` for "react" dependency → React
   - If no `package.json` or no framework dependencies found → HTML
   - Default to HTML if unclear
   - Inform the user which framework was detected

4. **Read project theme colors**:
   - Read the **project root** `CLAUDE.md` (not athena-design/CLAUDE.md) for documented color schemes
   - Read `src/index.css` for CSS variables, Tailwind theme configuration, and custom colors
   - Build a color palette map from wireframe placeholder grays to project theme colors:

   | Wireframe Gray | Semantic Role       | Map To                              |
   | -------------- | ------------------- | ----------------------------------- |
   | `#ffffff`      | Background          | Project background / `bg-background` |
   | `#f5f5f5`     | Alt background      | `bg-muted` or project secondary bg  |
   | `#e0e0e0`     | Border / divider    | `border-border` or project border   |
   | `#cccccc`     | Disabled / placeholder | `text-muted-foreground`           |
   | `#999999`     | Secondary text      | `text-muted-foreground`             |
   | `#666666`     | Body text           | `text-foreground` or project text   |
   | `#333333`     | Heading text        | `text-foreground`                   |
   | `#000000`     | Primary text        | `text-foreground`                   |
   | Colored fills | Accent / CTA        | Project accent color (e.g., `--video-accent`) |

   - If no project theme is defined, fall back to neutral Tailwind palette (`bg-neutral-50`, `text-neutral-900`, etc.)
   - Extract font family from project CSS (e.g., Geist Variable) — use it instead of wireframe default fonts

5. **Read wireframe SVGs across all breakpoints**:
   - For each selected Page ID, read SVGs from:
     - `docs/wireframes/{ID}/{breakpoint}/{page-name}-wireframe.svg` for all available breakpoints (1024, 768, 375)
   - For referenced Component IDs, read from the largest available breakpoint
   - Use the **Read** tool to read SVG files (they are plain text XML)
   - Parse from each SVG:
     - **viewBox**: Extract dimensions (e.g., `viewBox="0 0 1024 2400"`)
     - **Labeled sections**: Text elements marking sections (HEADER, HERO, FEATURES, FOOTER, etc.)
     - **Rect layout**: Position (`x`, `y`), dimensions (`width`, `height`), fills, strokes
     - **Text content**: All `<text>` elements — these contain placeholder copy
     - **Font sizes**: `font-size` attributes on text elements
     - **Annotations**: Text in brackets like `[Image]`, `[Logo]`, `[Icon]`
     - **Component references**: Text like `Component: {ID}` or `Uses: {ComponentName}`
   - If no wireframe SVGs are found, inform the user and stop:
     "No wireframe SVGs found in `docs/wireframes/`. Generate wireframes first with `/generate-svg-wireframes`"

6. **Analyze responsive differences**:
   - Compare SVGs across breakpoints (1024 vs 768 vs 375) for each Page:
     - **Grid columns**: How many items per row at each breakpoint
     - **Layout direction**: Horizontal → vertical stacking changes
     - **Section visibility**: Sections present at one breakpoint but absent at another
     - **Navigation changes**: Full nav vs hamburger, fewer links
     - **Spacing/padding**: Wider margins on desktop, tighter on mobile
     - **Typography scaling**: Heading sizes, body text sizes at each breakpoint
   - Document the responsive delta for each section
   - Determine breakpoint prefixes:
     - 1024px wireframe → `lg:` prefix
     - 768px wireframe → `md:` prefix
     - 375px wireframe → base (no prefix, mobile-first)

7. **Synthesize design decisions**:
   - Combine wireframe structure + spec.md content + project theme colors
   - For **image placeholders**: Create `<div>` placeholders with:
     - Theme background color (e.g., `bg-muted`)
     - Descriptive text from spec.md or wireframe annotations (e.g., "Hero Image", "Product Photo")
     - Correct aspect ratio from wireframe rect dimensions
   - If the project has **actual data sources** (e.g., `public/videos/videos.json`, API endpoints), reference them instead of hardcoded placeholder data
   - Map wireframe section labels to semantic HTML elements:
     - HEADER → `<header>`
     - HERO → `<section>`
     - FEATURES → `<section>`
     - FOOTER → `<footer>`

8. **Update layout/config files** (if needed):
   - Update `<title>` to match the page name from spec.md
   - Add fonts if not already configured
   - Add CSS variables if needed for the page
   - **Skip** if the project already has these configured (common for existing projects like this one)
   - Do NOT overwrite existing theme configuration

9. **Implement the page**:

   Use mobile-first Tailwind CSS, section-by-section following wireframe structure.

   **General rules**:
   - Base styles (no prefix) = mobile layout (375px wireframe)
   - `md:` styles = tablet layout (768px wireframe)
   - `lg:` styles = desktop layout (1024px wireframe)
   - Use **project theme colors** — NOT wireframe grays
   - Use **spec.md content** for text — wireframe text is placeholder
   - Use `hidden lg:block` (or `lg:flex`) for desktop-only sections
   - Use `lg:hidden` for mobile-only elements

   **Section-by-section implementation**:

   a. **Header/Navigation**: `flex justify-between items-center` with responsive padding, logo, nav links
   b. **Hero**: Theme background or placeholder image div, heading from spec.md, subtext, CTA button with accent color
   c. **Card grids**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{n}` with responsive gap, card structure from wireframe
   d. **Feature sections**: Icons (Lucide if available), headings, descriptions from spec.md
   e. **CTA sections**: Accent-colored background with centered content
   f. **Footer**: Multi-column layout with responsive visibility

   **Data-driven approach**:
   - Extract repeated content (cards, features, categories) into arrays
   - Use `.map()` to render repeated elements
   - If project has existing data sources, fetch and use them

   **Framework-specific syntax**:

   | Element         | Astro                        | React                        | HTML                         |
   | --------------- | ---------------------------- | ---------------------------- | ---------------------------- |
   | Class attribute | `class`                      | `className`                  | `class`                      |
   | Comments        | `<!-- -->`                   | `{/* */}`                    | `<!-- -->`                   |
   | Iteration       | `{items.map(item => (...))}` | `{items.map(item => (...))}` | Static HTML (no templating)  |
   | Inline style    | `style="..."`                | `style={{...}}`              | `style="..."`                |
   | File extension  | `.astro`                     | `.tsx`                       | `.html`                      |

   **Leverage existing UI components**:
   - If the project uses shadcn/ui, use existing components (Button, Card, Badge, etc.) instead of raw HTML
   - Check `src/components/ui/` for available components
   - Match wireframe elements to existing component patterns

10. **Map wireframe dimensions to Tailwind**:

    ### Layout Mapping

    | SVG Pattern                            | Tailwind Class                         |
    | -------------------------------------- | -------------------------------------- |
    | Rects stacked vertically               | `flex flex-col`                        |
    | Rects side-by-side                     | `flex flex-row` or `grid grid-cols-N`  |
    | Gap between rects (e.g., 20px)         | `gap-5` or `gap-[20px]`               |
    | Padding from container edge            | `p-4`, `px-6`, `py-8`, etc.           |
    | Rect centered in container             | `mx-auto` or `justify-center`         |
    | Rect fills container width             | `w-full`                              |

    ### Typography Mapping

    | SVG font-size   | Tailwind Class |
    | --------------- | -------------- |
    | 36-48px         | `text-4xl` / `text-[42px]` |
    | 28-32px         | `text-3xl` / `text-[28px]` |
    | 22-26px         | `text-2xl`     |
    | 18-20px         | `text-lg` / `text-xl` |
    | 16px            | `text-base`    |
    | 14px            | `text-sm`      |
    | 12px            | `text-xs`      |

    ### SVG Visual → Tailwind Mapping

    | SVG Attribute                  | Tailwind Class                   |
    | ------------------------------ | -------------------------------- |
    | `fill="#f5f5f5"` (background)  | → project theme bg class         |
    | `stroke="#cccccc"`             | `border` + project border color  |
    | `rx="8"` (rounded rect)       | `rounded-lg`                     |
    | `rx="4"`                       | `rounded`                        |
    | `rx="9999"` or large          | `rounded-full`                   |
    | `opacity="0.5"`               | `opacity-50`                     |

11. **Format and verify**:
    - Run `npm run format` (or `npx prettier --write`) to ensure code style compliance
    - **Astro/React**: Run `npm run dev` to start the development server
    - **HTML**: Open the `.html` file directly in a browser
    - Verify the page loads without errors
    - Check desktop layout matches wireframe structure (all sections present, correct columns)
    - Check mobile layout matches wireframe structure (stacked columns, correct visibility)

12. **Output**:
    - Confirm the page has been implemented
    - Mention the framework used (React, Astro, or HTML)
    - List wireframe IDs consumed
    - List the file(s) created or modified
    - Summarize the responsive behavior:
      - Which sections are visible on mobile vs. desktop
      - Key layout changes (grid columns, stacking direction)
      - Typography scaling
    - Note that **images are placeholders** — suggest replacing them with actual images later
    - Suggest running `npm run dev` (or opening `.html` in browser) to view the page

## Wireframe SVG Parsing Guide

SVG wireframes follow a consistent structure. Here is how to identify key elements:

### Sections
```xml
<!-- Section labels are <text> elements with large font-size, often uppercase -->
<text x="512" y="40" font-size="14" fill="#999" text-anchor="middle">HEADER</text>

<!-- Section backgrounds are <rect> elements -->
<rect x="0" y="0" width="1024" height="80" fill="#ffffff" stroke="#e0e0e0"/>
```

### Grids
```xml
<!-- Multiple rects at the same y position = grid row -->
<rect x="20" y="200" width="320" height="240" fill="#f5f5f5"/>
<rect x="350" y="200" width="320" height="240" fill="#f5f5f5"/>
<rect x="680" y="200" width="320" height="240" fill="#f5f5f5"/>
<!-- 3 rects at y=200 → 3-column grid -->
```

### Spacing & Padding
```xml
<!-- Container rect vs inner content positioning reveals padding -->
<!-- Container: x=0, width=1024 -->
<!-- First inner rect: x=20 → 20px horizontal padding -->
<!-- Vertical gap: rect1 ends at y=440, rect2 starts at y=460 → 20px gap -->
```

### Annotations
```xml
<!-- Bracket text indicates placeholder content -->
<text>[Image]</text>        <!-- Image placeholder -->
<text>[Logo]</text>         <!-- Logo placeholder -->
<text>[Icon: Star]</text>   <!-- Icon placeholder -->
<text>[Video Player]</text> <!-- Interactive element -->
```

### Component References
```xml
<!-- Text referencing a component from spec.md -->
<text>Component: 0003</text>
<text>Uses: VideoCard</text>
```

## Color Translation Guide

Wireframe SVGs use neutral grays as placeholders. Translate them to project theme colors:

| Wireframe Color | Role              | Project Theme Translation          |
| --------------- | ----------------- | ---------------------------------- |
| `#ffffff`       | Primary background | `bg-background`                   |
| `#f5f5f5`       | Secondary background | `bg-muted` / `bg-card`          |
| `#e0e0e0`       | Borders           | `border-border`                    |
| `#cccccc`       | Disabled state    | `text-muted-foreground`            |
| `#999999`       | Secondary text    | `text-muted-foreground`            |
| `#666666`       | Body text         | `text-foreground`                  |
| `#333333`       | Headings          | `text-foreground`                  |
| `#000000`       | Primary text      | `text-foreground`                  |
| Any bright color | Accent / CTA     | Project accent (e.g., `bg-[color]`) |

**Important**: Always check `src/index.css` and the project root `CLAUDE.md` for the actual color values. The table above shows semantic mappings — the actual hex values depend on the project theme.

## Image Placeholder Pattern

Since wireframes don't contain actual images, create styled placeholder divs:

```html
<!-- Basic image placeholder -->
<div class="bg-muted flex items-center justify-center aspect-video rounded-lg">
  <span class="text-muted-foreground text-sm">Hero Image</span>
</div>

<!-- Card image placeholder with specific height -->
<div class="bg-muted flex items-center justify-center h-[200px] lg:h-[240px] rounded-t-lg">
  <span class="text-muted-foreground text-sm">Product Photo</span>
</div>

<!-- Avatar placeholder -->
<div class="bg-muted flex items-center justify-center w-10 h-10 rounded-full">
  <span class="text-muted-foreground text-xs">AV</span>
</div>
```

**React variant** (use `className`):
```tsx
<div className="bg-muted flex items-center justify-center aspect-video rounded-lg">
  <span className="text-muted-foreground text-sm">Hero Image</span>
</div>
```

If the project has actual data sources (e.g., video files in `public/videos/`), use those instead of placeholders.

## Responsive Implementation Pattern

### Mobile-First Approach

Base styles define mobile layout. Desktop overrides use the breakpoint prefix:

```html
<!-- Mobile: single column, Desktop: 3 columns -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
  <!-- Mobile: stacked, Desktop: side-by-side -->
  <div class="flex flex-col lg:flex-row lg:justify-around">
    <!-- Mobile: smaller text, Desktop: larger text -->
    <h1 class="text-[28px] lg:text-[42px] font-bold">
      <!-- Mobile: tighter padding, Desktop: wider padding -->
      <section class="px-4 lg:px-10 py-[30px] lg:py-10">
        <!-- Desktop-only section -->
        <section class="hidden lg:flex flex-col">
          <!-- Mobile-only element -->
          <span class="lg:hidden">Mobile text</span>
          <span class="hidden lg:inline">Desktop text</span>
        </section>
      </section>
    </h1>
  </div>
</div>
```

### Responsive Delta Extraction

Compare wireframe SVGs across breakpoints to determine:

| Property          | How to Extract                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Breakpoint prefix | 1024px wireframe → `lg:`, 768px → `md:`                                                          |
| Hidden sections   | Sections present at 1024 but absent at 375 → `hidden lg:block`                                  |
| Grid columns      | Count same-row rects: 375=1, 768=2, 1024=3 → `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`        |
| Typography scale  | Compare font-size attributes between breakpoint SVGs                                             |
| Padding scale     | Compare container-edge-to-content distances between breakpoint SVGs                              |
| Nav visibility    | Compare header elements: hide extras with `hidden lg:block`                                      |

## Data-Driven Content Pattern

Extract repeated elements into data arrays for clean rendering:

### React Example

```tsx
const features = [
  { title: "Feature One", description: "Description from spec.md", icon: "star" },
  { title: "Feature Two", description: "Description from spec.md", icon: "zap" },
  { title: "Feature Three", description: "Description from spec.md", icon: "shield" },
]

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div key={feature.title} className="flex flex-col gap-3 p-6 bg-card rounded-lg border">
          <div className="bg-muted flex items-center justify-center w-12 h-12 rounded-full">
            <span className="text-muted-foreground text-sm">{feature.icon}</span>
          </div>
          <h3 className="text-lg font-bold">{feature.title}</h3>
          <p className="text-muted-foreground text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### Astro Example

```astro
---
const features = [
  { title: "Feature One", description: "Description from spec.md", icon: "star" },
  { title: "Feature Two", description: "Description from spec.md", icon: "zap" },
  { title: "Feature Three", description: "Description from spec.md", icon: "shield" },
]
---

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {features.map((feature) => (
    <div class="flex flex-col gap-3 p-6 bg-card rounded-lg border">
      <div class="bg-muted flex items-center justify-center w-12 h-12 rounded-full">
        <span class="text-muted-foreground text-sm">{feature.icon}</span>
      </div>
      <h3 class="text-lg font-bold">{feature.title}</h3>
      <p class="text-muted-foreground text-sm">{feature.description}</p>
    </div>
  ))}
</div>
```

### HTML Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .font-primary { font-family: 'Inter', sans-serif; }
  </style>
</head>
<body class="font-primary bg-white text-gray-900">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-10">
    <div class="flex flex-col gap-3 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div class="bg-gray-200 flex items-center justify-center w-12 h-12 rounded-full">
        <span class="text-gray-500 text-sm">star</span>
      </div>
      <h3 class="text-lg font-bold">Feature One</h3>
      <p class="text-gray-500 text-sm">Description from spec.md</p>
    </div>
    <!-- Repeat for each feature -->
  </div>
</body>
</html>
```

## Usage Examples

```bash
# All Page wireframes, auto-detect framework, default output path
/generate-pages-from-wireframes

# Specify framework
/generate-pages-from-wireframes react

# Specify framework and output path
/generate-pages-from-wireframes astro src/pages/landing.astro
```

## Important Notes

- **Wireframe colors are placeholders**: SVG wireframes use neutral grays — always translate to project theme colors from `CLAUDE.md` and `src/index.css`
- **Use spec.md for content**: Wireframe text is often abbreviated or placeholder — use spec.md for actual headings, descriptions, and copy
- **No actual images**: Wireframes don't contain real images — use styled placeholder divs or reference existing project assets
- **Read tool for SVGs**: Use the `Read` tool to read wireframe SVG files — they are plain text XML
- **Prefer existing UI components**: If the project has shadcn/ui or other component libraries, use them instead of building from scratch
- **Placeholder images**: Results use styled placeholder divs and theme-approximated colors instead of actual images — replace with real assets when available
- **Respect existing project structure**: Read existing code before implementing — match patterns, naming conventions, and component structure already in use
- **Mobile-first always**: Base styles = mobile (375px wireframe), prefixed styles = desktop (1024px wireframe)

## Checklist

- [ ] `spec.md` read and parsed (Wireframe Map, Page sections, Component sections)
- [ ] Framework auto-detected or explicitly specified
- [ ] Project theme colors extracted from root `CLAUDE.md` and `src/index.css`
- [ ] Color palette map built (wireframe grays → project theme)
- [ ] All wireframe SVGs read for selected Page IDs across all breakpoints
- [ ] Referenced Component wireframes read from largest breakpoint
- [ ] SVG structure parsed (viewBox, sections, rects, text, annotations)
- [ ] Responsive differences analyzed across breakpoints
- [ ] Responsive delta documented (grid columns, layout direction, visibility, typography, spacing)
- [ ] Design decisions synthesized (wireframe structure + spec content + theme colors)
- [ ] Image placeholders use theme background with descriptive text and correct aspect ratio
- [ ] Layout/config files updated if needed (title, fonts, CSS variables)
- [ ] Page implemented with mobile-first Tailwind CSS
- [ ] All sections from wireframe present in implementation
- [ ] Project theme colors used (not wireframe grays)
- [ ] Text content sourced from spec.md
- [ ] Existing UI components leveraged (shadcn/ui, etc.)
- [ ] Data-driven approach for repeated elements
- [ ] Desktop-only sections hidden on mobile (`hidden lg:block`)
- [ ] Typography sizes match wireframe proportions at each breakpoint
- [ ] Grid column counts match wireframe at each breakpoint
- [ ] Code formatted with Prettier
- [ ] Page loads without errors on dev server
- [ ] Desktop layout verified
- [ ] Mobile layout verified
