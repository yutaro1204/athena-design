---
name: generate-wireframe-catalog
description: Generates a comprehensive wireframe catalog in docs/wireframes/README.md
disable-model-invocation: true
---

# Generate Wireframe Catalog

You are a technical documentation specialist. Your task is to scan all wireframes in the project and generate a comprehensive catalog document at `docs/wireframes/README.md`.

## Instructions

1. **Scan wireframes directory**:
   - Look in `docs/wireframes/` for all subdirectories matching the pattern `{NNNN}` (4-digit numbers)
   - Example directories: `0001/`, `0002/`, `0003/`
   - Ignore non-numeric directories

2. **For each wireframe directory, collect information**:

   a. **Wireframe ID**: Extract from directory name (e.g., `0001`)

   b. **Main wireframe file**:
   - Find the base wireframe SVG: `docs/wireframes/{NNNN}/*-wireframe.svg`
   - Extract the file name (e.g., `tcg-landing-page-wireframe.svg`)
   - Parse the page name from filename (remove `-wireframe.svg`)
   - Read the SVG to get dimensions from viewBox attribute

   c. **Responsive versions**:
   - Check for subdirectories with numeric names (768, 1024, 1280, etc.)
   - For each breakpoint directory, check if responsive wireframe exists
   - List all available breakpoints

   d. **Components**:
   - Check if `components/` directory exists
   - Count subdirectories: headers/, heroes/, sections/, footers/
   - Count total SVG files across all component categories
   - Read `components/README.md` if it exists

   e. **Design system**:
   - Read the main wireframe SVG
   - Extract unique fill colors (for background, accent, text)
   - Extract unique stroke colors (for borders)
   - Extract font-family, font-size, font-weight values
   - Create color palette documentation
   - Create typography documentation

   f. **Sections**:
   - Look for section labels in the SVG (text elements with font-style="italic")
   - Extract section names (e.g., "HEADER / NAV", "HERO SECTION")
   - Calculate section heights from y-coordinate ranges
   - List sections with their heights

   g. **Related files**:
   - Check if `docs/assets-list.md` exists and references this wireframe
   - Check if React component exists in `src/App.tsx` or `src/components/`

   h. **Implementation status**:
   - Determine status based on available artifacts:
     - ✅ Complete: Has main wireframe + components + responsive + implementation
     - 🔄 In Progress: Has main wireframe + some artifacts
     - ⏳ Planned: Only has directory or placeholder

3. **Generate catalog structure**:

   Create `docs/wireframes/README.md` with the following sections:

   ### Header

   ```markdown
   # Wireframe Catalog

   A comprehensive catalog of all wireframe designs for this project, including their components, responsive versions, and implementation status.

   ## Table of Contents

   - [Overview](#overview)
   - [Wireframes](#wireframes)
   - [Quick Reference](#quick-reference)
   - [Component Library](#component-library)
   - [Usage Guide](#usage-guide)
   ```

   ### Overview Section
   - Total wireframes count
   - Total components count (sum across all wireframes)
   - Last updated date (current date)

   ### Wireframes Section

   For each wireframe (sorted by ID), create a detailed entry:

   **Subsections**:
   - **Status**: Badge with completion status
   - **Type**: Landing, Dashboard, Profile, etc. (infer from page name)
   - **Created**: File creation date
   - **Dimensions**: From viewBox (e.g., 1200×2400px)

   - **Description**:
     - Generate from wireframe sections
     - List key features (bullet points)

   - **Files**:
     - Link to main wireframe
     - Links to responsive versions
     - Link to components directory

   - **Design System**:
     - Color palette (extracted from SVG)
     - Typography (extracted from SVG)

   - **Sections**:
     - Numbered list of sections with heights
     - Brief description of each section

   - **Components Extracted**:
     - Table of components by category
     - Include component name, size, use case

   - **Implementation Status**:
     - Checklist table with tasks and status
     - Tasks: Wireframe Created, Components Extracted, Responsive Design, Assets List, React Component, etc.

   - **Related Files**:
     - Asset requirements
     - React component
     - Assets directory

   - **Skills Used**:
     - List of skills that were likely used (infer from artifacts)

   ### Quick Reference Section
   - Table with all wireframes
   - Columns: ID, Name, Type, Status, Desktop, Mobile, Components, Updated
   - Include legend for status symbols

   ### Component Library Section
   - Aggregate all components across wireframes
   - Group by category (Headers, Heroes, Sections, Footers)
   - Table format: Component, Source, Size, Description
   - Show which wireframe each component came from

   **Component Reusability**:
   - Show 3 example layout compositions using available components
   - Calculate total heights for each example

   ### Usage Guide Section
   - **Viewing Wireframes**: Browser and design tool instructions
   - **Creating New Wireframes**: Skill command examples
   - **Using Existing Components**: How to reuse components
   - **Implementing Wireframes**: Full workflow commands
   - **Updating the Catalog**: Instructions for maintaining this file

   ### Statistics Section
   - **Design Metrics**:
     - Total wireframes, sections, components
     - Responsive breakpoints used
     - Average wireframe height
     - Design system info

   - **Implementation Metrics**:
     - Wireframes implemented (percentage)
     - Components with responsive designs
     - Assets lists generated
     - React components created

   ### Design System Standards Section
   - Color standards
   - Layout standards
   - Component standards
   - Typography standards

   ### Version History Section
   - Version number (increment from existing if updating)
   - Current date
   - Changelog of what was added/updated

   ### Resources Section
   - Tools (SVG editors, browsers)
   - Documentation links
   - Skills reference table

   ### Contributing Section
   - Guidelines for adding new wireframes
   - Checklist for catalog updates

   ### Footer
   - Maintained by
   - Last catalog update
   - Catalog version

