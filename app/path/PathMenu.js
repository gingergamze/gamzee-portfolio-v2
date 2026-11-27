'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Floating menu at the bottom of the PATH page, same look as the case study menu.
const FONT = 'var(--font-work-sans)';
const LINKEDIN = 'https://www.linkedin.com/in/gamze-serviceandproductdesignstrategist/';

export default function PathMenu() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const item = {
    fontFamily: FONT, fontSize: 'clamp(13px, 3.4vw, 14px)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
    padding: '9px clamp(14px, 3vw, 18px)', borderRadius: '999px', color: '#3D3631', background: 'transparent',
    border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center',
  };

  return (
    <nav aria-label="Page menu" style={{
      position: 'fixed', left: '50%', bottom: '16px', zIndex: 50, width: 'max-content',
      transform: `translateX(-50%) translateY(${shown ? 0 : 12}px)`,
      opacity: shown ? 1 : 0, visibility: shown ? 'visible' : 'hidden',
      transition: 'opacity .3s ease, transform .3s ease, visibility .3s',
      display: 'flex', alignItems: 'center', gap: '2px', padding: '6px', borderRadius: '999px',
      background: 'rgba(252,247,235,.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 6px 24px rgba(28,25,23,.14), inset 0 0 0 1px rgba(28,25,23,.08)',
    }}>
      <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))}
        style={{ ...item, background: 'var(--accent)', color: '#fff' }}>Contact</button>
      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={item}>LinkedIn</a>
      <Link href="/path" style={item} aria-current="page" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Path</Link>
    </nav>
  );
}
