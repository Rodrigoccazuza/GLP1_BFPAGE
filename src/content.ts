/**
 * Single source of campaign content.
 * Sources: 2026 campaign banner (plans, prices, journey, FAQ) and the
 * BodyFactory Compounded GLP-1 / GIP Nurse Practitioner Guidelines (care model, dosing, safety).
 * Null / approved:false means unconfirmed: those items are never rendered.
 */
export const program = {
  bookingUrl: null as string | null,
  generalBookingUrl: 'https://www.bodyfactoryskincare.com/book',
  email: 'hello@bodyfactoryskincare.com',
  home: 'https://www.bodyfactoryskincare.com/',
};

export const facts = [
  { value: 'Once weekly', label: 'Injection schedule' },
  { value: 'Every month', label: 'NP visit before each new month of treatment' },
  { value: 'From $299', label: 'Per month with SlimFit™' },
  { value: 'Baseline labs', label: 'Included in both memberships' },
];

export const why = [
  ['bi-calendar-week', 'Once-weekly treatment', 'One injection a week, on a schedule your nurse practitioner sets with you.'],
  ['bi-egg-fried', 'Reduced appetite & cravings', 'GLP-1 and GIP therapies may help you eat less and feel fuller for longer.'],
  ['bi-activity', 'Metabolic health support', 'Care that looks at blood sugar, metabolism, and body composition, not only the scale.'],
  ['bi-person-check', 'Personalized supervision by an NP', 'A nurse practitioner reviews your history, labs, and goals before anything is prescribed.'],
  ['bi-clipboard2-pulse', 'Monthly NP check-ins', 'Each new month of treatment is authorized only after your nurse practitioner sees you.'],
  ['bi-sliders', 'A dose that fits you', 'Your NP adjusts your dose based on your response. Increases are never automatic.'],
];

export const plans = [
  {
    id: 'slimfit',
    name: 'SlimFit™',
    tier: 'Foundational weight loss membership',
    therapy: 'GLP-1 therapy',
    ingredient: 'Semaglutide',
    price: 299,
    meds: 'Medication included in the monthly price: weekly GLP-1 injections (semaglutide).',
    fit: 'Perfect for patients beginning their weight loss journey.',
    intro: 'GLP-1 therapy may help you:',
    benefits: ['Reduce appetite', 'Control cravings', 'Increase feelings of fullness', 'Improve blood sugar regulation', 'Support consistent weight loss'],
    summary: 'Uses GLP-1 therapy (semaglutide) to help you achieve sustainable weight loss with medical supervision by an NP.',
  },
  {
    id: 'slimfit-plus',
    name: 'SlimFit Plus™',
    tier: 'Advanced weight loss membership',
    therapy: 'GLP-1 + GIP therapy',
    ingredient: 'Tirzepatide',
    price: 399,
    meds: 'Medication included in the monthly price: weekly GLP-1 + GIP injections (tirzepatide).',
    fit: 'Ideal for patients looking for our most comprehensive weight loss program.',
    intro: 'GIP works alongside GLP-1 and may help you:',
    benefits: ['Enhance appetite control', 'Improve metabolic function', 'Support greater weight loss potential', 'Improve overall body composition', 'Optimize long-term results'],
    summary: 'Combines GLP-1 and GIP therapy (tirzepatide) for advanced weight loss support.',
  },
];

/** [label, SlimFit, SlimFit Plus] */
export const inclusions: [string, boolean, boolean][] = [
  ['Initial medical consultation', true, true],
  ['Comprehensive health evaluation', true, true],
  ['Baseline laboratory testing', true, true],
  ['Personalized treatment plan', true, true],
  ['Ongoing supervision by an NP', true, true],
  ['Regular progress evaluations', true, true],
  ['Medication management', true, true],
  ['Dose adjustments as needed', true, true],
  ['Weekly GLP-1 injections', true, false],
  ['Weekly GLP-1 + GIP injections', false, true],
  ['Advanced metabolic support', false, true],
];

export const journey = [
  { title: 'Consultation', icon: 'bi-chat-heart', body: 'Meet with a BodyFactory nurse practitioner to discuss your goals, medical history, current medications, and eligibility.' },
  { title: 'Lab testing', icon: 'bi-droplet-half', body: 'Complete baseline laboratory testing so your NP can confirm treatment is safe and appropriate for you.' },
  { title: 'Personalized plan', icon: 'bi-clipboard2-check', body: 'Your NP reviews your results, selects your medication and starting dose, and walks you through side effects and injection instructions.' },
  { title: 'Start your transformation', icon: 'bi-arrow-up-right-circle', body: 'Begin your once-weekly treatment, with ongoing medical supervision by an NP and a monthly visit before each new month is authorized.' },
];

