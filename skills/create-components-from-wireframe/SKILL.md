---
name: create-components-from-wireframe
description: Extracts reusable component SVGs from a complete wireframe design
argument-hint: "[wireframe-id]"
disable-model-invocation: true
---

# Create Components from Wireframe

You are a frontend designer. Your task is to analyze a wireframe SVG and extract reusable components into separate SVG files organized by category.

## Instructions

1. **Parse the argument**:
   - Argument: wireframe ID (4-digit number like "0001", required)
   - Example: `0001`
   - If no wireframe ID is provided, ask the user for it

2. **Find the wireframe file**:
   - Search for the wireframe file in `docs/wireframes/{NNNN}/` with the pattern `*-wireframe.svg`
   - Example: For ID "0001", look for `docs/wireframes/0001/*-wireframe.svg`
   - If not found, inform the user that the wireframe doesn't exist

3. **Read and analyze the wireframe**:
   - Read the complete wireframe SVG file
   - Identify all major sections by looking for:
     - Section labels (text with italic style, e.g., "HEADER / NAV", "HERO SECTION", "FEATURES SECTION")
     - Visual boundaries (rect elements with section backgrounds)
     - Coordinate ranges (y-axis positioning)
   - Extract the viewBox dimensions to understand the full wireframe size

4. **Identify component categories**:

   Categorize sections into these types:

   **Headers** (top navigation areas):
   - Logo and navigation bars
   - Search bars with navigation
   - Typically at y=0, height ~60-100px

   **Heroes** (large banner sections):
   - Large introductory sections with headlines and CTAs
   - Split layouts with content + image
   - Full-width banners
   - Typically height 400-600px

   **Sections** (main content areas):
   - Feature grids (2-col, 3-col, 4-col)
   - Product/service cards
   - Timeline/schedule cards
   - Testimonial grids
   - Info columns with forms
   - Gallery layouts
   - Typically height 300-600px

   **Footers** (bottom sections):
   - Simple copyright bars
   - Multi-column footer with links
   - Typically height 60-120px

5. **Extract components**:

   For each identified section:

   a. **Determine coordinates**:
      - Find the y-start and y-end of the section
      - Use section labels and visual boundaries as guides
      - Include all elements within that vertical range

   b. **Calculate new viewBox**:
      - Keep original width (usually 1200)
      - Calculate height: `y-end - y-start`
      - New viewBox: `0 0 {width} {height}`

   c. **Extract SVG elements**:
      - Copy all SVG elements within the coordinate range
      - Adjust y-coordinates by subtracting the section's y-start
      - Keep x-coordinates as-is
      - Preserve all styling (fill, stroke, font properties)

   d. **Generalize content**:
      - Replace specific text with placeholder text:
        - Brand names → "LOGO", "Company Name"
        - Product names → "Product Name 1", "Feature Title 1"
        - Prices → "$XX.XX"
        - Dates → "Date / Time"
      - Keep layout and structure intact
      - Preserve design system colors

   e. **Add component label**:
      - Add a label in bottom-left corner: `<text x="20" y="25" font-family="Arial, sans-serif" font-size="11" fill="#666" font-style="italic">{COMPONENT TYPE}</text>`

6. **Name components descriptively**:

   Use this naming pattern: `{category}/{layout-description}.svg`

   **Examples**:
   - `headers/header-logo-nav.svg` - Logo on left, nav links on right
   - `headers/header-logo-search-nav.svg` - Logo, search bar, nav links
   - `heroes/hero-split-cta.svg` - Split layout with CTA buttons
   - `heroes/hero-centered-search.svg` - Centered headline with search
   - `sections/feature-grid-3col.svg` - 3-column feature cards
   - `sections/product-cards-4col.svg` - 4-column product cards
   - `sections/timeline-cards-3col.svg` - 3-column timeline/schedule
   - `sections/testimonial-grid-2col.svg` - 2-column testimonials
   - `sections/info-grid-4col-newsletter.svg` - 4 columns with form
   - `footers/footer-copyright-links.svg` - Simple copyright + links
   - `footers/footer-4col-links.svg` - 4-column footer with links

7. **Create directory structure**:

   Create components under the wireframe directory:
   ```
   docs/wireframes/{NNNN}/components/
     ├── headers/
     ├── heroes/
     ├── sections/
     └── footers/
   ```

