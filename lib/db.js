const U = process.env.SUPABASE_URL, K = process.env.SUPABASE_SERVICE_KEY;
export const dbOn = !!(U && K);
export async function sb(path, { method = 'GET', body, prefer, revalidate } = {}) {
  const headers = { apikey: K, 'Content-Type': 'application/json' };
  if (!K.startsWith('sb_')) headers.Authorization = `Bearer ${K}`;
  if (prefer) headers.Prefer = prefer;
  const r = await fetch(`${U}/rest/v1/${path}`, { method, headers, body: body && JSON.stringify(body), ...(revalidate ? { next: { revalidate } } : { cache: 'no-store' }) });
  if (!r.ok) throw new Error(await r.text());
  return r.status === 204 ? null : r.json();
}
