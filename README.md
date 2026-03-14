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

### Workflow: Pencil Design Path

The workflow uses Pencil (.pen) designs as a high-fidelity design step between wireframes and code:

1. **Design Phase**: Create wireframes as SVG files
2. **Pencil Setup**: Create the `.pen` file manually in the Pencil application (required before Claude can design)
3. **Pencil Design Phase**: Generate high-fidelity designs from wireframes with AI-generated images
4. **Implementation Phase**: Implement responsive pages directly from Pencil designs

```bash
/create-page-wireframe
# [MANUAL] Open Pencil app and create pencil/design.pen
/create-pencil-design 0001 1200   # Desktop
/create-pencil-design 0001 375    # Mobile
/create-page-from-pencil pencil/design.pen
npm run dev
```

This path produces responsive pages with images in fewer steps, allows visual verification before coding, and handles responsive design and image integration in a single implementation step.

All skills work together in a seamless workflow, ensuring consistency from design to implementation. Skills automatically detect whether your project uses React, Astro, or plain HTML, or you can specify the framework explicitly.

## Directory Structure

```
project/
├── .claude/
│   └── settings.json              # Claude Code settings
├── skills/                        # Custom Claude Code skills (9 skills)
│   ├── generate-spec/
│   ├── create-page-wireframe/
│   ├── create-responsive-design/
│   ├── create-pencil-design/
│   ├── create-page-from-pencil/
│   ├── generate-pencil-images/
│   ├── convert-images-to-webp/
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

**Purpose**: Generates a structured `spec.md` from a requirements document for use by create-page-wireframe

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
- Produces a specification ready for immediate use by `/create-page-wireframe`

**When to use**:

- When you have a requirements document and need to create page designs
- Before running `/create-page-wireframe` when no `spec.md` exists yet
- Use `single` for landing pages, portfolios, or single-screen apps
- Use `multi` for business systems, admin panels, or apps with multiple screens

---

### 2. create-page-wireframe

**Purpose**: Creates SVG wireframe designs for pages based on specifications or existing web pages

**Usage**:

```bash
# From spec.md only (desktop, default 1024px)
/create-page-wireframe

# From existing web page URL
/create-page-wireframe "https://stripe.com"

# Mobile wireframe (375px)
/create-page-wireframe "" 375

# Mobile wireframe from URL
/create-page-wireframe "https://stripe.com" 375

# Tablet wireframe (768px)
/create-page-wireframe "" 768
```

**Input**:

- URL (optional): Reference to existing web page for design inspiration
- Breakpoint (optional, numeric): Viewport width for the wireframe. Defaults to `1024`. Controls SVG viewBox width and layout style (e.g., `375` for mobile, `768` for tablet)

**Reads**: `spec.md` from the project root for page specification

**Output**: `{project-root}/docs/wireframes/{NNNN}/{page-name}-wireframe.svg` (always created at the project root directory, not inside the skill/plugin directory)

**Features**:

- Auto-extracts design system from URL (colors, typography, spacing)
- Replicates section structure from analyzed pages
- Combines URL structure with custom specifications
- Uses WebFetch to analyze live web pages
- Adapts layout to breakpoint: mobile (< 768px) uses single-column stacked layout, tablet (768-1023px) uses reduced columns, desktop (>= 1024px) uses multi-column grids

**When to use**:

- Start of every new page design
- When you want to replicate an existing page's structure
- When you need design system inspiration from real websites
- When you need a mobile or tablet wireframe for a specific viewport width

---

### 3. create-responsive-design

**Purpose**: Creates side-by-side visualization of mobile and desktop layouts

**Usage**:

```bash
/create-responsive-design 0001           # Uses 1024px breakpoint (default)
/create-responsive-design 0001 1024      # Uses 1024px breakpoint
/create-responsive-design 0002 640       # Uses 640px breakpoint
```

**Input**:

- Wireframe ID (required)
- Breakpoint in pixels (optional, default: 1024)

**Output**: `docs/wireframes/{NNNN}/{breakpoint}/{page-name}-responsive-wireframe.svg`

**When to use**: To visualize and approve responsive layouts, or to generate responsive wireframe variants from the original design

---

### 4. create-pencil-design

**Purpose**: Generates high-fidelity Pencil (.pen) design frames from existing SVG wireframes

**Usage**:

```bash
# Desktop design from wireframe 0001 (1200px wide)
/create-pencil-design 0001 1200

# Mobile design from wireframe 0001 (375px wide)
/create-pencil-design 0001 375

