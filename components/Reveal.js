'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function Reveal() {
  const path = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver((a) => a.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('v'); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.r:not(.v)').forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
