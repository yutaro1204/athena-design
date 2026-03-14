---
name: create-page-wireframe
description: Creates SVG wireframe images for all pages and components defined in spec.md
argument-hint: '[url] [breakpoint] [language]'
disable-model-invocation: true
---

# Create Page Wireframe

You are a wireframe designer. Your task is to read the `spec.md` file in the project root directory and create SVG wireframe images for **all pages and components** defined in it. Optionally, you can also reference an existing web page for design inspiration.

## Instructions

1. **Parse arguments**:
   - First argument: url (optional) - URL of an existing web page to reference for design inspiration (applied to all wireframes)
   - Second argument: breakpoint (optional, numeric) - Viewport width for the wireframes. Defaults to `1024`. Controls the viewBox width and layout style. Examples: `375` for mobile, `768` for tablet, `1024` for desktop.
   - Third argument: language (optional) - Language for all text labels, headings, placeholder content, and annotations in the wireframes. Defaults to `en` (English). Use ISO 639-1 codes (e.g., `ja` for Japanese, `zh` for Chinese, `ko` for Korean, `fr` for French, `de` for German, `es` for Spanish). When specified, **all user-facing text** in the wireframes should be written in the target language, including section labels, button text, placeholder data, navigation items, form labels, table headers, and annotations.
   - Examples:
     - No arguments - Read spec.md, default 1024px, English
     - `"https://example.com"` - spec.md + URL reference, English
     - `"https://example.com" 375` - URL with mobile breakpoint, English
     - `"" 375` - Mobile wireframes, no URL, English
     - `"" 768` - Tablet wireframes, no URL, English
     - `"" 1024 ja` - Desktop wireframes, Japanese
     - `"" 375 ja` - Mobile wireframes, Japanese
     - `"https://example.com" 1024 ja` - URL reference, desktop, Japanese
     - `"" 1024 zh` - Desktop wireframes, Chinese

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

3. **If URL is provided**:

   a. **Fetch the web page**:
   - Use the WebFetch tool to retrieve the web page content
   - Prompt: "Analyze this web page's layout, structure, sections, colors, typography, and key design elements. Provide a detailed breakdown of the page structure from top to bottom."

   b. **Analyze the page structure**:
   - Identify main sections (header, hero, features, content sections, footer)
   - Note layout patterns (single column, multi-column, grid, flex)
   - Observe section order from top to bottom
   - Identify navigation patterns
   - Note content hierarchy

   c. **Extract design elements**:
   - **Colors**: Extract primary background, text, and accent colors from the analysis
   - **Typography**: Note font families, sizes, and weights used
   - **Spacing**: Observe padding and margins between sections
   - **Components**: Identify cards, buttons, forms, images, icons
   - **Grid systems**: Note column counts and layouts

   d. **Apply to wireframes**:
   - Use the extracted design system (colors, spacing, typography) as a shared style applied to all generated wireframes for visual consistency
   - Replicate relevant layout patterns where they match the spec
   - Match the visual hierarchy

4. **Generate wireframes for each entry**: For each page/component in the spec, create a clean, professional SVG wireframe:

   a. **For Page wireframes**:
   - Render all sections listed in the spec (header, sidebar, main content, footer, etc.)
   - Resolve component cross-references: if a section says "(Component 0012)", look up component 0012's spec and render it inline within the page
   - Include clear visual hierarchy, proper spacing, labeled sections, and placeholder elements
   - Follow the Layout description for mobile/desktop/container constraints

   b. **For Component wireframes**:
   - Render the component in isolation, showing its internal structure
   - Show all variants listed in the spec (e.g., default, mobile, expanded, collapsed) as separate groups within the same SVG, vertically stacked with labels
   - Include the component's props/data as annotated placeholder content

   c. **Design standards** (applied to all wireframes):
   - If URL was provided: Match the color scheme from the analyzed page
   - If URL was NOT provided: Use standard wireframe conventions (gray/black color scheme)
   - Clear visual hierarchy with proper spacing and alignment
   - Labeled sections (use text labels)
   - Placeholder elements (rectangles for images, lines for text, etc.)

