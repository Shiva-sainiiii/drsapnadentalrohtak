'use client';
import { useState } from 'react';
function Card({ id, title, short }) {
  const [on, setOn] = useState(false);
  return (
    <div className={'ytf' + (short ? ' sh' : '')}>
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button aria-label={`Play video: ${title}`} onClick={() => setOn(true)} style={{ position: 'absolute', inset: 0, border: 0, padding: 0, background: 'none', cursor: 'pointer' }}>
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} loading="lazy" />
          <span className="ytp"><svg className="i" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></span>
          <span className="ytc">{title}</span>
        </button>
      )}
    </div>
  );
}
export default function YouTubeGrid({ longs, short }) {
  return (
    <div className="yw r">
      <div className="yl">{longs.map((v) => <Card key={v.url} id={v.url} title={v.title} />)}</div>
      {short && <Card id={short.url} title={short.title} short />}
    </div>
  );
}
