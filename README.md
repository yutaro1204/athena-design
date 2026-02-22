# Frontend Development Skills

A comprehensive set of Claude Code skills for wireframe-driven frontend development with React and Astro frameworks, using TypeScript and Tailwind CSS v4, including component extraction for reusability.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Skills](#skills)
- [Workflow](#workflow)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)
- [Best Practices](#best-practices)

## Overview

This skill collection enables a structured, design-first approach to frontend development:

1. **Design Phase**: Create wireframes as SVG files
2. **Planning Phase**: Generate responsive designs and asset requirements
3. **Implementation Phase**: Build React or Astro components with Tailwind CSS
4. **Integration Phase**: Apply responsive design and integrate assets

All skills work together in a seamless workflow, ensuring consistency from design to implementation. Skills automatically detect whether your project uses React or Astro, or you can specify the framework explicitly.

## Directory Structure

```
project/
├── .claude/
│   └── settings.json              # Claude Code settings
├── skills/                        # Custom Claude Code skills
│   ├── create-page-wireframe/
│   ├── create-components-from-wireframe/
│   ├── create-page-from-wireframe/
│   ├── create-responsive-design/
│   ├── apply-responsive-design/
│   ├── create-required-assets-list/
│   ├── apply-required-assets/
│   └── generate-wireframe-catalog/
├── docs/                          # Example artifacts and documentation
│   ├── wireframes/                # Wireframe files
│   │   ├── README.md              # Wireframe catalog (auto-generated)
│   │   └── {NNNN}/                # Wireframe ID directory (e.g., 0001)
│   │       ├── {page-name}-wireframe.svg              # Original wireframe
│   │       ├── {breakpoint}/                          # Responsive versions
│   │       │   └── {page-name}-responsive-wireframe.svg
│   │       └── components/                            # Extracted reusable components
│   │           ├── README.md
│   │           ├── headers/*.svg
│   │           ├── heroes/*.svg
│   │           ├── sections/*.svg
│   │           └── footers/*.svg
│   ├── assets/                    # Image assets
│   └── assets-list.md             # Asset requirements document
├── src/                           # Application source code
│   ├── App.tsx                    # React: Main component
│   └── pages/{page-name}.astro    # Astro: Page files
├── CLAUDE.md                      # Instructions for Claude
└── README.md                      # This file
```

## Skills

### 1. create-page-wireframe

**Purpose**: Creates SVG wireframe designs for pages based on specifications or existing web pages

**Usage**:

```bash
# From specification only
/create-page-wireframe
/create-page-wireframe "Create a landing page for a TCG with hero section, features, and product cards"

# From existing web page URL
/create-page-wireframe "" "https://stripe.com"

# From specification with URL reference
/create-page-wireframe "Create a SaaS landing page with pricing" "https://vercel.com"
```

**Input**:

- Specification (optional): Text description of page to create
- URL (optional): Reference to existing web page for design inspiration

**Output**: `docs/wireframes/{NNNN}/{page-name}-wireframe.svg`

**Features**:

- Auto-extracts design system from URL (colors, typography, spacing)
- Replicates section structure from analyzed pages
- Combines URL structure with custom specifications
- Uses WebFetch to analyze live web pages

**When to use**:

- Start of every new page design
- When you want to replicate an existing page's structure
- When you need design system inspiration from real websites

---

### 2. create-components-from-wireframe

**Purpose**: Extracts reusable component SVGs from a complete wireframe design

**Usage**:

```bash
/create-components-from-wireframe 0001
/create-components-from-wireframe 0002
```

**Input**: Wireframe ID (4-digit number)

**Output**:

- Component SVG files in `docs/wireframes/{NNNN}/components/{headers,heroes,sections,footers}/`
- Component documentation in `docs/wireframes/{NNNN}/components/README.md`

**When to use**: After creating a wireframe, to extract reusable UI patterns for consistency

---

### 3. create-page-from-wireframe

**Purpose**: Implements React or Astro components from wireframe designs

**Usage**:

```bash
# Auto-detect framework (recommended)
/create-page-from-wireframe 0001
/create-page-from-wireframe 0002

# Explicitly specify framework
/create-page-from-wireframe 0001 react
/create-page-from-wireframe 0001 astro
```

**Input**:
- Wireframe ID (4-digit number, required)
- Framework (optional: 'react' or 'astro', auto-detected if not specified)

**Output**:
- React: Component in `src/App.tsx` with Tailwind CSS
- Astro: Page file in `src/pages/{page-name}.astro` with Tailwind CSS

**When to use**: After wireframe is approved and ready for implementation

---

### 4. create-responsive-design

**Purpose**: Creates side-by-side visualization of mobile and desktop layouts

**Usage**:

```bash
/create-responsive-design 0001           # Uses 768px breakpoint (default)
/create-responsive-design 0001 1024      # Uses 1024px breakpoint
/create-responsive-design 0002 640       # Uses 640px breakpoint
```

**Input**:

- Wireframe ID (required)
- Breakpoint in pixels (optional, default: 768)

**Output**: `docs/wireframes/{NNNN}/{breakpoint}/{page-name}-responsive-wireframe.svg`

**When to use**: Before implementing responsive design to visualize and approve layouts

---

### 5. apply-responsive-design

**Purpose**: Applies responsive design from wireframe to React or Astro component code

**Usage**:

```bash
# Auto-detect framework and use default paths
/apply-responsive-design 0001                          # Default: 768px
/apply-responsive-design 0001 1024                     # 1024px breakpoint

# Specify custom output path (React)
/apply-responsive-design 0001 768 src/components/Page.tsx

# Specify custom output path (Astro)
/apply-responsive-design 0001 768 src/pages/landing.astro
```

**Input**:

- Wireframe ID (required)
- Breakpoint in pixels (optional, default: 768)
- Output path (optional, default: `src/App.tsx` for React or `src/pages/{page-name}.astro` for Astro)

**Output**:
- React: Updated component with responsive Tailwind CSS classes (using `className`)
- Astro: Updated page file with responsive Tailwind CSS classes (using `class`)

**When to use**: After component is implemented to make it responsive

---

### 6. create-required-assets-list

**Purpose**: Analyzes wireframe and generates comprehensive asset requirements

**Usage**:

```bash
/create-required-assets-list 0001
/create-required-assets-list 0002
```

**Input**: Wireframe ID (4-digit number)

**Output**: `docs/assets-list.md` with:

- Required assets list (images, icons, logos)
- Recommended sizes and formats
- Performance optimization strategies
- Directory structure recommendations
- Implementation checklist

**When to use**: After wireframe approval, before asset creation

---

### 7. apply-required-assets

**Purpose**: Integrates actual image assets into React or Astro components

**Usage**:

```bash
# Auto-detect framework and use default paths
/apply-required-assets

# Specify custom React component
/apply-required-assets src/components/Page.tsx

# Specify custom Astro page
/apply-required-assets src/pages/landing.astro
```

**Input**: Component file path (optional, default: `src/App.tsx` for React or `src/pages/{page-name}.astro` for Astro)

**Output**:
- React: Updated component with image imports and proper usage (e.g., `<img src={logoImage} />`)
- Astro: Updated page with image imports and proper usage (e.g., `<img src={logoImage.src} />`)

**Prerequisites**:

- Assets must exist in `docs/assets/` directory
- `docs/assets-list.md` should exist for reference

**When to use**: After assets are created and placed in `docs/assets/`

---

### 8. generate-wireframe-catalog

**Purpose**: Automatically generates a comprehensive wireframe catalog

**Usage**:

```bash
/generate-wireframe-catalog
```

**Input**: None (auto-discovers all wireframes)

**Output**:

- Comprehensive catalog at `docs/wireframes/README.md`
- Includes all wireframes, components, statistics, and usage guide

**When to use**:

- After creating new wireframes
- After extracting components
- After implementing wireframes
- To update documentation

**Features**:

- Auto-discovers all wireframes in `docs/wireframes/`
- Extracts design system from SVG files
- Catalogs all components across wireframes
- Calculates statistics and metrics
- Generates quick reference table
- Includes usage guide and standards

---

## Skill Execution Order

### Recommended Order for New Pages

When creating a new page from scratch, follow this order:

```bash
# 🎨 PHASE 1: DESIGN
# ────────────────────────────────────────
1️⃣ /create-page-wireframe "page specification"
   → Creates: docs/wireframes/{NNNN}/{page-name}-wireframe.svg

# 📋 PHASE 2: PLANNING
# ────────────────────────────────────────
2️⃣ /create-responsive-design {NNNN} 768
   → Creates: docs/wireframes/{NNNN}/768/{page-name}-responsive-wireframe.svg

3️⃣ /create-required-assets-list {NNNN}
   → Creates: docs/assets-list.md

# 💻 PHASE 3: IMPLEMENTATION
# ────────────────────────────────────────
4️⃣ /create-page-from-wireframe {NNNN}
   → Creates: src/App.tsx (React) or src/pages/{page-name}.astro (Astro)
   → Component with placeholders

5️⃣ /apply-responsive-design {NNNN} 768
   → Updates: React component (className) or Astro page (class)
   → Adds responsive Tailwind classes

# 🖼️ PHASE 4: INTEGRATION
# ────────────────────────────────────────
6️⃣ [MANUAL] Create/collect assets based on assets-list.md
   → Place in: docs/assets/

7️⃣ /apply-required-assets
   → Updates: React component or Astro page
   → Integrates image imports with framework-specific syntax

# ✅ PHASE 5: TESTING
# ────────────────────────────────────────
8️⃣ npm run dev
   → Test responsive design and verify assets
```

### Quick Reference Chart

| Step | Skill                       | Input                     | Output                              | Can Skip?           |
| ---- | --------------------------- | ------------------------- | ----------------------------------- | ------------------- |
| 1    | create-page-wireframe       | Specification             | Wireframe SVG                       | ❌ No               |
| 2    | create-responsive-design    | Wireframe ID + Breakpoint | Responsive wireframe                | ✅ If desktop-only  |
| 3    | create-required-assets-list | Wireframe ID              | assets-list.md                      | ✅ If no images     |
| 4    | create-page-from-wireframe  | Wireframe ID + Framework  | React/Astro component               | ❌ No               |
| 5    | apply-responsive-design     | Wireframe ID + Breakpoint | Responsive React/Astro component    | ✅ If desktop-only  |
| 6    | [Manual]                    | assets-list.md            | Image files                         | ✅ If no images     |
| 7    | apply-required-assets       | Component path            | React/Astro component with images   | ✅ If no images     |
| 8    | npm run dev                 | -                         | Running dev server                  | ❌ No (for testing) |

### Minimal Workflows

**Simple Page (No responsive, no images):**

```bash
# Auto-detect framework
/create-page-wireframe
/create-page-from-wireframe 0001
npm run dev

# Or specify framework explicitly
/create-page-wireframe
/create-page-from-wireframe 0001 react  # Creates src/App.tsx
/create-page-from-wireframe 0001 astro  # Creates src/pages/{name}.astro
npm run dev
```

**Responsive Page (No images):**

```bash
# React or Astro (auto-detected)
/create-page-wireframe
/create-responsive-design 0001 768
/create-page-from-wireframe 0001
/apply-responsive-design 0001 768
npm run dev
```

**Complete Page (Everything):**

```bash
# Works for both React and Astro
/create-page-wireframe
/create-responsive-design 0001 768
/create-required-assets-list 0001
/create-page-from-wireframe 0001
/apply-responsive-design 0001 768
[create assets manually]
/apply-required-assets
npm run dev
```

**Astro-Specific Workflow (Multiple Pages):**

```bash
# Create multiple pages with file-based routing
/create-page-wireframe "home page"
/create-page-from-wireframe 0001 astro  # → src/pages/index.astro

/create-page-wireframe "about page"
/create-page-from-wireframe 0002 astro  # → src/pages/about.astro

/create-page-wireframe "contact page"
/create-page-from-wireframe 0003 astro  # → src/pages/contact.astro

npm run dev
# Access at: /, /about, /contact
```

### Important Rules

1. ⚠️ **Never skip create-page-wireframe** - It's the foundation
2. ⚠️ **Run create-responsive-design BEFORE apply-responsive-design** - Need visualization first
3. ⚠️ **Run create-required-assets-list BEFORE creating assets** - Get specifications first
4. ⚠️ **Run apply-responsive-design BEFORE apply-required-assets** - Structure before content
5. ✅ **Test after each phase** - Catch issues early

### Iterative Updates

**Update design:**

```bash
[Edit wireframe manually]
/create-responsive-design 0001 768
/create-page-from-wireframe 0001
/apply-responsive-design 0001 768
```

**Change breakpoint:**

```bash
/create-responsive-design 0001 1024  # lg: prefix
/apply-responsive-design 0001 1024
```

**Add/update assets:**

```bash
[Update assets in docs/assets/]
/apply-required-assets
```

---

## Workflow

### Complete Development Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     1. DESIGN PHASE                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
        /create-page-wireframe "landing page specification"
                              ↓
              docs/wireframes/0001/page-wireframe.svg
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    2. PLANNING PHASE                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
               /create-responsive-design 0001 768
                              ↓
       docs/wireframes/0001/768/page-responsive-wireframe.svg
                              ↓
              /create-required-assets-list 0001
                              ↓
                    docs/assets-list.md
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 3. IMPLEMENTATION PHASE                         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                /create-page-from-wireframe 0001
                              ↓
         src/App.tsx (React) or src/pages/{page}.astro (Astro)
                              ↓
                /apply-responsive-design 0001 768
                              ↓
      React component or Astro page (with responsive design)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  4. INTEGRATION PHASE                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
         [Create/collect assets based on assets-list.md]
                              ↓
              [Place assets in docs/assets/]
                              ↓
                   /apply-required-assets
                              ↓
        React component or Astro page (complete with images)
                              ↓
                        npm run dev
                              ↓
                    ✅ DONE! Review in browser
```

## Quick Start

### Example: Creating a Landing Page

```bash
# 1. Create wireframe
/create-page-wireframe "TCG landing page with hero, features, and products"
# Output: docs/wireframes/0001/tcg-landing-page-wireframe.svg

# 2. Create responsive design visualization
/create-responsive-design 0001 768
# Output: docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg

# 3. Generate asset requirements
/create-required-assets-list 0001
# Output: docs/assets-list.md

# 4. Implement the page (auto-detects framework)
/create-page-from-wireframe 0001
# Output: src/App.tsx (React) or src/pages/tcg-landing-page.astro (Astro)

# 5. Apply responsive design
/apply-responsive-design 0001 768
# Output: Updated component/page with responsive classes

# 6. Create/place assets in docs/assets/
# (Manual step: create images based on assets-list.md)

# 7. Integrate assets
/apply-required-assets
# Output: Updated component/page with image imports
# React: <img src={logoImage} />
# Astro: <img src={logoImage.src} />

# 8. Run development server
npm run dev
```

### Example: Explicitly Specifying Framework

```bash
# For React project
/create-page-from-wireframe 0001 react
/apply-responsive-design 0001 768 src/App.tsx
/apply-required-assets src/App.tsx

# For Astro project
/create-page-from-wireframe 0001 astro
/apply-responsive-design 0001 768 src/pages/landing.astro
/apply-required-assets src/pages/landing.astro
```

## Detailed Usage

### Working with Multiple Breakpoints

You can create multiple responsive designs for different breakpoints:

```bash
# Create responsive design for tablets (768px)
/create-responsive-design 0001 768

# Create responsive design for large screens (1024px)
/create-responsive-design 0001 1024

# Create responsive design for extra large screens (1280px)
/create-responsive-design 0001 1280
```

**Tailwind CSS Breakpoint Mapping:**

- 640px → `sm:` prefix
- 768px → `md:` prefix (most common)
- 1024px → `lg:` prefix
- 1280px → `xl:` prefix
- 1536px → `2xl:` prefix

### Framework Detection and Selection

Skills automatically detect your project framework by checking:

1. **Astro detection**: Looks for `astro.config.mjs` or `astro.config.ts`
2. **React detection**: Looks for React files in `src/` directory

**Auto-detection (recommended):**
```bash
/create-page-from-wireframe 0001
/apply-responsive-design 0001 768
/apply-required-assets
```

**Manual specification:**
```bash
# Force React
/create-page-from-wireframe 0001 react

# Force Astro
/create-page-from-wireframe 0001 astro
```

**Key Differences:**

| Feature              | React                       | Astro                                |
| -------------------- | --------------------------- | ------------------------------------ |
| File extension       | `.tsx`                      | `.astro`                             |
| Output path          | `src/App.tsx`               | `src/pages/{page-name}.astro`        |
| CSS class attribute  | `className="..."`           | `class="..."`                        |
| Comments             | `{/* comment */}`           | `<!-- comment -->`                   |
| Image imports        | `<img src={img} />`         | `<img src={img.src} />`              |
| Import location      | Top of file                 | Frontmatter (`---`)                  |
| Routing              | Manual or library-based     | File-based (automatic)               |
| Component structure  | JSX in function body        | Frontmatter + HTML-like template     |

### Asset Organization

**Recommended asset structure:**

```
docs/assets/
  logo/
    logo.svg
    logo.png
  hero/
    hero-card-animation.webp
    hero-card-animation@2x.webp
  icons/
    icon-strategic-combat.svg
    icon-stunning-art.svg
    icon-global-ranked.svg
  packs/
    pack-starter.webp
    pack-starter@2x.webp
    pack-legends.webp
    pack-premium.webp
  expansions/
    expansion-shadow-realm.webp
    expansion-crystal-warriors.webp
    expansion-cyber-age.webp
```

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

### 3. Plan Assets Early

Generate asset requirements early in the process:

- Parallel workflow (design + asset creation)
- Performance optimization from the start
- Clear specifications for designers/vendors
- Reduced back-and-forth

### 4. Mobile-First Approach

When applying responsive design:

- Default styles target mobile
- Use breakpoint prefixes for larger screens
- Test on actual devices
- Consider touch targets (min 44px)

### 5. Optimize Images

Follow asset-list.md recommendations:

- Use WebP format with JPEG fallback
- Provide 2x retina variants
- Implement lazy loading for below-the-fold images
- Compress all assets before deployment
- Use SVG for logos and icons

### 6. Consistent Naming

Use descriptive, kebab-case names:

- Wireframes: `{page-name}-wireframe.svg`
- Assets: `{category}-{name}.{ext}`
- Components: `Page{ID}` or descriptive names

### 7. Version Control

Commit wireframes and asset lists:

- Track design evolution
- Enable design rollback
- Share with team members
- Document design decisions

### 8. Iterative Refinement

The workflow supports iteration:

1. Update wireframe
2. Regenerate responsive designs
3. Update component code
4. Update assets if needed
5. Test and refine

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

### Responsive Wireframe Required

**Error**: "Responsive wireframe not found"

**Solution**:

```bash
# Create responsive wireframe first
/create-responsive-design 0001 768

# Then apply responsive design
/apply-responsive-design 0001 768
```

### Assets Not Found

**Error**: "Assets not found in docs/assets/"

**Solution**:

1. Check assets-list.md for required assets
2. Create/collect assets
3. Place assets in `docs/assets/` directory
4. Run `/apply-required-assets` again

### Tailwind CSS Not Working

**Error**: Styles not applying

**Solution**:

1. Ensure Tailwind CSS v4 is installed
2. Check `src/index.css` has `@import "tailwindcss";`
3. Verify `npm run dev` is running
4. Clear browser cache

### Wrong Framework Detected

**Error**: Skill creates React file when you want Astro (or vice versa)

**Solution**:

```bash
# Explicitly specify the framework
/create-page-from-wireframe 0001 astro
/apply-responsive-design 0001 768 src/pages/page.astro
/apply-required-assets src/pages/page.astro

# Or for React
/create-page-from-wireframe 0001 react
/apply-responsive-design 0001 768 src/App.tsx
/apply-required-assets src/App.tsx
```

### Astro Page Not Found

**Error**: 404 when accessing Astro page

**Solution**:

1. Ensure page is in `src/pages/` directory
2. Check filename matches URL (e.g., `about.astro` → `/about`)
3. Use `index.astro` for root routes
4. Verify dev server is running: `npm run dev`

## Additional Resources

### Tailwind CSS v4

This project uses Tailwind CSS v4, which has a different configuration:

- No `tailwind.config.js` needed
- Use `@import "tailwindcss";` in CSS
- All utility classes available by default

### Vite Configuration

The project uses Vite (React) or Astro as the build tool:

- Fast development server
- Automatic image optimization
- TypeScript support
- Hot module replacement (HMR)

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

**Astro Routing Examples:**
```
src/pages/index.astro       → /
src/pages/about.astro       → /about
src/pages/blog/index.astro  → /blog
src/pages/blog/post.astro   → /blog/post
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

**Version**: 1.3
**Last Updated**: 2026-02-22
**Frameworks**: React, Astro
**Skills**: 8 (create-page-wireframe, create-components-from-wireframe, create-page-from-wireframe, create-responsive-design, apply-responsive-design, create-required-assets-list, apply-required-assets, generate-wireframe-catalog)
