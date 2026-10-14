'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Floating light-pill menu for case study pages: Home, previous work,
// next work, Contact. Appears after scrolling past the top.
const FONT = 'var(--font-work-sans)';

export default function CaseStudyMenu({ prev, next }) {
  const [shown, setShown] = useState(false);
  // On phones the back button occupies the top-left, so the pill moves to the bottom.
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    const mq = window.matchMedia('(max-width: 600px)');
    const onMq = () => setMobile(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); mq.removeEventListener('change', onMq); };
  }, []);

  const item = {
    fontFamily: FONT, fontSize: 'clamp(13px, 3.4vw, 14px)', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
    padding: '9px clamp(10px, 3vw, 16px)', borderRadius: '999px', color: '#3D3631', background: 'transparent',
    border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
  };

  return (
    <>
      <nav aria-label="Case study navigation" style={{
        position: 'fixed', left: '50%', zIndex: 50,
        ...(mobile ? { bottom: '16px' } : { top: '16px' }),
        transform: `translateX(-50%) translateY(${shown ? 0 : mobile ? 12 : -12}px)`,
        opacity: shown ? 1 : 0, pointerEvents: shown ? 'auto' : 'none',
        transition: 'opacity .3s ease, transform .3s ease',
        display: 'flex', alignItems: 'center', gap: '2px', padding: '6px', borderRadius: '999px',
        maxWidth: 'calc(100vw - 24px)', overflowX: 'auto', scrollbarWidth: 'none',
        background: 'rgba(252,247,235,.92)', backdropFilter: 'blur(12px)',
        boxShadow: '0 6px 24px rgba(28,25,23,.14), inset 0 0 0 1px rgba(28,25,23,.08)',
      }}>
        <Link href="/" style={item}>Home</Link>
        <Link href={prev.href} style={item}>Previous work</Link>
        <Link href={next.href} style={item}>Next work</Link>
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))}
          style={{ ...item, background: '#d04d03', color: '#fff' }}>Contact</button>
      </nav>
    </>
  );
}
