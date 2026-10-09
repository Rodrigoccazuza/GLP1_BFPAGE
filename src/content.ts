/**
 * Single source of campaign content.
 * Sources: 2026 campaign banner (plans, prices, journey, FAQ) and the
 * BodyFactory Compounded GLP-1 / GIP Nurse Practitioner Guidelines (care model, dosing, safety).
 * Null / approved:false means unconfirmed: those items are never rendered.
 */
export const program = {
  bookingUrl: 'https://book.bodyfactoryskincare.com/' as string | null,
  generalBookingUrl: 'https://www.bodyfactoryskincare.com/book',
  email: 'hello@bodyfactoryskincare.com',
  home: 'https://www.bodyfactoryskincare.com/',
};

export const facts = [
  { value: 'Once weekly', label: 'Injection schedule' },
  { value: 'Every month', label: 'NP visit before each new month of treatment' },
  { value: 'From $299', label: 'Per month with SlimFit™' },
  { value: 'Baseline lab review', label: 'Included in both memberships' },
];

/** Flyer's six benefits, titles verbatim (client-approved). Bodies qualify titles 1 and 6 against the compounded disclosure. */
export const why = [
  ['bi-patch-check', 'FDA-Approved', 'Semaglutide and tirzepatide are the active ingredients in FDA-approved medicines. Compounded versions are not FDA-approved.'],
  ['bi-calendar-week', 'Once-Weekly Treatment', 'One injection a week, on a schedule your nurse practitioner sets with you.'],
  ['bi-egg-fried', 'Reduced Appetite & Cravings', 'Helps you feel fuller sooner and stay satisfied longer, so eating less feels natural.'],
  ['bi-activity', 'Improved Metabolic Health', 'Supports blood sugar regulation and overall metabolic function alongside weight loss.'],
  ['bi-person-check', 'Personalized Medical Supervision', 'A licensed nurse practitioner reviews your history, labs and goals before anything is prescribed.'],
  ['bi-graph-down-arrow', 'Proven Weight Loss Results', 'Semaglutide and tirzepatide have been studied in large clinical trials. Individual results vary.'],
];

export const plans = [
  {
    id: 'slimfit',
    name: 'SlimFit™',
    tier: 'Foundational Weight Loss Membership',
    therapy: 'GLP-1 therapy',
    ingredient: 'semaglutide',
    price: 299,
    fit: 'Perfect for patients beginning their weight loss journey.',
    intro: 'GLP-1 therapy may help you:',
    benefits: ['Reduce appetite', 'Control cravings', 'Increase feelings of fullness', 'Improve blood sugar regulation', 'Support consistent weight loss'],
    summary: 'Uses GLP-1 therapy to help you achieve sustainable weight loss with medical supervision.',
  },
  {
    id: 'slimfit-plus',
    name: 'SlimFit Plus™',
    tier: 'Advanced Weight Loss Membership',
    therapy: 'GLP-1 + GIP therapy',
    ingredient: 'tirzepatide',
    price: 399,
    fit: 'Ideal for patients looking for our most comprehensive weight loss program.',
    intro: 'GIP works alongside GLP-1 and may help you:',
    benefits: ['Enhance appetite control', 'Improve metabolic function', 'Support greater weight loss potential', 'Improve overall body composition', 'Optimize long-term results'],
    summary: 'Combines GLP-1 and GIP therapy for advanced weight loss support.',
  },
];

/** [label, SlimFit, SlimFit Plus] */
export const inclusions: [string, boolean, boolean][] = [
  ['Initial medical consultation', true, true],
  ['Comprehensive health evaluation', true, true],
  ['Baseline laboratory testing review', true, true],
  ['Personalized treatment plan', true, true],
  ['Weekly injections', true, true],
  ['Ongoing provider supervision', true, true],
  ['Monthly progress evaluations', true, true],
  ['Medication management and dose adjustments as needed', true, true],
];

export const membershipTerms = 'Membership is month to month and billed only after your nurse practitioner confirms you are a candidate.';

export const journey = [
  { title: 'Consultation', icon: 'bi-chat-heart', body: 'Meet with a Body Factory nurse practitioner to discuss your goals, medical history and eligibility.' },
  { title: 'Lab Testing', icon: 'bi-droplet-half', body: 'Complete baseline laboratory testing so your NP can confirm treatment is safe and appropriate for you.' },
  { title: 'Personalized Plan', icon: 'bi-clipboard2-check', body: 'Your NP reviews your results, selects your medication and starting dose, and walks you through side effects and injection instructions.' },
  { title: 'Start Your Transformation', icon: 'bi-arrow-up-right-circle', body: 'Begin your once-weekly treatment with ongoing supervision and a monthly NP visit before each new month is authorized.' },
];

