'use client';
import { useEffect, useState } from 'react';
import { cld, vthumb } from '@/lib/img';
import Icon from './Icon';
function Row({ items, rev, t, onOpen }) {
  const base = Array.from({ length: Math.max(1, Math.ceil(8 / items.length)) }, () => items).flat();
  return (
    <div className={'mr' + (rev ? ' rv' : '')} style={{ '--t': t + 's' }}>
      <div className="mt2">{[...base, ...base].map((x, i) => {
        const v = x.kind === 'video';
        return (
          <button key={i} className="gc" onClick={() => onOpen(x)} aria-label={`Open ${v ? 'video' : 'photo'}: ${x.title || 'clinic'}`} aria-hidden={i >= base.length ? 'true' : undefined} tabIndex={i >= base.length ? -1 : undefined}>
            <img src={v ? vthumb(x.url) : cld(x.url, 500)} alt={i >= base.length ? '' : x.title || 'Clinic photo'} loading="lazy" />
            {v && <span className="pl"><svg className="i" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>}
            {x.title && <span className="cap">{x.title}</span>}
          </button>
        );
      })}</div>
    </div>
  );
}
export default function Gallery({ items }) {
  const [s, setS] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setS(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const rev = [...items].reverse();
  return (
    <>
      <Row items={items} t={Math.max(40, items.length * 9)} onOpen={setS} />
      <Row items={rev} rev t={Math.max(50, items.length * 11)} onOpen={setS} />
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
