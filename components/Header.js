'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';
import Icon from './Icon';
import Logo from './Logo';
const TH = [['teal', 'Teal', '#0e7c7b'], ['ocean', 'Ocean', '#1d4ed8'], ['rose', 'Rose', '#be185d'], ['dark', 'Midnight', '#0b1f24']];
const NAV = [['Microscope', '/#microscope'], ['Treatments', '/#services'], ['Doctors', '/#doctors'], ['Results', '/#results'], ['Videos', '/#videos'], ['Reviews', '/#reviews']];
export default function Header() {
  const [o, setO] = useState(false), [t, setT] = useState(false), [th, setTh] = useState('teal');
  useEffect(() => { setTh(document.documentElement.dataset.theme || 'teal'); }, []);
  useEffect(() => {
    document.body.classList.toggle('lk', o && innerWidth < 1020);
    const k = (e) => e.key === 'Escape' && (setO(false), setT(false));
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [o]);
  const pick = (k) => { document.documentElement.dataset.theme = k; try { localStorage.setItem('theme', k); } catch {} setTh(k); setT(false); };
  return (
    <header id="hd"><div className="w"><div className="hi">
      <Link href="/" className="lg" aria-label="Dr. Sapna's Advanced Microscopic Dental Care, home"><Logo /></Link>
      <nav className={o ? 'o' : ''} onClick={(e) => e.target.closest('a') && setO(false)}>
        {NAV.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
        <Link href="/#contact" className="btn">Book a visit</Link>
      </nav>
      <div className="hr">
        <div className="th">
          <button className="thb" aria-label="Change theme" aria-expanded={t} onClick={() => setT(!t)}>
            <svg className="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="8" cy="10" r="1" /><circle cx="12" cy="7.5" r="1" /><circle cx="16" cy="10" r="1" /><path d="M12 21c-1.5 0-2-1-1.4-2 .6-1.2.2-2.5-1.2-2.5H8" /></svg>
          </button>
          <div className={'thm' + (t ? ' o' : '')}>{TH.map(([k, n, c]) => <button key={k} className={th === k ? 'on' : ''} onClick={() => pick(k)}><i style={{ '--c': c }} />{n}</button>)}</div>
        </div>
        <button className="mt" aria-label="Menu" aria-expanded={o} onClick={() => setO(!o)}><Icon n="mn" /></button>
      </div>
    </div></div></header>
  );
}
