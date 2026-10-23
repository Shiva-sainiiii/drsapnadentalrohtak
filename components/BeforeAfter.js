'use client';
import { useRef, useState } from 'react';
import { cld } from '@/lib/img';
export default function BeforeAfter({ items }) {
  const [i, setI] = useState(0), [p, setP] = useState(50), [ar, setAr] = useState('2/1'), ref = useRef(null), drag = useRef(false);
  const it = items[i];
  const move = (x) => { const r = ref.current.getBoundingClientRect(); setP(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))); };
  return (
    <div>
      <div className="ba r" ref={ref} style={{ '--ar': ar }}
        onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => drag.current && move(e.clientX)} onPointerUp={() => (drag.current = false)} onPointerCancel={() => (drag.current = false)}>
        <img src={cld(it.url2, 1100)} alt={`${it.title}: after treatment`} loading="lazy" onLoad={(e) => setAr(`${e.target.naturalWidth}/${e.target.naturalHeight}`)} />
        <img src={cld(it.url, 1100)} alt={`${it.title}: before treatment`} loading="lazy" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }} />
        <span className="bl l">Before</span><span className="bl r">After</span>
        <div className="bh" style={{ left: p + '%' }}><span>&#8249;&#8250;</span></div>
        <input className="bi" type="range" min="0" max="100" value={Math.round(p)} onChange={(e) => setP(+e.target.value)} aria-label="Slide to compare before and after" />
      </div>
      <div className="bt">{items.map((x, k) => <button key={x.id} className={k === i ? 'on' : ''} onClick={() => { setI(k); setP(50); }}>{x.title || `Case ${k + 1}`}</button>)}</div>
    </div>
  );
}
