import Link from 'next/link';
import Header from '@/components/Header';
import Widgets from '@/components/Widgets';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { SITE, DEV } from '@/lib/site';
export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <footer><div className="w">
        <Link href="/" className="lg"><Logo /><span>{SITE.name}</span></Link>
        <span>{SITE.addr}<br />{SITE.hours}</span>
        <span className="so">
          <a href={SITE.yt} target="_blank" rel="noopener" aria-label="YouTube"><Icon n="yt" /></a>
          <a href={SITE.ig} target="_blank" rel="noopener" aria-label="Instagram"><Icon n="ig" /></a>
        </span>
        <div className="fbt">
          {DEV.show && <small className="dc">Designed &amp; Developed by <a href={DEV.link} target="_blank" rel="noopener">{DEV.name}</a> – {DEV.role}</small>}
          <Link href="/admin" className="al" rel="nofollow" aria-label="Admin login"><Icon n="lock" />Admin</Link>
        </div>
      </div></footer>
      <Widgets />
      <Reveal />
    </>
  );
}
