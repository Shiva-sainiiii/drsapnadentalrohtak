import './globals.css';
import Sprite from '@/components/Sprite';
import { SITE, SERVICES, AREAS, META, og } from '@/lib/site';

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f3f8f7' };
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: META.title, template: `%s | ${SITE.short}` },
  description: META.description,
  keywords: ['advanced microscopic dental care Rohtak', 'microscopic dentist Rohtak', 'dental microscope Rohtak', 'dentist in Rohtak', 'best dentist in Rohtak', 'dant ka doctor Rohtak', 'dental clinic Rohtak', 'root canal treatment Rohtak', 'root canal price in Rohtak', 'dental implants Rohtak', 'periodontist Rohtak', 'gum treatment Rohtak', 'teeth whitening Rohtak', 'microscopic dentistry Rohtak', 'dentist Sector 2 Rohtak', "Dr. Sapna's Advanced Dental Care"],
  openGraph: og(META.title, META.description), // canonical + og:url har page apne metadata me deta hai (root pe canonical '/' rakhne se galti se baaki pages pe inherit hota)
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
// Ek hi NAP (SITE) se: Dentist + LocalBusiness + WebSite. Baaki pages isi ko @id se refer karte hain
const clinic = {
  '@type': ['Dentist', 'LocalBusiness'], '@id': `${SITE.url}/#clinic`,
  name: SITE.name, alternateName: SITE.alt, url: SITE.url, image: `${SITE.url}/images/og.jpg`, telephone: SITE.tel, email: SITE.email, medicalSpecialty: 'Dentistry', knowsLanguage: ['en-IN', 'hi-IN'], foundingDate: SITE.opened,
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.zip, addressCountry: 'IN' },
  ...(SITE.geo && { geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng } }),
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(SITE.map)}`,
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: SITE.days, opens: SITE.opens, closes: SITE.closes }],
  areaServed: [{ '@type': 'City', name: SITE.city }, ...AREAS.map((a) => ({ '@type': 'Place', name: `${a}, ${SITE.city}` }))], sameAs: [SITE.yt, SITE.ig, SITE.fb, SITE.gbp],
  founder: { '@type': 'Person', '@id': `${SITE.url}/#dr-sapna-sharma`, name: 'Dr. Sapna Sharma', jobTitle: 'Periodontist and Oral Implantologist', url: `${SITE.url}/about`, alumniOf: ['MMCDSR', 'NIMS University'], memberOf: ['Indian Society of Periodontology', 'Indian Dental Association'] },
  employee: [{ '@type': 'Person', name: 'Dr. Aarushi Vij' }],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Dental treatments', itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${SITE.url}/services/${s.slug}` } })) },
};
const ld = { '@context': 'https://schema.org', '@graph': [clinic, { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, inLanguage: 'en-IN', publisher: { '@id': `${SITE.url}/#clinic` } }] };
export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body><Sprite />{children}</body>
    </html>
  );
}
