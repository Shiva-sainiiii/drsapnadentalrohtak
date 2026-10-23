'use client';
import { useEffect, useState } from 'react';
import { cld, vthumb } from '@/lib/img';
import Icon from './Icon';
export default function Gallery({ items }) {
  const [s, setS] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setS(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  return (
    <>
      <div className="gl">{items.map((x) => {
        const v = x.kind === 'video';
        return (
          <button key={x.id} className="r" onClick={() => setS(x)} aria-label={`Open ${v ? 'video' : 'photo'}: ${x.title || 'clinic'}`}>
            <img src={v ? vthumb(x.url) : cld(x.url, 600)} alt={x.title || 'Clinic photo'} loading="lazy" />
            {v && <span className="pl"><svg className="i" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>}
          </button>
        );
      })}</div>
      {s && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setS(null)}>
          <button aria-label="Close" onClick={() => setS(null)}><Icon n="x" /></button>
          {s.kind === 'video' ? <video src={s.url} controls autoPlay playsInline onClick={(e) => e.stopPropagation()} /> : <img src={cld(s.url, 1400)} alt={s.title || ''} onClick={(e) => e.stopPropagation()} />}
          {s.title && <p>{s.title}</p>}
        </div>
      )}
    </>
  );
}
