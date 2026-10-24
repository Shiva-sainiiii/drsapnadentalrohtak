import { SITE } from '@/lib/site';
const OFF = ['/admin', '/api/'];
// AI search / assistant crawlers ko saaf allow (Google-Extended sirf Gemini training/grounding control karta hai; AI Mode Googlebot se chalta hai)
const AI = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User'];
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: OFF }, { userAgent: AI, allow: '/', disallow: OFF }], sitemap: `${SITE.url}/sitemap.xml` };
}
