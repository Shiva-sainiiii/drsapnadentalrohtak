import { cookies } from 'next/headers';
import { token, same } from '@/lib/auth';
export async function POST(req) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return Response.json({ error: 'ADMIN_PASSWORD is not set on the server' }, { status: 500 });
  const { password } = await req.json().catch(() => ({}));
  await new Promise((r) => setTimeout(r, 500));
  if (!password || !same(password, pw)) return Response.json({ error: 'Wrong password' }, { status: 401 });
  (await cookies()).set('adm', token(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 7 * 86400 });
  return Response.json({ ok: true });
}
export async function DELETE() {
  (await cookies()).delete('adm');
  return Response.json({ ok: true });
}
