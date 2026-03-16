---
name: create-pencil-design
description: Generates Pencil (.pen) design frames for all Page wireframes found in docs/wireframes
argument-hint: '[pen-file-path]'
disable-model-invocation: true
---

# Create Pencil Design

You are a design engineer. Your task is to generate high-fidelity Pencil (.pen) design frames for all Page wireframes found in `docs/wireframes/`, preserving each wireframe's color scheme, content positions, typography, and layout structure. Component wireframes are built first as standalone reusable Pencil components, then Page designs reference them via component instances.

## Instructions

1. **Parse the arguments**:
   - First argument: `.pen` file path (optional, defaults to `pencil/design.pen`)
   - Examples:
     - _(no arguments)_: Process all Page wireframes, using default `pencil/design.pen`
     - `pencil/my-design.pen`: Process all Page wireframes, targeting a specific `.pen` file
   - If no `.pen` file path is provided, use `pencil/design.pen` as the default

2. **Read `spec.md` and discover all wireframes**:
   - Read `spec.md` from the project root (sibling of `docs/`)
   - **If `spec.md` is not found**: warn the user that `spec.md` is missing and stop. The skill requires `spec.md` to determine Page vs Component wireframe types.
   - Find the **Wireframe Map** table and classify each wireframe ID as `Page` or `Component`
   - Collect all **Page** wireframe IDs (e.g., 0001, 0002) — these are the wireframes that will be designed
   - Collect all **Component** wireframe IDs (e.g., 0003, 0004, 0005) — these will be built as standalone reusable Pencil components before any Page processing
   - For each Page, note which Component wireframe IDs it references (e.g., "Navigation Header: (Component 0003)") so the correct component instances can be inserted later
   - If no Page wireframes are found, inform the user and stop

3. **Discover all breakpoints**:
   - **For each Page wireframe ID**, list all subdirectories under `docs/wireframes/{NNNN}/` that are numeric (e.g., `375`, `768`, `1024`)
   - **For each Component wireframe ID**, list all subdirectories under `docs/wireframes/{NNNN}/` that are numeric
   - Exclude non-numeric directories (e.g., `components`)
   - Sort breakpoints in descending order (largest first, e.g., 1024 → 768 → 375) so desktop is built first
   - Each breakpoint directory contains a wireframe SVG: `docs/wireframes/{NNNN}/{breakpoint}/*-wireframe.svg`
   - If a wireframe has no numeric breakpoint directories, warn the user and skip it
   - Extract the page/component name from the wireframe filename for naming

4. **Set up the Pencil directory and editor**:
   - Determine the target `.pen` file path from the first argument (default: `pencil/design.pen`)
   - Create the parent directory of the target `.pen` file if it does not exist:
     ```bash
     mkdir -p pencil  # or the parent directory of the specified .pen file path
     ```
   - This directory stores all Pencil design artifacts:
     ```
     pencil/
     ├── design.pen          # Pencil design file (default target)
     ├── coverage.md       # Coverage manifest (auto-generated)
     └── images/             # AI-generated images referenced by design.pen
     ```
   - **Verify the `.pen` file exists** — the `.pen` format is proprietary and must be created manually in the Pencil application. If the file does not exist, inform the user:
     "The file `{pen-file-path}` does not exist. Please create it in the Pencil application first, then re-run this skill."
   - **Always open the target `.pen` file** using `open_document("{pen-file-path}")` — do this unconditionally, regardless of what file is currently active in the editor.
   - Call `get_editor_state` after opening to confirm the file is active and inspect existing content
   - Call `get_guidelines("landing-page")` for design rules and best practices

