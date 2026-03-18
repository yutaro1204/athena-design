---
name: generate-pencil-frames
description: Generates Pencil (.pen) design frames for all pages and components defined in spec.md
argument-hint: '[breakpoints] [pen-file-path]'
disable-model-invocation: true
---

# Create Pencil Design

You are a design engineer. Your task is to generate high-fidelity Pencil (.pen) design frames for all Pages and Components defined in `spec.md`, using the spec's layout descriptions, section lists, and component references to drive the design. Component designs are built first as standalone reusable Pencil components, then Page designs reference them via component instances.

## Instructions

1. **Parse the arguments**:
   - First argument: `breakpoints` (optional, array): List of viewport widths. Defaults to `[1024, 768, 375]`.
   - Second argument: `.pen` file path (optional, defaults to `pencil/design.pen`)
   - Examples:
     - _(no arguments)_: Default breakpoints [1024, 768, 375], default `pencil/design.pen`
     - `[1024]`: Desktop only, default pen file
     - `[1024, 375]`: Desktop + mobile, default pen file
     - `[1024, 768, 375] pencil/my-design.pen`: All breakpoints, custom pen file
   - If no breakpoints are provided, use `[1024, 768, 375]` as the default
   - If no `.pen` file path is provided, use `pencil/design.pen` as the default

2. **Read `spec.md` and classify entries**:
   - Read `spec.md` from the project root (sibling of `docs/`)
   - **If `spec.md` is not found**: warn the user that `spec.md` is missing and stop. The skill requires `spec.md` to determine Page vs Component types and to drive all design decisions.
   - Find the **Wireframe Map** table and classify each entry as `Page` or `Component`
   - Collect all **Page** IDs (e.g., 0001, 0002) — these are the pages that will be designed
   - Collect all **Component** IDs (e.g., 0003, 0004, 0005) — these will be built as standalone reusable Pencil components before any Page processing
   - For each Page, note which Component IDs it references (e.g., "Navigation Header: (Component 0003)") so the correct component instances can be inserted later
   - For each Page and Component, read their spec sections (Description, Sections, Layout, Key Components, Variants, Props/Data, Notes) — these drive all design decisions
   - If no Pages are found, inform the user and stop

3. **Determine breakpoints**:
   - Use the breakpoints from the argument (or default `[1024, 768, 375]`)
   - Sort breakpoints in descending order (largest first, e.g., 1024 → 768 → 375) so desktop is built first
   - These breakpoints apply to all Pages and Components — each will get a design variant per breakpoint

4. **Set up the Pencil directory and editor**:
   - Determine the target `.pen` file path from the argument (default: `pencil/design.pen`)
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
   - Call `get_style_guide_tags` then `get_style_guide` with relevant tags for visual design inspiration (colors, typography, spacing)

5. **Check coverage manifest for already-applied designs**:
   - Look for `pencil/coverage.md` (in the same directory as the `.pen` file)
   - **If the manifest exists**: Read it and extract the list of designs with `"status": "applied"`. These designs already have corresponding Pencil nodes and should be **skipped** in steps 6 and 7 below.
     - For applied Components: record their `nodeId` values so they can be referenced when building Page designs (no need to recreate them)
     - For applied Pages: skip them entirely — they already exist on the canvas
   - **If the manifest does not exist**: Proceed normally — all designs will be processed
   - **If a design is listed as `"applied"` in the manifest but you cannot find its `nodeId` in the Pencil file** (e.g., it was deleted): treat it as `"missing"` and rebuild it
   - Print a summary of what will be skipped vs built:
     ```
     Coverage manifest found. Skipping 8 already-applied designs.
     Will build: 0005/375 (Component/Mobile Player Bar), 0002/375 (Favorites - 375px)
     ```

