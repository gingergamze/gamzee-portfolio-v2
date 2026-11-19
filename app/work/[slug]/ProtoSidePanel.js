'use client';

import { useState } from 'react';

// Full-height side window on the left of the clickable prototype: what the viewer sees,
// for which users and for what goal.
const ITEMS = [
  { t: 'Product', d: 'Collaboration tool where ASML teams make and record decisions about production risks' },
  { t: 'Where is it used?', d: 'Internal use only, across the manufacturing stages from design to order' },
  { t: 'Who are the users?', d: 'Manufacturing Engineers, Function Architects and Supply Procurement Managers' },
  { t: 'What do users do with it?', d: 'Reduce production risks and costs' },
];
const F = 'var(--font-work-sans)';
const BLUE = '#0F238C';

// width in px, look of the panel
const VARIANTS = [
  { w: 420, look: 'header', name: 'Wide 420, blue header' },
  { w: 500, look: 'header', name: 'Wider 500, blue header' },
  { w: 580, look: 'header', name: 'Widest 580, blue header' },
  { w: 500, look: 'plain', name: '500, plain white, big titles' },
  { w: 500, look: 'blue', name: '500, solid blue' },
  { w: 500, look: 'glass', name: '500, dark glass' },
  { w: 500, look: 'steps', name: '500, numbered rows' },
  { w: 500, look: 'accent', name: '500, soft grey, orange bar' },
  { w: 620, look: 'columns', name: '620, title left, text right' },
  { w: 660, look: 'big', name: '660, big text' },
];

const Close = ({ onClick, dark }) => (
  <button type="button" onClick={onClick} aria-label="Close" style={{
    position: 'absolute', top: 14, right: 14, width: 30, height: 30, borderRadius: '50%', border: 'none', cursor: 'pointer',
    background: dark ? 'rgba(255,255,255,.16)' : 'rgba(15,35,140,.08)', color: dark ? '#fff' : BLUE, fontSize: 18, lineHeight: 1, fontFamily: F,
  }}>×</button>
);

