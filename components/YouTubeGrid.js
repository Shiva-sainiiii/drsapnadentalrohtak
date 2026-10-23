'use client';
import { useEffect, useRef, useState } from 'react';

// m: 0 = thumbnail, 1 = hover preview (muted, bina controls), 2 = full play (sound + controls)
function Card({ id, title, short }) {
  const [m, setM] = useState(0), [rd, setRd] = useState(false), t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  // Hover autoplay sirf mouse pe (touch pe tap = play). Thoda delay taaki scroll karte waqt galti se na chale
  const enter = (e) => {
    if (e.pointerType !== 'mouse' || m === 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearTimeout(t.current); t.current = setTimeout(() => setM(1), 350);
  };
  const leave = () => { clearTimeout(t.current); setRd(false); setM((v) => (v === 1 ? 0 : v)); };
  const base = `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&autoplay=1`;
  const src = m === 1 ? `${base}&mute=1&controls=0&disablekb=1&loop=1&playlist=${id}&modestbranding=1` : base;
  return (
    <div className={'ytf' + (short ? ' sh' : '')} onPointerEnter={enter} onPointerLeave={leave}>
      {m > 0 && <iframe key={m} src={src} title={title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen onLoad={() => m === 1 && setTimeout(() => setRd(true), 700)} />}
      {m < 2 && (
        <button className="ytb" aria-label={`Play video: ${title}`} onClick={() => { clearTimeout(t.current); setM(2); }}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" style={rd ? { opacity: 0 } : undefined} />
          {m === 0 && <span className="ytp"><svg className="i" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>}
          {m === 1 && rd && <span className="ytm">Click for sound</span>}
          <span className="ytc">{title}</span>
        </button>
      )}
    </div>
  );
}
export default function YouTubeGrid({ longs, shorts = [] }) {
  return (
    <div className="yw r">
      <div className="yl">{longs.map((v) => <Card key={v.url} id={v.url} title={v.title} />)}</div>
      {shorts.length > 0 && (
        <>
          <h3 className="ysh">YouTube Shorts</h3>
          <div className="ys">{shorts.map((v) => <Card key={v.url} id={v.url} title={v.title} short />)}</div>
        </>
      )}
    </div>
  );
}
