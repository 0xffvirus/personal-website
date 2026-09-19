# Technical documentation

## Architecture

Two static locale pages with no dependencies or build pipeline, each following the same single-page section structure. HTML owns all content so that the portfolio remains readable if JavaScript is unavailable. CSS owns the shared design system and breakpoints; JavaScript progressively enhances navigation, native details disclosures, and contact validation.

The section order follows `website-structure.md`. There is one H1, H2 headings for major sections, and H3 headings for project titles and the toolkit. Projects appear before the longer biography.

## Design implementation

`css/styles.css` centralizes semantic colors, spacing, radii, shadows, typography, timing, container widths, and layers. Content has a maximum width of 1120px. A separate 1280px decorative frame and 720px floating navigation are documented component variants. Cards use a 4:3 aspect ratio, 24px corners, and a dark gradient behind white captions. Their original SVG artwork is intentionally illustrative, not evidence of a shipped product.

English uses the system sans-serif fallback permitted by the design reference. The Arabic version is the default page at `index.html` and uses the supplied local Thmanyah Sans regular, medium, and bold WOFF2 assets. It sets `lang="ar"` and `dir="rtl"`, restores natural Arabic letter spacing, mirrors directional arrows, and isolates Latin email and technology text. English lives at `en.html`. Real language links work without JavaScript; the shared script preserves the current section in their destinations. Confirm licensing before publishing font files.

Below 768px, the layout stacks and the menu becomes a nonmodal disclosure. From 768px, projects, about, and contact use two columns. From 1024px, section spacing increases and the name/email fields sit side by side. Long content wraps naturally. Reduced-motion CSS turns off smooth scrolling, hover transforms, and transitions. Hero children enter with staggered delays; an IntersectionObserver animates sections once as they enter the viewport using the Web Animations API. Nothing is hidden pending scroll. A reduced-motion preference change disconnects the animation observer and cancels active animations.

## Interaction behavior

- Header links scroll to sections. An IntersectionObserver sets `aria-current="location"` on the current section’s navigation link.
- The mobile menu exposes `aria-expanded`/`aria-controls`, closes on navigation, outside click, focus leaving the header, or Escape. Escape restores focus. It is a nonmodal disclosure, so no focus trap or page lock is appropriate.
- Following a navigation link places focus on the destination section. Anchor spacing accounts for the fixed header.
- Project cover links open matching native `details` notes. Details work without JavaScript and direct fragment navigation opens them on load.
- The current year is updated automatically.

## Contact form and privacy

All three fields are required; values consisting only of whitespace fail validation. Email format uses the browser’s `type=email` constraint. Name, email, and message have maximum lengths of 100, 254, and 5000 characters respectively. Each field is associated with its inline error text. The shared JavaScript selects English or Arabic required-field errors, email feedback, length feedback, and validity status from the document language. Invalid submission focuses the first invalid field and updates a polite status region. Input remains intact in both invalid and valid states.

Valid state means only that local checks passed. There is no delivery service, simulated network request, artificial loading state, persistence, or analytics. Network/submission failure states are not applicable to this frontend demo. The submit button is disabled until JavaScript enables the local handler, preventing an accidental default submission without JavaScript. The direct `mailto:` link is the real contact alternative.

## Content provenance

