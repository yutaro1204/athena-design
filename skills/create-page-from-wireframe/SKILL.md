---
name: create-page-from-wireframe
description: Creates an actual HTML/React/Astro page based on a wireframe SVG file
argument-hint: '[wireframe-id] [framework] [output-path]'
disable-model-invocation: true
---

# Create Page from Wireframe

You are a frontend developer. Your task is to implement an actual HTML page based on an existing wireframe SVG file. This skill supports both React and Astro frameworks.

## Instructions

1. **Parse the arguments**:
   - First argument: wireframe ID (4-digit number like "0001", "0002", "0003", required)
   - Second argument: framework - "react" or "astro" (optional, will auto-detect if not provided)
   - Third argument: output file path (optional, uses framework defaults if not provided)
   - Examples:
     - `0001` - Auto-detect framework, use default path
     - `0001 react` - React framework, outputs to `src/App.tsx`
     - `0001 astro` - Astro framework, outputs to `src/pages/[page-name].astro`
     - `0001 astro src/pages/custom.astro` - Astro with custom path
   - If no wireframe ID is provided, ask the developer for the 4-digit wireframe ID

2. **Auto-detect framework** (if not explicitly provided):
   - Check for `astro.config.mjs` or `astro.config.ts` → Astro
   - Check for React imports in existing files → React
   - Check `package.json` for "astro" dependency → Astro
   - Default to React if unclear
   - Inform the user which framework was detected

