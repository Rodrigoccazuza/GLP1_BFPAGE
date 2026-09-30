// Browser QA for the campaign page. Start `npm run dev` first, then `npm test`.
// Screenshots: .impeccable/review/ · Results: docs/qa-results.json
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const url = process.env.QA_URL || 'http://127.0.0.1:4321/';
const root = '.impeccable/review';
await mkdir(root, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const report = { widths: [], errors: [], interactions: [], accessibility: [], content: {} };
const check = (name, fn) => fn().then(() => report.interactions.push(`PASS ${name}`)).catch(error => report.interactions.push(`FAIL ${name}: ${error.message.split('\n')[0]}`));

const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await context.newPage();
page.on('pageerror', error => report.errors.push(error.message));
page.on('console', message => message.type() === 'error' && report.errors.push(message.text()));
page.on('response', response => response.status() >= 400 && report.errors.push(`${response.status()} ${response.url()}`));
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(async () => { document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; }); for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
await page.waitForLoadState('networkidle');

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.waitForTimeout(120);
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    overflow: [...document.querySelectorAll('main *, header *, footer *')].filter(el => {
      if (el.closest('.lifestyle-rail, .care-tablist')) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
    }).map(el => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`).slice(0, 8),
    smallText: [...document.querySelectorAll('body *')].filter(el => el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && el.getClientRects().length && parseFloat(getComputedStyle(el).fontSize) < 11).map(el => el.className || el.tagName).slice(0, 5),
    smallTargets: [...document.querySelectorAll('a, button, summary, [role="tab"]')].filter(el => { const r = el.getBoundingClientRect(); return r.width && r.height && r.height < 24 && !el.closest('p, .footer-bottom'); }).map(el => el.textContent.trim().slice(0, 30)).slice(0, 5),
  }));
  report.widths.push({ width, ...metrics, pass: metrics.scrollWidth <= width && metrics.overflow.length === 0 });
  await page.screenshot({ path: `${root}/full-${width}.png`, fullPage: true });
}

await page.setViewportSize({ width: 1440, height: 900 });
report.accessibility = (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target.join(' ')).slice(0, 5) }));

report.content = await page.evaluate(() => {
  const text = document.body.textContent.replace(/\s+/g, ' ');
  const required = ['SlimFit™', 'SlimFit Plus™', '$299', '$399', 'Semaglutide', 'Tirzepatide', 'Baseline laboratory testing', 'Weekly GLP-1 + GIP injections', 'Advanced metabolic support', 'Lab testing', 'Start your transformation', 'Record your weight, height, BMI, and vital signs', 'Units are not interchangeable', 'Increases are not automatic', 'Significant or persistent vomiting', 'Pregnancy or suspected pregnancy', 'Pharmacy and formulation', 'not FDA-approved', 'Who is a candidate?', 'How do I get started?'];
  return { missing: required.filter(item => !text.includes(item)), emDashes: (text.match(/[—–]/g) || []).length, fdaApprovedClaim: /FDA[- ]approved (science|weight|active)/i.test(text) };
});

await check('Care guide tracks stacked panels (reduced motion)', async () => {
  await page.locator('#panel-dosing').scrollIntoViewIfNeeded();
  await page.evaluate(() => { const el = document.querySelector('#panel-dosing'); scrollTo(0, scrollY + el.getBoundingClientRect().top - innerHeight * .4); });
  await page.waitForTimeout(250);
  assert.equal(await page.locator('[data-care-step="2"]').evaluate(el => el.classList.contains('is-active')), true);
  assert.equal(await page.locator('.care-panel:visible').count(), 4);
});
await check('FAQ opens and closes', async () => {
  const second = page.locator('.faq-list details').nth(1);
  await second.locator('summary').click();
  assert.notEqual(await second.getAttribute('open'), null);
  await second.locator('summary').click();
  assert.equal(await second.getAttribute('open'), null);
});
await check('Booking dialog opens from plan card and closes with Escape', async () => {
  await page.locator('#slimfit [data-action="book"]').click();
  assert.equal(await page.locator('#booking-dialog').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#booking-dialog').isVisible(), false);
});
await check('Assessment validates and completes', async () => {
  await page.locator('.quick-test [data-action="assessment"]').click();
  await page.locator('#assessment-next').click();
  assert.equal(await page.locator('#assessment-error').isVisible(), true);
  for (let i = 0; i < 3; i++) { await page.locator('.assessment-option').first().click(); await page.locator('#assessment-next').click(); }
  assert.equal(await page.locator('#assessment-result').isVisible(), true);
  await page.keyboard.press('Escape');
});
await page.setViewportSize({ width: 390, height: 844 });
await check('Mobile menu opens, closes on link', async () => {
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), true);
  await page.locator('#mobile-nav a[href="#plans"]').click();
  assert.equal(await page.locator('#mobile-nav').isVisible(), false);
});
await check('Sticky CTA appears past hero and hides at final CTA', async () => {
  await page.locator('#journey').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-sticky-cta]').evaluate(el => el.classList.contains('is-visible') && !el.inert), true);
  await page.locator('[data-final-cta]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-sticky-cta]').evaluate(el => el.classList.contains('is-visible')), false);
});
await page.screenshot({ path: `${root}/mobile-viewport.png` });

const motion = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const live = await motion.newPage();
live.on('pageerror', error => report.errors.push(error.message));
await live.goto(url, { waitUntil: 'networkidle' });
await check('Care stage pins on desktop and scroll advances panels', async () => {
  assert.equal(await live.locator('[data-care]').evaluate(el => el.classList.contains('is-pinned')), true);
  const [start, end] = await live.locator('.care-stage').evaluate(el => { const top = el.getBoundingClientRect().top + scrollY - 76; return [top, top + el.offsetHeight - (innerHeight - 76)]; });
  const seen = [];
  for (const f of [.1, .35, .6, .9]) {
    await live.evaluate(y => scrollTo(0, y), start + (end - start) * f);
    await live.waitForTimeout(350);
    seen.push(await live.locator('.care-panel.is-active').getAttribute('data-care-panel'));
  }
  assert.deepEqual(seen, ['0', '1', '2', '3']);
  await live.locator('[data-care-step="1"]').click();
  await live.waitForTimeout(1200);
  assert.equal(await live.locator('.care-panel.is-active').getAttribute('data-care-panel'), '1');
  await live.screenshot({ path: `${root}/care-pinned.png` });
});
await check('Journey line fills and steps light up on scroll', async () => {
  await live.locator('[data-steps]').evaluate(el => scrollTo(0, el.getBoundingClientRect().bottom + scrollY - innerHeight * .4));
  await live.waitForTimeout(400);
  assert.equal(await live.locator('.step-card.is-reached').count(), 4);
});
await check('Membership rows reveal on scroll', async () => {
  await live.locator('.compare').evaluate(el => scrollTo(0, el.getBoundingClientRect().bottom + scrollY - innerHeight * .9));
  await live.waitForTimeout(1500);
  assert.equal(await live.locator('[data-row]').last().evaluate(el => getComputedStyle(el).opacity), '1');
});

const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
const plain = await noJs.newPage();
await plain.goto(url);
report.noJavaScript = { allCarePanelsVisible: await plain.locator('.care-panel:visible').count() };

await writeFile('docs/qa-results.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
