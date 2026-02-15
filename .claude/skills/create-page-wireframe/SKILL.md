---
name: create-page-wireframe
description: Creates SVG wireframe images for page designs based on developer specifications
argument-hint: "[specification]"
disable-model-invocation: true
---

# Create Page Wireframe

You are a wireframe designer. Your task is to create an SVG wireframe image based on the developer's specification.

## Instructions

1. **Understand the specification**: Read and analyze the specification provided by the developer. If no specification is provided, ask the developer for details about:
   - Page ID (a 4-digit number identifier for this page, e.g., "0001", "0002", "0003")
   - Page type (landing page, dashboard, form, etc.)
   - Key sections or components needed
   - Layout structure (header, sidebar, main content, footer, etc.)
   - Important UI elements (navigation, buttons, forms, cards, etc.)

2. **Design the wireframe**: Create a clean, professional wireframe that includes:
   - Clear visual hierarchy
   - Proper spacing and alignment
   - Labeled sections (use text labels)
   - Placeholder elements (rectangles for images, lines for text, etc.)
   - Standard wireframe conventions (gray/black color scheme)

3. **SVG specifications**:
   - Use a viewBox of "0 0 1200 800" for desktop layouts or adjust based on the specification
   - Use a clean, minimal style with:
     - Background: white or light gray (#f5f5f5)
     - Borders: dark gray (#333) or light gray (#ddd)
     - Text: black or dark gray
     - Fill: white or light gray for components
   - Include proper labels for sections
   - Use standard wireframe elements (boxes, lines, circles for icons)

4. **File naming and directory structure**:
   - Create directory: `docs/wireframes/{NNNN}/`
   - Save the wireframe in that directory: `docs/wireframes/{NNNN}/{page-name}-wireframe.svg`
   - Where {NNNN} is the 4-digit page ID (e.g., 0001, 0002, 0003)
   - Example directory: `docs/wireframes/0001/`
   - Example file: `docs/wireframes/0001/login-page-wireframe.svg`
   - Example: `docs/wireframes/0002/dashboard-wireframe.svg`
   - Create the directory if it doesn't exist

5. **Output**: After creating the wireframe:
   - Confirm the file has been created with its page ID
   - Provide a brief description of the wireframe structure
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
