---
name: create-page-from-pencil
description: Implements a responsive Astro/React page from a Pencil (.pen) design file
argument-hint: '[pen-file] [framework] [output-path]'
disable-model-invocation: true
---

# Create Page from Pencil

You are a frontend developer. Your task is to implement a responsive HTML page from a Pencil (.pen) design file, extracting all design data (layout, typography, colors, images) and producing production-ready code with Tailwind CSS.

## Instructions

1. **Parse the arguments**:
   - First argument: path to .pen file (optional, defaults to `pencil/design.pen`)
   - Second argument: framework - "react" or "astro" (optional, will auto-detect if not provided)
   - Third argument: output file path (optional, uses framework defaults if not provided)
   - Examples:
     - (no args): Uses `pencil/design.pen`, auto-detect framework, default output
     - `pencil/design.pen`: Explicit pen file, auto-detect framework
     - `pencil/design.pen astro`: Pen file with Astro framework
     - `pencil/design.pen react src/App.tsx`: Pen file, React, custom output path
   - If the pen file does not exist, inform the user and stop

2. **Auto-detect framework** (if not explicitly provided):
   - Check for `astro.config.mjs` or `astro.config.ts` → Astro
   - Check for React imports in existing files → React
   - Check `package.json` for "astro" dependency → Astro
   - Default to React if unclear
   - Inform the user which framework was detected

3. **Open and explore the .pen file**:
   - Call `get_editor_state` to check if the .pen file is already open
   - If not open, call `open_document` with the pen file path
   - Call `batch_get` with no patterns to list top-level frames on the canvas
   - Identify the **page frames** — these are the main design screens (e.g., "3D Model Landing - Desktop", "3D Model Landing - Mobile")
   - Identify any **reusable components** (nodes with `reusable: true`)
   - Note the page frame IDs, widths, and names

4. **Analyze the desktop screen**:
   - Call `batch_get` on the desktop page frame with `readDepth: 3` and `resolveInstances: true`
   - For each section, extract:
     - **Layout**: `layout` (vertical/horizontal), `gap`, `padding`, `justifyContent`, `alignItems`
     - **Dimensions**: `width`, `height` (note `fill_container` and `fit_content` values)
     - **Colors**: `fill` (backgrounds), text `fill` (text colors), `stroke` (borders)
     - **Typography**: `fontSize`, `fontWeight`, `fontFamily`, `textAlign`
     - **Content**: All text `content` values
     - **Images**: Any `fill` with `type: "image"` — note the `url` paths
     - **Icons**: Any `icon_font` nodes — note `iconFontFamily` and `iconFontName`
   - Build a section map: Header → Hero → Content sections → Footer
   - If sections are truncated with `"..."`, do additional `batch_get` calls on those node IDs

5. **Analyze the mobile screen**:
   - Call `batch_get` on the mobile page frame with `readDepth: 3` and `resolveInstances: true`
   - Compare against the desktop screen to identify responsive differences:
     - Which sections are present vs. absent on mobile
     - Layout changes (horizontal → vertical stacking)
     - Grid column count changes (e.g., 3-col → 1-col)
     - Typography size changes (e.g., 42px → 28px headings)
     - Padding/gap changes (e.g., 40px → 16px padding)
     - Navigation changes (e.g., fewer nav links on mobile)
   - Document the responsive delta for each section

6. **Extract and copy images**:
   - From the design analysis, collect all image URLs (e.g., `./images/generated-*.png`)
   - These images exist in the project's `images/` directory (relative to the .pen file)
   - Create the `public/images/` directory (for Astro) or appropriate static directory
   - Copy each image to the public directory with a descriptive name:
     - Logo: `logo.png`
     - Hero background: `hero-bg.png`
     - Card images: `card-{title-slug}.png`
     - Category images: `cat-{name-slug}.png`
     - Other section images: `{section}-{description}.png`
   - If an image is square but contains horizontal content (e.g., a logo), crop whitespace using `sips` to match the design aspect ratio
   - Record the mapping from design node → public image path

