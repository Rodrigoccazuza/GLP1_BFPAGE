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

  const closeDetail = (detail: HTMLDetailsElement) => {
    const answer = detail.querySelector<HTMLElement>('.faq-answer');
    if (!answer || !detail.open) return;
    gsap.killTweensOf(answer);
    gsap.fromTo(answer,
      { height: answer.offsetHeight, opacity: 1 },
      {
        height: 0,
        opacity: 0,
        duration: .2,
        ease: 'power2.inOut',
        onComplete: () => {
          detail.open = false;
          gsap.set(answer, { clearProps: 'height,opacity' });
        },
      },
    );
  };

  details.forEach(detail => {
    const summary = detail.querySelector<HTMLElement>('summary')!;
    const answer = detail.querySelector<HTMLElement>('.faq-answer')!;
    summary.addEventListener('click', event => {
      if (reduced.matches) return;
      event.preventDefault();
      if (detail.open) {
        closeDetail(detail);
        return;
      }
      details.filter(item => item !== detail && item.open).forEach(closeDetail);
      detail.open = true;
      gsap.killTweensOf(answer);
      gsap.fromTo(answer,
        { height: 0, opacity: 0 },
        { height: answer.scrollHeight, opacity: 1, duration: .28, ease: 'power2.out', onComplete: () => gsap.set(answer, { clearProps: 'height,opacity' }) },
      );
    });
  });
}

setupFaq();

/* ---------- Care stages: scroll-linked progress guide ----------
   Desktop with enough height: the stage pins and scrolling moves through the four panels.
   Otherwise panels stay stacked and a sticky guide tracks the one in view.
   Without JavaScript everything is simply stacked and readable. */
gsap.registerPlugin(ScrollTrigger);

