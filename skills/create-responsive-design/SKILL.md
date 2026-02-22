---
name: create-responsive-design
description: Creates an SVG wireframe showing mobile and desktop responsive design views
argument-hint: "[wireframe-id] [breakpoint]"
disable-model-invocation: true
---

# Create Responsive Design

You are a UX/UI designer. Your task is to create an SVG wireframe that visualizes responsive design by showing both mobile and desktop views side-by-side based on an existing wireframe.

## Instructions

1. **Parse the arguments**:
   - First argument: wireframe ID (4-digit number like "0001", required)
   - Second argument: breakpoint in pixels (optional, defaults to "768")
   - Examples:
     - `0001`: Uses wireframe 0001 with 768px breakpoint
     - `0001 768`: Uses wireframe 0001 with 768px breakpoint
     - `0001 1024`: Uses wireframe 0001 with 1024px breakpoint
     - `0002 640`: Uses wireframe 0002 with 640px breakpoint
   - If no wireframe ID is provided, ask the user for it

2. **Find the existing wireframe**:
   - Search for wireframe file: `docs/wireframes/{NNNN}/*-wireframe.svg`
   - Example: For ID "0001", find `docs/wireframes/0001/*-wireframe.svg`
   - If not found, inform the user and stop
   - If found, read the SVG file to understand the design
   - Extract the page name from the filename for later use

3. **Analyze the existing wireframe**:
   - Extract the viewBox dimensions (e.g., "0 0 1200 2400")
   - Identify all sections:
     - Header/Navigation
     - Hero section
     - Features section
     - Content sections
     - Product/card grids
     - Footer
   - Note all text labels, layout structure, colors, and spacing
   - Understand the visual hierarchy and component placement

4. **Determine the breakpoint**:
   - Parse the breakpoint value (default: 768px)
   - This breakpoint divides mobile and desktop views:
     - Mobile: screens < breakpoint (e.g., < 768px)
     - Desktop: screens ≥ breakpoint (e.g., ≥ 768px)

5. **Design the responsive wireframe layout**:

   **SVG Structure:**
   - Create a side-by-side layout showing both views
   - Left side: Mobile view (narrower, typically 375px wide)
   - Right side: Desktop view (wider, typically 1200px wide)
   - Total SVG width: mobile width + desktop width + spacing (e.g., 375 + 100 + 1200 = 1675px)
   - Add labels above each view: "Mobile View (< {breakpoint}px)" and "Desktop View (≥ {breakpoint}px)"

   **Mobile View Adaptations (left side):**
   - Width: ~375px (typical mobile width)
   - Reduce padding: 16px instead of 48-96px
   - Stack sections vertically (flex-col)
   - Single column grids
   - Smaller typography:
     - Headings: 60-70% of desktop size
     - Body text: 80-90% of desktop size
   - Compact navigation (smaller gaps)
   - Full-width buttons stacked vertically
   - Reduced image heights
   - Hide decorative elements if space is limited

   **Desktop View (right side):**
   - Width: Original wireframe width (e.g., 1200px)
   - Original padding and spacing
   - Horizontal layouts (flex-row)
   - Multi-column grids
   - Original typography sizes
   - Original navigation layout
   - Buttons side-by-side
   - Original image heights
   - All decorative elements visible

6. **Create the responsive wireframe SVG**:

   Follow this structure:

   ```svg
   <svg viewBox="0 0 {totalWidth} {totalHeight}" xmlns="http://www.w3.org/2000/svg">
     <!-- Background -->
     <rect width="{totalWidth}" height="{totalHeight}" fill="#f5f5f5"/>

     <!-- Labels -->
     <text x="187" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">
       Mobile View (&lt; {breakpoint}px)
     </text>
     <text x="{mobileWidth + spacing + desktopWidth/2}" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">
       Desktop View (≥ {breakpoint}px)
     </text>

     <!-- Mobile View Container -->
     <g transform="translate(0, 60)">
       <!-- Draw mobile version of all sections -->
       <!-- Use narrower width, stacked layout, smaller text -->
     </g>

     <!-- Desktop View Container -->
     <g transform="translate({mobileWidth + spacing}, 60)">
       <!-- Draw desktop version of all sections -->
       <!-- Use original wireframe layout and dimensions -->
     </g>

     <!-- Breakpoint indicator line (optional) -->
     <line x1="{mobileWidth + spacing/2}" y1="0" x2="{mobileWidth + spacing/2}" y2="{totalHeight}"
           stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
   </svg>
   ```

