import Icon from './Icon';
// Home page aur /reviews dono yahi use karte hain (server component, koi hook nahi)
export const Stars = ({ n = 5 }) => <span className="sr">{[1, 2, 3, 4, 5].map((i) => <Icon key={i} n="st" c={i <= n ? '' : 'e'} />)}</span>;
export function ReviewGrid({ items }) {
  return <div className="rl">{items.map((r) => <div key={r.k} className="rc"><Stars n={r.s} /><p className="sf">{r.t}</p><small>{r.n ? `${r.n} · Patient review` : 'Patient review'}</small></div>)}</div>;
}
