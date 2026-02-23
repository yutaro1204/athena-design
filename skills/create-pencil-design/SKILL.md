---
name: create-pencil-design
description: Generates a Pencil (.pen) design frame from an existing SVG wireframe
argument-hint: '[wireframe-id] [breakpoint]'
disable-model-invocation: true
---

# Create Pencil Design

You are a design engineer. Your task is to generate a high-fidelity Pencil (.pen) design frame that faithfully reproduces an existing SVG wireframe, preserving its color scheme, content positions, typography, and layout structure.

## Instructions

1. **Parse the arguments**:
   - First argument: wireframe ID (4-digit number like "0001", required)
   - Second argument: breakpoint in pixels (required)
   - Examples:
     - `0001 1200`: Desktop frame from wireframe 0001 (1200px wide)
     - `0001 375`: Mobile frame from wireframe 0001 (375px wide)
     - `0002 768`: Tablet frame from wireframe 0002 (768px wide)
   - If no wireframe ID is provided, ask the user for it
   - If no breakpoint is provided, ask the user for it

2. **Locate the wireframe SVG**:
   - **Desktop** (breakpoint >= 1024):
     - Read the main wireframe: `docs/wireframes/{NNNN}/*-wireframe.svg`
     - Example: `docs/wireframes/0001/3d-model-landing-wireframe.svg`
   - **Mobile/Tablet** (breakpoint < 1024):
     - Read the responsive wireframe: `docs/wireframes/{NNNN}/{breakpoint}/*-responsive-wireframe.svg`
     - Example: `docs/wireframes/0001/768/3d-model-landing-responsive-wireframe.svg`
     - Extract only the **mobile view** portion (the left side `<g>` block, typically within `<g transform="translate(0, 60)">`)
   - If the wireframe file is not found, inform the user and stop
   - Extract the page name from the filename for naming the design frame

3. **Analyze the wireframe SVG**:
   - **Sections**: Identify all sections by `<g id="...">` groups (header, hero, featured-models, categories, features, footer, etc.)
   - **Colors**: Extract all `fill` and `stroke` hex values used (e.g., `#ffffff`, `#f5f5f5`, `#000000`, `#333333`, `#666666`, `#e0e0e0`)
   - **Typography**: Note all `font-size`, `font-weight`, `font-family`, `text-anchor`, and `fill` on `<text>` elements
   - **Layout**: Determine grid structures (number of columns, gaps between elements) from `<rect>` positions
   - **Dimensions**: Extract widths, heights, and positions of all `<rect>` elements to understand spacing
   - **Content**: Collect all text labels, titles, descriptions, and placeholder text
   - **Icons/Symbols**: Note any special characters (checkmarks, lightning bolts, infinity symbols) for icon mapping

4. **Set up the Pencil editor**:
   - Call `get_editor_state` to identify the active `.pen` file and any existing content
   - If no `.pen` file is open, open `design.pen` using `open_document`
   - Call `get_guidelines("landing-page")` for design rules and best practices
   - Call `find_empty_space_on_canvas` to find a clear area for the new frame, using the breakpoint as width and an estimated height (e.g., 3200px for desktop, 4000px for mobile)

5. **Create the page container**:
   - Use `batch_design` to insert a top-level frame into `document`:
     ```
     page=I(document, {type: "frame", name: "{Page Name} - {Desktop|Mobile}", placeholder: true, layout: "vertical", width: {breakpoint}, height: "fit_content({estimated_height})", fill: "{background_color}", x: {empty_x}, y: {empty_y}})
     ```
   - Set `placeholder: true` — this MUST remain true until the design is fully complete
   - Set width to the breakpoint value (e.g., 1200 for desktop, 375 for mobile)
   - Use `fit_content` for height so it adapts to content

