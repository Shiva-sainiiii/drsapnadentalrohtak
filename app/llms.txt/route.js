import { SITE, SERVICES, AREAS, MICRO } from '@/lib/site';
export const dynamic = 'force-static';
// /llms.txt: AI assistants (ChatGPT, Perplexity, Claude, Gemini) ke liye clinic ka short, sahi summary. NAP SITE se hi aata hai
export function GET() {
  const t = `# ${SITE.name}

> ${MICRO.short} Dental clinic in Sector 2, Rohtak, Haryana, led by Dr. Sapna Sharma, Periodontist and Oral Implantologist.

## Clinic facts
- Name: ${SITE.name} (also known as ${SITE.alt.join(', ')})
- Address: ${SITE.addr}, India
- Phone / WhatsApp: ${SITE.phone}
- Email: ${SITE.email}
- Hours: ${SITE.hours}
- Languages: English, Hindi
- Dentist: Dr. Sapna Sharma, BDS, MDS (Periodontics and Oral Implantology). Team: Dr. Aarushi Vij, Dentist
- Areas served in Rohtak: ${AREAS.join(', ')}
- Appointments are recommended. Treatment suitability and cost are decided after examination.

## Main pages
- [Home](${SITE.url}): Overview, doctors, results, videos, FAQs and contact
- [Microscopic dentistry in Rohtak](${SITE.url}/microscopic-dentistry-rohtak): How treatment under a dental microscope works
- [Patient reviews](${SITE.url}/reviews): Reviews shared by patients

## Treatments in Rohtak
${SERVICES.map((s) => `- [${s.name}](${SITE.url}/services/${s.slug}): ${s.short}`).join('\n')}

## Find and contact us
- Google Maps: https://www.google.com/maps?q=${encodeURIComponent(SITE.map)}
- YouTube: ${SITE.yt}
- Instagram: ${SITE.ig}
`;
  return new Response(t, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
