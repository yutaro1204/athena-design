---
name: generate-pencil-images
description: Generates or regenerates AI images for nodes in the selected Pencil (.pen) design frame
disable-model-invocation: true
---

# Generate Pencil Images

You are a design tools specialist. Your task is to generate or regenerate AI images for image nodes within the currently selected Pencil (.pen) design frame using the Pencil MCP tools.

## Instructions

1. **Get the editor state and identify the target frame**:
   - Call `get_editor_state` to get the active `.pen` file and current selection
   - Use the currently selected node from the editor state as the target frame
   - If no `.pen` file is open, inform the user to open one and stop
   - If no frame is selected, inform the user to select a frame in the Pencil editor and stop
   - Report the frame name and ID that will be processed

2. **Read the target frame and discover image nodes**:
   - Use `batch_get` with the target frame ID to read its full node tree:
     - Set `readDepth: 5` to traverse deeply nested nodes
     - Set `resolveInstances: true` to expand component instances and see image fills inside them
   - Identify all nodes that have an image fill: `fill: { type: "image", url: "..." }`
   - Also identify nodes that should have images but have no fill (e.g., empty image placeholder frames)
   - For each image node, record:
     - The node ID (use the full path for nodes inside component instances, e.g., `instanceId/childId`)
     - The node name (used to generate a descriptive prompt)
     - The node dimensions (width, height)
     - Any existing image URL (to detect if regeneration is needed)
   - Report the total number of image nodes found
   - If no image nodes are found, inform the user and stop

3. **Determine image prompts from context**:
   - For each image node, derive an appropriate AI image generation prompt based on:
     - The **node name** (e.g., "Hero Background", "Card Modern Chair", "Category Furniture")
     - The **surrounding text content** in sibling or parent nodes (e.g., a card title "Modern Chair" next to the image)
     - The **overall design theme** visible from the frame (e.g., furniture store, tech product, landing page)
   - Craft prompts that are specific and descriptive, following these guidelines:
     - Include the subject matter: what the image should depict
     - Include style keywords: "3D rendered", "studio lighting", "minimalist", "professional photography"
     - Include mood/atmosphere: "clean", "modern", "warm", "bright"
     - Include background guidance: "white background", "gradient background", "studio backdrop"
   - Present the list of image nodes and their proposed prompts to the user for review before generating
   - Example prompts:
     - Logo: `"Modern minimalist furniture brand logo, clean typography, simple geometric mark"`
     - Hero background: `"Modern interior design showroom, minimalist furniture display, warm ambient lighting, soft gradient background"`
     - Product card: `"3D rendered modern minimalist chair, studio lighting, clean white background, product photography"`
     - Category image: `"Elegant modern furniture collection, curated display, professional interior photography"`

4. **Generate images one by one**:
   - **IMPORTANT**: Generate each image individually using a separate `batch_design` call with a single `G()` operation
   - This is required because image generation takes time and batching multiple `G()` operations can cause timeouts
   - For each image node:
     ```
     G("{nodeId}", "ai", "{prompt}")
     ```
   - If the node is inside a component instance, use the full path:
     ```
     G("{instanceId}/{childId}", "ai", "{prompt}")
     ```
   - After each generation, report which image was completed (e.g., "Generated 3/15: Card Modern Chair")
   - If a generation fails, log the error and continue with the remaining images

5. **Verify generated images**:
   - After all images are generated, take a screenshot of the target frame using `get_screenshot`
   - Visually inspect the screenshot to verify:
     - All image nodes have been filled with generated images
     - Images match the intended content (e.g., a chair image in a chair card)
     - No obvious visual artifacts or misalignment
   - Report any issues found

6. **Convert generated images to WebP**:
   - The `G()` operation saves generated images as PNG files in the `pencil/images/` directory (e.g., `pencil/images/generated-*.png`)
   - Check that `cwebp` is available (`which cwebp`). If not, inform the user to install it (`brew install webp` on macOS) and stop
   - Convert all newly generated PNG files in `pencil/images/` to WebP:
     ```bash
     cd pencil/images && for f in *.png; do [ -f "$f" ] && cwebp -q 80 "$f" -o "${f%.png}.webp"; done
     ```
   - Verify all WebP files were created successfully
   - Remove the original PNG files after successful conversion:
     ```bash
     cd pencil/images && for f in *.webp; do
       base="${f%.webp}"
       [ -f "${base}.png" ] && rm "${base}.png"
     done
     ```

