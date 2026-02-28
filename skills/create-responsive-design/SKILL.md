---
name: create-responsive-design
description: Creates an SVG wireframe adapted to a specific viewport breakpoint width
argument-hint: '[wireframe-id] [breakpoint]'
disable-model-invocation: true
---

# Create Responsive Design

You are a UX/UI designer. Your task is to create an SVG wireframe that shows how the page looks at a specific viewport width (breakpoint), based on an existing wireframe.

## Instructions

1. **Parse the arguments**:
   - First argument: wireframe ID (4-digit number like "0001", required)
   - Second argument: breakpoint in pixels (optional, defaults to "768")
   - Examples:
     - `0001`: Uses wireframe 0001 with 768px breakpoint
     - `0001 768`: Uses wireframe 0001 with 768px breakpoint
     - `0001 1024`: Uses wireframe 0001 with 1024px breakpoint
     - `0002 375`: Uses wireframe 0002 with 375px (mobile) breakpoint
   - If no wireframe ID is provided, ask the user for it

2. **Find the existing wireframe**:
   - Search for wireframe files: `docs/wireframes/{NNNN}/**/*-wireframe.svg`
   - Look in any breakpoint subdirectory (e.g., `docs/wireframes/0001/1200/`, `docs/wireframes/0001/375/`)
   - Prefer the largest existing breakpoint version as the source of truth (typically the 1200px desktop version)
   - If not found, inform the user and stop
   - If found, read the SVG file to understand the design
   - Extract the page name from the filename for later use

3. **Analyze the existing wireframe**:
   - Extract the viewBox dimensions (e.g., "0 0 1200 2400")
   - Identify all sections:
     - Header/Navigation
     - Sidebar (if present)
     - Hero section
     - Features section
     - Content sections (tables, cards, grids)
     - Footer
   - Note all text labels, layout structure, colors, and spacing
   - Understand the visual hierarchy and component placement

4. **Determine layout adaptations for the breakpoint**:
   - The given breakpoint is the exact viewport width to design for
   - Adapt the original wireframe layout to fit within this width
   - Follow the breakpoint-specific design guidance below

5. **Create the wireframe SVG**:
   - Use a viewBox of `"0 0 {breakpoint} {height}"` where `{breakpoint}` is the given viewport width and `{height}` is determined by the content (taller for narrower viewports due to stacking)
   - The wireframe should represent how the page actually looks at this exact viewport width
   - This is NOT a side-by-side comparison — it is a single, standalone wireframe

   ```svg
   <svg viewBox="0 0 {breakpoint} {height}" xmlns="http://www.w3.org/2000/svg" fill="none">
     <!-- Background -->
     <rect width="{breakpoint}" height="{height}" fill="#f5f5f5"/>

     <!-- Sections adapted to the breakpoint width -->
     <!-- ... -->
   </svg>
   ```

6. **Visual design guidelines**:
   - Use the same color scheme as the original wireframe
   - Maintain the same visual language and design tokens
   - Ensure all text is readable at the given width
   - Use the same fonts as the original wireframe
   - Adjust font sizes proportionally for the viewport width

7. **Save the wireframe**:
   - Create directory structure: `docs/wireframes/{NNNN}/{breakpoint}/`
   - Example directory: `docs/wireframes/0001/768/`
   - Generate filename: `{page-name}-wireframe.svg`
   - Example full path: `docs/wireframes/0001/768/customer-management-wireframe.svg`
   - Preserve the page name from the original wireframe filename
   - Create the directories if they don't exist

8. **Output**:
   - Confirm the wireframe has been created
   - Provide the full file path
   - Mention the wireframe ID and breakpoint used
   - Summarize key layout adaptations made for this breakpoint:
     - Layout changes (sidebar visibility, grid columns, stacking)
     - Typography adjustments
     - Navigation changes
     - Content reflow patterns
   - Suggest next steps:
     - Review the wireframe
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
# Create a 768px (tablet) wireframe for page 0001
/create-responsive-design 0001 768

# Create a 375px (mobile) wireframe for page 0001
/create-responsive-design 0001 375

# Create a 1024px wireframe for page 0002
/create-responsive-design 0002 1024

# Default breakpoint (768px)
/create-responsive-design 0001
```

## Workflow Example

1. Designer creates initial desktop wireframe: `docs/wireframes/0001/1200/page-wireframe.svg`
2. **Run `/create-responsive-design 0001 768`** to create the 768px version
3. Generated: `docs/wireframes/0001/768/page-wireframe.svg`
4. **Run `/create-responsive-design 0001 375`** to create the 375px version
5. Generated: `docs/wireframes/0001/375/page-wireframe.svg`
6. Review all breakpoint wireframes
7. Proceed to implementation

**Directory Structure After:**

```
docs/
  wireframes/
    0001/
      1200/
        customer-management-wireframe.svg    (original desktop)
      768/
        customer-management-wireframe.svg    (tablet adaptation)
      375/
        customer-management-wireframe.svg    (mobile adaptation)
    0002/
      1200/
        another-page-wireframe.svg           (original desktop)
      768/
        another-page-wireframe.svg           (tablet adaptation)
```

## Important Notes

- **Single wireframe output**: Each invocation produces one wireframe at the specified viewport width — NOT a side-by-side comparison
- **Wireframe ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- **Directory Structure**: Creates `docs/wireframes/{NNNN}/{breakpoint}/` subdirectories automatically
- **File Naming**: `{page-name}-wireframe.svg` — same filename as the original, stored in the breakpoint directory
- **Multiple Breakpoints**: Run the skill multiple times with different breakpoints to build a complete set
- **Visual consistency**: Use the same colors, fonts, and design tokens as the original
- **Proportional adaptation**: Layout should feel natural at the given width, not "squished"
- **Breakpoint flexibility**: Support any numeric breakpoint (375, 640, 768, 1024, 1280, 1536, etc.)
- **Source wireframe**: Always base adaptations on the largest available wireframe (typically the 1200px version)

## Design Checklist

- [ ] Directory structure created: `docs/wireframes/{NNNN}/{breakpoint}/`
- [ ] File saved with correct naming: `{page-name}-wireframe.svg`
- [ ] viewBox width matches the given breakpoint
- [ ] Layout is properly adapted for the viewport width
- [ ] Typography is readable at this width
- [ ] Touch targets are adequate if breakpoint < 768px (≥44px)
- [ ] Grid layouts use appropriate column count for the width
- [ ] Navigation is adapted (hamburger for narrow, full for wide)
- [ ] Sidebar visibility is appropriate for the width
- [ ] Tables are converted to cards if width < 768px
- [ ] Spacing is proportional to the viewport width
- [ ] Color scheme is consistent with the original wireframe
