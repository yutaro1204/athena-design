# Instructions for Claude

This document provides context and guidelines for Claude (AI assistant) when working on this project.

## Project Overview

This is a **wireframe-driven frontend development project** using React, TypeScript, and Tailwind CSS v4. The project uses a structured workflow with custom Claude Code skills to streamline the design-to-implementation process.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Design Format**: SVG wireframes
- **Asset Format**: WebP (with JPEG fallback), SVG for icons/logos

## Key Concepts

### Wireframe-Driven Development

1. **Design Phase**: Wireframes are created as SVG files with unique 4-digit IDs (0001, 0002, etc.)
2. **Planning Phase**: Responsive designs and asset requirements are generated from wireframes
3. **Implementation Phase**: React components are created following wireframe specifications
4. **Integration Phase**: Responsive design and assets are applied to components

### Directory Structure

```
docs/wireframes/{NNNN}/              # Wireframe ID directory
  {page-name}-wireframe.svg          # Original wireframe design
  {breakpoint}/                      # Responsive versions (768, 1024, etc.)
    {page-name}-responsive-wireframe.svg
  components/                        # Extracted reusable components
    README.md                        # Component library documentation
    headers/*.svg                    # Header components
    heroes/*.svg                     # Hero section components
    sections/*.svg                   # Content section components
    footers/*.svg                    # Footer components
docs/assets/                         # Image assets
docs/assets-list.md                  # Asset requirements document
src/App.tsx                          # Main React component
```

### Tailwind CSS v4 Configuration

**Important**: This project uses Tailwind CSS v4, which differs from v3:
- ✅ Use `@import "tailwindcss";` in `src/index.css`
- ❌ DO NOT create `tailwind.config.js`
- ❌ DO NOT create `postcss.config.js`
- ❌ DO NOT use `@tailwind base/components/utilities` directives

## Available Skills

The project has 8 custom Claude Code skills for frontend development:

1. **create-page-wireframe**: Creates SVG wireframe designs
2. **create-components-from-wireframe**: Extracts reusable component SVGs from wireframes
3. **create-page-from-wireframe**: Implements React components from wireframes
4. **create-responsive-design**: Creates responsive wireframe visualizations
5. **apply-responsive-design**: Applies responsive design to components
6. **create-required-assets-list**: Generates asset requirements documentation
7. **apply-required-assets**: Integrates assets into components
8. **generate-wireframe-catalog**: Generates comprehensive wireframe catalog documentation

## Working with This Project

### When User Asks to Create a Page

1. **Check if wireframe exists**: Look in `docs/wireframes/{NNNN}/`
2. **If no wireframe**: Suggest creating one with `/create-page-wireframe`
3. **If wireframe exists**: Use `/create-page-from-wireframe {NNNN}`

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
className="px-4 md:px-12 text-xl md:text-2xl"

// ❌ Wrong: Desktop-first
className="px-12 sm:px-4 text-2xl sm:text-xl"
```

**Responsive Breakpoints**:
- 640px → `sm:` prefix
- 768px → `md:` prefix (most common)
- 1024px → `lg:` prefix
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

3️⃣ /create-responsive-design {NNNN} 768
   → Output: docs/wireframes/{NNNN}/768/{page-name}-responsive-wireframe.svg
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

6️⃣ /apply-responsive-design {NNNN} 768
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

# PHASE 5: TESTING
# ────────────────────────────────────────
9️⃣ npm run dev
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
    └─→ create-page-from-wireframe (5)
            └─→ apply-responsive-design (6) ⚠️
                    └─→ apply-required-assets (8)
```

### Critical Rules for Claude

1. **NEVER suggest skipping create-page-wireframe**
   - It's the foundation for the entire workflow
   - All other skills depend on it

2. **ALWAYS check dependencies before suggesting a skill**
   - Example: User wants responsive design
   - Check: Does responsive wireframe exist?
   - If NO: Suggest `/create-responsive-design {NNNN} 768` first
   - If YES: Then suggest `/apply-responsive-design {NNNN} 768`

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

**Pattern 1: Creating a New Page**
```bash
/create-page-wireframe "page description"
/create-responsive-design {NNNN} 768
/create-required-assets-list {NNNN}
/create-page-from-wireframe {NNNN}
/apply-responsive-design {NNNN} 768
[user creates assets]
/apply-required-assets
```

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
/create-responsive-design {NNNN} 768
/apply-responsive-design {NNNN} 768
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

**Benefits**:
- Automatic discovery of all wireframes
- Tracks implementation progress
- Documents design patterns
- Provides quick reference
- No manual maintenance needed

### When User Skips Steps

**User tries**: `/apply-responsive-design 0001 768`
**Error**: Responsive wireframe not found

**Claude should respond**:
"I need to create the responsive wireframe first. Let me run:"
```bash
/create-responsive-design 0001 768
/apply-responsive-design 0001 768
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

1. **Extract viewBox dimensions**: First line, e.g., `viewBox="0 0 1200 2400"`
2. **Identify sections**: Look for labeled text (HEADER, HERO, FEATURES, etc.)
3. **Note colors**: Extract fill/stroke colors for consistent styling
4. **Understand layout**: Observe rect positions and sizes for spacing
5. **Find placeholders**: Text like "[Image]", "[Pack Image]", "[Logo]"

### Responsive Wireframe Analysis

When reading responsive wireframes:
- **Left side** (smaller width, ~375px): Mobile view
- **Right side** (larger width, ~1200px): Desktop view
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
"That skill doesn't exist yet. Available skills are: create-page-wireframe, create-page-from-wireframe, create-responsive-design, apply-responsive-design, create-required-assets-list, apply-required-assets. Which would you like to use?"

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
- ✅ Use: `/apply-responsive-design {NNNN} 768`
- ❌ Don't: Manually edit all classes

**Scenario**: "Add this specific image"
- ✅ Use: Edit tool to add image import
- ❌ Don't: Use skill for single image

**Scenario**: "Create a landing page"
- ✅ Use: `/create-page-wireframe` → `/create-page-from-wireframe`
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
> "I'll create a responsive design for wireframe 0001 with a 768px breakpoint, then apply it to src/App.tsx."

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

1. **Understand the workflow**: Design → Plan → Implement → Integrate
2. **Use skills appropriately**: Match tasks to available skills
3. **Follow Tailwind v4 conventions**: No config files, use @import
4. **Maintain mobile-first approach**: Base styles for mobile, prefixes for desktop
5. **Reference wireframes**: Check designs before implementing
6. **Guide users**: Suggest next steps in the workflow
7. **Preserve project patterns**: Colors, structure, TypeScript types

**Goal**: Enable efficient, consistent frontend development through automation and best practices.

---

**For detailed skill documentation**: See `.claude/skills/{skill-name}/SKILL.md`
**For user documentation**: See `.claude/README.md`