7. **Update image references in design.pen**:
   - After converting to WebP, the image fill URLs in the `.pen` file still reference `.png` files
   - Re-read the image nodes from step 2 to get their current fill URLs
   - For each image node, update the fill URL from `.png` to `.webp` using `batch_design` `U()` operations:
     ```
     U("{nodeId}", {fill: {type: "image", url: "./images/generated-XXXXX.webp"}})
     ```
   - Process updates in batches of up to 25 per `batch_design` call

8. **Report completion**:
   - List the total number of images generated
   - List any images that failed to generate
   - Note the frame ID and name that was processed
   - Confirm images are stored as WebP in `pencil/images/`
   - Example output:

     ```
     Generated 15 images in frame "Desktop" (KnmED):

     | # | Node | Prompt | Status |
     |---|------|--------|--------|
     | 1 | Logo | Modern minimalist brand logo... | OK |
     | 2 | Hero BG | Interior design showroom... | OK |
     | 3 | Card 1 | 3D rendered modern chair... | OK |
     | ... | ... | ... | ... |

     All images generated successfully.
     Converted 15 images to WebP in pencil/images/ (originals removed).
     Updated 15 image references in design.pen (.png → .webp).
     ```

## Image Generation Best Practices

### Prompt Structure

```
[Subject] + [Style] + [Lighting] + [Background] + [Mood]
```

### Common Prompt Templates

| Image Type        | Template                                                                                |
| ----------------- | --------------------------------------------------------------------------------------- |
| Product shot      | `"3D rendered {product}, studio lighting, clean white background, product photography"` |
| Hero background   | `"Modern {theme} scene, {atmosphere}, soft gradient background, wide composition"`      |
| Category image    | `"{Category} collection display, professional photography, curated arrangement"`        |
| Logo              | `"Modern minimalist {brand} logo, clean typography, simple geometric mark"`             |
| Icon/illustration | `"Flat design {subject} icon, minimal style, solid background"`                         |
| Person/portrait   | `"Professional portrait, {description}, studio lighting, neutral background"`           |
| Landscape         | `"Beautiful {scene}, professional photography, vibrant colors, wide aspect ratio"`      |

### Image Type Detection

Determine image type from node context:

| Context Clue                                     | Image Type                 |
| ------------------------------------------------ | -------------------------- |
| Node named "logo" or in header area              | Logo                       |
| Node named "hero" or full-width at top           | Hero background            |
| Node inside a card component                     | Product/content card image |
| Node named "cat-_" or "category-_"               | Category image             |
| Node named "new-\*" or in "new releases" section | New product/release image  |
| Node with small dimensions (< 100px)             | Icon or thumbnail          |

## Important Notes

- **Images are stored as WebP in `pencil/images/`** — the `G()` operation initially saves as PNG, but this skill converts them to WebP and updates the `.pen` file references
- **Use Pencil MCP tools exclusively** — never use `Read` or `Grep` on `.pen` files
- **Generate images one at a time** — each `G()` operation should be in its own `batch_design` call to avoid timeouts
- **Use `"ai"` type** for G() operations — this generates images via AI rather than searching stock photos
- **Node paths for component instances** — when a node is inside a component instance, use the slash-separated path (e.g., `"instanceId/imageNode"`)
- **Existing images are overwritten** — if a node already has an image fill, the new generation will replace it
- The `G()` operation applies the generated image as a fill to the specified frame/rectangle node
- There is no separate "image" node type in Pencil — images are fills on frame or rectangle nodes
- **Requires `cwebp`** — install with `brew install webp` on macOS if not available

## Usage Examples

```bash
# 1. Open the .pen file in Pencil editor
# 2. Select the frame you want to generate images for
# 3. Run the skill
/generate-pencil-images
# 4. Review proposed prompts
# 5. Images are generated one by one
# 6. Verify via screenshot
```
