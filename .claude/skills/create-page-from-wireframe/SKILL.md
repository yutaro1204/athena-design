---
name: create-page-from-wireframe
description: Creates an actual HTML/React page in App.tsx based on a wireframe SVG file
argument-hint: "[page-id]"
disable-model-invocation: true
---

# Create Page from Wireframe

You are a frontend developer. Your task is to implement an actual HTML/React page in App.tsx based on an existing wireframe SVG file.

## Instructions

1. **Get the page ID**:
   - If a 4-digit page ID is provided (e.g., "0001", "0002"), use it
   - If no ID is provided, ask the developer for the 4-digit page ID

2. **Find the wireframe file**:
   - Search for the wireframe file in `docs/wireframes/` with the pattern `{NNNN}-*-wireframe.svg`
   - Example: For ID "0001", look for `docs/wireframes/0001-*-wireframe.svg`
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
   - Create a new React component for the page (e.g., `Page0001` for ID 0001)
   - Implement the layout using modern React patterns
   - Use inline styles or CSS-in-JS since the project doesn't have Tailwind CSS
   - Follow the wireframe structure exactly:
     - Maintain the same sections and hierarchy
     - Use similar spacing and alignment
     - Implement all UI elements shown in the wireframe
   - Replace placeholder text with appropriate content based on the labels in the wireframe
   - Use proper semantic HTML elements (header, nav, main, section, footer, etc.)
   - Make the design responsive if the wireframe suggests it
   - Use TypeScript types where appropriate

5. **Update App.tsx**:
   - Add the new page component to `src/App.tsx`
   - If this is the first page, replace the default Vite content with the new page
   - If there are multiple pages, implement a simple routing mechanism or state-based view switching
   - Keep the code clean and well-organized

6. **Styling guidelines**:
   - Use a consistent color scheme (you can use modern, professional colors)
   - Implement proper spacing and padding
   - Make buttons and interactive elements clearly visible
   - Use appropriate font sizes and weights for hierarchy
   - Add hover states for interactive elements
   - Ensure good contrast for readability

7. **Output**:
   - Confirm the page has been implemented
   - Mention the page ID and component name
   - List the file(s) that were modified
   - Provide a brief summary of the implemented features
   - Suggest how to view the page (e.g., "Run `npm run dev` to see the page")

## Example Component Structure

```tsx
function Page0001() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid #ddd' }}>
        <h1>Logo</h1>
        <nav>{/* Navigation items */}</nav>
      </header>
      <main style={{ flex: 1 }}>
        {/* Main content sections */}
      </main>
      <footer style={{ padding: '2rem', background: '#f5f5f5' }}>
        {/* Footer content */}
      </footer>
    </div>
  );
}
```

## Important Notes

- Stay faithful to the wireframe design and structure
- Don't add features that aren't shown in the wireframe
- Use placeholder images from services like placeholder.com if needed
- Make the code readable and maintainable
- Add comments for complex sections if needed
- Ensure the TypeScript types are correct
