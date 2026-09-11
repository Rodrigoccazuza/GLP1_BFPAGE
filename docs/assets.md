# Asset provenance

| Shipped files | Origin and treatment |
| --- | --- |
| `hero/poster-*.webp`, `hero/mobile.webp`, `hero/social.jpg` | User-supplied `Assets/herosection_placeholderforvideoload.png`. Responsive web encoding and mobile focal crop. |
| `video/hero.mp4` | User-supplied `Assets/herosectionbackgrond.mp4`. Silent H.264, fast-start, 1440px wide, 544 KB. Inspected frames at 0/3/6 seconds; warm light, subtle model movement, aqua studio. No sound. Film pauses when offscreen or tab hidden. Mobile, reduced motion and save-data use poster. |
| `program/vial-*.webp` | User-supplied `Assets/GLP1.png`. Artwork retained faithfully, labeled campaign imagery. No pharmaceutical labels invented. |
| `program/studio-*.webp` | Actual [West Village studio image](https://cdn.prod.website-files.com/67290b7ca63ad836acee7e4f/67290b7ca63ad836acee818b_BodyFactory_Studio_Image_00013.jpg) from BodyFactory's public studio page. Original stored at `Assets/locations/west-village.jpg`. |
| `generated/campaign-*.webp` | Original OpenAI image generation using supplied hero as art-direction reference. Original: `Assets/generated/campaign.png`; exact prompt: adjacent `campaign.prompt.txt`. Generated September 10, 2026. Model imagery, no implied patient identity or clinical result. |
| `/assets/logo.png`, `/assets/logo-white.png`, `/favicon.png` | Exact supplied master logos; transparent outer whitespace trimmed and proportionally resized, no redrawing. |
| `/_astro/*.woff2` | Self-hosted Latin subsets from @fontsource Bodoni Moda, Montserrat, Work Sans packages. Licenses distributed with packages. |

Media generation/re-encoding: `node scripts/prepare-assets.mjs`. All required source assets now live in the project. The original prompt and source mapping are kept alongside assets to preserve provenance through encoding.
