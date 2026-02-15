---
name: apply-responsive-design
description: Applies responsive design from wireframe to page component with Tailwind CSS
argument-hint: "[wireframe-id] [breakpoint] [component-path]"
disable-model-invocation: true
---

# Apply Responsive Design

You are a frontend developer. Your task is to apply responsive design to a React component based on a responsive wireframe SVG, using Tailwind CSS with a mobile-first approach.

## Instructions

1. **Parse the arguments**:
   - First argument: wireframe ID (4-digit number like "0001", required)
   - Second argument: breakpoint in pixels (optional, defaults to "768")
   - Third argument: component file path (optional, defaults to "src/App.tsx")
   - Examples:
     - `0001`: Uses wireframe 0001, 768px breakpoint, src/App.tsx
     - `0001 768`: Uses wireframe 0001, 768px breakpoint, src/App.tsx
     - `0001 1024`: Uses wireframe 0001, 1024px breakpoint, src/App.tsx
     - `0001 768 src/components/Page.tsx`: Custom component path
   - If no wireframe ID is provided, ask the user for it

2. **Find the responsive wireframe**:
   - Search for responsive wireframe: `docs/wireframes/{NNNN}/{breakpoint}/*-responsive-wireframe.svg`
   - Example: For ID "0001" and breakpoint "768", find `docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg`
   - If not found, inform the user that they need to create it first with `/create-responsive-design`
   - Read the responsive wireframe SVG to understand the design adaptations