6. **Build all Component designs as reusable Pencil components** (BEFORE any Page processing):
   - This is the **components-first phase**. All Components from `spec.md` are built as standalone reusable Pencil components before any Page designs are created.
   - **Skip components already covered**: If step 5 found applied components in the coverage manifest, skip those — use their existing `nodeId` values directly. Only build components that are missing or new.
   - For each Component ID (e.g., 0003, 0004, 0005), and for each breakpoint from step 3:
     a. **Check coverage**: If this component + breakpoint is already applied (from step 5), skip it and record the existing nodeId
     b. **Read the Component's spec section** from `spec.md` — extract Description, Variants, Props/Data, Layout, and Notes
     c. Analyze all variants described in the spec (e.g., Default, Playing, Hover states; Compact, Expanded, Idle variants)
     d. **Derive layout, structure, and content from the spec description** — use the Layout section for dimensions and arrangement, Props/Data for content fields, Variants for state differences
     e. **Use Pencil design guidelines and style guide** (from step 4) for visual decisions: colors, typography, spacing, border styles
     f. **Find empty space** on the canvas using `find_empty_space_on_canvas`
     g. **Create the reusable component** with `reusable: true` directly on the `document` (not inside any page frame):
        ```
        comp=I(document, {type: "frame", name: "Component/{Name}", reusable: true, layout: "horizontal", width: {width}, height: {height}, fill: "#ffffff", x: {empty_x}, y: {empty_y}})
        ```
     h. Build the component's internal structure with named child elements that have stable IDs for later override via `U(instance+"/childId", {...})`
   - **Breakpoint-specific components**: When a Component spec describes different layouts at different breakpoints (e.g., desktop navigation with full nav links vs mobile navigation with hamburger menu), create separate reusable components for each breakpoint variant:
     - Desktop: `"Component/Navigation Header"` (1024px wide, full nav links)
     - Mobile: `"Component/Mobile Navigation Header"` (375px wide, hamburger menu)
   - **Multiple variants**: If the spec describes multiple variants (e.g., Default, Playing, Hover), build the default/primary variant as the reusable component. Other variants can be noted for reference but the primary variant is what gets instantiated in Page designs.
   - **Record component IDs**: Keep a mapping of Component ID + breakpoint → Pencil node ID for use in step 9 when building Page designs. This includes both newly created components and pre-existing ones from the coverage manifest.

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

7. **Process each Page and its breakpoints sequentially**:
   - Iterate through all Pages in order (e.g., 0001, then 0002)
   - For each Page, iterate through all breakpoints (largest first)
   - **Skip pages already covered**: If step 5 found this Page + breakpoint already applied in the coverage manifest, skip it entirely
   - For each remaining Page + breakpoint combination, perform steps 8–15 below to create a design frame
   - Each breakpoint produces its own frame on the canvas (e.g., "Music Library - 1024px", "Music Library - 375px")
   - All reusable components were already created in step 6 (or loaded from coverage) and are shared across all Pages

8. **Analyze the Page's spec section for the current breakpoint**:
   - Read the Page's spec section from `spec.md` to extract all design information:
     - **Sections**: Read from the spec's `### Sections` list — these define the top-to-bottom structure of the page
     - **Layout**: Read from the spec's `### Layout` description — defines grid structures, column counts, spacing
     - **Key Components**: Read from the spec's `### Key Components` list — identifies which Component IDs are used in each section
     - **Notes**: Read any additional design notes or constraints
   - **Cross-references**: Resolve Component references from spec (already classified in step 2) so the correct component instances can be inserted
   - **Design decisions**: Use the Pencil design guidelines and style guide (from step 4) for colors, typography, spacing, and visual styling
   - **Breakpoint adaptation**: Apply responsive design rules based on the current breakpoint width (see step 12 for breakpoint-specific guidance)

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
      b. **Where `spec.md` maps a section to a Component** (e.g., "Navigation Header: (Component 0003)"), insert an instance of the corresponding reusable component built in step 6: `{type: "ref", ref: "{componentId}"}`. Use the component ID for the matching breakpoint (desktop component for desktop pages, mobile component for mobile pages). Override content as needed with `U(instance+"/childId", {content: "..."})`.
      c. Add content elements (text, frames, icons, buttons)
      d. For grids: create row frames with `layout: "horizontal"` containing instances or child frames
      e. For card grids or repeated items: insert component instances with `{type: "ref", ref: "{componentId}"}` and override content using `U(instance+"/childId", {content: "..."})`
    - **Also identify repeated patterns within the Page spec** (e.g., product cards, category boxes) that are NOT already Components. Create additional reusable components for these if they repeat 3+ times.
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
    - **Font**: Use `"Inter"` as the default font family
    - **Font sizes**: Choose appropriate sizes based on the design guidelines and style guide. Typical ranges:
      - Headings: 24–42px depending on hierarchy and breakpoint
      - Body text: 14–16px
      - Captions/metadata: 11–13px
    - **Font weights**: Use `fontWeight: "bold"` for headings and emphasis
    - **Text alignment**: Use `textAlign: "center"` for centered content
    - **Backgrounds**: Set `fill` on container frames for background colors
    - **Borders**: Use `stroke: {fill: "{color}", thickness: {n}}` for borders
    - **Colors**: Use colors from the style guide obtained in step 4. Maintain consistency across all pages and breakpoints.
    - **Icons**: Use Lucide icon names for common UI icons:
      - `iconFontName: "check"` for checkmarks
      - `iconFontName: "zap"` for lightning/flash
      - `iconFontName: "infinity"` for infinity
      - `iconFontName: "star"` for stars/ratings
      - `iconFontName: "heart"` for favorites
      - `iconFontName: "search"` for search
      - `iconFontName: "menu"` for hamburger menu
    - **Icon circles**: Use a frame with `layout: "none"` containing an `ellipse` and an `icon_font` overlaid with explicit x/y positioning

