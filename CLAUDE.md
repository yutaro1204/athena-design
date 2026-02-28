# Instructions for Claude

This document provides context and guidelines for Claude (AI assistant) when working on this project.

## Project Overview

This is a **wireframe-driven frontend development project** that supports both React and Astro frameworks with TypeScript and Tailwind CSS v4. The project uses a structured workflow with custom Claude Code skills to streamline the design-to-implementation process.

## Claude Code Skills Structure

This project uses **custom Claude Code skills** for wireframe-driven development:

- **skills/**: 10 custom commands for the workflow
- **docs/**: Example artifacts (wireframes, assets, documentation) that skills reference
- **.claude/**: Claude Code configuration (settings only)
- **CLAUDE.md**: This file - project instructions for Claude
- **README.md**: User-facing documentation

## Technology Stack

- **Framework**: React 18 or Astro (auto-detected or specified)
- **Build Tool**: Vite (React) or Astro
- **Styling**: Tailwind CSS v4
- **Design Format**: SVG wireframes, Pencil (.pen) design files
- **Asset Format**: WebP (with JPEG fallback), SVG for icons/logos

## Key Concepts

### Recommended Workflow: Pencil Design Path

The **recommended workflow** uses Pencil (.pen) designs as an intermediate high-fidelity design step between wireframes and code. This path produces better results because it includes AI-generated images, precise visual verification, and a single implementation step that handles responsive design and images together.

1. **Design Phase**: Wireframes are created as SVG files with unique 4-digit IDs (0001, 0002, etc.)
2. **Pencil Design Phase**: High-fidelity Pencil designs are generated from wireframes with AI images
3. **Implementation Phase**: Responsive pages are implemented directly from Pencil designs

```bash
# Recommended workflow
/create-page-wireframe "page description"
/create-pencil-design {NNNN} 1200   # Desktop
/create-pencil-design {NNNN} 375    # Mobile
/create-page-from-pencil pencil/design.pen
npm run dev
```

### Legacy Workflow: Direct Wireframe-to-Code

The standard wireframe-to-code path is still available but involves more manual steps (responsive design, asset creation, asset integration as separate phases):

1. **Design Phase**: Wireframes are created as SVG files
2. **Planning Phase**: Responsive designs and asset requirements are generated from wireframes
3. **Implementation Phase**: React/Astro components are created following wireframe specifications
4. **Integration Phase**: Responsive design and assets are applied to components

### Directory Structure

```
project/
├── .claude/                                  # Claude Code configuration
│   └── settings.json                         # Claude Code settings
├── skills/                                   # Custom Claude Code skills (12 skills)
│   ├── create-page-wireframe/
│   ├── create-page-from-wireframe/
│   ├── create-responsive-design/
│   ├── apply-responsive-design/
│   ├── create-required-assets-list/
│   ├── apply-required-assets/
│   ├── create-components-from-wireframe/
│   ├── generate-wireframe-catalog/
│   ├── create-pencil-design/
│   ├── create-page-from-pencil/
│   ├── convert-images-to-webp/
│   └── generate-pencil-images/
├── docs/                                     # Example artifacts and assets
│   ├── wireframes/{NNNN}/                    # Wireframe ID directory
│   │   ├── {page-name}-wireframe.svg         # Original wireframe design
│   │   ├── {breakpoint}/                     # Responsive versions (768, 1024, etc.)
│   │   │   └── {page-name}-responsive-wireframe.svg
│   │   └── components/                       # Extracted reusable components
│   │       ├── README.md                     # Component library documentation
│   │       ├── headers/*.svg                 # Header components
│   │       ├── heroes/*.svg                  # Hero section components
│   │       ├── sections/*.svg                # Content section components
│   │       └── footers/*.svg                 # Footer components
│   ├── assets/                               # Example image assets
│   └── assets-list.md                        # Asset requirements document
├── pencil/                                   # Pencil design artifacts
│   ├── design.pen                            # Pencil design file
│   └── images/                               # AI-generated images referenced by design.pen
├── src/                                      # Application source code
│   ├── App.tsx                               # React: Main component
│   └── pages/{page-name}.astro               # Astro: Page files (file-based routing)
├── CLAUDE.md                                 # This file - project instructions
└── README.md                                 # User-facing documentation
```

### Framework Support

**React or Astro**: Skills automatically detect the framework or you can specify it explicitly.

**Key Differences**:

| Feature         | React               | Astro                         |
| --------------- | ------------------- | ----------------------------- |
| File extension  | `.tsx`              | `.astro`                      |
| Output path     | `src/App.tsx`       | `src/pages/{page-name}.astro` |
| Class attribute | `className`         | `class`                       |
| Comments        | `{/* comment */}`   | `<!-- comment -->`            |
| Image imports   | `<img src={img} />` | `<img src={img.src} />`       |
| Import location | Top of file         | Frontmatter (`---`)           |
| Routing         | Manual/library      | File-based (automatic)        |

**Usage**:

```bash
# Auto-detect framework (recommended)
/create-page-from-wireframe 0001

