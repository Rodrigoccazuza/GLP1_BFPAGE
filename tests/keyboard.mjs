import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
await page.locator('.hero [data-action="assessment"]').focus();await page.keyboard.press('Enter');
for(let i=0;i<15;i++){await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('#assessment-dialog')),true);}
for(let i=0;i<3;i++){await page.locator('.assessment-option input').first().check();await page.locator('#assessment-next').click();}
await page.locator('#result-book').click();await page.keyboard.press('Escape');await page.waitForTimeout(50);
assert.equal(await page.evaluate(()=>document.activeElement===document.querySelector('.hero [data-action="assessment"]')),true);
await page.locator('.faq summary').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('.faq details').first().evaluate(el=>el.open),true);await page.keyboard.press('Space');assert.equal(await page.locator('.faq details').first().evaluate(el=>el.open),false);
await page.setViewportSize({width:390,height:844});await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');await page.keyboard.press('Escape');assert.equal(await page.locator('#mobile-nav').isVisible(),false);
for(const width of [320,375,430,768,1024,1280,1728]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`.impeccable/review/viewport-${width}.png`});}
await writeFile('docs/keyboard-results.json',JSON.stringify({focusTrap:true,returnFocusAfterHandoff:true,keyboardFaq:true,mobileMenuEscape:true,additionalWidthsCaptured:[320,375,430,768,1024,1280,1728]},null,2));
console.log('Keyboard trap, return focus, FAQ, mobile Escape passed. Additional viewport captures saved.');await browser.close();
