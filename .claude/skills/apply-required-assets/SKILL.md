---
name: apply-required-assets
description: Integrates actual images from docs/assets into component files based on assets-list.md
argument-hint: "[component-file-path]"
disable-model-invocation: true
---

# Apply Required Assets

You are a frontend developer. Your task is to integrate actual image assets from `docs/assets` directory into a React component file, replacing placeholders with real images based on the specifications in `docs/assets-list.md`.

## Instructions

1. **Parse the argument**:
   - Argument: Component file path (optional)
   - Default: `src/App.tsx` if not provided
   - Examples:
     - `src/App.tsx` (default)
     - `src/components/Page0001.tsx`
     - `src/pages/Landing.tsx`

2. **Read assets-list.md**:
   - Read `docs/assets-list.md` to understand:
     - What assets are required (logo, hero images, pack images, icons, etc.)
     - Expected file names and formats
     - Where each asset should be used (header, hero section, product cards, etc.)
     - Loading strategies (eager vs lazy)
   - Extract the list of required assets from the document

3. **Check available assets**:
   - List files in `docs/assets` directory
   - Match available files with required assets from assets-list.md
   - Identify which assets are available for integration
   - Note: Some assets may be missing - only integrate what's available

4. **Read the target component file**:
   - Read the specified component file (e.g., `src/App.tsx`)
   - Identify placeholder elements that need replacement:
     - Text placeholders like `[Image]`, `[Pack Image]`, `[Hero Image]`, `[Logo]`
     - Placeholder divs with text content
     - Elements marked for asset integration

5. **Add import statements**:
   - Add import statements at the top of the file for all available assets
   - Use descriptive variable names in camelCase
   - Use relative path from component location to `docs/assets` directory
   - For components in `src/` directory, use `../docs/assets/` path
   - Example format (for src/App.tsx):
   ```tsx
   import logoImage from '../docs/assets/logo.png'
   import heroImage from '../docs/assets/hero-card-animation.webp'
   import packStarterImage from '../docs/assets/pack-starter.webp'
   ```
   - Place imports after CSS imports but before component definitions

6. **Replace placeholders with images**:
   Follow these patterns for different asset types:

   **Logo (Header):**
   - Replace text logo with `<img>` tag
   - Make it responsive with height classes
   - Example:
   ```tsx
   <div className="flex items-center">
     <img src={logoImage} alt="[Brand] Logo" className="h-10 md:h-12" />
   </div>
   ```

   **Hero Image (Above the fold):**
   - Replace placeholder div with `<img>` tag
   - Use `object-contain` to maintain aspect ratio
   - No `loading` attribute (loads immediately)
   - Example:
   ```tsx
   <div className="flex-1 w-full flex items-center justify-center">
     <img
       src={heroImage}
       alt="[Descriptive alt text]"
       className="w-full h-auto max-h-[240px] md:max-h-[340px] object-contain rounded-lg"
     />
   </div>
   ```

   **Product/Pack Images (Below the fold):**
   - Replace placeholder div with `<img>` tag
   - Use `object-cover` for consistent sizing
   - Add `loading="lazy"` for performance
   - Example:
   ```tsx
   <div className="h-[120px] md:h-[150px] mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
     <img
       src={packStarterImage}
       alt="[Product name] - [Description]"
       className="w-full h-full object-cover rounded"
       loading="lazy"
     />
   </div>
   ```

   **Thumbnail Images (Below the fold):**
   - Replace placeholder div with `<img>` tag
   - Use `object-cover` for thumbnails
   - Add `loading="lazy"` for performance
   - Example:
   ```tsx
   <div className="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center flex-shrink-0 overflow-hidden rounded">
     <img
       src={expansionShadowRealmImage}
       alt="[Item name] thumbnail"
       className="w-full h-full object-cover"
       loading="lazy"
     />
   </div>
   ```

   **Feature Icons:**
   - If SVG icons are available, integrate them similarly
   - For inline SVGs, consider embedding directly or importing as React components

