import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { sb } from '@/lib/db';
import { destroy } from '@/lib/cloud';
const no = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
const bad = (e) => Response.json({ error: String(e.message || e).slice(0, 300) }, { status: 500 });
const done = () => revalidatePath('/', 'layout');
const KINDS = ['gallery', 'video', 'ba', 'doctor', 'site', 'youtube', 'pano'], UUID = /^[0-9a-f-]{36}$/;
export async function GET() {
  if (!(await isAdmin())) return no();
  try { return Response.json(await sb('media?order=kind.asc,sort.asc,created_at.desc')); } catch (e) { return bad(e); }
}
export async function POST(req) {
  if (!(await isAdmin())) return no();
  try {
    const b = await req.json();
    if (!KINDS.includes(b.kind) || !b.url) return Response.json({ error: 'Invalid data' }, { status: 400 });
    const row = { kind: b.kind, title: String(b.title || '').slice(0, 120), category: String(b.category || '').slice(0, 60), url: b.url, url2: b.url2 || null, public_id: b.public_id || null, public_id2: b.public_id2 || null, resource_type: b.resource_type || 'image', sort: +b.sort || 0 };
    const r = await sb('media', { method: 'POST', body: row, prefer: 'return=representation' });
    done();
    return Response.json(r[0]);
  } catch (e) { return bad(e); }
}
export async function PATCH(req) {
  if (!(await isAdmin())) return no();
  try {
    const b = await req.json();
    if (!UUID.test(b.id || '')) return Response.json({ error: 'Invalid id' }, { status: 400 });
    const patch = {};
    if ('title' in b) patch.title = String(b.title).slice(0, 120);
    if ('sort' in b) patch.sort = +b.sort || 0;
    if ('visible' in b) patch.visible = !!b.visible;
    await sb(`media?id=eq.${b.id}`, { method: 'PATCH', body: patch });
    done();
    return Response.json({ ok: true });
  } catch (e) { return bad(e); }
}
export async function DELETE(req) {
  if (!(await isAdmin())) return no();
  try {
    const id = new URL(req.url).searchParams.get('id') || '';
    if (!UUID.test(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
    const [row] = await sb(`media?id=eq.${id}&select=*`);
    if (row) { await destroy(row.public_id, row.resource_type || 'image'); await destroy(row.public_id2, 'image'); }
    await sb(`media?id=eq.${id}`, { method: 'DELETE' });
    done();
    return Response.json({ ok: true });
  } catch (e) { return bad(e); }
}
