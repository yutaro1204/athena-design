---
name: generate-wireframe-catalog
description: Generates a comprehensive wireframe catalog (catalog.md + styled HTML with SVG previews) in docs/wireframes/catalog/
argument-hint: '[language]'
disable-model-invocation: true
---

# Generate Wireframe Catalog

You are a technical documentation specialist. Your task is to scan all wireframes in the project and generate a comprehensive catalog document at `docs/wireframes/catalog/catalog.md`.

## Instructions

1. **Parse the arguments**:
   - First argument: language (optional) - Language for all text in the catalog documents. Defaults to `en` (English). Use ISO 639-1 codes (e.g., `ja` for Japanese, `zh` for Chinese, `ko` for Korean, `fr` for French, `de` for German, `es` for Spanish).
   - When specified, **all catalog text** should be written in the target language, including:
     - Section headings and titles (e.g., "Wireframe Catalog" → "ワイヤーフレームカタログ")
     - Descriptions, labels, and annotations
     - Table headers (e.g., "Name", "Type" → "名前", "タイプ")
     - Usage guide instructions and code comments
     - Statistics labels
     - Contributing guidelines and footer text
   - Keep technical terms as-is when no well-known localized equivalent exists (e.g., "SVG", "wireframe", "breakpoint", "viewBox")
   - Wireframe filenames and file paths remain unchanged (always English kebab-case)
   - Examples:
     - (no argument): Generate catalog in English
     - `ja`: Generate catalog in Japanese
     - `en`: Generate catalog in English

2. **Scan wireframes directory**:
   - Look in `docs/wireframes/` for all subdirectories matching the pattern `{NNNN}` (4-digit numbers)
   - Example directories: `0001/`, `0002/`, `0003/`
   - Ignore non-numeric directories

3. **For each wireframe directory, collect information**:

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
   - Read `components/catalog.md` if it exists

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

4. **Generate catalog structure**:

   Create `docs/wireframes/catalog/catalog.md`. Refer to [`examples/catalog.md`](examples/catalog.md) for the exact format and section structure.

   **Important**: Since catalog files are in `docs/wireframes/catalog/`, all relative paths to wireframe SVGs must use `../` prefix (e.g., `../0001/1024/login-wireframe.svg` instead of `0001/1024/login-wireframe.svg`).

   The catalog must include these sections (in order):

   - **Header**: Title, description, table of contents
   - **Overview**: Summary table (wireframe count, component count, breakpoints, last updated)
   - **Wireframes**: Detailed entry per wireframe (type, dimensions, description, file links for each breakpoint)
   - **Quick Reference**: Summary table with columns: ID, Name, Type, Desktop, Tablet, Mobile, Updated
   - **Component Library**: Table of shared components (ID, size, description)
   - **Design System**: Color palette, typography, responsive breakpoint reference
   - **Statistics**: Design metrics (totals, breakpoints, SVG file count, average/max/min heights)
   - **Footer**: Last updated date

5. **Calculate statistics**:
   - Total wireframes: Count of {NNNN} directories
   - Pages vs components: Count by wireframe type
   - Total SVG files: wireframes x breakpoints
   - Responsive breakpoints: Unique breakpoints across all wireframes
   - Average wireframe height: Calculate from viewBox heights
   - Max and min heights: Identify tallest and shortest wireframes

6. **Component aggregation**:

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

7. **Type inference**:

   Infer page type from filename or sections:
   - "landing", "home" → Landing
   - "dashboard", "admin" → Dashboard
   - "profile", "account" → Profile
   - "login", "signin", "auth" → Authentication
   - "product", "shop", "store" → Product
   - "about", "contact" → Informational
   - Default: Page

8. **Generate HTML catalog**:

   After generating `docs/wireframes/catalog/catalog.md`, convert it into a styled, self-contained HTML document at `docs/wireframes/catalog/catalog.html`. Refer to [`examples/catalog.html`](examples/catalog.html) for the exact format, styling, and structure.

   a. **Read the generated `docs/wireframes/catalog.md`** to use as the content source.

   b. **Convert the markdown content to HTML** following the same structure as the example. The HTML should mirror the same sections as `catalog.md`, with SVG wireframe thumbnail previews for each wireframe entry (all breakpoints side by side).

   c. **Use the example as a template**: Follow the same CSS, HTML structure, and styling from [`examples/catalog.html`](examples/catalog.html). Key points:
      - Self-contained HTML with embedded CSS (no external dependencies)
      - `<html lang="{language}">` matching the language argument
      - Wireframe thumbnails linked with `target="_blank"` to open SVGs in new tabs
      - `html { scroll-behavior: smooth; }` for TOC navigation
      - Responsive layout with `@media (max-width: 768px)`

   g. **Save the HTML file** at `docs/wireframes/catalog/catalog.html`.