5. **Check coverage manifest for already-applied wireframes**:
   - Look for `pencil/coverage.md` (in the same directory as the `.pen` file)
   - **If the manifest exists**: Read it and extract the list of wireframes with `"status": "applied"`. These wireframes already have corresponding Pencil nodes and should be **skipped** in steps 6 and 7 below.
     - For applied Components: record their `nodeId` values so they can be referenced when building Page designs (no need to recreate them)
     - For applied Pages: skip them entirely — they already exist on the canvas
   - **If the manifest does not exist**: Proceed normally — all wireframes will be processed
   - **If a wireframe is listed as `"applied"` in the manifest but you cannot find its `nodeId` in the Pencil file** (e.g., it was deleted): treat it as `"missing"` and rebuild it
   - Print a summary of what will be skipped vs built:
     ```
     Coverage manifest found. Skipping 8 already-applied wireframes.
     Will build: 0005/375 (Component/Mobile Player Bar), 0002/375 (Favorites - 375px)
     ```

6. **Build all Component wireframes as reusable Pencil components** (BEFORE any Page processing):
   - This is the **components-first phase**. All Component wireframes from `spec.md` are built as standalone reusable Pencil components before any Page designs are created.
   - **Skip components already covered**: If step 5 found applied components in the coverage manifest, skip those — use their existing `nodeId` values directly. Only build components that are missing or new.
   - For each Component wireframe ID (e.g., 0003, 0004, 0005), and for each breakpoint discovered in step 3:
     a. **Check coverage**: If this component + breakpoint is already applied (from step 5), skip it and record the existing nodeId
     b. **Read and analyze the Component wireframe SVG** at `docs/wireframes/{NNNN}/{breakpoint}/*-wireframe.svg`
     c. Analyze all variants shown in the wireframe (e.g., Default, Playing, Hover states; Compact, Expanded, Idle variants)
     d. Extract colors, typography, layout dimensions, and content from the SVG
     e. **Find empty space** on the canvas using `find_empty_space_on_canvas`
     f. **Create the reusable component** with `reusable: true` directly on the `document` (not inside any page frame):
        ```
        comp=I(document, {type: "frame", name: "Component/{Name}", reusable: true, layout: "horizontal", width: {width}, height: {height}, fill: "#ffffff", x: {empty_x}, y: {empty_y}})
        ```
     g. Build the component's internal structure with named child elements that have stable IDs for later override via `U(instance+"/childId", {...})`
   - **Breakpoint-specific components**: When a Component wireframe has different layouts at different breakpoints (e.g., desktop navigation with full nav links vs mobile navigation with hamburger menu), create separate reusable components for each breakpoint variant:
     - Desktop: `"Component/Navigation Header"` (1024px wide, full nav links)
     - Mobile: `"Component/Mobile Navigation Header"` (375px wide, hamburger menu)
   - **Multiple variants**: If the wireframe shows multiple variants (e.g., Default, Playing, Hover), build the default/primary variant as the reusable component. Other variants can be noted for reference but the primary variant is what gets instantiated in Page designs.
   - **Record component IDs**: Keep a mapping of Component wireframe ID + breakpoint → Pencil node ID for use in step 9 when building Page designs. This includes both newly created components and pre-existing ones from the coverage manifest.

   Example component structure:
   ```
   comp=I(document, {type: "frame", name: "Component/Track List Item", reusable: true, layout: "horizontal", width: 960, height: 64, fill: "#ffffff", stroke: {fill: "#e0e0e0", thickness: 1}, x: {x}, y: {y}})
   thumb=I(comp, {type: "frame", name: "albumArt", layout: "none", width: 48, height: 48, fill: "#d4c4b0", cornerRadius: 4})
   info=I(comp, {type: "frame", name: "trackInfo", layout: "vertical", width: "fill_container", justifyContent: "center"})
   title=I(info, {type: "text", name: "trackTitle", content: "Track Title", fontSize: 14, fontWeight: "bold", fill: "#333333"})
   meta=I(info, {type: "text", name: "trackMeta", content: "Artist · Album", fontSize: 11, fill: "#888888"})
   dur=I(comp, {type: "text", name: "duration", content: "0:00", fontSize: 12, fill: "#888888"})
   heart=I(comp, {type: "icon_font", name: "heartIcon", iconFontFamily: "lucide", iconFontName: "heart", width: 16, height: 16, fill: "#cccccc"})
   ```