7. **Determine the responsive breakpoint**:
   - Compare the desktop and mobile frame widths from the design
   - Desktop width ≥ 1024px → use `lg:` prefix (1024px breakpoint)
   - Desktop width ≥ 768px but < 1024px → use `md:` prefix (768px breakpoint)
   - Default to `lg:` if unclear
   - Mobile styles are the base (no prefix), desktop styles use the prefix

8. **Update the layout file**:
   - **Astro**: Edit `src/layouts/Layout.astro`
   - **React**: Edit the root layout or `index.html`
   - Changes to make:
     - Update `<title>` to match the page name from the design
     - Add Google Fonts `<link>` for fonts used in the design (e.g., Inter)
     - Add CSS variables in the `<style>` block for the design's color palette
     - Add font utility class in `@layer base` (e.g., `.font-primary`)
   - Example for Astro:
     ```html
     <link rel="preconnect" href="https://fonts.googleapis.com" />
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
     <link
       href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
       rel="stylesheet"
     />
     ```
     ```css
     @import 'tailwindcss';
     :root {
       --color-bg-alt: #f5f5f5;
       --color-text-secondary: #666666;
     }
     @layer base {
       .font-primary {
         font-family: 'Inter', sans-serif;
       }
     }
     ```

9. **Implement the page**:

   Use mobile-first Tailwind CSS with the determined breakpoint prefix.

   **General rules**:
   - Base styles (no prefix) = mobile layout
   - `{prefix}:` styles = desktop layout
   - Use `hidden {prefix}:block` (or `{prefix}:flex`) for desktop-only sections
   - Use `{prefix}:hidden` for mobile-only elements

   **Section-by-section implementation**:

   For each section identified in step 4, create the corresponding HTML:

   a. **Header**: `flex justify-between items-center` with responsive height, padding, and nav visibility
   b. **Hero**: Background image via `style="background-image: url(...)"` with `bg-cover bg-center`, overlay div for text contrast, responsive text sizes
   c. **Card grids**: `grid grid-cols-1 {prefix}:grid-cols-{n}` with responsive gap, card inner structure matching the design (image area + info area)
   d. **Category cards**: `relative` container with `<img>` and overlay `<div>` with `bg-black/25`
   e. **Feature sections**: Icon circles using inline SVGs with responsive sizing
   f. **CTA sections**: Full-width colored background with centered content
   g. **Footer**: Multi-column layout with responsive visibility

   **Data-driven approach**:
   - Extract repeated content (cards, categories, footer columns) into arrays in the frontmatter/script section
   - Use `.map()` to render repeated elements
   - Include image paths in the data arrays

   **Framework-specific syntax**:

   | Element         | Astro                        | React                        |
   | --------------- | ---------------------------- | ---------------------------- |
   | Class attribute | `class`                      | `className`                  |
   | Comments        | `<!-- -->`                   | `{/* */}`                    |
   | Iteration       | `{items.map(item => (...))}` | `{items.map(item => (...))}` |
   | Inline style    | `style="..."`                | `style={{...}}`              |
   | File extension  | `.astro`                     | `.tsx`                       |

