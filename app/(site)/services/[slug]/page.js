import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SITE, SERVICES, SIMG, og } from '@/lib/site';
import Icon from '@/components/Icon';

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));
const get = async (params) => { const { slug } = await params; return SERVICES.find((s) => s.slug === slug); };
const H2 = { fontSize: 'clamp(1.6rem,3vw,2.2rem)' };
export async function generateMetadata({ params }) {
  const s = await get(params);
  if (!s) return {};
  const description = `${s.mt}: ${s.short} Call ${SITE.phone}.`, path = `/services/${s.slug}`; // title (template ke saath) 60 aur description 160 chars ke andar
  return { title: s.mt, description, alternates: { canonical: path }, openGraph: og(`${s.mt} | ${SITE.short}`, description, path) };
}
export default async function Service({ params }) {
  const s = await get(params);
  if (!s) notFound();
  const url = `${SITE.url}/services/${s.slug}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: s.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [[SITE.url, 'Home'], [`${SITE.url}/#services`, 'Treatments'], [url, s.name]].map(([item, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
    { '@context': 'https://schema.org', '@type': 'Service', name: s.h, description: s.short, url, areaServed: { '@type': 'City', name: 'Rohtak' }, provider: { '@id': `${SITE.url}/#clinic` } },
    { '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`, url, name: s.h, inLanguage: 'en-IN', isPartOf: { '@id': `${SITE.url}/#website` }, about: { '@id': `${SITE.url}/#clinic` }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.ans'] } },
  ];
  return (
    <main className="w sv">
      {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      <p className="crumb"><Link href="/">Home</Link> / <Link href="/#services">Treatments</Link> / {s.name}</p>
      <h1>{s.h}</h1>
      <p className="lead ans">{s.ans}</p>
      {SIMG[s.slug] && <div className="im sv-img"><Image src={SIMG[s.slug]} alt={`${s.h}: a case treated at ${SITE.short}`} fill sizes="(max-width:1240px) 100vw, 1100px" loading="eager" fetchPriority="high" /></div>}
      <h2 style={{ ...H2, marginTop: 40 }}>{s.name} at our Rohtak clinic</h2>
      <p style={{ marginTop: 10 }}>{s.body}</p>
      <ul className="pl">{s.pts.map((p) => <li key={p}><Icon n="ck" />{p}</li>)}</ul>
      <div className="cta"><Link href="/#contact" className="btn">Book appointment <Icon n="ar" /></Link><a href={`tel:${SITE.tel}`} className="btn o"><Icon n="ph" />{SITE.phone}</a></div>
      <p style={{ marginTop: 26, maxWidth: 760 }}>Treatment is planned and performed by <Link href="/about"><b>Dr. Sapna Sharma</b></Link>, Periodontist and Oral Implantologist. See <Link href="/reviews">patient reviews</Link>.</p>
      <h2 style={{ ...H2, marginTop: 70 }}>{s.name} in Rohtak: common questions</h2>
      <div style={{ marginTop: 22, maxWidth: 760 }}>{s.faq.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div>
      <h2 style={{ ...H2, marginTop: 60 }}>Visit us in Rohtak</h2>
      <p style={{ marginTop: 10 }}>{SITE.name}, {SITE.addr}. Open {SITE.hours}.</p>
      <div className="chips" style={{ marginBottom: 90 }}>{SERVICES.filter((x) => x.slug !== s.slug).map((x) => <Link key={x.slug} href={`/services/${x.slug}`}>{x.name}</Link>)}</div>
    </main>
  );
}
