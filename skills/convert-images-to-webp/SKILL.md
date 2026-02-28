---
name: convert-images-to-webp
description: Converts PNG and JPEG images to WebP format for optimized file sizes
argument-hint: '[directory] [quality]'
disable-model-invocation: true
---

# Convert Images to WebP

You are a build tools specialist. Your task is to convert PNG and JPEG images to WebP format for significantly reduced file sizes while maintaining visual quality.

## Instructions

1. **Parse the arguments**:
   - First argument: directory path containing images (optional, defaults to current working directory)
   - Second argument: quality level 0-100 (optional, defaults to 80)
   - Examples:
     - (no args): Converts images in the current working directory with quality 80
     - `public/images`: Converts images in `public/images/` with quality 80
     - `public/images 90`: Converts images in `public/images/` with quality 90
     - `images 75`: Converts images in `images/` with quality 75
   - If the directory does not exist, inform the user and stop

2. **Check for `cwebp` tool availability**:
   - Run `which cwebp` to verify it is installed
   - If not found, inform the user and suggest installation:
     - macOS: `brew install webp`
     - Ubuntu/Debian: `sudo apt-get install webp`
     - Fedora: `sudo dnf install libwebp-tools`
   - Stop if `cwebp` is not available

3. **Discover source images**:
   - Use Glob to find all PNG files (`*.png`) in the target directory
   - Use Glob to find all JPEG files (`*.jpg`, `*.jpeg`) in the target directory
   - Report the number of images found for each format
   - If no images are found, inform the user and stop

4. **Convert images**:
   - For each PNG file, run: `cwebp -q {quality} "{input}.png" -o "{input}.webp"`
   - For each JPEG file, run: `cwebp -q {quality} "{input}.jpg" -o "{input}.webp"`
   - Process all files in a single batch using a shell loop for efficiency:

     ```bash
     # PNG conversion
     cd {directory} && for f in *.png; do [ -f "$f" ] && cwebp -q {quality} "$f" -o "${f%.png}.webp"; done

     # JPEG conversion (.jpg)
     cd {directory} && for f in *.jpg; do [ -f "$f" ] && cwebp -q {quality} "$f" -o "${f%.jpg}.webp"; done

     # JPEG conversion (.jpeg)
     cd {directory} && for f in *.jpeg; do [ -f "$f" ] && cwebp -q {quality} "$f" -o "${f%.jpeg}.webp"; done
     ```

   - Use a timeout of 300000ms (5 minutes) for large batches

5. **Verify conversion results**:
   - Count the number of WebP files created
   - Compare against the number of source images to confirm all were converted
   - If any conversions failed, report which files failed

6. **Report size comparison**:
   - Calculate total size of original PNG/JPEG files using `du -ch`
   - Calculate total size of generated WebP files using `du -ch`
   - Calculate the percentage reduction
   - Present results in a summary table:

     | Directory | Files | Original Size | WebP Size | Reduction |
     | --------- | ----- | ------------- | --------- | --------- |
     | {dir}     | {n}   | {size}        | {size}    | {pct}%    |

7. **Remove original files**:
   - After confirming all conversions succeeded (WebP count matches source count), delete the original PNG/JPEG files:
     ```bash
     cd {directory} && for f in *.webp; do
       base="${f%.webp}"
       [ -f "${base}.png" ] && rm "${base}.png"
       [ -f "${base}.jpg" ] && rm "${base}.jpg"
       [ -f "${base}.jpeg" ] && rm "${base}.jpeg"
     done
     ```
   - Only delete a source file if its corresponding `.webp` file exists
   - If any conversions failed in step 5, do **not** delete those failed source files — only delete sources that were successfully converted

8. **Update image references in source files**:
   - Search the `src/` directory for references to the converted image filenames with their original extensions
   - Use Grep to find all occurrences of `.png`, `.jpg`, and `.jpeg` references that match converted files
   - For each source file containing references:
     - Read the file
     - Replace each original extension with `.webp`:
       - `{filename}.png` → `{filename}.webp`
       - `{filename}.jpg` → `{filename}.webp`
       - `{filename}.jpeg` → `{filename}.webp`
     - This covers all reference patterns:
       - HTML: `<img src="/images/photo.png" />` → `<img src="/images/photo.webp" />`
       - CSS/inline styles: `background-image: url('/images/hero.jpg')` → `background-image: url('/images/hero.webp')`
       - Astro frontmatter: `image: '/images/card.png'` → `image: '/images/card.webp'`
       - React/TypeScript imports: `import img from '../images/logo.png'` → `import img from '../images/logo.webp'`
   - Also search in CSS files (`src/**/*.css`) and layout files (`src/layouts/`)
   - Report how many files were updated and which references were changed

9. **Report completion**:
   - List the total number of images converted
   - Note that original PNG/JPEG files have been removed
   - List the source files where image references were updated
   - If no references were found in source files, note that no reference updates were needed

## Quality Guidelines

| Quality | Use Case                                 | Typical Reduction |
| ------- | ---------------------------------------- | ----------------- |
| 90-100  | Photography, high-detail images          | 50-70%            |
| 75-85   | General web images (recommended default) | 80-95%            |
| 50-70   | Thumbnails, background textures          | 90-97%            |

## Important Notes

- Original PNG/JPEG files are **deleted** after successful conversion. Only files with a confirmed corresponding `.webp` output are removed.
- WebP files are created in the **same directory** as the source files.
- If a `.webp` file already exists for a source image, it will be **overwritten**.
- The `cwebp` tool handles both lossy (JPEG-like) and lossless (PNG-like) compression. Quality parameter controls lossy compression level.
- For lossless conversion (exact pixel match, larger files), the user can specify quality as `lossless` — in that case use `cwebp -lossless` instead of `-q`.

## Example Output

```
Converted 15 images in public/images/:

| Directory       | Files | Original Size | WebP Size | Reduction |
|-----------------|-------|---------------|-----------|-----------|
| public/images/  | 15    | 18 MB         | 644 KB    | ~96%      |

Original files have been removed.

Updated image references in 2 source files:
- src/pages/index.astro: 15 references updated (.png → .webp)
- src/layouts/Layout.astro: 1 reference updated (.png → .webp)
```
