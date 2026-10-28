import Link from 'next/link';
import Header from '@/components/Header';
import Widgets from '@/components/Widgets';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { SITE, DEV, SERVICES, AREAS } from '@/lib/site';
export default function SiteLayout({ children }) {
  const mapQ = encodeURIComponent(SITE.map);
  return (
    <>
      <Header />
      {children}
      <footer><div className="w">
        <div className="ftg">
          <div>
            <Link href="/" className="lg"><Logo /><span>{SITE.name}</span></Link>
            <address className="fta">
              <p>{SITE.addr}</p>
              <p><a href={`tel:${SITE.tel}`}>{SITE.phone}</a></p>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p>{SITE.hours}</p>
            </address>
            <span className="so">
              <a href={SITE.yt} target="_blank" rel="noopener" aria-label="YouTube"><Icon n="yt" /></a>
              <a href={SITE.ig} target="_blank" rel="noopener" aria-label="Instagram"><Icon n="ig" /></a>
            </span>
          </div>
          <div>
            <h2 className="fth">Treatments in Rohtak</h2>
            <ul className="ftl">{SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}</ul>
            <h2 className="fth" style={{ marginTop: 26 }}>The clinic</h2>
            <ul className="ftl"><li><Link href="/about">About Dr. Sapna Sharma</Link></li><li><Link href="/reviews">Patient reviews</Link></li><li><Link href="/microscopic-dentistry-rohtak">Microscopic dentistry</Link></li></ul>
            <h2 className="fth" style={{ marginTop: 26 }}>Areas we serve</h2>
            <p>{AREAS.join(', ')} and nearby areas of Rohtak.</p>
          </div>
          <div>
            <h2 className="fth">Find us in Rohtak</h2>
            <iframe className="ftm" title="Clinic location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${mapQ}&output=embed`} />
            <a className="ftd" target="_blank" rel="noopener" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`}>Get directions on Google Maps</a>
          </div>
        </div>
        <div className="fe">
          <span>Website designed and developed by <a href={DEV.url} target="_blank" rel="noopener">{DEV.name}</a></span>
          <Link href="/admin" rel="nofollow">Admin login</Link>
        </div>
      </div></footer>
      <Widgets />
      <Reveal />
    </>
  );
}
