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
     |-----------|-------|---------------|-----------|-----------|
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

8. **Report completion**:
   - List the total number of images converted
   - Note that original PNG/JPEG files have been removed
   - If the directory is `public/images/` or similar web-serving directory, remind the user to update HTML/CSS references from `.png`/`.jpg` to `.webp`

## Quality Guidelines

| Quality | Use Case | Typical Reduction |
|---------|----------|-------------------|
| 90-100  | Photography, high-detail images | 50-70% |
| 75-85   | General web images (recommended default) | 80-95% |
| 50-70   | Thumbnails, background textures | 90-97% |

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

Original files have been removed. To update your HTML/CSS references:
- Change `.png` extensions to `.webp`
- Change `.jpg`/`.jpeg` extensions to `.webp`
```