10. **Map Pen properties to Tailwind classes**:

    ### Layout Mapping

    | Pen Property                      | Tailwind Class                        |
    | --------------------------------- | ------------------------------------- |
    | `layout: "vertical"`              | `flex flex-col`                       |
    | `layout: "horizontal"`            | `flex flex-row` or `flex`             |
    | `gap: 20`                         | `gap-5` or `gap-[20px]`               |
    | `padding: [40, 16]`               | `py-10 px-4` or `py-[40px] px-[16px]` |
    | `padding: 10`                     | `p-[10px]`                            |
    | `justifyContent: "center"`        | `justify-center`                      |
    | `justifyContent: "space_between"` | `justify-between`                     |
    | `justifyContent: "space_around"`  | `justify-around`                      |
    | `alignItems: "center"`            | `items-center`                        |
    | `width: "fill_container"`         | `w-full` or `flex-1`                  |
    | `height: "fit_content"`           | `h-fit`                               |

    ### Typography Mapping

    | Pen Property           | Tailwind Class |
    | ---------------------- | -------------- |
    | `fontSize: 42`         | `text-[42px]`  |
    | `fontSize: 32`         | `text-[32px]`  |
    | `fontSize: 24`         | `text-2xl`     |
    | `fontSize: 18`         | `text-lg`      |
    | `fontSize: 16`         | `text-base`    |
    | `fontSize: 14`         | `text-sm`      |
    | `fontSize: 12`         | `text-xs`      |
    | `fontSize: 10`         | `text-[10px]`  |
    | `fontWeight: "bold"`   | `font-bold`    |
    | `fontWeight: "normal"` | `font-normal`  |
    | `textAlign: "center"`  | `text-center`  |

    ### Color Mapping

    | Pen Property                              | Tailwind Class                   |
    | ----------------------------------------- | -------------------------------- |
    | `fill: "#ffffff"` (on frame)              | `bg-white` or `bg-[#ffffff]`     |
    | `fill: "#000000"` (on text)               | `text-black` or `text-[#000000]` |
    | `fill: "#f5f5f5"` (on frame)              | `bg-[#f5f5f5]`                   |
    | `fill: "#666666"` (on text)               | `text-[#666666]`                 |
    | `fill: "#00000044"` (overlay)             | `bg-black/25`                    |
    | `stroke: {fill: "#000000", thickness: 1}` | `border border-black`            |
    | `stroke: {fill: "#000000", thickness: 2}` | `border-2 border-black`          |

    ### Image Mapping

    | Pen Property                                   | HTML                                                        |
    | ---------------------------------------------- | ----------------------------------------------------------- |
    | `fill: {type: "image", url: "..."}` on section | `style="background-image: url(...)"` + `bg-cover bg-center` |
    | `fill: {type: "image", url: "..."}` on card    | `<img src="..." class="w-full h-full object-cover">`        |

    ### Icon Mapping

    | Pen Icon                   | Implementation                           |
    | -------------------------- | ---------------------------------------- |
    | `iconFontName: "check"`    | Inline SVG: `<path d="M20 6 9 17l-5-5">` |
    | `iconFontName: "zap"`      | Inline SVG: Lucide zap path              |
    | `iconFontName: "infinity"` | Inline SVG: Lucide infinity path         |
    | `iconFontName: "star"`     | Inline SVG: Lucide star path             |

11. **Format and verify**:
    - Run `npm run format` (or `npx prettier --write`) to ensure code style compliance
    - Run `npm run dev` to start the development server
    - Verify the page loads without errors (HTTP 200)
    - Verify all images are served correctly
    - Check desktop layout matches the design (all sections present, correct columns, typography)
    - Check mobile layout matches the design (stacked columns, correct visibility, smaller text)

12. **Output**:
    - Confirm the page has been implemented
    - Mention the framework used (React or Astro)
    - Mention the .pen file and output file path
    - List the file(s) created or modified
    - List all images copied to the public directory
    - Summarize the responsive behavior:
      - Which sections are visible on mobile vs. desktop
      - Key layout changes (grid columns, stacking direction)
      - Typography scaling
    - Suggest running `npm run dev` to view the page

## Responsive Implementation Pattern

### Mobile-First Approach

Base styles define mobile layout. Desktop overrides use the breakpoint prefix:

```html
<!-- Mobile: single column, Desktop: 3 columns -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
  <!-- Mobile: stacked, Desktop: side-by-side -->
  <div class="flex flex-col lg:flex-row lg:justify-around">
    <!-- Mobile: smaller text, Desktop: larger text -->
    <h1 class="text-[28px] lg:text-[42px] font-bold">
      <!-- Mobile: tighter padding, Desktop: wider padding -->
      <section class="px-4 lg:px-10 py-[30px] lg:py-10">
        <!-- Desktop-only section -->
        <section class="hidden lg:flex flex-col">
          <!-- Mobile-only element -->
          <span class="lg:hidden">Mobile text</span>
          <span class="hidden lg:inline">Desktop text</span>
        </section>
      </section>
    </h1>
  </div>
</div>
```

