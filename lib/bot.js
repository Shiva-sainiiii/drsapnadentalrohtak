import { SITE } from './site';
const R = [
  [/book|appoint|slot|visit/, `Happy to help. Use the booking form on this page, message us on WhatsApp, or call ${SITE.phone}. Appointments are recommended.`],
  [/price|cost|fee|charge|how much|afford|kitn|paise/, `Cost depends on the treatment and your case. Dr. Sapna will examine you and explain the plan first. Call ${SITE.phone} or WhatsApp us for details.`],
  [/time|open|hour|timing|close|sunday|saturday/, `We are open ${SITE.hours}.`],
  [/where|locat|address|direction|reach/, `You will find us at ${SITE.addr}. Tap Get directions on the map.`],
  [/microscop|magnif/, 'Dr. Sapna uses a high-magnification dental microscope for a much clearer view of your tooth, so treatment is precise and detailed.'],
  [/root|canal|rct/, 'Dr. Sapna does microscope-assisted root canals and retreatment (Re-RCT) to save damaged teeth. She will examine your tooth first and advise what is possible.'],
  [/implant/, 'Dr. Sapna is an Oral Implantologist. Implants are placed after a consultation to check you are a good candidate.'],
  [/gum|perio|bleed|scaling/, 'Dr. Sapna is a Periodontist. Gum care, scaling and gum surgery are core to her practice.'],
  [/white|cosmetic|crown|veneer|smile|filling/, 'We offer whitening, tooth-coloured fillings, veneers, crowns and smile makeovers.'],
  [/wisdom|extract|molar|tooth removal/, 'Extractions and wisdom tooth removal are done under local anaesthesia with careful technique and clear aftercare.'],
  [/kid|child|baby|son|daughter/, "Yes, we offer gentle children's dentistry to ease anxiety and build good habits early."],
  [/pain|ache|swell|emergenc|urgent|broken|bleed/, `Sorry to hear that. For pain or an emergency, please call ${SITE.phone} right away.`],
  [/^(hi|hello|hey|namaste)\b/, 'Hello! How can I help you today?'],
];
export const fallback = (q = '') => (R.find(([re]) => re.test(q.toLowerCase())) || [0, `Thanks for your message. For specific questions, please call ${SITE.phone} or WhatsApp us and our team will reply soon.`])[1];
