# 2026 campaign update: audit, systems, QA

Method: Impeccable (critique, audit, typeset, layout, shape, animate, adapt, harden, polish) applied manually from its reference docs, since the CLI is not installed. Taste Skill dials: variance 4, motion 4, density 5. Emil Kowalski's animation decision framework and easing/duration standards. Apple HIG principles for hierarchy, 44px targets, feedback and reduced motion.

## 1. Audit of the previous page

Live implementation was `index.astro` + `figma.css` + `figma.ts`. `global.css`, `interactions.ts` and most of `src/components/` are unused leftovers, and the old `DESIGN.md` described a Bodoni system that was no longer shipped.

| Preserve | Refine | Rebuild |
|---|---|---|
| Montserrat, aqua #3CBFB0, pill buttons, dark/paper rhythm | 20+ ad-hoc font sizes (8-11px labels) replaced by a type scale | White text on aqua buttons (2.2:1 contrast) |
| Hero composition, vial orbit, lifestyle rail, FAQ accordion, locations, quick test, dialogs | Radii 15/22/24/26/28/42px unified to 12/20/32 | Stats row citing a branded semaglutide trial next to a compounded product |
| Word-highlight statement, GSAP scroll triggers | Eyebrow on nearly every section, now 4 in total | Glass pill of hero chips overlaid on a photo that already contains the same chips |
| Native `<details>` FAQ, focus-trapped dialogs | Same entrance animation on every block, now purpose-specific | Process and "fit" content replaced by the campaign journey and the NP care model |
| | Hover lifts on touch devices, now `(hover: hover)` only | Rail not reachable by keyboard; small text under 12px on mobile |

## 2. Type scale

See `DESIGN.md`. Display 40→76px, H2 32→56, H3 24→32, H4 19→22, H5 17, label 12, lead 17→20, body 16, small 14, caption 13 (the floor). All fluid sizes use `clamp()`. Visual classes (`.t-h2` etc.) are independent of heading level.

## 3. Grid and spacing

12 columns at 1024px and up, 8 from 768 to 1023, 4 below 768. Container 1240px, margin `clamp(20px, 5vw, 80px)`, gap `clamp(16px, 2.2vw, 32px)`. Every split section (why, plans, journey, care, FAQ, quick test, footer) places content on these columns. 4px spacing scale; section padding `clamp(72px → 136px)`.

## 4. Information architecture

Hero → Facts → How it works (statement) → Why GLP-1 & GIP → **Plans + comparison table** → Journey → **Your care, month by month (tabs)** → Lifestyle → FAQ → Locations → Quick test → Final CTA → Footer disclosure. The sticky mobile CTA runs from the hero to the final CTA.

## 5. New and modified sections

- **New:** facts strip, membership cards with price and therapy, 11-row inclusion comparison table, care tabs (First visit / Every month / Your dose / Safety pauses), sticky mobile CTA, footer disclosure, image placeholder component.
- **Modified:** hero copy and CTAs, statement, orbit cards (banner "Why" items), journey (banner steps), FAQ merged to 10 questions in a sticky two-column layout, final CTA copy, header nav.
- **Removed:** stats row, "Honest about who it's for" cards (candidate criteria now live in the FAQ and the NP first visit), hero glass overlay, vial glow.

## 6. Motion vocabulary

| ID | Element | Purpose | Trigger | Duration / easing | Properties | Reduced motion |
|---|---|---|---|---|---|---|
| M1 | Hero text and image | Sets reading order on arrival | Load, once | 0.7s power3.out, word stagger 0.03 | y 12px / 100%, opacity | Static |
| M2 | Section headings | Marks a new topic | Scroll 88%, once | 0.6s power2.out | y 16px, opacity | Static |
| M3 | Statement | Pacing a long sentence | Scroll scrub | Linear scrub | color | Full ink |
| M4 | Why cards and vial | Ties cards to the vial | Scroll, once | 0.6s power3.out | x ±24px (desktop), opacity | Static |
| M5 | Journey steps | Order is the content | Scroll 80%, once | 0.55s, stagger 0.1 | y 20px, opacity | Static |
| M6 | Tab indicator and panel | Spatial continuity between tabs | Click / arrow keys | 240ms ease-out; panel 200ms | transform, height / opacity, y 6px | Instant |
| M7 | FAQ | Prevents a content jump | Toggle | 0.28s open / 0.2s close | height, opacity | Native toggle |
| M8 | Location cards | Group reveal | Scroll, once | 0.8s, stagger 0.1 | clip-path, opacity | Static |
| M9 | Buttons | Press feedback | :active | 120ms ease-out | scale 0.97 | None |
| M10 | Sticky CTA | Enters and exits along the same edge | Past hero / at final CTA | 240ms in (ease-out), 180ms out | translateY | Instant |
| M11 | Dialog | Focus shift | Open | 240ms ease-out | y 12px, scale 0.98, opacity | Instant |

