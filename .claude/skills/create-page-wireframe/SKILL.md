---
name: create-page-wireframe
description: Creates SVG wireframe images for page designs based on specifications or existing web pages
argument-hint: "[specification] [url]"
disable-model-invocation: true
---

# Create Page Wireframe

You are a wireframe designer. Your task is to create an SVG wireframe image based on the developer's specification or by analyzing an existing web page.

## Instructions

1. **Parse arguments**:
   - First argument: specification (optional) - Text description of the page to create
   - Second argument: url (optional) - URL of an existing web page to reference
   - Examples:
     - `"Create a landing page for TCG"` - Specification only
     - `"Create a landing page for TCG" "https://example.com"` - Specification with URL reference
     - `"" "https://example.com"` - URL only, no specification
     - No arguments - Ask for specification

2. **If URL is provided**:

   a. **Fetch the web page**:
      - Use the WebFetch tool to retrieve the web page content
      - Prompt: "Analyze this web page's layout, structure, sections, colors, typography, and key design elements. Provide a detailed breakdown of the page structure from top to bottom."

   b. **Analyze the page structure**:
      - Identify main sections (header, hero, features, content sections, footer)
      - Note layout patterns (single column, multi-column, grid, flex)
      - Observe section order from top to bottom
      - Identify navigation patterns
      - Note content hierarchy

   c. **Extract design elements**:
      - **Colors**: Extract primary background, text, and accent colors from the analysis
      - **Typography**: Note font families, sizes, and weights used
      - **Spacing**: Observe padding and margins between sections
      - **Components**: Identify cards, buttons, forms, images, icons
      - **Grid systems**: Note column counts and layouts

   d. **Create wireframe based on the page**:
      - Replicate the section structure and order
      - Use similar layout patterns (grid columns, flex direction)
      - Apply similar color scheme to the wireframe
      - Match the visual hierarchy
      - Keep section proportions similar
      - Include the same types of components (cards, buttons, forms, etc.)
      - Add section labels that match the actual page sections

   e. **Combine with specification** (if provided):
      - Use the URL page as the base structure
      - Modify according to specification requirements
      - Keep the layout structure but adapt content/sections as specified

3. **If URL is NOT provided**:

   **Understand the specification**: Read and analyze the specification provided by the developer. If no specification is provided, ask the developer for details about:
   - Page ID (a 4-digit number identifier for this page, e.g., "0001", "0002", "0003")
   - Page type (landing page, dashboard, form, etc.)
   - Key sections or components needed
   - Layout structure (header, sidebar, main content, footer, etc.)
   - Important UI elements (navigation, buttons, forms, cards, etc.)

4. **Design the wireframe**: Create a clean, professional wireframe that includes:
   - Clear visual hierarchy
   - Proper spacing and alignment
   - Labeled sections (use text labels)
   - Placeholder elements (rectangles for images, lines for text, etc.)
   - If URL was provided: Match the color scheme from the analyzed page
   - If URL was NOT provided: Use standard wireframe conventions (gray/black color scheme)

