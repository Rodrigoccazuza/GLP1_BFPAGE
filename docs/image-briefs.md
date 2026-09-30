# Image briefs

Shared art direction for all images: bright, warm-neutral NYC wellness studio; soft daylight; off-white and sand surfaces with small BodyFactory aqua (#3CBFB0) accents; natural skin texture, no retouched "perfect" bodies; inclusive casting (age 30-55, varied ethnicities and body sizes); no text, logos, or UI baked into the image; no medication labels, doses, or syringes with visible units.

| ID | Where | Ratio / min size | Brief | Prompt (for Nano Banana, Midjourney, etc.) |
|---|---|---|---|---|
| IMG-01 | "Your care, month by month" (desktop, below the tabs) | 4:3, 1200×900 | A nurse practitioner and patient seated together reviewing progress on a tablet. Calm and collaborative, not clinical-cold. | Editorial photograph, a female nurse practitioner in a simple navy scrub top sits beside a woman in her 40s in a light, minimalist wellness studio, both looking at a tablet and smiling slightly, soft window daylight, warm off-white walls, a small aqua accent object in background, shallow depth of field, natural skin texture, 35mm, no text, no logos |
| IMG-02 (recommended) | Hero, replaces `assets/figma/hero.png` | 1121×804 or 2242×1608 | The current mirror concept, re-exported **without** the baked-in "Your first visit" card and bottom feature strip (they duplicate page copy, can't be read by screen readers, and show "Clear pricing, shared upfront" that no longer matches the page). | Same composition as the current hero: a woman with curly auburn hair in black activewear faces a tall brass-framed mirror; her reflection shows her at a larger body size, smiling; seamless light-grey studio backdrop, soft shadow, no text, no UI elements, no rounded corners |
| IMG-03 (optional) | Open Graph / social share | 1200×630 JPG | Campaign crop for link previews from Meta/Google ads. | Crop of IMG-02 with headroom on the left for no text; export JPG ≤ 300 KB |

Before/after photos and the "Jessica M." testimonial must be **real patient material** with written consent, not generated. See `src/content.ts → results`.

After generating: save to `public/assets/figma/`, export WebP (quality ~82), then replace `<ImagePlaceholder id="IMG-01" …/>` in `src/pages/index.astro` with an `<img>` that has the same aspect ratio and a descriptive `alt`.
