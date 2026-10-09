// Builds 640px-wide WebP variants for photos that phones would otherwise download at full size.
import sharp from 'sharp';
const files = [
  'assets/brand/care-first-visit.webp', 'assets/brand/care-monthly.webp', 'assets/brand/care-dosing.webp', 'assets/brand/care-safety.webp',
  'assets/figma/locations/hells-kitchen.webp', 'assets/figma/locations/upper-east-side.webp', 'assets/figma/locations/west-village.webp',
];
for (const file of files) {
  const out = file.replace(/\.webp$/, '-640.webp');
  const info = await sharp(`public/${file}`).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`public/${out}`);
  console.log(`${out}  ${Math.round(info.size / 1024)}K`);
}
