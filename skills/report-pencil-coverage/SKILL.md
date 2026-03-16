---
name: report-pencil-coverage
description: Reports which wireframes are applied to the Pencil (.pen) file and writes a coverage manifest (pencil/coverage.md)
argument-hint: '[pen-file-path]'
disable-model-invocation: true
---

# Report Pencil Coverage

You are a design engineer. Your task is to inspect the current Pencil (.pen) file, cross-reference it with `spec.md` and `docs/wireframes/`, and produce a coverage manifest (`pencil/coverage.md`) that records exactly which wireframes have been applied. This manifest prevents duplicates when `create-pencil-design` is run incrementally.

## Instructions

1. **Parse the arguments**:
   - First argument: `.pen` file path (optional, defaults to `pencil/design.pen`)
   - If no `.pen` file path is provided, use `pencil/design.pen` as the default

2. **Read `spec.md` and discover all wireframes**:
   - Read `spec.md` from the project root (sibling of `docs/`)
   - **If `spec.md` is not found**: warn the user that `spec.md` is missing and stop
   - Find the **Wireframe Map** table and classify each wireframe ID as `Page` or `Component`
   - Collect all Page wireframe IDs and Component wireframe IDs

3. **Discover all breakpoints**:
   - For each wireframe ID (both Page and Component), list all numeric subdirectories under `docs/wireframes/{NNNN}/`
   - This gives the full set of expected wireframe + breakpoint combinations
   - Record the wireframe SVG filename for each combination (from `docs/wireframes/{NNNN}/{breakpoint}/*-wireframe.svg`)

4. **Open and inspect the Pencil file**:
   - Open the target `.pen` file using `open_document("{pen-file-path}")`
   - Call `get_editor_state` to confirm the file is active
   - Use `batch_get` with a broad pattern (e.g., `*`) to retrieve all top-level nodes on the canvas
   - For each top-level node, inspect its properties:
     - **Reusable components**: Nodes with `reusable: true` — these correspond to Component wireframes
     - **Page frames**: Non-reusable top-level frames — these correspond to Page wireframe × breakpoint designs

5. **Match Pencil nodes to wireframes**:
   - **For Component wireframes**: Match reusable component nodes by name pattern. Components follow the naming convention `"Component/{Name}"` or `"Component/Mobile {Name}"`. Map each to the corresponding wireframe ID and breakpoint:
     - A component named `"Component/Navigation Header"` with width >= 768 → wireframe 0003, desktop breakpoint
     - A component named `"Component/Mobile Navigation Header"` with width < 768 → wireframe 0003, mobile breakpoint
     - Use both the component name and its width to determine the breakpoint match
   - **For Page wireframes**: Match page frame nodes by name pattern. Pages follow the naming convention `"{Page Name} - {breakpoint}px"`. Extract the page name and breakpoint from the frame name and map to the corresponding wireframe ID.
   - Record the Pencil node ID for each matched wireframe + breakpoint

6. **Determine coverage**:
   - Compare the full set of expected wireframe + breakpoint combinations (from step 3) against the matched Pencil nodes (from step 5)
   - Classify each combination as:
     - `applied` — a matching Pencil node exists
     - `missing` — no matching Pencil node found
   - Also flag any Pencil nodes that don't match any known wireframe as `unmatched`

7. **Write the coverage manifest**:
   - Write the manifest to `pencil/coverage.md` (sibling of the `.pen` file)
   - Use the markdown format specified below
   - Create the parent directory if it does not exist

8. **Output a human-readable summary**:
   - Print a summary table showing coverage status
   - List all applied wireframes with their Pencil node IDs
   - List all missing wireframes that still need to be designed
   - If everything is covered, confirm that the Pencil file is fully up to date

## Coverage Manifest Format (`pencil/coverage.md`)

The manifest uses a structured markdown format with tables that are both human-readable and easily parseable by `create-pencil-design`.

See `examples/coverage.md` for a complete example of the generated manifest.

### Table Column Descriptions

| Column | Description |
|---|---|
| ID | Wireframe ID from `spec.md` (e.g., 0003) |
| Name | Wireframe name from `spec.md` (e.g., Navigation Header) |
| Breakpoint | Breakpoint width in pixels (e.g., 1024, 768, 375) |
| Status | `applied` if a matching Pencil node exists, `missing` if not |
| Node ID | Pencil node ID of the matching component or page frame (empty when `missing`) |
| Node Name | Name of the Pencil node (empty when `missing`) |
| Wireframe SVG | Path to the source wireframe SVG file |

