---
name: generate-svg-wireframes
description: Creates SVG wireframe images for all pages and components defined in spec.md across multiple breakpoints
argument-hint: '[breakpoints] [language]'
disable-model-invocation: true
---

# Create Page Wireframe

You are a wireframe designer. Your task is to read the `spec.md` file in the project root directory and create SVG wireframe images for **all pages and components** defined in it, across **all specified breakpoints**.

## Instructions

1. **Parse arguments**:
   - First argument: breakpoints (optional, array) - List of viewport widths for the wireframes. Defaults to `[1024, 768, 375]`. Examples: `[1024]` for desktop only, `[1024, 375]` for desktop + mobile, `[375]` for mobile only.
   - Second argument: language (optional) - Language for all text labels, headings, placeholder content, and annotations in the wireframes. Defaults to `en` (English). Use ISO 639-1 codes (e.g., `ja` for Japanese, `zh` for Chinese, `ko` for Korean, `fr` for French, `de` for German, `es` for Spanish). When specified, **all user-facing text** in the wireframes should be written in the target language, including section labels, button text, placeholder data, navigation items, form labels, table headers, and annotations.
   - Examples:
     - No arguments - Read spec.md, default [1024, 768, 375], English
     - `[1024]` - Desktop only, English
     - `[1024, 375]` - Desktop + mobile, English
     - `[1024, 768, 375] ja` - All breakpoints, Japanese
     - `[375] ja` - Mobile only, Japanese
     - `[768]` - Tablet only, English

2. **Read the specification file**:

   a. **Always read `spec.md`** from the project root directory:
   - Use the Read tool to read `spec.md` at the project root
   - If the file does not exist, inform the user and ask them to create `spec.md` in the project root directory (either manually or via `/generate-spec`)

   b. **Parse the spec file**:
   - The file contains a `## Wireframe Map` table listing all pages and components, each with its own `## {NNNN}: {Name}` section and `### Wireframe Type` (Page or Component)
   - This format is used for both single-page and multi-page applications. A single-page app will have one Page entry plus Component entries; a multi-page app will have multiple Page entries plus Component entries.
   - Extract each `## {NNNN}: {Name}` section as a separate wireframe spec. Each section contains its own Wireframe Type, Sections, Layout, Key Components, and Notes (for Pages) or Description, Variants, Props/Data, Layout, and Notes (for Components).
   - Generate wireframes for **every entry** in the Wireframe Map.
   - **Cross-references**: When a page references a shared component (e.g., "Navigation Header: (Component 0012)"), look up that component's spec within the same file and incorporate its layout into the page wireframe. Shared components referenced within pages should be rendered inline as part of the page wireframe.

3. **Generate wireframes for each entry at all breakpoints**:

   For each page/component in the spec, create SVG wireframes for **all specified breakpoints**. The largest breakpoint is generated first as the "primary" wireframe, and smaller breakpoints are adapted from it.

   a. **For Page wireframes**:
   - Render all sections listed in the spec (header, sidebar, main content, footer, etc.)
   - Resolve component cross-references: if a section says "(Component 0012)", look up component 0012's spec and render it inline within the page
   - Include clear visual hierarchy, proper spacing, labeled sections, and placeholder elements
   - Follow the Layout description and adapt for each breakpoint

   b. **For Component wireframes**:
   - Render the component in isolation, showing its internal structure
   - Show all variants listed in the spec (e.g., default, mobile, expanded, collapsed) as separate groups within the same SVG, vertically stacked with labels
   - Include the component's props/data as annotated placeholder content

   c. **Design standards** (applied to all wireframes):
   - Use standard wireframe conventions (gray/black color scheme)
   - Clear visual hierarchy with proper spacing and alignment
   - Labeled sections (use text labels)
   - Placeholder elements (rectangles for images, lines for text, etc.)

   d. **Breakpoint generation order**:
   - Sort breakpoints from largest to smallest
   - Generate the largest breakpoint first as the "primary" wireframe
   - For each subsequent (smaller) breakpoint, adapt the primary wireframe following the responsive design guidance below

