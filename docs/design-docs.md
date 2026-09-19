# Portfolio design and component reference

> Purpose: maintain a consistent, clean visual language throughout design and development. Treat this document as the default specification for every page and reusable component.
>
> Status: proposed implementation system informed by the reference websites. Exact observations are identified separately; unmarked specifications below are intentional recommendations for this portfolio.

## 1. Direction and reference evidence

**Design direction:** soft monochrome minimalism with expressive typography, generous whitespace, rounded controls, subtle depth, and strong project imagery.

References reviewed on September 14, 2026:

- [Rzgfolio portfolio demo](https://rzgfolio.framer.ai/): primary reference for visual identity, work cards, personal introduction, and portfolio structure.
- [Abdulrzaq template storefront](https://abdulrzaq.com/): reference for simpler floating navigation, direct messaging, and a focused conversion path.
- [Mihad case study](https://rzgfolio.framer.ai/projects/mihad-mobility): reference for project introduction, imagery, and problem/solution content.

The review covered desktop screenshots, rendered content, selected computed typography styles, and a project detail page. Mobile layouts, exact animation timings, and all interactive states were not audited. Mobile and interaction specifications in this document are implementation recommendations.

### Observed characteristics

| Area | Reference observation |
| --- | --- |
| Typography | Both sites use Thmanyah Sans; the portfolio uses regular, medium, and bold variants. |
| Desktop type | Portfolio hero name: 112px/156.8px, weight 700. Section headings: 52px/78px, weight 700. Intro copy: 22px/37.4px. Button labels: 16px/19.2px, weight 700. |
| Text colors | Portfolio main text: `#1A1A1A`; intro gray: `#828282`; other supporting text: `#545454`. |
| Composition | Centered hero, large whitespace, pale canvas, thin framing lines, and a two-column work grid. |
| Shape | Pill actions, circular controls, rounded image cards, subtle borders, and diffuse shadows. |
| Imagery | Large colorful project covers; text overlays sit over a darker lower image region. |
| Navigation | Portfolio: floating identity pill and circular menu. Storefront: compact floating navigation bar. |
| Motion | Blur/fade heading reveals were visible during navigation and scrolling; timings were not measured. |

### Desired impression

Calm, confident, thoughtful, approachable, and precise. Typography establishes personality; project evidence establishes credibility.

### Core rules

1. Use neutral UI colors. Let project imagery provide most color.
2. Use spacing and type hierarchy before adding borders, boxes, or decoration.
3. Keep a single dominant action within each local context.
4. Reuse components and tokens across pages; fix shared styling at its source.
5. Make the work easy to reach, read, and understand.
6. Use subtle depth on interactive surfaces; keep content surfaces mostly flat.
7. Use authentic content, project results, portraits, and testimonials.
8. Preserve readability while motion runs and when motion is disabled.

## 2. Source of truth and change rules

- Define tokens centrally in a theme file, global stylesheet, or equivalent design-system layer.
- Components must consume semantic tokens rather than repeat literal values.
- Use shared layout primitives for containers, sections, grids, and text stacks.
- New pages must reuse existing components before introducing new variants.
- A new variant needs a repeatable purpose, a name, documented states, and responsive behavior.
- Avoid one-off font sizes, radii, shadows, and spacing adjustments to make one screen look right.
- If a deliberate exception is necessary, document its scope and reason here.
- Update this reference whenever an approved design-system decision changes.
- Framework and hosting choices do not change these visual rules.

Suggested implementation organization:

```text
styles/
  tokens.css
  globals.css
components/
  layout/     Container, Section, Stack, Grid
  ui/         Button, IconButton, Badge, Field, Accordion
  portfolio/  Header, ProjectCard, SectionHeading, ContactSection
content/
  projects
  profile
```

This is a conceptual structure; adapt names to the application framework.

## 3. Design tokens

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-canvas` | `#F7F7F7` | Main page background |
| `--color-surface` | `#FFFFFF` | Elevated controls, forms, occasional cards |
| `--color-surface-subtle` | `#F0F0F0` | Quiet secondary regions |
| `--color-text` | `#1A1A1A` | Headings and primary content |
| `--color-text-secondary` | `#545454` | Descriptions and body copy |
| `--color-text-muted` | `#6B6B6B` | Small metadata; verify contrast in context |
| `--color-border` | `#E3E3E3` | Decorative separators and surface borders |
| `--color-border-control` | `#858585` | Input boundaries where needed for identification |
| `--color-action` | `#1A1A1A` | Primary button background |
| `--color-action-hover` | `#303030` | Primary button hover |
| `--color-on-action` | `#FFFFFF` | Text on primary actions |
| `--color-focus` | `#1A1A1A` | Focus outline on light surfaces |
| `--color-error` | `#B42318` | Validation feedback |
| `--color-success` | `#216E39` | Successful form status |

Rules:

- Do not introduce decorative brand colors without updating the palette.
- Error and success colors communicate state; pair them with text or icons.
- The reference's `#828282` intro gray is intentionally replaced with darker supporting text for readability.
- A decorative border is not automatically sufficient for an interactive control boundary.
- Check contrast over actual images and translucent surfaces; tokens alone do not guarantee accessibility.
- Dark mode is outside the initial system. If added, define a complete semantic palette rather than invert colors.

### Typography

**Arabic:** Thmanyah Sans, subject to appropriate font licensing and availability. Use the actual font files for supported weights; avoid synthetic bold.

**English:** use one approved companion sans-serif. The final family must be evaluated with the Arabic font before release. Until selected, use a system sans-serif fallback; treat it as provisional.

| Role | Desktop size / line height | Mobile size / line height | Weight |
| --- | --- | --- | --- |
| Hero name | 112px / 1.4 | 64px / 1.4 | 700 |
| Hero statement alternative | 64px / 1.4 | 40px / 1.4 | 700 |
| Section heading | 52px / 1.5 | 32px / 1.5 | 700 |
| Subsection heading | 32px / 1.5 | 24px / 1.5 | 700 |
| Card title | 24px / 1.5 | 22px / 1.5 | 700 |
| Lead copy | 22px / 1.7 | 18px / 1.7 | 400 |
| Body | 18px / 1.8 | 16px / 1.8 | 400 |
| Metadata | 14px / 1.6 | 14px / 1.6 | 400–500 |
| Button | 16px / 1.4 | 16px / 1.4 | 700 |

Rules:

- Use one hero treatment per page: name-led or statement-led.
- Use fluid interpolation between desktop and mobile values where practical.
- Keep Arabic letter spacing normal; do not use Latin-style tracking to force a match.
- Avoid manually extending Arabic words with repeated tatweel characters to fit a layout.
- Preserve space for diacritics; do not crop text with tight fixed-height wrappers.
- Keep body text approximately 55–70 Latin characters wide; use an equivalent comfortable measure for Arabic.
- Limit centered copy to short introductions. Long explanations use the locale's start alignment.
- Semantic heading levels follow document structure, regardless of visual type role.
- Allow natural wrapping; use explicit line breaks only where they work across supported sizes.

### Spacing

Use a 4px base scale:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

| Relationship | Default |
| --- | --- |
| Icon to label | 8px |
| Label to field | 8px |
| Heading to supporting text | 16–24px |
| Related controls | 12–16px |
| Card grid gap | 24px desktop; 20px mobile |
| Section heading to content | 48px desktop; 32px mobile |
| Section vertical padding | 96px desktop; 64px tablet; 48px mobile |
| Hero vertical padding | 128px desktop; 80px mobile, accounting for header |

### Shape and depth

```css
--radius-small: 12px;
--radius-card: 24px;
--radius-pill: 999px;
--shadow-soft: 0 8px 24px rgb(0 0 0 / 6%);
--shadow-control: 0 4px 12px rgb(0 0 0 / 8%);
--shadow-hover: 0 12px 28px rgb(0 0 0 / 10%);
```

- Cards use the same radius throughout the site.
- Buttons and badges use the pill radius; form fields use the small radius.
- Reserve shadows for floating navigation, buttons, and intentional raised surfaces.
- A subtle inset highlight may be used on the primary button, consistently across instances.
- Avoid heavy double shadows, glowing borders, or deep embossed effects.

### Layers

| Token | Value | Use |
| --- | --- | --- |
| `--z-base` | 0 | Normal content |
| `--z-header` | 20 | Floating navigation |
| `--z-backdrop` | 40 | Mobile menu backdrop |
| `--z-overlay` | 50 | Mobile menu or dialog |
| `--z-status` | 60 | Exceptional global status notification |

## 4. Layout and responsive behavior

### Container

- Maximum content width: **1120px**.
- Center with automatic inline margins.
- Inline gutters: **24px mobile**, **32px tablet**, **40px desktop**.
- A reading container may narrow to **720px** for case-study prose.
- Decorative hero imagery may extend beyond the container; text and controls remain aligned to it.
- Never use fixed widths that cause horizontal scrolling.

### Breakpoints

| Range | Layout behavior |
| --- | --- |
| Below 768px | Single-column content, compact type, mobile navigation |
| 768–1023px | Two columns when content remains comfortable; reduced spacing |
| 1024px and above | Full desktop navigation and layout |

These are implementation defaults, not extracted source breakpoints. Adjust only when actual content requires it, and update this document.

### Grid rules

- Work: two equal columns from 768px, one below.
- About: portrait plus biography on desktop, stacked on mobile.
- Services: up to three columns on desktop; stack on mobile.
- Contact: invitation/details plus form on desktop, stacked on mobile.
- Use `minmax(0, 1fr)` or equivalent to prevent long content from forcing overflow.
- DOM order must remain logical without visual rearrangement.

### RTL and localization

- Apply the correct page `lang` and `dir` for each locale.
- Prefer logical CSS: `padding-inline`, `margin-inline`, `inset-inline`, and `text-align: start`.
- Mirror directional arrows and navigation progression where appropriate; do not mirror brand icons or photography.
- Isolate email addresses, URLs, and mixed-direction metadata with appropriate direction handling, such as `bdi`.
- Do not assume Arabic and English headings occupy the same number of lines.
- Test actual localized content, not only translated placeholders.

## 5. Reusable component catalog

### 5.1 Container and Section

**Purpose:** own site-wide alignment and vertical rhythm.

- `Container` variants: standard and reading.
- `Section` variants: default, compact, and hero.
- Components inside a section should not add duplicate outer section spacing.
- Optional separators use a single subtle line; avoid boxing every section.
- Anchor targets account for the floating header with scroll margin.

### 5.2 Header and navigation

**Anatomy:** identity link, navigation links, optional primary contact action.

- Use one compact floating rounded surface with a subtle border and soft shadow.
- Keep identity consistent: name or wordmark; portrait is optional.
- Desktop links: Work, About, Contact. Add more only when there is meaningful content.
- Current location uses a clear text or surface treatment; hover is subtle.
- Mobile uses an accessible menu button with a minimum 44×44px target.
- If the mobile menu is modal, trap focus, support Escape, prevent background interaction, and restore focus on close.
- Expose menu state with `aria-expanded` and `aria-controls`.
- The menu must remain usable with keyboard input and at enlarged text sizes.
- Avoid carrying template purchase badges or platform promotional elements into the portfolio design.

### 5.3 Button and text link

| Variant | Appearance | Use |
| --- | --- | --- |
| Primary | Charcoal fill, white text, subtle depth | Main local action |
| Secondary | White surface, charcoal text, subtle border | Companion action |
| Text | Text with clear hover/focus affordance | Navigation and supporting links |

- Default button minimum height: 52px; horizontal padding: 24px.
- Compact buttons may be 44px tall. Let buttons grow for wrapped text.
- Icons: 20px, with 8px gap; decorative icons are hidden from assistive technology.
- Use anchors for navigation and buttons for actions.
- Avoid nested interactive elements.

Required states:

| State | Behavior |
| --- | --- |
| Default | Variant styling |
| Hover | Slight surface/shadow change; optional 2px upward movement |
| Focus visible | 2px outline with 3px offset, visible against surroundings |
| Pressed | Return to resting position; subtle depth reduction |
| Disabled | Clearly unavailable; prevent activation; do not rely on color alone |
| Loading | Stable width, progress label, duplicate submission prevented |

Use concise, specific labels such as “View project” and “Contact me.”

### 5.4 IconButton

- Minimum target: 44×44px; typical visual size: 48px.
- Circular surface for standalone header controls.
- Use the same icon family and stroke treatment throughout the UI.
- Every icon-only action has an accessible name.
- Do not depend on a hover tooltip to explain essential actions.

### 5.5 Badge

- Small metadata label with a quiet surface or border and pill radius.
- Text: 14px; padding: 4px 12px.
- Use for role, category, availability, or short project metadata.
- Badges are noninteractive unless explicitly implemented as links or filters.
- Avoid rows of decorative badges that repeat nearby text.

### 5.6 Hero

**Anatomy:** optional small label → name or value statement → short introduction → action group → optional genuine credibility detail.

- Center the hero content with a restrained text width.
- Use one H1.
- Introduction: one or two short sentences explaining specialty and value.
- Maximum two adjacent actions: primary contact and secondary work, or reverse according to the page's purpose.
- Keep the first work section discoverable without an unnecessarily tall empty hero.
- Dotted texture and faint framing rails are optional decorative layers at low opacity.
- Background decoration must not affect layout or capture pointer events.
- On mobile, allow actions to wrap; stack full-width actions only when needed.
- Do not show invented client counts, ratings, or availability.

### 5.7 SectionHeading

**Anatomy:** optional eyebrow, heading, optional short description, optional supporting link.

- Variants: centered introduction and start-aligned content heading.
- Prefer start alignment for dense content and case studies.
- Keep heading, description, and action spacing consistent across sections.
- Use one section heading style; do not invent a new style for each topic.

### 5.8 ProjectCard

**Anatomy:** cover image, project title, discipline or summary, optional outcome, navigation affordance.

- Default cover ratio: 4:3.
- Radius: 24px; clip imagery to the card surface.
- Default presentation: title and descriptor over a bottom gradient.
- If a cover cannot support legible text, use the documented caption-below variant; use that variant consistently within the same grid.
- Prefer real interface mockups and product evidence with consistent art direction.
- Overlay text: white title and sufficiently contrasting supporting copy.
- Treat the card as one link to its case study; no nested buttons.
- Hover may scale imagery to 1.02 and adjust the overlay. Preserve card dimensions.
- Focus must be visible around the entire card.
- All essential information and navigation must work without hover.
- Reserve image dimensions to prevent layout shift.
- Use meaningful image alt text where the image adds information; avoid repeating the adjacent title unnecessarily.

Suggested data contract:

```ts
type ProjectSummary = {
  slug: string;
  title: string;
  discipline: string;
  summary: string;
  cover: { src: string; alt: string; width: number; height: number };
  outcome?: string; // Supported by actual project evidence.
  year?: string;
};
```

### 5.9 About and Experience

- Pair one portrait with a concise biography.
- Desktop portrait and copy use a shared top alignment.
- Portrait ratio: 4:5 with the standard card radius.
- Biography explains specialization, approach, and relevant experience.
- Experience entries use consistent fields: role, organization, period, optional short description.
- Prefer restrained rows and separators over a separate shadowed card for every entry.
- Keep dates visually secondary but readable.
- On mobile, stack portrait, biography, then experience in a logical order.

### 5.10 ServiceCard

- Anatomy: title, short outcome-oriented explanation, up to four supporting capabilities.
- Use a consistent surface treatment across all service cards.
- Default: flat content with a subtle separator or border, rather than prominent shadows.
- Three service categories are sufficient for the initial portfolio.
- Avoid repeating the same skill lists in multiple sections.

### 5.11 Testimonial

- Anatomy: quote, person, role/company, optional avatar.
- Use an actual quote with permission and accurate attribution.
- Keep quotes concise; preserve their meaning.
- Use a static grid or stack initially; a carousel is unnecessary for a small number of items.
- If no genuine testimonials are available, omit the section.

### 5.12 Accordion / FAQ

- Optional component; include only if recurring visitor questions justify it.
- Anatomy: question button, expand/collapse icon, answer panel, separator.
- The entire question row is the trigger with a minimum 44px target height.
- Support keyboard activation and expose expanded state and panel relationship.
- Answer text uses body styling and a comfortable reading width.
- Animate height only if it remains reliable with dynamic content; reduced motion opens immediately.
- Document whether multiple items may remain open; default is yes.

### 5.13 FormField

- Variants: text, email, and multiline message.
- Anatomy: persistent label, control, optional help text, error text.
- Minimum control height: 52px; textarea minimum height: 160px.
- White background, control border token, 12px radius, 16px padding.
- Use a minimum 16px input font size.
- Placeholder text provides examples, never replaces the label.
- Required status must be visible and programmatic.
- Associate help/error text with its control; set invalid state when appropriate.
- Preserve entered content after validation or network errors.

### 5.14 ContactSection

- Anatomy: clear invitation, contact method, optional short form.
- Default form fields: name, email, message. Add fields only when necessary.
- Provide a direct email link as an alternative.
- Submit states: idle, validating, submitting, success, and failure.
- Show success only after the delivery service confirms acceptance.
- On failure, explain what happened and provide a retry path.
- Announce status accessibly without repeatedly interrupting the user.
- Do not clear content until successful submission.
- Avoid adding consultation links unless a real booking destination is configured.

### 5.15 Footer

- Include identity, a small navigation set, relevant social links, and copyright.
- Keep visual weight lower than the contact section.
- Use the shared container and spacing scale.
- Social links have readable or accessible names.
- Avoid repeating the full navigation and all calls to action several times.

## 6. Page templates

### Home

```text
Header
Hero
Selected work — 3–4 strong projects
About and relevant experience
Services — up to 3 groups
Testimonials or supported project results — optional
Contact
Footer
```

- The first work section is the main evidence of capability.
- Blog, certificates, logo strips, and FAQs are optional extensions, not mandatory filler.
- Each additional section must answer a visitor question or help them evaluate the work.

### Projects index

- Compact page introduction followed by the shared project grid.
- Reuse the same card component and metadata hierarchy as the homepage.
- Add filters only when the number and diversity of projects make them useful.
- Filters need selected, focus, empty, and reset states.

### Case study

```text
Header
Category, project title, concise summary
Cover image
Metadata: role, scope, duration, collaborators where relevant
Problem and context
Goals and constraints
Research or supporting evidence
Key decisions and design development
Final interfaces with explanatory captions
Outcomes and lessons
Related project
Contact invitation
Footer
```

- Use a reading container for prose and a wider container for interface imagery.
- Explain why a design decision was made, not only what screen was created.
- Separate personal contributions from team contributions.
- Use metrics only when supported; describe qualitative outcomes when measurement is unavailable.
- Identify concept work clearly.
- Optional live-site links must point to the actual project and have an accurate label.
- Do not add empty sections to satisfy the template; adapt it to the evidence available.

## 7. Imagery and art direction

- Use a consistent family of cover compositions across the project grid.
- Prefer a strong focal point, controlled background, and clear crop.
- Use actual product screens wherever they help explain UI/UX work.
- Avoid decorative device mockups that make the interface too small to evaluate.
- Keep critical text inside images legible; include essential explanations as HTML text.
- Use responsive image sizes and modern formats where supported.
- Supply intrinsic width/height or an aspect ratio to prevent layout shifts.
- Prioritize above-the-fold imagery; lazy-load appropriate lower-page images.
- Do not lazy-load the page's primary hero image if it is the main visible content.
- Avoid autoplay video as a prerequisite for understanding a project.
- Use owned or appropriately licensed assets; the reference site's imagery is inspiration for composition.

## 8. Motion and interaction

| Motion | Default specification |
| --- | --- |
| Color / border / opacity state | 160ms ease-out |
| Button or card hover | 200ms ease-out |
| Section reveal | 400ms ease-out, optional 12px upward movement |
| Reveal stagger | 60ms between related items; keep total delay short |
| Image hover zoom | 1.02 scale within a clipped container |

- Animate opacity and transforms where practical.
- Keep motion optional; visible content must not depend on successful JavaScript execution.
- Use reveals sparingly, once per element, without repeated replay during scrolling.
- Avoid long blur effects, scroll hijacking, cursor replacement, and decorative parallax.
- Use smooth anchor scrolling only when reduced motion is not requested.
- Respect `prefers-reduced-motion`: remove translation, scaling, blur, and nonessential animation.
- Hover effects must never be the only path to content or an action.

## 9. Accessibility and resilience

Target WCAG 2.2 AA, with verification against the actual implementation.

- Normal text contrast: at least 4.5:1; large text: at least 3:1.
- Relevant control boundaries, focus indicators, and meaningful graphics need sufficient contrast.
- All functionality is keyboard accessible with a logical focus order.
- Provide a skip link to main content.
- Use semantic landmarks, a clear H1, and properly nested headings.
- Touch targets should be at least 44×44px by this design system's standard.
- Support 200% text zoom and narrow-width reflow without losing content or controls.
- Test long names, long project titles, mixed-direction text, and form errors.
- Do not communicate state only through color, animation, or position.
- Modal overlays manage focus and background interaction.
- Essential content remains available if images or animation fail.
- Do not use empty links, placeholder destinations, or nonfunctional contact actions in production.

## 10. Starter CSS tokens

This establishes the proposed foundation. Map it into the chosen framework rather than maintaining competing token systems.

```css
:root {
  --color-canvas: #f7f7f7;
  --color-surface: #ffffff;
  --color-surface-subtle: #f0f0f0;
  --color-text: #1a1a1a;
  --color-text-secondary: #545454;
  --color-text-muted: #6b6b6b;
  --color-border: #e3e3e3;
  --color-border-control: #858585;
  --color-action: #1a1a1a;
  --color-action-hover: #303030;
  --color-on-action: #ffffff;
  --color-focus: #1a1a1a;
  --color-error: #b42318;
  --color-success: #216e39;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  --radius-small: 12px;
  --radius-card: 24px;
  --radius-pill: 999px;
  --shadow-soft: 0 8px 24px rgb(0 0 0 / 6%);
  --shadow-control: 0 4px 12px rgb(0 0 0 / 8%);
  --shadow-hover: 0 12px 28px rgb(0 0 0 / 10%);

  --content-max: 1120px;
  --reading-max: 720px;
  --gutter: 24px;
  --section-space: 48px;
  --duration-fast: 160ms;
  --duration-ui: 200ms;
  --duration-reveal: 400ms;
  --ease-ui: cubic-bezier(0.2, 0.8, 0.2, 1);

  --z-base: 0;
  --z-header: 20;
  --z-backdrop: 40;
  --z-overlay: 50;
  --z-status: 60;
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-text);
}

.container {
  width: min(calc(100% - var(--gutter) * 2), var(--content-max));
  margin-inline: auto;
}

.container--reading { max-width: var(--reading-max); }
.section { padding-block: var(--section-space); }

.project-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

@media (min-width: 768px) {
  :root { --gutter: 32px; --section-space: 64px; }
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-6);
  }
}

@media (min-width: 1024px) {
  :root { --gutter: 40px; --section-space: 96px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  [data-reveal] {
    opacity: 1;
    transform: none;
    filter: none;
    animation: none;
    transition: none;
  }
}
```

Font loading, type-role classes, component styling, dark-surface focus treatment, and component-specific reduced-motion handling must be implemented separately using the specifications above.

## 11. Development acceptance checklist

Before considering a page or component complete:

### Visual consistency

- [ ] Uses shared color, spacing, typography, radius, and shadow tokens.
- [ ] Aligns to the shared container and section rhythm.
- [ ] Reuses an existing component or documents the new component's purpose.
- [ ] Uses the correct heading hierarchy and visual type roles.
- [ ] Keeps action hierarchy clear and restrained.
- [ ] Uses consistent project-cover ratios and image treatment.
- [ ] Contains no accidental one-off values or duplicated styling systems.

### Interaction and content

- [ ] Links navigate to real, correctly labeled destinations.
- [ ] Buttons have working default, hover, focus, and pressed states.
- [ ] Forms cover validation, loading, success, and failure.
- [ ] Essential behavior works with keyboard and touch.
- [ ] Real content replaces demo claims and placeholders.
- [ ] Project outcomes and personal contributions are accurately represented.

### Responsive and accessibility

- [ ] Reviewed at representative widths: 360px, 390px, 768px, 1024px, and 1440px.
- [ ] No horizontal overflow, cropped text, overlapping controls, or hidden focus.
- [ ] Long content and supported locales wrap correctly.
- [ ] Contrast checked against actual backgrounds and imagery.
- [ ] Reduced motion preserves all content and functionality.
- [ ] Images reserve space and load at appropriate sizes.
- [ ] Focus, menu behavior, and form announcements are manually checked.
- [ ] At 200% zoom, the page remains readable and operable.

## 12. Decisions to resolve before launch

These do not block building reusable layout and components:

- Final portfolio name, portrait, professional positioning, and contact destinations.
- Arabic-only, English-only, or bilingual content.
- Licensed Arabic font files and final English companion font if needed.
- Final project covers, case-study evidence, and supported outcomes.
- Whether genuine testimonials, FAQs, or a blog justify additional sections.
- Contact delivery service and final success/error messaging.

## 13. Change log

| Date | Decision |
| --- | --- |
| 2026-09-14 | Initial reference: monochrome foundation, 1120px container, shared rounded components, restrained motion, and content-first portfolio structure. |

When changing this system, update the affected token or component specification, its implementation, and representative pages together.

## 14. Initial implementation decisions — 2026-09-18

- English-only initial content uses the specified system sans-serif fallback. Existing Thmanyah regular/bold faces are available for Arabic elements; no new font source was introduced.
- Header: a 720px floating pill inside a decorative frame capped at 1280px; the content container remains 1120px. The mobile menu is a nonmodal disclosure with Escape and outside/focus-leave dismissal.
- The name-led hero uses the supplied full name. On narrow mobile screens its font interpolates from 44px to 64px to fit the full name; desktop retains the 112px ceiling. Hero spacing accounts for the fixed navigation.
- The optional portrait is omitted because no portrait was supplied. About uses a heading/biography two-column layout with a small decorative typographic mark.
- Project covers are original SVG placeholders. Sage and sand colors appear only within artwork; UI colors remain neutral. Both entries are clearly marked samples because the owner will choose the final projects manually.
- Native expandable project notes are an inline, single-page variant of the case-study destination. They retain visible keyboard focus, a 52px summary target, and an open-state indicator.
- Compact eyebrows and project metadata use 9–12px editorial labels; paragraph, field, button, and primary metadata sizes retain the core scale.
- Contact is synchronous local validation only. “Check message” reports validity without claiming delivery; no artificial loading or network error states. Direct email is available separately.

## 15. Owner-requested revisions — 2026-09-18

These decisions supersede the corresponding initial implementation decisions above.

- Removed all eyebrow treatments: numbered section labels, hero kicker, education kicker, and project category kickers. Sample status remains explicit in project descriptions.
- Replaced the decorative About mark with the owner-supplied `assets/images/bahaa.png`, a rounded 4:5 crop capped at 360px wide. The photograph itself is not edited.
- Added a 700ms staggered hero entrance, 650ms one-time scroll reveals, three gentle scroll-arrow nudges, and subtle hover motion. Content remains visible without JavaScript, and reduced-motion preferences disable animations.
- Added a complete Arabic locale, now the default page at `index.html` (English moved to `en.html`), with RTL layout and the provided local Thmanyah Sans regular/medium/bold files. English uses the existing system fallback.
- The header now includes an accessible language link. On mobile, the menu is a 44px icon control with its localized text retained as its accessible name.
- Shared styles and scripts serve both static pages; content edits should be mirrored manually. Email addresses and Latin technology labels keep LTR direction; directional UI arrows are mirrored.

## 16. Supplied brand assets — 2026-09-18

- Both language headers use the supplied white transparent logo on a charcoal rounded surface in place of the text monogram.
- Footers use the supplied black transparent logo alongside the owner’s name. The supplied white-on-black square logo is the PNG favicon.
- Original assets in `assets/images/brand/` are unchanged. A shared 40px mark container centers the 72px image canvas to accommodate its transparent margins. Logos retain their original orientation in RTL.

## 17. Separate circular language control — 2026-09-18

The floating header now groups the main navigation pill and a separate circular language link. The language control follows the pill in reading order (right in English, left in Arabic), uses a 52px desktop / 44px mobile circle, and displays “ع” or “EN” with a complete accessible language label. The combined group is capped at 784px with a 12px gap. The existing locale destinations and section-preserving behavior remain in use.
