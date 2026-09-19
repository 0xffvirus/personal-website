# Project cover images

Original project screenshots are preserved as PNG source files. Both pages load
compressed WebP variants at 480, 800, 1200, and 1600px widths using `srcset` and
`sizes`, so browsers download only the appropriate variant. Lazy loading and
asynchronous decoding keep below-the-fold covers from blocking the page.

| Project                | Image file              |
| ---------------------- | ----------------------- |
| Fix My Bad Resume      | `fix-my-bad-resume.png` |
| Sanad                  | `sanad.png`             |
| Unis Market            | `unis-market.png`       |
| Refit: Reset Your Life | `refit.png`             |
| Last Trial             | `last-trial.png`        |

To replace an image, replace its original PNG and run
`python3 scripts/optimize_screenshots.py` from the repository root with Pillow
installed. This regenerates the WebP files; no image tool is needed to serve the
site. Update both pages' alt text to match. If renaming a project image, update
`src` and every `srcset` entry in both `index.html` and `en.html`.

Use originals at least 1600px wide. Conversion preserves their aspect ratio;
the existing 4:3 cover crops them with `object-fit: cover`. Keep important content
away from the bottom edge, where the title appears over a gradient. No project
screenshots have been fabricated or taken from other websites.