7. **Asset mapping strategy**:
   Based on assets-list.md, map assets to placeholders:

   - **Logo placeholders**: Text like "TCG LOGO", "[Logo]" → logo.svg or logo.png
   - **Hero section**: Text like "[Hero Image]", "[Hero Image/Card Animation]" → hero-card-animation.webp
   - **Pack images**: Text like "[Pack Image]" → match with context:
     - "Starter Pack" section → pack-starter.webp
     - "Legends Pack" section → pack-legends.webp
     - "Premium Pack" section → pack-premium.webp
   - **Expansion thumbnails**: Text like "[Image]" in upcoming releases → match with expansion name:
     - "Shadow Realm" → expansion-shadow-realm.webp
     - "Crystal Warriors" → expansion-crystal-warriors.webp
     - "Cyber Age" → expansion-cyber-age.webp
   - **Feature icons**: Emoji placeholders (⚔, 🎨, 🌐) → icon-*.svg if available

8. **Add proper alt text**:
   - Write descriptive alt text for accessibility
   - Describe what the image shows and its context
   - Examples:
     - Logo: "[Brand] Logo"
     - Hero: "Hero card animation showcasing trading cards"
     - Products: "Starter Pack - Basic card pack for beginners"
     - Thumbnails: "Shadow Realm expansion thumbnail"

9. **Apply loading strategies**:
   Based on assets-list.md recommendations:
   - **Eager loading** (no attribute or `loading="eager"`):
     - Logo (critical for branding)
     - Hero image (above the fold, LCP element)
     - Feature icons (above the fold)
   - **Lazy loading** (`loading="lazy"`):
     - Product pack images (below the fold)
     - Expansion thumbnails (below the fold)
     - Footer images (below the fold)

10. **Maintain responsive design**:
    - Keep existing responsive classes (md:, lg:, etc.)
    - Ensure images work on both mobile and desktop
    - Use appropriate sizing classes:
      - `h-10 md:h-12` for logos
      - `max-h-[240px] md:max-h-[340px]` for hero images
      - `h-[120px] md:h-[150px]` for product images
      - `w-16 md:w-20 h-16 md:h-20` for thumbnails

11. **Output**:
    - Confirm the assets have been integrated
    - List the component file that was modified
    - Summarize what assets were integrated:
      - Number of images integrated
      - Types of assets (logo, hero, products, thumbnails)
      - Any missing assets from assets-list.md
    - Provide next steps:
      - Run `npm run dev` to see the page with images
      - Review the page to ensure images display correctly

## Asset Integration Patterns

### Import Pattern
```tsx
// CSS imports
import './App.css'

// Asset imports (relative path from src/ to docs/assets/)
import logoImage from '../docs/assets/logo.png'
import heroImage from '../docs/assets/hero-card-animation.webp'
import packStarterImage from '../docs/assets/pack-starter.webp'
import packLegendsImage from '../docs/assets/pack-legends.webp'
import packPremiumImage from '../docs/assets/pack-premium.webp'
import expansionShadowRealmImage from '../docs/assets/expansion-shadow-realm.webp'
import expansionCrystalWarriorsImage from '../docs/assets/expansion-crystal-warriors.webp'
import expansionCyberAgeImage from '../docs/assets/expansion-cyber-age.webp'

// Component definition
function Page0001() {
  // ...
}
```

### Logo Replacement Pattern
**Before:**
```tsx
<div className="text-xl md:text-2xl font-bold text-[#e94560]">
  TCG LOGO
</div>
```

**After:**
```tsx
<div className="flex items-center">
  <img src={logoImage} alt="TCG Logo" className="h-10 md:h-12" />
</div>
```

### Hero Image Replacement Pattern
**Before:**
```tsx
<div className="flex-1 w-full bg-[#16213e] border-2 border-[#4a5568] rounded-lg h-[240px] md:h-[340px] flex items-center justify-center text-[#666] text-sm">
  [Hero Image/<br />Card Animation]
</div>
```

**After:**
```tsx
<div className="flex-1 w-full flex items-center justify-center">
  <img
    src={heroImage}
    alt="Hero card animation showcasing trading cards"
    className="w-full h-auto max-h-[240px] md:max-h-[340px] object-contain rounded-lg"
  />
</div>
```