7. **Process each Page wireframe and its breakpoints sequentially**:
   - Iterate through all Page wireframes in order (e.g., 0001, then 0002)
   - For each Page wireframe, iterate through all its breakpoints (largest first)
   - **Skip pages already covered**: If step 5 found this Page + breakpoint already applied in the coverage manifest, skip it entirely
   - For each remaining Page + breakpoint combination, perform steps 8–15 below to create a design frame
   - Each breakpoint produces its own frame on the canvas (e.g., "Music Library - 1024px", "Music Library - 375px")
   - All reusable components were already created in step 6 (or loaded from coverage) and are shared across all Pages

8. **Read and analyze the wireframe SVG for the current breakpoint**:
   - **Sections**: Identify all sections by `<g id="...">` groups (header, hero, featured-models, categories, features, footer, etc.)
   - **Colors**: Extract all `fill` and `stroke` hex values used (e.g., `#ffffff`, `#f5f5f5`, `#000000`, `#333333`, `#666666`, `#e0e0e0`)
   - **Typography**: Note all `font-size`, `font-weight`, `font-family`, `text-anchor`, and `fill` on `<text>` elements
   - **Layout**: Determine grid structures (number of columns, gaps between elements) from `<rect>` positions
   - **Dimensions**: Extract widths, heights, and positions of all `<rect>` elements to understand spacing
   - **Content**: Collect all text labels, titles, descriptions, and placeholder text
   - **Icons/Symbols**: Note any special characters (checkmarks, lightning bolts, infinity symbols) for icon mapping

9. **Create the page container**:
   - Call `find_empty_space_on_canvas` to find a clear area for the new frame
   - Use `batch_design` to insert a top-level frame into `document`:
     ```
     page=I(document, {type: "frame", name: "{Page Name} - {breakpoint}px", placeholder: true, layout: "vertical", width: {breakpoint}, height: "fit_content({estimated_height})", fill: "{background_color}", x: {empty_x}, y: {empty_y}})
     ```
   - Set `placeholder: true` — this MUST remain true until the design is fully complete
   - Set width to the current breakpoint value (e.g., 1024 for desktop, 375 for mobile)
   - Use `fit_content` for height so it adapts to content

10. **Build sections sequentially using component instances**:
   - Work through each section from top to bottom, using `batch_design` with **maximum 25 operations per call**
   - For each section:
     a. Create a section frame inside the page container with appropriate layout, padding, and background
     b. **Where `spec.md` maps a section to a Component wireframe** (e.g., "Navigation Header: (Component 0003)"), insert an instance of the corresponding reusable component built in step 6: `{type: "ref", ref: "{componentId}"}`. Use the component ID for the matching breakpoint (desktop component for desktop pages, mobile component for mobile pages). Override content as needed with `U(instance+"/childId", {content: "..."})`.
     c. Add content elements (text, frames, icons, buttons)
     d. For grids: create row frames with `layout: "horizontal"` containing instances or child frames
     e. For card grids or repeated items: insert component instances with `{type: "ref", ref: "{componentId}"}` and override content using `U(instance+"/childId", {content: "..."})`
   - **Also identify repeated patterns within the Page wireframe** (e.g., product cards, category boxes) that are NOT already Component wireframes. Create additional reusable components for these if they repeat 3+ times.
   - Use flexbox layout throughout:
     - `layout: "vertical"` for section stacking
     - `layout: "horizontal"` for row layouts
     - `fill_container` for responsive widths within parents
     - `fit_content` for height that adapts to children
     - `justifyContent` and `alignItems` for alignment
     - `gap` for spacing between children
     - `padding` for internal spacing

   **Section building order**: Follow the order defined in the Page's spec section in `spec.md`. Typical order:
   - Header/Navigation (often a Component reference)
   - Main content sections (as listed in spec)
   - Repeated item lists (using Component instances)
   - Footer or persistent elements (e.g., Player Bar as a Component reference)

11. **Apply correct styling**:
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

