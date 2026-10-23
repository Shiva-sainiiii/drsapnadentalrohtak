const U = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, ''), K = (process.env.SUPABASE_SERVICE_KEY || '').trim();
export const dbOn = !!(U && K);
export async function sb(path, { method = 'GET', body, prefer, revalidate } = {}) {
  const headers = { apikey: K, 'Content-Type': 'application/json' };
  if (!K.startsWith('sb_')) headers.Authorization = `Bearer ${K}`;
  if (prefer) headers.Prefer = prefer;
  const url = `${U}/rest/v1/${path}`;
  let r;
  try {
    r = await fetch(url, { method, headers, body: body && JSON.stringify(body), ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' }) });
  } catch (e) {
    // Node hides the real reason in e.cause (ENOTFOUND, ECONNREFUSED, timeout, ...)
    throw new Error(`cannot reach ${U.replace(/^https?:\/\//, '').split('/')[0]}: ${e.cause?.code || e.cause?.message || e.message}`);
  }
  if (!r.ok) throw new Error(await r.text());
  const txt = await r.text();
  return txt ? JSON.parse(txt) : null;
}
