'use client';
import { useState } from 'react';
let stopT; // click/tap se chal raha video. Naya shuru ho to purana band ho jata hai
const hover = (e) => e.pointerType === 'mouse' && !matchMedia('(prefers-reduced-motion:reduce)').matches;
// Shorts ki hqdefault thumbnail 4:3 me kaali patti ke saath aati hai, isliye maxres try karte hain (na mile to hqdefault)
const fb = (e, hq) => { const i = e.currentTarget; if (!i.src.includes('hqdefault')) i.src = hq; };
function Card({ id, title, short }) {
  // m: '' = band, 'h' = mouse hover (muted preview), 't' = click/tap (awaaz ke saath)
  const [m, setM] = useState(''), [rd, setRd] = useState(false);
  const hq = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const off = () => { setM(''); setRd(false); };
  const tap = () => { stopT?.(); stopT = off; setRd(false); setM('t'); };
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=${m === 'h' ? 1 : 0}&playsinline=1&rel=0&modestbranding=1${short ? `&loop=1&playlist=${id}` : ''}`;
  return (
    <div className={'ytf' + (short ? ' sh' : '')}
      onPointerEnter={(e) => hover(e) && !m && setM('h')}
      onPointerLeave={(e) => e.pointerType === 'mouse' && m === 'h' && off()}>
      <button className="ytb" aria-label={`Play video: ${title}`} onClick={tap}>
        <img src={short ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : hq} alt={title} loading="lazy" onError={(e) => fb(e, hq)} onLoad={(e) => e.currentTarget.naturalWidth <= 120 && fb(e, hq)} />
        <span className="ytp"><svg className="i" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
        <span className="ytc">{title}</span>
      </button>
      {m && <iframe key={m} className={rd ? 'rd' : ''} src={src} title={title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen onLoad={() => setRd(true)} />}
    </div>
  );
}
export default function YouTubeGrid({ longs }) {
  return (
    <div className="yw r">
      <div className="yl">{longs.map((v) => <Card key={v.url} id={v.url} title={v.title} />)}</div>
    </div>
  );
}
export function ShortsGrid({ shorts }) {
  return <div className="sg r">{shorts.map((v) => <Card key={v.url} id={v.url} title={v.title} short />)}</div>;
}
