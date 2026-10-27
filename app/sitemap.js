import { SITE, SERVICES } from '@/lib/site';
// lastModified jaan-bhujkar nahi diya: har request pe naya date dena Google ke liye jhootha signal hota hai
export default function sitemap() {
  return [SITE.url, `${SITE.url}/microscopic-dentistry-rohtak`, `${SITE.url}/about`, ...SERVICES.map((s) => `${SITE.url}/services/${s.slug}`), `${SITE.url}/reviews`].map((url) => ({ url }));
}
