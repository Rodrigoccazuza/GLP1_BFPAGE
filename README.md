# BodyFactory GLP-1 campaign

A static Astro landing page with original campaign photography, responsive media, a native-scroll care journey, an accessible FAQ, and a privacy-preserving consultation-preparation flow.

## Preview

Requires Node 22.12+ (tested with Node 25.9).

```sh
npm install
ASTRO_TELEMETRY_DISABLED=1 npm run dev
```

Open http://127.0.0.1:4321/.

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run preview
```

Build output: `dist/`. No server runtime or external font requests needed by the delivered page.

## Edit

- `src/content.ts`: all campaign copy (plans, prices, inclusions, journey, NP care model, FAQ, disclosure, gated testimonial).
- `src/components/`: modular sections and reusable buttons/media.
- `src/styles/site.css`: design tokens (type scale, 12/8/4 grid, spacing, motion) and all component styles.
- `src/scripts/site.ts`: menu, dialogs, assessment, FAQ, care tabs, sticky mobile CTA, motion.
- `docs/redesign-report.md`: audit, systems and QA results. `docs/image-briefs.md`: prompts for new imagery.
- `public/assets/glp1/`: optimized local imagery and film. Originals remain in the supplied folders.
- `docs/`: research, asset provenance, review and launch-confirmation notes.

The assessment asks only about visitor intent. It does not diagnose, score eligibility, collect identifying information, persist answers or send them over the network. Closing the dialog clears the answers. Booking links go through a clear handoff to the verified general BodyFactory scheduling page until a dedicated URL is supplied.

## Browser QA

Start the local preview, then `npm test`. The test uses installed Google Chrome on macOS; set the executable path in `tests/qa.mjs` for another machine. Screenshots land in `.impeccable/review/`; machine-readable results land in `docs/qa-results.json`. Tests cover widths 320-1440 (overflow, text under 12px, small targets), axe WCAG 2.2 AA, required campaign copy, care tabs (mouse and keyboard), FAQ, dialogs, assessment, mobile menu, sticky CTA and no-JavaScript content. Override the URL with `QA_URL`.

## Launch

Read `docs/launch-checklist.md`. Copy `.env.example` to `.env`, configure the final origin, and approve publication only after business and clinical content is confirmed. The preview stays noindex by default. No production deployment has been performed.