export const care = [
  {
    id: 'first-visit',
    image: { src: 'assets/brand/care-first-visit.webp', alt: 'A BodyFactory nurse practitioner reviews a tablet with a patient during her first visit', position: '46% 32%' },
    tab: 'First Visit',
    title: 'A complete picture before anything is prescribed.',
    intro: 'Your NP will:',
    items: [
      'Review your medical history and current medications',
      'Record weight, height, BMI and vital signs',
      'Review contraindications and potential risks',
      'Discuss your weight loss goals',
      'Order or review baseline labs',
      'Determine whether treatment is appropriate and select your medication and starting dose',
      'Review side effects and injection instructions',
    ],
  },
  {
    id: 'monthly',
    image: { src: 'assets/brand/care-monthly.webp', alt: 'A BodyFactory clinician smiles during a monthly check-in at the studio', position: '62% 30%' },
    tab: 'Every Month',
    title: 'Each month of treatment starts with a visit.',
    intro: 'Your NP will:',
    items: [
      'Record your current weight and review progress',
      'Ask about appetite and cravings',
      'Review side effects and how you tolerate the medication',
      'Confirm your medication, concentration and current dose',
      'Review any new medications or health changes',
      'Decide whether to maintain, increase, decrease, pause or stop treatment',
      'Document your plan for the next month',
    ],
  },
  {
    id: 'dosing',
    image: { src: 'assets/brand/care-dosing.webp', alt: 'A BodyFactory clinician walks a patient through her plan on a tablet', position: '54% 32%' },
    tab: 'Your Dose',
    title: 'Compounded dosing, set by your NP.',
    intro: 'Dosing is set by your prescribing NP, never by a schedule. Before any change, your NP verifies:',
    items: [
      'Medication and compounding pharmacy',
      'Concentration on your current prescription',
      'Dose in mg and the matching injection volume',
      'Your tolerance and response',
    ],
    notes: [
      ['Increases are not automatic.', 'Dose increases are not automatic each month. You may stay at your current dose when you are responding well or managing side effects.'],
    ],
  },
  {
    id: 'safety',
    image: { src: 'assets/brand/care-safety.webp', alt: 'A BodyFactory team member talks with a client in the studio', position: '70% 35%' },
    tab: 'Safety Pauses',
    title: 'We pause first, then evaluate.',
    intro: 'Treatment is held and reviewed for:',
    items: [
      'Significant or persistent vomiting or abdominal pain',
      'Significant dehydration',
      'Serious or unusual side effects',
      'Pregnancy or suspected pregnancy',
      'New medical conditions or significant medication changes',
      'Any other clinical safety concern',
    ],
    urgent: 'Potentially serious symptoms are directed to urgent or emergency care. In an emergency, call 911.',
  },
];

export const benefits = [
  ['bi-lungs-fill', 'Better metabolic health', 'Weight reduction and certain GLP-1 treatments may help improve blood sugar, blood pressure, and cholesterol levels.', 'assets/brand/benefit-metabolic.webp'],
  ['bi-stars', 'Greater body confidence', 'Work toward your individual goals and feel more comfortable in your clothing and daily activities.', 'assets/brand/benefit-confidence.webp'],
  ['bi-feather', 'Renewed self-esteem', 'Celebrate meaningful progress and build a more positive relationship with your body, one step at a time.', 'assets/brand/benefit-self-esteem.webp'],
  ['bi-sun-fill', 'Improved quality of life', 'Meaningful progress may help you feel more comfortable and capable in your daily activities.', 'assets/brand/benefit-quality.webp'],
  ['bi-moon-stars-fill', 'Better sleep health', 'Weight management may improve sleep apnea symptoms for some patients. Ask your NP what applies to you.', 'assets/brand/benefit-sleep.webp'],
];

