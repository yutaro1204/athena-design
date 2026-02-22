---
name: create-required-assets-list
description: Analyzes a wireframe SVG to create comprehensive assets list in docs/assets-list.md
argument-hint: "[wireframe-id]"
disable-model-invocation: true
---

# Create Required Assets List

You are a frontend performance specialist. Your task is to analyze a wireframe SVG to create a comprehensive document listing all required assets with sizes, formats, and optimization strategies.

**Input**: Wireframe ID (4-digit number like "0001")
**Output**: The document will always be saved to `docs/assets-list.md`.

## Instructions

1. **Parse the argument**:
   - Argument: wireframe ID (4-digit number like "0001")
   - Output path: Fixed at `docs/assets-list.md` (always)
   - If no argument provided, prompt user for wireframe ID
   - Examples:
     - `0001`: analyzes wireframe `docs/wireframes/0001/*-wireframe.svg`
     - `0002`: analyzes wireframe `docs/wireframes/0002/*-wireframe.svg`
     - `0015`: analyzes wireframe `docs/wireframes/0015/*-wireframe.svg`

2. **Find and read the wireframe SVG**:
   - Search for wireframe file: `docs/wireframes/{NNNN}/*-wireframe.svg`
   - Example: For ID "0001", find `docs/wireframes/0001/*-wireframe.svg`
   - If not found, inform the user and stop
   - If found, read the SVG file and extract:
     - All text labels indicating asset placeholders
     - Section labels and annotations
     - Dimensions from SVG viewBox and element sizes
     - Color scheme and design intent

3. **Analyze the wireframe SVG content**:
   When analyzing wireframe, look for:

   **Asset placeholders in SVG:**
   - Text containing: `[Image]`, `[Pack Image]`, `[Logo]`, `[Hero Image]`, etc.
   - Rectangle elements with placeholder annotations
   - Labeled sections: "HEADER / NAV", "HERO SECTION", etc.

   **Extract dimensions:**
   - Container sizes from rect elements (width, height, x, y)
   - ViewBox dimensions for overall page size
   - Calculate responsive sizes based on wireframe dimensions

   **Extract design context:**
   - Section labels and purposes
   - Text content and labels
   - Visual hierarchy and layout structure
   - Color scheme (for optimization decisions)

4. **Determine asset specifications from wireframe**:

   When analyzing wireframe SVG, extract dimensions and context:

   **From SVG Elements:**
   ```svg
   <!-- Example: Header logo -->
   <text x="60" y="50">TCG LOGO</text>
   <!-- Calculate logo size from text position and typical proportions -->

   <!-- Example: Hero image container -->
   <rect x="680" y="180" width="420" height="340"/>
   <text>Hero Image</text>
   <!-- Use rect dimensions: 420×340px for desktop -->

   <!-- Example: Product card image -->
   <rect x="120" y="1300" width="210" height="150"/>
   <text>[Pack Image]</text>
   <!-- Use rect dimensions: 210×150px -->
   ```

   **Calculate Responsive Sizes:**
   - If wireframe viewBox is 1200 wide (desktop), calculate mobile proportions
   - Mobile typically 60-70% of desktop size
   - Apply responsive scaling: desktop size → mobile = desktop × 0.6-0.7

   **Section Analysis:**
   Look for section labels in wireframe:
   - "HEADER / NAV" → Logo and navigation assets
   - "HERO SECTION" → Hero image/banner
   - "FEATURES SECTION" → Feature icons
   - "CURRENTLY AVAILABLE PACKS" → Product images
   - "UPCOMING RELEASES / SCHEDULE" → Thumbnail images
   - "COMPANY INFORMATION" → Company/social icons
   - "FOOTER" → Footer logo or icons

5. **Determine asset specifications for each identified asset**:
   For each identified asset, determine:

   **Size Requirements:**
   - Extract dimensions from wireframe SVG rectangles
   - Calculate appropriate sizes for:
     - Mobile (< 768px): ~60-70% of desktop size
     - Desktop (≥ 768px): full wireframe dimensions
     - Retina/2x variants for high-DPI displays (double dimensions)

   **Format Recommendations:**
   - **Logos**: SVG (vector, scalable) or PNG with transparency
   - **Icons**: SVG (inline or external) preferred
   - **Photos/Complex Images**: WebP with JPEG fallback
   - **Illustrations**: SVG if possible, otherwise WebP
   - **Animations**: Lottie JSON, animated SVG, or video

   **File Naming:**
   - Use descriptive, kebab-case names derived from wireframe labels
   - Include variant suffixes: `-small`, `-medium`, `-large`, `@2x`
   - Include format extensions: `.svg`, `.webp`, `.jpg`, `.png`
   - Example: `[Pack Image]` → `pack-starter.webp`, `pack-starter@2x.webp`