function setupCare() {
  const section = document.querySelector<HTMLElement>('[data-care]');
  if (!section) return;
  const stage = section.querySelector<HTMLElement>('.care-stage')!;
  const panels = Array.from(section.querySelectorAll<HTMLElement>('[data-care-panel]'));
  const steps = Array.from(section.querySelectorAll<HTMLAnchorElement>('[data-care-step]'));
  const current = section.querySelector<HTMLElement>('[data-care-current]');
  const count = panels.length;
  let pinned = false;
  let active = -1;
  let triggers: ScrollTrigger[] = [];

  const setFill = (index: number, fill: number) => steps[index]?.querySelector<HTMLElement>('.care-guide-bar span')?.style.setProperty('--fill', String(Math.max(0, Math.min(1, fill))));

  const activate = (index: number) => {
    if (index === active) return;
    active = index;
    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.classList.toggle('is-done', i < index);
      if (i === index) step.setAttribute('aria-current', 'step'); else step.removeAttribute('aria-current');
    });
    if (current) current.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}  ${steps[index].querySelector('.care-guide-label')?.textContent || ''}`;
    if (!pinned) return;
    panels.forEach((panel, i) => {
      const on = i === index;
      panel.classList.toggle('is-active', on);
      panel.classList.toggle('is-before', i < index);
      panel.toggleAttribute('inert', !on);
      panel.setAttribute('aria-hidden', String(!on));
    });
  };

  const clear = () => {
    triggers.forEach(trigger => trigger.kill());
    triggers = [];
    section.classList.remove('is-pinned');
    panels.forEach(panel => { panel.classList.remove('is-active', 'is-before'); panel.removeAttribute('inert'); panel.removeAttribute('aria-hidden'); });
    active = -1;
  };

  const fits = () => panels.every(panel => {
    const body = panel.querySelector<HTMLElement>('.care-body')!;
    return body.scrollHeight <= panel.clientHeight + 1;
  });

  const build = () => {
    clear();
    const wantPin = !reduced.matches && innerWidth >= 1024 && innerHeight >= 700;
    pinned = false;
    if (wantPin) {
      section.classList.add('is-pinned');
      section.style.setProperty('--care-steps', String(count));
      pinned = fits();
      if (!pinned) section.classList.remove('is-pinned');
    }
    if (pinned) {
      triggers.push(ScrollTrigger.create({
        trigger: stage,
        start: 'top top+=76',
        end: 'bottom bottom',
        onUpdate: self => {
          const position = self.progress * count;
          steps.forEach((_, i) => setFill(i, position - i));
          activate(Math.min(count - 1, Math.floor(position)));
        },
        onRefresh: self => {
          const position = self.progress * count;
          steps.forEach((_, i) => setFill(i, position - i));
          activate(Math.min(count - 1, Math.floor(position)));
        },
      }));
    } else {
      panels.forEach((panel, i) => {
        triggers.push(ScrollTrigger.create({
          trigger: panel,
          start: 'top 60%',
          end: 'bottom 60%',
          onUpdate: self => setFill(i, self.progress),
          onToggle: self => { if (self.isActive) activate(i); },
          onLeave: () => setFill(i, 1),
          onLeaveBack: () => setFill(i, 0),
        }));
      });
      activate(0);
    }
    ScrollTrigger.refresh();
  };

  // Guide links: in pinned mode jump to the scroll position of that stage.
  steps.forEach((step, index) => step.addEventListener('click', event => {
    if (!pinned) return;
    event.preventDefault();
    const trigger = triggers[0];
    const target = trigger.start + (trigger.end - trigger.start) * ((index + .5) / count);
    scrollTo({ top: target, behavior: reduced.matches ? 'auto' : 'smooth' });
  }));

  let resizeTimer = 0;
  addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = window.setTimeout(build, 200); });
  reduced.addEventListener('change', build);
  build();
}

setupCare();

/* ---------- Sticky mobile CTA: visible between hero and final CTA ---------- */
function setupStickyCta() {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const hero = document.querySelector('[data-hero-section]');
  const end = document.querySelectorAll('[data-final-cta], .footer');
  if (!bar || !hero) return;
  let pastHero = false;
  let nearEnd = false;
  const update = () => {
    const show = pastHero && !nearEnd && !document.querySelector('dialog[open]');
    bar.classList.toggle('is-visible', show);
    bar.toggleAttribute('inert', !show);
    bar.setAttribute('aria-hidden', String(!show));
  };
  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  }).observe(hero);
  const visibleEnds = new Set<Element>();
  const endObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visibleEnds.add(entry.target) : visibleEnds.delete(entry.target));
    nearEnd = visibleEnds.size > 0;
    update();
  });
  end.forEach(element => endObserver.observe(element));
}

setupStickyCta();

/* ---------- Journey line geometry: from the centre of the first icon to the centre of the last ---------- */
function stepGeometry(list: HTMLElement) {
  const icons = Array.from(list.querySelectorAll<HTMLElement>('.step-icon'));
  const top = list.getBoundingClientRect().top;
  const centers = icons.map(icon => { const r = icon.getBoundingClientRect(); return r.top - top + r.height / 2; });
  const start = centers[0] || 0;
  const length = (centers[centers.length - 1] || 0) - start;
  return { start, length, centers };
}

function setupStepLine() {
  const list = document.querySelector<HTMLElement>('[data-steps]');
  if (!list) return;
  const place = () => {
    const { start, length } = stepGeometry(list);
    list.style.setProperty('--line-start', `${start}px`);
    list.style.setProperty('--line-length', `${length}px`);
  };
  place();
  new ResizeObserver(place).observe(list);
}

setupStepLine();

/* ---------- Lifestyle: vertical page scroll drives the cards horizontally ----------
   The section pins while the rail translates; scrub keeps the motion glued to the
   reader's scroll. With reduced motion the rail stays a native horizontal
   scroller (see the reduced-motion CSS). */
function setupLifestyle() {
  const section = document.querySelector<HTMLElement>('[data-lifestyle]');
  const rail = section?.querySelector<HTMLElement>('[data-lifestyle-rail]');
  if (!section || !rail || reduced.matches) return;

  const distance = () => {
    const start = rail.getBoundingClientRect().left - section.getBoundingClientRect().left;
    return Math.max(0, start + rail.scrollWidth - section.clientWidth);
  };

  gsap.to(rail, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.max(1, distance())}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Entrance: cards drift in once as the section arrives, then the scrub takes over.
  gsap.from('.life-card', {
    x: 60, opacity: 0, stagger: .08, duration: .6, ease: 'power3.out', clearProps: 'transform,opacity',
    scrollTrigger: { trigger: section, start: 'top 85%', once: true },
  });

  ScrollTrigger.refresh();
}

setupLifestyle();

/* ---------- Reviews: arrow-driven snap carousel ---------- */
function setupReviews() {
  const rail = document.querySelector<HTMLElement>('[data-reviews-rail]');
  const prev = document.querySelector<HTMLButtonElement>('[data-reviews-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-reviews-next]');
  if (!rail || !prev || !next) return;
  const step = () => {
    const card = rail.querySelector<HTMLElement>('.review-card');
    const gap = parseFloat(getComputedStyle(rail).columnGap || '24');
    return (card?.offsetWidth || 320) + gap;
  };
  const update = () => {
    prev.disabled = rail.scrollLeft <= 2;
    next.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
  };
  const behavior = reduced.matches ? 'auto' : 'smooth';
  prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior }));
  rail.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

setupReviews();

/* ---------- Motion vocabulary (skipped entirely with reduced motion) ---------- */
if (!reduced.matches) {

  document.querySelectorAll<HTMLElement>('[data-animate-words], [data-highlight-words]').forEach(splitWords);

  // M1 · Hero entrance: once per visit, establishes reading order.
  gsap.timeline({ defaults: { duration: .7, ease: 'power3.out' } })
    .from('[data-hero] .eyebrow', { y: 12, opacity: 0 })
    .from('[data-hero] h1 .word', { yPercent: 100, opacity: 0, stagger: .03 }, '-=.5')
    .from('[data-hero] .hero-sub', { y: 12, opacity: 0 }, '-=.45')
    .from('[data-hero] .hero-actions > *', { y: 12, opacity: 0, stagger: .06 }, '-=.45');
  gsap.from('.hero-visual img', { opacity: 0, scale: 1.03, duration: 1.1, ease: 'power3.out', delay: .15 });

  // M1b · Hero notifications pop in one by one as the photo scrolls into view, like incoming messages.
  //       Each enters with a small overshoot from below; scrolling back up tucks them away again.
  gsap.utils.toArray<HTMLElement>('.hero-note').forEach((note, index) => {
    if (!note.offsetParent) return; // hidden on mobile (first-visit card)
    gsap.set(note, { opacity: 0, y: 18, scale: .86 });
    gsap.to(note, {
      opacity: 1, y: 0, scale: 1, duration: .55, delay: index * .15, ease: 'back.out(1.8)',
      scrollTrigger: { trigger: '[data-hero-visual]', start: `top ${82 - index * 9}%`, toggleActions: 'play none none reverse' },
    });
  });

  // M2 · Section heading reveal: short rise, headings only.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
    gsap.from(element, { y: 16, opacity: 0, duration: .6, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
  });

  // M3 · Statement read-through: scrubbed color follows the reader.
  document.querySelectorAll<HTMLElement>('[data-highlight-words]').forEach(element => {
    gsap.to(element.querySelectorAll('.word'), { color: '#111716', stagger: .08, ease: 'none', scrollTrigger: { trigger: element, start: 'top 80%', end: 'bottom 45%', scrub: .4 } });
  });

  // M4 · Why cards arrive from the side they sit on, relating them to the vial.
  const wide = matchMedia('(min-width: 1024px)').matches;
  gsap.utils.toArray<HTMLElement>('.care-card').forEach((card, index) => {
    gsap.from(card, { x: wide ? (index < 3 ? -24 : 24) : 0, y: wide ? 0 : 16, opacity: 0, duration: .6, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
  });
  gsap.from('.program-image-wrap img', { scale: .92, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.benefit-orbit', start: 'top 80%', once: true } });

  // M5 · Journey: a progress line draws from icon 1 to icon 4 behind the icons; each step lights up when reached.
  const steps = document.querySelector<HTMLElement>('[data-steps]');
  if (steps) {
    const cards = Array.from(steps.querySelectorAll<HTMLElement>('.step-card'));
    steps.classList.add('is-live');
    ScrollTrigger.create({
      trigger: steps,
      start: 'top 70%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: self => {
        steps.style.setProperty('--p', self.progress.toFixed(3));
        const { start, length, centers } = stepGeometry(steps);
        const reach = start + self.progress * length;
        cards.forEach((card, i) => card.classList.toggle('is-reached', centers[i] <= reach + 1));
      },
    });
    gsap.from(cards, { x: 24, opacity: 0, stagger: .12, duration: .6, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: steps, start: 'top 80%', once: true } });
  }

  // M6 · Membership table: rows rise in as they enter, then their checks pop to confirm inclusion.
  const rows = gsap.utils.toArray<HTMLElement>('[data-row]');
  gsap.set(rows, { opacity: 0, y: 14 });
  gsap.set('[data-row] td .bi', { scale: .3, opacity: 0 });
  ScrollTrigger.batch(rows, {
    start: 'top 92%',
    once: true,
    onEnter: batch => {
      gsap.to(batch, { opacity: 1, y: 0, stagger: .07, duration: .45, ease: 'power2.out' });
      gsap.to(batch.flatMap(row => Array.from(row.querySelectorAll('td .bi'))), { scale: 1, opacity: 1, stagger: .05, duration: .4, delay: .15, ease: 'back.out(2.2)' });
    },
  });

  // M7 · Plan cards arrive once, then stay still so prices read clearly.
  gsap.from('.plan', { y: 32, opacity: 0, stagger: .12, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.plan-grid', start: 'top 82%', once: true } });

  // M9 · Hero image drifts slightly slower than the page for depth; final vials settle into place.
  gsap.to('.hero-visual img', { yPercent: -5, ease: 'none', scrollTrigger: { trigger: '.hero-visual', start: 'top 60%', end: 'bottom top', scrub: true } });
  gsap.fromTo('.final-cta img', { y: 60, rotate: -6 }, { y: 0, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.final-cta', start: 'top bottom', end: 'top 30%', scrub: true } });

  // M10 · FAQ rows settle in sequence.
  gsap.from('.faq-list details', { y: 12, opacity: 0, stagger: .05, duration: .45, ease: 'power2.out', scrollTrigger: { trigger: '.faq-list', start: 'top 85%', once: true } });

  // M11 · Review cards rise in as the rail arrives.
  gsap.from('.review-card', { y: 24, opacity: 0, stagger: .08, duration: .6, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '[data-reviews-rail]', start: 'top 88%', once: true } });

  // M8 · Location cards unmask upward, one gesture for the group.
  gsap.from('.location-card', { clipPath: 'inset(12% 0 0 0 round 32px)', opacity: 0, stagger: .1, duration: .8, ease: 'power3.out', clearProps: 'clipPath', scrollTrigger: { trigger: '.location-grid', start: 'top 85%', once: true } });
}
