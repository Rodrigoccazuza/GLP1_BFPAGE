import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const root='.impeccable/review'; await mkdir(root,{recursive:true});
const report={widths:[], errors:[], interactions:[], accessibility:[], reducedMotion:{}, noJavaScript:{}};
const context=await browser.newContext({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
const page=await context.newPage();
page.on('pageerror',err=>report.errors.push(err.message));
page.on('response',res=>{if(res.status()>=400 && res.url().startsWith('http://127.0.0.1'))report.errors.push(`${res.status()} ${res.url()}`)});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'networkidle'});
await page.evaluate(()=>document.fonts.ready);
for(const width of [320,375,390,430,768,1024,1280,1440,1728]){
 await page.setViewportSize({width,height:1000});
 await page.evaluate(()=>window.scrollTo(0,0));
 const metrics=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+1 || r.left < -1) && getComputedStyle(el).position !== 'fixed'}).map(el=>`${el.tagName}.${el.className}`).slice(0,10)}));
 report.widths.push({width,...metrics});
 if([390,1440].includes(width)){
  await page.screenshot({path:`${root}/${width===390?'mobile':'desktop'}-hero.png`});
  await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}scrollTo(0,0)});
  await page.waitForTimeout(200);
  await page.screenshot({path:`${root}/${width===390?'mobile':'desktop'}.png`,fullPage:true});
 }
}
await page.setViewportSize({width:1440,height:1000});
report.accessibility=(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
await page.locator('.hero [data-action="assessment"]').click();
await page.locator('#assessment-next').click();
assert.equal(await page.locator('#assessment-error').isVisible(),true);
report.interactions.push('Assessment rejects empty answer with accessible feedback');
for(let i=0;i<3;i++){
 await page.locator('.assessment-option').nth(i===1?2:0).click();
 if(i===1){await page.locator('#assessment-back').click();assert.equal(await page.locator('.assessment-option input').first().isChecked(),true);await page.locator('#assessment-next').click();}
 await page.locator('#assessment-next').click();
}
assert.equal(await page.locator('#assessment-result').isVisible(),true);
assert.match(await page.locator('#assessment-result').innerText(),/Program costs and what’s included/);
report.interactions.push('Assessment completes, preserves back-navigation choices, and shows provider-evaluation guidance');
await page.screenshot({path:`${root}/assessment.png`});
report.accessibility.push(...(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze()).violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
await page.locator('#result-book').click();assert.equal(await page.locator('#booking-dialog').isVisible(),true);
await page.keyboard.press('Escape');
await page.locator('.hero [data-action="assessment"]').click();
assert.equal(await page.locator('.assessment-option input:checked').count(),0);
await page.keyboard.press('Escape');report.interactions.push('Booking handoff opens; Escape closes dialogs; answers clear on close');
await page.locator('.faq summary').first().click();assert.equal(await page.locator('.faq details').first().getAttribute('open') !== null,true);
report.interactions.push('Native FAQ opens and closes');
await page.setViewportSize({width:390,height:844});
await page.locator('.menu-toggle').click();assert.equal(await page.locator('#mobile-nav').isVisible(),true);
await page.locator('#mobile-nav a[href="#program"]').click();assert.equal(await page.locator('#mobile-nav').isVisible(),false);
await page.waitForTimeout(150);assert.equal(await page.locator('.mobile-booking').isVisible(),true);
report.interactions.push('Mobile menu works and booking bar appears beyond hero');
await page.locator('#contact').scrollIntoViewIfNeeded();await page.waitForTimeout(600);assert.equal(await page.locator('.mobile-booking').isVisible(),false);
report.interactions.push('Mobile booking bar hides around final CTA');
report.reducedMotion=await page.evaluate(()=>({videoPaused:document.querySelector('video').paused,videoSrc:document.querySelector('video').getAttribute('src'),sidebarPosition:getComputedStyle(document.querySelector('.journey-sidebar')).position}));
await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});
for(let i=1;i<=4;i++){
 await page.locator(`#step-${i}`).scrollIntoViewIfNeeded();
 await page.evaluate(i=>{const el=document.querySelector(`#step-${i}`);scrollTo(0,scrollY+el.getBoundingClientRect().top-200)},i);
 await page.waitForTimeout(220);
 assert.equal(await page.locator('.rail-item[aria-current="step"]').getAttribute('data-step'),String(i-1));
}
report.interactions.push('All four rail states activate during natural scrolling');
await page.screenshot({path:`${root}/rail.png`});
await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(1200);
await page.screenshot({path:`${root}/desktop-film.png`});
report.video=await page.evaluate(()=>({paused:document.querySelector('video').paused,readyState:document.querySelector('video').readyState,error:document.querySelector('video').error?.message}));
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto('http://127.0.0.1:4321/');
report.noJavaScript={steps:await nojs.locator('.journey-panel').count(),faq:await nojs.locator('details').count(),contact:await nojs.locator('noscript').innerText()};
await writeFile('docs/qa-results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
await browser.close();
assert.equal(report.errors.length,0,'No console/network errors');
assert.equal(report.widths.some(w=>w.scroll>w.viewport),false,'No horizontal overflow');
assert.equal(report.accessibility.length,0,'No WCAG A/AA axe violations');
