'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BrandLockup from '../BrandLockup';

// Name and role stay visible after scrolling down, on a white strip behind the floating menu.
export default function ScrollBrand() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // same point at which the floating menu appears
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="path-brand" aria-hidden={!shown} style={{ opacity: shown ? 1 : 0, visibility: shown ? 'visible' : 'hidden', transform: `translateY(${shown ? 0 : -12}px)` }}>
        <Link href="/" aria-label="Gamze Bozkurt, Product Lead" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <BrandLockup />
        </Link>
      </div>
      <style>{`
        .path-brand{position:fixed;top:0;left:0;right:0;z-index:45;box-sizing:border-box;padding:12px var(--cs-x,24px);background:#fff;border-bottom:1px solid rgba(28,25,23,.08);transition:opacity .3s ease,transform .3s ease,visibility .3s}
        @media (max-width:600px){.path-brand{padding:10px 24px}.path-brand a>div{zoom:.95 !important}}
        @media (min-width:601px) and (max-width:899px){.path-brand a>div{zoom:1 !important}}
        /* tablets: the menu moves to the right so it does not cover the name */
        @media (min-width:601px) and (max-width:899px){nav[aria-label="Case study navigation"]{left:calc(100% - 12px) !important;translate:-50% 0;width:max-content !important}}
        @media (prefers-reduced-motion:reduce){.path-brand{transition:none}}
      `}</style>
    </>
  );
}
