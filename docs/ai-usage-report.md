# AI Usage Report

**Project:** Bahaa Najjar — Personal Portfolio (SWE363 Assignment 1)
**Author:** Bahaa Mamdouh Najjar

## 1. Which AI Tool Was Used

I used **OpenAI Codex** as an assistant while building this portfolio assignment. Its contributions included code generation, debugging, design suggestions, browser checks, and documentation.

## 2. What AI Helped With

- Organizing the static website into HTML pages, a shared CSS stylesheet, a JavaScript file, image assets, and documentation.
- Drafting the English and Arabic pages with semantic sections, project cards, accessible form labels, and right-to-left styling for Arabic.
- Building the responsive layout with CSS variables, Grid, Flexbox, and breakpoints for mobile, tablet, and desktop widths.
- Implementing contact-form validation, mobile navigation, expandable project notes, and animations with reduced-motion support.
- Adapting my résumé information into descriptions of my five projects, professional experience, and skills, and drafting Arabic translations.
- Fixing project-card alignment and converting large PNG screenshots into responsive WebP images for faster loading.
- Drafting the README, technical documentation, and this report, and performing browser and code checks during development.

## 3. Benefits

- Reduced repetitive work when creating two language versions that share the same layout and interactions.
- Helped keep spacing, typography, colors, and responsive behavior consistent through shared CSS rules.
- Provided explanations and concrete solutions for the interface issues I noticed, such as misaligned project details when descriptions wrapped onto two lines.
- Made image optimization straightforward: the five original screenshots totaled approximately 9.45 MiB, while the largest WebP variants together total approximately 253 KiB, a reduction of about 97.4%.
- Helped incorporate accessibility details such as keyboard navigation, visible focus, validation feedback, and reduced-motion preferences.

## 4. Challenges

- The initial card layout allowed longer descriptions to push the “Behind the project” row below the corresponding row in the neighboring card. I identified this issue and asked Codex to fix the alignment.
- The original screenshots loaded slowly after deployment. I reported the problem and requested optimization; Codex generated smaller WebP variants and updated both pages to use responsive image selection.
- Animation behavior needed refinement. I requested animations when scrolling back up, then decided to return to one-time reveal animations. I also requested smooth opening and closing for the mobile menu.
- Documentation became outdated as the website changed. Earlier drafts referred to sample projects and placeholder images even after real content and screenshots were added.
- Browser checks have limits. Codex checked layouts and interactions in its browser, but those checks do not establish compatibility with every browser or device.

## 5. My Decisions and Changes

- I directed the portfolio’s content and presentation, including the use of my own project information, portrait, and an Arabic version.
- I reviewed the visible behavior and raised specific issues with card alignment, scroll animations, mobile-menu transitions, and screenshot loading.
- I chose to keep one-time scroll reveals and add smooth mobile-menu transitions. Codex implemented these decisions in the shared JavaScript.
- For card alignment, the solution uses CSS subgrid to share row heights between neighboring cards. This allows descriptions to wrap while keeping the technology tags and disclosure rows aligned.
- For screenshot performance, the solution combines WebP compression with `srcset` and `sizes`, allowing the browser to select an appropriate image width. Lazy loading defers images until they approach the viewport.
- These revisions document my feedback and design decisions. The associated code changes and automated checks were carried out by Codex; they are not presented as code I independently wrote or tests I personally performed.

## 6. Responsible Use of AI

I used Codex for substantial implementation and documentation assistance, while providing personal content, identifying issues, and deciding which changes to keep or undo. This report acknowledges that contribution and distinguishes my decisions from the code and checks performed by AI.

The final project uses my real project information and screenshots rather than the initial samples. The contact form clearly explains that it validates input locally and does not send a message. Before submission, I still need to confirm that the report accurately reflects my experience, review the final code and translations, and ensure I can explain the implementation. This report does not claim that I have personally reviewed every line or tested every browser.