# Tablet design from wireframe 0002 (768px wide)
/create-pencil-design 0002 768
```

**Input**:

- Wireframe ID (4-digit number, required)
- Breakpoint in pixels (required)

**Output**: Design frame in the active `.pen` file matching the wireframe layout, colors, typography, and content

**Features**:

- Faithfully reproduces wireframe colors, typography, and layout
- Creates reusable components for repeated patterns (cards, category boxes)
- Generates AI images for placeholders
- Supports desktop and mobile breakpoints
- Uses Pencil MCP tools for all .pen file operations

**Prerequisites**:

- A wireframe SVG must exist in `docs/wireframes/{NNNN}/{breakpoint}/`
- **The `pencil/design.pen` file must be created manually in the Pencil application** -- the `.pen` format is proprietary and cannot be created by Claude or standard file tools
- The Pencil application must be running with its MCP server connected

**When to use**: After wireframe is created and the `.pen` file has been set up in the Pencil application, when you want a visual design phase with generated images before implementing code

---

### 5. generate-pencil-images

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

### 6. create-page-from-pencil

**Purpose**: Implements responsive React, Astro, or HTML pages from Pencil (.pen) design files, copying images from `pencil/images/` to the assets directory

**Usage**:

```bash
# Auto-detect framework, default assets directory (src/assets/images)
/create-page-from-pencil pencil/design.pen

# Specify framework
/create-page-from-pencil pencil/design.pen astro
/create-page-from-pencil pencil/design.pen react
/create-page-from-pencil pencil/design.pen html

# Specify output path
/create-page-from-pencil pencil/design.pen astro src/pages/landing.astro
/create-page-from-pencil pencil/design.pen html landing.html

# Specify output path and assets directory
/create-page-from-pencil pencil/design.pen astro src/pages/index.astro src/assets/images
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
- Images generated in `pencil/images/` (via `/generate-pencil-images` or `/create-pencil-design`)

**When to use**: After Pencil designs are approved and ready for implementation

---

### 7. convert-images-to-webp

**Purpose**: Converts PNG and JPEG images to WebP format for significantly reduced file sizes

**Usage**:

```bash
# Convert images in current directory with default quality (80)
/convert-images-to-webp

# Convert images in a specific directory
/convert-images-to-webp public/images

# Convert with custom quality (0-100)
/convert-images-to-webp public/images 90
/convert-images-to-webp images 75
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

### 8. generate-wireframe-catalog

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

### 9. generate-catalog-pdf

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

# PHASE 1: DESIGN
# ----------------------------------------
1. /create-page-wireframe
   -> Reads: spec.md from project root
   -> Creates: docs/wireframes/{NNNN}/{page-name}-wireframe.svg

# PHASE 2: PENCIL SETUP
# ----------------------------------------
2. [MANUAL] Create pencil/design.pen in the Pencil application
   -> Open Pencil app -> Create new document -> Save as pencil/design.pen
   -> The .pen format is proprietary and must be created by the Pencil app
   -> Ensure the Pencil MCP server is running and connected

# PHASE 3: PENCIL DESIGN
# ----------------------------------------
3. /create-pencil-design {NNNN} 1200
   -> Creates: Desktop design frame in .pen file with AI-generated images

4. /create-pencil-design {NNNN} 375
   -> Creates: Mobile design frame in .pen file with AI-generated images

# PHASE 4: REVIEW
# ----------------------------------------
5. [OPTIONAL] Review and refine designs in Pencil editor

# PHASE 5: IMPLEMENTATION
# ----------------------------------------
6. /create-page-from-pencil pencil/design.pen
   -> Creates: Responsive page with images (React, Astro, or HTML, auto-detected)
   -> Handles responsive design and image integration in one step

# PHASE 6: TESTING
# ----------------------------------------
7. npm run dev           # React/Astro
   open index.html       # HTML (no build step needed)
   -> Test responsive design and verify assets
```

### Quick Reference Chart

| Step | Skill                          | Input                     | Output                      | Required? |
| ---- | ------------------------------ | ------------------------- | --------------------------- | --------- |
| 0    | generate-spec                  | Requirements path + type  | spec.md                     | Optional  |
| 1    | create-page-wireframe          | Specification             | Wireframe SVG               | Yes       |
| 2    | [MANUAL] Create .pen in Pencil | -                         | pencil/design.pen           | Yes       |
| 3    | create-pencil-design           | Wireframe ID + Breakpoint | .pen design frame (desktop) | Yes       |
| 4    | create-pencil-design           | Wireframe ID + Breakpoint | .pen design frame (mobile)  | Yes       |
| 5    | [Optional review]              | -                         | Refined designs             | No        |
| 6    | create-page-from-pencil        | .pen file + Framework     | Responsive page with images | Yes       |
| 7    | npm run dev                    | -                         | Running dev server          | Yes       |

