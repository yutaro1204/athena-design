---
name: create-responsive-design
description: Creates SVG wireframes adapted to a specific viewport breakpoint width for all wireframes in docs/wireframes
argument-hint: '[breakpoint]'
disable-model-invocation: true
---

# Create Responsive Design

You are a UX/UI designer. Your task is to create SVG wireframes that show how each page/component looks at a specific viewport width (breakpoint), based on existing wireframes found in `docs/wireframes/`.

## Instructions

1. **Parse the arguments**:
   - First argument: breakpoint in pixels (optional, defaults to "375")
   - Examples:
     - (no argument): Creates responsive wireframes at 375px (mobile) for all wireframes
     - `375`: Creates 375px (mobile) wireframes for all wireframes
     - `768`: Creates 768px (tablet) wireframes for all wireframes
   - If the breakpoint matches the source wireframe's breakpoint (e.g., requesting 1024 when source is 1024), skip that wireframe and inform the user

2. **Discover all existing wireframes**:
   - Scan the `docs/wireframes/` directory at the project root
   - Find all wireframe directories matching the pattern `docs/wireframes/{NNNN}/`
   - Within each directory, find SVG files matching `**/*-wireframe.svg`
   - For each wireframe, prefer the largest existing breakpoint version as the source of truth (typically the 1024px desktop version)
   - Build a list of all wireframes to process, sorted by wireframe ID
   - If no wireframes are found, inform the user and suggest running `/create-page-wireframe` first

3. **Process each wireframe sequentially**:
   For each wireframe found, perform steps 4–8 below. Generate wireframes in order of wireframe ID (0001, 0002, ..., 00NN).

4. **Analyze the existing wireframe**:
   - Read the source SVG file
   - Extract the viewBox dimensions (e.g., "0 0 1024 2400")
   - Identify all sections:
     - Header/Navigation
     - Sidebar (if present)
     - Hero section
     - Features section
     - Content sections (tables, cards, grids)
     - Footer
   - Note all text labels, layout structure, colors, and spacing
   - Understand the visual hierarchy and component placement

5. **Determine layout adaptations for the breakpoint**:
   - The given breakpoint is the exact viewport width to design for
   - Adapt the original wireframe layout to fit within this width
   - Follow the breakpoint-specific design guidance below

6. **Create the wireframe SVG**:
   - Use a viewBox of `"0 0 {breakpoint} {height}"` where `{breakpoint}` is the given viewport width and `{height}` is determined by the content (taller for narrower viewports due to stacking)
   - The wireframe should represent how the page actually looks at this exact viewport width
   - This is NOT a side-by-side comparison — it is a single, standalone wireframe
   - **XML character escaping**: SVG is an XML format, so all text content in `<text>` elements and attributes must use XML-safe characters. Always escape these characters:
     - `&` → `&amp;`
     - `<` → `&lt;`
     - `>` → `&gt;`
     - For example, "User & Permissions" must be written as `<text>User &amp; Permissions</text>` in the SVG. Failing to escape `&` will cause the SVG to fail to render.

   - **Background**: Always include a full-size background `<rect>` as the first child element of the `<svg>`, matching the viewBox dimensions. This is required for all wireframes to ensure a visible background color:

   ```svg
   <svg viewBox="0 0 {breakpoint} {height}" xmlns="http://www.w3.org/2000/svg" font-family="...">
     <!-- Background -->
     <rect width="{breakpoint}" height="{height}" fill="#f0f0f0"/>

     <!-- Sections adapted to the breakpoint width -->
     <!-- ... -->
   </svg>
   ```

7. **Visual design guidelines**:
   - Use the same color scheme as the original wireframe
   - Maintain the same visual language and design tokens
   - Ensure all text is readable at the given width
   - Use the same fonts as the original wireframe
   - Adjust font sizes proportionally for the viewport width

8. **Save the wireframe**:
   - Create directory structure: `docs/wireframes/{NNNN}/{breakpoint}/`
   - Example directory: `docs/wireframes/0001/375/`
   - Generate filename: `{page-name}-wireframe.svg`
   - Example full path: `docs/wireframes/0001/375/customer-management-wireframe.svg`
   - Preserve the page name from the original wireframe filename
   - Create the directories if they don't exist

9. **Output**: After processing all wireframes:
   - Show a summary table of all generated wireframes:
     ```
     | ID   | Name                | Source Breakpoint | Target Breakpoint | File Path |
     |------|---------------------|-------------------|-------------------|-----------|
     | 0001 | Login               | 1024              | 375               | docs/wireframes/0001/375/login-wireframe.svg |
     | 0002 | Dashboard           | 1024              | 375               | docs/wireframes/0002/375/dashboard-wireframe.svg |
     | ...  | ...                 | ...               | ...               | ... |
     ```
   - State the total number of wireframes generated
   - Note any wireframes that were skipped (and why)
   - Summarize key layout adaptations made for this breakpoint:
     - Layout changes (sidebar visibility, grid columns, stacking)
     - Typography adjustments
     - Navigation changes
     - Content reflow patterns
   - Suggest next steps:
     - Review the wireframes
     - Create additional breakpoint versions if needed
     - Proceed to Pencil design or code implementation

