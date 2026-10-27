import Link from 'next/link';
import Image from 'next/image';
import { SITE, DOCTORS, SERVICES, AREAS, og } from '@/lib/site';
import Icon from '@/components/Icon';

const path = '/about';
const title = 'About Dr. Sapna Sharma, Periodontist in Rohtak';
const description = `Dr. Sapna Sharma, BDS, MDS (Periodontics and Oral Implantology), leads ${SITE.name} in Sector 2, Rohtak. Qualifications, memberships and approach.`;
export const metadata = { title: 'About Dr. Sapna Sharma, Periodontist in Rohtak', description, alternates: { canonical: path }, openGraph: og(`${title} | ${SITE.short}`, description, path) };

// ENTITY CONTENT: sirf wahi facts jo site.js / clinic ne confirm kiye hain. [TODO] wali cheezein Dr. Sapna se poochkar hi add karo, andaza mat lagao
const FACTS = [
  ['Who is Dr. Sapna Sharma?', `Dr. Sapna Sharma is a Periodontist and Oral Implantologist in Rohtak, Haryana. She holds a BDS from MMCDSR and an MDS in Periodontics and Oral Implantology from NIMS University, and she founded ${SITE.name} in Sector 2, Rohtak.`],
  ['What is she known for in Rohtak?', 'Dr. Sapna is known for microscope-assisted dental treatment, including root canals and retreatment (Re-RCT), gum surgery and implants. She works with a high-magnification dental microscope and a gentle, comfort-focused technique.'],
  ['What training and memberships does she have?', 'She is certified in Smile Designing and Full Mouth Rehabilitation (Pune), is a member of the Indian Society of Periodontology and the Indian Dental Association, and has over 10 national and international publications in reputed journals.'],
  ['Where is the clinic and when is it open?', `${SITE.name} is at ${SITE.addr}. It is open ${SITE.hours}. Call or WhatsApp ${SITE.phone} to book.`],
  ['What languages does the clinic speak?', 'English and Hindi.'],
  ['Who else is in the clinical team?', 'Dr. Aarushi Vij, Dentist, is part of the clinical team.'],
];

export default function About() {
  const url = SITE.url + path;
  const sapna = DOCTORS[0], aarushi = DOCTORS[1];
  const ld = [
    // Person: clinic schema ke founder se @id se judta hai
    { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE.url}/#dr-sapna-sharma`, name: sapna.name, honorificPrefix: 'Dr.', jobTitle: sapna.role,
      description: 'Periodontist and Oral Implantologist in Rohtak, Haryana, founder of Dr. Sapna\'s Advanced Microscopic Dental Care.',
      image: `${SITE.url}${sapna.img}`, url, worksFor: { '@id': `${SITE.url}/#clinic` }, workLocation: { '@id': `${SITE.url}/#clinic` },
      hasCredential: [{ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'BDS' }, { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'MDS (Periodontics and Oral Implantology)' }],
      alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'MMCDSR' }, { '@type': 'CollegeOrUniversity', name: 'NIMS University' }],
      memberOf: [{ '@type': 'Organization', name: 'Indian Society of Periodontology' }, { '@type': 'Organization', name: 'Indian Dental Association' }],
      knowsAbout: ['Periodontology', 'Dental implants', 'Microscope-assisted root canal treatment', 'Root canal retreatment', 'Smile designing', 'Full mouth rehabilitation'],
      knowsLanguage: ['en-IN', 'hi-IN'], sameAs: [SITE.yt, SITE.ig] },
    { '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${url}#webpage`, url, name: title, inLanguage: 'en-IN', mainEntity: { '@id': `${SITE.url}/#dr-sapna-sharma` }, isPartOf: { '@id': `${SITE.url}/#website` }, about: { '@id': `${SITE.url}/#clinic` } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FACTS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [[SITE.url, 'Home'], [url, 'About']].map(([item, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
  ];
  return (
    <main className="w sv">
      {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      <p className="crumb"><Link href="/">Home</Link> / About</p>
      <h1>About Dr. Sapna Sharma</h1>
      {/* Pehle 40-60 words me seedha jawab: AI isi block ko quote karta hai */}
      <p className="lead">Dr. Sapna Sharma is a Periodontist and Oral Implantologist in Rohtak, Haryana (BDS, MDS). She is the founder of {SITE.name} in Sector 2, where root canals, gum surgery, implants and other treatments are carried out under a dental microscope. Patients can book on {SITE.phone}.</p>

      <div className="im sv-img" style={{ aspectRatio: '16/10', maxWidth: 760 }}>
        <Image src={sapna.img.replace('dr-sapna-sharma', 'dr-sapna-wide')} alt="Dr. Sapna Sharma, Periodontist and Oral Implantologist, at her clinic in Rohtak" fill sizes="(max-width:900px) 100vw, 760px" priority />
      </div>

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 40 }}>Qualifications and memberships</h2>
      <ul className="pl">
        <li><Icon n="ck" />BDS, MMCDSR</li>
        <li><Icon n="ck" />MDS in Periodontics and Oral Implantology, NIMS University</li>
        <li><Icon n="ck" />Certified in Smile Designing and Full Mouth Rehabilitation (Pune)</li>
        <li><Icon n="ck" />Member, Indian Society of Periodontology and Indian Dental Association</li>
        <li><Icon n="ck" />Over 10 national and international publications in reputed journals</li>
      </ul>
      {/* [TODO Dr. Sapna se lo: registration number (State Dental Council), clinic kab shuru hui, publications ke naam/links, conference list. Inse E-E-A-T sabse zyada badhta hai] */}

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 40 }}>How she treats patients</h2>
      <p style={{ marginTop: 10, maxWidth: 760 }}>Dr. Sapna practises gentle, comprehensive dentistry with personalised treatment plans. She listens first, explains your options before starting, and prefers conservative treatment that keeps your natural tooth wherever that is suitable. Cost and suitability are decided only after examination.</p>

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 40 }}>The clinical team</h2>
      <p style={{ marginTop: 10, maxWidth: 760 }}><b>{sapna.name}</b>, {sapna.role}. {sapna.bio}</p>
      <p style={{ marginTop: 10, maxWidth: 760 }}><b>{aarushi.name}</b>, {aarushi.role}. {aarushi.bio}</p>

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 40 }}>Treatments offered</h2>
      <div className="chips">{SERVICES.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div>

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 50 }}>Clinic details</h2>
      <address style={{ marginTop: 10, fontStyle: 'normal', maxWidth: 760 }}>
        <p><b>{SITE.name}</b></p>
        <p>{SITE.addr}</p>
        <p>Phone / WhatsApp: <a href={`tel:${SITE.tel}`}>{SITE.phone}</a></p>
        <p>Hours: {SITE.hours}</p>
        <p>Areas served: {AREAS.join(', ')} and nearby areas of Rohtak.</p>
      </address>
      <div className="cta"><Link href="/#contact" className="btn">Book appointment <Icon n="ar" /></Link><Link href="/reviews" className="btn o">Read patient reviews</Link></div>

      <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginTop: 70 }}>Dr. Sapna Sharma: common questions</h2>
      <div style={{ marginTop: 22, maxWidth: 760, marginBottom: 90 }}>{FACTS.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div>
    </main>
  );
}