8. **Generate component documentation**:

   Create `docs/wireframes/{NNNN}/components/README.md` with:

   **Section 1: Design System**
   - Extract and document the color palette used
   - Document typography (font families, sizes, weights)
   - Include this from the original wireframe

   **Section 2: Component Categories**
   - Headers section with all header components
   - Heroes section with all hero components
   - Sections section with all section components
   - Footers section with all footer components

   For each component, document:
   - Component name and file path
   - Size (width × height)
   - Layout description
   - Key features (bullet list)
   - Use cases (where to use this component)
   - Customization points (what to change)

   **Section 3: Usage Guidelines**
   - How to view components
   - How to customize components
   - How to combine components to create pages
   - How to create new components
   - How to integrate with skills

   **Section 4: Component Matrix**
   - Table with: Category, Component, Width, Height, Use Case

   **Section 5: Layout Examples**
   - Show 2-3 example page layouts using different component combinations
   - Include total heights

   **Section 6: Responsive Considerations**
   - Guidelines for adapting components to mobile
   - Reference to `/create-responsive-design` skill

   **Section 7: Maintenance**
   - Guidelines for updating components
   - Versioning information

9. **Output**:
   - Confirm the number of components created
   - List each component by category:
     - Headers: X components
     - Heroes: X components
     - Sections: X components
     - Footers: X components
   - Mention the README.md was created
   - Provide the directory path: `docs/wireframes/{NNNN}/components/`
   - Suggest viewing the README for full documentation
   - Mention that these components can be reused in future wireframes

## Section Identification Guidelines

### How to Identify Sections

Look for these indicators in the SVG:

1. **Section labels** (most reliable):
   ```svg
   <text ... font-style="italic" fill="#666">HEADER / NAV</text>
   <text ... font-style="italic" fill="#666">HERO SECTION</text>
   <text ... font-style="italic" fill="#666">FEATURES SECTION</text>
   ```

2. **Background rectangles** that span full width:
   ```svg
   <rect x="0" y="{start}" width="1200" height="{height}" fill="{bg-color}" />
   ```

3. **Visual breaks** - significant gaps in y-coordinates between element groups

4. **Coordinate ranges**:
   - Group elements by y-coordinate proximity
   - Elements within ~50px y-range likely belong together
   - Large y-gaps (>100px) indicate section boundaries

### Typical Section Patterns

**Header Section**:
- y-start: 0
- Height: 60-100px
- Contains: logo, navigation links, possibly search
- Full-width background rect

**Hero Section**:
- Follows header
- Height: 400-600px
- Contains: large heading, description, CTA buttons, hero image
- Often has distinct background color

**Feature/Content Sections**:
- Multiple sections possible
- Height: 300-600px each
- Contains: section title, cards/grid items
- May alternate background colors

**Footer Section**:
- At bottom (largest y-value)
- Height: 60-120px
- Contains: copyright, links, sometimes multi-column

## Component Extraction Example

### Original Wireframe Section
```svg
<!-- Hero Section at y=100 to y=600 -->
<rect x="0" y="100" width="1200" height="500" fill="#0f3460"/>
<text x="120" y="230" font-size="42" fill="#e0e0e0">Epic Card Battles</text>
<text x="120" y="270" font-size="42" fill="#e0e0e0">Await</text>
<rect x="120" y="390" width="180" height="50" fill="#e94560"/>
<text x="210" y="422">Start Playing</text>
```

### Extracted Component SVG
```svg
<svg viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="500" fill="#0f3460"/>

  <!-- Heading (y-coordinates adjusted: 230-100=130) -->
  <text x="120" y="130" font-size="42" fill="#e0e0e0">Main Headline</text>
  <text x="120" y="170" font-size="42" fill="#e0e0e0">Goes Here</text>

  <!-- Button (y-coordinates adjusted: 390-100=290) -->
  <rect x="120" y="290" width="180" height="50" fill="#e94560"/>
  <text x="210" y="322">Primary CTA</text>

  <!-- Component label -->
  <text x="20" y="25" font-size="11" fill="#666" font-style="italic">HERO SECTION</text>
</svg>
```

## Handling Edge Cases

### Overlapping Sections
- If sections visually overlap, use section labels as authoritative boundaries
- Prefer clean separation over exact element capture