export const care = [
  {
    id: 'first-visit',
    image: { src: 'assets/brand/care-first-visit.webp', alt: 'A BodyFactory nurse practitioner reviews a tablet with a patient during her first visit', position: '46% 32%' },
    tab: 'First visit',
    title: 'A complete picture before anything is prescribed.',
    intro: 'At your initial visit, your nurse practitioner will:',
    items: [
      'Review your medical history and current medications',
      'Record your weight, height, BMI, and vital signs',
      'Review contraindications and potential risks',
      'Discuss your weight loss goals',
      'Order or review appropriate baseline labs',
      'Determine whether treatment is appropriate for you',
      'Select your medication and starting dose',
      'Review side effects and injection instructions',
    ],
  },
  {
    id: 'monthly',
    image: { src: 'assets/brand/care-monthly.webp', alt: 'A BodyFactory clinician smiles during a monthly check-in at the studio', position: '62% 30%' },
    tab: 'Every month',
    title: 'Each month of treatment starts with a visit.',
    intro: 'Your NP evaluates you monthly before your next month of treatment is authorized. At each visit, your NP will:',
    items: [
      'Record your current weight',
      'Review your weight loss progress',
      'Ask about appetite and cravings',
      'Review side effects and how you tolerate the medication',
      'Confirm your medication, concentration, and current dose',
      'Review any new medications or changes in your health',
      'Decide whether to maintain, increase, decrease, pause, or stop treatment',
      'Document your plan for the next month',
    ],
    record: ['Weight', 'Medication', 'Pharmacy and formulation', 'Concentration', 'Current dose', 'Side effects', 'Treatment response', 'New dose, if changed', 'Follow-up plan'],
  },
  {
    id: 'dosing',
    image: { src: 'assets/brand/care-dosing.webp', alt: 'A BodyFactory clinician walks a patient through her plan on a tablet', position: '54% 32%' },
    tab: 'Your dose',
    title: 'Compounded dosing, set by your NP.',
    intro: 'Before prescribing or changing your dose, your NP verifies:',
    items: [
      'The medication name',
      'The compounding pharmacy',
      'The concentration on your current prescription or vial',
      'Your dose in milligrams',
      'The injection volume or units for that specific concentration',
      'Your tolerance and response so far',
    ],
    notes: [
      ['Units are not interchangeable.', 'The same number of syringe units can be a different dose in a different compounded formulation. Always follow the instructions for your current vial.'],
      ['Increases are not automatic.', 'You may stay at your current dose while it is working well, or while side effects settle.'],
    ],
  },
  {
    id: 'safety',
    image: { src: 'assets/brand/care-safety.webp', alt: 'A BodyFactory team member talks with a client in the studio', position: '70% 35%' },
    tab: 'Safety pauses',
    title: 'We pause first, then evaluate.',
    intro: 'Your NP will hold your medication and evaluate you if you experience:',
    items: [
      'Significant or persistent vomiting',
      'Severe or persistent abdominal pain',
      'Significant dehydration',
      'Serious or unusual side effects',
      'Pregnancy or suspected pregnancy',
      'A new medical condition that may affect treatment',
      'Significant changes to your medications',
      'Any other safety concern',
    ],
    urgent: 'If you have potentially serious symptoms, seek urgent or emergency medical care right away. In an emergency, call 911.',
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
  ['How do I get started?', 'Schedule your consultation with BodyFactory. Our medical team will guide you through every step of the process, starting with a visit with a nurse practitioner.'],
  ['Who is a candidate?', 'Adults who are struggling with weight loss, appetite control, or metabolic health may qualify. A consultation with one of our nurse practitioners will determine whether treatment is appropriate for you.'],
  ['Do I need lab work?', 'Yes. All patients complete baseline laboratory testing before beginning treatment to ensure safety and personalization of care. Baseline labs are included in both memberships.'],
  ['How often do I take the medication?', 'Treatment is administered once weekly. Your NP reviews your progress every month and decides whether your dose should stay the same or change.'],
  ['Will my dose increase every month?', 'Not necessarily. Dose increases are not automatic. Your NP may keep you at your current dose when you are responding well or experiencing side effects.'],
  ['What is the difference between SlimFit™ and SlimFit Plus™?', 'SlimFit™ ($299/month) uses GLP-1 therapy (semaglutide). SlimFit Plus™ ($399/month) combines GLP-1 and GIP therapy (tirzepatide) and adds advanced metabolic support. Your NP helps determine which is appropriate for you.'],
  ['Are these treatments safe?', 'Your treatment is prescribed and monitored by licensed medical professionals, and every patient undergoes a medical evaluation before starting. Compounded medications are not FDA-approved. Your NP will review potential risks and side effects with you.'],
  ['What if I experience side effects?', 'Contact your care team. For significant vomiting, severe abdominal pain, dehydration, or other serious or unusual symptoms, your NP will pause treatment and evaluate you. If symptoms may be serious, seek urgent or emergency care.'],
  ['How much weight can I lose?', 'Results vary by patient. Many patients experience significant weight loss while improving their relationship with food and their overall metabolic health.'],
  ['Do you accept insurance?', 'Coverage varies. The BodyFactory team can explain membership costs, and you should confirm any medication or laboratory benefits directly with your insurer.'],
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

export const disclosure = 'Compounded medications are not FDA-approved and have not been evaluated by the FDA for safety, effectiveness, or quality. All treatment is medically supervised by a licensed prescribing nurse practitioner (NP), who evaluates you and determines whether it is appropriate. Individual results vary.';
