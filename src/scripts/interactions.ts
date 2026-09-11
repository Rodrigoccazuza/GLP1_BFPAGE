const $ = <T extends Element = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 767px)');
const booking = $<HTMLDialogElement>('#booking-dialog');
const assessment = $<HTMLDialogElement>('#assessment-dialog');
const focusTargets = new WeakMap<HTMLDialogElement, HTMLElement>();
function closeMenu() {
  $('#mobile-nav').setAttribute('hidden', '');
  $('.menu-toggle').setAttribute('aria-expanded', 'false');
  $('.menu-toggle').setAttribute('aria-label', 'Open navigation');
}
function openDialog(dialog: HTMLDialogElement, returnFocus = document.activeElement as HTMLElement) {
  closeMenu();
  focusTargets.set(dialog, returnFocus);
  dialog.showModal();
  document.documentElement.classList.add('dialog-open');
}
document.addEventListener('click', (event) => {
  const trigger = (event.target as Element).closest<HTMLElement>('[data-action]');
  if (!trigger) return;
  event.preventDefault();
  if (trigger.dataset.action === 'assessment') { resetAssessment(); openDialog(assessment); }
  else openDialog(booking);
});
for (const dialog of [booking, assessment]) {
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]')).filter(el => el.getClientRects().length > 0);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    if (dialog === assessment) resetAssessment();
    if (!document.querySelector('dialog[open]')) focusTargets.get(dialog)?.focus({ preventScroll:true });
  });
}
$('.menu-toggle').addEventListener('click', () => {
  const open = $('.menu-toggle').getAttribute('aria-expanded') !== 'true';
  $('#mobile-nav').toggleAttribute('hidden', !open);
  $('.menu-toggle').setAttribute('aria-expanded', String(open));
  $('.menu-toggle').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
$('#mobile-nav').addEventListener('click', event => { if ((event.target as Element).closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
mobile.addEventListener('change', closeMenu);

// Nonclinical intent only: no BMI, health history, diagnosis, tracking, or persistence.
const questions = [
  { title:'What brings you here?', options:['I’m exploring medical weight management', 'I want to understand GLP-1 treatment', 'I’m ready to speak with a provider'] },
  { title:'What would you like to discuss first?', options:['Treatment options and suitability', 'The care experience and follow-ups', 'Program costs and what’s included'] },
  { title:'What would feel like a helpful next step?', options:['A conversation with the BodyFactory team', 'More information before I book', 'A provider evaluation'] },
];
let current = 0;
let answers: string[] = [];
const form = $<HTMLFormElement>('#assessment-form');
function renderQuestion(focus = false) {
  const q = questions[current];
  $('#assessment-question').innerHTML = `<fieldset><legend tabindex="-1">${q.title}</legend>${q.options.map(option => `<label class="assessment-option"><input type="radio" name="intent" value="${option}" ${answers[current] === option ? 'checked' : ''}/><span>${option}</span></label>`).join('')}</fieldset>`;
  $('#assessment-count').textContent = `0${current+1} / 03`;
  $<HTMLProgressElement>('#assessment-progress').value = current+1;
  $('#assessment-back').hidden = current === 0;
  $('#assessment-error').hidden = true;
  $('#assessment-next').innerHTML = current === 2 ? 'See my next step <span aria-hidden="true">→</span>' : 'Continue <span aria-hidden="true">→</span>';
  if (focus) $('#assessment-question legend').focus();
}
function resetAssessment() {
  current = 0; answers = [];
  form.hidden = false;
  $('#assessment-result').hidden = true;
  $('#assessment-result').replaceChildren();
  $('.assessment-intro').removeAttribute('hidden');
  renderQuestion();
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const selected = new FormData(form).get('intent') as string | null;
  if (!selected) { $('#assessment-error').hidden = false; form.querySelector<HTMLInputElement>('input')?.focus(); return; }
  answers[current] = selected;
  if (current < 2) { current++; renderQuestion(true); return; }
  form.hidden = true;
  $('.assessment-intro').setAttribute('hidden','');
  $('#assessment-count').textContent = 'READY TO TALK';
  const result = $('#assessment-result');
  result.hidden = false;
  result.innerHTML = `<h3 tabindex="-1">Your next step is a conversation.</h3><p>Only a licensed provider can determine whether you may be a candidate for GLP-1 treatment. These answers do not assess medical eligibility.</p><div class="assessment-summary"><strong>Your conversation starter</strong><p>${answers[1]}</p></div><p>Bring this topic to the BodyFactory team. You can ask questions before deciding what comes next.</p><button class="action primary" type="button" id="result-book">Book a GLP-1 consultation <span aria-hidden="true">↗</span></button><button type="button" class="text-link" id="restart-assessment">Start again</button>`;
  result.querySelector<HTMLElement>('h3')!.focus();
  $('#result-book').addEventListener('click', () => { const origin = focusTargets.get(assessment); assessment.close(); openDialog(booking, origin); });
  $('#restart-assessment').addEventListener('click', () => { resetAssessment(); $('#assessment-question legend').focus(); });
});
form.addEventListener('change', () => { $('#assessment-error').hidden = true; });
$('#assessment-back').addEventListener('click', () => {
  const selected = new FormData(form).get('intent') as string | null;
  if (selected) answers[current] = selected;
  current = Math.max(0,current-1); renderQuestion(true);
});

const railItems = Array.from(document.querySelectorAll<HTMLElement>('.rail-item'));
const panels = Array.from(document.querySelectorAll<HTMLElement>('.journey-panel'));
function activateStep(index: number) {
  railItems.forEach((item,i) => {
    item.classList.toggle('is-active',i === index); item.classList.toggle('is-complete',i < index);
    if (i === index) item.setAttribute('aria-current','step'); else item.removeAttribute('aria-current');
    item.querySelector('.rail-status')!.textContent = i === index ? 'Current step' : i < index ? 'Completed step' : 'Upcoming step';
  });
  $('.rail-track span').style.transform = `scaleY(${index / 3})`;
  $('#current-step').textContent = `0${index+1}`;
  panels.forEach((panel,i) => { panel.classList.toggle('is-current', i === index); panel.classList.toggle('is-complete', i < index); });
}
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (visible.length) activateStep(Number((visible[0].target as HTMLElement).dataset.panel));
}, {rootMargin:'-25% 0px -50% 0px', threshold:0});
panels.forEach(panel => observer.observe(panel));

const video = $<HTMLVideoElement>('.hero-video');
const videoToggle = $<HTMLButtonElement>('.video-toggle');
let manuallyPaused = false;
let heroVisible = true;
let finalVisible = false;
let outsideHero = false;
function updateVideo() {
  const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (reduced.matches || mobile.matches || dataSaver || !heroVisible || document.hidden || manuallyPaused) { video.pause(); return; }
  if (!video.src) video.src = video.dataset.src!;
  video.play().catch(() => { videoToggle.hidden = false; videoToggle.textContent = 'Play film ▷'; videoToggle.setAttribute('aria-label', 'Play background video'); });
}
video.addEventListener('playing', () => { video.classList.add('is-playing'); videoToggle.hidden = false; videoToggle.textContent = 'Pause film Ⅱ'; videoToggle.setAttribute('aria-label', 'Pause background video'); });
videoToggle.addEventListener('click', () => {
  manuallyPaused = !video.paused;
  if (manuallyPaused) { video.pause(); videoToggle.textContent = 'Play film ▷'; videoToggle.setAttribute('aria-label','Play background video'); }
  else updateVideo();
});
function syncMotion() { if (reduced.matches || mobile.matches) { video.pause(); video.classList.remove('is-playing'); videoToggle.hidden = true; } else updateVideo(); }
reduced.addEventListener('change', syncMotion); mobile.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', updateVideo);
function updateSticky() { $('.mobile-booking').hidden = !outsideHero || finalVisible; }
new IntersectionObserver(entries => {
  const entry = entries[0]; heroVisible = entry.isIntersecting; outsideHero = entry.boundingClientRect.bottom < 0;
  updateVideo(); updateSticky();
},{threshold:0}).observe($('.hero'));
new IntersectionObserver(entries => { finalVisible = entries[0].isIntersecting; updateSticky(); },{threshold:0}).observe($('.final'));
