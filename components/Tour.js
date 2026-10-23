'use client';
import { useEffect, useRef, useState } from 'react';
import '@photo-sphere-viewer/core/index.css';
import { cld } from '@/lib/img';
export default function Tour({ scenes }) {
  const [i, setI] = useState(0), el = useRef(null), v = useRef(null);
  useEffect(() => {
    let dead = false;
    (async () => {
      const { Viewer } = await import('@photo-sphere-viewer/core');
      if (dead || !el.current) return;
      v.current = new Viewer({ container: el.current, panorama: cld(scenes[0].url, 4096), navbar: ['zoom', 'move', 'fullscreen'], touchmoveTwoFingers: false, loadingTxt: 'Loading 360° view...' });
    })();
    return () => { dead = true; v.current?.destroy(); v.current = null; };
  }, []); // eslint-disable-line
  const go = (k) => { setI(k); v.current?.setPanorama(cld(scenes[k].url, 4096)); };
  return (
    <div className="r">
      <div className="tv" ref={el} role="img" aria-label="360 degree view of the clinic. Drag to look around." />
      {scenes.length > 1 && <div className="bt">{scenes.map((s, k) => <button key={s.id} className={k === i ? 'on' : ''} onClick={() => go(k)}>{s.title || `Scene ${k + 1}`}</button>)}</div>}
    </div>
  );
}
