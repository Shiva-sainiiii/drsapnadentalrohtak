import { sb, dbOn } from '@/lib/db';
export async function POST(req) {
  try {
    const b = await req.json();
    if (b.website) return Response.json({ ok: true });
    const name = String(b.name || '').trim().slice(0, 80), rating = Math.min(5, Math.max(1, +b.rating || 0)), comment = String(b.comment || '').trim().slice(0, 1000);
    if (!name || !rating) return Response.json({ error: 'invalid' }, { status: 400 });
    if (dbOn) await sb('feedback', { method: 'POST', body: { name, rating, comment } });
  } catch {}
  return Response.json({ ok: true });
}
