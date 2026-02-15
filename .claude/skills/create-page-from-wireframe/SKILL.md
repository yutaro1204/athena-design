---
name: create-page-from-wireframe
description: Creates an actual HTML/React page in App.tsx based on a wireframe SVG file
argument-hint: "[wireframe-id]"
disable-model-invocation: true
---

# Create Page from Wireframe

You are a frontend developer. Your task is to implement an actual HTML/React page in App.tsx based on an existing wireframe SVG file.

## Instructions

1. **Get the wireframe ID**:
   - Argument: wireframe ID (4-digit number like "0001", "0002", "0003")
   - If no ID is provided, ask the developer for the 4-digit wireframe ID
   - Examples: "0001", "0002", "0015"

2. **Find the wireframe file**:
   - Search for the wireframe file in `docs/wireframes/{NNNN}/` with the pattern `*-wireframe.svg`
   - Example: For ID "0001", look for `docs/wireframes/0001/*-wireframe.svg`
   - If no matching file is found, inform the user and stop
   - If multiple files match (shouldn't happen), use the first one

3. **Analyze the wireframe**:
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

4. **Implement the page**:
   - Create a new React component for the page (e.g., `Page0001` for wireframe ID 0001)
   - Implement the layout using modern React patterns with TypeScript
   - Use Tailwind CSS utility classes for styling (the project has Tailwind CSS configured)
   - Follow the wireframe structure exactly:
     - Maintain the same sections and hierarchy
     - Use similar spacing and alignment
     - Implement all UI elements shown in the wireframe
   - Replace placeholder text with appropriate content based on the labels in the wireframe
   - Use proper semantic HTML elements (header, nav, main, section, footer, etc.)
   - Implement responsive design with mobile-first approach (breakpoint: 768px)
   - Use TypeScript types where appropriate

5. **Update App.tsx**:
   - Add the new page component to `src/App.tsx`
   - If this is the first page, replace the default Vite content with the new page
   - If there are multiple pages, implement a simple routing mechanism or state-based view switching
   - Keep the code clean and well-organized

6. **Styling guidelines with Tailwind CSS**:
   - Extract colors from the wireframe SVG and use Tailwind's arbitrary values (e.g., `bg-[#1a1a2e]`)
   - Use Tailwind utility classes for spacing, typography, and layout
   - Implement responsive design with `md:` prefix for desktop (≥768px)
   - Add hover states with `hover:` prefix for interactive elements
   - Ensure good contrast for readability
   - Use Tailwind's built-in classes when possible, arbitrary values for custom colors

7. **Output**:
   - Confirm the page has been implemented
   - Mention the wireframe ID and component name
   - List the file(s) that were modified
   - Provide a brief summary of the implemented features
   - Suggest how to view the page (e.g., "Run `npm run dev` to see the page")

## Example Component Structure

```tsx
function Page0001() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a2e] text-[#e0e0e0]">
      <header className="px-4 md:px-12 py-4 md:py-6 border-b-2 border-[#0f3460] flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-[#e94560]">Logo</h1>
        <nav className="flex gap-4 md:gap-8">
          {/* Navigation items */}
        </nav>
      </header>
      <main className="flex-1">
        {/* Main content sections */}
      </main>
      <footer className="px-4 md:px-12 py-6 md:py-8 bg-[#16213e] border-t-2 border-[#0f3460]">
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

## Usage Examples

```bash
# Create page from wireframe 0001
/create-page-from-wireframe 0001

# Create page from wireframe 0002
/create-page-from-wireframe 0002

# Create page from wireframe 0015
/create-page-from-wireframe 0015

# No argument - will prompt for wireframe ID
/create-page-from-wireframe
```

## Important Notes

- **Wireframe ID Format**: Always use 4-digit wireframe IDs (0001, 0002, etc.)
- **Tailwind CSS**: The project uses Tailwind CSS v4, use utility classes for all styling
- **Responsive Design**: Implement mobile-first with `md:` prefix for desktop (≥768px)
- **Color Extraction**: Extract exact colors from wireframe SVG (e.g., `#1a1a2e`, `#e94560`)
- Stay faithful to the wireframe design and structure
- Don't add features that aren't shown in the wireframe
- Use placeholder text/images that match wireframe labels
- Make the code readable and maintainable
- Add comments for complex sections if needed
- Ensure the TypeScript types are correct
- Reference wireframe file for design accuracy