12. **Handle breakpoint-specific adaptations**:

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

13. **Remove placeholder and verify**:
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

14. **Fix any issues**:
    - If screenshots reveal misalignment, overlapping, or missing content, use `batch_design` to correct
    - Common fixes:
      - Move icon containers to position 0 in parent: `M("{iconContainerId}", "{parentId}", 0)`
      - Adjust frame heights: `U("{frameId}", {height: "fit_content"})`
      - Fix text visibility: ensure `fill` is set on all text nodes
      - Restructure icon-in-circle: replace separate ellipse + icon with a `layout: "none"` container frame holding both

15. **Update coverage manifest** (after all Components and Pages are processed):
    - Run `/report-pencil-coverage` (or perform its logic inline) to generate/update `pencil/coverage.md`
    - This records all Components and Pages now present in the `.pen` file, so that the next run of `/create-pencil-design` can skip them
    - If the manifest already existed, the new manifest replaces it with the current state

16. **Output**:
    - Confirm all reusable components and design frames have been created (noting which were newly built vs skipped from coverage)
    - List all reusable components from Component wireframes, with their node IDs and breakpoint variants
    - List each Page wireframe processed with its breakpoints, page container node IDs, and frame dimensions
    - List all sections built per Page per breakpoint
    - Note which component instances are used in each Page
    - Summarize the color scheme used
    - Confirm that `pencil/coverage.md` has been updated
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
  - **Phase 1 — Components**: One or more calls per Component wireframe (one call per component variant/breakpoint)
  - **Phase 2 — Pages**: Page container creation, then one call per major section (inserting Component instances where spec.md maps them)
  - **Final call per Page**: Remove placeholder
  - **Post-processing**: Update `pencil/coverage.md` via `/report-pencil-coverage`

## Usage Examples

```bash
# Process all Page wireframes, default pencil/design.pen
/create-pencil-design

# Process all Page wireframes, targeting a specific .pen file
/create-pencil-design pencil/my-project.pen
```

## Workflow Example

1. `spec.md` defines Page wireframes (0001: Music Library, 0002: Favorites) and Component wireframes (0003: Navigation Header, 0004: Track List Item, 0005: Player Bar)
2. Designer creates wireframes in breakpoint subdirectories:
   - `docs/wireframes/0001/1024/music-library-wireframe.svg`
   - `docs/wireframes/0001/375/music-library-wireframe.svg`
   - `docs/wireframes/0002/1024/favorites-wireframe.svg`
   - `docs/wireframes/0002/375/favorites-wireframe.svg`
   - `docs/wireframes/0003/1024/navigation-header-wireframe.svg` (Component)
   - `docs/wireframes/0003/375/navigation-header-wireframe.svg` (Component)
   - `docs/wireframes/0004/1024/track-list-item-wireframe.svg` (Component)
   - `docs/wireframes/0004/375/track-list-item-wireframe.svg` (Component)
   - `docs/wireframes/0005/1024/player-bar-wireframe.svg` (Component)
   - `docs/wireframes/0005/375/player-bar-wireframe.svg` (Component)
3. **[MANUAL] Create the `.pen` file** in the Pencil application and save as `pencil/design.pen`
4. **Run `/create-pencil-design`** — the skill automatically:
   - Checks `pencil/coverage.md` for already-applied wireframes (skips them if found)
   - Reads `spec.md` to find Pages (0001, 0002) and Components (0003, 0004, 0005)
   - **Phase 1 — Components**: Builds ALL Component wireframes as standalone reusable Pencil components for each breakpoint (e.g., Component/Navigation Header for 1024px, Component/Mobile Navigation Header for 375px, etc.)
   - **Phase 2 — Pages**: Generates design frames for all Pages x all breakpoints, inserting component instances with content overrides
   - **Phase 3 — Coverage**: Updates `pencil/coverage.md` with the current state