6. **Calculate performance metrics**:
   - Estimate file sizes for each asset based on dimensions and format
   - Calculate total page weight for images
   - Consider compression ratios:
     - WebP: ~25-35% smaller than JPEG
     - AVIF: ~50% smaller than JPEG
     - SVG: typically <5KB when optimized
   - Set performance budget (target: <200KB for all images)

7. **Include optimization strategies**:
   Document comprehensive optimization techniques:

   **Image Format Optimization:**
   - Modern format usage (WebP, AVIF)
   - Progressive/fallback patterns
   - Format selection by content type

   **Loading Strategies:**
   - Lazy loading for below-the-fold images
   - Eager loading for above-the-fold images
   - Preloading critical assets

   **Responsive Images:**
   - srcset and sizes attributes
   - Picture element for art direction
   - Device-appropriate image delivery

   **Compression:**
   - Quality settings by format
   - Compression tools and techniques
   - Lossless vs lossy compression

   **CDN & Caching:**
   - CDN delivery recommendations
   - Cache header configuration
   - Asset versioning strategies

   **Advanced Techniques:**
   - Blur placeholders (LQIP)
   - Progressive image loading
   - Image component libraries
   - Build-time optimization

8. **Create directory structure recommendation**:
   - Organize assets by type (logos, icons, images, etc.)
   - Suggest logical folder hierarchy based on wireframe sections
   - Include naming conventions
   - Group assets by page sections (hero, features, products, etc.)

9. **Generate implementation checklist**:
   - Create actionable checklist for asset creation
   - Include optimization steps
   - Add testing and validation tasks
   - Reference wireframe file for design guidance

10. **Write the markdown document**:
   Create a comprehensive document with the following structure:

   ```markdown
   # Assets List for [Page Name] (Page [ID])

   Introduction paragraph mentioning the wireframe source.

   ## Required Assets List
   ### 1. [Asset Category]
   - Location: [Where used / Section from wireframe]
   - Wireframe Reference: [Section label or coordinates from SVG]
   - Recommended Sizes: [Mobile/Desktop dimensions from wireframe]
   - Format: [Format recommendations]
   - File naming: [Naming examples]
   - Estimated size: [Size estimate based on dimensions]
   - Usage: [Purpose description from wireframe context]

   ## Performance Optimization Strategies
   ### 1. [Strategy Name]
   [Detailed explanation with code examples]

   ## Recommended Directory Structure
   [Folder structure with files organized by section]

   ## Performance Budget & Metrics
   [Table of assets with sizes and totals]

   ## Implementation Checklist
   - [ ] [Checklist items including wireframe review]

   ## Summary
   [Summary of requirements and next steps]

   ---
   **Document Version**: 1.0
   **Last Updated**: [Date]
   **Related Files**: [Wireframe SVG file]
   ```

11. **Output**:
   - Confirm the document has been created at `docs/assets-list.md`
   - Mention the wireframe file that was analyzed (e.g., `docs/wireframes/0001/tcg-landing-page-wireframe.svg`)
   - Provide a brief summary:
     - Total number of asset groups identified from wireframe
     - Total estimated size of all assets
     - Key recommendations for asset creation and optimization
     - Wireframe dimensions (viewBox and overall page size)
   - Suggest next steps for asset creation and implementation

## Asset Analysis Guidelines

### Identifying Assets in Wireframe SVG

When analyzing wireframe SVG files, look for these patterns:

**Asset placeholder text:**
```svg
<text>[Image]</text>
<text>[Pack Image]</text>
<text>[Hero Image/Card Animation]</text>
<text>[Logo]</text>
<text>TCG LOGO</text>
```

**Section labels (in italic or commented text):**
```svg
<text font-style="italic">HEADER / NAV</text>
<text font-style="italic">HERO SECTION</text>
<text font-style="italic">FEATURES SECTION</text>
<text font-style="italic">CURRENTLY AVAILABLE PACKS</text>
<text font-style="italic">UPCOMING RELEASES / SCHEDULE</text>
```

**Rectangle containers (asset dimensions):**
```svg
<!-- Hero image container -->
<rect x="680" y="180" width="420" height="340" fill="#16213e" stroke="#4a5568"/>

<!-- Product pack image -->
<rect x="120" y="1300" width="210" height="150" fill="#1a1a2e"/>

<!-- Icon placeholder -->
<circle cx="235" cy="840" r="35" stroke="#e94560"/>
```

**ViewBox for overall dimensions:**
```svg
<svg viewBox="0 0 1200 2400" xmlns="http://www.w3.org/2000/svg">
<!-- 1200px wide (desktop), 2400px tall -->
```


### Size Calculation Logic

