import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const arrowSvg = '<svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"/></svg>';

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const open = mobileNav.hidden;
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  mobileNav.addEventListener('click', event => {
    if ((event.target as Element).closest('a,button')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const booking = document.querySelector<HTMLDialogElement>('#booking-dialog');
const assessment = document.querySelector<HTMLDialogElement>('#assessment-dialog');
let returnFocus: HTMLElement | null = null;

function openDialog(dialog: HTMLDialogElement, trigger?: HTMLElement) {
  closeMenu();
  returnFocus = trigger || document.activeElement as HTMLElement;
  dialog.showModal();
  document.documentElement.classList.add('dialog-open');
  requestAnimationFrame(() => dialog.querySelector<HTMLElement>('button, [href], input')?.focus());
}

if (booking && assessment) {
  document.addEventListener('click', event => {
    const trigger = (event.target as Element).closest<HTMLElement>('[data-action]');
    if (!trigger) return;
    event.preventDefault();
    if (trigger.dataset.action === 'assessment') {
      resetAssessment();
      openDialog(assessment, trigger);
    } else {
      openDialog(booking, trigger);
    }
  });

  for (const dialog of [booking, assessment]) {
    dialog.querySelector<HTMLButtonElement>('[data-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')).filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    });
    dialog.addEventListener('close', () => {
      if (dialog === assessment) resetAssessment();
      if (!document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove('dialog-open');
        returnFocus?.focus({ preventScroll: true });
      }
    });
  }
}

const questions = [
  { title: 'What brings you here?', options: ['I’m exploring medical weight management', 'I want to understand GLP-1 treatment', 'I’m ready to speak with a provider'] },
  { title: 'What would you like to discuss first?', options: ['Treatment options and suitability', 'The care experience and follow-ups', 'Program costs and what’s included'] },
  { title: 'What would feel like a helpful next step?', options: ['A conversation with the BodyFactory team', 'More information before I book', 'A provider evaluation'] },
];

let step = 0;
const answers: string[] = [];
const assessmentForm = document.querySelector<HTMLFormElement>('#assessment-form');
const question = document.querySelector<HTMLElement>('#assessment-question');
const result = document.querySelector<HTMLElement>('#assessment-result');

function renderQuestion(focus = false) {
  if (!assessmentForm || !question) return;
  const current = questions[step];
  question.innerHTML = `<fieldset><legend tabindex="-1">${current.title}</legend>${current.options.map(option => `<label class="assessment-option"><input type="radio" name="intent" value="${option}" ${answers[step] === option ? 'checked' : ''}><span>${option}</span></label>`).join('')}</fieldset>`;
  document.querySelector('#assessment-count')!.textContent = `0${step + 1} / 03`;
  document.querySelector<HTMLProgressElement>('#assessment-progress')!.value = step + 1;
  document.querySelector<HTMLElement>('#assessment-back')!.hidden = step === 0;
  document.querySelector('#assessment-next')!.innerHTML = `${step === 2 ? 'See my result' : 'Continue'} ${arrowSvg}`;
  document.querySelector<HTMLElement>('#assessment-error')!.hidden = true;
  if (focus) question.querySelector<HTMLElement>('legend')?.focus();
}

function resetAssessment() {
  if (!assessmentForm || !result) return;
  step = 0;
  answers.length = 0;
  assessmentForm.hidden = false;
  result.hidden = true;
  result.replaceChildren();
  document.querySelector<HTMLElement>('.assessment-intro')!.hidden = false;
  renderQuestion();
}

function showAssessmentResult() {
  if (!assessmentForm || !result || !assessment || !booking) return;
  assessmentForm.hidden = true;
  document.querySelector<HTMLElement>('.assessment-intro')!.hidden = true;
  document.querySelector('#assessment-count')!.textContent = 'YOUR RESULT';
  result.hidden = false;
  result.innerHTML = `
    <h3 tabindex="-1">Your next step is a conversation.</h3>
    <p>Only a licensed clinician can determine whether GLP-1 treatment is appropriate. Your answers do not assess medical eligibility.</p>
    <div class="assessment-summary"><strong>Your conversation starter</strong><p></p></div>
    <form class="result-email" id="result-email-form">
      <label>Email address<input type="email" name="email" autocomplete="email" placeholder="you@example.com" required></label>
      <label class="consent-row"><input type="checkbox" name="consent" required><span>I consent to BodyFactory using my email to deliver this result and to the essential cookies required for secure form submission. I understand delivery is not active in this preview.</span></label>
      <button class="action primary" type="submit">Receive your result by email ${arrowSvg}</button>
      <p class="delivery-status" role="status" hidden></p>
    </form>
    <button class="text-link" type="button" id="result-book">Book a consultation ${arrowSvg}</button>
    <button class="text-link" type="button" id="restart-assessment">Start again</button>`;
  result.querySelector<HTMLElement>('.assessment-summary p')!.textContent = answers[1];
  result.querySelector<HTMLElement>('h3')!.focus();
  result.querySelector<HTMLFormElement>('#result-email-form')!.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (!form.reportValidity()) return;
    const status = form.querySelector<HTMLElement>('.delivery-status')!;
    status.hidden = false;
    status.textContent = 'The email form is ready. Connect the secure delivery service to activate sending.';
  });
  result.querySelector('#result-book')!.addEventListener('click', () => {
    assessment.close();
    openDialog(booking, returnFocus || undefined);
  });
  result.querySelector('#restart-assessment')!.addEventListener('click', () => {
    resetAssessment();
    question?.querySelector<HTMLElement>('legend')?.focus();
  });
}