3. **Find the wireframe file**:
   - Search for the wireframe file in `docs/wireframes/{NNNN}/` with the pattern `*-wireframe.svg`
   - Example: For ID "0001", look for `docs/wireframes/0001/*-wireframe.svg`
   - Extract the page name from the wireframe filename (e.g., "tcg-landing-page" from "tcg-landing-page-wireframe.svg")
   - If no matching file is found, inform the user and stop
   - If multiple files match (shouldn't happen), use the first one

4. **Analyze the wireframe**:
   - Read the SVG wireframe file
   - Identify all major sections and components:
     - Header (logo, navigation)
     - Hero section (main content area)
     - Feature sections
     - Forms (inputs, buttons)
     - Cards or grid layouts
     - Footer
   - Note the text labels, layout structure, and visual hierarchy
   - Pay attention to spacing, alignment, and component placement

5. **Determine output path**:
   - If output path provided as third argument, use it
   - Otherwise, use framework defaults:
     - **React**: `src/App.tsx`
     - **Astro**: `src/pages/[page-name].astro` (e.g., `src/pages/tcg-landing-page.astro`)

6. **Implement the page** (framework-specific):

   ### For React:
   - Create a React component (e.g., `Page0001` for wireframe ID 0001)
   - Use modern React patterns with TypeScript
   - Export the component as default
   - If updating `src/App.tsx`, replace default Vite content with the new component
   - Use proper semantic HTML elements

   ### For Astro:
   - Create an Astro component file
   - Use Astro's frontmatter section (`---`) at the top for any logic/imports
   - Write the template directly (no function wrapper needed)
   - Use proper semantic HTML elements
   - Astro components are HTML-first with optional JSX-like syntax

   ### Common for both:
   - Use Tailwind CSS utility classes for styling
   - Follow the wireframe structure exactly
   - Maintain the same sections and hierarchy
   - Use similar spacing and alignment
   - Replace placeholder text with appropriate content
   - Implement responsive design with mobile-first approach (breakpoint: 768px)

7. **Styling guidelines with Tailwind CSS**:
   - Extract colors from the wireframe SVG and use Tailwind's arbitrary values (e.g., `bg-[#1a1a2e]`)
   - Use Tailwind utility classes for spacing, typography, and layout
   - Implement responsive design with `md:` prefix for desktop (≥768px)
   - Add hover states with `hover:` prefix for interactive elements
   - Ensure good contrast for readability
   - Use Tailwind's built-in classes when possible, arbitrary values for custom colors

8. **Output**:
   - Confirm the page has been implemented
   - Mention the framework used (React or Astro)
   - Mention the wireframe ID and output file path
   - List the file(s) that were created or modified
   - Provide a brief summary of the implemented features
   - For Astro: Mention the route where the page will be accessible (e.g., `/tcg-landing-page`)
   - Suggest how to view the page (e.g., "Run `npm run dev` to see the page")

## Example Component Structures

### React Component (src/App.tsx)

```tsx
function Page0001() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e] text-[#e0e0e0]">
      <header className="px-4 md:px-12 py-4 md:py-6 border-b-2 border-[#0f3460] flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#e94560]">Logo</h1>
        <nav className="flex gap-4 md:gap-8">{/* Navigation items */}</nav>
      </header>
      <main className="flex-1">{/* Main content sections */}</main>
      <footer className="px-4 md:px-12 py-6 md:py-8 bg-[#16213e] border-t-2 border-[#0f3460]">
        {/* Footer content */}
      </footer>
    </div>
  )
}

export default Page0001
```

### Astro Component (src/pages/landing-page.astro)

```astro
---
// Optional: Add any imports or logic here
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Landing Page</title>
  </head>
  <body>
    <div class="min-h-screen flex flex-col bg-[#1a1a2e] text-[#e0e0e0]">
      <header
        class="px-4 md:px-12 py-4 md:py-6 border-b-2 border-[#0f3460] flex justify-between items-center"
      >
        <h1 class="text-xl md:text-2xl font-bold text-[#e94560]">Logo</h1>
        <nav class="flex gap-4 md:gap-8">
          <!-- Navigation items -->
        </nav>
      </header>
      <main class="flex-1">
        <!-- Main content sections -->
      </main>
      <footer class="px-4 md:px-12 py-6 md:py-8 bg-[#16213e] border-t-2 border-[#0f3460]">
        <!-- Footer content -->
      </footer>
    </div>
  </body>
</html>
```

## Usage Examples

```bash
# Auto-detect framework and use default path
/create-page-from-wireframe 0001

# Explicitly use React framework
/create-page-from-wireframe 0001 react

# Explicitly use Astro framework
/create-page-from-wireframe 0001 astro

# Astro with custom output path
/create-page-from-wireframe 0001 astro src/pages/landing.astro

# React with custom output path
/create-page-from-wireframe 0002 react src/pages/Home.tsx

# No argument - will prompt for wireframe ID
/create-page-from-wireframe
```

## Important Notes

- **Framework Support**: Works with both React and Astro frameworks
- **Auto-detection**: Framework is auto-detected if not specified
- **Wireframe ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- **Tailwind CSS**: Both frameworks use Tailwind CSS v4, use utility classes for all styling
- **Responsive Design**: Implement mobile-first with `md:` prefix for desktop (≥768px)
- **Color Extraction**: Extract exact colors from wireframe SVG (e.g., `#1a1a2e`, `#e94560`)
- **React specifics**: Use `className`, JSX syntax, export default
- **Astro specifics**: Use `class`, include `<html>` wrapper, frontmatter for logic
- Stay faithful to the wireframe design and structure
- Don't add features that aren't shown in the wireframe
- Use placeholder text/images that match wireframe labels
- Make the code readable and maintainable
- Add comments for complex sections if needed
- Reference wireframe file for design accuracy

## Framework Differences

| Feature         | React              | Astro                         |
| --------------- | ------------------ | ----------------------------- |
| File extension  | `.tsx`             | `.astro`                      |
| Default path    | `src/App.tsx`      | `src/pages/[page-name].astro` |
| Class attribute | `className`        | `class`                       |
| Comments        | `{/* comment */}`  | `<!-- comment -->`            |
| Structure       | Function component | HTML with frontmatter         |
| Routing         | Manual/library     | File-based (automatic)        |
