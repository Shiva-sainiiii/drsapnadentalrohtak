'use client';
import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/lib/site';
import Icon from './Icon';
const QR = ['Book appointment', 'Root canal / Re-RCT', 'Clinic timings', 'Directions'];
export default function Widgets() {
  const [o, setO] = useState(false), [q, setQ] = useState(''), [b, setB] = useState(false);
  const [m, setM] = useState([{ r: 'bt', t: `Hello! I am the virtual assistant of ${SITE.name}. How can I help you today?` }]);
  const box = useRef(null), inp = useRef(null);
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight; }, [m, b]);
  useEffect(() => { if (o) inp.current?.focus({ preventScroll: true }); }, [o]);
  async function ask(t) {
    t = t.trim();
    if (!t || b) return;
    const next = [...m, { r: 'us', t }];
    setM(next); setQ(''); setB(true);
    try {
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next.map((x) => ({ role: x.r === 'us' ? 'user' : 'model', text: x.t })) }) });
      const j = await r.json();
      setM((p) => [...p, { r: 'bt', t: j.reply || `Please call ${SITE.phone}.` }]);
    } catch { setM((p) => [...p, { r: 'bt', t: `Sorry, I could not connect. Please call ${SITE.phone}.` }]); }
    setB(false);
  }
  return (
    <>
      <div className={'cp' + (o ? ' o' : '')} role="dialog" aria-label="Chat with clinic assistant">
        <div className="ch"><div><b>Dr. Sapna&apos;s Assistant</b><span className="dot" />Online</div><button aria-label="Close chat" onClick={() => setO(false)}><Icon n="x" /></button></div>
        <div className="mb" ref={box}>{m.map((x, i) => <div key={i} className={'m ' + x.r}>{x.t}</div>)}{b && <div className="m bt ty"><i /><i /><i /></div>}</div>
        <div className="cq">{QR.map((x) => <button key={x} onClick={() => ask(x)}>{x}</button>)}</div>
        <form className="cf" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
          <input ref={inp} value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} placeholder="Type your question" aria-label="Your message" autoComplete="off" />
          <button aria-label="Send"><Icon n="sd" /></button>
        </form>
      </div>
      <div className="fb">
        <a className="fa wa" aria-label="Chat on WhatsApp" target="_blank" rel="noopener" href={`https://wa.me/${SITE.wa}?text=${encodeURIComponent('Hello, I would like to book an appointment at ' + SITE.name)}`}><Icon n="wa" /></a>
        <button className="fa cb" aria-label="Open chat" onClick={() => setO(!o)}><Icon n="ct" /></button>
      </div>
    </>
  );
}