- Name and complete email address were supplied by Bahaa during implementation.
- KFUPM software engineering, Dhahran, and listed programming/design tools are grounded in the supplied [GitHub profile](https://github.com/0xffvirus).
- The requested [LinkedIn identity](https://sa.linkedin.com/in/0xbahaa) was found and matched to Bahaa Najjar.
- The biography wording is a draft for Bahaa to review, with no invented work history, dates, performance metrics, testimonials, or availability claims.
- The initial project samples have now been replaced with five résumé-sourced projects; only the cover images remain placeholders.

## Verification

Checks completed in the Codex in-app browser on September 18, 2026:

| Check                                      | Result                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| 360, 390, 768, 1024, 1440px viewports      | No horizontal overflow; project grid switches from one to two columns at 768px |
| Local images                               | Both SVG covers load with reserved dimensions                                  |
| Mobile menu                                | Opens, closes, reports expanded state, and restores focus on Escape            |
| Mobile navigation                          | Closes the menu and moves focus to the destination section                     |
| Project notes                              | Cover link opens matching notes; Enter toggles the focused summary             |
| Empty form                                 | All three errors appear; first invalid field receives focus                    |
| Whitespace name and malformed email        | Both rejected with field-specific feedback                                     |
| Valid form                                 | Validity-only message; all entered content preserved; no delivery claim        |
| No JavaScript (temporary script-free copy) | Mobile navigation visible, anchors work, no overflow at 360px, submit disabled |
| Keyboard entry                             | First Tab exposes the skip-to-content link with visible focus                  |
| Browser console                            | No warnings or errors observed                                                 |
| Static paths                               | Local images/fonts and fragment links exist; IDs are unique                    |
| JavaScript syntax                          | `node --check js/script.js` passes                                             |

Visual review covered desktop and mobile hero/project/contact layouts. A focus-scroll margin was added to form controls to keep fields clear of the fixed header. Formatting was checked with Prettier. Reduced-motion behavior was verified by source inspection, not OS emulation. Separate Safari/Firefox runs, screen-reader testing, and actual 200% browser/text zoom remain manual checks; the viewport tests alone do not prove those cases.

## Remaining owner tasks

Replace project image placeholders; review the résumé-derived copy and translations; confirm font asset licensing before public distribution; create the correctly named repository with the student ID; make meaningful commits and submit the repository link. Hosting and a backend were not requested or configured.

## Sequential revision verification

The owner requested four changes, performed and previewed in order: remove all eyebrow labels; add `bahaa.png`; add animation; add the Arabic version.

- Confirmed labels were removed from both pages and the portrait loads with the correct dimensions.
- Confirmed hero animation delays of 80ms, 160ms, and 240ms and no observed browser errors.
- Both languages pass overflow checks at 360, 390, 768, 1024, and 1440px.
- Arabic empty submission produces three Arabic errors and focuses the name field. Valid Arabic submission preserves input and explains that nothing was sent.
- Verified switching from Arabic contact to English retains `#contact` and restores `lang="en"`/`dir="ltr"`.
- Verified computed Arabic font is Thmanyah Sans; actual text and diacritics were visually reviewed.
- The original project illustration assets remain sample artwork and contain English interface text. All portfolio UI, descriptions, labels, and validation messages have Arabic equivalents.

## Brand asset update

Both locales now reference the supplied brand PNGs for header, footer, and favicon. Local paths, image dimensions in markup, removal of the old header monogram, and formatting passed static checks. Browser visual verification of this update remains pending: automatic approval review blocked the preview because of the account usage limit. Earlier browser verification above predates this brand update.

## Shared disclosure and tag interactions

Native `details` elements with a direct `summary` and content `div` now share a 320ms height animation. Rapid activation reverses from the current height; closing panels are inert until collapsed. Completion restores automatic height. Resize and reduced-motion preference changes settle the current transition. Native details remain functional without JavaScript. Project-cover and fragment navigation use the same controller.

Project and About tags share a charcoal hover treatment, slight lift, and single shine sweep on precise hover-capable pointers. Reduced-motion mode preserves only the color treatment. Tags remain noninteractive list items. Circular arrow decorations were removed from both project covers in both languages; covers still open their project notes.

A Node-based controller check passed opening, rapid reversal, closing cleanup, reduced-motion state, resize completion, and summary activation. JavaScript syntax and formatting checks passed. Browser visual verification of these latest changes remains pending because of the previously reported browser approval/usage block.

## Résumé-based content update

Source: the owner-supplied `/Users/bahaa/Downloads/main (2).pdf`, a one-page résumé read as text and visually inspected. Its embedded PDF links supplied all five project destinations. These URLs were copied from the source; live destination availability was not checked during this update.

The former samples were replaced with Fix My Bad Resume, Sanad, Unis Market, Refit, and Last Trial in both locales. The existing disclosure controller and tag styles apply to all five. Header branding retains the requested short name; the biography uses Bahaa Mamdouh Najjar. Education includes August 2023–June 2028, with the future end date labeled expected graduation. About includes ByteVectors, KFUPM RoboNexus, and KFUPM VWU roles with source dates and descriptions; all skill categories; Arabic/English proficiency; and both awards/certifications. Contact includes the supplied résumé’s telephone number. Claims such as six-week delivery and 1,000+ participants are sourced to the résumé, not independently audited.

Each cover currently references a clearly labeled SVG placeholder under `assets/images/projects/`. The directory README describes replacing it with a real image and updating both locale paths and alt text. Old concept artwork is not referenced by either page. The source résumé was not copied into the public directory. Browser verification remains pending due to the existing approval/usage block.

## Owner-requested content refinements

The About introduction now focuses on Bahaa’s identity, studies, current role, and interests rather than listing project deliveries. Both language pages omit education dates, spoken-language proficiency, the awards/certifications block, and the contact phone number. The degree/university, professional experience, technical skills, email, and social links remain. These refinements supersede the corresponding résumé-integration decisions above.
