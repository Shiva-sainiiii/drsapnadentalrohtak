import { sb, dbOn } from './db';
import { DOCTORS, YT } from './site';
const T = ['Crowns and full mouth rehabilitation', 'Crowns and gum care', 'Scaling and gum care', 'Smile makeover with crowns', 'Front tooth restoration'];
const BA = T.map((title, i) => ({ id: 'ba' + i, kind: 'ba', title, url: `/images/ba/ba${i + 1}-before.jpg`, url2: `/images/ba/ba${i + 1}-after.jpg` }));
const G = ['Treatment under the dental microscope', 'Root canal final seating', 'Microscopic scaling procedure', 'Careful work under magnification', 'A happy young patient', 'Gentle care under the microscope'];
const GAL = G.map((title, i) => ({ id: 'g' + i, kind: 'gallery', title, url: `/images/gallery/g${i + 1}.jpg` }));
export async function getData() {
  let rows = [];
  if (dbOn) { try { rows = await sb('media?visible=eq.true&order=sort.asc,created_at.desc', { revalidate: 60 }); } catch {} }
  const by = (...k) => rows.filter((r) => k.includes(r.kind));
  const site = (slot, d) => by('site').find((r) => r.category === slot)?.url || d;
  const yt = by('youtube'), list = yt.length ? yt : YT;
  return {
    ba: by('ba').length ? by('ba') : BA,
    gallery: by('gallery', 'video').length ? by('gallery', 'video') : GAL,
    longs: list.filter((v) => v.category !== 'short').slice(0, 4), short: list.find((v) => v.category === 'short'),
    doctors: DOCTORS.map((d) => ({ ...d, img: by('doctor').find((r) => r.category === d.slug)?.url || d.img })),
    hero: site('hero-main', '/images/hero-microscope.jpg'), heroSmall: site('hero-small', '/images/doctors/dr-sapna-sharma.jpg'), about: site('about', '/images/doctors/dr-sapna-wide.jpg'), lens: site('lens', '/images/ba/ba5-before.jpg'), tour: by('pano'),
  };
}
