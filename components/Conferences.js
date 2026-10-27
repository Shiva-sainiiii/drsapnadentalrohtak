'use client';
import { useEffect, useState } from 'react';
import { cld } from '@/lib/img';
import Icon from './Icon';
export default function Conferences({ items }) {
  const [s, setS] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setS(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  return (
    <>
      <div className={'cfg r' + (items.length >= 4 ? ' big' : '')}>
        {items.map((x) => (
          <button key={x.id} className="cf2" onClick={() => setS(x)} aria-label={`Open photo: ${x.title || 'Conference'}`}>
            <img src={cld(x.url, 700)} alt={x.title ? `${x.title}${x.category ? ', ' + x.category : ''}: Dr. Sapna Sharma` : 'Dr. Sapna Sharma at a dental conference'} loading="lazy" />
            {(x.title || x.category) && <span className="cc">{x.title && <b>{x.title}</b>}{x.category && <small>{x.category}</small>}</span>}
          </button>
        ))}
      </div>
      {s && (
        <div className="lb" role="dialog" aria-modal="true" onClick={() => setS(null)}>
          <button aria-label="Close" onClick={() => setS(null)}><Icon n="x" /></button>
          <img src={cld(s.url, 1400)} alt={s.title || ''} onClick={(e) => e.stopPropagation()} />
          {(s.title || s.category) && <p>{[s.title, s.category].filter(Boolean).join(' · ')}</p>}
        </div>
      )}
    </>
  );
}
