'use client';
import { useState } from 'react';
import { SITE, SERVICES } from '@/lib/site';
import Icon from './Icon';
export function FeedbackForm() {
  const [rate, setRate] = useState(0), [hov, setHov] = useState(0), [err, setErr] = useState({}), [done, setDone] = useState(false), [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget), name = String(f.get('name') || '').trim(), er = {};
    if (!rate) er.rate = 'Please select a star rating.';
    if (!name) er.name = 'Please enter your name.';
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try { await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, rating: rate, comment: String(f.get('comment') || '').trim(), website: f.get('website') }) }); } catch {}
    setBusy(false); setDone(true);
  }
  if (done) return <div className="ok2"><Icon n="ok" /><h3>Thank you</h3><p>Your {rate}-star feedback has been sent to the clinic.</p></div>;
  return (
    <form className="fm" onSubmit={submit} noValidate>
      <div className="f"><label>Your rating</label>
        <div className="pk" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHov(0)}>{[1, 2, 3, 4, 5].map((i) => <button type="button" key={i} aria-label={`${i} star`} className={i <= (hov || rate) ? 'on' : ''} onMouseEnter={() => setHov(i)} onClick={() => setRate(i)}><Icon n="st" /></button>)}</div>
        <div className="er">{err.rate}</div></div>
      <div className={'f' + (err.name ? ' bad' : '')}><label htmlFor="rn">Your name</label><input id="rn" name="name" placeholder="Your name" autoComplete="name" /><div className="er">{err.name}</div></div>
      <div className="f"><label htmlFor="rt">Comment (optional)</label><textarea id="rt" name="comment" placeholder="Tell us about your visit" /></div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      <div><button className="btn" disabled={busy}>Submit feedback</button></div>
    </form>
  );
}
export function ContactForm() {
  const [err, setErr] = useState({}), [url, setUrl] = useState(''), [nm, setNm] = useState('');
  function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget), name = String(f.get('name') || '').trim(), ph = String(f.get('phone') || '').trim(), er = {};
    if (name.length < 2) er.name = 'Please enter your name.';
    if (!/^[+\d\s-]{10,14}$/.test(ph)) er.phone = 'Enter a valid phone number.';
    setErr(er);
    if (Object.keys(er).length) return;
    const m = String(f.get('msg') || '').trim();
    const u = `https://wa.me/${SITE.wa}?text=${encodeURIComponent(`Hello, I am ${name} (${ph}). I would like to book: ${f.get('svc')}.${m ? ' ' + m : ''}`)}`;
    setNm(name); setUrl(u); window.open(u, '_blank');
  }
  if (url) return <div className="ok2"><Icon n="ok" /><h3>Almost done</h3><p>Thank you, {nm}. Send your request on WhatsApp to confirm your slot, or call us on {SITE.phone}.</p><p style={{ marginTop: 14 }}><a className="btn" href={url} target="_blank" rel="noopener">Send on WhatsApp</a></p></div>;
  return (
    <form className="fm" onSubmit={submit} noValidate>
      <div className="f2">
        <div className={'f' + (err.name ? ' bad' : '')}><label htmlFor="cn">Full name</label><input id="cn" name="name" autoComplete="name" placeholder="Your name" /><div className="er">{err.name}</div></div>
        <div className={'f' + (err.phone ? ' bad' : '')}><label htmlFor="cp">Phone number</label><input id="cp" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" /><div className="er">{err.phone}</div></div>
      </div>
      <div className="f"><label htmlFor="cs">Treatment</label><select id="cs" name="svc"><option>Consultation</option>{SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}</select></div>
      <div className="f"><label htmlFor="cm">Message (optional)</label><textarea id="cm" name="msg" placeholder="Anything we should know?" /></div>
      <div><button className="btn">Request appointment <Icon n="ar" /></button></div>
    </form>
  );
}
