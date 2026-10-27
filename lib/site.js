/* ====== EDIT CLINIC DETAILS HERE (phone, hours, address, links) ====== */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://drsapnadentalrohtak.com',
  name: "Dr. Sapna's Advanced Microscopic Dental Care",
  short: "Dr. Sapna's Dental Care",
  phone: '+91 93507 52575', tel: '+919350752575', wa: '919350752575',
  email: 'drsapnaperiodontist@gmail.com',
  street: 'H. No. 256, Main Market Road, Sector-2', city: 'Rohtak', region: 'Haryana', zip: '124001',
  addr: 'H. No. 256, Main Market Road, Sector-2, Rohtak, Haryana 124001',
  hours: 'Monday to Sunday, 10:00 AM to 6:00 PM (appointments recommended)',
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '18:00',
  map: "Dr. Sapna's Advanced Microscopic Dental Care, Sector 2, Rohtak, Haryana 124001",
  yt: 'https://www.youtube.com/channel/UCmFPNMhbPdsmdBVmjpiT8Tw',
  ig: 'https://www.instagram.com/drsapnaperio/',
  fb: 'https://www.facebook.com/people/Dr-Sapnas-Advanced-Dental-Care/100070880756390/',
  gbp: 'https://share.google/5ee8vRNIyKoMEtJ6N',
 tourEmbed: `https://www.google.com/maps/embed?pb=!4v1792913360699!6m8!1m7!1ss_xPQnry2g9jiB3_Qe4L1w!2m2!1d28.89107476559119!2d76.63504544785059!3f150.23439!4f0!5f0.7820865974627469`,// optional: paste a Google Maps / Street View embed URL here to show an indoor 360 tour
  alt: ["Dr. Sapna's Advanced Dental Care", "Dr. Sapna's Dental Clinic"], // schema alternateName (GBP / Facebook naam se match)
  geo: null, // GeoCoordinates ke liye: { lat: 28.xxxxxx, lng: 76.xxxxxx }. Google Maps me clinic pin pe right-click > coordinates copy karo
};

/* SEO: home page title/description (title 60 aur description 160 chars ke andar) */
export const META = {
  title: "Dentist in Rohtak | Dr. Sapna's Microscopic Dental Care",
  description: `Microscope-assisted, pain-free dentist in Rohtak (Sector 2). Dr. Sapna Sharma, Periodontist and Oral Implantologist. Call ${SITE.phone}.`,
};
/* Open Graph helper: har page pe image + siteName saath rahe (child page parent ka openGraph replace karta hai) */
export const og = (title, description, path) => ({ type: 'website', locale: 'en_IN', siteName: SITE.name, url: path, title, description, images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: SITE.name }] });

