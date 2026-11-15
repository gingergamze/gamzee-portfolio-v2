'use client';

import { useEffect, useRef, useState } from 'react';

// Background video of the landing page hero: two short office clips that fade into each other.
// Both are free-to-use stock clips from Pexels (no credit needed):
//   woman-pointing.mp4    https://www.pexels.com/video/a-woman-pointing-her-finger-on-the-laptop-screen-15288943/
//   colleagues-behind.mp4 https://www.pexels.com/video/back-view-of-women-working-together-on-a-laptop-15288936/
// People who prefer reduced motion get the still picture of the first clip, and nothing is played.

const CLIPS = [
  { src: '/hero/woman-pointing.mp4', poster: '/hero/woman-pointing.jpg' },
  { src: '/hero/colleagues-behind.mp4', poster: '/hero/colleagues-behind.jpg' },
];
const SHOW_MS = 7000;
const DIM = 0.42; // how dark the layer over the video is, so the white text stays readable

export default function HeroVideo({ off = false }) {
  const box = useRef(null);
  const vids = [useRef(null), useRef(null)];
  const [front, setFront] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    // Not shown (reduced motion, or the cards have covered the hero): nothing plays
    if (still || off) { vids.forEach((r) => r.current && r.current.pause()); return; }
    let cur = 0, timer, visible = true;
    const play = (i) => { const v = vids[i].current; if (!v) return; v.currentTime = 0; v.play().catch(() => {}); };
    play(0);
    const tick = () => {
      if (!visible) return;
      cur = 1 - cur;
      play(cur);
      setTimeout(() => setFront(cur), 300);
    };
    timer = setInterval(tick, SHOW_MS);
    // Save battery: pause while the hero is off screen
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      vids.forEach((r, i) => { const v = r.current; if (!v) return; if (visible) { if (i === cur) v.play().catch(() => {}); } else v.pause(); });
    }, { threshold: 0.05 });
    if (box.current) io.observe(box.current);
    return () => { clearInterval(timer); io.disconnect(); };
  }, [still, off]); // eslint-disable-line

  return (
    <div ref={box} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#0E1320', opacity: off ? 0 : 1, transition: 'none' }}>
      {CLIPS.map((c, i) => (
        <video key={c.src} ref={vids[i]} muted loop playsInline preload={i === 0 ? 'auto' : 'metadata'} poster={c.poster}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: front === i ? 1 : 0, transition: 'opacity 0.9s ease' }}>
          {!still && <source src={c.src} type="video/mp4" />}
        </video>
      ))}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,${DIM + 0.1}), rgba(0,0,0,${DIM}))` }} />
    </div>
  );
}