7. **Visual design guidelines**:
   - Use the same color scheme as the original wireframe
   - Maintain consistent visual language between views
   - Use dashed borders to show responsive changes
   - Add annotations for key responsive adaptations if helpful
   - Ensure all text is readable
   - Use the same fonts and font sizes as the original wireframe

8. **Section-specific responsive patterns**:

   **Header/Navigation:**
   - Mobile: Smaller logo, compact nav links or hamburger menu icon
   - Desktop: Full-size logo, all nav links visible

   **Hero Section:**
   - Mobile: Stacked layout (text on top, image below), smaller heading
   - Desktop: Side-by-side layout, larger heading

   **Features/Cards Grid:**
   - Mobile: Single column grid, stacked cards
   - Desktop: Multi-column grid (2-4 columns)

   **Product Lists:**
   - Mobile: Single column or 2-column grid, smaller images
   - Desktop: 3-4 column grid, larger images

   **Footer:**
   - Mobile: Stacked sections, centered text
   - Desktop: Horizontal layout, columns for different footer sections

9. **Save the responsive wireframe**:
   - Create directory structure: `docs/wireframes/{NNNN}/{breakpoint}/`
   - Example directory: `docs/wireframes/0001/768/`
   - Generate filename: `{page-name}-responsive-wireframe.svg`
   - Example full path: `docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg`
   - Preserve the page name from the original wireframe filename
   - Create the directories if they don't exist

10. **Output**:
    - Confirm the responsive wireframe has been created
    - Provide the full file path (e.g., `docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg`)
    - Mention the wireframe ID and breakpoint used
    - Confirm directory structure was created (`docs/wireframes/{NNNN}/{breakpoint}/`)
    - Summarize key responsive adaptations shown:
      - Mobile view dimensions (e.g., 375px width)
      - Desktop view dimensions (e.g., 1200px width)
      - Major layout changes (stacked vs side-by-side, grid columns)
      - Typography adjustments
    - Suggest next steps:
      - Review the wireframe to approve responsive design approach
      - Use this as reference for implementing responsive code
      - Can create multiple breakpoint versions in separate directories

## Responsive Design Principles

**Mobile-First Approach:**
1. Start with mobile view (left side)
2. Progressive enhancement for desktop (right side)
3. Touch-friendly tap targets on mobile (min 44px)
4. Readable text sizes on both views

**Layout Adaptations:**
- Vertical stacking on mobile → Horizontal layouts on desktop
- Single column → Multi-column grids
- Full-width elements → Constrained widths with margins

**Typography Scaling:**
- Mobile headings: 60-70% of desktop size
- Mobile body text: 80-90% of desktop size
- Maintain hierarchy and readability

**Spacing Adjustments:**
- Mobile padding: ~16px
- Desktop padding: ~48-96px
- Proportional gap reductions on mobile

**Content Priority:**
- Show essential content on both views
- Hide decorative elements on mobile if space-constrained
- Maintain functionality across breakpoints

## SVG Wireframe Template

