import crypto from 'node:crypto';
import { cookies } from 'next/headers';
const sec = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
const sign = (v) => crypto.createHmac('sha256', sec()).update(v).digest('hex');
export const token = () => { const e = String(Date.now() + 7 * 864e5); return `${e}.${sign(e)}`; };
export const same = (a, b) => crypto.timingSafeEqual(crypto.createHash('sha256').update(String(a)).digest(), crypto.createHash('sha256').update(String(b)).digest());
export async function isAdmin() {
  const c = (await cookies()).get('adm')?.value;
  if (!c || !sec()) return false;
  const [e, s] = c.split('.');
  if (!s || Date.now() > +e) return false;
  const x = sign(e);
  return s.length === x.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(x));
}