### Product Image Replacement Pattern
**Before:**
```tsx
<div className="bg-[#1a1a2e] border border-[#4a5568] h-[120px] md:h-[150px] mb-3 md:mb-4 flex items-center justify-center text-[#666] text-xs md:text-sm">
  [Pack Image]
</div>
```

**After:**
```tsx
<div className="h-[120px] md:h-[150px] mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
  <img
    src={packStarterImage}
    alt="Starter Pack - Basic card pack for beginners"
    className="w-full h-full object-cover rounded"
    loading="lazy"
  />
</div>
```

### Thumbnail Replacement Pattern
**Before:**
```tsx
<div className="bg-[#1a1a2e] border border-[#4a5568] w-16 md:w-20 h-16 md:h-20 flex items-center justify-center text-[#666] text-xs flex-shrink-0">
  [Image]
</div>
```

**After:**
```tsx
<div className="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center flex-shrink-0 overflow-hidden rounded">
  <img
    src={expansionShadowRealmImage}
    alt="Shadow Realm expansion thumbnail"
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

## Context-Based Asset Mapping

When replacing placeholders, use surrounding context to determine which asset to use:

```tsx
// Example: Identify pack images by product name
<div>  {/* Starter Pack context */}
  <div>[Pack Image]</div>  {/* → Use packStarterImage */}
  <h3>Starter Pack</h3>
  <p>$9.99</p>
</div>

<div>  {/* Legends Pack context */}
  <div>[Pack Image]</div>  {/* → Use packLegendsImage */}
  <h3>Legends Pack</h3>
  <p>$24.99</p>
</div>

// Example: Identify expansion thumbnails by expansion name
<div>  {/* Shadow Realm context */}
  <div>[Image]</div>  {/* → Use expansionShadowRealmImage */}
  <h3>Shadow Realm</h3>
  <p>March 15, 2026</p>
</div>
```

## Usage Examples

```bash
# Apply assets to default component (src/App.tsx)
/apply-required-assets

# Apply assets to specific component
/apply-required-assets src/App.tsx

# Apply assets to custom component path
/apply-required-assets src/components/Page0001.tsx

# Apply assets to page component
/apply-required-assets src/pages/Landing.tsx
```

## Workflow Example

1. Designer creates wireframe: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`
2. Run `/create-page-from-wireframe 0001` to create component with placeholders
3. Run `/create-required-assets-list 0001` to generate asset requirements
4. Designer/developer creates and places assets in `docs/assets/`
5. **Run `/apply-required-assets`** to integrate assets into component
6. Review page with `npm run dev`

## Important Notes

- **Read assets-list.md first**: This document contains the mapping between wireframe elements and required assets
- **Context-aware replacement**: Use surrounding HTML/text to determine which asset matches which placeholder
- **Graceful handling**: If an asset is missing, leave the placeholder and note it in the output
- **Preserve styling**: Keep all existing Tailwind CSS classes and responsive design
- **Alt text quality**: Write meaningful, descriptive alt text for accessibility
- **Loading strategy**: Follow performance recommendations (eager for above-fold, lazy for below-fold)
- **Maintain structure**: Don't change the component structure, only replace placeholders
- **TypeScript compatibility**: Ensure import paths work with TypeScript/Vite
- **Asset discovery**: Check actual files in docs/assets, don't assume based on assets-list.md alone
- **Relative paths**: For components in src/ directory, use `../docs/assets/` path; adjust relative path based on component depth

## Troubleshooting

**If assets don't appear:**
- Verify files exist in `docs/assets` directory
- Check import paths are correct (relative to component file)
  - From `src/App.tsx`: use `../docs/assets/`
  - From `src/components/Page.tsx`: use `../../docs/assets/`
- Ensure file extensions match (`.webp`, `.png`, `.jpg`, `.svg`)
- Verify Vite is configured to handle image imports

**If layout breaks:**
- Ensure responsive classes are preserved
- Check that container divs maintain their structure
- Verify `object-cover` vs `object-contain` usage

**If performance issues:**
- Confirm `loading="lazy"` on below-the-fold images
- Check image file sizes are optimized
- Verify WebP format is used where specified
