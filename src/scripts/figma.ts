import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav')!;
function closeMenu() { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Open menu'); }
menuButton.addEventListener('click', () => { const open = mobileNav.hidden; mobileNav.hidden = !open; menuButton.setAttribute('aria-expanded',String(open)); menuButton.setAttribute('aria-label',open ? 'Close menu' : 'Open menu'); });
mobileNav.addEventListener('click', e => { if ((e.target as Element).closest('a,button')) closeMenu(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

const booking = document.querySelector<HTMLDialogElement>('#booking-dialog')!;
const assessment = document.querySelector<HTMLDialogElement>('#assessment-dialog')!;
let returnFocus: HTMLElement | null = null;
function openDialog(dialog: HTMLDialogElement, trigger?: HTMLElement) { closeMenu(); returnFocus = trigger || document.activeElement as HTMLElement; dialog.showModal(); document.documentElement.classList.add('dialog-open'); }
document.querySelectorAll<HTMLElement>('[data-action]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); const dialog = el.dataset.action === 'assessment' ? assessment : booking; if (dialog === assessment) resetAssessment(); openDialog(dialog, el); }));
for(const dialog of [booking,assessment]) {
  dialog.querySelector<HTMLButtonElement>('[data-close]')!.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('dialog-open'); if(dialog===assessment)resetAssessment(); returnFocus?.focus({preventScroll:true});});
}
const questions = [
 {title:'What brings you here?',options:['I’m exploring medical weight management','I want to understand GLP-1 treatment','I’m ready to speak with a provider']},
 {title:'What would you like to discuss first?',options:['Treatment options and suitability','The care experience and follow-ups','Program costs and what’s included']},
 {title:'What would feel like a helpful next step?',options:['A conversation with the BodyFactory team','More information before I book','A provider evaluation']}
];
let step = 0; const answers:string[]=[];
const form = document.querySelector<HTMLFormElement>('#assessment-form')!;
const question = document.querySelector<HTMLElement>('#assessment-question')!;
const result = document.querySelector<HTMLElement>('#assessment-result')!;
function renderQuestion(focus=false){ const q=questions[step]; question.innerHTML=`<fieldset><legend tabindex="-1">${q.title}</legend>${q.options.map(option=>`<label class="assessment-option"><input type="radio" name="intent" value="${option}" ${answers[step]===option?'checked':''}><span>${option}</span></label>`).join('')}</fieldset>`; document.querySelector('#assessment-count')!.textContent=`0${step+1} / 03`; document.querySelector<HTMLProgressElement>('#assessment-progress')!.value=step+1; document.querySelector<HTMLElement>('#assessment-back')!.hidden=step===0; document.querySelector('#assessment-next')!.innerHTML=step===2?'See my next step →':'Continue →'; document.querySelector<HTMLElement>('#assessment-error')!.hidden=true; if(focus)question.querySelector<HTMLElement>('legend')?.focus(); }
function resetAssessment(){step=0;answers.length=0;form.hidden=false;result.hidden=true;result.replaceChildren();document.querySelector<HTMLElement>('.assessment-intro')!.hidden=false;renderQuestion();}
form.addEventListener('submit',e=>{e.preventDefault();const selected=new FormData(form).get('intent') as string|null;if(!selected){document.querySelector<HTMLElement>('#assessment-error')!.hidden=false;question.querySelector<HTMLInputElement>('input')?.focus();return;}answers[step]=selected;if(step<2){step++;renderQuestion(true);return;}form.hidden=true;document.querySelector<HTMLElement>('.assessment-intro')!.hidden=true;document.querySelector('#assessment-count')!.textContent='READY TO TALK';result.hidden=false;result.innerHTML='<h3 tabindex="-1">Your next step is a conversation.</h3><p>Only a licensed clinician can determine whether GLP-1 treatment is appropriate. These answers do not assess medical eligibility.</p><div class="assessment-summary"><strong>Your conversation starter</strong><p></p></div><button class="action" type="button" id="result-book">Book a GLP-1 consultation ↗</button><button class="text-link" type="button" id="restart-assessment">Start again</button>';result.querySelector('.assessment-summary p')!.textContent=answers[1];result.querySelector<HTMLElement>('h3')!.focus();result.querySelector('#result-book')!.addEventListener('click',()=>{assessment.close();openDialog(booking,returnFocus||undefined);});result.querySelector('#restart-assessment')!.addEventListener('click',()=>{resetAssessment();question.querySelector<HTMLElement>('legend')?.focus();});});
form.addEventListener('change',()=>document.querySelector<HTMLElement>('#assessment-error')!.hidden=true);
document.querySelector('#assessment-back')!.addEventListener('click',()=>{const selected=new FormData(form).get('intent') as string|null;if(selected)answers[step]=selected;step=Math.max(0,step-1);renderQuestion(true);});

// Leave every section visible if motion is reduced or JavaScript has not loaded.
if (!reduced.matches) {
 gsap.registerPlugin(ScrollTrigger);
 const hero = gsap.timeline({defaults:{duration:.85,ease:'power3.out'}});
 hero.from('[data-hero] .eyebrow',{y:20,opacity:0}).from('[data-hero] h1',{y:38,opacity:0},'-=.55').from('[data-hero] .hero-sub',{y:22,opacity:0},'-=.55').from('[data-hero] .hero-actions',{y:22,opacity:0},'-=.55');
 gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el)=>{gsap.from(el,{y:45,opacity:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});});
 gsap.from('.stats>div',{y:26,opacity:0,stagger:.14,duration:.7,ease:'power3.out',scrollTrigger:{trigger:'.stats',start:'top 80%',once:true}});
 gsap.from('.hero-visual img',{scale:1.08,duration:1.5,ease:'power3.out',delay:.2});
 gsap.utils.toArray<HTMLElement>('.care-card').forEach((el,i)=>gsap.from(el,{x:i<3?-32:32,opacity:0,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
 gsap.from('.final-cta .pill',{y:20,opacity:0,duration:.8,scrollTrigger:{trigger:'.final-cta',start:'top 65%',once:true}});
}
