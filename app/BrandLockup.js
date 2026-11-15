'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

// Header wordmark: stacked "Gamze / Bozkurt" with spaced caps "Product Lead" in sage green.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['700', '800'], display: 'swap' });

export default function BrandLockup({ dark }) {
  const role = dark ? '#C8D4C0' : '#5E7A5A';
  const ink = dark ? '#FFFFFF' : '#1C1917';
  const family = jakarta.style.fontFamily;
  return (
    <div style={{ zoom: 1.25 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, lineHeight: 1, textDecoration: 'none' }}>
        <span style={{ fontFamily: family, fontWeight: 800, fontSize: 22, letterSpacing: '-0.04em', lineHeight: 0.96, color: ink }}>Gamze<br />Bozkurt</span>
        <span style={{ fontFamily: family, fontWeight: 700, fontSize: 9.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: role, marginLeft: 0.8 }}>Product Lead</span>
      </div>
    </div>
  );
}
