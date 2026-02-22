---
name: apply-required-assets
description: Integrates actual images from docs/assets into React/Astro component files based on assets-list.md
argument-hint: "[component-file-path]"
disable-model-invocation: true
---

# Apply Required Assets

You are a frontend developer. Your task is to integrate actual image assets from `docs/assets` directory into a React or Astro component file, replacing placeholders with real images based on the specifications in `docs/assets-list.md`.

## Instructions

1. **Parse the argument**:
   - Argument: Component file path (optional, will auto-detect if not provided)
   - Examples:
     - Auto-detect (no argument)
     - `src/App.tsx` (React)
     - `src/components/Page0001.tsx` (React)
     - `src/pages/landing.astro` (Astro)
     - `src/pages/index.astro` (Astro)

2. **Auto-detect component file** (if not provided):
   - Look for recently created/modified files
   - Check `src/App.tsx` for React
   - Check `src/pages/*.astro` for Astro
   - Inform the user which file was detected

3. **Detect framework from file extension**:
   - `.tsx` or `.jsx` → React
   - `.astro` → Astro
   - This determines import syntax and image handling

4. **Read assets-list.md**:
   - Read `docs/assets-list.md` to understand:
     - What assets are required (logo, hero images, pack images, icons, etc.)
     - Expected file names and formats
     - Where each asset should be used (header, hero section, product cards, etc.)
     - Loading strategies (eager vs lazy)
   - Extract the list of required assets from the document

5. **Check available assets**:
   - List files in `docs/assets` directory
   - Match available files with required assets from assets-list.md
   - Identify which assets are available for integration
   - Note: Some assets may be missing - only integrate what's available

6. **Read the target component file**:
   - Read the specified component file
   - Identify placeholder elements that need replacement:
     - Text placeholders like `[Image]`, `[Pack Image]`, `[Hero Image]`, `[Logo]`
     - Placeholder divs with text content
     - Elements marked for asset integration
   - Note the framework-specific syntax (className vs class)

7. **Add import statements** (framework-specific):
   ### For React (.tsx):
   - Add import statements at the top of the file
   - Use descriptive variable names in camelCase
   - Use relative path from component location to `docs/assets` directory
   - Example format (for src/App.tsx):
   ```tsx
   import logoImage from '../docs/assets/logo.png'
   import heroImage from '../docs/assets/hero-card-animation.webp'
   import packStarterImage from '../docs/assets/pack-starter.webp'
   ```
   - Place imports after CSS imports but before component definitions

   ### For Astro (.astro):
   - Add import statements in the frontmatter section (between `---` markers)
   - Use descriptive variable names in camelCase
   - Use relative path from component location to `docs/assets` directory
   - Example format (for src/pages/landing.astro):
   ```astro
   ---
   import logoImage from '../../docs/assets/logo.png'
   import heroImage from '../../docs/assets/hero-card-animation.webp'
   import packStarterImage from '../../docs/assets/pack-starter.webp'
   ---
   ```
   - Note: Astro pages in `src/pages/` need `../../docs/assets/` (one more `../` than React)

8. **Replace placeholders with images** (framework-specific):
   Follow these patterns for different asset types:

   **Logo (Header) - React:**
   ```tsx
   <div className="flex items-center">
     <img src={logoImage} alt="[Brand] Logo" className="h-10 md:h-12" />
   </div>
   ```

   **Logo (Header) - Astro:**
   ```astro
   <div class="flex items-center">
     <img src={logoImage.src} alt="[Brand] Logo" class="h-10 md:h-12" />
   </div>
   ```

   **Important**: In Astro, imported images are objects, use `.src` to get the URL.

   **Hero Image (Above the fold) - React:**
   ```tsx
   <div className="flex-1 w-full flex items-center justify-center">
     <img
       src={heroImage}
       alt="[Descriptive alt text]"
       className="w-full h-auto max-h-[240px] md:max-h-[340px] object-contain rounded-lg"
     />
   </div>
   ```

   **Hero Image (Above the fold) - Astro:**
   ```astro
   <div class="flex-1 w-full flex items-center justify-center">
     <img
       src={heroImage.src}
       alt="[Descriptive alt text]"
       class="w-full h-auto max-h-[240px] md:max-h-[340px] object-contain rounded-lg"
     />
   </div>
   ```

   **Product/Pack Images (Below the fold) - React:**
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

   **Product/Pack Images (Below the fold) - Astro:**
   ```astro
   <div class="h-[120px] md:h-[150px] mb-3 md:mb-4 flex items-center justify-center overflow-hidden">
     <img
       src={packStarterImage.src}
       alt="[Product name] - [Description]"
       class="w-full h-full object-cover rounded"
       loading="lazy"
     />
   </div>
   ```

   **Thumbnail Images (Below the fold) - React:**
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

   **Thumbnail Images (Below the fold) - Astro:**
   ```astro
   <div class="w-16 md:w-20 h-16 md:h-20 flex items-center justify-center flex-shrink-0 overflow-hidden rounded">
     <img
       src={expansionShadowRealmImage.src}
       alt="[Item name] thumbnail"
       class="w-full h-full object-cover"
       loading="lazy"
     />
   </div>
   ```

   **Note**: Both frameworks use the same image attributes (`loading`, `alt`), but:
   - React uses `className` and direct image variable
   - Astro uses `class` and `.src` property on image variable

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