6. **Build reusable components**:
   - Identify repeated patterns in the wireframe (e.g., product cards, category boxes)
   - Create reusable components with `reusable: true` placed on the side of the canvas (e.g., x offset +200 from main frame)
   - Each component should have named child elements with stable IDs for later override via `U(instance+"/childId", {...})`
   - Example card component structure:
     ```
     card=I(document, {type: "frame", name: "Component/ModelCard", reusable: true, layout: "vertical", width: 360, height: 320, fill: "#ffffff", stroke: {fill: "#000000", thickness: 1}, x: {side_x}, y: 0})
     img=I(card, {type: "frame", name: "Image", layout: "vertical", width: "fill_container", height: 240, fill: "#e0e0e0", ...})
     imgLabel=I(img, {type: "text", name: "imgLabel", content: "[Placeholder]", ...})
     info=I(card, {type: "frame", name: "CardInfo", layout: "vertical", width: "fill_container", height: "fill_container", ...})
     title=I(info, {type: "text", name: "cardTitle", content: "Title", ...})
     meta=I(info, {type: "text", name: "cardMeta", content: "Meta", ...})
     ```

7. **Build sections sequentially**:
   - Work through each section from top to bottom, using `batch_design` with **maximum 25 operations per call**
   - For each section:
     a. Create a section frame inside the page container with appropriate layout, padding, and background
     b. Add content elements (text, frames, icons, buttons)
     c. For grids: create row frames with `layout: "horizontal"` containing instances or child frames
     d. For card grids: insert component instances with `{type: "ref", ref: "{componentId}"}` and override content using `U(instance+"/childId", {content: "..."})`
   - Use flexbox layout throughout:
     - `layout: "vertical"` for section stacking
     - `layout: "horizontal"` for row layouts
     - `fill_container` for responsive widths within parents
     - `fit_content` for height that adapts to children
     - `justifyContent` and `alignItems` for alignment
     - `gap` for spacing between children
     - `padding` for internal spacing

   **Section building order:**
   - Header/Navigation
   - Hero Section
   - Content grids (featured items, products, etc.)
   - Category/browse sections
   - Features/benefits section
   - Additional content sections (new releases, testimonials, etc.)
   - CTA Section
   - Footer