Plan cards, prices, facts and disclosures do not animate, so the offer reads immediately.

## 7. Campaign content coverage

Verified by `tests/qa.mjs` (`content.missing` is empty). Banner: headline, program description, hormone mechanism, 6 "Why" items (4 used as written; "FDA-Approved Science" and "Proven Weight Loss Results" replaced, see below), GLP-1 and GIP benefit lists, SlimFit™ / SlimFit Plus™ names, tiers, prices, fit lines and all 11 inclusions, 4 journey steps, all 6 FAQs, taglines and CTA. NP guidelines: initial visit (8), monthly visit (8), documentation (9), dosing verification (6), units warning, no automatic increases, hold criteria (8), urgent care, and final NP authority, rewritten for patients.

**Not published as supplied:**
- "FDA-approved": compounded medications are not FDA-approved. Replaced with a disclosure.
- Jessica M. testimonial and the -32 / -45 lb before/after images: stored in `content.ts` with `approved: false` until real, consented patient material is supplied.
- Benefit claims now say "may help".

## 8. Test results (2026-09-29)

- Widths 320, 390, 768, 1024, 1280, 1440: no horizontal overflow, no text under 12px, no targets under 24px.
- axe WCAG 2.2 AA: 0 violations.
- Tabs (click, arrows, Home/End), FAQ, booking dialog with Escape, assessment validation, mobile menu, sticky CTA show/hide: all pass.
- No JavaScript: all 4 care panels visible, tablist hidden.
- Images: hero, consultation and vial PNGs converted to WebP (about 1.1 MB down to about 105 KB).

**Remaining:** hero image has baked-in UI text (IMG-02 brief); IMG-01 placeholder is shown on desktop only; stale files (`global.css`, `interactions.ts`, unused components, `tests/keyboard.mjs`) can be removed; the Impeccable detector CLI was not run.

## Update 2 (2026-09-29)

- **Hero H1:** "Weight loss, personalized." One line on desktop, two on mobile.
- **Buttons:** aqua buttons now use a white label and icon everywhere (`.primary`). Known trade-off: 2.2:1 contrast, flagged by axe on 5 elements.
- **Care, month by month:** on desktop (≥1024px wide, ≥700px tall, motion allowed, content fits) the section pins and scrolling moves through the 4 stages, in both directions. A progress guide (numbered steps, per-stage fill bars) shows where you are, and clicking a step jumps to it. On smaller screens, with reduced motion, or without JS, the stages stack and a sticky progress strip tracks the one in view. Each stage has a photo.
- **New motion:** M5 journey line draws down and steps light up as they're reached (scrubbed). M6 membership table rows rise in, and their checks pop in sequence. M7 plan cards and facts reveal once. M9 slight hero parallax and the final vials settle as you scroll. M10 lifestyle cards slide along the rail and FAQ rows reveal in sequence. Care-stage crossfade: 360ms opacity, 480ms translate, direction-aware.
- **Images (Unsplash, hotlinked with attribution in each caption):** private collection unsplash.com/collections/KyBf8i8rXJI. First visit: CDC (Y2lUjUiay-o). Every month: National Cancer Institute (nR2C9AVzfHY). Your dose: National Cancer Institute (NNpo-liY5aU). Safety: engin akyurt (PcU17evKnew). tl447mekwuQ and LbUOh89q4Es were also collected but not used (one shows an oncology badge).

## Update 3 (2026-10-01, Figma refinements)

- Brand photography replaces Unsplash: hero (clean export, `Assets/hero/hero-clean.png`), journey (`Assets/journey-nurse-consulting.png`), 4 care stages, 5 lifestyle cards. All in `public/assets/brand/` as WebP.
- Hero overlays are live HTML (Your first visit card + 3 chips matching the supplied SVG chips) and pop in one by one on scroll (back.out ease, 150ms stagger; reverse on scroll up; static with reduced motion). The first-visit card is hidden on mobile.
- Final CTA copy: "Your next *Self* starts here." (Montserrat 600 italic for "Self").
- Buttons: 700 weight.