### Decorative Elements
- Include decorative elements (lines, shapes) if they define the component's visual style
- Exclude global decorative elements that span multiple sections

### Responsive Variations
- Extract from the base wireframe (not responsive versions)
- The responsive wireframes can be created separately with `/create-responsive-design`

### Missing Section Labels
- If no section labels exist, infer sections from:
  - Visual hierarchy (size, position)
  - Background color changes
  - Coordinate clustering
  - Content type (navigation vs content vs footer)

## Color Extraction

Extract the color palette from the wireframe by finding unique fill and stroke values:

```javascript
// Common colors to look for:
- Background colors (fill on large rect elements)
- Accent colors (fill on buttons, underlines)
- Border colors (stroke values)
- Text colors (fill on text elements)
```

Document as:
```markdown
### Color Palette
- **Background**: `#1a1a2e` (dark navy)
- **Accent**: `#e94560` (bright red)
- **Text Primary**: `#e0e0e0` (light gray)
...
```

## Typography Extraction

Find font properties used throughout:

```markdown
### Typography
- **Headings**: Arial, sans-serif, bold, 24px-42px
- **Body**: Arial, sans-serif, regular, 13px-18px
- **Labels**: Arial, sans-serif, italic, 11px-12px
```

## Quality Checklist

Before completing, verify:

- [ ] All major sections identified and extracted
- [ ] Y-coordinates properly adjusted in components
- [ ] ViewBox dimensions correct for each component
- [ ] Component names are descriptive and follow naming convention
- [ ] Content generalized (no specific product/brand names)
- [ ] Component labels added to each SVG
- [ ] Directory structure created correctly
- [ ] README.md is comprehensive and well-organized
- [ ] Design system documented (colors, typography)
- [ ] All components render correctly (valid SVG)

## Usage Examples

```bash
# Extract components from wireframe 0001
/create-components-from-wireframe 0001

# Extract components from wireframe 0002
/create-components-from-wireframe 0002
```

## Workflow Integration

This skill fits into the wireframe workflow:

```bash
# 1. Create initial wireframe
/create-page-wireframe "TCG landing page"
# → Creates: docs/wireframes/0001/tcg-landing-page-wireframe.svg

# 2. Extract reusable components
/create-components-from-wireframe 0001
# → Creates: docs/wireframes/0001/components/{headers,heroes,sections,footers}/*.svg

# 3. Use components in future wireframes
# Components can be referenced and reused for consistency
```

## Important Notes

- **Non-destructive**: This skill only reads the original wireframe, doesn't modify it
- **Reusability focus**: Extracted components are generalized for reuse across multiple pages
- **Design consistency**: Components maintain the original design system
- **Documentation**: Comprehensive README ensures components are easy to understand and use
- **Flexibility**: Components can be customized for specific use cases
- **Integration**: Works seamlessly with other wireframe skills

## Benefits

1. **Consistency**: Reuse the same component designs across multiple pages
2. **Efficiency**: Don't recreate common patterns from scratch
3. **Maintainability**: Update a component once, potentially affect multiple pages
4. **Documentation**: Clear catalog of available UI patterns
5. **Design System**: Build a library of components that define your visual language
6. **Rapid Prototyping**: Quickly compose new pages from existing components

## Limitations

- Best suited for wireframes with clear section boundaries
- Requires manual adjustment if sections have complex overlapping elements
- Component extraction is based on visual analysis, may need refinement
- Works best with consistent design systems

---

**Example Output**:

```
I've successfully extracted 7 reusable components from wireframe 0001:

Headers (1):
- header-logo-nav.svg (1200×80px)

Heroes (1):
- hero-split-cta.svg (1200×500px)

Sections (4):
- feature-grid-3col.svg (1200×480px)
- product-cards-3col.svg (1200×420px)
- timeline-cards-3col.svg (1200×380px)
- info-grid-4col-newsletter.svg (1200×240px)

Footers (1):
- footer-copyright-links.svg (1200×80px)

All components have been saved to: docs/wireframes/0001/components/

A comprehensive README.md has been created with:
- Design system documentation (colors, typography)
- Detailed component specifications
- Usage guidelines
- Layout examples
- Responsive considerations

You can view the component library at: docs/wireframes/0001/components/README.md

These components can now be reused when creating future wireframes for design consistency.
```