12. **Handle breakpoint-specific adaptations**:

    **Desktop (>= 1024px):**
    - Full-width header with logo and all nav links
    - Multi-column grids (3-4 columns)
    - Larger typography (32-42px headings)
    - Wider padding (40px horizontal)
    - Side-by-side feature columns
    - Full footer with 4 columns

    **Tablet (768-1023px):**
    - Reduced column grids (2 columns)
    - Medium typography (28-36px headings)
    - Medium padding (24-32px horizontal)
    - May simplify navigation

    **Mobile (< 768px):**
    - Compact header with fewer nav links, smaller logo and font sizes
    - Single-column stacked layouts
    - Smaller typography (24-28px headings, 12-16px body)
    - Narrower padding (16px horizontal)
    - Vertically stacked features (may show fewer items)
    - May omit sections not essential for mobile (e.g., large footers)

13. **Remove placeholder and verify**:
    - Set `placeholder: false` on the page container:
      ```
      U("{pageId}", {placeholder: false})
      ```
    - Use `get_screenshot` on the page container to verify the full design
    - Use `get_screenshot` on individual sections to verify details
    - Compare against the spec:
      - All sections present and in correct order
      - Colors consistent with the design system
      - Typography sizes and weights appropriate for hierarchy
      - Grid column counts match spec layout description
      - Spacing and padding are proportional
      - All text content matches spec descriptions
      - Component instances correctly placed where spec references them

14. **Fix any issues**:
    - If screenshots reveal misalignment, overlapping, or missing content, use `batch_design` to correct
    - Common fixes:
      - Move icon containers to position 0 in parent: `M("{iconContainerId}", "{parentId}", 0)`
      - Adjust frame heights: `U("{frameId}", {height: "fit_content"})`
      - Fix text visibility: ensure `fill` is set on all text nodes
      - Restructure icon-in-circle: replace separate ellipse + icon with a `layout: "none"` container frame holding both

