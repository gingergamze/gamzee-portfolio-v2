'use client';

import { useEffect, useState } from 'react';

// Keeps the name and role in place while scrolling: the header logo is pinned, and a
// white strip fades in behind it once the page content moves underneath.
export default function ScrollBrand() {
  const [strip, setStrip] = useState({ on: false, h: 0 });

  useEffect(() => {
    const onScroll = () => {
      const logo = document.querySelector('.nav-logo');
      setStrip({ on: window.scrollY > 40, h: logo ? Math.round(logo.getBoundingClientRect().bottom) + 12 : 100 });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="path-strip" style={{ height: strip.h, opacity: strip.on ? 1 : 0 }} />
      <style>{`
        .path-strip{position:fixed;top:0;left:0;right:0;z-index:5;pointer-events:none;box-sizing:border-box;background:#fff;border-bottom:1px solid rgba(28,25,23,.08);transition:opacity .25s ease}
        /* with no top/left set, a fixed element stays exactly where it first appears */
        .nav-logo{position:fixed;z-index:6}
        .nav-contact-wrap{margin-left:auto}
        nav:has(> .nav-logo){min-height:116px;box-sizing:border-box}
        @media (max-width:600px){nav:has(> .nav-logo){min-height:104px}}
      `}</style>
    </>
  );
}
