---
name: BodyFactory GLP-1 & GIP Campaign
description: Editorial wellness with nurse practitioner-led medical care.
colors:
  primary: "#3CBFB0"      # buttons, accents on dark
  teal-ink: "#14685F"     # aqua text on light (7:1)
  teal-display: "#1F9A8C" # aqua display type on light (3.4:1, large only)
  ink: "#111716"
  muted: "#545C5A"
  paper: "#FFFDFC"
  soft: "#F5F1EF"
  line: "#DCDEDB"
  dark: "#10211F"
  black: "#070B0A"
typography:
  family: "Montserrat (400/500/600/700/800, local)"
  display: "clamp(40px → 76px) / 800 / 1.0 / -0.055em"
  h2: "clamp(32px → 56px) / 600 / 1.05 / -0.045em"
  h3: "clamp(24px → 32px) / 600 / 1.15 / -0.03em"
  h4: "clamp(19px → 22px) / 600 / 1.25 / -0.02em"
  h5: "17px / 600 / 1.35"
  h6-label: "12px / 600 / uppercase / +0.12em"
  lead: "clamp(17px → 20px) / 400 / 1.55"
  body: "16px / 400 / 1.6"
  small: "14px"
  caption: "13px (floor for any visible text)"
  button: "14px / 600"
grid:
  desktop: "12 cols ≥1024px"
  tablet: "8 cols 768-1023px"
  mobile: "4 cols <768px"
  container: "1240px"
  margin: "clamp(20px, 5vw, 80px)"
  gap: "clamp(16px, 2.2vw, 32px)"
spacing: "4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96; section clamp(72px → 136px)"
rounded: { sm: 12px, md: 20px, lg: 32px, pill: 999px }
motion:
  ease-out: "cubic-bezier(.23, 1, .32, 1)"
  press: 120ms
  fast: 180ms
  base: 240ms
---

## Rules

- Tokens live at the top of `src/styles/site.css`. Use `.t-display`, `.t-h2`…`.t-h6`, `.t-lead` to set visual level independently of the semantic heading level.
- One family (Montserrat). Hierarchy comes from size, weight and tracking; aqua `<em>` inside display headlines is the brand signature.
- Buttons are pills: `.primary` (aqua, white label and icon, per brand direction 2026-09-29), `.dark`, `.outline`. Note: white on #3CBFB0 is 2.2:1 and fails WCAG AA; `--teal-press` (#33AB9E) is the hover.
- Eyebrows: at most one per three sections (currently hero, lifestyle, locations, final CTA).
- No em-dashes in visible copy. No glows, no pills overlaid on photos.
- Hover effects only under `(hover: hover)`. Every animation has a reduced-motion path; content never depends on JavaScript.
- Compounded-medication disclosure must accompany pricing and appear in the footer. Never describe the medications as FDA-approved.
