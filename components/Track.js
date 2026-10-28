'use client';
import { useEffect } from 'react';
import Script from 'next/script';

// FLOW "Win": call / WhatsApp / directions / form = asli business conversions. Inhe measure karo, sirf traffic nahi.
// GA4 tabhi load hota hai jab Vercel env me NEXT_PUBLIC_GA_ID (G-XXXXXXX) set ho. Na ho to kuch load nahi hota, site waisi hi rahegi.
const GA = process.env.NEXT_PUBLIC_GA_ID;
const send = (name, params) => {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...params });
  } catch (e) {}
};

export default function Track() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const h = a.getAttribute('href') || '';
      const page = location.pathname;
      if (h.startsWith('tel:')) send('click_call', { page });
      else if (h.includes('wa.me')) send('click_whatsapp', { page });
      else if (h.includes('google.com/maps')) send('click_directions', { page });
      else if (h.startsWith('mailto:')) send('click_email', { page });
    };
    const onSubmit = (e) => send('generate_lead', { page: location.pathname, form: (e.target && e.target.id) || 'form' });
    document.addEventListener('click', onClick, true);
    document.addEventListener('submit', onSubmit, true);
    return () => { document.removeEventListener('click', onClick, true); document.removeEventListener('submit', onSubmit, true); };
  }, []);
  if (!GA) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA}');`}</Script>
    </>
  );
}
