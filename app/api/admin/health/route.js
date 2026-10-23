import { isAdmin } from '@/lib/auth';
import { sb, dbOn } from '@/lib/db';
export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const e = process.env, K = (e.SUPABASE_SERVICE_KEY || '').trim();
  const out = { env: Object.fromEntries(['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'GEMINI_API_KEY', 'ADMIN_PASSWORD'].map((k) => [k, e[k] ? 'set' : 'MISSING'])), steps: [] };
  let kt = 'unknown';
  if (K.startsWith('sb_secret_')) kt = 'secret key (correct)';
  else if (K.startsWith('sb_publishable_')) kt = 'PUBLISHABLE key (WRONG: use the secret key)';
  else if (K.split('.').length === 3) { try { const r = JSON.parse(Buffer.from(K.split('.')[1], 'base64url').toString()).role; kt = `legacy key, role = ${r}${r === 'service_role' ? ' (correct)' : ' (WRONG: use service_role)'}`; } catch {} }
  out.supabaseKey = K ? kt : 'missing';
  const step = async (name, fn) => { try { await fn(); out.steps.push({ name, ok: true }); } catch (x) { out.steps.push({ name, ok: false, error: String(x.message).slice(0, 300) }); } };
  if (dbOn) {
    await step('read "media" table', () => sb('media?select=id&limit=1'));
    await step('read "feedback" table', () => sb('feedback?select=id&limit=1'));
    await step('insert + delete a test feedback row', async () => { const r = await sb('feedback', { method: 'POST', body: { name: 'health-check', rating: 5, comment: '' }, prefer: 'return=representation' }); await sb(`feedback?id=eq.${r[0].id}`, { method: 'DELETE' }); });
  }
  return Response.json(out);
}