## Breakpoint-Specific Design Guidance

Adapt the wireframe layout based on the given breakpoint width:

### Mobile (< 768px, e.g., 375px)

- **Navigation**: Hamburger menu or compact icon-based navigation, no full text menu
- **Sidebar**: Hidden entirely (accessible via hamburger/drawer)
- **Layout**: Single-column stacked layout throughout
- **Grids**: All grids collapse to 1 column
- **Tables**: Convert to card-based layout (tables don't fit on narrow screens)
- **Typography**: Reduce heading sizes by ~25-30%, body text by ~10%
- **Spacing**: Reduce padding to ~12-16px
- **Buttons**: Full-width, stacked vertically
- **Touch targets**: Minimum 44px height for interactive elements
- **Stats/KPI cards**: Stack in 2x2 grid or single column
- **Images**: Full-width, reduced height

### Tablet (768px–1023px)

- **Navigation**: Condensed horizontal nav or early hamburger menu
- **Sidebar**: Can be a narrow icon-only sidebar (~60px) or hidden
- **Layout**: Reduced columns (2 columns max for grids)
- **Tables**: Show essential columns only (hide lower-priority columns like phone, secondary info)
- **Typography**: Reduce heading sizes by ~10-15%
- **Spacing**: Moderate padding ~20-32px
- **Buttons**: Can sit side-by-side if space allows
- **Stats/KPI cards**: 2x2 grid or 4 across if space allows
- **Images**: Slightly reduced dimensions

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

## Section-Specific Responsive Patterns

**Header/Navigation:**

- Narrow (< 768px): Hamburger + logo + key action icons
- Medium (768–1023px): Condensed nav links or icon-only sidebar
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

## Usage Examples

```bash
# Create 375px (mobile) wireframes for all wireframes (default)
/create-responsive-design

# Create 375px (mobile) wireframes for all wireframes
/create-responsive-design 375

# Create 768px (tablet) wireframes for all wireframes
/create-responsive-design 768
```

## Workflow Example

1. Designer creates initial desktop wireframes via `/create-page-wireframe` (1024px)
2. **Run `/create-responsive-design 375`** to create mobile versions for all wireframes
3. **Run `/create-responsive-design 768`** to create tablet versions for all wireframes
4. Review all breakpoint wireframes
5. Proceed to implementation

**Directory Structure After:**

```
docs/
  wireframes/
    0001/
      1024/
        login-wireframe.svg              (original desktop)
      768/
        login-wireframe.svg              (tablet adaptation)
      375/
        login-wireframe.svg              (mobile adaptation)
    0002/
      1024/
        dashboard-wireframe.svg          (original desktop)
      768/
        dashboard-wireframe.svg          (tablet adaptation)
      375/
        dashboard-wireframe.svg          (mobile adaptation)
    ...
```

## Important Notes

- **Batch processing**: Each invocation processes ALL wireframes in `docs/wireframes/` — no need to specify individual wireframe IDs
- **Single wireframe output per ID**: Each wireframe produces one SVG at the specified viewport width — NOT a side-by-side comparison
- **Skip duplicates**: If a wireframe already exists at the target breakpoint, skip it (do not overwrite unless the source has changed)
- **Directory Structure**: Creates `docs/wireframes/{NNNN}/{breakpoint}/` subdirectories automatically
- **File Naming**: `{page-name}-wireframe.svg` — same filename as the original, stored in the breakpoint directory
- **Visual consistency**: Use the same colors, fonts, and design tokens as the original
- **Proportional adaptation**: Layout should feel natural at the given width, not "squished"
- **Breakpoint flexibility**: Support any numeric breakpoint (375, 640, 768, 1024, 1280, 1536, etc.)
- **Source wireframe**: Always base adaptations on the largest available wireframe (typically the 1024px version)

## Checklist

- [ ] All wireframes in `docs/wireframes/` discovered and listed
- [ ] Each wireframe processed sequentially by ID
- [ ] Directory structure created: `docs/wireframes/{NNNN}/{breakpoint}/`
- [ ] Files saved with correct naming: `{page-name}-wireframe.svg`
- [ ] viewBox width matches the given breakpoint
- [ ] Background `<rect>` with `fill="#f0f0f0"` is the first child element, matching viewBox dimensions
- [ ] Layout is properly adapted for the viewport width
- [ ] Typography is readable at this width
- [ ] Touch targets are adequate if breakpoint < 768px (≥44px)
- [ ] Grid layouts use appropriate column count for the width
- [ ] Navigation is adapted (hamburger for narrow, full for wide)
- [ ] Sidebar visibility is appropriate for the width
- [ ] Tables are converted to cards if width < 768px
- [ ] Spacing is proportional to the viewport width
- [ ] Color scheme is consistent with the original wireframe
- [ ] XML characters properly escaped (`&` → `&amp;`, etc.)
- [ ] Summary table shown with all generated wireframes
