import Link from 'next/link';
import { SITE, REVIEWS, og } from '@/lib/site';
import { getAllReviews } from '@/lib/data';
import Icon from '@/components/Icon';

export const revalidate = 60;
const description = `Read what patients say about ${SITE.name} in Sector 2, Rohtak. Call ${SITE.phone}.`;
export const metadata = { title: 'Dentist Reviews in Rohtak', description, alternates: { canonical: '/reviews' }, openGraph: og(`Dentist Reviews in Rohtak | ${SITE.short}`, description, '/reviews') };
const Stars = ({ n = 5 }) => <span className="sr">{[1, 2, 3, 4, 5].map((i) => <Icon key={i} n="st" c={i <= n ? '' : 'e'} />)}</span>;
const FAQ = [
  ['Best dentist in Rohtak ke reviews kahan padh sakte hain?', `Is page par ${SITE.name} ke patients ke reviews hain. Aap apna feedback bhi bhej sakte hain; clinic ki team use check karke yahan dikhati hai.`],
  ['Dant ka doctor Rohtak me chunne se pehle kya dekhna chahiye?', 'Doctor ki qualification, ilaaj ka tareeka, clinic ki safai aur asli patients ke reviews dekhein. Dr. Sapna Sharma ne BDS aur MDS (Periodontics and Oral Implantology) kiya hai. Pehli consultation me apne sawal zaroor poochein.'],
];

export default async function Reviews() {
  const rows = await getAllReviews();
  // Approved feedback pehle, phir default reviews (home page jaisa hi order)
  const all = [...rows.map((r) => ({ k: r.id, t: r.comment, n: String(r.name || '').trim(), s: Math.min(5, Math.max(1, +r.rating || 5)) })), ...REVIEWS.map((t) => ({ k: t, t, n: '', s: 5 }))];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [[SITE.url, 'Home'], [`${SITE.url}/reviews`, 'Reviews']].map(([item, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
  ];
  return (
    <main className="w sv">
      {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      <p className="crumb"><Link href="/">Home</Link> / Reviews</p>
      <h1>Patient reviews in Rohtak</h1>
      <p className="lead">What patients say about dental care at {SITE.name}, Sector 2, Rohtak.</p>
      <div className="ra">{all.map((r) => <div key={r.k} className="rc"><Stars n={r.s} /><p className="sf">{r.t}</p><small>{r.n ? `${r.n} · Patient review` : 'Patient review'}</small></div>)}</div>
      <div className="cta"><Link className="btn" href="/#reviews">Share your feedback</Link><Link className="btn o" href="/#contact">Book a visit <Icon n="ar" /></Link></div>
      <h2 style={{ marginTop: 70, fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>Choosing a dentist in Rohtak: common questions</h2>
      <div style={{ marginTop: 22, maxWidth: 760, marginBottom: 90 }}>{FAQ.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div>
    </main>
  );
}
