'use client';
import { useEffect, useRef, useState } from 'react';
export default function LensView({ src, alt }) {
  const box = useRef(null), lens = useRef(null), [ar, setAr] = useState('2/1');
  useEffect(() => {
    const el = box.current, L = lens.current;
    let raf, t = 0, x = 0.5, y = 0.5, tx = 0.5, ty = 0.5, user = false;
    const apply = () => {
      const r = el.getBoundingClientRect(), z = 2.2, px = x * r.width, py = y * r.height;
      L.style.transform = `translate(${px}px,${py}px) translate(-50%,-50%)`;
      L.style.backgroundSize = `${r.width * z}px ${r.height * z}px`;
      L.style.backgroundPosition = `${-(px * z - L.offsetWidth / 2)}px ${-(py * z - L.offsetHeight / 2)}px`;
    };
    const loop = () => {
      if (!user) { t += 0.006; tx = 0.5 + 0.3 * Math.sin(t * 1.3); ty = 0.5 + 0.22 * Math.sin(t * 1.9 + 1); }
      x += (tx - x) * 0.12; y += (ty - y) * 0.12; apply(); raf = requestAnimationFrame(loop);
    };
    const move = (e) => { const r = el.getBoundingClientRect(); user = true; tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)); ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)); };
    const leave = () => { user = false; };
    el.addEventListener('pointermove', move); el.addEventListener('pointerdown', move); el.addEventListener('pointerleave', leave);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) apply(); else raf = requestAnimationFrame(loop);
    addEventListener('resize', apply);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointermove', move); el.removeEventListener('pointerdown', move); el.removeEventListener('pointerleave', leave); removeEventListener('resize', apply); };
  }, [ar]);
  return (
    <div className="lv" ref={box} style={{ '--ar': ar }}>
      <img src={src} alt={alt} loading="lazy" onLoad={(e) => setAr(`${e.target.naturalWidth}/${e.target.naturalHeight}`)} />
      <span className="lvt">Standard view</span>
      <div className="lvl" ref={lens} style={{ backgroundImage: `url(${src})` }}><span className="lvc">Microscope view</span></div>
      <span className="lvh">Drag the lens (illustration)</span>
    </div>
  );
}