15. **Generate coverage manifest inline** (after all Components and Pages are processed):
    - This records all Components and Pages now present in the `.pen` file, so that the next run of `/generate-pencil-frames` can skip them
    - If the manifest already existed, the new manifest replaces it with the current state

    **Procedure**:
    a. Use `batch_get` with a broad pattern (e.g., `*`) to retrieve all top-level nodes on the canvas
    b. For each top-level node, classify it:
       - **Reusable components** (`reusable: true`): correspond to Component wireframes
       - **Page frames** (non-reusable top-level frames): correspond to Page wireframe × breakpoint designs
    c. **Match components to wireframes** using naming conventions:
       - Desktop breakpoints (>= 768): match `"Component/{Name}"`
       - Mobile breakpoints (< 768): match `"Component/Mobile {Name}"`
       - If a single component covers all breakpoints (same layout), map it to all breakpoints without a "Mobile" prefix
       - Match is case-insensitive on the component name portion
    d. **Match page frames to wireframes** using naming conventions:
       - Extract page name and breakpoint from `"{Page Name} - {breakpoint}px"` pattern
       - Match page name against `spec.md` wireframe names (case-insensitive)
    e. **Cross-reference** against spec.md wireframe map: classify each wireframe × breakpoint as `applied` (matching node exists) or `missing` (no match)
    f. **Flag unmatched nodes** as supplementary (Pencil nodes that don't correspond to any spec.md wireframe)
    g. **Write `pencil/coverage.md`** in the standard manifest format:

       ```markdown
       # Pencil Coverage Report

       - **Pen file**: {pen-file-path}
       - **Spec file**: spec.md
       - **Generated at**: {ISO timestamp}

       ## Summary

       | Metric | Count |
       |---|---|
       | Total expected | {N} |
       | Applied | {N} |
       | Missing | {N} |
       | Components applied | {N} |
       | Components missing | {N} |
       | Pages applied | {N} |
       | Pages missing | {N} |

       ## Components

       | ID | Name | Breakpoint | Status | Node ID | Node Name |
       |---|---|---|---|---|---|
       | {id} | {name} | {breakpoint} | applied/missing | {nodeId} | {nodeName} |

       ## Pages

       | ID | Name | Breakpoint | Status | Node ID | Node Name |
       |---|---|---|---|---|---|
       | {id} | {name} | {breakpoint} | applied/missing | {nodeId} | {nodeName} |

       ## Supplementary Components

       | Node ID | Node Name | Width | Notes |
       |---|---|---|---|
       | {nodeId} | {nodeName} | {width} | {description} |
       ```

    h. **Print a human-readable coverage summary** listing applied/missing counts per wireframe

16. **Output**:
    - Confirm all reusable components and design frames have been created (noting which were newly built vs skipped from coverage)
    - List all reusable components from Component specs, with their node IDs and breakpoint variants
    - List each Page processed with its breakpoints, page container node IDs, and frame dimensions
    - List all sections built per Page per breakpoint
    - Note which component instances are used in each Page
    - Summarize the color scheme and design system used
    - Confirm that `pencil/coverage.md` has been updated
    - Suggest running `get_screenshot` on specific sections for detailed review

## Icon-in-Circle Pattern

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
  - **Phase 1 — Components**: One or more calls per Component (one call per component variant/breakpoint)
  - **Phase 2 — Pages**: Page container creation, then one call per major section (inserting Component instances where spec.md maps them)
  - **Final call per Page**: Remove placeholder
  - **Post-processing**: Generate/update `pencil/coverage.md` inline

## Usage Examples

```bash
# Default breakpoints [1024, 768, 375], default pencil/design.pen
/generate-pencil-frames

# Desktop only
/generate-pencil-frames [1024]

# Desktop + mobile, custom pen file
/generate-pencil-frames [1024, 375] pencil/my-project.pen

# All breakpoints, custom pen file
/generate-pencil-frames [1024, 768, 375] pencil/my-project.pen
```

## Workflow Example

1. `spec.md` defines Pages (0001: Music Library, 0002: Favorites) and Components (0003: Navigation Header, 0004: Track List Item, 0005: Player Bar) with full layout descriptions, section lists, and component references
2. **[MANUAL] Create the `.pen` file** in the Pencil application and save as `pencil/design.pen`
3. **Run `/generate-pencil-frames`** — the skill automatically:
   - Checks `pencil/coverage.md` for already-applied designs (skips them if found)
   - Reads `spec.md` to find Pages (0001, 0002) and Components (0003, 0004, 0005)
   - Uses design guidelines and style guide for visual decisions (colors, typography, spacing)
   - **Phase 1 — Components**: Builds ALL Components as standalone reusable Pencil components for each breakpoint, deriving layout and structure from the spec's descriptions
   - **Phase 2 — Pages**: Generates design frames for all Pages × all breakpoints, inserting component instances with content overrides, building sections from the spec's section lists
   - **Phase 3 — Coverage**: Updates `pencil/coverage.md` with the current state
4. All components and page frames appear on the Pencil canvas for review and refinement
5. Later, if new entries are added to `spec.md` (e.g., 0006), run `/generate-pencil-frames` again — it reads the manifest and only builds the new designs
6. Use as high-fidelity reference for implementation with `/generate-pages-from-pencil pencil/design.pen`

**Using a custom `.pen` file:**

```bash
/generate-pencil-frames [1024, 375] pencil/my-project.pen
```

**Typical output on canvas:**

```
[Component/Navigation Header]  [Component/Mobile Nav Header]  [Component/Track List Item]  [Component/Mobile Track List Item]  [Component/Player Bar]  [Component/Mobile Player Bar]
[Music Library - 1024px]  [Music Library - 768px]  [Music Library - 375px]  [Favorites - 1024px]  [Favorites - 768px]  [Favorites - 375px]
```

## Important Notes

- **spec.md Required**: The skill requires `spec.md` to determine Page vs Component types and to drive all design decisions (layout, sections, components, content). If `spec.md` is missing, the skill stops and asks the user to create it.
- **Breakpoints from Argument**: Breakpoints are specified via the first argument (default `[1024, 768, 375]`). All Pages and Components get design variants for each breakpoint.
- **Incremental Design**: The skill reads `pencil/coverage.md` (if it exists) to determine which designs have already been applied to the Pencil file. Only missing or new designs are processed — already-applied designs are skipped. After completion, the coverage manifest is updated.
- **Components-First Workflow**: All Components are built as standalone reusable Pencil components BEFORE any Page designs are created. This ensures components exist and can be referenced by all Pages. Changes to a reusable component automatically propagate to all Page designs that use it.
- **Breakpoint-Specific Components**: When a Component spec describes fundamentally different layouts at different breakpoints (e.g., desktop nav with links vs mobile nav with hamburger), create separate reusable components per breakpoint variant (e.g., "Component/Navigation Header" for desktop, "Component/Mobile Navigation Header" for mobile).
- **Component Independence**: Reusable components are standalone items on the canvas (inserted into `document`, not inside any page frame). Deleting a Page design does not affect the components, and components can be shared across all Pages.
- **Design System from Guidelines**: Colors, typography, and spacing are derived from the Pencil design guidelines (`get_guidelines`) and style guide (`get_style_guide`), ensuring a consistent and polished visual design across all pages and breakpoints.
- **Pen File Prerequisite**: The target `.pen` file must be created manually in the Pencil application before running this skill — the `.pen` format is proprietary and cannot be created by Claude or standard file tools
- **Pen File Path**: Defaults to `pencil/design.pen` if no argument is provided. Pass a custom path to target a different `.pen` file.
- **Pencil MCP Tools**: This skill uses the Pencil MCP server tools exclusively for .pen file operations — never use `Read` or `Grep` on .pen files
- **Placeholder Workflow**: Always set `placeholder: true` on the page frame before building, remove it only when fully complete
- **Text Visibility**: Text nodes MUST have a `fill` property set or they will be invisible
- **Font Family**: Use `"Inter"` as the default font family
- **Flexbox First**: Always prefer flexbox layout over absolute positioning; use `layout: "none"` only for overlay patterns (e.g., icon-in-circle)
- **fit_content vs fill_container**: Use `fill_container` for children that should stretch to parent width; use `fit_content` for parents that should shrink to children
- **Content from Spec**: Use text content and labels described in `spec.md` — do not invent content not present in the spec
- **Section Completeness**: Build all sections listed in the spec's Sections list. For smaller breakpoints, adapt layout (e.g., single-column) but include all sections unless the spec explicitly notes mobile omissions.
- **Visual Verification**: Always take screenshots after completing the design and after fixing issues
- **Component Reuse**: Create reusable components for any element that repeats 3+ times (cards, list items, category boxes)
- **Canvas Placement**: Always use `find_empty_space_on_canvas` before creating frames to avoid overlapping existing content

## Checklist

- [ ] `spec.md` read and all Pages + Components identified with their spec sections
- [ ] Breakpoints determined from argument (default [1024, 768, 375])
- [ ] Design guidelines and style guide obtained from Pencil MCP
- [ ] Coverage manifest (`pencil/coverage.md`) checked for already-applied designs
- [ ] **Phase 1 — Components**:
  - [ ] All Components built as standalone reusable Pencil components
  - [ ] Component layout and structure derived from spec descriptions
  - [ ] Breakpoint-specific component variants created (desktop + mobile where layouts differ)
  - [ ] Component IDs recorded for use in Page designs
- [ ] **Phase 2 — Pages** (for each Page × breakpoint):
  - [ ] Page's spec section analyzed (Sections, Layout, Key Components, Notes)
  - [ ] Page container created with correct width matching breakpoint
  - [ ] All sections from spec present and in correct order
  - [ ] Component instances inserted where spec maps sections to Components
  - [ ] Component instance overrides applied correctly (using actual child node IDs)
  - [ ] Additional reusable components created for repeated patterns
  - [ ] Color scheme consistent with design system (from guidelines/style guide)
  - [ ] Typography sizes and weights appropriate for hierarchy
  - [ ] Grid column counts match spec layout description
  - [ ] All text content matches spec descriptions
  - [ ] Icons correctly mapped to Lucide icon names
  - [ ] Padding and spacing proportional and consistent
  - [ ] Placeholder flag removed from page container
  - [ ] Full-page screenshot taken and verified
  - [ ] Individual section screenshots checked for detail accuracy
- [ ] **Post-processing**:
  - [ ] Coverage manifest (`pencil/coverage.md`) generated inline