# Explicitly specify React
/create-page-from-wireframe 0001 react

# Explicitly specify Astro
/create-page-from-wireframe 0001 astro
```

### Tailwind CSS v4 Configuration

**Important**: Both React and Astro projects use Tailwind CSS v4, which differs from v3:

- ✅ Use `@import "tailwindcss";` in CSS file
- ❌ DO NOT create `tailwind.config.js`
- ❌ DO NOT create `postcss.config.js`
- ❌ DO NOT use `@tailwind base/components/utilities` directives

## Available Skills

The project has 11 custom Claude Code skills for frontend development (React and Astro):

1. **create-page-wireframe**: Creates SVG wireframe designs (supports optional breakpoint for mobile/tablet/desktop viewports)
2. **create-components-from-wireframe**: Extracts reusable component SVGs from wireframes
3. **create-page-from-wireframe**: Implements React or Astro components from wireframes (framework auto-detected)
4. **create-responsive-design**: Creates responsive wireframe visualizations
5. **apply-responsive-design**: Applies responsive design to React or Astro components (framework auto-detected)
6. **create-required-assets-list**: Generates asset requirements documentation
7. **apply-required-assets**: Integrates assets into React or Astro components (framework auto-detected)
8. **generate-wireframe-catalog**: Generates comprehensive wireframe catalog documentation
9. **create-pencil-design**: Generates Pencil (.pen) design frames from SVG wireframes
10. **create-page-from-pencil**: Implements responsive React or Astro pages from Pencil (.pen) design files, copying images from `pencil/images/` to the assets directory
11. **convert-images-to-webp**: Converts PNG and JPEG images to WebP format for optimized file sizes
12. **generate-pencil-images**: Generates or regenerates AI images (WebP) in `pencil/images/` for nodes in the selected Pencil (.pen) design frame

## Working with This Project

### When User Asks to Create a Page

**Recommended: Pencil Design Path** (produces responsive pages with images in fewer steps)

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **If no wireframe**: Suggest creating one with `/create-page-wireframe`
   - **If user mentions a specific website**: Ask if they want to reference it: `/create-page-wireframe "spec" "https://example.com"`
   - **If user says "like [website]"**: Use URL parameter: `/create-page-wireframe "description" "https://website.com"`
   - **If user provides URL**: Use it to analyze and extract design system
   - **If user wants a mobile wireframe**: Use breakpoint argument: `/create-page-wireframe "spec" "" 375`
   - **If user wants a tablet wireframe**: Use breakpoint argument: `/create-page-wireframe "spec" "" 768`
3. **If wireframe exists**: Recommend the Pencil design path:
   - `/create-pencil-design {NNNN} 1200` (desktop frame)
   - `/create-pencil-design {NNNN} 375` (mobile frame)
   - Review and refine designs in Pencil editor
   - `/create-page-from-pencil pencil/design.pen`
4. **Alternative (legacy path)**: Use `/create-page-from-wireframe {NNNN}` followed by apply-responsive-design and apply-required-assets

**URL Reference Usage**:

- User says: "Create a page like Stripe" → Use `/create-page-wireframe "" "https://stripe.com"`
- User says: "Create a landing page inspired by Vercel" → Use `/create-page-wireframe "landing page" "https://vercel.com"`
- User says: "Create a pricing page similar to Linear" → Use `/create-page-wireframe "pricing page" "https://linear.app/pricing"`

**Breakpoint Usage** (optional third argument, defaults to 1024):

- User says: "Create a mobile wireframe" → Use `/create-page-wireframe "description" "" 375`
- User says: "Create a tablet wireframe" → Use `/create-page-wireframe "description" "" 768`
- User says: "Create a mobile wireframe like Stripe" → Use `/create-page-wireframe "" "https://stripe.com" 375`
- Desktop is the default (1024px), no breakpoint argument needed

### When User Asks to Extract Components

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **If wireframe exists**: Use `/create-components-from-wireframe {NNNN}`
3. **Check components directory**: View extracted components in `docs/wireframes/{NNNN}/components/`
4. **Review component library**: Reference `docs/wireframes/{NNNN}/components/README.md`

### When User Asks for Responsive Design

1. **Check for responsive wireframe**: Look in `docs/wireframes/{NNNN}/{breakpoint}/`
2. **If not exists**: Create with `/create-responsive-design {NNNN} {breakpoint}`
3. **Then apply**: Use `/apply-responsive-design {NNNN} {breakpoint}`

### When User Asks About Images/Assets

1. **Check assets-list.md**: Reference `docs/assets-list.md` for requirements
2. **If not exists**: Generate with `/create-required-assets-list {NNNN}`
3. **Check docs/assets/**: Verify assets are placed correctly
4. **Apply assets**: Use `/apply-required-assets`

### When User Asks to Create a Pencil Design

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **If wireframe exists**: Use `/create-pencil-design {NNNN} {breakpoint}`
   - Desktop: `/create-pencil-design 0001 1200`
   - Mobile: `/create-pencil-design 0001 375`
3. **If no wireframe**: Suggest creating one with `/create-page-wireframe` first
4. **Output**: A high-fidelity Pencil design frame in the active `.pen` file

### When User Asks to Implement a Pencil Design as Code

1. **Check if .pen file exists**: Look for `pencil/design.pen` or the specified `.pen` file
2. **If .pen file exists**: Use `/create-page-from-pencil pencil/design.pen`
   - Framework will be auto-detected (Astro or React)
   - Or specify explicitly: `/create-page-from-pencil pencil/design.pen astro` or `/create-page-from-pencil pencil/design.pen react`
3. **Process**: Analyzes desktop and mobile screens in the `.pen` file, extracts images, implements responsive page
4. **Output**: Responsive page with actual images from the design

### When User Asks About Wireframe Catalog or Documentation

1. **Check existing catalog**: Look at `docs/wireframes/README.md`
2. **Generate/update catalog**: Use `/generate-wireframe-catalog`
3. **When to regenerate**:
   - After creating new wireframes
   - After extracting components
   - After implementing wireframes
   - When documentation is out of date

### When User Asks to Update Styling

**Mobile-First Approach**:

- Base styles = mobile (no prefix)
- Desktop styles = add breakpoint prefix (md:, lg:, xl:)

**Example**:

```tsx
// ✅ Correct: Mobile-first
className = 'px-4 md:px-12 text-xl md:text-2xl'