8. **Apply correct styling**:
   - **Text**: Always set `fill` property for text color (text is invisible without it)
   - **Font**: Use `"Inter"` as the font family (mapped from wireframe's `"Arial"`)
   - **Font sizes**: Preserve exact `fontSize` values from the wireframe SVG
   - **Font weights**: Map wireframe `font-weight="bold"` to `fontWeight: "bold"`
   - **Text alignment**: Map `text-anchor="middle"` to `textAlign: "center"`
   - **Backgrounds**: Set `fill` on container frames for background colors
   - **Borders**: Use `stroke: {fill: "{color}", thickness: {n}}` for borders
   - **Icons**: Map wireframe symbols to Lucide icon names:
     - Checkmark (&#10003;) → `iconFontName: "check"`
     - Lightning (&#9889;) → `iconFontName: "zap"`
     - Infinity (&#8734;) → `iconFontName: "infinity"`
   - **Icon circles**: Use a frame with `layout: "none"` containing an `ellipse` and an `icon_font` overlaid with explicit x/y positioning

9. **Handle breakpoint-specific adaptations**:

   **Desktop (>= 1024px):**
   - Full-width header with logo and all nav links
   - Multi-column grids (3-4 columns)
   - Larger typography (32-42px headings)
   - Wider padding (40px horizontal)
   - Side-by-side feature columns
   - Full footer with 4 columns

   **Mobile (< 1024px):**
   - Compact header with fewer nav links, smaller logo and font sizes
   - Single-column stacked layouts
   - Smaller typography (24-28px headings, 12-16px body)
   - Narrower padding (16px horizontal)
   - Vertically stacked features (may show fewer items)
   - Omit sections not present in mobile wireframe (e.g., New Releases, CTA, Footer may be absent)

10. **Remove placeholder and verify**:
    - Set `placeholder: false` on the page container:
      ```
      U("{pageId}", {placeholder: false})
      ```
    - Use `get_screenshot` on the page container to verify the full design
    - Use `get_screenshot` on individual sections to verify details
    - Compare against the wireframe:
      - All sections present and in correct order
      - Colors match the wireframe's hex values
      - Typography sizes and weights match
      - Grid column counts match
      - Spacing and padding are proportional
      - All text content matches

11. **Fix any issues**:
    - If screenshots reveal misalignment, overlapping, or missing content, use `batch_design` to correct
    - Common fixes:
      - Move icon containers to position 0 in parent: `M("{iconContainerId}", "{parentId}", 0)`
      - Adjust frame heights: `U("{frameId}", {height: "fit_content"})`
      - Fix text visibility: ensure `fill` is set on all text nodes
      - Restructure icon-in-circle: replace separate ellipse + icon with a `layout: "none"` container frame holding both

12. **Output**:
    - Confirm the design frame has been created
    - Provide the page container node ID
    - State the breakpoint and frame dimensions
    - List all sections built
    - Mention any reusable components created
    - Summarize the color scheme used
    - Suggest running `get_screenshot` on specific sections for detailed review

## SVG-to-Pen Property Mapping

### Colors

Extract hex colors directly from SVG `fill` and `stroke` attributes:

| SVG Attribute                  | Pen Property                              |
| ------------------------------ | ----------------------------------------- |
| `fill="#ffffff"` on `<rect>`   | `fill: "#ffffff"` on frame                |
| `fill="#000000"` on `<text>`   | `fill: "#000000"` on text                 |
| `stroke="#000000"` on `<rect>` | `stroke: {fill: "#000000", thickness: 1}` |

### Typography

| SVG Attribute                     | Pen Property                   |
| --------------------------------- | ------------------------------ |
| `font-size="42"`                  | `fontSize: 42`                 |
| `font-size="14"`                  | `fontSize: 14`                 |
| `font-weight="bold"`              | `fontWeight: "bold"`           |
| `font-family="Arial, sans-serif"` | `fontFamily: "Inter"`          |
| `text-anchor="middle"`            | `textAlign: "center"`          |
| `fill="#333333"` on `<text>`      | `fill: "#333333"` on text node |

### Layout

| SVG Pattern                                      | Pen Layout                                         |
| ------------------------------------------------ | -------------------------------------------------- |
| Multiple `<rect>` at same y, spaced horizontally | `layout: "horizontal"` parent with `gap`           |
| Multiple `<g>` stacked vertically                | `layout: "vertical"` parent with `gap`             |
| Element centered in parent                       | `alignItems: "center"`, `justifyContent: "center"` |
| Full-width child                                 | `width: "fill_container"`                          |
| Height adapts to content                         | `height: "fit_content"`                            |
| Fixed spacing between elements                   | `gap: {pixels}`                                    |
| Internal margin                                  | `padding: [{top}, {right}, {bottom}, {left}]`      |

### Icons

| SVG Symbol             | Pen Icon                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| `&#10003;` (checkmark) | `{type: "icon_font", iconFontFamily: "lucide", iconFontName: "check"}`    |
| `&#9889;` (lightning)  | `{type: "icon_font", iconFontFamily: "lucide", iconFontName: "zap"}`      |
| `&#8734;` (infinity)   | `{type: "icon_font", iconFontFamily: "lucide", iconFontName: "infinity"}` |
| `&#9733;` (star)       | `{type: "icon_font", iconFontFamily: "lucide", iconFontName: "star"}`     |

### Icon-in-Circle Pattern

To place an icon centered inside a circle, use a `layout: "none"` container:

```
container=I(parent, {type: "frame", name: "Icon Circle", layout: "none", width: 80, height: 80})
ellipse=I(container, {type: "ellipse", width: 80, height: 80, fill: "#ffffff", stroke: {fill: "#000000", thickness: 2}, x: 0, y: 0})
icon=I(container, {type: "icon_font", iconFontFamily: "lucide", iconFontName: "check", width: 32, height: 32, fill: "#000000", x: 24, y: 24})
```

Center the icon by setting `x: (circleWidth - iconWidth) / 2` and `y: (circleHeight - iconHeight) / 2`.

## Component Instance Pattern

When using reusable components, insert an instance and override descendant properties:

```
card=I(row, {type: "ref", ref: "{componentId}", width: "fill_container", height: 320})
U(card+"/cardTitle", {content: "Actual Title"})
U(card+"/cardMeta", {content: "Category | $99"})
```

Key rules:

- Use `U(instance+"/childId", {...})` to override text content on component instance descendants
- Never use `U()` on descendants of a just-copied (`C()`) node — use the `descendants` property in the Copy operation instead
- When inserting into a slot inside an instance, use: `I("instanceId/slotId", {...})`

## Batch Design Operation Limits

- **Maximum 25 operations per `batch_design` call**
- Split large sections across multiple calls
- Recommended grouping:
  - Call 1: Page container creation
  - Call 2: Reusable component definitions
  - Call 3: Header + Hero section
  - Call 4-N: Content sections (one call per major section)
  - Call N+1: Footer
  - Final call: Remove placeholder

## Usage Examples

```bash
# Desktop design from wireframe 0001 (1200px wide)
/create-pencil-design 0001 1200

# Mobile design from wireframe 0001 (375px wide)
/create-pencil-design 0001 375

# Tablet design from wireframe 0002 (768px wide)
/create-pencil-design 0002 768

# Desktop design at 1440px
/create-pencil-design 0003 1440
```

## Workflow Example

1. Designer creates wireframe: `docs/wireframes/0001/landing-page-wireframe.svg`
2. Optionally creates responsive wireframe: `docs/wireframes/0001/768/landing-page-responsive-wireframe.svg`
3. **Run `/create-pencil-design 0001 1200`** to generate the desktop Pencil design frame
4. **Run `/create-pencil-design 0001 375`** to generate the mobile Pencil design frame
5. Both frames appear on the Pencil canvas for review and refinement
6. Use as high-fidelity reference for implementation with `/create-page-from-wireframe 0001`

**Typical output on canvas:**

```
[Desktop Frame - 1200px]  [Mobile Frame - 375px]  [Components]
```

## Important Notes

- **Wireframe ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- **Pencil MCP Tools**: This skill uses the Pencil MCP server tools exclusively for .pen file operations — never use `Read` or `Grep` on .pen files
- **Placeholder Workflow**: Always set `placeholder: true` on the page frame before building, remove it only when fully complete
- **Text Visibility**: Text nodes MUST have a `fill` property set or they will be invisible
- **Font Family**: Use `"Inter"` in place of wireframe's `"Arial, sans-serif"`
- **Flexbox First**: Always prefer flexbox layout over absolute positioning; use `layout: "none"` only for overlay patterns (e.g., icon-in-circle)
- **fit_content vs fill_container**: Use `fill_container` for children that should stretch to parent width; use `fit_content` for parents that should shrink to children
- **Color Fidelity**: Extract exact hex colors from the wireframe SVG — do not substitute or approximate
- **Content Fidelity**: Use the exact text content from the wireframe — do not rephrase or embellish
- **Section Completeness**: Only include sections that are present in the wireframe view for the given breakpoint (mobile wireframes may omit sections)
- **Visual Verification**: Always take screenshots after completing the design and after fixing issues
- **Component Reuse**: Create reusable components for any element that repeats 3+ times (cards, list items, category boxes)
- **Canvas Placement**: Always use `find_empty_space_on_canvas` before creating frames to avoid overlapping existing content

## Design Checklist

- [ ] Page container created with correct width matching breakpoint
- [ ] All sections from wireframe present and in correct order
- [ ] Color scheme matches wireframe exactly (all hex values preserved)
- [ ] Typography sizes and weights match wireframe
- [ ] Grid column counts match (3-col desktop, 1-col mobile, etc.)
- [ ] All text content matches wireframe labels
- [ ] Icons correctly mapped from wireframe symbols to Lucide icons
- [ ] Reusable components created for repeated patterns
- [ ] Component instance overrides applied correctly
- [ ] Padding and spacing proportional to wireframe
- [ ] Placeholder flag removed from page container
- [ ] Full-page screenshot taken and verified
- [ ] Individual section screenshots checked for detail accuracy
