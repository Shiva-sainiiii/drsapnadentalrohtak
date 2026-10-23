import Link from 'next/link';
import { SITE, SERVICES, MICRO } from '@/lib/site';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import LensView from '@/components/LensView';

const path = '/microscopic-dentistry-rohtak';
export const metadata = {
  title: 'Microscopic Dentistry in Rohtak | Dental Microscope Treatment',
  description: `${MICRO.short} ${SITE.name}, Sector 2, Rohtak. Call ${SITE.phone}.`.slice(0, 160),
  alternates: { canonical: path },
  openGraph: { title: MICRO.h, description: MICRO.short, url: path, type: 'website' },
};
export default function Micro() {
  const url = SITE.url + path;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: MICRO.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [[SITE.url, 'Home'], [url, 'Microscopic dentistry']].map(([item, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) },
  ];
  return (
    <main className="w sv">
      {ld.map((x, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />)}
      <p className="crumb"><Link href="/">Home</Link> / Microscopic dentistry</p>
      <div className="tag"><Logo />Advanced Microscopic Dental Care</div>
      <h1 style={{ marginTop: 18 }}>{MICRO.h}</h1>
      <p className="lead">{MICRO.intro}</p>
      <div className="mic" style={{ marginTop: 34 }}>
        <LensView src="/images/ba/ba5-before.jpg" alt="Close-up of teeth viewed under magnification" />
        <ul className="pl" style={{ margin: 0 }}>{MICRO.pts.map((p) => <li key={p}><Icon n="ck" />{p}</li>)}</ul>
      </div>
      {MICRO.blocks.map(([h, t]) => <div key={h} style={{ marginTop: 40, maxWidth: 760 }}><h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>{h}</h2><p style={{ marginTop: 10 }}>{t}</p></div>)}
      <div className="chips">{SERVICES.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div>
      <div className="cta" style={{ marginTop: 34 }}><Link href="/#contact" className="btn">Book appointment <Icon n="ar" /></Link><a href={`tel:${SITE.tel}`} className="btn o"><Icon n="ph" />{SITE.phone}</a></div>
      <h2 style={{ marginTop: 70, fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>Common questions</h2>
      <div style={{ marginTop: 22, maxWidth: 760, marginBottom: 90 }}>{MICRO.faq.map(([q, a]) => <details key={q} open><summary>{q}</summary><p>{a}</p></details>)}</div>
    </main>
  );
}