/* Areas We Serve (home page + footer + schema). Sirf wahi rakho jahan se patients sach me aate hain */
export const AREAS = ['Model Town', 'DLF Colony', 'Sector 1', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6', 'Subhash Nagar', 'Shastri Nagar', 'Gandhi Camp', 'Krishna Colony', 'Prem Nagar', 'Jhajjar Road', 'Delhi Road', 'Hisar Road', 'Sunaria'];

export const DOCTORS = [
  { slug: 'dr-sapna-sharma', name: 'Dr. Sapna Sharma', role: 'Periodontist and Oral Implantologist', creds: 'BDS, MDS (Periodontics and Oral Implantology)', img: '/images/doctors/dr-sapna-sharma.jpg',
    bio: 'Founder of the clinic and a pioneer of microscope-assisted dental treatment in Rohtak. Certified in Smile Designing and Full Mouth Rehabilitation (Pune).' },
  { slug: 'dr-aarushi-vij', name: 'Dr. Aarushi Vij', role: 'Dentist', creds: '', img: '/images/doctors/dr-aarushi-vij.jpg',
    bio: "Part of the clinical team at Dr. Sapna's Advanced Microscopic Dental Care, helping patients with gentle, careful dental treatment." },
];

export const ABOUT = [
  'Dr. Sapna Sharma completed her BDS at MMCDSR and her MDS in Periodontics and Oral Implantology at NIMS University. She continues to update her knowledge through continuing education and has advanced training in dental implants.',
  'She is a member of the Indian Society of Periodontology and the Indian Dental Association, and has over 10 national and international publications in reputed journals.',
  'Dr. Sapna practises gentle, comprehensive dentistry with personalised treatment plans. She takes time to listen, explains your options beforehand, and plans treatment around your needs.',
];

export const FAQS = [
  ['What is microscope-assisted dentistry?', 'A high-magnification dental microscope gives the dentist a far clearer view of your tooth, so treatment can be more precise and detailed.'],
  ['Can a badly damaged tooth be saved?', 'Often, yes. Dr. Sapna performs microscope-assisted root canals and retreatments (Re-RCT). She will examine the tooth first and tell you what is possible.'],
  ['Will the treatment hurt?', "The clinic's gentle, light-handed approach is built around comfort, and patients regularly describe their treatment as pain-free."],
  ['Do I need an appointment?', 'Appointments are recommended. We are open Monday to Sunday, 10:00 AM to 6:00 PM. Book with the form on this page, on WhatsApp or by phone.'],
  ['Where is the clinic in Rohtak?', 'We are at H. No. 256, near Sector 2, Main Market Road, Sector-2, Rohtak, Haryana 124001. Use the Get directions button on this page for Google Maps.'],
  ['Dant ka doctor Rohtak me kahan milega?', `Dr. Sapna's Advanced Microscopic Dental Care Rohtak ke Sector 2 me hai: ${SITE.addr}. Yahan Periodontist aur Oral Implantologist Dr. Sapna Sharma dental microscope ki madad se ilaaj karti hain. Appointment ke liye ${SITE.phone} par call ya WhatsApp karein.`],
  ['Root canal price in Rohtak kitna hota hai?', `Root canal ka kharcha daant ki halat, infection, canals ki sankhya, retreatment (Re-RCT) aur crown ki zarurat par depend karta hai, isliye bina jaanch ke sahi price batana mumkin nahi. Dr. Sapna examination aur X-ray ke baad poora plan aur cost samjha deti hain. Details ke liye ${SITE.phone} par call karein.`],
  ['Best dentist in Rohtak kaun sa hai?', '"Best" har patient ke liye alag hota hai. Dr. Sapna Sharma Periodontist aur Oral Implantologist hain aur dental microscope se gentle, pain-free ilaaj karti hain. Aap website par patients ke reviews padh sakte hain aur consultation me apni zarurat ke hisaab se faisla le sakte hain.'],
];

export const REVIEWS = [
  'Best dentist in Rohtak. She saved my completely damaged tooth with a Re-RCT done under a microscope. Her soft nature and light hand gave me a pain-free treatment.',
  'The treatment used the latest microscopic dental technology and was completely pain-free and precise.',
  'The dentist is highly knowledgeable and uses advanced equipment, including a dental microscope, for precise and detailed care.',
];

/* YouTube fallback list (admin panel can manage these once Supabase is connected) */
export const YT = [
  { url: 'uL7cq1c3lwM', title: 'Painless teeth removal procedure' },
  { url: '1af4nd9dnQY', title: 'Operculectomy with blade: swollen gum around wisdom tooth' },
  { url: 'g5CbYqrcz3E', title: 'Dental procedure by Dr. Sapna Sharma' },
  { url: 'pfDhibswmc4', title: 'Operculectomy: painful swollen gum around a tooth' },
  { url: 'xRU7bi7kcdQ', title: 'Popular short from Dr. Sapna Sharma', category: 'short' },
  // Naye shorts: title yahin se (ya admin > YouTube se) badal sakte ho
  { url: 'uUBVKo5MvhE', title: 'Dental short by Dr. Sapna Sharma 1', category: 'short' },
  { url: '84esc-y3gQo', title: 'Dental short by Dr. Sapna Sharma 2', category: 'short' },
  { url: 'xk-qW5m97_Q', title: 'Dental short by Dr. Sapna Sharma 3', category: 'short' },
  { url: 'aIiFP7SL8as', title: 'Dental short by Dr. Sapna Sharma 4', category: 'short' },
];

/* Footer credit (website developer). Naam ya link badalna ho to sirf yahan */
export const DEV = { name: 'Shiva Saini', url: 'https://shivasainiportfolio.vercel.app' };

/* icon = id from components/Sprite.js */
export const SERVICES = [
  { slug: 'root-canal-treatment-rohtak', name: 'Root Canal and Re-RCT', h: 'Root Canal Treatment and Re-RCT in Rohtak', icon: 'sh',
    short: 'Microscope-assisted root canals and retreatment to save damaged teeth.',
    body: 'A root canal treats infection or damage inside the tooth so it can be kept instead of removed. At our Rohtak clinic, Dr. Sapna works under a dental microscope, which gives a much clearer view of the tiny canals inside the tooth. We also perform root canal retreatment (Re-RCT) when an earlier treatment needs to be redone.',
    pts: ['Magnified view of the root canals', 'Retreatment (Re-RCT) of earlier root canals', 'Gentle, comfort-focused technique'],
    faq: [['Can a root canal be redone?', 'Often yes. Root canal retreatment (Re-RCT) is done after the tooth is examined and its X-ray is reviewed.'], ['Why use a microscope for a root canal?', 'Magnification helps the dentist see fine details inside the tooth, which supports precise, careful work.']] },
  { slug: 'dental-implants-rohtak', name: 'Dental Implants', h: 'Dental Implants in Rohtak', icon: 'tooth',
    short: 'Precision-guided implants by an Oral Implantologist.',
    body: 'Dental implants replace missing teeth with a fixed, natural-looking solution. Dr. Sapna Sharma is a Periodontist and Oral Implantologist with advanced training in dental implants. Every case begins with an examination and scans so we can plan whether implants suit you and how to place them accurately.',
    pts: ['Planned after a proper examination and X-rays', 'Placed by an Oral Implantologist', 'Options for single teeth or several teeth'],
    faq: [['Am I a candidate for implants?', 'It depends on your gum and bone health and overall condition. Dr. Sapna will assess this during a consultation.'], ['How long does an implant take?', 'Timing varies by case. You will get a clear plan and timeline after the examination.']] },
  { slug: 'gum-treatment-rohtak', name: 'Gum Therapy and Surgery', h: 'Gum Treatment in Rohtak (Periodontist)', icon: 'sp',
    short: 'Advanced gum care and gum surgery by a Periodontist.',
    body: 'Healthy gums hold your teeth in place. As a Periodontist, Dr. Sapna treats bleeding, swollen or receding gums, deep scaling and gum surgeries. She also treats gum problems around wisdom teeth, such as a swollen flap of gum, using careful surgical technique.',
    pts: ['Deep cleaning and scaling under magnification', 'Advanced gum surgeries', 'Care for bleeding, swollen or receding gums'],
    faq: [['My gums bleed when I brush. Should I worry?', 'Bleeding gums can be an early sign of gum disease. It is best to have them examined rather than ignore them.'], ['Do you treat swollen gum around a wisdom tooth?', 'Yes. Dr. Sapna treats this problem (pericoronitis) and explains the procedure before starting.']] },
  { slug: 'teeth-cleaning-rohtak', name: 'Teeth Cleaning and Air Polishing', h: 'Teeth Cleaning and Polishing in Rohtak', icon: 'bz',
    short: 'Scaling, polishing and air polishing for a fresh, stain-free clean.',
    body: 'Regular professional cleaning removes plaque, tartar and stains that brushing cannot. We offer scaling, polishing and air polishing, a modern cleaning method for a refreshing, stain-free finish.',
    pts: ['Scaling and polishing', 'Air polishing for stain removal', 'Healthy-gum check at every visit'],
    faq: [['How often should I get my teeth cleaned?', 'Many people benefit from a check-up and cleaning every six months, but your dentist will advise what suits you.'], ['Does cleaning damage the teeth?', 'No. Professional cleaning is done with care to protect the enamel and gums.']] },
  { slug: 'dental-crowns-rohtak', name: 'Dental Crowns (Caps)', h: 'Dental Crowns and Caps in Rohtak', icon: 'sh',
    short: 'Advanced crowns that protect and restore damaged teeth.',
    body: 'A crown (cap) covers a weak, broken or root-canal-treated tooth to protect it and restore its shape and function. We use advanced crown materials and plan each one to match your bite and the look of your natural teeth.',
    pts: ['Protects weak or broken teeth', 'Matches shape and shade of your teeth', 'Often used after a root canal'],
    faq: [['When do I need a crown?', 'Usually for a badly damaged tooth, after a root canal, or to restore a tooth that is too weak for a filling.'], ['Will it look natural?', 'Crowns are made to match the colour and shape of your neighbouring teeth.']] },
  { slug: 'tooth-colored-fillings-rohtak', name: 'Tooth-Coloured Fillings', h: 'Tooth-Coloured Fillings in Rohtak', icon: 'sp',
    short: 'Natural-looking composite fillings for cavities and chips.',
    body: 'Tooth-coloured (composite) fillings repair cavities, chips and worn areas while blending with your natural teeth. Working under magnification helps us shape them carefully and keep as much healthy tooth as possible.',
    pts: ['Blend with your natural tooth colour', 'Repair cavities, chips and gaps', 'Conservative treatment'],
    faq: [['What is a composite filling?', 'It is a tooth-coloured material bonded to the tooth to repair damage and restore its shape.'], ['Can a chipped front tooth be fixed?', 'Often yes, with a tooth-coloured restoration. The dentist will examine it first.']] },
  { slug: 'dental-veneers-rohtak', name: 'Veneers', h: 'Dental Veneers in Rohtak', icon: 'sp',
    short: 'Thin shells to improve the shape, colour and alignment of front teeth.',
    body: 'Veneers are thin, tooth-coloured shells placed on the front of teeth to improve their colour, shape or small gaps. Whether veneers are right for you depends on your teeth and gums, which Dr. Sapna will assess before suggesting them.',
    pts: ['Improve shape, colour and spacing', 'Planned as part of a smile design', 'Honest advice on whether they suit you'],
    faq: [['Are veneers right for everyone?', 'Not always. Your teeth, gums and bite are checked first, and other options are explained if needed.'], ['Are veneers part of a smile makeover?', 'They can be, along with whitening, fillings or crowns, depending on your goals.']] },
  { slug: 'smile-makeover-rohtak', name: 'Smile Makeover and Designing', h: 'Smile Makeover and Smile Designing in Rohtak', icon: 'sp',
    short: 'A planned, personalised makeover for a smile you are proud of.',
    body: 'A smile makeover combines treatments such as whitening, crowns, fillings, veneers and gum shaping into one plan. Dr. Sapna is certified in Smile Designing and Full Mouth Rehabilitation, and plans your treatment around your face, teeth and goals.',
    pts: ['Personalised smile design plan', 'Combines cosmetic and gum treatments', 'Clear explanation before you begin'],
    faq: [['How does a smile makeover start?', 'With a consultation to understand what you want, followed by an examination and a treatment plan.'], ['Can the treatment be done in stages?', 'Yes. Larger plans can be divided into steps that suit your schedule.']] },
  { slug: 'teeth-whitening-rohtak', name: 'Teeth Whitening', h: 'Teeth Whitening in Rohtak', icon: 'sp',
    short: 'Safe, professional whitening for a brighter smile.',
    body: 'Professional teeth whitening lightens stains from tea, coffee and ageing. A cleaning is usually done first so that the result looks even, and the dentist will tell you whether whitening suits your teeth.',
    pts: ['Professional-grade whitening', 'Cleaning first for an even result', 'Advice on keeping your results'],
    faq: [['Is whitening safe?', 'When done by a dentist after an examination, whitening is considered safe for most healthy teeth.'], ['Will whitening work on crowns or fillings?', 'No. Whitening affects natural tooth only, so your dentist will plan around existing restorations.']] },
  { slug: 'dentures-rohtak', name: 'Dentures', h: 'Dentures in Rohtak', icon: 'tooth',
    short: 'Comfortable, well-fitting dentures to restore chewing and smile.',
    body: 'Dentures replace missing teeth so you can chew comfortably and smile with confidence. We take time over the fit and bite, and will also explain whether implants or a fixed option could suit you better.',
    pts: ['Careful fit and bite check', 'Options from partial to complete dentures', 'Alternatives such as implants explained'],
    faq: [['Are dentures comfortable?', 'A well-made denture feels comfortable after a short adjustment period, and we adjust the fit if needed.'], ['Can I choose implants instead?', 'Possibly. Dr. Sapna will explain whether implants suit your case.']] },
  { slug: 'full-mouth-rehabilitation-rohtak', name: 'Full Mouth Rehabilitation', h: 'Full Mouth Rehabilitation in Rohtak', icon: 'sh',
    short: 'Complete restoration of worn, damaged or missing teeth.',
    body: 'Full mouth rehabilitation restores the function and appearance of the entire mouth when many teeth are worn, damaged or missing. Dr. Sapna is certified in Full Mouth Rehabilitation and plans these cases step by step, often combining gum care, root canals, crowns and implants.',
    pts: ['One complete, coordinated plan', 'Gum health treated first', 'Crowns, implants and more as needed'],
    faq: [['Who needs full mouth rehabilitation?', 'People with many worn, broken, decayed or missing teeth, or problems with their bite.'], ['Does it take many visits?', 'Usually yes. The plan is divided into stages, and you will know the steps in advance.']] },
  { slug: 'braces-teeth-straightening-rohtak', name: 'Orthodontic Braces and Straightening', h: 'Braces and Teeth Straightening in Rohtak', icon: 'sm',
    short: 'Straighten crooked teeth and correct bite problems.',
    body: 'Orthodontic braces gradually move teeth into a healthier, better-looking position. After an examination, we explain the options and what to expect so you can choose a plan that suits you.',
    pts: ['Examination and treatment plan first', 'Options explained clearly', 'Gum health monitored during treatment'],
    faq: [['At what age can braces be started?', 'Braces can help children, teenagers and adults. The dentist will advise the right time after an examination.'], ['Do braces hurt?', 'Mild soreness after adjustments is common and usually settles within a few days.']] },
  { slug: 'childrens-dentist-rohtak', name: "Children's Dentistry", h: "Children's Dentist in Rohtak", icon: 'sm',
    short: 'Gentle, friendly dental care that eases anxiety.',
    body: 'We offer gentle, age-appropriate dental care for children, so their first dental experiences are calm and positive. We also help parents build good brushing habits early.',
    pts: ['Friendly, patient approach', 'Early check-ups and cleaning', 'Habit guidance for parents'],
    faq: [['When should my child first see a dentist?', 'A first visit when the first teeth appear, or by around the first birthday, is commonly recommended.'], ['My child is scared of dentists. Can you help?', 'Yes. We take time, explain simply and go at your child\'s pace.']] },
  { slug: 'tooth-extraction-rohtak', name: 'Tooth Removal and Wisdom Teeth', h: 'Tooth Extraction and Wisdom Tooth Removal in Rohtak', icon: 'br',
    short: 'Careful extractions focused on comfort and healing.',
    body: 'When a tooth cannot be saved, or a wisdom tooth is causing pain or infection, removal may be the best option. Extractions are done under local anaesthesia with careful technique, and we explain aftercare so healing goes smoothly.',
    pts: ['Local anaesthesia for comfort', 'Wisdom tooth and surgical extractions', 'Clear aftercare instructions'],
    faq: [['Is tooth removal painful?', 'It is done under local anaesthesia, so you should feel pressure rather than pain. Mild soreness afterwards is normal.'], ['Do all wisdom teeth need removal?', 'No. Only those causing problems usually need to be removed. The dentist will examine and advise.']] },
  { slug: 'holistic-dentistry-rohtak', name: 'Holistic Dentistry', h: 'Holistic Dentistry in Rohtak', icon: 'sm',
    short: 'Whole-person care that considers your overall health and comfort.',
    body: 'Holistic dentistry looks at your overall health, habits and comfort, not only the tooth in front of us. Dr. Sapna listens carefully, explains your options and prefers conservative treatment where it is suitable.',
    pts: ['Overall health considered in planning', 'Conservative options where suitable', 'Time to listen and explain'],
    faq: [['What does holistic dentistry mean here?', 'It means personalised care that considers your general health and preferences along with your dental needs.'], ['Does it replace regular dental treatment?', 'No. It is an approach to planning your care, along with standard, evidence-based treatment.']] },
];

/* ===== SEO / AEO: har service ke liye meta title (mt), 40-60 word direct answer (ans, AI ke liye) aur Hinglish FAQ ===== */
const CALL = `Appointment ke liye ${SITE.phone} par call ya WhatsApp karein.`;
const SEO = {
  "root-canal-treatment-rohtak": { mt: "Root Canal & Re-RCT in Rohtak", ans: "Root canal treatment in Rohtak is available at Dr. Sapna's Advanced Microscopic Dental Care in Sector 2. It removes infection from inside a damaged tooth so the tooth can be saved instead of extracted. Dr. Sapna Sharma performs root canals and retreatment (Re-RCT) under a dental microscope for a clearer view of the canals.", faq: [["Root canal price in Rohtak kitna hota hai?", "Root canal ka kharcha daant ki halat, infection, canals ki sankhya aur crown ki zarurat par depend karta hai. Examination aur X-ray ke baad Dr. Sapna aapko plan aur cost samjha deti hain, isliye pehle jaanch zaroori hai." + ' ' + CALL], ["Daant me tez dard ho to Rohtak me dant ka doctor kahan dikhayein?", "Tez dard ya sujan ho to jaldi jaanch karwana behtar hai. Sector 2, Rohtak ke is clinic me examination ke baad dekha jaata hai ki root canal, filling ya koi aur ilaaj sahi rahega." + ' ' + CALL]] },
  "dental-implants-rohtak": { mt: "Dental Implants in Rohtak", ans: "Dental implants in Rohtak are offered at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. An implant is a small titanium post placed in the jawbone to replace a missing tooth root, topped with a crown. Dr. Sapna Sharma, a Periodontist and Oral Implantologist, plans each case after an examination and X-rays.", faq: [["Rohtak me dental implant ka cost kitna hota hai?", "Implant ka kharcha implant ki sankhya, jaw bone ki sthiti, crown ke type aur zaroori extra procedures par depend karta hai. Dr. Sapna jaanch aur X-ray ke baad aapko plan aur cost samjha deti hain." + ' ' + CALL]] },
  "gum-treatment-rohtak": { mt: "Gum Treatment in Rohtak", ans: "Gum treatment in Rohtak is provided by Dr. Sapna Sharma, a Periodontist, at Dr. Sapna's Advanced Microscopic Dental Care in Sector 2. It covers deep cleaning, treatment of bleeding, swollen or receding gums, and gum surgery. Early care helps protect the bone and tissue that hold your teeth in place.", faq: [["Masude (gums) se khoon aaye to Rohtak me kahan dikhayein?", "Masudon se khoon, sujan ya daant hilna gum disease ka sanket ho sakta hai. Rohtak me Periodontist Dr. Sapna Sharma gum ki jaanch aur ilaaj karti hain." + ' ' + CALL]] },
  "teeth-cleaning-rohtak": { mt: "Teeth Cleaning in Rohtak", ans: "Teeth cleaning in Rohtak at Dr. Sapna's Advanced Microscopic Dental Care in Sector 2 includes scaling, polishing and air polishing. Professional cleaning removes plaque, tartar and stains that brushing cannot reach, and lets the dentist check your gums. Many people benefit from a check-up and cleaning about every six months.", faq: [["Rohtak me teeth cleaning (scaling) ka kharcha kitna hota hai?", "Cleaning ka kharcha daant aur masudon ki halat par depend karta hai, isliye dentist ki jaanch ke baad hi sahi estimate milta hai. Air polishing ke baare me bhi clinic me pooch sakte hain." + ' ' + CALL]] },
  "dental-crowns-rohtak": { mt: "Dental Crowns & Caps in Rohtak", ans: "Dental crowns, also called caps, are available in Rohtak at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. A crown covers a weak, broken or root-canal-treated tooth to protect it and restore its shape and function. Each crown is planned to match your bite and the colour of your natural teeth.", faq: [["Dental crown (cap) Rohtak me kitne din me lagta hai?", "Samay case par depend karta hai, jaise daant ki halat aur crown ka type. Jaanch ke baad Dr. Sapna aapko visits aur time pehle se bata deti hain." + ' ' + CALL]] },
  "tooth-colored-fillings-rohtak": { mt: "Tooth-Coloured Fillings in Rohtak", ans: "Tooth-coloured fillings in Rohtak are done at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. A composite filling repairs cavities, chips and worn areas using a material that blends with your natural tooth. Working under magnification helps the dentist shape the filling carefully and keep as much healthy tooth as possible.", faq: [["Daant me cavity ki filling Rohtak me kahan karwayein?", "Cavity ya chipped daant ki tooth-coloured filling Dr. Sapna's Advanced Microscopic Dental Care, Sector 2 Rohtak me hoti hai. Magnification ke saath kaam hone se healthy daant zyada se zyada bachane ki koshish ki jaati hai." + ' ' + CALL]] },
  "dental-veneers-rohtak": { mt: "Dental Veneers in Rohtak", ans: "Dental veneers in Rohtak are available at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. Veneers are thin, tooth-coloured shells bonded to the front of teeth to improve colour, shape or small gaps. Dr. Sapna Sharma first checks your teeth and gums and advises honestly whether veneers suit you.", faq: [["Rohtak me veneers lagwane se pehle kya dekhna chahiye?", "Pehle daant, masude aur bite ki jaanch zaroori hai, kyunki veneers har kisi ke liye sahi nahi hote. Dr. Sapna aapko saaf salaah deti hain ki veneers ya koi aur option behtar rahega." + ' ' + CALL]] },
  "smile-makeover-rohtak": { mt: "Smile Makeover in Rohtak", ans: "A smile makeover in Rohtak at Dr. Sapna's Advanced Microscopic Dental Care combines treatments such as whitening, crowns, fillings, veneers and gum shaping into one personalised plan. Dr. Sapna Sharma is certified in Smile Designing and Full Mouth Rehabilitation, and plans your treatment around your face, teeth and goals.", faq: [["Rohtak me smile makeover ka kharcha kitna hota hai?", "Kharcha aapke plan par depend karta hai, jaise whitening, crowns, fillings ya veneers me se kya shaamil hai. Consultation me Dr. Sapna poora plan aur cost samjha deti hain." + ' ' + CALL]] },
  "teeth-whitening-rohtak": { mt: "Teeth Whitening in Rohtak", ans: "Teeth whitening in Rohtak is offered at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. Professional whitening lightens stains from tea, coffee and ageing. A cleaning is usually done first for an even result, and the dentist tells you whether whitening suits your teeth, since it does not change crowns or fillings.", faq: [["Teeth whitening Rohtak me kitne din tak rehti hai?", "Whitening ka asar chai, coffee jaisi aadaton aur daant ki care par depend karta hai. Dentist aapko result sambhalne ke tips bhi batate hain." + ' ' + CALL]] },
  "dentures-rohtak": { mt: "Dentures in Rohtak", ans: "Dentures in Rohtak are made at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2, to replace missing teeth so you can chew comfortably and smile with confidence. We take time over the fit and bite, offer partial and complete dentures, and explain whether implants could suit you better.", faq: [["Rohtak me nakli daant (dentures) kahan lagwayein?", "Dr. Sapna's Advanced Microscopic Dental Care, Sector 2 Rohtak me partial aur complete dentures ka fit aur bite dhyan se check kiya jaata hai. Zarurat ho to implants jaise vikalp bhi samjhaye jaate hain." + ' ' + CALL]] },
  "full-mouth-rehabilitation-rohtak": { mt: "Full Mouth Rehab in Rohtak", ans: "Full mouth rehabilitation in Rohtak restores the function and appearance of the whole mouth when many teeth are worn, damaged or missing. Dr. Sapna Sharma, certified in Full Mouth Rehabilitation, plans these cases step by step at Dr. Sapna's Advanced Microscopic Dental Care, often combining gum care, root canals, crowns and implants.", faq: [["Full mouth rehabilitation Rohtak me kitne visits me hota hai?", "Visits ki sankhya case par depend karti hai. Poora plan stages me banta hai aur aapko har step pehle se bataya jaata hai." + ' ' + CALL]] },
  "braces-teeth-straightening-rohtak": { mt: "Braces in Rohtak", ans: "Braces and teeth straightening in Rohtak are available at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2. Orthodontic braces gradually move teeth into a healthier, better-looking position and can help children, teenagers and adults. After an examination, we explain your options and what to expect before you begin.", faq: [["Rohtak me braces ka treatment kitne time tak chalta hai?", "Samay daanton ki sthiti aur treatment plan par depend karta hai. Jaanch ke baad aapko expected time aur options samjhaye jaate hain." + ' ' + CALL]] },
  "childrens-dentist-rohtak": { mt: "Children's Dentist in Rohtak", ans: "Children's dental care in Rohtak at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2, is gentle and age-appropriate, so a child's first dental visits stay calm and positive. We offer early check-ups and cleaning, go at your child's pace, and help parents build good brushing habits early.", faq: [["Bachon ka dentist Rohtak me kahan milega?", "Dr. Sapna's Advanced Microscopic Dental Care, Sector 2 Rohtak me bachon ke liye gentle aur age-appropriate dental care di jaati hai. Bachche ko dar lage to uski speed se, simple shabdon me samjhakar kaam kiya jaata hai." + ' ' + CALL]] },
  "tooth-extraction-rohtak": { mt: "Tooth Extraction in Rohtak", ans: "Tooth extraction and wisdom tooth removal in Rohtak are done at Dr. Sapna's Advanced Microscopic Dental Care, Sector 2, under local anaesthesia. A tooth is removed when it cannot be saved or a wisdom tooth causes pain or infection. We explain aftercare clearly so that healing goes smoothly and comfortably.", faq: [["Rohtak me daant nikalwana ya wisdom tooth removal kahan hota hai?", "Dr. Sapna's Advanced Microscopic Dental Care, Sector 2 Rohtak me local anaesthesia ke saath daant aur wisdom tooth nikaala jaata hai, aur aftercare saaf shabdon me samjhaya jaata hai." + ' ' + CALL]] },
  "holistic-dentistry-rohtak": { mt: "Holistic Dentistry in Rohtak", ans: "Holistic dentistry in Rohtak at Dr. Sapna's Advanced Microscopic Dental Care looks at your overall health, habits and comfort, not only the tooth in front of the dentist. Dr. Sapna Sharma listens carefully, explains your options and prefers conservative treatment where it is suitable, alongside standard, evidence-based care.", faq: [["Rohtak me holistic ya conservative dental treatment kahan milta hai?", "Dr. Sapna Sharma aapki overall health, aadaton aur comfort ko dhyan me rakhkar conservative option pehle samjhati hain. Yeh Dr. Sapna's Advanced Microscopic Dental Care, Sector 2 Rohtak me milta hai." + ' ' + CALL]] },
};
SERVICES.forEach((s) => { const x = SEO[s.slug]; s.mt = x.mt; s.ans = x.ans; s.faq = [...s.faq, ...x.faq]; });

/* Photos that are wide/high-res enough to be shown on a service page */
export const SIMG = {
  'full-mouth-rehabilitation-rohtak': '/images/ba/ba1-after.jpg', 'dental-crowns-rohtak': '/images/ba/ba2-after.jpg',
  'teeth-cleaning-rohtak': '/images/ba/ba3-after.jpg', 'smile-makeover-rohtak': '/images/ba/ba5-after.jpg',
};

/* Content for /microscopic-dentistry-rohtak */
export const MICRO = {
  h: 'Advanced Microscopic Dental Care in Rohtak',
  short: 'Dental treatment under a high-magnification microscope for precise, comfortable care.',
  intro: "At Dr. Sapna's Advanced Microscopic Dental Care in Sector 2, Rohtak, procedures are carried out under a high-magnification dental microscope. It gives a bright, enlarged view of the tooth and gums, so very small details can be seen and treated with care.",
  blocks: [
    ['What is microscopic dentistry?', 'Instead of relying only on the naked eye or basic loupes, the dentist works while looking through a dental microscope that magnifies and lights up the area. It can be used in many types of dental treatment.'],
    ['How can it help you?', 'Magnification can help the dentist find and clean the fine canals inside a tooth, place restorations that fit more precisely, treat gum tissue with finer technique and preserve more healthy tooth. The aim is careful, comfortable treatment.'],
    ['Treatments done under the microscope', 'Root canal treatment and retreatment (Re-RCT), scaling and gum surgery, fillings and crowns, extractions and wisdom tooth procedures, and implant-related work. Dr. Sapna shares procedure videos on her YouTube channel.'],
  ],
  pts: ['Bright, magnified view of the tooth and gums', 'Fine canals and small details seen clearly', 'Careful, light-handed technique focused on comfort', 'Conservative treatment that aims to keep your natural tooth'],
  faq: [
    ['Is microscopic dental treatment painful?', 'The microscope does not touch you. Treatment uses a gentle, comfort-focused approach, with local anaesthesia where needed.'],
    ['Is the microscope used for every treatment?', 'It is used for many procedures. Dr. Sapna will explain how it will be used in your case.'],
    ['Can a root canal be done under a microscope?', "Yes. Microscope-assisted root canals and retreatment (Re-RCT) are among the clinic's specialities."],
    ['How much does treatment cost?', 'Cost depends on the treatment and your case. Dr. Sapna explains the plan and the cost after examining you.'],
    ['Where can I get microscopic dental treatment in Rohtak?', `At ${SITE.name}, ${SITE.addr}. Call ${SITE.phone} to book.`],
    ['Root canal price in Rohtak: microscope se treatment ka cost kitna hota hai?', `Cost daant ki halat aur case par depend karta hai. Examination ke baad Dr. Sapna plan aur cost samjha deti hain. ${CALL}`],
    ['Dant ka doctor Rohtak me microscope ke saath kahan milta hai?', `Dr. Sapna's Advanced Microscopic Dental Care, Sector 2, Rohtak me dental microscope ki madad se ilaaj hota hai. ${CALL}`],
    ['Best dentist in Rohtak microscope wala kaun sa hai?', '"Best" subjective hota hai. Aap Dr. Sapna ke procedure videos aur patients ke reviews dekhkar, aur consultation me apne sawal poochkar khud faisla kar sakte hain.'],
  ],
};