4. **Calculate statistics**:
   - Total wireframes: Count of {NNNN} directories
   - Total sections: Sum of sections across all wireframes
   - Total components: Sum of component SVG files
   - Responsive breakpoints: Unique breakpoints across all wireframes
   - Average wireframe height: Calculate from viewBox heights
   - Wireframes implemented: Count with React components / total
   - Components with responsive designs: Count with responsive directories
   - Assets lists generated: Check for docs/assets-list.md references
   - React components created: Check for implementations

5. **Component aggregation**:

   For the Component Library section:
   - Collect all components from all wireframe `components/` directories
   - Group by category
   - For each component:
     - Name (filename without .svg)
     - Source wireframe ID
     - Size (from viewBox)
     - Description (from component README or infer from name)
   - Remove duplicates (same component used in multiple wireframes)
   - Sort by category, then by size

6. **Status determination logic**:

   For each wireframe, determine status:

   **✅ Complete**:
   - Has main wireframe SVG
   - Has components/ directory with components
   - Has at least one responsive version
   - Has implementation (React component or assets-list.md)

   **🔄 In Progress**:
   - Has main wireframe SVG
   - Has some but not all artifacts (components OR responsive OR implementation)

   **⏳ Planned**:
   - Directory exists but no main wireframe
   - Or only main wireframe, no other artifacts

7. **Type inference**:

   Infer page type from filename or sections:
   - "landing", "home" → Landing
   - "dashboard", "admin" → Dashboard
   - "profile", "account" → Profile
   - "login", "signin", "auth" → Authentication
   - "product", "shop", "store" → Product
   - "about", "contact" → Informational
   - Default: Page

8. **Output**:
   - Confirm the catalog has been generated
   - Report statistics:
     - Number of wireframes cataloged
     - Number of components documented
     - Total sections found
     - File path: `docs/wireframes/README.md`
   - Suggest reviewing the catalog
   - Mention that the catalog should be regenerated when wireframes are added/updated

## Information Extraction Guidelines

### From SVG Files

**ViewBox extraction**:

```xml
<svg viewBox="0 0 1200 2400" xmlns="http://www.w3.org/2000/svg">
```

→ Width: 1200px, Height: 2400px

**Color extraction**:

```xml
<rect fill="#1a1a2e" />
<text fill="#e0e0e0" />
<rect stroke="#e94560" />
```

→ Colors: #1a1a2e, #e0e0e0, #e94560

**Typography extraction**:

```xml
<text font-family="Arial, sans-serif" font-size="42" font-weight="bold" />
```

→ Font: Arial, Size: 42px, Weight: bold

**Section labels**:

```xml
<text font-style="italic" fill="#666">HEADER / NAV</text>
```

→ Section: Header/Nav

### From Directory Structure

**Breakpoints**:

```
docs/wireframes/0001/
  768/
  1024/
  1280/
```

→ Breakpoints: 768px, 1024px, 1280px

**Components**:

```
docs/wireframes/0001/components/
  headers/
    header-logo-nav.svg
  heroes/
    hero-split-cta.svg
  sections/
    feature-grid-3col.svg
    product-cards-3col.svg
```

→ 4 components (1 header, 1 hero, 2 sections)

### From File Metadata

**Creation date**:

- Use file system creation timestamp
- Format: YYYY-MM-DD

**Last modified**:

- Use file system modification timestamp
- Format: YYYY-MM-DD

## Markdown Formatting

Use these formatting patterns:

**Status badges**:

- ✅ Complete
- 🔄 In Progress
- ⏳ Planned
- ❌ Blocked