9. **Output**:
   - Confirm the catalog has been generated
   - Report statistics:
     - Number of wireframes cataloged
     - Number of components documented
     - Total sections found
     - Language used (e.g., "Japanese (ja)" or "English (en)")
     - File paths: `docs/wireframes/catalog/catalog.md` and `docs/wireframes/catalog/catalog.html`
   - Suggest reviewing the HTML catalog in a browser: `open docs/wireframes/catalog/catalog.html`
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

### From File Metadata

**Creation date**:

- Use file system creation timestamp
- Format: YYYY-MM-DD

**Last modified**:

- Use file system modification timestamp
- Format: YYYY-MM-DD

## Markdown Formatting

Use these formatting patterns:

**File links**:

```markdown
- 📄 **Wireframe**: [`0001/tcg-landing-page-wireframe.svg`](../0001/tcg-landing-page-wireframe.svg)
- 📱 **Responsive (768px)**: [`0001/768/tcg-landing-page-responsive-wireframe.svg`](../0001/768/tcg-landing-page-responsive-wireframe.svg)
```

**Tables**:

```markdown
| ID   | Name             | Type    | Desktop   | Tablet | Mobile | Updated    |
| ---- | ---------------- | ------- | --------- | ------ | ------ | ---------- |
| 0001 | TCG Landing Page | Landing | 1200×2400 | 768    | 375    | 2026-02-14 |
```

**Code blocks**:

````markdown
```bash
/generate-svg-wireframes "description"
```
````

```

## Example Output

```

I've generated a comprehensive wireframe catalog:

- Markdown: docs/wireframes/catalog/catalog.md
- HTML: docs/wireframes/catalog/catalog.html

Statistics:

- Wireframes cataloged: 3
- Total components: 15
- Total sections: 21
- Responsive breakpoints: 768px, 1024px, 1280px

Wireframes:

- 0001: TCG Landing Page
- 0002: Dashboard
- 0003: Profile Page

The catalog includes:
✓ Overview and statistics
✓ Detailed wireframe entries with SVG thumbnail previews
✓ Quick reference table
✓ Aggregated component library
✓ Design system (colors, typography, responsive)

View the HTML catalog in your browser:
open docs/wireframes/catalog/catalog.html

To update this catalog after adding new wireframes, run:
/generate-wireframe-catalog

````

## Edge Cases

### No wireframes found
If `docs/wireframes/` has no {NNNN} directories:
- Create catalog with "No wireframes yet" message
- Include usage guide and standards
- Encourage creating first wireframe with `/generate-svg-wireframes`

### No components extracted
If wireframes don't have components/ directories:
- Show "Component Library" section as empty
- Note that no components have been extracted yet

### Corrupted SVG files
If an SVG file can't be parsed:
- Log warning
- Use filename and directory info only

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
# Generate catalog in English (default)
/generate-wireframe-catalog

# Generate catalog in Japanese
/generate-wireframe-catalog ja

# Generate catalog in English explicitly
/generate-wireframe-catalog en

# Regenerate after adding new wireframe
/generate-svg-wireframes "New dashboard"
/generate-wireframe-catalog ja

# Regenerate after extracting components
/generate-wireframe-catalog ja
````

## Benefits

1. **Automation**: No manual catalog maintenance
2. **Accuracy**: Always reflects current state
3. **Consistency**: Standardized format and structure
4. **Discoverability**: Easy to find and browse wireframes
5. **Documentation**: Comprehensive information in one place
6. **Metrics**: Tracks progress and statistics
7. **Reusability**: Shows all available components
8. **Guidance**: Includes usage instructions and standards

## Important Notes

- **Non-destructive**: Can be run multiple times safely
- **Auto-discovery**: Finds all wireframes automatically
- **Complete regeneration**: Overwrites previous catalog
- **Consistent formatting**: Uses standardized structure
- **Statistics tracking**: Calculates metrics automatically
- **Component aggregation**: Combines components from all wireframes
- **Extensible**: Easy to add new wireframes and regenerate

---

**Example Catalog Structure**:

```
# Wireframe Catalog

## Overview
- Total: 3 wireframes, 15 components

## Wireframes
### 0001 - TCG Landing Page
  - Files, design system, sections, components
### 0002 - Dashboard
  - Files, design system, sections, components
### 0003 - Profile Page
  - Files, design system, sections, components

## Quick Reference
| Table of all wireframes |

## Component Library
- Headers: 2 components
- Heroes: 3 components
- Sections: 8 components
- Footers: 2 components

## Design System
- Color palette, typography, responsive breakpoints

## Statistics
- Design metrics
```