5. **SVG specifications**:
   - Use a viewBox of "0 0 1200 800" for desktop layouts or adjust based on the specification/analyzed page
   - Use a clean, minimal style with:
     - **If URL provided**: Use colors extracted from the analyzed page (backgrounds, text, accents, borders)
     - **If URL NOT provided**: Use standard wireframe colors (white/light gray #f5f5f5, dark gray #333, light gray #ddd)
     - Text: black or dark gray (or match analyzed page)
     - Fill: white or light gray for components (or match analyzed page)
   - Include proper labels for sections
   - Use standard wireframe elements (boxes, lines, circles for icons)
   - Adjust viewBox height to match the analyzed page structure if URL was provided

6. **File naming and directory structure**:
   - Create directory: `docs/wireframes/{NNNN}/`
   - Save the wireframe in that directory: `docs/wireframes/{NNNN}/{page-name}-wireframe.svg`
   - Where {NNNN} is the 4-digit page ID (e.g., 0001, 0002, 0003)
   - Example directory: `docs/wireframes/0001/`
   - Example file: `docs/wireframes/0001/login-page-wireframe.svg`
   - Example: `docs/wireframes/0002/dashboard-wireframe.svg`
   - Create the directory if it doesn't exist

7. **Output**: After creating the wireframe:
   - Confirm the file has been created with its page ID
   - Provide a brief description of the wireframe structure
   - If URL was provided: Mention that the wireframe was based on the analyzed page
   - Mention the file path where it was saved
   - Clearly state the page ID so it can be referenced by subsequent skills

## Example Wireframe Structure

A typical wireframe should include:
- Header with logo and navigation
- Main content area with clear sections
- Sidebar (if applicable)
- Footer with links
- Proper annotations and labels

## Tips for Good Wireframes

- Keep it simple and focused on structure, not detailed design
- Use consistent spacing (grid-based layout)
- Label all major sections clearly
- Show hierarchy through size and positioning
- Use standard UI patterns the developer would recognize
- When analyzing a URL, focus on structure and layout, not exact content
- Extract and apply the design system (colors, spacing, typography) from the analyzed page

## Usage Examples

### Example 1: Create wireframe from specification only

```bash
/create-page-wireframe "Create a landing page for a TCG with hero section, features grid, and product cards"
```

**Result**: Creates a wireframe based purely on the specification, using standard wireframe colors.

### Example 2: Create wireframe based on existing web page

```bash
/create-page-wireframe "" "https://stripe.com"
```

**Result**: Analyzes Stripe's homepage, extracts structure, sections, colors, and creates a wireframe that mimics the design.

### Example 3: Create wireframe with specification AND reference URL

```bash
/create-page-wireframe "Create a SaaS landing page with pricing table" "https://vercel.com"
```

**Result**: Uses Vercel's homepage structure and design system as a base, but adapts it to include a pricing table as specified.

### Example 4: Create wireframe from no arguments (interactive)

```bash
/create-page-wireframe
```

**Result**: Claude will ask for specification details interactively.

## When to Use URL Reference

**Use URL reference when**:
- You want to replicate an existing page's structure
- You want to use a similar design system (colors, spacing)
- You're creating a page inspired by an existing site
- You want to see how a well-designed page handles similar content

**Don't use URL reference when**:
- You want complete creative freedom
- The referenced page is significantly different from your needs
- You prefer standard wireframe conventions
- The URL requires authentication (WebFetch won't work)

## URL Analysis Guidelines

When a URL is provided, the skill will:

1. **Fetch the page** using WebFetch tool
2. **Extract structure**: Header, hero, main sections, footer
3. **Extract colors**: Background, text, accent, border colors
4. **Extract typography**: Font families, sizes, weights
5. **Extract layouts**: Grid columns, flex patterns, spacing
6. **Extract components**: Buttons, cards, forms, navigation patterns
7. **Create wireframe**: Replicate the structure with extracted design elements

**Important Notes**:
- The wireframe is a simplified representation, not an exact copy
- Focus is on structure and layout patterns
- Content is generalized (text becomes placeholders)
- Complex interactions are simplified to static wireframes
- Some details may be omitted for clarity

## Examples of What Gets Extracted

From analyzing a URL like `https://tailwindcss.com`:

**Structure**:
- Header with logo and navigation
- Hero section with headline and CTAs
- Feature grid (3 columns)
- Code example section
- Footer with links

**Colors**:
- Background: `#0f172a` (dark)
- Accent: `#38bdf8` (cyan)
- Text: `#f1f5f9` (light)

**Typography**:
- Headings: System fonts, bold, 36-48px
- Body: System fonts, regular, 16-18px

**Layouts**:
- 3-column grid for features
- 2-column split for hero
- Full-width sections

These elements are then used to create a wireframe that feels similar to the original page but focuses on structure and layout rather than exact visual replication.
