'use client';
import { useCallback, useEffect, useState } from 'react';

const TABS = [['ba', 'Before / After'], ['gallery', 'Gallery'], ['youtube', 'YouTube'], ['doctor', 'Doctors'], ['site', 'Site images'], ['feedback', 'Feedback']];
const DOCS = [['dr-sapna-sharma', 'Dr. Sapna Sharma'], ['dr-aarushi-vij', 'Dr. Aarushi Vij']];
const SLOTS = [['hero-main', 'Hero main photo'], ['hero-small', 'Hero small photo'], ['about', 'About section photo']];
const ytId = (s) => (s.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/) || [])[1] || (/^[\w-]{11}$/.test(s.trim()) ? s.trim() : '');
async function api(url, opt = {}) {
  const r = await fetch(url, { ...opt, headers: { 'Content-Type': 'application/json' } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Request failed');
  return j;
}
async function upload(file) {
  const rt = file.type.startsWith('video') ? 'video' : 'image';
  const s = await api('/api/admin/sign', { method: 'POST', body: '{}' });
  const f = new FormData();
  f.append('file', file); f.append('api_key', s.api_key); f.append('timestamp', s.timestamp); f.append('signature', s.signature); f.append('folder', s.folder);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${s.cloud_name}/${rt}/upload`, { method: 'POST', body: f });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || 'Upload failed');
  return { url: j.secure_url, public_id: j.public_id, resource_type: rt };
}
const post = (b) => api('/api/admin/media', { method: 'POST', body: JSON.stringify(b) });

export default function Admin() {
  const [ok, setOk] = useState(undefined), [rows, setRows] = useState([]), [fb, setFb] = useState([]), [tab, setTab] = useState('ba'), [msg, setMsg] = useState(''), [busy, setBusy] = useState(false), [pw, setPw] = useState('');
  const load = useCallback(async () => {
    try { setRows(await api('/api/admin/media')); setFb(await api('/api/admin/feedback')); setOk(true); }
    catch (e) { if (e.message === 'Unauthorized') setOk(false); else { setOk(true); setMsg(e.message); } }
  }, []);
  useEffect(() => { load(); }, [load]);
  async function login(e) {
    e.preventDefault(); setMsg('');
    try { await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: pw }) }); setPw(''); await load(); } catch (er) { setMsg(er.message); }
  }
  async function add(e) {
    e.preventDefault();
    const form = e.currentTarget, f = new FormData(form), title = String(f.get('title') || '');
    setBusy(true); setMsg('');
    try {
      if (tab === 'youtube') {
        const id = ytId(String(f.get('link') || ''));
        if (!id) throw new Error('Invalid YouTube link');
        await post({ kind: 'youtube', title, url: id, category: f.get('short') ? 'short' : '' });
      } else if (tab === 'ba') {
        const a = f.get('before'), b = f.get('after');
        if (!a?.size || !b?.size) throw new Error('Choose both the before and after photos');
        const u1 = await upload(a), u2 = await upload(b);
        await post({ kind: 'ba', title, url: u1.url, public_id: u1.public_id, url2: u2.url, public_id2: u2.public_id });
      } else {
        const files = f.getAll('file').filter((x) => x.size);
        if (!files.length) throw new Error('Choose a file');
        for (const file of files) {
          const u = await upload(file);
          await post({ kind: tab === 'gallery' ? (u.resource_type === 'video' ? 'video' : 'gallery') : tab, title: tab === 'gallery' ? title : '', category: f.get('cat') || '', ...u });
        }
      }
      form.reset(); await load(); setMsg('Saved. The website updates within a minute.');
    } catch (er) { setMsg(er.message); }
    setBusy(false);
  }
  const upd = async (id, patch) => { try { await api('/api/admin/media', { method: 'PATCH', body: JSON.stringify({ id, ...patch }) }); setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x))); } catch (e) { setMsg(e.message); } };
  const del = async (id) => { if (!confirm('Delete this permanently?')) return; try { await api('/api/admin/media?id=' + id, { method: 'DELETE' }); setRows((r) => r.filter((x) => x.id !== id)); } catch (e) { setMsg(e.message); } };
  const delFb = async (id) => { if (!confirm('Delete this feedback?')) return; try { await api('/api/admin/feedback?id=' + id, { method: 'DELETE' }); setFb((r) => r.filter((x) => x.id !== id)); } catch (e) { setMsg(e.message); } };
  const out = async () => { await api('/api/admin/login', { method: 'DELETE' }); setOk(false); };

  if (ok === undefined) return <div className="adm"><p>Loading...</p></div>;
  if (!ok) return (
    <div className="adm" style={{ maxWidth: 420 }}>
      <h1>Admin login</h1>
      <form className="box" onSubmit={login}><input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" autoComplete="current-password" /><button className="btn">Login</button>{msg && <div className="msg">{msg}</div>}</form>
    </div>
  );
  const list = rows.filter((r) => (tab === 'gallery' ? ['gallery', 'video'].includes(r.kind) : r.kind === tab));
  const label = (r) => (r.kind === 'doctor' ? (DOCS.find((d) => d[0] === r.category) || [])[1] : r.kind === 'site' ? (SLOTS.find((d) => d[0] === r.category) || [])[1] : '');
  return (
    <div className="adm">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><div><h1>Website admin</h1><p>Add, edit and delete the photos and videos shown on the website.</p></div><div><a className="btn o sm" href="/">View site</a> <button className="btn o sm" onClick={out}>Logout</button></div></div>
      <div className="tabs">{TABS.map(([k, n]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setMsg(''); }}>{n}</button>)}</div>
      {msg && <div className="msg" style={{ marginBottom: 16 }}>{msg}</div>}
      {tab === 'feedback' ? (
        fb.length ? fb.map((x) => <div className="row" key={x.id} style={{ gridTemplateColumns: '1fr auto' }}><div><b>{x.name}</b> {'★'.repeat(x.rating)}<br />{x.comment || <i>No comment</i>}<br /><small>{new Date(x.created_at).toLocaleString()}</small></div><button className="btn sm dng" onClick={() => delFb(x.id)}>Delete</button></div>) : <p>No feedback yet.</p>
      ) : (
        <>
          <form className="box" onSubmit={add}>
            <h3>Add new</h3>
            {tab === 'ba' && <><input name="title" placeholder="Title, e.g. Smile makeover with crowns" /><label>Before photo<input type="file" name="before" accept="image/*" /></label><label>After photo<input type="file" name="after" accept="image/*" /></label></>}
            {tab === 'gallery' && <><input name="title" placeholder="Caption (optional)" /><label>Photos or videos (you can pick many)<input type="file" name="file" accept="image/*,video/*" multiple /></label></>}
            {tab === 'youtube' && <><input name="title" placeholder="Video title" /><input name="link" placeholder="YouTube link or video ID" /><label><input type="checkbox" name="short" style={{ width: 'auto' }} /> This is a YouTube Short</label></>}
            {tab === 'doctor' && <><select name="cat">{DOCS.map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select><input type="file" name="file" accept="image/*" /><small>The latest photo is used. Delete the old one afterwards.</small></>}
            {tab === 'site' && <><select name="cat">{SLOTS.map(([k, n]) => <option key={k} value={k}>{n}</option>)}</select><input type="file" name="file" accept="image/*" /><small>The latest photo is used. Delete the old one afterwards.</small></>}
            <div><button className="btn" disabled={busy}>{busy ? 'Uploading...' : 'Add'}</button></div>
          </form>
          {list.map((r) => (
            <div className="row" key={r.id}>
              {r.kind === 'youtube' ? <img src={`https://i.ytimg.com/vi/${r.url}/mqdefault.jpg`} alt="" /> : r.kind === 'video' ? <div className="th2">Video</div> : <img src={r.url.replace('/upload/', '/upload/w_240,f_auto,q_auto/')} alt="" />}
              <div>{label(r) && <b>{label(r)}</b>}{r.kind === 'ba' && <small> (before/after)</small>}{r.category === 'short' && <small> (Short)</small>}<input defaultValue={r.title} placeholder="Title" onBlur={(e) => e.target.value !== r.title && upd(r.id, { title: e.target.value })} /></div>
              <div className="acts"><label>Order <input type="number" defaultValue={r.sort} onBlur={(e) => +e.target.value !== r.sort && upd(r.id, { sort: +e.target.value })} /></label><label><input type="checkbox" style={{ width: 'auto' }} checked={r.visible} onChange={(e) => upd(r.id, { visible: e.target.checked })} /> Show</label><button className="btn sm dng" onClick={() => del(r.id)}>Delete</button></div>
            </div>
          ))}
          {!list.length && <p>Nothing here yet. The website shows its default content until you add items.</p>}
        </>
      )}
    </div>
  );
}