if (assessmentForm && question && result) {
  assessmentForm.addEventListener('submit', event => {
    event.preventDefault();
    const selected = new FormData(assessmentForm).get('intent') as string | null;
    if (!selected) {
      document.querySelector<HTMLElement>('#assessment-error')!.hidden = false;
      question.querySelector<HTMLInputElement>('input')?.focus();
      return;
    }
    answers[step] = selected;
    if (step < 2) {
      step += 1;
      renderQuestion(true);
      return;
    }
    showAssessmentResult();
  });
  assessmentForm.addEventListener('change', () => document.querySelector<HTMLElement>('#assessment-error')!.hidden = true);
  document.querySelector('#assessment-back')?.addEventListener('click', () => {
    const selected = new FormData(assessmentForm).get('intent') as string | null;
    if (selected) answers[step] = selected;
    step = Math.max(0, step - 1);
    renderQuestion(true);
  });
}

function splitWords(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    if (!node.textContent?.trim()) continue;
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(part => {
      if (!part) return;
      if (/^\s+$/.test(part)) fragment.append(part);
      else {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        fragment.append(span);
      }
    });
    node.replaceWith(fragment);
  }
}

function setupFaq() {
  const details = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-faq] details'));
  details.forEach(detail => {
    const summary = detail.querySelector<HTMLElement>('summary')!;
    summary.addEventListener('click', event => {
      if (reduced.matches) return;
      event.preventDefault();
      if (detail.open) {
        gsap.to(detail, { height: summary.offsetHeight, duration: .38, ease: 'power2.inOut', onComplete: () => { detail.open = false; detail.style.height = ''; } });
        return;
      }
      details.filter(item => item !== detail && item.open).forEach(item => {
        item.open = false;
        item.style.height = '';
      });
      detail.open = true;
      const targetHeight = detail.scrollHeight;
      gsap.fromTo(detail, { height: summary.offsetHeight }, { height: targetHeight, duration: .48, ease: 'power3.inOut', onComplete: () => { detail.style.height = 'auto'; } });
    });
  });
}

setupFaq();

if (!reduced.matches) {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll<HTMLElement>('[data-animate-words]').forEach(splitWords);

  const heroTimeline = gsap.timeline({ defaults: { duration: .85, ease: 'power3.out' } });
  heroTimeline
    .from('[data-hero] .eyebrow', { y: 18, opacity: 0 })
    .from('[data-hero] h1 .word', { yPercent: 115, opacity: 0, stagger: .035 }, '-=.58')
    .from('[data-hero] .hero-sub', { y: 24, opacity: 0 }, '-=.55')
    .from('[data-hero] .hero-actions > *', { y: 20, opacity: 0, stagger: .08 }, '-=.58');

  gsap.from('.hero-visual img', { scale: 1.075, duration: 1.5, ease: 'power3.out', delay: .18 });
  gsap.from('.hero-foot', { y: 20, opacity: 0, duration: .8, delay: .7, ease: 'power3.out' });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { y: 42, opacity: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
  });

  document.querySelectorAll<HTMLElement>('[data-animate-words]').forEach(element => {
    if (element.closest('[data-hero]')) return;
    gsap.from(element.querySelectorAll('.word'), { yPercent: 85, opacity: 0, stagger: .025, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } });
  });

  document.querySelectorAll<HTMLElement>('[data-counter]').forEach(counter => {
    const value = Number(counter.dataset.value || 0);
    const suffix = counter.dataset.suffix || '';
    const decimals = Number.isInteger(value) ? 0 : 1;
    const state = { value: 0 };
    gsap.to(state, { value, duration: 1.7, ease: 'power2.out', scrollTrigger: { trigger: counter, start: 'top 88%', once: true }, onUpdate: () => { counter.textContent = `${state.value.toFixed(decimals)}${suffix}`; } });
  });

  document.querySelectorAll<HTMLElement>('[data-fit-card]').forEach(card => {
    gsap.from(card.querySelectorAll('h3, li'), { y: 18, opacity: 0, stagger: .12, duration: .65, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 84%', once: true } });
  });

  gsap.utils.toArray<HTMLElement>('.care-card').forEach((card, index) => {
    gsap.from(card, { x: index < 3 ? -38 : 38, y: 12, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });

  gsap.from('.program-image-wrap img', { scale: .86, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.benefit-orbit', start: 'top 76%', once: true } });

  gsap.from('.location-card', { y: 70, clipPath: 'inset(100% 0 0 0 round 26px)', opacity: .6, stagger: .16, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.location-grid', start: 'top 82%', once: true } });
  gsap.from('.location-copy', { y: 26, opacity: 0, stagger: .16, duration: .7, delay: .3, ease: 'power3.out', scrollTrigger: { trigger: '.location-grid', start: 'top 82%', once: true } });
}
