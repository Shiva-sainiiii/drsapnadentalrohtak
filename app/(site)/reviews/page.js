import Link from 'next/link';
import { SITE, REVIEWS } from '@/lib/site';
import { getAllReviews } from '@/lib/data';
import Icon from '@/components/Icon';

export const revalidate = 60;
const description = `Read what patients say about ${SITE.name} in Sector 2, Rohtak.`;
export const metadata = { title: 'Patient reviews', description, alternates: { canonical: '/reviews' }, openGraph: { title: 'Patient reviews', description, url: '/reviews', type: 'website' } };
const Stars = ({ n = 5 }) => <span className="sr">{[1, 2, 3, 4, 5].map((i) => <Icon key={i} n="st" c={i <= n ? '' : 'e'} />)}</span>;

export default async function Reviews() {
  const rows = await getAllReviews();
  // Approved feedback pehle, phir default reviews (home page jaisa hi order)
  const all = [...rows.map((r) => ({ k: r.id, t: r.comment, n: String(r.name || '').trim(), s: Math.min(5, Math.max(1, +r.rating || 5)) })), ...REVIEWS.map((t) => ({ k: t, t, n: '', s: 5 }))];
  return (
    <main className="w sv">
      <p className="crumb"><Link href="/">Home</Link> / Reviews</p>
      <h1>Patient reviews</h1>
      <p className="lead">What patients say about care at {SITE.short}, Rohtak.</p>
      <div className="ra">{all.map((r) => <div key={r.k} className="rc"><Stars n={r.s} /><p className="sf">{r.t}</p><small>{r.n ? `${r.n} · Patient review` : 'Patient review'}</small></div>)}</div>
      <div className="cta" style={{ marginBottom: 60 }}>
        <Link className="btn" href="/#reviews">Share your feedback</Link>
        <Link className="btn o" href="/#contact">Book a visit <Icon n="ar" /></Link>
      </div>
    </main>
  );
}
