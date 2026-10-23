import { isAdmin } from '@/lib/auth';
import { sb } from '@/lib/db';
const no = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
export async function GET() {
  if (!(await isAdmin())) return no();
  try { return Response.json(await sb('feedback?order=created_at.desc&limit=200')); } catch (e) { return Response.json({ error: String(e.message).slice(0, 300) }, { status: 500 }); }
}
export async function DELETE(req) {
  if (!(await isAdmin())) return no();
  const id = new URL(req.url).searchParams.get('id') || '';
  if (!/^[0-9a-f-]{36}$/.test(id)) return Response.json({ error: 'Invalid id' }, { status: 400 });
  try { await sb(`feedback?id=eq.${id}`, { method: 'DELETE' }); return Response.json({ ok: true }); } catch (e) { return Response.json({ error: String(e.message).slice(0, 300) }, { status: 500 }); }
}