// ❌ Wrong: Desktop-first
className = 'px-12 sm:px-4 text-2xl sm:text-xl'
```

**Responsive Breakpoints**:

- 640px → `sm:` prefix
- 768px → `md:` prefix
- 1024px → `lg:` prefix (default)
- 1280px → `xl:` prefix
- 1536px → `2xl:` prefix

### When User Asks to Modify Components

1. **Read the component first**: Always use Read tool before editing
2. **Understand current structure**: Analyze existing code
3. **Preserve responsive design**: Keep mobile-first classes
4. **Maintain color scheme**: Don't change theme colors unless requested
5. **Test suggestions**: Mention testing with `npm run dev`

## Important Guidelines

### DO

✅ **Use skills proactively**: If a task matches a skill's purpose, use it
✅ **Use URL references**: When user mentions existing websites, offer to reference them for wireframe creation
✅ **Follow mobile-first approach**: Default styles for mobile, prefixes for desktop
✅ **Read files before editing**: Understand context before making changes
✅ **Suggest workflow**: Guide users through the design → implementation flow
✅ **Reference wireframes**: Check wireframes to understand design intent
✅ **Optimize images**: Recommend WebP, lazy loading, 2x variants
✅ **Use semantic HTML**: header, nav, main, section, footer, etc.
✅ **Add alt text**: Include descriptive alt text for all images
✅ **Preserve TypeScript types**: Maintain type safety in components

### DON'T

❌ **Don't create tailwind.config.js**: Tailwind v4 doesn't need it
❌ **Don't use desktop-first**: Always use mobile-first approach
❌ **Don't skip wireframes**: Encourage wireframe creation for new pages
❌ **Don't guess paths**: Verify file paths before referencing
❌ **Don't add emojis**: Unless explicitly requested by user
❌ **Don't create unnecessary files**: Prefer editing existing files
❌ **Don't break responsive design**: Test changes across breakpoints
❌ **Don't ignore asset optimization**: Follow performance best practices

## Skill Execution Order

### ⚠️ CRITICAL: Always Follow This Order

Skills must be called in a specific sequence. **Calling them out of order will cause errors.**

### Complete Order for New Pages

```bash
# PHASE 1: DESIGN
# ────────────────────────────────────────
1️⃣ /create-page-wireframe "page specification"
   → Output: docs/wireframes/{NNNN}/{page-name}-wireframe.svg
   → Why: Foundation for all other skills
   → Skip: ❌ NEVER