3. **Determine the Tailwind prefix**:
   - Map the breakpoint to Tailwind's responsive prefix:
     - 640px = `sm:` (Tailwind's small breakpoint)
     - 768px = `md:` (Tailwind's medium breakpoint, default)
     - 1024px = `lg:` (Tailwind's large breakpoint)
     - 1280px = `xl:` (Tailwind's extra-large breakpoint)
     - 1536px = `2xl:` (Tailwind's 2xl breakpoint)
   - Use the determined prefix throughout the responsive design (e.g., `md:`, `lg:`, etc.)

4. **Read the target component file**:
   - Read the specified component file (e.g., `src/App.tsx`)
   - Understand the current structure and identify all sections
   - Identify elements that need responsive adjustments

5. **Apply mobile-first responsive design**:

   **Mobile styles (default, no prefix):**
   - Smaller padding: `px-4 py-4` instead of `px-24 py-16`
   - Smaller typography: `text-xl` instead of `text-4xl`, `text-base` instead of `text-lg`
   - Vertical layouts: `flex-col` instead of `flex-row`
   - Single column grids: `grid-cols-1` instead of `grid-cols-3`
   - Full-width elements: `w-full max-w-[250px]`
   - Stacked buttons: `flex flex-col gap-4`
   - Smaller gaps: `gap-4` instead of `gap-8`
   - Reduced spacing: `mb-4` instead of `mb-12`
   - Hide non-essential decorative elements: `hidden {prefix}:flex`

   **Desktop styles (use determined prefix):**
   - Original padding: `{prefix}:px-24 {prefix}:py-16`
   - Original typography: `{prefix}:text-4xl`, `{prefix}:text-lg`
   - Horizontal layouts: `{prefix}:flex-row`
   - Multi-column grids: `{prefix}:grid-cols-3`, `{prefix}:grid-cols-4`
   - Original widths: `{prefix}:w-[250px]`
   - Horizontal buttons: `{prefix}:flex-row {prefix}:gap-6`
   - Original gaps: `{prefix}:gap-8`
   - Original spacing: `{prefix}:mb-12`
   - Show hidden elements: `{prefix}:flex`

6. **Section-specific responsive patterns**:

   Note: Replace `{prefix}` with the determined Tailwind prefix (e.g., `md`, `lg`, `xl`)

   **Header/Navigation:**
   ```tsx
   // Mobile: smaller padding, compact nav
   className="px-4 {prefix}:px-12 py-4 {prefix}:py-6 flex justify-between items-center"

   // Logo
   className="text-xl {prefix}:text-2xl font-bold"

   // Nav links
   className="flex gap-4 {prefix}:gap-8"
   className="text-sm {prefix}:text-base"
   ```

   **Hero Section:**
   ```tsx
   // Container: stack on mobile, side-by-side on desktop
   className="px-4 {prefix}:px-24 py-8 {prefix}:py-20 flex flex-col {prefix}:flex-row gap-8 {prefix}:gap-16"

   // Heading
   className="text-3xl {prefix}:text-5xl font-bold mb-4 {prefix}:mb-6"

   // Text
   className="text-base {prefix}:text-lg mb-6 {prefix}:mb-10"

   // Buttons
   className="flex flex-col {prefix}:flex-row gap-4 {prefix}:gap-6"
   ```

   **Grid Sections (Features, Cards, etc.):**
   ```tsx
   // Container
   className="px-4 {prefix}:px-24 py-8 {prefix}:py-16"

   // Grid
   className="grid grid-cols-1 {prefix}:grid-cols-3 gap-6 {prefix}:gap-8"

   // Headings
   className="text-2xl {prefix}:text-4xl font-bold"
   ```

   **Footer:**
   ```tsx
   // Container: stack on mobile, horizontal on desktop
   className="px-4 {prefix}:px-24 py-6 {prefix}:py-8 flex flex-col {prefix}:flex-row gap-4 {prefix}:gap-0 justify-between items-center"

   // Text alignment
   className="text-center {prefix}:text-left"
   ```

7. **Additional responsive considerations**:
   - Images and media: reduce height on mobile (e.g., `h-[240px] {prefix}:h-[340px]`)
   - Form inputs: full-width on mobile with max-width constraint
   - Buttons: full-width on mobile (`w-full {prefix}:w-auto` or `w-full {prefix}:w-[120px]`)
   - Cards/containers: `w-full max-w-[250px] {prefix}:w-[250px]`
   - Icon sizes: `w-[60px] {prefix}:w-[70px] h-[60px] {prefix}:h-[70px]`
   - Decorative elements: hide on mobile if not essential (`hidden {prefix}:flex`)

8. **Update the component file**:
   - Apply responsive classes to all elements systematically
   - Go through each section (header, hero, features, products, footer)
   - Replace or add responsive classes using the mobile-first approach
   - Ensure all Tailwind classes use the correct prefix for the breakpoint
   - Preserve existing functionality and structure
   - Maintain color scheme and visual design

9. **Output**:
   - Confirm the file has been updated with responsive design
   - List the major responsive adjustments made
   - Mention the file path that was modified
   - Clearly state the breakpoint used (e.g., "768px with md: prefix" or "1024px with lg: prefix")
   - Mention the Tailwind prefix that was applied
   - List key responsive changes by section:
     - Header: padding and font size adjustments
     - Hero: layout direction (stacked vs side-by-side)
     - Features: grid columns (1 vs 3)
     - Products: grid columns and spacing
     - Footer: layout direction and alignment
   - Suggest testing the responsive design by resizing the browser
   - Mention running `npm run dev` to see the changes

## Responsive Design Principles

**Mobile-First Approach:**
1. Start with mobile styles (no prefix)
2. Add desktop enhancements with prefix (md:, lg:, xl:)
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
- Mobile padding: ~16px (px-4, py-4)
- Desktop padding: ~48-96px (px-12 py-6, px-24 py-16)
- Proportional gap reductions on mobile

**Content Priority:**
- Show essential content on both views
- Hide decorative elements on mobile if space-constrained
- Maintain functionality across breakpoints

## Tailwind Prefix Mapping

| Breakpoint | Tailwind Prefix | Screens |
|------------|----------------|---------|
| 640px | `sm:` | ≥640px |
| 768px | `md:` | ≥768px |
| 1024px | `lg:` | ≥1024px |
| 1280px | `xl:` | ≥1280px |
| 1536px | `2xl:` | ≥1536px |

## Usage Examples

```bash
# Apply responsive design to src/App.tsx with default 768px breakpoint (md:)
/apply-responsive-design 0001

# Apply responsive design with 1024px breakpoint (lg:)
/apply-responsive-design 0001 1024

# Apply responsive design to custom component with 768px breakpoint
/apply-responsive-design 0001 768 src/components/HomePage.tsx

# Apply responsive design with 640px breakpoint (sm:)
/apply-responsive-design 0001 640

# Apply responsive design with 1280px breakpoint (xl:)
/apply-responsive-design 0001 1280 src/App.tsx
```

## Workflow Example

1. Designer creates initial wireframe: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`
2. Run `/create-responsive-design 0001 768` to create responsive visualization
3. Generated: `docs/wireframes/0001/768/tcg-landing-page-responsive-wireframe.svg`
4. Review and approve the responsive wireframe
5. Run `/create-page-from-wireframe 0001` to create component with placeholders
6. **Run `/apply-responsive-design 0001 768`** to apply responsive design to the component
7. Test the responsive page with `npm run dev`
8. Resize browser to verify mobile and desktop views

## Important Notes

- **Prerequisites**: The responsive wireframe must exist at `docs/wireframes/{NNNN}/{breakpoint}/`
  - Create it first with `/create-responsive-design` if needed
- **Mobile-first approach**: Default styles are for mobile, prefix for desktop/larger screens
- **Tailwind prefix**: Automatically determined based on the breakpoint
  - 640px → `sm:`
  - 768px → `md:` (default)
  - 1024px → `lg:`
  - 1280px → `xl:`
  - 1536px → `2xl:`
- **Preserve design**: Don't change colors, themes, or visual design elements
- **Maintain structure**: Keep the same component structure, only adjust responsive classes
- **Test thoroughly**: Ensure all interactive elements work on all screen sizes
- **Tailwind CSS required**: The project must have Tailwind CSS configured
- **Reference wireframe**: Use the responsive wireframe SVG as the design reference

## Example Transformations

### Before (non-responsive):
```tsx
<header className="bg-[#16213e] border-b-2 border-[#0f3460] px-12 py-6">
  <div className="text-2xl font-bold">Logo</div>
  <nav className="flex gap-8">
    <a href="#shop">Shop</a>
  </nav>
</header>
```

### After (responsive with md: prefix):
```tsx
<header className="bg-[#16213e] border-b-2 border-[#0f3460] px-4 md:px-12 py-4 md:py-6">
  <div className="text-xl md:text-2xl font-bold">Logo</div>
  <nav className="flex gap-4 md:gap-8">
    <a href="#shop" className="text-sm md:text-base">Shop</a>
  </nav>
</header>
```

### Before (non-responsive):
```tsx
<section className="px-24 py-20 flex flex-row gap-16">
  <div className="flex-1">
    <h1 className="text-5xl font-bold mb-6">Hero Title</h1>
    <div className="flex flex-row gap-6">
      <button>Button 1</button>
      <button>Button 2</button>
    </div>
  </div>
  <div className="flex-1">
    <img src="hero.jpg" className="h-[340px]" />
  </div>
</section>
```

### After (responsive with md: prefix):
```tsx
<section className="px-4 md:px-24 py-8 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16">
  <div className="flex-1">
    <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Hero Title</h1>
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <button>Button 1</button>
      <button>Button 2</button>
    </div>
  </div>
  <div className="flex-1">
    <img src="hero.jpg" className="h-[240px] md:h-[340px]" />
  </div>
</section>
```

## Troubleshooting

**If responsive wireframe not found:**
- First create the responsive wireframe with `/create-responsive-design {wireframe-id} {breakpoint}`
- Verify the file exists at `docs/wireframes/{NNNN}/{breakpoint}/*-responsive-wireframe.svg`

**If styles don't apply correctly:**
- Ensure Tailwind CSS is properly configured in the project
- Check that the Tailwind prefix matches the breakpoint
- Verify the component file exists and is readable

**If layout breaks:**
- Ensure responsive classes are preserved
- Check that container divs maintain their structure
- Verify flex direction and grid column changes are correct

**If design doesn't match wireframe:**
- Review the responsive wireframe SVG to understand intended adaptations
- Check that mobile and desktop views are correctly distinguished
- Ensure all sections follow the mobile-first approach
