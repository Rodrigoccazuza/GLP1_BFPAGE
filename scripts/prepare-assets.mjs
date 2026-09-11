import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const root='public/assets/glp1';
const sources={
  'hero/poster':'Assets/herosection_placeholderforvideoload.png',
  'program/vial':'Assets/GLP1.png',
  'program/studio':'Assets/locations/west-village.jpg',
  'generated/campaign':'Assets/generated/campaign.png'
};
for(const [name,source] of Object.entries(sources)){
 for(const width of [640,1200]) await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:84}).toFile(`${root}/${name}-${width}.webp`);
}
await sharp(sources['hero/poster']).resize({width:1800,withoutEnlargement:true}).webp({quality:87}).toFile(`${root}/hero/poster-1800.webp`);
await sharp(sources['hero/poster']).extract({left:800,top:0,width:850,height:941}).resize({width:850}).webp({quality:85}).toFile(`${root}/hero/mobile.webp`);
await sharp(sources['hero/poster']).resize(1200,630,{fit:'cover'}).jpeg({quality:85}).toFile(`${root}/hero/social.jpg`);
await sharp('Design guide/BF-Logo-Stacked.png').trim().resize({width:540}).png().toFile('public/assets/logo.png');
await sharp('Design guide/BF-Logo-white.png').trim().resize({width:540}).png().toFile('public/assets/logo-white.png');
await copyFile('Design guide/favicon.png','public/favicon.png');
execFileSync(ffmpeg,['-y','-i','Assets/herosectionbackgrond.mp4','-an','-vf','scale=1440:-2','-c:v','libx264','-preset','slow','-crf','27','-movflags','+faststart',`${root}/video/hero.mp4`],{stdio:'pipe'});
execFileSync(ffmpeg,['-y','-i','Assets/herosectionbackgrond.mp4','-vf','fps=1/3,scale=360:-1,tile=3x2','-frames:v','1','/tmp/bodyfactory-film-contact.jpg'],{stdio:'pipe'});
console.log('Responsive WebP images, hero/social crops, logos, and optimized video prepared.');