### Responsive Delta Extraction

Compare desktop and mobile frames in the design to determine:

| Property          | How to Extract                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Breakpoint prefix | Desktop frame width ≥ 1024 → `lg:`, ≥ 768 → `md:`                                                |
| Hidden sections   | Sections present in desktop but absent in mobile → `hidden {prefix}:block`                       |
| Grid columns      | Count children in horizontal layouts: mobile=1, desktop=N → `grid-cols-1 {prefix}:grid-cols-{N}` |
| Typography scale  | Compare `fontSize` values between desktop and mobile text nodes                                  |
| Padding scale     | Compare `padding` arrays between desktop and mobile section frames                               |
| Nav visibility    | Compare header nav children count: hide extras with `hidden {prefix}:block`                      |

## Image Extraction Workflow

1. **Identify images in the design**: Look for `fill: {type: "image", url: "..."}` properties
2. **Locate source files**: Images are stored relative to the .pen file (e.g., `./images/generated-*.png`)
3. **Create public directory**: `mkdir -p public/images/`
4. **Copy with descriptive names**: Map generated filenames to semantic names
5. **Handle square logos**: If a logo image is square (1:1) but displayed in a wide frame, crop whitespace:
   ```bash
   sips --cropToHeightWidth {height} {width} --cropOffset {top} 0 input.png --out output.png
   ```
6. **Reference in HTML**: Use `/images/{name}.png` paths (Astro serves from `public/`)

## Data-Driven Content Pattern

Extract repeated elements into data arrays for clean rendering:

### Astro Example

```astro
---
import Layout from '../layouts/Layout.astro'

const cards = [
  { title: 'Card 1', meta: 'Category | $49', image: '/images/card-1.png' },
  { title: 'Card 2', meta: 'Category | $89', image: '/images/card-2.png' },
]

const categories = [
  { name: 'Category A', count: '450+ items', image: '/images/cat-a.png' },
  { name: 'Category B', count: '320+ items', image: '/images/cat-b.png' },
]
---

<Layout>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {
      cards.map((card) => (
        <div class="border border-black bg-white flex flex-col p-[10px] pb-0">
          <div class="h-[200px] lg:h-[240px] border border-black overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col justify-end gap-1 p-[10px] flex-1">
            <span class="text-lg font-bold text-black">{card.title}</span>
            <span class="text-sm text-[#666666]">{card.meta}</span>
          </div>
        </div>
      ))
    }
  </div>
</Layout>
```

### React Example

```tsx
const cards = [
  { title: 'Card 1', meta: 'Category | $49', image: '/images/card-1.png' },
  { title: 'Card 2', meta: 'Category | $89', image: '/images/card-2.png' },
]

export default function Page() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.title} className="border border-black bg-white flex flex-col p-[10px] pb-0">
          <div className="h-[200px] lg:h-[240px] border border-black overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-end gap-1 p-[10px] flex-1">
            <span className="text-lg font-bold text-black">{card.title}</span>
            <span className="text-sm text-[#666666]">{card.meta}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## Category Card with Image Overlay Pattern

```html
<div class="relative h-[120px] lg:h-[180px] border border-black overflow-hidden">
  <img
    src="{image}"
    alt="{name}"
    class="absolute inset-0 w-full h-full object-cover"
    loading="lazy"
  />
  <div class="absolute inset-0 bg-black/25 flex flex-col items-center justify-center gap-2">
    <span class="text-base lg:text-lg font-bold text-white drop-shadow-md">{name}</span>
    <span class="text-xs lg:text-sm text-white drop-shadow-md">{count}</span>
  </div>
</div>
```

## Hero Section with Background Image Pattern

```html
<section
  class="relative flex flex-col items-center justify-center h-[400px] lg:h-[500px] px-4 lg:px-10 bg-cover bg-center"
  style="background-image: url('/images/hero-bg.png');"
