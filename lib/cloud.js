import crypto from 'node:crypto';
export const cfg = () => ({ n: process.env.CLOUDINARY_CLOUD_NAME, k: process.env.CLOUDINARY_API_KEY, s: process.env.CLOUDINARY_API_SECRET });
export const sig = (p) => crypto.createHash('sha1').update(Object.keys(p).sort().map((k) => `${k}=${p[k]}`).join('&') + cfg().s).digest('hex');
export async function destroy(id, type = 'image') {
  if (!id) return;
  const { n, k } = cfg(), p = { public_id: id, timestamp: Math.floor(Date.now() / 1000) };
  await fetch(`https://api.cloudinary.com/v1_1/${n}/${type}/destroy`, { method: 'POST', body: new URLSearchParams({ ...p, api_key: k, signature: sig(p) }) }).catch(() => {});
}
