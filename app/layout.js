import './globals.css';
import Sprite from '@/components/Sprite';
import { SITE, SERVICES } from '@/lib/site';

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f3f8f7' };
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `Dentist in Rohtak | ${SITE.name}`, template: `%s | ${SITE.short}` },
  description: 'Microscope-assisted dental clinic in Sector 2, Rohtak. Dr. Sapna Sharma, Periodontist and Oral Implantologist. Root canal, dental implants, gum treatment, smile makeover, braces and children\'s dentistry.',
  keywords: ['dentist in Rohtak', 'dental clinic Rohtak', 'root canal treatment Rohtak', 'dental implants Rohtak', 'periodontist Rohtak', 'gum treatment Rohtak', 'teeth whitening Rohtak', 'microscopic dentistry Rohtak', 'dentist Sector 2 Rohtak', "Dr. Sapna's Advanced Dental Care"],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_IN', siteName: SITE.name, url: '/', title: `Dentist in Rohtak | ${SITE.name}`, description: 'Microscope-assisted, pain-free dentistry in Sector 2, Rohtak.', images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: SITE.name }] },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
const ld = {
  '@context': 'https://schema.org', '@type': ['Dentist', 'LocalBusiness'], '@id': `${SITE.url}/#clinic`,
  name: SITE.name, url: SITE.url, image: `${SITE.url}/images/og.jpg`, telephone: SITE.tel, email: SITE.email, medicalSpecialty: 'Dentistry',
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.zip, addressCountry: 'IN' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: SITE.days, opens: SITE.opens, closes: SITE.closes }],
  areaServed: { '@type': 'City', name: 'Rohtak' }, sameAs: [SITE.yt, SITE.ig, SITE.fb, SITE.gbp],
  founder: { '@type': 'Person', name: 'Dr. Sapna Sharma', jobTitle: 'Periodontist and Oral Implantologist', alumniOf: ['MMCDSR', 'NIMS University'], memberOf: ['Indian Society of Periodontology', 'Indian Dental Association'] },
  employee: [{ '@type': 'Person', name: 'Dr. Aarushi Vij' }],
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Dental treatments', itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: `${SITE.url}/services/${s.slug}` } })) },
};
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
