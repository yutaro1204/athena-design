# Frontend Development Skills

A comprehensive set of Claude Code skills for wireframe-driven frontend development with React, Astro, and plain HTML, using Tailwind CSS v4.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Skills](#skills)
- [Workflow](#workflow)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)
- [Best Practices](#best-practices)

## Overview

This skill collection enables a structured, design-first approach to frontend development.

> **Note:** The current workflows are designed for **developer-only environments** where Claude handles both design and implementation. A **Figma-based workflow** for teams with dedicated designers is planned for a future update.

### Workflow: Pencil Design Path

The workflow uses Pencil (.pen) designs as a high-fidelity design step between wireframes and code:

1. **Spec Phase**: Generate `spec.md` from requirements
2. **Design Phase** (optional): Create wireframes as SVG files for reference
3. **Pencil Setup**: Create the `.pen` file manually in the Pencil application (required before Claude can design)
4. **Pencil Design Phase**: Generate high-fidelity designs directly from spec.md with AI-generated images
5. **Implementation Phase**: Implement responsive pages directly from Pencil designs

```bash
/generate-svg-wireframes                # Optional - for wireframe reference
# [MANUAL] Open Pencil app and create pencil/design.pen
/generate-pencil-frames                  # Designs from spec.md, all breakpoints
/generate-pages-from-pencil pencil/design.pen
npm run dev
```

This path produces responsive pages with images in fewer steps, allows visual verification before coding, and handles responsive design and image integration in a single implementation step.

All skills work together in a seamless workflow, ensuring consistency from design to implementation. Skills automatically detect whether your project uses React, Astro, or plain HTML, or you can specify the framework explicitly.

### Workflow: SVG Wireframe Path

A faster prototyping path that skips the Pencil design step, going directly from SVG wireframes to code:

1. **Spec Phase**: Generate `spec.md` from requirements
2. **Design Phase**: Create wireframes as SVG files
3. **Implementation Phase**: Implement responsive pages directly from wireframes and spec.md

```bash
/generate-spec docs/requirements.md single
/generate-svg-wireframes
/generate-pages-from-wireframes
npm run dev
```

This path is faster but produces less polished results (placeholder images, theme-approximated colors). Best for rapid prototyping or when visual fidelity is less critical.

## Directory Structure

```
project/
├── .claude/
│   └── settings.json              # Claude Code settings
├── skills/                        # Custom Claude Code skills (8 skills)
│   ├── generate-spec/
│   ├── generate-svg-wireframes/
│   ├── generate-pencil-frames/
│   ├── generate-pages-from-pencil/
│   ├── generate-pencil-images/
│   ├── convert-images-into-webp/
│   ├── generate-wireframe-catalog/
│   └── generate-catalog-pdf/
├── docs/                          # Example artifacts and documentation
│   └── wireframes/                # Wireframe files
│       ├── README.md              # Wireframe catalog (auto-generated)
│       └── {NNNN}/                # Wireframe ID directory (e.g., 0001)
│           ├── {page-name}-wireframe.svg              # Original wireframe
│           └── {breakpoint}/                          # Responsive versions
│               └── {page-name}-responsive-wireframe.svg
├── pencil/                        # Pencil design artifacts
│   ├── design.pen                 # Pencil design file
│   └── images/                    # AI-generated images referenced by design.pen
├── src/                           # Application source code (React/Astro)
│   ├── App.tsx                    # React: Main component
│   └── pages/{page-name}.astro    # Astro: Page files
├── index.html                     # HTML: Self-contained page (when using html framework)
├── CLAUDE.md                      # Instructions for Claude
└── README.md                      # This file
```

## Skills

### 1. generate-spec

**Purpose**: Generates a structured `spec.md` from a requirements document for use by generate-svg-wireframes

**Usage**:

```bash
# Single-page application (one wireframe)
/generate-spec docs/requirements.md single

# Multi-page application (multiple wireframes with Wireframe Map)
/generate-spec docs/requirements.md multi
```

**Input**:

- Path to a markdown file (required): Requirements definitions or system requirements document
- Application type (required): `single` or `multi`
  - `single`: Generates a single-page spec with one wireframe ID
  - `multi`: Generates a multi-wireframe spec with a Wireframe Map listing all pages and shared components

**Output**: `spec.md` in the project root. Format depends on application type:
- `single`: One page spec with Page ID, Sections, Layout, Key Components, Notes
- `multi`: Wireframe Map table + individual specs for each page and component, each with a wireframe ID

**Features**:

- Reads abstract requirements and translates them into concrete UI specifications
- Auto-determines the next available wireframe ID from existing wireframes
- Infers layout, components, and sections from functional requirements
- For `multi`: identifies all pages, shared components, and navigation relationships
- Produces a specification ready for immediate use by `/generate-svg-wireframes`

**When to use**:

- When you have a requirements document and need to create page designs
- Before running `/generate-svg-wireframes` when no `spec.md` exists yet
- Use `single` for landing pages, portfolios, or single-screen apps
- Use `multi` for business systems, admin panels, or apps with multiple screens

---

### 2. generate-svg-wireframes

**Purpose**: Creates SVG wireframe designs for all pages and components across multiple breakpoints

**Usage**:

```bash
# All default breakpoints [1024, 768, 375], English
/generate-svg-wireframes

# Desktop only
/generate-svg-wireframes [1024]

# Desktop + mobile
/generate-svg-wireframes [1024, 375]

# All breakpoints in Japanese
/generate-svg-wireframes [1024, 768, 375] ja

# Mobile only in Japanese
/generate-svg-wireframes [375] ja
```

**Input**:

- Breakpoints (optional, array): List of viewport widths. Defaults to `[1024, 768, 375]`.
- Language (optional, string): ISO 639-1 code. Defaults to `en`.

**Reads**: `spec.md` from the project root for page specification

**Output**: `{project-root}/docs/wireframes/{NNNN}/{breakpoint}/{page-name}-wireframe.svg` for all entries × all breakpoints

**Features**:

- Generates wireframes for all breakpoints in a single invocation
- Largest breakpoint generated first as the "primary" wireframe
- Smaller breakpoints adapted from the primary with responsive layout rules
- Adapts layout per breakpoint: mobile (< 768px) single-column, tablet (768-1023px) reduced columns, desktop (>= 1024px) multi-column grids

**When to use**:

- Start of every new page design
- When you need wireframes at multiple viewport widths

---

### 3. generate-pencil-frames

**Purpose**: Generates high-fidelity Pencil (.pen) design frames for all Pages and Components defined in `spec.md`. Reads `spec.md` to discover Page and Component types and to drive all design decisions (layout, sections, components, content). Builds all Components as standalone reusable Pencil components first, then generates Page designs that reference them via component instances.

**Usage**:

```bash
# Default breakpoints [1024, 768, 375], default pencil/design.pen
/generate-pencil-frames

# Desktop only
/generate-pencil-frames [1024]

# Desktop + mobile, custom pen file
/generate-pencil-frames [1024, 375] pencil/my-design.pen
```

**Input**:

- Breakpoints (optional, array): List of viewport widths. Defaults to `[1024, 768, 375]`.
- `.pen` file path (optional, defaults to `pencil/design.pen`)

**Output**: Design frames for all Pages × all breakpoints in the `.pen` file, with Components built as reusable Pencil components and composed into each Page design

**Features**:

- Reads `spec.md` to discover all Pages and their referenced Components, and to drive layout and content decisions
- Uses Pencil design guidelines and style guide for visual decisions (colors, typography, spacing)
- Automatically processes all Pages and all breakpoints in a single invocation
- Builds Components (e.g., Navigation Header, Player Bar) as reusable Pencil components
- Composes Component instances into Page sections where `spec.md` maps them
- Creates additional reusable components for repeated patterns
- Generates AI images for placeholders
- Supports configurable breakpoints (desktop, tablet, mobile)
- Uses Pencil MCP tools for all .pen file operations

**Prerequisites**:

- `spec.md` must exist in the project root (generated by `/generate-spec`)
- **The `pencil/design.pen` file must be created manually in the Pencil application** -- the `.pen` format is proprietary and cannot be created by Claude or standard file tools
- The Pencil application must be running with its MCP server connected

**When to use**: After `spec.md` exists and the `.pen` file has been set up in the Pencil application, when you want a visual design phase with generated images before implementing code

---

### 4. generate-pencil-images

**Purpose**: Generates or regenerates AI images for image nodes within the currently selected Pencil (.pen) design frame

**Usage**:

```bash
# Select a frame in the Pencil editor, then run:
/generate-pencil-images
```

**Input**: None (uses the currently selected frame in the Pencil editor)

**Output**: AI-generated WebP images in `pencil/images/` applied as fills to all image nodes within the selected frame

**Features**:

- Discovers all image nodes within a frame automatically
- Derives descriptive prompts from node names, surrounding text, and design context
- Generates images one by one to avoid timeouts
- Converts generated images to WebP format in `pencil/images/` and removes PNG originals
- Updates image references in `design.pen` from `.png` to `.webp`
- Supports nodes inside component instances (slash-separated paths)
- Verifies results via screenshot after generation
- Reports generation status for each image

**Prerequisites**:

- A `.pen` file must be open with at least one design frame
- A frame must be selected in the Pencil editor
- Pencil MCP server must be available
- `cwebp` tool must be installed (`brew install webp` on macOS)

**When to use**: After creating a Pencil design frame, to generate or regenerate AI images for all image placeholder nodes

---

### 5. generate-pages-from-pencil

**Purpose**: Implements responsive React, Astro, or HTML pages from Pencil (.pen) design files, copying images from `pencil/images/` to the assets directory

**Usage**:

```bash
# Auto-detect framework, default assets directory (src/assets/images)
/generate-pages-from-pencil pencil/design.pen

# Specify framework
/generate-pages-from-pencil pencil/design.pen astro
/generate-pages-from-pencil pencil/design.pen react
/generate-pages-from-pencil pencil/design.pen html

# Specify output path
/generate-pages-from-pencil pencil/design.pen astro src/pages/landing.astro
/generate-pages-from-pencil pencil/design.pen html landing.html

# Specify output path and assets directory
/generate-pages-from-pencil pencil/design.pen astro src/pages/index.astro src/assets/images
```

**Input**:

- Pencil file path (optional, defaults to `pencil/design.pen`)
- Framework (optional: 'react', 'astro', or 'html', auto-detected if not specified)
- Output path (optional, auto-determined from page name)
- Assets directory path (optional, defaults to `src/assets/images`)

**Output**:

- React: Component in `src/App.tsx` with responsive Tailwind CSS and image imports
- Astro: Page file in `src/pages/{page-name}.astro` with responsive Tailwind CSS and image imports
- HTML: Self-contained `index.html` with Tailwind CDN and relative image paths
- Images copied from `pencil/images/` to the assets directory with descriptive names

**Features**:

- Analyzes both desktop and mobile screens in the .pen file
- Copies images from `pencil/images/` to the assets directory with descriptive names (WebP format)
- Generates import statements for images in the output file
- Implements mobile-first responsive design with `lg:` breakpoint
- Maps Pen properties to Tailwind CSS classes
- Uses data-driven patterns for repeated content (cards, categories)

**Prerequisites**:

- A `.pen` file with at least one design screen
- Pencil MCP server available for reading .pen files
- Images generated in `pencil/images/` (via `/generate-pencil-images` or `/generate-pencil-frames`)

**When to use**: After Pencil designs are approved and ready for implementation

---

### 6. convert-images-into-webp

**Purpose**: Converts PNG and JPEG images to WebP format for significantly reduced file sizes

**Usage**:

```bash
# Convert images in current directory with default quality (80)
/convert-images-into-webp

# Convert images in a specific directory
/convert-images-into-webp public/images

# Convert with custom quality (0-100)
/convert-images-into-webp public/images 90
/convert-images-into-webp images 75
```

**Input**:

- Directory path (optional, defaults to current working directory)
- Quality level 0-100 (optional, defaults to 80)

**Output**: WebP files created alongside original images in the same directory

**Features**:

- Converts both PNG and JPEG (`.jpg`, `.jpeg`) formats
- Reports size comparison with reduction percentage
- Removes original PNG/JPEG files after successful conversion
- Updates image references in source files (`.astro`, `.tsx`, `.css`, etc.) to use `.webp` extensions
- Uses `cwebp` for high-quality conversion
- Batch processes all images efficiently

**Prerequisites**:

- `cwebp` tool must be installed (`brew install webp` on macOS)

**When to use**: After generating or collecting images, to optimize them for web delivery

---

### 7. generate-wireframe-catalog

**Purpose**: Automatically generates a comprehensive wireframe catalog

**Usage**:

```bash
/generate-wireframe-catalog
```

**Input**: None (auto-discovers all wireframes)

**Output**:

- Markdown catalog at `docs/wireframes/catalog/catalog.md`
- HTML catalog at `docs/wireframes/catalog/catalog.html`
- Includes all wireframes with SVG thumbnails, statistics, and usage guide

**When to use**:

- After creating new wireframes
- After implementing wireframes
- To update documentation

**Features**:

- Auto-discovers all wireframes in `docs/wireframes/`
- Extracts design system from SVG files
- Calculates statistics and metrics
- Generates quick reference table
- Includes usage guide and standards
- SVG references use `../` prefix (relative to `catalog/` subdirectory)

---

### 8. generate-catalog-pdf

**Purpose**: Converts wireframe catalog HTML to PDF, with SVG-to-PNG conversion for reliable rendering

**Usage**:

```bash
/generate-catalog-pdf
```

**Input**: None (reads `docs/wireframes/catalog/catalog.html`)

**Output**:

- PNG images in `docs/wireframes/catalog/images/` (converted from SVG)
- PDF-optimized HTML at `docs/wireframes/catalog/catalog-pdf.html`
- PDF file at `docs/wireframes/catalog/catalog.pdf`

**Features**:

- Converts SVG wireframe thumbnails to PNG using `rsvg-convert` at 150 DPI
- Generates PDF-optimized HTML with inline-block layout (Puppeteer-compatible)
- Fixed-height image containers for uniform thumbnail rendering
- Page-break rules to keep wireframe entries on single pages
- PNG naming flattens directory structure with `--` separator (e.g., `0001--1024--login-wireframe.png`)

**Prerequisites**:

- `docs/wireframes/catalog/catalog.html` must exist (run `/generate-wireframe-catalog` first)
- `rsvg-convert` must be installed (`brew install librsvg` on macOS)
- `html-to-pdf.js` must exist at the project root

**When to use**:

- After running `/generate-wireframe-catalog` to update the catalog
- When wireframes are added or modified
- When the PDF needs to be refreshed

---

## Skill Execution Order

### Recommended Order: Pencil Design Path

When creating a new page from scratch:

```bash
# PHASE 0: SPECIFICATION
# ----------------------------------------
0. /generate-spec <path-to-requirements> <single|multi>
   -> Reads: requirements markdown file
   -> Creates: spec.md in project root (single-page or multi-wireframe format)

# PHASE 1: DESIGN (Optional)
# ----------------------------------------
1. /generate-svg-wireframes
   -> Reads: spec.md from project root
   -> Creates: docs/wireframes/{NNNN}/{page-name}-wireframe.svg
   -> Optional: For wireframe reference only; not required for Pencil design

# PHASE 2: PENCIL SETUP
# ----------------------------------------
2. [MANUAL] Create pencil/design.pen in the Pencil application
   -> Open Pencil app -> Create new document -> Save as pencil/design.pen
   -> The .pen format is proprietary and must be created by the Pencil app
   -> Ensure the Pencil MCP server is running and connected

# PHASE 3: PENCIL DESIGN
# ----------------------------------------
3. /generate-pencil-frames [breakpoints] [pen-file-path]
   -> Reads: spec.md to discover all Pages and Components, and to drive all design decisions
   -> Uses: Pencil design guidelines and style guide for visual decisions
   -> Creates: Design frames for all Pages × all breakpoints in .pen file
   -> Builds: Components as reusable Pencil components

# PHASE 4: REVIEW
# ----------------------------------------
4. [OPTIONAL] Review and refine designs in Pencil editor

# PHASE 5: IMPLEMENTATION
# ----------------------------------------
5. /generate-pages-from-pencil pencil/design.pen
   -> Creates: Responsive page with images (React, Astro, or HTML, auto-detected)
   -> Handles responsive design and image integration in one step

# PHASE 6: TESTING
# ----------------------------------------
6. npm run dev           # React/Astro
   open index.html       # HTML (no build step needed)
   -> Test responsive design and verify assets
```

### Quick Reference Chart

| Step | Skill                          | Input                            | Output                                                       | Required? |
| ---- | ------------------------------ | -------------------------------- | ------------------------------------------------------------ | --------- |
| 0    | generate-spec                  | Requirements path + type         | spec.md                                                      | Optional  |
| 1    | generate-svg-wireframes         | Specification + breakpoints      | Wireframe SVGs (all breakpoints)                             | Optional  |
| 2    | [MANUAL] Create .pen in Pencil | -                                | pencil/design.pen                                            | Yes       |
| 3    | generate-pencil-frames           | Breakpoints + pen file path      | .pen design frames for all Pages × all breakpoints           | Yes       |
| 4    | [Optional review]              | -                                | Refined designs                                              | No        |
| 5    | generate-pages-from-pencil        | .pen file + Framework            | Responsive page with images                                  | Yes       |
| 6    | npm run dev                    | -                                | Running dev server                                           | Yes       |

### Minimal Workflows

**Standard: Pencil Design Path (responsive page with images):**

```bash
# Spec -> Pencil setup -> Pencil design -> Code
/generate-svg-wireframes                # Optional - for wireframe reference
# [MANUAL] Open Pencil app -> Create new document -> Save as pencil/design.pen
/generate-pencil-frames                  # Designs from spec.md, all breakpoints
# Review and refine in Pencil editor
/generate-pages-from-pencil pencil/design.pen
npm run dev
```

**Astro-Specific Workflow (Multiple Pages):**

```bash
# Generate spec, then create Pencil designs directly
/generate-svg-wireframes                # Optional
# [MANUAL] Create pencil/design.pen
/generate-pencil-frames                  # Processes all Pages (0001, 0002, etc.)
/generate-pages-from-pencil pencil/design.pen astro

npm run dev
```

### Important Rules

1. **Ensure `spec.md` exists** - `generate-pencil-frames` reads it to discover all Pages and Components, and to drive all design decisions
2. **Create `pencil/design.pen` in the Pencil app BEFORE running generate-pencil-frames** - The `.pen` format is proprietary and cannot be created by Claude
3. **Wireframes are optional** - `generate-svg-wireframes` can be run for reference, but `generate-pencil-frames` does not depend on wireframe SVGs
4. **Test after each phase** - Catch issues early

### Iterative Updates

**Update design:**

```bash
[Edit spec.md]
/generate-pencil-frames
/generate-pages-from-pencil pencil/design.pen
```

---

## Workflow

### Pencil Design Flow

```
+-----------------------------------------------------------------+
|                  1. DESIGN PHASE (Optional)                      |
+-----------------------------------------------------------------+
                              |
        /generate-svg-wireframes (optional reference)
                              |
+-----------------------------------------------------------------+
|               2. PENCIL SETUP PHASE [MANUAL]                     |
+-----------------------------------------------------------------+
                              |
     Open Pencil app -> Create new document -> Save as pencil/design.pen
     (.pen is a proprietary format -- must be created in Pencil app)
                              |
+-----------------------------------------------------------------+
|                  3. PENCIL DESIGN PHASE                          |
+-----------------------------------------------------------------+
                              |
                    /generate-pencil-frames
                              |
       Reads spec.md -> discovers all Pages and Components
       Uses design guidelines + style guide for visual decisions
       Builds Components as reusable Pencil components
       Creates design frames for all Pages x all breakpoints
                              |
         [Review and refine designs in Pencil editor]
                              |
+-----------------------------------------------------------------+
|                4. IMPLEMENTATION PHASE                           |
+-----------------------------------------------------------------+
                              |
               /generate-pages-from-pencil pencil/design.pen
                              |
      Responsive page with images (React, Astro, or HTML)
                              |
                  npm run dev (React/Astro)
                  open index.html (HTML)
                              |
                    DONE! Review in browser
```

## Quick Start

### Example: Creating a Landing Page

```bash
# 1. Generate spec.md from requirements (or create it manually)
/generate-spec docs/requirements.md multi
/generate-svg-wireframes              # Optional - for wireframe reference

# 2. [MANUAL] Create .pen file in Pencil application
#    Open Pencil app -> Create new document -> Save as pencil/design.pen
#    Ensure the Pencil MCP server is running and connected

# 3. Create Pencil design frames from spec.md
/generate-pencil-frames
# Reads spec.md to discover all Pages (0001, 0002) and their referenced Components (0003, 0004, 0005)
# Uses design guidelines + style guide for visual decisions
# Builds Components as reusable Pencil components
# Output: Design frames for all Pages x all breakpoints in pencil/design.pen

# 4. (Optional) Review and refine designs in Pencil editor

# 5. Implement the page from Pencil design (auto-detects framework)
/generate-pages-from-pencil pencil/design.pen
# Output: src/pages/tcg-landing-page.astro (Astro), src/App.tsx (React), or index.html (HTML)
# Includes: responsive design, extracted images, mobile-first Tailwind

# 6. Run development server
npm run dev
```

### Example: Explicitly Specifying Framework

```bash
/generate-pages-from-pencil pencil/design.pen astro
/generate-pages-from-pencil pencil/design.pen react
/generate-pages-from-pencil pencil/design.pen html
```

## Detailed Usage

### Working with Multiple Breakpoints

The `generate-svg-wireframes` skill generates all breakpoints in a single invocation:

```bash
# All default breakpoints [1024, 768, 375]
/generate-svg-wireframes

# Desktop + mobile only
/generate-svg-wireframes [1024, 375]

# Custom breakpoints
/generate-svg-wireframes [1280, 1024, 768, 375]
```

**Tailwind CSS Breakpoint Mapping:**

- 640px -> `sm:` prefix
- 768px -> `md:` prefix
- 1024px -> `lg:` prefix (default)
- 1280px -> `xl:` prefix
- 1536px -> `2xl:` prefix

### Framework Detection and Selection

Skills automatically detect your project framework by checking:

1. **Astro detection**: Looks for `astro.config.mjs` or `astro.config.ts`
2. **React detection**: Looks for React imports or `package.json` with "react" dependency
3. **HTML fallback**: If no `package.json` or no framework dependencies found, defaults to HTML

**Auto-detection (recommended):**

```bash
/generate-pages-from-pencil pencil/design.pen
```

**Manual specification:**

```bash
# Force React
/generate-pages-from-pencil pencil/design.pen react

# Force Astro
/generate-pages-from-pencil pencil/design.pen astro

# Force HTML (no build tool needed)
/generate-pages-from-pencil pencil/design.pen html
```

**Key Differences:**

| Feature             | React                   | Astro                            | HTML                             |
| ------------------- | ----------------------- | -------------------------------- | -------------------------------- |
| File extension      | `.tsx`                  | `.astro`                         | `.html`                          |
| Output path         | `src/App.tsx`           | `src/pages/{page-name}.astro`    | `index.html`                     |
| CSS class attribute | `className="..."`       | `class="..."`                    | `class="..."`                    |
| Comments            | `{/* comment */}`       | `<!-- comment -->`               | `<!-- comment -->`               |
| Image imports       | `<img src={img} />`     | `<img src={img.src} />`          | `<img src="path/img.webp" />`    |
| Import location     | Top of file             | Frontmatter (`---`)              | N/A (relative paths)             |
| Routing             | Manual or library-based | File-based (automatic)           | N/A (static file)                |
| Component structure | JSX in function body    | Frontmatter + HTML-like template | Standard HTML                    |
| Build tool          | Vite                    | Astro                            | None (open in browser)           |
| Tailwind            | `@import` in CSS        | `@import` in CSS                 | CDN `<script>` tag               |

### Wireframe ID System

- **Format**: 4-digit numbers (0001, 0002, 0003, ...)
- **Purpose**: Unique identifier for each page design
- **Usage**: Consistent across all skills for easy reference

**Examples:**

- `0001` - Landing page
- `0002` - Dashboard page
- `0003` - Profile page
- `0004` - Settings page

## Best Practices

### 1. Design First, Code Second

Always create and approve wireframes before implementing code. This ensures:

- Clear design intent
- Consistent user experience
- Reduced implementation changes
- Better collaboration with designers

### 2. Use Responsive Wireframes

Create responsive wireframes to visualize layouts before coding:

- Prevents layout surprises
- Ensures mobile-friendly designs
- Guides implementation decisions
- Facilitates design approval

### 3. Mobile-First Approach

When applying responsive design:

- Default styles target mobile
- Use breakpoint prefixes for larger screens
- Test on actual devices
- Consider touch targets (min 44px)

### 4. Optimize Images

Follow image optimization best practices:

- Use WebP format with JPEG fallback
- Provide 2x retina variants
- Implement lazy loading for below-the-fold images
- Compress all assets before deployment
- Use SVG for logos and icons

### 5. Consistent Naming

Use descriptive, kebab-case names:

- Wireframes: `{page-name}-wireframe.svg`
- Assets: `{category}-{name}.{ext}`
- Components: `Page{ID}` or descriptive names

### 6. Version Control

Commit wireframes and designs:

- Track design evolution
- Enable design rollback
- Share with team members
- Document design decisions

### 7. Iterative Refinement

The workflow supports iteration:

1. Update wireframe
2. Regenerate Pencil designs
3. Implement page from Pencil
4. Test and refine

## Troubleshooting

### Wireframe Not Found

**Error**: "Wireframe not found for ID 0001"

**Solution**:

```bash
# Check if wireframe exists
ls docs/wireframes/0001/

# Create wireframe if missing
/generate-svg-wireframes
```

### Tailwind CSS Not Working

**Error**: Styles not applying

**Solution**:

1. Ensure Tailwind CSS v4 is installed
2. Check `src/index.css` has `@import "tailwindcss";`
3. Verify `npm run dev` is running
4. Clear browser cache

### Wrong Framework Detected

**Error**: Skill creates the wrong framework output (e.g., React when you want Astro or HTML)

**Solution**:

```bash
# Explicitly specify the framework
/generate-pages-from-pencil pencil/design.pen astro
/generate-pages-from-pencil pencil/design.pen react
/generate-pages-from-pencil pencil/design.pen html
```

### Astro Page Not Found

**Error**: 404 when accessing Astro page

**Solution**:

1. Ensure page is in `src/pages/` directory
2. Check filename matches URL (e.g., `about.astro` -> `/about`)
3. Use `index.astro` for root routes
4. Verify dev server is running: `npm run dev`

## Additional Resources

### Tailwind CSS v4

This project uses Tailwind CSS v4, which has a different configuration:

- No `tailwind.config.js` needed
- Use `@import "tailwindcss";` in CSS
- All utility classes available by default

### Build Tools

The project uses Vite (React), Astro, or no build tool (HTML):

- **React**: Vite with fast dev server, HMR, TypeScript support
- **Astro**: Built-in dev server, automatic image optimization, SSG
- **HTML**: No build step required — open `.html` files directly in a browser

### Framework-Specific Features

**React + TypeScript:**

- Type safety for props and components
- Component-based architecture with `.tsx` files
- JSX syntax with `className` for CSS classes
- Image imports: `<img src={image} />`
- Better IDE support and fewer runtime errors
- Single-page application (SPA) architecture

**Astro:**

- File-based routing (pages in `src/pages/`)
- Component frontmatter with `---` delimiters
- HTML-like syntax with `class` for CSS classes
- Image imports with `.src`: `<img src={image.src} />`
- Static site generation (SSG) by default
- Partial hydration for interactive components
- Zero JavaScript by default (ship less JS)
- Multi-page application (MPA) architecture

**HTML:**

- No build step or framework required — open directly in a browser
- Self-contained `.html` files with all markup, styles, and content
- Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Relative paths for images (`<img src="assets/images/logo.webp" />`)
- Standard HTML with `class` for CSS classes
- Ideal for prototypes, static pages, or projects without Node.js

**Astro Routing Examples:**

```
src/pages/index.astro       -> /
src/pages/about.astro       -> /about
src/pages/blog/index.astro  -> /blog
src/pages/blog/post.astro   -> /blog/post
```

## Contributing

To add new skills:

1. Create skill directory: `skills/{skill-name}/`
2. Create `SKILL.md` with skill definition
3. Follow existing skill patterns
4. Update this README.md
5. Test the skill thoroughly

## Support

For issues or questions:

- Review skill documentation in `skills/{skill-name}/SKILL.md`
- Check this README for workflow guidance
- Refer to CLAUDE.md for AI-specific instructions

---

**Version**: 2.2
**Last Updated**: 2026-03-14
**Frameworks**: React, Astro, HTML
**Skills**: 8 (generate-spec, generate-svg-wireframes, generate-pencil-frames, generate-pencil-images, generate-pages-from-pencil, convert-images-into-webp, generate-wireframe-catalog, generate-catalog-pdf)