export const reviews = [
  {
    quote: 'Zhanna is the best! I’ve seen her multiple times now for facials and every session has been fantastic. She’s so knowledgeable and takes the time to fully assess my specific skin needs and give recommendations.',
    name: 'Google review',
    meta: 'Posted August 2026',
    initials: null,
  },
  {
    quote: 'Nina is truly a master at her craft. I loved my sessions with her, I can’t recommend enough. Her attention to detail is unparalleled and I cannot be any happier with my results.',
    name: 'Google review',
    meta: 'Posted August 2026',
    initials: null,
  },
  {
    quote: 'I absolutely love Body Factory Skin Care! From the moment you walk in, you’re welcomed by a warm, relaxing atmosphere and a friendly, professional team that makes you feel comfortable right away. The results exceeded my expectations, and the attention to detail is incredible.',
    name: 'Google review',
    meta: 'Posted July 2026',
    initials: null,
  },
  {
    quote: 'Been going to Kandis for over 4 years now for Botox. Every single time she crushes it. Cannot recommend her enough.',
    name: 'Colby H.',
    meta: 'Yelp review',
    initials: 'CH',
  },
  {
    quote: 'Very accommodating. The tech provided suggestions with clear explanations, but never pushy. Very clean and friendly environment. Would recommend.',
    name: 'M R.',
    meta: 'Yelp review',
    initials: 'MR',
  },
  {
    quote: 'My facial with Mila was amazing and tailored to my needs.',
    name: 'Google review',
    meta: 'Verified client',
    initials: null,
  },
];

export const faqs = [
  ['How do I get started?', 'Book a consultation at any Body Factory studio. Your first visit is with a nurse practitioner, who reviews your goals, medical history and eligibility and guides you through every step from there.'],
  ['Who is a candidate?', 'Adults who are struggling with weight loss, appetite control or metabolic health may qualify. Your nurse practitioner determines whether treatment is appropriate for you after reviewing your history, vitals and baseline labs.'],
  ['Do I need lab work?', 'Yes. Baseline laboratory testing is ordered or reviewed before treatment begins so your NP can confirm it is safe and appropriate for you.'],
  ['How often do I take the medication?', 'Treatment is a once-weekly injection. Your NP sets the schedule with you and reviews it at every monthly visit.'],
  ['Will my dose increase every month?', 'No. Dose changes are decided by your nurse practitioner based on your response and tolerance. Many patients stay at a dose that is working well for them.'],
  ['What is the difference between SlimFit™ and SlimFit Plus™?', 'SlimFit™ uses GLP-1 therapy (semaglutide). SlimFit Plus™ combines GLP-1 and GIP therapy (tirzepatide) for our most comprehensive program. Your NP confirms which, if either, is right for you.'],
  ['Are these treatments safe?', 'Your treatment is prescribed and monitored by a licensed nurse practitioner, with a medical evaluation before you start and at every monthly visit. As with any medication, side effects are possible; your NP reviews them with you and will pause treatment if there is any safety concern.'],
  ['What if I experience side effects?', 'Tell your NP. Mild side effects are reviewed at each visit and may lead to holding your dose. Significant or persistent vomiting, abdominal pain, dehydration or any serious symptom means treatment is paused and you are evaluated, or directed to urgent care if needed.'],
  ['How much weight can I lose?', 'Results vary from person to person and depend on your starting point, your response to treatment and the habits you build alongside it. Your NP tracks your progress every month and adjusts your plan with you.'],
  ['Do you accept insurance?', 'Memberships are self-pay. We accept major credit cards, and you can pay over time with Affirm or Klarna.'],
];

export const locations = [
  { name: 'Hell’s Kitchen', address: '726 9th Ave, New York, NY 10019', image: 'assets/figma/locations/hells-kitchen.webp', url: 'https://www.bodyfactoryskincare.com/studios/hells-kitchen' },
  { name: 'West Village', address: '472 6th Ave, New York, NY 10011', image: 'assets/figma/locations/west-village.webp', url: 'https://www.bodyfactoryskincare.com/studios/west-village' },
  { name: 'Upper East Side', address: '1570 1st Ave, New York, NY 10028', image: 'assets/figma/locations/upper-east-side.webp', url: 'https://www.bodyfactoryskincare.com/studios/upper-east-side' },
];

/**
 * Supplied on the banner, NOT rendered until approved.
 * Requires: real patient, written consent, unedited photos, typical-results disclosure,
 * and clinical/legal sign-off. The banner imagery appears AI-generated.
 */
export const results = {
  approved: false,
  quote: 'BodyFactory changed my life. I have more energy, less cravings, and I’m finally confident in my skin again.',
  attribution: 'Jessica M.',
  cases: [
    { change: '-32 lbs', period: 'in 16 weeks' },
    { change: '-45 lbs', period: 'in 20 weeks' },
  ],
};

export const disclosureShort = 'Compounded medications are not FDA-approved. Prescribed only if your NP determines treatment is appropriate. Individual results vary.';

export const disclosure = 'Compounded medications are not FDA-approved and have not been evaluated by the FDA for safety, effectiveness, or quality. All treatment is medically supervised by a licensed prescribing nurse practitioner (NP), who evaluates you and determines whether it is appropriate. Individual results vary.';