9. **Maintain responsive design and framework syntax**:
    - Keep existing responsive classes (md:, lg:, etc.)
    - Use correct attribute name: `className` for React, `class` for Astro
    - Use correct image syntax: direct variable for React, `.src` property for Astro
    - Ensure images work on both mobile and desktop

10. **Output**:
    - Confirm the assets have been integrated
    - Mention the framework detected (React or Astro)
    - List the component file that was modified
    - Summarize what assets were integrated:
      - Number of images integrated
      - Types of assets (logo, hero, products, thumbnails)
      - Any missing assets from assets-list.md
    - Provide next steps:
      - Run `npm run dev` to see the page with images
      - Review the page to ensure images display correctly

## Asset Integration Patterns

### React Import Pattern (src/App.tsx)
```tsx
// CSS imports
import './App.css'

// Asset imports (relative path from src/ to docs/assets/)
import logoImage from '../docs/assets/logo.png'
import heroImage from '../docs/assets/hero-card-animation.webp'
import packStarterImage from '../docs/assets/pack-starter.webp'
import packLegendsImage from '../docs/assets/pack-legends.webp'

// Component definition
function Page0001() {
  // ...
}
```

### Astro Import Pattern (src/pages/landing.astro)
```astro
---
// Asset imports (relative path from src/pages/ to docs/assets/)
import logoImage from '../../docs/assets/logo.png'
import heroImage from '../../docs/assets/hero-card-animation.webp'
import packStarterImage from '../../docs/assets/pack-starter.webp'
import packLegendsImage from '../../docs/assets/pack-legends.webp'
---

<html lang="en">
  <!-- Template content here -->
</html>
```

**Path differences**:
- From `src/App.tsx`: use `../docs/assets/`
- From `src/pages/*.astro`: use `../../docs/assets/` (one more level up)

### Logo Replacement Pattern

**Before (React):**
```tsx
<div className="text-xl md:text-2xl font-bold text-[#e94560]">
  TCG LOGO
</div>
```

**After (React):**
```tsx
<div className="flex items-center">
  <img src={logoImage} alt="TCG Logo" className="h-10 md:h-12" />
</div>
```

**Before (Astro):**
```astro
<div class="text-xl md:text-2xl font-bold text-[#e94560]">
  TCG LOGO
</div>
```

**After (Astro):**
```astro
<div class="flex items-center">
  <img src={logoImage.src} alt="TCG Logo" class="h-10 md:h-12" />
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
# Auto-detect component file and apply assets
/apply-required-assets

# Apply assets to React component
/apply-required-assets src/App.tsx

# Apply assets to Astro page
/apply-required-assets src/pages/landing.astro

# Apply assets to Astro index page
/apply-required-assets src/pages/index.astro

# Apply assets to React page component
/apply-required-assets src/components/Page0001.tsx
```

## Workflow Example

1. Designer creates wireframe: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`
2. Run `/create-page-from-wireframe 0001` to create component with placeholders
3. Run `/create-required-assets-list 0001` to generate asset requirements
4. Designer/developer creates and places assets in `docs/assets/`
5. **Run `/apply-required-assets`** to integrate assets into component
6. Review page with `npm run dev`

## Important Notes

- **Framework Support**: Works with both React (.tsx) and Astro (.astro) files
- **Auto-detection**: Component file and framework are auto-detected if not specified
- **Image syntax difference**:
  - React: `<img src={logoImage} />` (direct variable)
  - Astro: `<img src={logoImage.src} />` (use `.src` property)
- **Attribute difference**: React uses `className`, Astro uses `class`
- **Read assets-list.md first**: Contains mapping between wireframe elements and required assets
- **Context-aware replacement**: Use surrounding HTML/text to determine which asset matches which placeholder
- **Graceful handling**: If an asset is missing, leave the placeholder and note it in the output
- **Preserve styling**: Keep all existing Tailwind CSS classes and responsive design
- **Alt text quality**: Write meaningful, descriptive alt text for accessibility
- **Loading strategy**: Follow performance recommendations (eager for above-fold, lazy for below-fold)
- **Maintain structure**: Don't change the component structure, only replace placeholders
- **Asset discovery**: Check actual files in docs/assets, don't assume based on assets-list.md alone
- **Relative paths**:
  - From `src/App.tsx`: use `../docs/assets/`
  - From `src/pages/*.astro`: use `../../docs/assets/`
  - Adjust based on component depth

## Framework Differences Summary

| Feature | React | Astro |
|---------|-------|-------|
| File extension | `.tsx` | `.astro` |
| Class attribute | `className` | `class` |
| Image import | `import img from '...'` | `import img from '...'` (same) |
| Image usage | `src={img}` | `src={img.src}` |
| Import location | Top of file | Frontmatter (`---`) |
| Import path from src/ | `../docs/assets/` | `../docs/assets/` |
| Import path from src/pages/ | N/A | `../../docs/assets/` |

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
