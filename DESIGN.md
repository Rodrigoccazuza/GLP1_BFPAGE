---
name: BodyFactory GLP-1 Campaign
description: Editorial wellness with a personal medical-care journey.
colors:
  primary: "#3CBFB0"
  ink: "#141414"
  paper: "#FFFAF9"
  sand: "#EEE8E6"
  dark: "#192C2A"
  muted: "#5B625F"
  line: "#D4D6D0"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(42px, 4.8vw, 76px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.035em"
rounded:
  action: "2px"
  dialog: "3px"
spacing:
  gutter: "clamp(24px, 5.3vw, 96px)"
  section: "clamp(72px, 8vw, 132px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "17px 24px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
    padding: "17px 24px"
---

## Overview

BodyFactory’s recognizable aqua and exact master logo anchor a campaign of large editorial statements, authentic skin texture, and clear care information. Photographic scale carries the expression; interactive controls remain restrained. This campaign extends the supplied brandbook with the master prompt’s Bodoni display direction and minimal button geometry.

## Colors

Brand aqua leads the hero and primary actions. Warm paper is the reading surface; sand marks the journey. Dark green-gray creates contrast for science and the final invitation. Ink stays readable on aqua. Muted text is reserved for light surfaces; dark sections use lighter green-tinted supporting text.

## Typography

Bodoni Moda provides high-contrast headlines and italic emphasis within the same family. Work Sans carries explanations and controls; Montserrat provides precise action labels. Display scales by viewport, and small screens have explicit headline breaks. Body measures remain under 65 characters where practical. Fonts are local Latin WOFF2 files.

## Layout

The outer container caps at 1632px, including responsive gutters. Wide screens use asymmetric editorial columns, separated by substantial space rather than cards. Sections range from 72px to 132px of vertical padding. Below 768px, content becomes sequential and the hero uses a distinct portrait crop above a solid aqua text surface. At 320px, gutters reduce to 20px.

## Elevation & Depth

Photography, surface changes, and thin dividers create depth. The only overlay is a focused native dialog with a dark translucent backdrop. Mobile navigation receives a subtle offset shadow. General content has no decorative shadows.

## Shapes

Images and information panels have straight edges. Actions have minimally softened corners; dialogs use a matching small radius. Circular nodes belong to the numbered journey, where their shape communicates state.

## Components

Primary actions pair an uppercase label with a directional arrow. Dark actions appear on the aqua hero and light navigation; aqua actions appear on reading and dark surfaces. All have visible focus and brief press feedback.

The journey has a sticky desktop rail with active, completed, and upcoming states. Mobile panels share an in-flow vertical connector and stateful nodes. No scrolling is hijacked. Reduced motion makes the sidebar static and removes transformations.

FAQ items use native details/summary. Dialogs retain Escape dismissal, visible close controls, keyboard wrapping, and focus return. Assessment options use native radio inputs and inline validation; the final state guides visitors toward provider evaluation.

## Do's and Don'ts

- Preserve the supplied logo artwork and aspect ratio.
- Keep campaign model imagery distinct from patient evidence.
- Use real content and confirmed data; unconfirmed commercial details remain inquiry-based.
- Keep essential text readable without animation or JavaScript.
- Preserve natural scrolling and reduced-motion fallbacks.
- Do not introduce invented outcomes, medication labels, clinical credentials, or testimonials.
- Do not turn every section into matching cards or add unnecessary motion.