4. **SVG specifications**:
   - Use a viewBox of `"0 0 {breakpoint} {height}"` where `{breakpoint}` is the viewport width and `{height}` is determined by the content (taller for narrower viewports due to stacking)
   - **Background**: Always include a full-size background `<rect>` as the first child element of the `<svg>`, matching the viewBox dimensions:
     ```svg
     <svg viewBox="0 0 {breakpoint} {height}" xmlns="http://www.w3.org/2000/svg" font-family="...">
       <!-- Background -->
       <rect width="{breakpoint}" height="{height}" fill="#f0f0f0"/>
       <!-- ... rest of wireframe ... -->
     </svg>
     ```
   - Use a clean, minimal style with:
     - Standard wireframe colors (background #f0f0f0, dark gray #333, light gray #ddd)
     - Text: black or dark gray
     - Fill: white or light gray for components
   - Include proper labels for sections
   - Use standard wireframe elements (boxes, lines, circles for icons)
   - **Language**: If a language argument was provided, write all text in that language:
     - Navigation items, page titles, section headings
     - Button labels, form labels, input placeholders
     - Table headers, column names, sample data
     - Status badges, tags, annotations
     - Footer text, copyright notices
     - Keep technical terms (e.g., "CSV", "PDF", "KPI") as-is unless there is a well-known localized equivalent
     - For CJK languages (ja, zh, ko), use `font-family="Arial, Hiragino Sans, sans-serif"` to ensure proper rendering
   - **XML character escaping**: SVG is an XML format, so all text content in `<text>` elements and attributes must use XML-safe characters. Always escape these characters:
     - `&` → `&amp;`
     - `<` → `&lt;`
     - `>` → `&gt;`
     - For example, "User & Permissions" must be written as `<text>User &amp; Permissions</text>` in the SVG. Failing to escape `&` will cause the SVG to fail to render.

5. **File naming and directory structure**:
   - **IMPORTANT**: The `docs/` directory MUST be created at the project root directory (the repository root where CLAUDE.md lives), NOT inside the skill or plugin directory. Always resolve the path relative to the project root.
   - Create directory: `{project-root}/docs/wireframes/{NNNN}/{breakpoint}/`
   - Save each wireframe: `{project-root}/docs/wireframes/{NNNN}/{breakpoint}/{page-name}-wireframe.svg`
   - Where {NNNN} is the 4-digit wireframe ID and {breakpoint} is the viewport width (e.g., 1024, 375, 768)
   - Derive `{page-name}` from the wireframe name in kebab-case (e.g., "Budget Entry" → `budget-entry`, "Navigation Header" → `navigation-header`, "KPI Summary Card" → `kpi-summary-card`)
   - Create the directory (including the breakpoint subdirectory) if it doesn't exist
   - Examples:
     - `docs/wireframes/0001/1024/login-wireframe.svg`
     - `docs/wireframes/0001/768/login-wireframe.svg`
     - `docs/wireframes/0001/375/login-wireframe.svg`
     - `docs/wireframes/0002/1024/dashboard-wireframe.svg`

6. **Execution order**:
   - Generate wireframes sequentially in Wireframe Map order (0001, 0002, ..., 00NN)
   - For each wireframe, generate all breakpoints (largest first, then smaller adaptations)
   - For each wireframe at each breakpoint, create the SVG file and confirm it was saved
   - After all wireframes are generated, output a summary table

7. **Output**: After creating all wireframes:
   - Show a summary table of all generated wireframes:
     ```
     | ID   | Name                | Breakpoint | File Path |
     |------|---------------------|------------|-----------|
     | 0001 | Login               | 1024       | docs/wireframes/0001/1024/login-wireframe.svg |
     | 0001 | Login               | 768        | docs/wireframes/0001/768/login-wireframe.svg |
     | 0001 | Login               | 375        | docs/wireframes/0001/375/login-wireframe.svg |
     | 0002 | Dashboard           | 1024       | docs/wireframes/0002/1024/dashboard-wireframe.svg |
     | ...  | ...                 | ...        | ... |
     ```
   - State the total number of wireframes generated (entries × breakpoints)
   - If language was specified: Mention the language used for all wireframe text
   - Suggest the next step in the workflow (e.g., `/generate-pencil-frames`)

## Breakpoint-Specific Design Guidance

Adapt the wireframe layout based on the breakpoint value:

### Desktop (>= 1024px)

- **Navigation**: Full horizontal navigation with all menu items
- **Sidebar**: Full sidebar with text labels (~200-240px width)
- **Layout**: Multi-column grids (2, 3, or 4 columns)
- **Tables**: Full table with all columns visible
- **Typography**: Full-size headings and body text
- **Spacing**: Generous padding ~32-64px
- **Buttons**: Side-by-side, standard sizing
- **Stats/KPI cards**: All in a single row
- **Images**: Full dimensions
- **Hero sections**: Side-by-side hero layouts (text + image)
- **Content areas**: Wide content areas with generous padding, max-width containers

### Tablet (768-1023px)

- **Navigation**: Condensed horizontal nav or early hamburger menu
- **Sidebar**: Narrow icon-only sidebar (~60px) or hidden
- **Layout**: Reduced columns (2 columns max for grids)
- **Tables**: Show essential columns only (hide lower-priority columns like phone, secondary info)
- **Typography**: Reduce heading sizes by ~10-15%
- **Spacing**: Moderate padding ~20-32px
- **Buttons**: Can sit side-by-side if space allows
- **Stats/KPI cards**: 2x2 grid or 4 across if space allows
- **Images**: Slightly reduced dimensions
- **Hero sections**: Stacked or 2-column hero layouts

### Mobile (< 768px)

- **Navigation**: Hamburger menu or compact icon-based navigation, no full text menu
- **Sidebar**: Hidden entirely (accessible via hamburger/drawer)
- **Layout**: Single-column stacked layout throughout
- **Grids**: All grids collapse to 1 column
- **Tables**: Convert to card-based layout (tables don't fit on narrow screens) — each row becomes a card with stacked key-value pairs
- **Typography**: Reduce heading sizes by ~25-30%, body text by ~10%
- **Spacing**: Reduced padding to ~12-16px
- **Buttons**: Full-width, stacked vertically
- **Touch targets**: Minimum 44px height for interactive elements
- **Stats/KPI cards**: 2-column grid or single column
- **Images**: Full-width, reduced height
- **CTAs**: Span full width
- **Cards and features**: Stacked vertically

## Section-Specific Responsive Patterns

**Header/Navigation:**

- Narrow (< 768px): Hamburger + logo + key action icons
- Medium (768-1023px): Condensed nav links or icon-only sidebar
- Wide (>= 1024px): Full sidebar + horizontal top bar

**Data Tables:**

- Narrow: Card layout — each row becomes a card with stacked key-value pairs
- Medium: Simplified table with fewer columns
- Wide: Full table with all columns

**Stats/KPI Cards:**

- Narrow: 2-column grid or single column
- Medium: 2x2 grid
- Wide: All cards in one row

**Filter/Search Bars:**

- Narrow: Full-width search, filter chips below in a scrollable row
- Medium: Search + inline filters in a single bar
- Wide: Full filter bar with all controls visible

**Sidebars:**

- Narrow: Hidden (drawer/overlay on demand)
- Medium: Icon-only collapsed sidebar (~60px)
- Wide: Full sidebar with labels (~200-240px)

**Footer:**

- Narrow: Stacked sections, centered text
- Medium: 2-column grid for link groups
- Wide: Multi-column horizontal layout

## Cross-Reference Resolution

When generating page wireframes, resolve component cross-references:

1. **Detect references**: Look for patterns like "(Component 0012)" or "(Component {NNNN})" in the page's Sections
2. **Look up the component**: Find the `## {NNNN}: {Name}` section in the same spec.md
3. **Render inline**: Draw the component's layout within the page wireframe at the referenced position
4. **Maintain consistency**: Use the same dimensions and style for the component across all pages that reference it (e.g., Navigation Header is always 64px tall, Sidebar is always 240px wide)

This ensures that shared components look identical across all page wireframes.

## Visual Design Guidelines

When generating wireframes at smaller breakpoints adapted from the primary (largest) breakpoint:

- **Use the same color scheme** as the primary wireframe
- **Maintain the same visual language** and design tokens
- **Ensure all text is readable** at the given width
- **Use the same fonts** as the primary wireframe
- **Adjust font sizes proportionally** for the viewport width
- **Layout should feel natural** at the given width, not "squished"

## Example Wireframe Structure

A typical page wireframe should include:

- Header with logo and navigation
- Main content area with clear sections
- Sidebar (if applicable)
- Footer with links
- Proper annotations and labels

A typical component wireframe should include:

- The component rendered in its default state
- Additional variant states stacked below with labels
- Annotations showing props/data placeholders

## Tips for Good Wireframes

- Keep it simple and focused on structure, not detailed design
- Use consistent spacing (grid-based layout)
- Label all major sections clearly
- Show hierarchy through size and positioning
- Use standard UI patterns the developer would recognize
- Maintain visual consistency across all wireframes in the set (same header height, sidebar width, font sizes, spacing, etc.)

## Usage Examples

### Example 1: Create all wireframes at default breakpoints (1024, 768, 375), English

```bash
/generate-svg-wireframes
```

**Result**: Reads `spec.md` from the project root. If it contains a Wireframe Map with 15 entries (11 pages + 4 components), generates 45 SVG wireframes (15 entries × 3 breakpoints) in `docs/wireframes/{NNNN}/{breakpoint}/`, using standard wireframe colors.

### Example 2: Create desktop-only wireframes

```bash
/generate-svg-wireframes [1024]
```

**Result**: Reads `spec.md` and creates all wireframes at 1024px only with multi-column grids, horizontal layouts, and full navigation.

### Example 3: Create desktop + mobile wireframes

```bash
/generate-svg-wireframes [1024, 375]
```

**Result**: Reads `spec.md` and creates all wireframes at both 1024px and 375px. Desktop wireframes are generated first, then mobile wireframes are adapted from them.

### Example 4: Create all wireframes in Japanese

```bash
/generate-svg-wireframes [1024, 768, 375] ja
```

**Result**: Reads `spec.md` and creates all wireframes at all three breakpoints with all text labels, headings, buttons, table headers, and placeholder content in Japanese.

### Example 5: Create mobile-only wireframes in Japanese

```bash
/generate-svg-wireframes [375] ja
```

**Result**: Reads `spec.md` and creates all wireframes at 375px with Japanese text and mobile-friendly single-column stacked layouts.

### Example 6: Single-page application with components

```bash
/generate-svg-wireframes
```

**Result**: Reads `spec.md` which contains one Page entry and several Component entries in the Wireframe Map. Generates wireframe SVGs for the page and each component at all default breakpoints.

## Specification File Format

The `spec.md` file uses the Wireframe Map format for both single-page and multi-page applications:

### Wireframe Map Format

```markdown
# Application Name

## Overview
Brief description of the application.

## Wireframe Map
| ID | Wireframe Type | Name | Description |
|---|---|---|---|
| 0001 | Page | Login | User authentication screen |
| 0002 | Page | Dashboard | Main overview screen |
| 0003 | Component | Navigation Header | Shared top navigation bar |

---

## 0001: Login

### Wireframe Type
Page

### Sections
- **Header**: Application logo
- **Login Form**: Email input, password input, login button
- **Footer**: Password reset link

### Layout
- Centered single-column form, max-width 400px

### Key Components
- Text input fields with labels
- Primary button

### Notes
- On success, navigates to Dashboard (0002)

---

## 0002: Dashboard

### Wireframe Type
Page

### Sections
- **Navigation Header**: (Component 0003)
- **KPI Cards**: Revenue, profit, expenses cards
- **Chart**: Monthly trend line chart

### Layout
- Desktop: Full navigation + main content area
- Mobile: Hamburger menu + stacked content

### Key Components
- KPI summary cards
- Line chart

### Notes
- Main landing page after login

---

## 0003: Navigation Header

### Wireframe Type
Component

### Description
Top navigation bar displayed on all authenticated pages.

### Variants
- Default: Full navigation with menu items
- Mobile: Hamburger menu with drawer

### Props / Data
- Current user name and avatar
- Active page indicator

### Layout
- Full-width sticky header, height 64px

### Notes
- Shared across all authenticated pages
```

The file can include any level of detail. More detailed specifications produce more accurate wireframes.

## Checklist

- [ ] `spec.md` read and all wireframe entries extracted
- [ ] Breakpoints parsed (default [1024, 768, 375] if not specified)
- [ ] For each wireframe entry, all breakpoints generated (largest first)
- [ ] Directory structure created: `docs/wireframes/{NNNN}/{breakpoint}/`
- [ ] Files saved with correct naming: `{page-name}-wireframe.svg`
- [ ] viewBox width matches the breakpoint for each SVG
- [ ] Background `<rect>` with `fill="#f0f0f0"` is the first child element, matching viewBox dimensions
- [ ] Layout is properly adapted for each breakpoint width
- [ ] Typography is readable at each width
- [ ] Touch targets are adequate for breakpoints < 768px (>=44px)
- [ ] Grid layouts use appropriate column count for each width
- [ ] Navigation is adapted (hamburger for narrow, full for wide)
- [ ] Sidebar visibility is appropriate for each width
- [ ] Tables are converted to cards for breakpoints < 768px
- [ ] Spacing is proportional to each viewport width
- [ ] Color scheme is consistent across all breakpoints
- [ ] XML characters properly escaped (`&` → `&amp;`, etc.)
- [ ] Summary table shown with all generated wireframes (entries × breakpoints)
