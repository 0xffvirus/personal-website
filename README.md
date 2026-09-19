# Bahaa Najjar — Personal Portfolio

A responsive, bilingual single-page portfolio built with HTML, CSS, and vanilla JavaScript for SWE363 Assignment 1. It follows `guide.md`, `docs/design-docs.md`, and `docs/website-structure.md`: floating navigation → hero → projects → about and skills → contact → footer.

## Run locally

No installation, build step, API key, or backend is required. Open `index.html` (Arabic, the default) or `en.html` (English) directly, or serve the folder:

```sh
cd /path/to/assignment1
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://127.0.0.1:4173. Stop the server with Ctrl+C.

## Features

- Shared monochrome design tokens, expressive typography, original SVG project illustrations, and responsive two-column cards.
- Accessible mobile navigation, active section indicators, smooth anchor navigation, and expandable project notes.
- Arabic (`index.html`, the default page) and English (`en.html`), with a section-preserving language switch and local Thmanyah Sans regular/medium/bold fonts for Arabic.
- The supplied portrait in About, staggered hero entrance, scroll reveals, and subtle hover motion. Reduced-motion preferences turn animation off.
- Labeled contact fields with inline JavaScript validation, keyboard focus on the first error, and accessible status announcements.
- Reduced-motion support and usable navigation/project notes without JavaScript.
- Direct email, GitHub, and LinkedIn links.

The form is a **frontend-only demo**. It does not send or store any information. “Check message” validates the fields; email contact opens the visitor’s mail application.

## Content and project images

Both pages now contain the five projects from Bahaa’s supplied résumé: Fix My Bad Resume, Sanad, Unis Market, Refit: Reset Your Life, and Last Trial. About includes a personal introduction, degree and university, three professional roles, and technical skills. Education dates, spoken-language proficiency, awards/certifications, and the contact phone number are intentionally omitted. The site uses the project destinations embedded in the résumé. The résumé itself is not copied into the public website.

Real screenshots live in `assets/images/projects/`. The pages load responsive WebP variants; original PNGs are retained only as sources. See [the image guide](assets/images/projects/README.md) for filenames and regeneration instructions.

To replace a cover, replace its source PNG and regenerate the WebP variants with `scripts/optimize_screenshots.py` (Python with Pillow required only for regeneration). Update both locales' alt text, and update `src`/`srcset` if changing filenames. Use a source at least 1600px wide; the card displays a 4:3 crop.

Project facts, links, and translations are kept in the HTML files. Keep both languages synchronized when editing. Shared styles are in `css/styles.css`; interactions are in `js/script.js`.

## Files

- `index.html` — Arabic page (default) with `lang="ar"` and `dir="rtl"`
- `en.html` — English page and editable content
- `css/styles.css` — design tokens, components, responsive rules
- `js/script.js` — navigation, project disclosures, localized form checks, language links, and scroll reveals
- `assets/images/` — local SVG covers, favicon, and the supplied `bahaa.png` portrait
- `assets/font/` — pre-existing Thmanyah font assets; English uses the specified system-font fallback
- `docs/technical-documentation.md` — implementation and verification
- `docs/ai-usage-report.md` — transparent AI assistance report

## AI use

OpenAI Codex assisted with interpreting the provided documents, implementing the site, creating SVG illustrations, checking behavior, and drafting documentation. See the [AI usage report](docs/ai-usage-report.md). Review and modify the output and describe your own learning before submitting it; the report does not claim that this personal review has already happened.

## Submission and publication

The site is ready for static hosting, but has not been published. Create the public repository using the assignment’s `id-name-assignment1` naming convention once the student ID is available, review the résumé-derived content, replace the project image placeholders, and confirm font licensing, then commit and submit the repository link. No repository was created and no remote changes were made during this build.