5. All components and page frames appear on the Pencil canvas for review and refinement
6. Later, if new wireframes are added (e.g., 0006), run `/create-pencil-design` again — it reads the manifest and only builds the new wireframes
7. Use as high-fidelity reference for implementation with `/create-page-from-pencil pencil/design.pen`

**Using a custom `.pen` file:**

```bash
/create-pencil-design pencil/my-project.pen
```

**Typical output on canvas:**

```
[Component/Navigation Header]  [Component/Mobile Nav Header]  [Component/Track List Item]  [Component/Mobile Track List Item]  [Component/Player Bar]  [Component/Mobile Player Bar]
[Music Library - 1024px]  [Music Library - 768px]  [Music Library - 375px]  [Favorites - 1024px]  [Favorites - 768px]  [Favorites - 375px]
```

## Important Notes

- **spec.md Required**: The skill requires `spec.md` to determine Page vs Component wireframe types. If `spec.md` is missing, the skill stops and asks the user to create it.
- **Automatic Discovery**: The skill automatically discovers all Page and Component wireframes from `spec.md` and all breakpoints from `docs/wireframes/`. No wireframe ID argument is needed.
- **Incremental Design**: The skill reads `pencil/coverage.md` (if it exists) to determine which wireframes have already been applied to the Pencil file. Only missing or new wireframes are processed — already-applied wireframes are skipped. After completion, the coverage manifest is updated. Run `/report-pencil-coverage` manually at any time to regenerate the manifest from the current `.pen` file state.
- **Components-First Workflow**: All Component wireframes are built as standalone reusable Pencil components BEFORE any Page designs are created. This ensures components exist and can be referenced by all Pages. Changes to a reusable component automatically propagate to all Page designs that use it.
- **Breakpoint-Specific Components**: When a Component wireframe has fundamentally different layouts at different breakpoints (e.g., desktop nav with links vs mobile nav with hamburger), create separate reusable components per breakpoint variant (e.g., "Component/Navigation Header" for desktop, "Component/Mobile Navigation Header" for mobile).
- **Component Independence**: Reusable components are standalone items on the canvas (inserted into `document`, not inside any page frame). Deleting a Page design does not affect the components, and components can be shared across all Pages.
- **Pen File Prerequisite**: The target `.pen` file must be created manually in the Pencil application before running this skill — the `.pen` format is proprietary and cannot be created by Claude or standard file tools
- **Pen File Path**: Defaults to `pencil/design.pen` if no argument is provided. Pass a custom path to target a different `.pen` file.
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

## Checklist

- [ ] `spec.md` read and all Page + Component wireframes identified
- [ ] All breakpoints discovered for both Page and Component wireframes
- [ ] Coverage manifest (`pencil/coverage.md`) checked for already-applied wireframes
- [ ] **Phase 1 — Components**:
  - [ ] All Component wireframes built as standalone reusable Pencil components
  - [ ] Breakpoint-specific component variants created (desktop + mobile where layouts differ)
  - [ ] Component IDs recorded for use in Page designs
- [ ] **Phase 2 — Pages** (for each Page x breakpoint):
  - [ ] Page container created with correct width matching breakpoint
  - [ ] All sections from wireframe present and in correct order
  - [ ] Component instances inserted where spec.md maps sections to Components
  - [ ] Component instance overrides applied correctly (using actual child node IDs)
  - [ ] Additional reusable components created for repeated patterns within the Page
  - [ ] Color scheme matches wireframe exactly (all hex values preserved)
  - [ ] Typography sizes and weights match wireframe
  - [ ] Grid column counts match (3-col desktop, 1-col mobile, etc.)
  - [ ] All text content matches wireframe labels
  - [ ] Icons correctly mapped from wireframe symbols to Lucide icons
  - [ ] Padding and spacing proportional to wireframe
  - [ ] Placeholder flag removed from page container
  - [ ] Full-page screenshot taken and verified
  - [ ] Individual section screenshots checked for detail accuracy
- [ ] **Post-processing**:
  - [ ] Coverage manifest (`pencil/coverage.md`) updated via `/report-pencil-coverage`