### How `create-pencil-design` reads this manifest

When `create-pencil-design` reads `pencil/coverage.md`, it:
1. Parses the **Components** table to find rows with status `applied` — records their Node ID for reuse as component references
2. Parses the **Pages** table to find rows with status `applied` — skips those Page + breakpoint combinations
3. Rows with status `missing` (or absent from the table) are treated as work to be done
4. If a Node ID from an `applied` row cannot be found in the `.pen` file, treats it as `missing` and rebuilds it

## Matching Heuristics

### Component Name Matching

Component wireframe names from `spec.md` are matched to Pencil reusable component node names:

| spec.md Name | Desktop Component Name | Mobile Component Name |
|---|---|---|
| Navigation Header | `Component/Navigation Header` | `Component/Mobile Navigation Header` |
| Track List Item | `Component/Track List Item` | `Component/Mobile Track List Item` |
| Player Bar | `Component/Player Bar` | `Component/Mobile Player Bar` |

**Rules**:
- Desktop breakpoints (>= 768): Match `"Component/{Name}"`
- Mobile breakpoints (< 768): Match `"Component/Mobile {Name}"`
- If a single component covers all breakpoints (same layout), it maps to all breakpoints without a "Mobile" prefix
- Match is case-insensitive on the component name portion

### Page Frame Name Matching

Page wireframe names from `spec.md` are matched to Pencil frame node names:

| spec.md Name | Pencil Frame Name Pattern |
|---|---|
| Music Library | `Music Library - {breakpoint}px` |
| Favorites | `Favorites - {breakpoint}px` |

**Rules**:
- Extract page name and breakpoint from the frame name pattern `"{Page Name} - {breakpoint}px"`
- Match page name against `spec.md` wireframe names (case-insensitive)
- Match breakpoint against discovered breakpoint directories

## Usage Examples

```bash
# Report coverage for the default pencil/design.pen
/report-pencil-coverage

# Report coverage for a specific .pen file
/report-pencil-coverage pencil/my-project.pen
```

## Example Output

```
Pencil Coverage Report for pencil/design.pen
=============================================

Components (9/9 applied):
  0003 Navigation Header
    1024px  applied  [Iqov0] Component/Navigation Header
     768px  applied  [Iqov0] Component/Navigation Header (reused)
     375px  applied  [GgnS1] Component/Mobile Navigation Header
  0004 Track List Item
    1024px  applied  [IS2me] Component/Track List Item
     768px  applied  [IS2me] Component/Track List Item (reused)
     375px  applied  [m5uxx] Component/Mobile Track List Item
  0005 Player Bar
    1024px  applied  [ZIAiZ] Component/Player Bar
     768px  applied  [ZIAiZ] Component/Player Bar (reused)
     375px  applied  [rwDd3] Component/Mobile Player Bar

Pages (6/6 applied):
  0001 Music Library
    1024px  applied  [La0qg] Music Library - 1024px
     768px  applied  [Owurf] Music Library - 768px
     375px  applied  [dNtjH] Music Library - 375px
  0002 Favorites
    1024px  applied  [iho70] Favorites - 1024px
     768px  applied  [8ULm0] Favorites - 768px
     375px  applied  [MabR0] Favorites - 375px

Supplementary:
  [eEGmY] Component/Mobile Search Bar (375px) — supports 0003 mobile variant

Summary: 15/15 wireframes applied, 0 missing.
The Pencil file is fully up to date with all wireframes from spec.md.

Coverage manifest written to pencil/coverage.md
```

## Important Notes

- **Non-destructive**: This skill only reads the Pencil file and writes a markdown manifest. It does not modify the `.pen` file.
- **spec.md Required**: The skill requires `spec.md` to know the full set of expected wireframes.
- **Pencil MCP Tools**: Uses Pencil MCP tools (`open_document`, `get_editor_state`, `batch_get`) for reading `.pen` files — never use `Read` or `Grep` on `.pen` files.
- **Manifest Location**: The manifest is written to `pencil/coverage.md` by default (same directory as the `.pen` file).
- **Incremental Workflow**: Run this skill after `create-pencil-design` to record what was built. Then when new wireframes are added, run `create-pencil-design` again — it will read the manifest and skip already-applied wireframes.
- **Re-running**: Running this skill again overwrites the previous manifest with fresh data from the current `.pen` file state.
