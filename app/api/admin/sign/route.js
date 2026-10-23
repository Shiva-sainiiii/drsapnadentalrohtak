import { isAdmin } from '@/lib/auth';
import { cfg, sig } from '@/lib/cloud';
export async function POST() {
  if (!(await isAdmin())) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const { n, k, s } = cfg();
  if (!n || !k || !s) return Response.json({ error: 'Cloudinary keys are missing on the server' }, { status: 500 });
  const p = { folder: 'drsapna', timestamp: Math.floor(Date.now() / 1000) };
  return Response.json({ ...p, signature: sig(p), api_key: k, cloud_name: n });
}