# PHASE 2: PLANNING
# ────────────────────────────────────────
2️⃣ /create-components-from-wireframe {NNNN}
   → Output: docs/wireframes/{NNNN}/components/{headers,heroes,sections,footers}/*.svg
   → Why: Extract reusable UI components for consistency
   → Skip: ✅ Optional, but recommended for building component library
   → Requires: Step 1 complete

3️⃣ /create-responsive-design {NNNN} 1024
   → Output: docs/wireframes/{NNNN}/1024/{page-name}-responsive-wireframe.svg
   → Why: Visualize responsive layout before coding
   → Skip: ✅ If desktop-only, but recommend keeping
   → Requires: Step 1 complete

4️⃣ /create-required-assets-list {NNNN}
   → Output: docs/assets-list.md
   → Why: Get asset specifications before creation
   → Skip: ✅ If no images needed
   → Requires: Step 1 complete

# PHASE 3: IMPLEMENTATION
# ────────────────────────────────────────
5️⃣ /create-page-from-wireframe {NNNN}
   → Output: src/App.tsx (component with placeholders)
   → Why: Create component structure
   → Skip: ❌ NEVER (core implementation step)
   → Requires: Step 1 complete

6️⃣ /apply-responsive-design {NNNN} 1024
   → Output: src/App.tsx (with responsive Tailwind classes)
   → Why: Add responsive behavior with mobile-first approach
   → Skip: ✅ If desktop-only
   → Requires: Steps 3 AND 5 complete
   → ⚠️ Must run AFTER create-responsive-design

# PHASE 4: INTEGRATION
# ────────────────────────────────────────
7️⃣ [MANUAL - User action]
   → User creates/collects assets based on assets-list.md
   → User places assets in docs/assets/

8️⃣ /apply-required-assets
   → Output: src/App.tsx (with image imports)
   → Why: Integrate actual images into component
   → Skip: ✅ If no images needed
   → Requires: Steps 4, 5, 6, AND 7 complete
   → ⚠️ Must run AFTER apply-responsive-design

# PHASE 5: PENCIL DESIGN (Alternative Path)
# ────────────────────────────────────────
9️⃣ /create-pencil-design {NNNN} {breakpoint}
   → Output: High-fidelity design frame in .pen file
   → Why: Visual design with generated images before coding
   → Skip: ✅ Optional alternative to direct wireframe-to-code
   → Requires: Step 1 complete

🔟 /create-page-from-pencil {pen-file}
   → Output: src/pages/{page-name}.astro or src/App.tsx (with images)
   → Why: Implement from high-fidelity Pencil design
   → Skip: ✅ If implementing directly from wireframe
   → Requires: Step 9 complete (or existing .pen file)

# PHASE 6: TESTING
# ────────────────────────────────────────
1️⃣1️⃣ npm run dev
   → Start dev server and test
```

### Dependency Chain

```
create-page-wireframe (1)
    ├─→ create-components-from-wireframe (2) [Optional]
    │       → Extracts reusable components for design system
    │
    ├─→ create-responsive-design (3)
    │       └─→ apply-responsive-design (6) ⚠️
    │               └─→ apply-required-assets (8)
    │
    ├─→ create-required-assets-list (4)
    │       └─→ [manual asset creation] (7)
    │               └─→ apply-required-assets (8)
    │
    ├─→ create-page-from-wireframe (5)
    │       └─→ apply-responsive-design (6) ⚠️
    │               └─→ apply-required-assets (8)
    │
    └─→ create-pencil-design (9) [⭐ Recommended Path]
            → Generates high-fidelity .pen design from wireframe
            └─→ create-page-from-pencil (10)
                    → Implements responsive page from .pen file with images
```

### Critical Rules for Claude

1. **NEVER suggest skipping create-page-wireframe**
   - It's the foundation for the entire workflow
   - All other skills depend on it

2. **ALWAYS check dependencies before suggesting a skill**
   - Example: User wants responsive design
   - Check: Does responsive wireframe exist?
   - If NO: Suggest `/create-responsive-design {NNNN} 1024` first
   - If YES: Then suggest `/apply-responsive-design {NNNN} 1024`

3. **ENFORCE correct order**
   - If user tries to run apply-responsive-design without create-responsive-design:
     - Stop them
     - Explain they need to create the responsive wireframe first
     - Provide the correct command

4. **Verify prerequisites**
   - Before `/apply-responsive-design`: Check `docs/wireframes/{NNNN}/{breakpoint}/` exists
   - Before `/apply-required-assets`: Check `docs/assets/` has files
   - Before `/create-page-from-wireframe`: Check `docs/wireframes/{NNNN}/` exists

### Common Patterns

**Pattern 1: Creating a New Page (Legacy Path)**

```bash
/create-page-wireframe "page description"
/create-responsive-design {NNNN} 1024
/create-required-assets-list {NNNN}
/create-page-from-wireframe {NNNN}
/apply-responsive-design {NNNN} 1024
[user creates assets]
/apply-required-assets
```

> Note: The **Pencil Design Path (Pattern 9)** is recommended over this approach. It produces responsive pages with AI-generated images in fewer steps.

**Pattern 2: Desktop-Only Page (Skip Responsive)**

```bash
/create-page-wireframe "page description"
/create-required-assets-list {NNNN}
/create-page-from-wireframe {NNNN}
[user creates assets]
/apply-required-assets
```

**Pattern 3: Simple Page (No Images, No Responsive)**

```bash
/create-page-wireframe "page description"
/create-page-from-wireframe {NNNN}
```

**Pattern 4: Update Existing Page to be Responsive**

```bash
/create-responsive-design {NNNN} 1024
/apply-responsive-design {NNNN} 1024
```

### Pattern 5: Updating Responsive Design

```bash
# Check current breakpoint used
grep -r "md:" src/App.tsx  # Look for existing prefix

# Create new responsive wireframe with different breakpoint
/create-responsive-design {NNNN} 1024  # ⚠️ Must create wireframe first

# Apply new breakpoint
/apply-responsive-design {NNNN} 1024  # Use lg: prefix
```

**Important**: Must run `create-responsive-design` before `apply-responsive-design`, even if just changing breakpoint.

### Pattern 6: Adding New Assets

```bash
# 1. Ensure assets-list.md exists (create if needed)
/create-required-assets-list {NNNN}

# 2. User creates/collects assets based on specifications

# 3. User places assets in docs/assets/

# 4. Integrate into component
/apply-required-assets
```

### Pattern 7: Building a Component Library

```bash
# 1. Create initial wireframe
/create-page-wireframe "landing page with hero, features, products"

# 2. Extract reusable components
/create-components-from-wireframe {NNNN}
# → Creates: docs/wireframes/{NNNN}/components/{headers,heroes,sections,footers}/*.svg

# 3. Review component library
# Check: docs/wireframes/{NNNN}/components/README.md

# 4. Reuse components in future wireframes
# Reference extracted components when designing new pages for consistency
```

**Use case**: Building a design system with reusable UI patterns. Components can be referenced and copied to maintain visual consistency across multiple pages.

### Pattern 8: Maintaining Wireframe Documentation

```bash
# 1. Create multiple wireframes
/create-page-wireframe "landing page"
/create-page-wireframe "dashboard"
/create-page-wireframe "profile page"

# 2. Extract components from each
/create-components-from-wireframe 0001
/create-components-from-wireframe 0002
/create-components-from-wireframe 0003

# 3. Generate comprehensive catalog
/generate-wireframe-catalog
# → Creates: docs/wireframes/README.md with:
#   - Overview and statistics
#   - Detailed wireframe entries
#   - Quick reference table
#   - Aggregated component library
#   - Usage guide and standards

# 4. Keep catalog updated
# After any changes to wireframes, run:
/generate-wireframe-catalog
```

**Use case**: Maintaining up-to-date documentation of all wireframes, components, and implementation status. The catalog serves as a single source of truth for the design system.

### Pattern 9: Pencil Design Workflow (Recommended)

```bash
# 1. Create wireframe
/create-page-wireframe "page description"

# 2. Generate Pencil design frames from wireframe
/create-pencil-design {NNNN} 1200   # Desktop frame
/create-pencil-design {NNNN} 375    # Mobile frame

# 3. Review and refine designs in Pencil editor
# (Manual step: adjust layouts, add images, tweak styling)

# 4. Implement page from Pencil design
/create-page-from-pencil pencil/design.pen
```

**This is the recommended workflow for new pages.** The Pencil design path produces better results because:

- AI-generated images are included automatically (no manual asset creation)
- Responsive design is handled in a single implementation step
- Visual verification is possible before coding via Pencil screenshots
- Fewer skill invocations needed (4 steps vs 7+ in the legacy path)

### Pattern 10: Pencil-to-Code (Existing .pen File)

```bash
# If .pen file already exists with designs
/create-page-from-pencil pencil/design.pen

# Specify framework explicitly
/create-page-from-pencil pencil/design.pen astro
/create-page-from-pencil pencil/design.pen react

# Specify output path
/create-page-from-pencil pencil/design.pen astro src/pages/landing.astro
```

**Use case**: When a Pencil design already exists (created manually or by another team member) and you need to implement it as a responsive page.

**Benefits**:

- Automatic discovery of all wireframes
- Tracks implementation progress
- Documents design patterns
- Provides quick reference
- No manual maintenance needed

### When User Skips Steps

**User tries**: `/apply-responsive-design 0001 1024`
**Error**: Responsive wireframe not found

**Claude should respond**:
"I need to create the responsive wireframe first. Let me run:"

```bash
/create-responsive-design 0001 1024
/apply-responsive-design 0001 1024
```

**User tries**: `/apply-required-assets`
**No assets in docs/assets/**

**Claude should respond**:
"I don't see any assets in docs/assets/. Did you create them based on assets-list.md? Please place your assets there first, then I can integrate them."

**User tries**: `/create-page-from-wireframe 0001`
**No wireframe exists**

**Claude should respond**:
"I couldn't find a wireframe for ID 0001. Let's create one first:"

```bash
/create-page-wireframe "what kind of page would you like?"
```

## Wireframe Analysis

When reading wireframe SVGs:

1. **Extract viewBox dimensions**: First line, e.g., `viewBox="0 0 1024 2400"`
2. **Identify sections**: Look for labeled text (HEADER, HERO, FEATURES, etc.)
3. **Note colors**: Extract fill/stroke colors for consistent styling
4. **Understand layout**: Observe rect positions and sizes for spacing
5. **Find placeholders**: Text like "[Image]", "[Pack Image]", "[Logo]"

### Responsive Wireframe Analysis

When reading responsive wireframes:

- **Left side** (smaller width, ~375px): Mobile view
- **Right side** (larger width, ~1024px): Desktop view
- **Key differences**: Layout direction, grid columns, typography sizes, spacing

## Asset Management

### Image Import Paths

```tsx
// ✅ Correct: Relative path from src/ to docs/assets/
import logoImage from '../docs/assets/logo.png'

// ❌ Wrong: Incorrect relative path
import logoImage from './assets/logo.png'
import logoImage from '/docs/assets/logo.png'
```

### Loading Strategies

```tsx
// Above-the-fold: No loading attribute (eager by default)
<img src={logoImage} alt="Logo" />

// Below-the-fold: Add lazy loading
<img src={packImage} alt="Pack" loading="lazy" />
```

### Responsive Images

```tsx
// Use object-contain for images that should maintain aspect ratio
<img className="object-contain" />

// Use object-cover for images that should fill container
<img className="object-cover" />
```

## Error Handling

### Wireframe Not Found

**Error**: Can't find `docs/wireframes/{NNNN}/`

**Response**:
"I couldn't find a wireframe for ID {NNNN}. Would you like me to create one using `/create-page-wireframe`?"

### Skill Not Available

**Error**: User mentions a skill that doesn't exist

**Response**:
"That skill doesn't exist yet. Available skills are: create-page-wireframe, create-page-from-wireframe, create-responsive-design, apply-responsive-design, create-required-assets-list, apply-required-assets, create-components-from-wireframe, generate-wireframe-catalog, create-pencil-design, create-page-from-pencil, convert-images-to-webp, generate-pencil-images. Which would you like to use?"

### Tailwind Not Working

**Error**: User reports Tailwind styles not applying

**Check**:

1. Verify `src/index.css` has `@import "tailwindcss";`
2. Ensure no `tailwind.config.js` exists
3. Confirm dev server is running
4. Suggest browser cache clear

## Testing Reminders

Always remind users to test:

```bash
# Start dev server
npm run dev

# Test responsive design
# - Resize browser window
# - Use Chrome DevTools device emulation
# - Test on actual devices
```

## Context Awareness

### When Working on This Project

- **Check existing wireframes**: Before creating new ones
- **Reference assets-list.md**: For asset specifications
- **Follow mobile-first**: In all responsive implementations
- **Use Tailwind v4 syntax**: No config files needed
- **Maintain TypeScript**: Preserve type annotations
- **Preserve theme colors**: Keep dark theme (#1a1a2e, #e94560, etc.)

### Project-Specific Colors

This project uses a **dark theme**:

- Background: `#1a1a2e`
- Secondary: `#16213e`
- Accent: `#e94560`
- Border: `#0f3460`
- Text: `#e0e0e0`
- Secondary text: `#a0a0a0`

**Preserve these colors** unless user explicitly requests changes.

## Skill Invocation Priority

When user request matches multiple approaches:

1. **Use skill if available**: Skills are optimized for common tasks
2. **Use direct tools**: For unique or one-off tasks
3. **Combine approaches**: Skills for structure, tools for customization

### Example Scenarios

**Scenario**: "Make the page responsive"

- ✅ Use: `/apply-responsive-design {NNNN} 1024`
- ❌ Don't: Manually edit all classes

**Scenario**: "Add this specific image"

- ✅ Use: Edit tool to add image import
- ❌ Don't: Use skill for single image

**Scenario**: "Create a landing page"

- ✅ Best: `/create-page-wireframe` → `/create-pencil-design` → `/create-page-from-pencil` (recommended Pencil path)
- ✅ OK: `/create-page-wireframe` → `/create-page-from-wireframe` (legacy path)
- ❌ Don't: Write component from scratch without wireframe

## Communication Style

When working with users:

- **Be concise**: Avoid lengthy explanations unless asked
- **Suggest workflows**: Guide users through the skill-based process
- **Confirm actions**: State what you're doing before using skills
- **Provide next steps**: After completing tasks, suggest what's next
- **Reference files**: Use specific file paths (e.g., `src/App.tsx:123`)

### Example Responses

**Good**:

> "I'll create a responsive design for wireframe 0001 with a 1024px breakpoint, then apply it to src/App.tsx."

**Too verbose**:

> "Thank you for that request! I'm going to start by creating a comprehensive responsive design wireframe that will show both mobile and desktop layouts side-by-side. This will help visualize how the page adapts across different screen sizes. After creating this visualization, I'll then proceed to apply the responsive design patterns to your React component using Tailwind CSS's mobile-first approach with the md: prefix for desktop styles..."

## Version Control Best Practices

Suggest git commits at key milestones:

1. After creating wireframes
2. After implementing components
3. After applying responsive design
4. After integrating assets

**Commit message format**:

```
{action}: {description}

- Detail 1
- Detail 2

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Summary

This project uses a **structured, skill-based workflow** for frontend development. As Claude:

1. **Recommend the Pencil workflow**: Wireframe → Pencil Design → Code is the preferred path for new pages
2. **Use skills appropriately**: Match tasks to available skills
3. **Follow Tailwind v4 conventions**: No config files, use @import
4. **Maintain mobile-first approach**: Base styles for mobile, prefixes for desktop
5. **Reference designs**: Check wireframes and .pen files before implementing
6. **Guide users**: Suggest the Pencil design path and next steps in the workflow
7. **Preserve project patterns**: Colors, structure, TypeScript types

**Recommended Workflow**: `/create-page-wireframe` → `/create-pencil-design` → `/create-page-from-pencil` → `npm run dev`

**Goal**: Enable efficient, consistent frontend development through automation and best practices.

---

**For detailed skill documentation**: See `skills/{skill-name}/SKILL.md`
**For user documentation**: See `README.md`
