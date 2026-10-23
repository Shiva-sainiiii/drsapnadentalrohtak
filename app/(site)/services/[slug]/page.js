import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, SERVICES } from '@/lib/site';
import Icon from '@/components/Icon';

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));
const get = async (params) => { const { slug } = await params; return SERVICES.find((s) => s.slug === slug); };
export async function generateMetadata({ params }) {
  const s = await get(params);
  if (!s) return {};
  const description = `${s.short} ${s.h} at ${SITE.name}, Sector 2, Rohtak. Call ${SITE.phone}.`.slice(0, 160);
  return { title: s.h, description, alternates: { canonical: `/services/${s.slug}` }, openGraph: { title: s.h, description, url: `/services/${s.slug}`, type: 'website' } };
}
export default async function Service({ params }) {
  const s = await get(params);
  if (!s) notFound();
  const url = `${SITE.url}/services/${s.slug}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [[SITE.url, 'Home'], [`${SITE.url}/#services`, 'Treatments'], [url, s.name]].map(([item, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    { '@context': 'https://schema.org', '@type': 'Service', name: s.h, description: s.short, url, areaServed: { '@type': 'City', name: 'Rohtak' }, provider: { '@id': `${SITE.url}/#clinic` } },
  ];
  return (
    <main className="w sv">
      {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      <p className="crumb"><Link href="/">Home</Link> / <Link href="/#services">Treatments</Link> / {s.name}</p>
      <h1>{s.h}</h1>
      <p className="lead">{s.short}</p>
      <p>{s.body}</p>
      <ul className="pl">{s.pts.map((p) => <li key={p}><Icon n="ck" />{p}</li>)}</ul>
      <div className="cta"><Link href="/#contact" className="btn">Book appointment <Icon n="ar" /></Link><a href={`tel:${SITE.tel}`} className="btn o"><Icon n="ph" />{SITE.phone}</a></div>
      <h2 style={{ marginTop: 70, fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>Common questions</h2>
      <div style={{ marginTop: 22, maxWidth: 760 }}>{s.faq.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div>
      <h2 style={{ marginTop: 60, fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>Visit us in Rohtak</h2>
      <p style={{ marginTop: 10 }}>{SITE.name}, {SITE.addr}. Open {SITE.hours}.</p>
      <div className="chips" style={{ marginBottom: 90 }}>{SERVICES.filter((x) => x.slug !== s.slug).map((x) => <Link key={x.slug} href={`/services/${x.slug}`}>{x.name}</Link>)}</div>
    </main>
  );
}
