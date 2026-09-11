/** Confirm these fields with BodyFactory before publishing. Null means unconfirmed. */
export const program = {
  bookingUrl: null as string | null,
  generalBookingUrl: 'https://www.bodyfactoryskincare.com/book',
  email: 'hello@bodyfactoryskincare.com',
  monthlyPrice: null as number | null,
  consultationPrice: null as number | null,
  medicationIncluded: null as boolean | null,
  labsIncluded: null as boolean | null,
  insuranceCopy: null as string | null,
  followUpCopy: null as string | null,
  treatments: [] as { name: string; description: string; safetyUrl: string }[],
  testimonials: [] as { quote: string; attribution: string; source: string }[],
  clinicalReviewApproved: false,
};
export const pillars = [
  ['Personalized care', 'Your goals, health history, and individual needs help shape your treatment plan.'],
  ['Medical supervision', 'A licensed provider evaluates whether treatment is appropriate and monitors your care.'],
  ['Ongoing support', 'Follow-ups are a chance to discuss progress, tolerability, and what comes next.'],
  ['Built for real life', 'A thoughtful approach that brings medical care and sustainable lifestyle changes together.'],
];
export const steps = [
  {title:'Consult', line:'Start with a conversation.', body:'Share your goals, health history, and what you would like support with. There is room for all your questions.', detail:'YOUR GOALS. YOUR STARTING POINT.', image:'studio', alt:'Interior of the BodyFactory West Village skincare studio'},
  {title:'Evaluate', line:'A thoughtful medical review.', body:'A qualified provider reviews your information and determines whether medical weight-management treatment may be appropriate.', detail:'CLINICAL JUDGMENT COMES FIRST.', image:'product', alt:'BodyFactory supplied GLP-1 campaign vial artwork'},
  {title:'Personalize', line:'A plan built around you.', body:'If treatment is appropriate, your provider discusses your options, the potential benefits and risks, and the details of your care.', detail:'INDIVIDUAL NEEDS. INFORMED CHOICES.', image:'campaign', alt:'Campaign model seated in an aqua top in a sunlit studio'},
  {title:'Progress', line:'Care that evolves with you.', body:'Follow-ups help your provider assess progress and tolerability, answer questions, and make clinically appropriate adjustments.', detail:'CHECK IN. REFLECT. MOVE FORWARD.', image:'hero', alt:'BodyFactory campaign model in aqua activewear'},
];
export const faqs = [
  ['How do I know if GLP-1 treatment may be right for me?', 'A licensed provider must evaluate your health history, current medications, goals, and potential risks. An online assessment can help you prepare for that conversation; it cannot determine eligibility or guarantee a prescription.'],
  ['What happens during the consultation?', 'The consultation is a conversation about your goals and health history. You can ask about treatment options, potential benefits and risks, costs, and follow-up care before deciding on next steps.'],
  ['How often will I see my provider?', program.followUpCopy || 'Ask your provider about the follow-up schedule for your individual plan, how to reach the care team, and when additional check-ins may be needed.'],
  ['How long does treatment last?', 'Duration is individual and should be discussed with your provider. It depends on your treatment, response, tolerability, and ongoing health needs.'],
  ['Are labs required?', 'Your provider will determine whether testing is needed. Ask which tests may be recommended and whether they involve a separate charge.'],
  ['Does insurance cover treatment?', program.insuranceCopy || 'Coverage and payment arrangements can vary. Confirm the program’s payment options with BodyFactory and any medication or laboratory benefits directly with your insurance plan.'],
  ['Is medication included in the program fee?', program.medicationIncluded === null ? 'Request a complete cost breakdown from BodyFactory before enrolling, including the consultation, medication, any labs, and follow-ups.' : program.medicationIncluded ? 'Medication is included in the confirmed program fee. Ask your provider about the details of your plan.' : 'Medication is charged separately from the program fee. Ask for the cost of your specific plan.'],
  ['What side effects may occur?', 'Risks and side effects depend on the medication and your health history. Your provider should review the specific medication guide, common side effects, serious warnings, and when to seek medical help before treatment starts.'],
  ['What happens if I stop treatment?', 'Talk with your provider before changing or stopping treatment. Weight regain may occur after stopping weight-management medication; an ongoing plan can help you consider your next steps.'],
  ['Where are appointments available?', 'Contact BodyFactory to confirm the location and format of GLP-1 consultations. The studio addresses below are BodyFactory’s general skincare locations and do not confirm GLP-1 service availability.'],
];
export const locations = [
  {name:'West Village', address:'472 6th Ave', zip:'New York, NY 10011', slug:'west-village'},
  {name:'Hell’s Kitchen', address:'726 9th Ave', zip:'New York, NY 10019', slug:'hells-kitchen'},
  {name:'Upper East Side', address:'1570 1st Ave', zip:'New York, NY 10028', slug:'upper-east-side'},
];
export const medicalSource = 'https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity';
