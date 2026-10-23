import { SITE, SERVICES, DOCTORS } from '@/lib/site';
import { fallback } from '@/lib/bot';

const hits = new Map();
const SYSTEM = `You are the friendly virtual assistant on the website of ${SITE.name} in Rohtak, Haryana.
Clinic facts: address ${SITE.addr}. Phone/WhatsApp ${SITE.phone}. Email ${SITE.email}. Hours: ${SITE.hours}.
Doctors: ${DOCTORS.map((d) => `${d.name} (${d.role})`).join('; ')}. Dr. Sapna Sharma is a Periodontist and Oral Implantologist (BDS, MDS) and uses a dental microscope for precise, gentle treatment.
Treatments: ${SERVICES.map((s) => s.name).join(', ')}.
Rules: Reply in the same language as the user (English, Hindi or Hinglish). Keep answers short (2-4 sentences). Be warm and clear.
Never diagnose, prescribe medicines or give doses. For severe pain, swelling, bleeding or any emergency, tell the person to call the clinic right away.
Do not quote prices; say cost depends on the case and the doctor explains it after examination. Never promise results or guarantee outcomes.
Only answer questions about the clinic and general dental information. If you are not sure, suggest calling or WhatsApp. Encourage booking through the form on the page or WhatsApp.`;

export async function POST(req) {
  const ip = (req.headers.get('x-forwarded-for') || 'x').split(',')[0].trim(), now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  if (recent.length >= 12) return Response.json({ reply: `You are sending messages quickly. Please wait a moment, or call ${SITE.phone}.` });
  hits.set(ip, [...recent, now]);
  let msgs = [];
  try { msgs = ((await req.json()).messages || []).slice(-8).map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: String(m.text || '').slice(0, 500) }] })); } catch {}
  while (msgs[0] && msgs[0].role !== 'user') msgs.shift();
  const last = msgs.at(-1)?.parts[0].text || '';
  if (!last) return Response.json({ reply: 'Please type your question.' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ reply: fallback(last) });
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, signal: AbortSignal.timeout(15000),
      body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM }] }, contents: msgs, generationConfig: { maxOutputTokens: 800, temperature: 0.4 } }),
    });
    const j = await r.json();
    const t = j?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim();
    return Response.json({ reply: t || fallback(last) });
  } catch { return Response.json({ reply: fallback(last) }); }
}
