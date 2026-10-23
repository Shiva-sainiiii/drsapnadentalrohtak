import { SITE, SERVICES } from '@/lib/site';
export default function sitemap() {
  const now = new Date();
  return [{ url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 }, ...SERVICES.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 }))];
}