export default function ProtoSidePanel() {
  const v = 9; // chosen design: 660px, big text
  const [open, setOpen] = useState(true);
  const hv = 7; // chosen open-again button: tall thin strip with an arrow
  const { w, look } = VARIANTS[v];

  const dark = look === 'blue' || look === 'glass';
  const big = look === 'big';
  const titleColor = dark ? '#fff' : BLUE;
  const bodyColor = dark ? 'rgba(255,255,255,.8)' : '#3C4368';
  const tSize = big ? 24 : look === 'plain' ? 22 : 18;
  const dSize = big ? 19 : 16;

  const bg = look === 'blue' ? BLUE : look === 'glass' ? 'rgba(8,16,70,.78)' : look === 'accent' ? '#F4F6FD' : '#fff';
  const extra = look === 'glass'
    ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRight: '1px solid rgba(255,255,255,.2)' }
    : look === 'accent' ? { borderLeft: '6px solid var(--accent-light, #FFA066)' } : {};

  const eyebrowColor = dark ? 'rgba(255,255,255,.7)' : '#5B6AA8';
  const eyebrow = (
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: look === 'accent' ? '#C2571A' : eyebrowColor, marginBottom: 8 }}>About this prototype</div>
  );

  const items = ITEMS.map((i, n) => {
    if (look === 'columns') return (
      <div key={i.t} style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 24, padding: '22px 0', borderTop: '1px solid #E3E7F5' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: titleColor }}>{i.t}</div>
        <div style={{ fontSize: dSize, lineHeight: 1.55, color: bodyColor }}>{i.d}</div>
      </div>
    );
    if (look === 'steps') return (
      <div key={i.t} style={{ display: 'flex', gap: 18, padding: '22px 0', borderTop: '1px solid #E3E7F5' }}>
        <span style={{ flex: 'none', width: 38, height: 38, borderRadius: '50%', background: BLUE, color: '#fff', fontSize: 13, fontWeight: 800, display: 'grid', placeItems: 'center' }}>0{n + 1}</span>
        <div>
          <div style={{ fontSize: tSize, fontWeight: 800, color: titleColor, marginBottom: 5 }}>{i.t}</div>
          <div style={{ fontSize: dSize, lineHeight: 1.55, color: bodyColor }}>{i.d}</div>
        </div>
      </div>
    );
    return (
      <div key={i.t} style={{ marginBottom: big ? 34 : 28 }}>
        <div style={{ fontSize: tSize, fontWeight: 800, color: titleColor, marginBottom: 6 }}>{i.t}</div>
        <div style={{ fontSize: dSize, lineHeight: 1.55, color: bodyColor }}>{i.d}</div>
      </div>
    );
  });

  return (
    <>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* button that brings the window back (TEMPORARY: 10 designs) */}
        {(() => {
          const base = { position: 'absolute', zIndex: 5, border: 'none', cursor: 'pointer', fontFamily: F, fontWeight: 700, color: BLUE, background: '#fff', boxShadow: '0 8px 24px rgba(5,12,60,.4)', opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto', transition: 'opacity .3s .25s', display: 'inline-flex', alignItems: 'center', gap: 8 };
          const pulse = <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-light, #FFA066)', animation: 'hintPulse 1.8s ease-out infinite' }} />;
          const H = [
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 0, top: 60, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 9px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', borderRadius: '0 10px 10px 0' }}>About</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} aria-label="About this prototype" style={{ ...base, left: 14, top: 60, width: 46, height: 46, borderRadius: '50%', justifyContent: 'center', fontSize: 20 }}>i</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 14, top: 60, fontSize: 14, padding: '12px 18px', borderRadius: 999 }}>About this prototype <span aria-hidden="true">›</span></button>,
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 14, top: 60, fontSize: 14, padding: '12px 18px', borderRadius: 999, background: 'rgba(8,16,70,.75)', color: '#fff', border: '1px solid rgba(255,255,255,.3)', backdropFilter: 'blur(10px)' }}>{pulse}About this prototype</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 0, top: 60, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 9px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', borderRadius: '0 10px 10px 0', background: 'var(--accent-light, #FFA066)', color: '#1a1200' }}>About</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} aria-label="About this prototype" style={{ ...base, left: 14, top: 60, width: 46, height: 46, borderRadius: '50%', justifyContent: 'center', fontSize: 24, background: 'var(--accent-light, #FFA066)', color: '#1a1200' }}>›</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 0, top: -34, fontSize: 13, padding: '8px 14px', borderRadius: 999, background: 'transparent', color: '#fff', boxShadow: 'none', border: '1px solid rgba(255,255,255,.45)' }}>About this prototype <span aria-hidden="true">›</span></button>,
            <button key="h" type="button" className="psp-handle" onClick={() => setOpen(true)} aria-label="About this prototype" style={{ ...base, left: -42, top: 110, width: 30, height: 130, borderRadius: 16, justifyContent: 'center', fontSize: 22 }}>›</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} style={{ ...base, left: 14, top: 60, fontSize: 14, padding: '10px 18px 10px 10px', borderRadius: 999 }}><span aria-hidden="true" style={{ width: 28, height: 28, borderRadius: '50%', background: BLUE, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 15 }}>?</span>What is this?</button>,
            <button key="h" type="button" onClick={() => setOpen(true)} aria-label="About this prototype" style={{ ...base, left: 14, top: 60, width: 46, height: 46, borderRadius: '50%', justifyContent: 'center', fontSize: 20, animation: 'hintPulse 1.8s ease-out infinite' }}>i</button>,
          ];
          return H[hv];
        })()}

        <aside className="psp-side" style={{
          position: 'absolute', top: 0, bottom: 0, left: 0, zIndex: 6, width: w, maxWidth: '90%', background: bg, fontFamily: F, textAlign: 'left',
          borderRadius: 5, boxShadow: '0 0 60px rgba(5,12,60,.5)', display: 'flex', flexDirection: 'column', pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(-100vw)', visibility: open ? 'visible' : 'hidden',
          transition: open ? 'transform .5s cubic-bezier(.2,.8,.2,1), visibility 0s' : 'transform .5s cubic-bezier(.2,.8,.2,1), visibility 0s .5s', ...extra,
        }}>
          {look === 'header' ? (
            <div style={{ background: BLUE, color: '#fff', padding: '26px 30px 22px', position: 'relative' }}>
              <Close onClick={() => setOpen(false)} dark />
              {eyebrow}
              <div style={{ fontSize: 22, fontWeight: 800 }}>What you are looking at</div>
            </div>
          ) : (
            <div style={{ padding: '30px 30px 0', position: 'relative' }}>
              <Close onClick={() => setOpen(false)} dark={dark} />
              {eyebrow}
              {(look === 'plain' || big) && <div style={{ height: 14 }} />}
            </div>
          )}
          <div style={{ padding: look === 'header' ? '28px 30px 8px' : '14px 30px 8px', overflow: 'auto' }}>{items}</div>
        </aside>
      </div>
      <style>{`@media (max-width:760px){.psp-handle{left:-14px !important;width:24px !important;border-radius:12px !important}}@media (max-width:640px){.psp-side{max-width:92% !important}.psp-side div[style*="190px"]{grid-template-columns:1fr !important;gap:6px !important}}`}</style>

      <style>{`@keyframes hintPulse{0%{box-shadow:0 0 0 0 rgba(255,160,102,.6)}100%{box-shadow:0 0 0 12px rgba(255,160,102,0)}}`}</style>
    </>
  );
}
