# Instructions for Claude

This document provides context and guidelines for Claude (AI assistant) when working on this project.

## Project Overview

This is a **wireframe-driven frontend development project** that supports both React and Astro frameworks with TypeScript and Tailwind CSS v4. The project uses a structured workflow with custom Claude Code skills to streamline the design-to-implementation process.

## Claude Code Skills Structure

This project uses **custom Claude Code skills** for wireframe-driven development:

- **skills/**: 7 custom commands for the workflow
- **docs/**: Example artifacts (wireframes) that skills reference
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

### Workflow: Pencil Design Path

The workflow uses Pencil (.pen) designs as an intermediate high-fidelity design step between wireframes and code. This path produces better results because it includes AI-generated images, precise visual verification, and a single implementation step that handles responsive design and images together.

1. **Design Phase**: Wireframes are created as SVG files with unique 4-digit IDs (0001, 0002, etc.)
2. **Pencil Setup**: The `.pen` file must be created manually in the Pencil application before Claude can work with it
3. **Pencil Design Phase**: High-fidelity Pencil designs are generated from wireframes with AI images
4. **Implementation Phase**: Responsive pages are implemented directly from Pencil designs

```bash
# Workflow
/create-page-wireframe
# [MANUAL] Open Pencil app and create pencil/design.pen
/create-pencil-design {NNNN} 1200   # Desktop
/create-pencil-design {NNNN} 375    # Mobile
/create-page-from-pencil pencil/design.pen
npm run dev
```

### Directory Structure

```
project/
├── .claude/                                  # Claude Code configuration
│   └── settings.json                         # Claude Code settings
├── skills/                                   # Custom Claude Code skills (7 skills)
│   ├── create-page-wireframe/
│   ├── create-responsive-design/
│   ├── create-pencil-design/
│   ├── create-page-from-pencil/
│   ├── generate-pencil-images/
│   ├── convert-images-to-webp/
│   └── generate-wireframe-catalog/
├── specification.md                             # Page specification file (markdown)
├── docs/                                     # Example artifacts
│   └── wireframes/{NNNN}/                    # Wireframe ID directory
│       ├── {breakpoint}/                     # Breakpoint directories (375, 768, 1024, etc.)
│       │   └── {page-name}-wireframe.svg     # Wireframe for that breakpoint
│       └── {page-name}-wireframe.svg         # Original wireframe
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

### Tailwind CSS v4 Configuration

**Important**: Both React and Astro projects use Tailwind CSS v4, which differs from v3:

- Use `@import "tailwindcss";` in CSS file
- DO NOT create `tailwind.config.js`
- DO NOT create `postcss.config.js`
- DO NOT use `@tailwind base/components/utilities` directives

## Available Skills

The project has 7 custom Claude Code skills for frontend development (React and Astro):

1. **create-page-wireframe**: Creates SVG wireframe designs from `specification.md` in the project root (supports optional URL reference and breakpoint for mobile/tablet/desktop viewports)
2. **create-responsive-design**: Creates responsive wireframe visualizations (side-by-side mobile/desktop)
3. **create-pencil-design**: Generates Pencil (.pen) design frames from SVG wireframes
4. **generate-pencil-images**: Generates or regenerates AI images (WebP) in `pencil/images/` for nodes in the selected Pencil (.pen) design frame
5. **create-page-from-pencil**: Implements responsive React or Astro pages from Pencil (.pen) design files, copying images from `pencil/images/` to the assets directory
6. **convert-images-to-webp**: Converts PNG and JPEG images to WebP format for optimized file sizes
7. **generate-wireframe-catalog**: Generates comprehensive wireframe catalog documentation

## Working with This Project

### When User Asks to Create a Page

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **If no wireframe**: Suggest creating one with `/create-page-wireframe`
   - **Ensure `specification.md` exists**: Guide the user to create `specification.md` in the project root with the page specification
   - **Then run the skill**: `/create-page-wireframe`
   - **If user mentions a specific website**: Use URL argument: `/create-page-wireframe "https://example.com"`
   - **If user says "like [website]"**: Use URL argument: `/create-page-wireframe "https://website.com"`
   - **If user wants a mobile wireframe**: Use breakpoint argument: `/create-page-wireframe "" 375`
   - **If user wants a tablet wireframe**: Use breakpoint argument: `/create-page-wireframe "" 768`
3. **If wireframe exists**: Follow the Pencil design path:
   - Ensure `pencil/design.pen` exists (must be created manually in the Pencil application)
   - `/create-pencil-design {NNNN} 1200` (desktop frame)
   - `/create-pencil-design {NNNN} 375` (mobile frame)
   - Review and refine designs in Pencil editor
   - `/create-page-from-pencil pencil/design.pen`

**URL Reference Usage**:

- User says: "Create a page like Stripe" -> Use `/create-page-wireframe "https://stripe.com"`
- User says: "Create a landing page inspired by Vercel" -> Use `/create-page-wireframe "https://vercel.com"`
- User says: "Create a pricing page similar to Linear" -> Use `/create-page-wireframe "https://linear.app/pricing"`

**Breakpoint Usage** (optional second argument, defaults to 1024):

- User says: "Create a mobile wireframe" -> Use `/create-page-wireframe "" 375`
- User says: "Create a tablet wireframe" -> Use `/create-page-wireframe "" 768`
- User says: "Create a mobile wireframe like Stripe" -> Use `/create-page-wireframe "https://stripe.com" 375`
- Desktop is the default (1024px), no breakpoint argument needed

### When User Asks for Responsive Wireframes

1. **Check for responsive wireframe**: Look in `docs/wireframes/{NNNN}/{breakpoint}/`
2. **If not exists**: Create with `/create-responsive-design {NNNN} {breakpoint}`

### When User Asks to Create a Pencil Design

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **Check if `pencil/design.pen` exists**: The `.pen` file must be created manually in the Pencil application before Claude can work with it. If it does not exist, ask the user to:
   - Open the Pencil application
   - Create a new document and save it as `pencil/design.pen` in the project root
   - Ensure the Pencil MCP server is running and connected
3. **If wireframe exists and .pen file is ready**: Use `/create-pencil-design {NNNN} {breakpoint}`
   - Desktop: `/create-pencil-design 0001 1200`
   - Mobile: `/create-pencil-design 0001 375`
4. **If no wireframe**: Suggest creating one with `/create-page-wireframe` first
5. **Output**: A high-fidelity Pencil design frame in the active `.pen` file

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
   - After implementing wireframes
   - When documentation is out of date

### When User Asks to Update Styling

**Mobile-First Approach**:

- Base styles = mobile (no prefix)
- Desktop styles = add breakpoint prefix (md:, lg:, xl:)

**Example**:

```tsx
// Correct: Mobile-first
className = 'px-4 md:px-12 text-xl md:text-2xl'

// Wrong: Desktop-first
className = 'px-12 sm:px-4 text-2xl sm:text-xl'
```

**Responsive Breakpoints**:

- 640px -> `sm:` prefix
- 768px -> `md:` prefix
- 1024px -> `lg:` prefix (default)
- 1280px -> `xl:` prefix
- 1536px -> `2xl:` prefix

### When User Asks to Modify Components

1. **Read the component first**: Always use Read tool before editing
2. **Understand current structure**: Analyze existing code
3. **Preserve responsive design**: Keep mobile-first classes
4. **Maintain color scheme**: Don't change theme colors unless requested
5. **Test suggestions**: Mention testing with `npm run dev`

## Important Guidelines

### DO

- **Use skills proactively**: If a task matches a skill's purpose, use it
- **Use URL references**: When user mentions existing websites, offer to reference them for wireframe creation
- **Follow mobile-first approach**: Default styles for mobile, prefixes for desktop
- **Read files before editing**: Understand context before making changes
- **Suggest workflow**: Guide users through the design -> implementation flow
- **Reference wireframes**: Check wireframes to understand design intent
- **Optimize images**: Recommend WebP, lazy loading, 2x variants
- **Use semantic HTML**: header, nav, main, section, footer, etc.
- **Add alt text**: Include descriptive alt text for all images
- **Preserve TypeScript types**: Maintain type safety in components

### DON'T

- **Don't create tailwind.config.js**: Tailwind v4 doesn't need it
- **Don't use desktop-first**: Always use mobile-first approach
- **Don't skip wireframes**: Encourage wireframe creation for new pages
- **Don't guess paths**: Verify file paths before referencing
- **Don't add emojis**: Unless explicitly requested by user
- **Don't create unnecessary files**: Prefer editing existing files
- **Don't break responsive design**: Test changes across breakpoints
- **Don't ignore asset optimization**: Follow performance best practices

## Skill Execution Order

### CRITICAL: Always Follow This Order

Skills must be called in a specific sequence. **Calling them out of order will cause errors.**

### Complete Order for New Pages

```bash
# PHASE 1: DESIGN
# ----------------------------------------
1. /create-page-wireframe
   -> Reads: specification.md from project root
   -> Output: docs/wireframes/{NNNN}/{page-name}-wireframe.svg
   -> Why: Foundation for all other skills

# PHASE 2: RESPONSIVE WIREFRAMES (Optional)
# ----------------------------------------
2. /create-responsive-design {NNNN} {breakpoint}
   -> Output: docs/wireframes/{NNNN}/{breakpoint}/{page-name}-responsive-wireframe.svg
   -> Why: Visualize responsive layout variants
   -> Skip: If not needed for reference
   -> Requires: Step 1 complete

# PHASE 3: PENCIL SETUP
# ----------------------------------------
3. [MANUAL - User action]
   -> User opens the Pencil application and creates pencil/design.pen
   -> The .pen file format is proprietary and can only be created by the Pencil app
   -> The Pencil MCP server must be running and fully connected

# PHASE 4: PENCIL DESIGN
# ----------------------------------------
4. /create-pencil-design {NNNN} {breakpoint}
   -> Output: High-fidelity design frame in .pen file
   -> Why: Visual design with generated images before coding
   -> Requires: Steps 1 and 3 complete

# PHASE 5: IMPLEMENTATION
# ----------------------------------------
5. /create-page-from-pencil {pen-file-path}
   -> Output: src/pages/{page-name}.astro or src/App.tsx (with images)
   -> Why: Implement from high-fidelity Pencil design
   -> Requires: Step 4 complete (or existing .pen file)

# PHASE 6: TESTING
# ----------------------------------------
6. npm run dev
   -> Start dev server and test
```

### Dependency Chain

```
create-page-wireframe (1)
    ├── create-responsive-design (2) [Optional - responsive wireframe variants]
    │
    └── [MANUAL] Create pencil/design.pen in Pencil app (3)
            └── create-pencil-design (4)
                    └── create-page-from-pencil (5)
```

### Critical Rules for Claude

1. **NEVER suggest skipping create-page-wireframe**
   - It's the foundation for the entire workflow
   - All other skills depend on it

2. **ALWAYS check dependencies before suggesting a skill**
   - Example: User wants a Pencil design
   - Check: Does wireframe exist? Does .pen file exist?
   - If NO: Guide them through the prerequisites

3. **ENFORCE correct order**
   - If user tries to run create-pencil-design without a wireframe:
     - Stop them
     - Explain they need to create the wireframe first
     - Provide the correct command

4. **Verify prerequisites**
   - Before `/create-pencil-design`: Check `docs/wireframes/{NNNN}/` exists and `pencil/design.pen` exists
   - Before `/create-page-from-pencil`: Check `.pen` file exists with design frames

### Common Patterns

**Pattern 1: Creating a New Page (Recommended)**

```bash
# First, create specification.md in the project root
/create-page-wireframe
# [MANUAL] Create pencil/design.pen in Pencil app
/create-pencil-design {NNNN} 1200   # Desktop
/create-pencil-design {NNNN} 375    # Mobile
/create-page-from-pencil pencil/design.pen
npm run dev
```

**Pattern 2: Creating Responsive Wireframe Variants**

```bash
/create-responsive-design {NNNN} 1024
/create-responsive-design {NNNN} 375
```

**Pattern 3: Pencil-to-Code (Existing .pen File)**

```bash
# If .pen file already exists with designs
/create-page-from-pencil pencil/design.pen

# Specify framework explicitly
/create-page-from-pencil pencil/design.pen astro
/create-page-from-pencil pencil/design.pen react

# Specify output path
/create-page-from-pencil pencil/design.pen astro src/pages/landing.astro
```

**Pattern 4: Maintaining Wireframe Documentation**

```bash
# Create wireframe from specification.md, then generate catalog
/create-page-wireframe

# Generate comprehensive catalog
/generate-wireframe-catalog
```

### When User Skips Steps

**User tries**: `/create-pencil-design 0001 1200`
**No wireframe exists**

**Claude should respond**:
"I couldn't find a wireframe for ID 0001. Let's create one first. Please create `specification.md` in the project root describing the page, then run:"

```bash
/create-page-wireframe
```

**User tries**: `/create-pencil-design 0001 1200`
**No `pencil/design.pen` file exists**

**Claude should respond**:
"The `pencil/design.pen` file doesn't exist yet. The `.pen` file format is proprietary and must be created manually in the Pencil application. Please:

1. Open the Pencil application
2. Create a new document
3. Save it as `pencil/design.pen` in the project root
4. Make sure the Pencil MCP server is running and connected

Then I can proceed with generating the design frame."

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
// Correct: Relative path from src/ to assets
import logoImage from '../docs/assets/logo.png'

// Wrong: Incorrect relative path
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
"That skill doesn't exist. Available skills are: create-page-wireframe, create-responsive-design, create-pencil-design, generate-pencil-images, create-page-from-pencil, convert-images-to-webp, generate-wireframe-catalog. Which would you like to use?"

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

**Scenario**: "Create a landing page"

- Use: Create `specification.md` -> `/create-page-wireframe` -> `/create-pencil-design` -> `/create-page-from-pencil`
- Don't: Write component from scratch without wireframe

**Scenario**: "Add this specific image"

- Use: Edit tool to add image import
- Don't: Use skill for single image

## Communication Style

When working with users:

- **Be concise**: Avoid lengthy explanations unless asked
- **Suggest workflows**: Guide users through the skill-based process
- **Confirm actions**: State what you're doing before using skills
- **Provide next steps**: After completing tasks, suggest what's next
- **Reference files**: Use specific file paths (e.g., `src/App.tsx:123`)

### Example Responses

**Good**:

> "I'll create a Pencil design for wireframe 0001 with a 1200px desktop frame, then implement it as a responsive Astro page."

**Too verbose**:

> "Thank you for that request! I'm going to start by creating a comprehensive responsive design wireframe that will show both mobile and desktop layouts side-by-side. This will help visualize how the page adapts across different screen sizes..."

## Version Control Best Practices

Suggest git commits at key milestones:

1. After creating wireframes
2. After implementing components
3. After applying responsive design

**Commit message format**:

```
{action}: {description}

- Detail 1
- Detail 2

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

## Summary

This project uses a **structured, skill-based workflow** for frontend development. As Claude:

1. **Follow the Pencil workflow**: Wireframe -> Pencil Design -> Code is the path for new pages
2. **Use skills appropriately**: Match tasks to available skills
3. **Follow Tailwind v4 conventions**: No config files, use @import
4. **Maintain mobile-first approach**: Base styles for mobile, prefixes for desktop
5. **Reference designs**: Check wireframes and .pen files before implementing
6. **Guide users**: Suggest the Pencil design path and next steps in the workflow
7. **Preserve project patterns**: Colors, structure, TypeScript types

**Workflow**: Create `specification.md` -> `/create-page-wireframe` -> [Create `pencil/design.pen` in Pencil app] -> `/create-pencil-design` -> `/create-page-from-pencil` -> `npm run dev`

**Goal**: Enable efficient, consistent frontend development through automation and best practices.

---

**For detailed skill documentation**: See `skills/{skill-name}/SKILL.md`
**For user documentation**: See `README.md`
