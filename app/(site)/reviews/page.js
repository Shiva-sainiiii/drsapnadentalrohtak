import { Fragment } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { getReviews } from '@/lib/data';
import Icon from '@/components/Icon';
import { ReviewGrid } from '@/components/Reviews';

const PER = 9; // ek page pe kitne reviews
const href = (p) => (p > 1 ? `/reviews?page=${p}` : '/reviews');
const pageOf = async (sp, n) => Math.min(Math.max(1, parseInt((await sp).page, 10) || 1), n);
const pagesOf = (all) => Math.max(1, Math.ceil(all.length / PER));

export async function generateMetadata({ searchParams }) {
  const all = await getReviews(), p = await pageOf(searchParams, pagesOf(all));
  const description = `What patients say about ${SITE.name} in Sector 2, Rohtak.`;
  return { title: p > 1 ? `Patient Reviews (Page ${p})` : 'Patient Reviews', description, alternates: { canonical: href(p) }, openGraph: { title: 'Patient Reviews', description, url: href(p), type: 'website' } };
}

export default async function Reviews({ searchParams }) {
  const all = await getReviews(), n = pagesOf(all), p = await pageOf(searchParams, n);
  const items = all.slice((p - 1) * PER, p * PER);
  // 1, last aur current ke aas-paas ke page numbers; beech me gap ho to "…"
  const nums = [...new Set([1, n, p - 1, p, p + 1].filter((x) => x >= 1 && x <= n))].sort((a, b) => a - b);
  return (
    <main className="w sv">
      <p className="crumb"><Link href="/">Home</Link> / Reviews</p>
      <h1>Patient reviews</h1>
      <p className="lead">What patients say about their visits to {SITE.name} in Rohtak.</p>
      <div className="rvw" style={{ marginBottom: 0 }}><ReviewGrid items={items} /></div>
      {n > 1 && (
        <div className="pg" role="navigation" aria-label="Reviews pages">
          {p > 1 ? <Link href={href(p - 1)} rel="prev">Previous</Link> : <span className="off">Previous</span>}
          {nums.map((x, i) => (
            <Fragment key={x}>
              {i > 0 && x - nums[i - 1] > 1 && <span className="dt" aria-hidden="true">…</span>}
              {x === p ? <span className="on" aria-current="page">{x}</span> : <Link href={href(x)} aria-label={`Page ${x}`}>{x}</Link>}
            </Fragment>
          ))}
          {p < n ? <Link href={href(p + 1)} rel="next">Next</Link> : <span className="off">Next</span>}
        </div>
      )}
      <div className="cta" style={{ margin: '48px 0 90px' }}>
        <Link href="/#feedback" className="btn">Share your experience <Icon n="ar" /></Link>
        <Link href="/" className="btn o">Back to home</Link>
      </div>
    </main>
  );
}