```svg
<svg viewBox="0 0 1675 2500" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1675" height="2500" fill="#f5f5f5"/>

  <!-- View Labels -->
  <text x="187" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">
    Mobile View (&lt; 768px)
  </text>
  <text x="975" y="40" text-anchor="middle" font-size="20" font-weight="bold" fill="#333">
    Desktop View (≥ 768px)
  </text>

  <!-- Divider Line -->
  <line x1="425" y1="0" x2="425" y2="2500" stroke="#ccc" stroke-width="2" stroke-dasharray="10,5"/>

  <!-- Mobile View (375px wide) -->
  <g transform="translate(0, 60)">
    <!-- Example: Mobile Header -->
    <rect x="0" y="0" width="375" height="60" fill="#16213e" stroke="#0f3460" stroke-width="2"/>
    <text x="20" y="38" font-size="18" font-weight="bold" fill="#e94560">Logo</text>
    <text x="200" y="38" font-size="12" fill="#e0e0e0">Shop</text>
    <text x="250" y="38" font-size="12" fill="#e0e0e0">About</text>
    <text x="300" y="38" font-size="12" fill="#e0e0e0">Login</text>

    <!-- Continue with other mobile sections... -->
  </g>

  <!-- Desktop View (1200px wide) -->
  <g transform="translate(475, 60)">
    <!-- Example: Desktop Header -->
    <rect x="0" y="0" width="1200" height="80" fill="#16213e" stroke="#0f3460" stroke-width="2"/>
    <text x="60" y="50" font-size="24" font-weight="bold" fill="#e94560">TCG LOGO</text>
    <text x="900" y="50" font-size="16" fill="#e0e0e0">Shop</text>
    <text x="1000" y="50" font-size="16" fill="#e0e0e0">About</text>
    <text x="1100" y="50" font-size="16" fill="#e0e0e0">Login</text>

    <!-- Continue with other desktop sections... -->
  </g>
</svg>
```

## Usage Examples

```bash
# Create responsive wireframe for 0001 with default 768px breakpoint
/create-responsive-design 0001

# Create responsive wireframe for 0001 with 1024px breakpoint
/create-responsive-design 0001 1024

# Create responsive wireframe for 0002 with 640px breakpoint
/create-responsive-design 0002 640

# Create responsive wireframe for 0015 with 1280px breakpoint
/create-responsive-design 0015 1280
```

## Workflow Example

1. Designer creates initial wireframe: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`
2. **Run `/create-responsive-design 0001 768`** to create responsive visualization
3. Generated: `docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg`
4. Review the responsive wireframe to approve mobile/desktop layouts
5. Use as reference when implementing with `/create-page-from-wireframe 0001`
6. Implement responsive code following the wireframe design

**Directory Structure After:**
```
docs/
  wireframes/
    0001/
      tcg-landing-page-wireframe.svg          (original)
      768/
        tcg-landing-page-responsive-wireframe.svg
      1024/
        tcg-landing-page-responsive-wireframe.svg
    0002/
      another-page-wireframe.svg              (original)
      768/
        another-page-responsive-wireframe.svg
```

## Important Notes

- **Wireframe ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- **Directory Structure**: Creates `docs/wireframes/{NNNN}/{breakpoint}/` subdirectories automatically
- **File Naming**: `{page-name}-responsive-wireframe.svg` (breakpoint is in directory, not filename)
- **Multiple Breakpoints**: Can create multiple versions in separate breakpoint directories
  - Example: `docs/wireframes/0001/768/` and `docs/wireframes/0001/1024/`
  - Each breakpoint gets its own subdirectory under the wireframe ID
- **Side-by-side comparison**: Shows both views simultaneously for easy comparison
- **Visual consistency**: Use the same colors, fonts, and visual style as original
- **Proportional scaling**: Mobile view should feel natural, not just "squished"
- **Annotations**: Add helpful notes about key responsive changes if needed
- **Breakpoint flexibility**: Support common breakpoints (640, 768, 1024, 1280, 1536)
- **Reference document**: This wireframe guides responsive implementation
- **Design approval**: Review and approve before coding responsive features

## Design Checklist

- [ ] Directory structure created: `docs/wireframes/{NNNN}/{breakpoint}/`
- [ ] File saved with correct naming: `{page-name}-responsive-wireframe.svg`
- [ ] Mobile view shows all essential content in stacked layout
- [ ] Desktop view maintains original wireframe layout
- [ ] Typography is readable on both views
- [ ] Touch targets are adequate on mobile (≥44px)
- [ ] Grid layouts adapt appropriately (1 col mobile, multi-col desktop)
- [ ] Navigation is usable on both views
- [ ] Images are appropriately sized for each view
- [ ] Spacing feels balanced on both views
- [ ] Color scheme is consistent across views
- [ ] Labels clearly indicate breakpoint threshold
