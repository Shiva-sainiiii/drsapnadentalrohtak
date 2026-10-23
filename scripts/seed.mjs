// One-time: uploads the starter photos to Cloudinary and creates the rows in Supabase. Run: npm run seed
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const { SUPABASE_URL: U, SUPABASE_SERVICE_KEY: K, CLOUDINARY_CLOUD_NAME: N, CLOUDINARY_API_KEY: CK, CLOUDINARY_API_SECRET: CS } = process.env;
if (![U, K, N, CK, CS].every(Boolean)) { console.error('Fill SUPABASE_* and CLOUDINARY_* in .env.local first.'); process.exit(1); }
const H = { apikey: K, 'Content-Type': 'application/json', ...(K.startsWith('sb_') ? {} : { Authorization: 'Bearer ' + K }) };
const have = await (await fetch(`${U}/rest/v1/media?select=id&limit=1`, { headers: H })).json();
if (!Array.isArray(have)) { console.error('Supabase error (did you run supabase.sql?):', have); process.exit(1); }
if (have.length) { console.log('media table already has data. Nothing seeded.'); process.exit(0); }
async function up(rel) {
  const folder = 'drsapna', timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${CS}`).digest('hex');
  const f = new FormData();
  f.append('file', new Blob([fs.readFileSync(path.join('public', rel))]), path.basename(rel));
  f.append('api_key', CK); f.append('timestamp', timestamp); f.append('signature', signature); f.append('folder', folder);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${N}/image/upload`, { method: 'POST', body: f });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || 'Cloudinary upload failed');
  console.log('uploaded', rel);
  return { url: j.secure_url, public_id: j.public_id };
}
const rows = [];
const BA = ['Crowns and full mouth rehabilitation', 'Crowns and gum care', 'Scaling and gum care', 'Smile makeover with crowns', 'Front tooth restoration'];
for (let i = 0; i < BA.length; i++) { const a = await up(`images/ba/ba${i + 1}-before.jpg`), b = await up(`images/ba/ba${i + 1}-after.jpg`); rows.push({ kind: 'ba', title: BA[i], url: a.url, public_id: a.public_id, url2: b.url, public_id2: b.public_id, sort: i }); }
const G = ['Treatment under the dental microscope', 'Root canal final seating', 'Microscopic scaling procedure', 'Careful work under magnification', 'A happy young patient', 'Gentle care under the microscope'];
for (let i = 0; i < G.length; i++) { const u = await up(`images/gallery/g${i + 1}.jpg`); rows.push({ kind: 'gallery', title: G[i], ...u, sort: i }); }
for (const [slug, file] of [['dr-sapna-sharma', 'dr-sapna-sharma.jpg'], ['dr-aarushi-vij', 'dr-aarushi-vij.jpg']]) { const u = await up('images/doctors/' + file); rows.push({ kind: 'doctor', category: slug, ...u }); }
const YT = [['uL7cq1c3lwM', 'Painless teeth removal procedure', ''], ['1af4nd9dnQY', 'Operculectomy with blade: swollen gum around wisdom tooth', ''], ['g5CbYqrcz3E', 'Dental procedure by Dr. Sapna Sharma', ''], ['pfDhibswmc4', 'Operculectomy: painful swollen gum around a tooth', ''], ['xRU7bi7kcdQ', 'Popular short from Dr. Sapna Sharma', 'short']];
YT.forEach(([url, title, category], i) => rows.push({ kind: 'youtube', title, url, category, sort: i }));
const r = await fetch(`${U}/rest/v1/media`, { method: 'POST', headers: { ...H, Prefer: 'return=minimal' }, body: JSON.stringify(rows) });
console.log(r.ok ? `Done. ${rows.length} items added.` : 'Insert failed: ' + (await r.text()));
