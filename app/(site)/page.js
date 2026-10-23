import Link from 'next/link';
import { SITE, SERVICES, FAQS, REVIEWS, ABOUT, MICRO } from '@/lib/site';
import { getData } from '@/lib/data';
import { cld } from '@/lib/img';
import Icon from '@/components/Icon';
import BeforeAfter from '@/components/BeforeAfter';
import Gallery from '@/components/Gallery';
import YouTubeGrid from '@/components/YouTubeGrid';
import Logo from '@/components/Logo';
import LensView from '@/components/LensView';
import Tour from '@/components/Tour';
import { FeedbackForm, ContactForm } from '@/components/Forms';

export const revalidate = 60;
const TILES = [['full-mouth-rehabilitation-rohtak', 's2', '/images/ba/ba1-after.jpg'], ['root-canal-treatment-rohtak', '', '/images/gallery/g2.jpg'], ['gum-treatment-rohtak', '', '/images/gallery/g3.jpg'], ['childrens-dentist-rohtak', '', '/images/gallery/g5.jpg'], ['smile-makeover-rohtak', 's2', '/images/ba/ba5-after.jpg'], ['dental-implants-rohtak', '', '/images/gallery/g1.jpg']];
const MQ = ['Advanced Microscopic Dental Care', 'Microscope-assisted precision', 'Pain-free comfort', 'Periodontist and implantologist', 'Air polishing', 'Women-owned and LGBTQ+ friendly'];
const USP = [['sh', 'Microscope-assisted precision', 'Clear structural detail for every procedure.'], ['sm', 'Pain-free approach', 'A light-handed technique designed for comfort.'], ['tooth', 'Expert-led care', 'Overseen by a certified Periodontist and Oral Implantologist.'], ['sp', 'Welcoming to everyone', 'Women-owned and LGBTQ+ friendly.']];
const Stars = () => <span className="sr">{[1, 2, 3, 4, 5].map((i) => <Icon key={i} n="st" />)}</span>;