**From wireframe SVG rectangles:**
```svg
<!-- Extract width and height attributes -->
<rect x="680" y="180" width="420" height="340"/>
<!-- Desktop size: 420×340px -->
<!-- Calculate mobile: 420 × 0.65 = 273px, 340 × 0.65 = 221px → Mobile: ~280×240px -->

<rect x="120" y="1300" width="210" height="150"/>
<!-- Desktop size: 210×150px -->
<!-- Mobile: 210 × 0.65 = 137px → ~150×120px -->
```

**From wireframe viewBox:**
```svg
<svg viewBox="0 0 1200 2400">
<!-- Page width: 1200px (desktop reference) -->
<!-- Use this to calculate proportions for mobile (typically 375-428px) -->
```

**Responsive calculation:**
- Desktop size = wireframe dimensions
- Mobile size = desktop × 0.6 to 0.7 (60-70%)
- Retina @2x = desktop × 2 (for high-DPI displays)

**General guidelines:**
- Logos: 40-60px height (mobile), 50-80px (desktop)
- Hero images: 240-340px height (mobile), 340-600px (desktop)
- Thumbnails: 64-80px (mobile), 80-120px (desktop)
- Product images: 120-150px height (mobile), 150-250px (desktop)
- Icons: 24-48px (mobile), 48-96px (desktop)

**Retina variants:**
- Always provide @2x versions for raster images
- 2x = double the dimensions
- Example: 250×150px → 500×300px @2x

### Format Selection Matrix

| Asset Type | Recommended Format | Fallback | Notes |
|------------|-------------------|----------|-------|
| Logo | SVG | PNG | Vector preferred |
| Icons | SVG (inline) | SVG (external) | Scalable, small |
| Photos | WebP | JPEG | Modern compression |
| Illustrations | SVG | WebP/PNG | Vector if possible |
| Complex Graphics | WebP | JPEG/PNG | Compression priority |
| Animations | Lottie/SVG | GIF/Video | Performance friendly |

### Compression Targets

- **SVG**: Minified, <5KB typical
- **WebP**: 75-80% quality, ~25-35% smaller than JPEG
- **JPEG**: 75-85% quality for photos
- **PNG**: Use only when transparency needed
- **AVIF**: 80-90% quality, ~50% smaller than JPEG (newer)

## Performance Optimization Patterns

### Critical Asset Preloading

```html
<head>
  <link rel="preload" as="image" href="/logo.svg" />
  <link rel="preload" as="image" href="/hero.webp" type="image/webp" />
</head>
```

### Responsive Image Pattern

```tsx
<img
  srcSet="image-small.webp 400w,
          image-medium.webp 800w,
          image-large.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-small.webp"
  alt="Description"
  loading="lazy"
/>
```

### Modern Format with Fallback

```tsx
<picture>
  <source srcSet="image.avif" type="image/avif" />
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

### Lazy Loading Strategy

- **Above the fold**: `loading="eager"` or no attribute
- **Below the fold**: `loading="lazy"`
- **Critical images**: Preload in HTML head
- **Decorative images**: Always lazy load

## Example Output Structure

The generated document should be comprehensive and include:

1. **Title and Introduction**: Page name and purpose
2. **Assets List**: Detailed list with all specifications
3. **Optimization Strategies**: 5-10 key strategies with examples
4. **Directory Structure**: Recommended file organization
5. **Performance Budget**: Table with size estimates and totals
6. **Implementation Checklist**: Actionable items
7. **Summary**: Overview and next steps
8. **Metadata**: Version, date, related files

## Usage Examples

```bash
# Analyze wireframe 0001, outputs to docs/assets-list.md
/create-required-assets-list 0001

# Analyze wireframe 0002, outputs to docs/assets-list.md
/create-required-assets-list 0002

# Analyze wireframe 0015, outputs to docs/assets-list.md
/create-required-assets-list 0015

# No arguments - will prompt for wireframe ID
/create-required-assets-list
```

## Workflow Example

1. Designer creates wireframe: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`
2. Run skill: `/create-required-assets-list 0001`
3. Skill generates: `docs/assets-list.md` with all requirements from wireframe
4. Designer/developer creates assets based on the list
5. Developer implements page using the assets

## Important Notes

- **Wireframe-First Approach**: This skill analyzes wireframe designs only, not implemented code
- **Dimension Source**: Extract all dimensions directly from wireframe SVG elements
- **4-Digit ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- Be thorough in identifying all assets, including decorative elements in the wireframe
- Provide practical, actionable recommendations for asset creation
- Include code examples for implementation in the output document
- Consider both performance and quality in recommendations
- Think about the full asset lifecycle (creation, optimization, delivery)
- Account for responsive design requirements (mobile/desktop sizes)
- Include accessibility considerations (alt text recommendations, etc.)
- Provide realistic size estimates based on typical compression ratios
- Set achievable performance targets based on extracted dimensions
- Consider browser support for modern formats in recommendations
- Reference wireframe file location and sections in the documentation