5. **SVG specifications**:
   - Use a viewBox of `"0 0 {breakpoint} {height}"` where `{breakpoint}` is the parsed breakpoint value (default `1024`) and `{height}` is determined by the content
   - For mobile breakpoints (< 768px): Use mobile-friendly layout conventions — single-column stacked layout, smaller typography, reduced padding, compact navigation (hamburger menu), and touch-friendly target sizes
   - For tablet breakpoints (768–1023px): Use reduced columns (2 max), adapted spacing, and simplified navigation
   - For desktop breakpoints (>= 1024px): Use multi-column grids, horizontal layouts, and full navigation
   - Use a clean, minimal style with:
     - **If URL provided**: Use colors extracted from the analyzed page (backgrounds, text, accents, borders)
     - **If URL NOT provided**: Use standard wireframe colors (white/light gray #f5f5f5, dark gray #333, light gray #ddd)
     - Text: black or dark gray (or match analyzed page)
     - Fill: white or light gray for components (or match analyzed page)
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

6. **File naming and directory structure**:
   - **IMPORTANT**: The `docs/` directory MUST be created at the project root directory (the repository root where CLAUDE.md lives), NOT inside the skill or plugin directory. Always resolve the path relative to the project root.
   - Create directory: `{project-root}/docs/wireframes/{NNNN}/{breakpoint}/`
   - Save each wireframe: `{project-root}/docs/wireframes/{NNNN}/{breakpoint}/{page-name}-wireframe.svg`
   - Where {NNNN} is the 4-digit wireframe ID and {breakpoint} is the viewport width (e.g., 1024, 375, 768)
   - Derive `{page-name}` from the wireframe name in kebab-case (e.g., "Budget Entry" → `budget-entry`, "Navigation Header" → `navigation-header`, "KPI Summary Card" → `kpi-summary-card`)
   - Create the directory (including the breakpoint subdirectory) if it doesn't exist
   - Examples:
     - `docs/wireframes/0001/1024/login-wireframe.svg`
     - `docs/wireframes/0002/1024/dashboard-wireframe.svg`
     - `docs/wireframes/0012/1024/navigation-header-wireframe.svg`

7. **Execution order**:
   - Generate wireframes sequentially in Wireframe Map order (0001, 0002, ..., 00NN)
   - For each wireframe, create the SVG file and confirm it was saved
   - After all wireframes are generated, output a summary table

8. **Output**: After creating all wireframes:
   - Show a summary table of all generated wireframes:
     ```
     | ID   | Name                | Wireframe Type | File Path |
     |------|---------------------|----------------|-----------|
     | 0001 | Login               | Page           | docs/wireframes/0001/1024/login-wireframe.svg |
     | ...  | ...                 | ...            | ... |
     ```
   - State the total number of wireframes generated
   - If URL was provided: Mention that the design system was extracted from the analyzed page
   - If language was specified: Mention the language used for all wireframe text
   - Suggest the next step in the workflow (e.g., `/create-pencil-design`)

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
- When analyzing a URL, focus on structure and layout, not exact content
- Extract and apply the design system (colors, spacing, typography) from the analyzed page
- Maintain visual consistency across all wireframes in the set (same header height, sidebar width, font sizes, spacing, etc.)

## Usage Examples

### Example 1: Create all wireframes from spec.md (desktop, default 1024px)

```bash
/create-page-wireframe
```

**Result**: Reads `spec.md` from the project root. If it contains a Wireframe Map with 15 entries (11 pages + 4 components), generates 15 SVG wireframes in `docs/wireframes/{NNNN}/1024/`, using standard wireframe colors.

### Example 2: Create all wireframes with a reference URL

```bash
/create-page-wireframe "https://stripe.com"
```

**Result**: Reads `spec.md` and also analyzes Stripe's homepage to extract the design system (colors, spacing, typography). Generates all wireframes with a consistent design system derived from the reference page.

### Example 3: Create all mobile wireframes (375px)

```bash
/create-page-wireframe "" 375
```

**Result**: Reads `spec.md` and creates all wireframes at 375px wide with single-column stacked layouts, compact navigation, and mobile-friendly spacing.

### Example 4: Create all mobile wireframes with URL reference

```bash
/create-page-wireframe "https://stripe.com" 375
```

**Result**: Reads `spec.md`, analyzes Stripe's homepage, and creates all wireframes at 375px wide with the extracted design system adapted to mobile layout.

### Example 5: Create all tablet wireframes (768px)

```bash
/create-page-wireframe "" 768
```

**Result**: Reads `spec.md` and creates all wireframes at 768px wide with reduced columns and adapted spacing.

### Example 6: Create all wireframes in Japanese

```bash
/create-page-wireframe "" 1024 ja
```

**Result**: Reads `spec.md` and creates all wireframes at 1024px with all text labels, headings, buttons, table headers, and placeholder content in Japanese.

### Example 7: Create mobile wireframes in Japanese with URL reference

```bash
/create-page-wireframe "https://stripe.com" 375 ja
```

**Result**: Reads `spec.md`, analyzes Stripe's homepage, and creates all wireframes at 375px with Japanese text and the extracted design system.

### Example 8: Single-page application with components

```bash
/create-page-wireframe
```

**Result**: Reads `spec.md` which contains one Page entry and several Component entries in the Wireframe Map. Generates wireframe SVGs for the page and each component.

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

## Breakpoint-Specific Design Guidance

The wireframe layout should adapt based on the breakpoint value:

### Desktop (>= 1024px)

- Multi-column grids (2, 3, or 4 columns)
- Horizontal navigation with full menu items
- Side-by-side hero layouts (text + image)
- Wide content areas with generous padding
- Full-width sections with max-width containers

### Tablet (768–1023px)

- Reduced columns (2 columns max)
- Navigation may use condensed menu or early hamburger
- Adapted spacing and padding
- Stacked or 2-column hero layouts
- Slightly reduced typography sizes

### Mobile (< 768px)

- Single-column stacked layout throughout
- Hamburger menu or compact navigation
- Full-width content blocks
- Smaller typography (reduce heading sizes by ~25%)
- Reduced padding and margins
- Touch-friendly tap targets (minimum 44px height for interactive elements)
- Cards and features stacked vertically
- CTAs span full width

## Cross-Reference Resolution

When generating page wireframes, resolve component cross-references:

1. **Detect references**: Look for patterns like "(Component 0012)" or "(Component {NNNN})" in the page's Sections
2. **Look up the component**: Find the `## {NNNN}: {Name}` section in the same spec.md
3. **Render inline**: Draw the component's layout within the page wireframe at the referenced position
4. **Maintain consistency**: Use the same dimensions and style for the component across all pages that reference it (e.g., Navigation Header is always 64px tall, Sidebar is always 240px wide)

This ensures that shared components look identical across all page wireframes.

## When to Use URL Reference

**Use URL reference when**:

- You want a consistent design system (colors, spacing) across all wireframes
- You're creating pages inspired by an existing site's look and feel
- You want to see how a well-designed page handles similar content

**Don't use URL reference when**:

- You want complete creative freedom
- The referenced page is significantly different from your needs
- You prefer standard wireframe conventions
- The URL requires authentication (WebFetch won't work)

## URL Analysis Guidelines

When a URL is provided, the skill will:

1. **Fetch the page** using WebFetch tool
2. **Extract structure**: Header, hero, main sections, footer
3. **Extract colors**: Background, text, accent, border colors
4. **Extract typography**: Font families, sizes, weights
5. **Extract layouts**: Grid columns, flex patterns, spacing
6. **Extract components**: Buttons, cards, forms, navigation patterns
7. **Apply design system**: Use the extracted design elements consistently across all generated wireframes

**Important Notes**:

- The wireframe is a simplified representation, not an exact copy
- Focus is on structure and layout patterns
- Content is generalized (text becomes placeholders)
- Complex interactions are simplified to static wireframes
- Some details may be omitted for clarity