>
  <div class="absolute inset-0 bg-black/20"></div>
  <h1 class="relative text-[28px] lg:text-[42px] font-bold text-white text-center drop-shadow-lg">
    Title Text
  </h1>
  <p class="relative text-[13px] lg:text-base text-white text-center drop-shadow-lg">
    Description text
  </p>
</section>
```

## Usage Examples

```bash
# Auto-detect framework, use pencil/design.pen
/create-page-from-pencil

# Explicit pen file
/create-page-from-pencil pencil/design.pen

# Astro framework
/create-page-from-pencil pencil/design.pen astro

# React with custom output
/create-page-from-pencil pencil/design.pen react src/App.tsx

# Custom pen file path
/create-page-from-pencil designs/landing.pen astro src/pages/landing.astro
```

## Workflow Example

1. Designer creates wireframe: `docs/wireframes/0001/landing-wireframe.svg`
2. Run `/create-pencil-design 0001 1200` to generate desktop Pencil frame
3. Run `/create-pencil-design 0001 375` to generate mobile Pencil frame
4. Refine design in Pencil editor (add images, adjust layout, etc.)
5. **Run `/create-page-from-pencil pencil/design.pen astro`** to implement the page
6. Review at `http://localhost:4321/` and iterate

**Typical file output:**

```
public/
  images/
    logo.png
    hero-bg.png
    card-{name}.png (per card)
    cat-{name}.png (per category)
    new-{name}.png (per new release)
src/
  layouts/
    Layout.astro (updated with fonts and CSS variables)
  pages/
    index.astro (full responsive page)
```

## Important Notes

- **Pencil MCP Tools**: Use Pencil MCP tools exclusively for reading .pen files — never use `Read` or `Grep` on .pen files
- **resolveInstances**: When calling `batch_get`, set `resolveInstances: true` to see full component instance content instead of just `ref` nodes
- **Image URLs**: Design images use relative paths like `./images/generated-*.png` — these exist in the project's `images/` directory relative to the .pen file
- **Image Cropping**: Square images displayed in rectangular frames need cropping before use in HTML — check image dimensions with `sips` or `file` command
- **Font Family**: Map `fontFamily: "Inter"` to Google Fonts Inter; map `fontFamily: "Arial"` to Inter as well
- **Text Visibility**: In the design, text nodes have a `fill` property for color — map this to Tailwind `text-{color}` classes
- **Tailwind v4**: Use `@import 'tailwindcss';` in CSS — do NOT create `tailwind.config.js` or use old `@tailwind` directives
- **Mobile-First**: Base (unprefixed) styles = mobile, prefixed styles = desktop
- **Color Fidelity**: Extract exact hex colors from the design — do not approximate
- **Content Fidelity**: Use exact text content from the design — do not rephrase
- **Section Completeness**: Only include sections present in the respective screen (mobile design may omit sections like Footer, CTA, etc.)
- **Overlay Patterns**: For text over images, use `relative` parent + `absolute inset-0` overlay with semi-transparent background
- **Lazy Loading**: Add `loading="lazy"` to images below the fold

## Implementation Checklist

- [ ] .pen file opened and explored with Pencil MCP tools
- [ ] Desktop screen fully analyzed (all sections, properties, images)
- [ ] Mobile screen fully analyzed (responsive differences documented)
- [ ] All images extracted from design and copied to `public/images/`
- [ ] Square images cropped to match design aspect ratio
- [ ] Layout file updated (title, fonts, CSS variables)
- [ ] Page implemented with mobile-first Tailwind CSS
- [ ] All sections from desktop design present
- [ ] Desktop-only sections hidden on mobile (`hidden {prefix}:block`)
- [ ] Typography sizes match design for both breakpoints
- [ ] Grid column counts match design for both breakpoints
- [ ] Padding and spacing match design proportionally
- [ ] All text content matches design exactly
- [ ] All images referenced correctly and loading
- [ ] Icons implemented as inline SVGs matching design
- [ ] Color scheme matches design exactly
- [ ] Code formatted with Prettier
- [ ] Page loads without errors on dev server
- [ ] Desktop layout verified at full width
- [ ] Mobile layout verified at narrow width