export default async function Home() {
  const d = await getData();
  const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const mapQ = encodeURIComponent(SITE.map);
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <section id="top" className="w hero">
        <div>
          <div className="tag r"><Logo />Rohtak&apos;s microscope-assisted dental clinic</div>
          <h1>{[['Advanced', 1], ['Microscopic', 1], ['Dental', 0], ['Care', 0], ['in Rohtak.', 0]].map(([w, h], i) => <span key={w}><span className={'fx' + (h ? ' hm' : '')} style={{ '--d': i }}>{w}</span>{' '}</span>)}</h1>
          <p className="lead r" style={{ '--i': 2 }}>Precision redefined. Pain-free dentistry. Gentle, meticulous care by Dr. Sapna Sharma, Periodontist and Oral Implantologist, using a high-magnification dental microscope.</p>
          <div className="cta r" style={{ '--i': 3 }}>
            <Link href="/#contact" className="btn">Book appointment <Icon n="ar" /></Link>
            <a href={`tel:${SITE.tel}`} className="btn o"><Icon n="ph" />{SITE.phone}</a>
          </div>
          <div className="rt r" style={{ '--i': 4 }}><Stars /><span><b>5.0</b> rating across the web</span></div>
        </div>
        <div className="lens r" style={{ '--i': 2 }}>
          <svg viewBox="0 0 400 400" aria-hidden="true">
            <g className="rg"><circle cx="200" cy="200" r="192" fill="none" stroke="var(--ln)" strokeWidth="1.5" /><circle cx="200" cy="200" r="192" fill="none" stroke="var(--ac)" strokeWidth="3" strokeDasharray="2 17" strokeLinecap="round" /></g>
            <g className="rg2"><circle cx="200" cy="200" r="172" fill="none" stroke="var(--ac)" strokeOpacity=".55" strokeWidth="2" strokeDasharray="46 300" strokeLinecap="round" /></g>
            <path d="M200 14v30M200 356v30M14 200h30M356 200h30" stroke="var(--ac)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="im lc"><img src={cld(d.hero, 800)} alt="Dr. Sapna Sharma working under a dental microscope in Rohtak" width="640" height="640" fetchPriority="high" /></div>
          <div className="im ls"><img src={cld(d.heroSmall, 400)} alt="Dr. Sapna Sharma, Periodontist and Oral Implantologist" width="400" height="400" loading="lazy" /></div>
          <div className="sk">Under the microscope<small>Every detail in focus</small></div>
        </div>
      </section>

      <div className="mqw"><div className="mq" aria-hidden="true"><div>{[...MQ, ...MQ].map((t, i) => <span key={i}>{t}</span>)}</div></div></div>

      <section id="microscope" className="sec w" style={{ paddingTop: 0 }}><div className="mic r">
        <LensView src={cld(d.lens, 1100)} alt="Close-up of teeth viewed under magnification" />
        <div>
          <div className="tag"><Logo />What makes us different</div>
          <h2 style={{ marginTop: 18 }}>Advanced Microscopic Dental Care</h2>
          <p style={{ marginTop: 14 }}>{MICRO.intro}</p>
          <ul className="pl">{MICRO.pts.map((p) => <li key={p}><Icon n="ck" />{p}</li>)}</ul>
          <div className="cta"><Link className="btn" href="/microscopic-dentistry-rohtak">How it works <Icon n="ar" /></Link><Link className="btn o" href="/#videos">Watch it in action</Link></div>
        </div>
      </div></section>

      <section id="services" className="sec w">
        <h2 className="r">Dental treatments in Rohtak, seen in detail.</h2>
        <p className="r" style={{ marginTop: 14, maxWidth: '60ch' }}>Every treatment is planned and carried out with microscope-level care. Tap a treatment to learn more.</p>
        <div className="bn">{TILES.map(([slug, cls, img], i) => { const s = SERVICES.find((x) => x.slug === slug); return (
          <Link key={slug} href={`/services/${slug}`} className={`tl ph ${cls} r`} style={{ '--i': i % 3 }}>
            <img src={img} alt={`${s.name} at ${SITE.short}, Rohtak`} loading="lazy" />
            <span className="shade" />
            <div className="pc"><span className="ic"><Icon n={s.icon} /></span><h3>{s.name}</h3><p>{s.short}</p><span className="go">Learn more <Icon n="ar" /></span></div>
          </Link>
        ); })}</div>
        <div className="chips r">{SERVICES.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}>{s.name}</Link>)}</div>
      </section>

      <section id="about" className="sec w" style={{ paddingTop: 0 }}><div className="ab">
        <div className="r"><h2>Led by Dr. Sapna Sharma</h2>
          {ABOUT.map((t, i) => <p key={i} style={{ marginTop: 14 }}>{t}</p>)}
          <div className="cta"><a className="btn" href={SITE.yt} target="_blank" rel="noopener"><Icon n="yt" />Watch on YouTube</a><a className="btn o" href={SITE.ig} target="_blank" rel="noopener"><Icon n="ig" />Instagram</a></div></div>
        <div className="r" style={{ '--i': 1 }}>
          <div className="im abi"><img src={cld(d.about, 900)} alt="Dr. Sapna Sharma at her clinic in Rohtak" width="900" height="562" loading="lazy" /></div>
          <ul>{USP.map(([ic, h, t]) => <li key={h}><Icon n={ic} /><span><b>{h}</b>{t}</span></li>)}</ul>
        </div>
      </div></section>

      <section id="doctors" className="sec w" style={{ paddingTop: 0 }}>
        <h2 className="r">Meet the doctors</h2>
        <div className="dg">{d.doctors.map((x, i) => (
          <div key={x.slug} className="r" style={{ '--i': i }}>
            <div className="im"><img src={cld(x.img, 500)} alt={`${x.name}, ${x.role}`} width="500" height="500" loading="lazy" /></div>
            <h3>{x.name}</h3><small>{x.role}</small>{x.creds && <span className="cr">{x.creds}</span>}<p>{x.bio}</p>
          </div>
        ))}</div>
      </section>

      <section id="results" className="sec w" style={{ paddingTop: 0 }}>
        <div className="hd2 r"><div><h2>Real smiles, real results.</h2><p>Drag the slider to compare before and after.</p></div></div>
        <BeforeAfter items={d.ba} />
        <p className="note">Results vary from patient to patient. Treatment suitability is decided after examination.</p>
      </section>

      <section id="videos" className="sec w" style={{ paddingTop: 0 }}>
        <div className="hd2 r"><div><h2>Watch Dr. Sapna explain it.</h2><p>Procedures and dental advice from our YouTube channel.</p></div><a className="btn o" href={SITE.yt} target="_blank" rel="noopener"><Icon n="yt" />Visit channel</a></div>
        <YouTubeGrid longs={d.longs} short={d.short} />
      </section>

      <section id="gallery" className="sec" style={{ paddingTop: 0 }}>
        <div className="w hd2 r"><div><h2>Inside the clinic</h2><p>Microscope-assisted treatment, up close. Hover to pause, tap to enlarge.</p></div></div>
        <Gallery items={d.gallery} />
      </section>

      {(SITE.tourEmbed || d.tour.length > 0) && (
        <section id="tour" className="sec w" style={{ paddingTop: 0 }}>
          <div className="hd2 r"><div><h2>Take a 360° tour of the clinic</h2><p>Drag to look around.</p></div></div>
          {SITE.tourEmbed ? <iframe className="tv" src={SITE.tourEmbed} title="360 degree virtual tour of the clinic" loading="lazy" allowFullScreen /> : <Tour scenes={d.tour} />}
        </section>
      )}

      <section id="faq" className="sec w" style={{ paddingTop: 0 }}><div className="fq">
        <div className="r"><h2>Questions patients often ask</h2></div>
        <div className="r" style={{ '--i': 1 }}>{FAQS.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div></section>

      <section id="reviews" className="sec w" style={{ paddingTop: 0 }}>
        <h2 className="r">Patients notice the difference.</h2>
        <div id="rl">{REVIEWS.map((t) => <div key={t} className="rc"><Stars /><p className="sf">{t}</p><small>Patient review</small></div>)}</div>
        <div className="dkp r"><div><h2>How was your visit?</h2><p>Tap a star and tell us about it. It takes ten seconds.</p></div><div><FeedbackForm /></div></div>
      </section>

      <section id="contact" className="w"><div className="cpn r">
        <div><h2>Book your visit</h2><p style={{ marginTop: 14 }}>Appointments are recommended. Send a request and we will confirm your slot.</p>
          <div className="ci">
            <a href={`tel:${SITE.tel}`}><Icon n="ph" /><span><b>Call us</b>{SITE.phone}</span></a>
            <a href={`https://wa.me/${SITE.wa}`} target="_blank" rel="noopener"><Icon n="wa" /><span><b>WhatsApp</b>Chat with the clinic</span></a>
            <a href={`mailto:${SITE.email}`}><Icon n="ml" /><span><b>Email</b>{SITE.email}</span></a>
            <div><Icon n="ck" /><span><b>Opening hours</b>{SITE.hours}</span></div>
          </div></div>
        <div className="fc"><ContactForm /></div>
      </div></section>

      <section id="map" className="w" style={{ paddingTop: 'clamp(60px,8vw,100px)' }}><div className="mp r">
        <iframe title="Clinic location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${mapQ}&output=embed`} />
        <div className="mc"><b>{SITE.name}</b><p>{SITE.addr}</p><a className="btn" target="_blank" rel="noopener" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`}><Icon n="pin" />Get directions</a></div>
      </div></section>
    </main>
  );
}