**File links**:

```markdown
- 📄 **Wireframe**: [`0001/tcg-landing-page-wireframe.svg`](0001/tcg-landing-page-wireframe.svg)
- 📱 **Responsive (768px)**: [`0001/768/tcg-landing-page-responsive-wireframe.svg`](0001/768/tcg-landing-page-responsive-wireframe.svg)
- 🧩 **Components**: [`0001/components/`](0001/components/) (7 components)
```

**Tables**:

```markdown
| ID   | Name             | Type    | Status      | Desktop   | Mobile    | Components | Updated    |
| ---- | ---------------- | ------- | ----------- | --------- | --------- | ---------- | ---------- |
| 0001 | TCG Landing Page | Landing | ✅ Complete | 1200×2400 | 768, 1024 | 7          | 2026-02-14 |
```

**Code blocks**:

````markdown
```bash
/create-page-wireframe "description"
/create-components-from-wireframe 0001
```
````

```

## Example Output

```

I've generated a comprehensive wireframe catalog at docs/wireframes/README.md

Statistics:

- Wireframes cataloged: 3
- Total components: 15
- Total sections: 21
- Responsive breakpoints: 768px, 1024px, 1280px

Wireframes:

- 0001: TCG Landing Page (✅ Complete)
- 0002: Dashboard (🔄 In Progress)
- 0003: Profile Page (⏳ Planned)

The catalog includes:
✓ Overview and statistics
✓ Detailed wireframe entries
✓ Quick reference table
✓ Aggregated component library
✓ Usage guide and standards
✓ Version history

You can view the catalog at: docs/wireframes/README.md

To update this catalog after adding new wireframes, run:
/generate-wireframe-catalog

````

## Edge Cases

### No wireframes found
If `docs/wireframes/` has no {NNNN} directories:
- Create catalog with "No wireframes yet" message
- Include usage guide and standards
- Encourage creating first wireframe with `/create-page-wireframe`

### Incomplete wireframe data
If a wireframe directory exists but is incomplete:
- Mark as 🔄 In Progress or ⏳ Planned
- List available artifacts
- Note missing artifacts

### No components extracted
If wireframes don't have components/ directories:
- Show "Component Library" section as empty
- Suggest extracting components with `/create-components-from-wireframe`

### Corrupted SVG files
If an SVG file can't be parsed:
- Log warning
- Use filename and directory info only
- Mark status as needs review

## Regeneration

This skill should be run:
- After creating a new wireframe
- After extracting components
- After creating responsive versions
- After implementing wireframes
- Periodically to keep documentation fresh

The catalog will be completely regenerated each time, ensuring it stays in sync with the actual wireframe files.

## Usage Examples

```bash
# Generate catalog from scratch
/generate-wireframe-catalog

# Regenerate after adding new wireframe
/create-page-wireframe "New dashboard"
/generate-wireframe-catalog

# Regenerate after extracting components
/create-components-from-wireframe 0002
/generate-wireframe-catalog
````

## Important Notes

- **Non-destructive**: Can be run multiple times safely
- **Auto-discovery**: Finds all wireframes automatically
- **Complete regeneration**: Overwrites previous catalog
- **Consistent formatting**: Uses standardized structure
- **Statistics tracking**: Calculates metrics automatically
- **Component aggregation**: Combines components from all wireframes
- **Status inference**: Determines implementation status automatically
- **Extensible**: Easy to add new wireframes and regenerate

## Benefits

1. **Automation**: No manual catalog maintenance
2. **Accuracy**: Always reflects current state
3. **Consistency**: Standardized format and structure
4. **Discoverability**: Easy to find and browse wireframes
5. **Documentation**: Comprehensive information in one place
6. **Metrics**: Tracks progress and statistics
7. **Reusability**: Shows all available components
8. **Guidance**: Includes usage instructions and standards

---

**Example Catalog Structure**:

```
# Wireframe Catalog

## Overview
- Total: 3 wireframes, 15 components

## Wireframes
### 0001 - TCG Landing Page
  - Status, files, design system, sections, components, implementation
### 0002 - Dashboard
  - Status, files, design system, sections, components, implementation
### 0003 - Profile Page
  - Status, files, design system, sections, components, implementation

## Quick Reference
| Table of all wireframes |

## Component Library
- Headers: 2 components
- Heroes: 3 components
- Sections: 8 components
- Footers: 2 components

## Usage Guide
- Viewing, creating, implementing

## Statistics
- Design metrics
- Implementation metrics

## Standards
- Color, layout, component, typography

## Version History
- v1.0, v1.1, etc.

## Resources
- Tools, docs, skills

## Contributing
- Guidelines
```