### Minimal Workflows

**Standard: Pencil Design Path (responsive page with images):**

```bash
# Wireframe -> Pencil setup -> Pencil design -> Code
/create-page-wireframe
# [MANUAL] Open Pencil app -> Create new document -> Save as pencil/design.pen
/create-pencil-design 0001 1200   # Desktop design frame
/create-pencil-design 0001 375    # Mobile design frame
# Review and refine in Pencil editor
/create-page-from-pencil pencil/design.pen
npm run dev
```

**Astro-Specific Workflow (Multiple Pages):**

```bash
# Create multiple pages with file-based routing
/create-page-wireframe
# [MANUAL] Create pencil/design.pen
/create-pencil-design 0001 1200
/create-pencil-design 0001 375
/create-page-from-pencil pencil/design.pen astro  # -> src/pages/index.astro

/create-page-wireframe
/create-pencil-design 0002 1200
/create-pencil-design 0002 375
/create-page-from-pencil pencil/design.pen astro  # -> src/pages/about.astro

npm run dev
# Access at: /, /about
```

### Important Rules

1. **Never skip create-page-wireframe** - It's the foundation
2. **Create `pencil/design.pen` in the Pencil app BEFORE running create-pencil-design** - The `.pen` format is proprietary and cannot be created by Claude
3. **Test after each phase** - Catch issues early

### Iterative Updates

**Update design:**

```bash
[Edit wireframe manually]
/create-pencil-design 0001 1200
/create-pencil-design 0001 375
/create-page-from-pencil pencil/design.pen
```

---

## Workflow

### Pencil Design Flow

```
+-----------------------------------------------------------------+
|                     1. DESIGN PHASE                              |
+-----------------------------------------------------------------+
                              |
        /create-page-wireframe
                              |
              docs/wireframes/0001/page-wireframe.svg
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
             /create-pencil-design 0001 1200  (Desktop)
             /create-pencil-design 0001 375   (Mobile)
                              |
            High-fidelity .pen design frames with images
                              |
         [Review and refine designs in Pencil editor]
                              |
+-----------------------------------------------------------------+
|                4. IMPLEMENTATION PHASE                           |
+-----------------------------------------------------------------+
                              |
               /create-page-from-pencil pencil/design.pen
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
/create-page-wireframe
# Output: docs/wireframes/0001/tcg-landing-page-wireframe.svg

# 2. [MANUAL] Create .pen file in Pencil application
#    Open Pencil app -> Create new document -> Save as pencil/design.pen
#    Ensure the Pencil MCP server is running and connected

# 3. Create Pencil design frames
/create-pencil-design 0001 1200
# Output: Desktop design frame in pencil/design.pen with AI-generated images

/create-pencil-design 0001 375
# Output: Mobile design frame in pencil/design.pen with AI-generated images

# 4. (Optional) Review and refine designs in Pencil editor

# 5. Implement the page from Pencil design (auto-detects framework)
/create-page-from-pencil pencil/design.pen
# Output: src/pages/tcg-landing-page.astro (Astro), src/App.tsx (React), or index.html (HTML)
# Includes: responsive design, extracted images, mobile-first Tailwind

# 6. Run development server
npm run dev
```

### Example: Explicitly Specifying Framework

```bash
/create-page-from-pencil pencil/design.pen astro
/create-page-from-pencil pencil/design.pen react
/create-page-from-pencil pencil/design.pen html
```

## Detailed Usage

### Working with Multiple Breakpoints

You can create responsive wireframe variants for different breakpoints:

```bash
# Create responsive wireframe for tablets (768px)
/create-responsive-design 0001 768

# Create responsive wireframe for large screens (1024px)
/create-responsive-design 0001 1024

# Create responsive wireframe for extra large screens (1280px)
/create-responsive-design 0001 1280
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
/create-page-from-pencil pencil/design.pen
```

**Manual specification:**

```bash
# Force React
/create-page-from-pencil pencil/design.pen react

# Force Astro
/create-page-from-pencil pencil/design.pen astro

# Force HTML (no build tool needed)
/create-page-from-pencil pencil/design.pen html
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
/create-page-wireframe
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
/create-page-from-pencil pencil/design.pen astro
/create-page-from-pencil pencil/design.pen react
/create-page-from-pencil pencil/design.pen html
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
**Skills**: 9 (generate-spec, create-page-wireframe, create-responsive-design, create-pencil-design, generate-pencil-images, create-page-from-pencil, convert-images-to-webp, generate-wireframe-catalog, generate-catalog-pdf)
