# BodyFactory confirmation before launch
The local page is a review build, with noindex enabled by default. Nothing was deployed.

- Dedicated GLP-1 booking URL/service ID and which studios or appointment formats offer it. The current dialog transparently hands off to general BodyFactory booking.
- Clinical provider/medical practice attribution appropriate to this program; clinician approval of the full program description.
- Confirmed treatment names, sourcing, medication guide and prescribing-information URLs, side effects, contraindications, warnings, pregnancy/breastfeeding guidance, and urgent-contact instructions.
- Consultation fee, monthly fee, medication and lab inclusions, follow-up schedule, insurance/payment terms, duration, cancellations and subscriptions.
- Approval to use the supplied conceptual vial artwork; the current page labels it campaign imagery and does not associate it with a named medication or dose.
- Approval of generated model photography; it is explicitly not patient evidence.
- Any GLP-1-specific testimonials with source, permission, disclosures and clinical/legal approval. No invented testimonial is shown.
- Production site URL for canonical/OpenGraph setup, then PUBLIC_LAUNCH_APPROVED=true after clinical/business review. Set clinicalReviewApproved only after approval and treatment-specific safety content has been supplied.
- Production intake integration, privacy review and secure health-data handling if expanding the nonclinical, memory-only assessment into an actual medical intake. No tracking scripts or third-party form collectors are present in this build.

Central editable data: src/content.ts. All unconfirmed fields are null/empty. These are never rendered as invented prices, availability, or credentials.

## Added with the 2026 campaign update
- **Regulatory review of claims.** The banner's "FDA-approved" language was not used because the NP guidelines describe compounded semaglutide/tirzepatide, which are not FDA-approved. Legal/clinical sign-off on the disclosure in `src/content.ts → disclosure`, the benefit lists ("may help"), and the ingredient names on plan cards.
- Confirm SlimFit™ / SlimFit Plus™ pricing ($299 / $399 per month) and what the price covers (medication, labs, visits), plus cancellation terms.
- Confirm where injections happen (in studio vs. at home). The page now says only "once-weekly injection" and "injection instructions".
- Testimonial and before/after results (`results.approved`) stay hidden until a real patient, written consent, unedited photos and a typical-results disclosure are supplied.
- Replace image placeholder IMG-01 and, ideally, re-export the hero without its baked-in text (see `docs/image-briefs.md`).
