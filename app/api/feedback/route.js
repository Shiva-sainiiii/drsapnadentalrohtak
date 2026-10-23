import { sb, dbOn } from '@/lib/db';
export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ error: 'invalid' }, { status: 400 }); }
  if (b.website) return Response.json({ ok: true });
  const name = String(b.name || '').trim().slice(0, 80), rating = Math.min(5, Math.max(1, +b.rating || 0)), comment = String(b.comment || '').trim().slice(0, 1000);
  if (!name || !rating) return Response.json({ error: 'invalid' }, { status: 400 });
  if (!dbOn) { console.error('[feedback] SUPABASE_URL / SUPABASE_SERVICE_KEY is missing on the server'); return Response.json({ error: 'not_configured' }, { status: 503 }); }
  try {
    await sb('feedback', { method: 'POST', body: { name, rating, comment } });
    return Response.json({ ok: true });
  } catch (e) {
    console.error('[feedback] Supabase insert failed:', String(e.message).slice(0, 500));
    return Response.json({ error: 'save_failed' }, { status: 502 });
  }
}
