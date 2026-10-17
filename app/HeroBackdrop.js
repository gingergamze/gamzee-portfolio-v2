'use client';

import { useEffect, useState } from 'react';

// Hero animation for the lower half of the hero: "chaos to order", shown as two
// runs that take turns. Sticky notes settle into a tidy grid, then dots gather
// into colour clusters, then it starts over. It sits below the headline, pauses
// as soon as the visitor scrolls down (and runs again at the top), fades out
// once the hero is mostly covered, and stays still for visitors who prefer
// reduced motion.
const OR = 'rgb(208,77,3)';
const ORA = (a) => `rgba(208,77,3,${a})`;
const SOFTA = (a) => `rgba(255,160,102,${a})`;
const BLUEA = (a) => `rgba(80,110,235,${a})`;
const INK = (a) => `rgba(28,25,23,${a})`;

const CSS = `
.hb-off,.hb-off *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.hb-anim,.hb-anim *{animation:none!important}}
.hb-svg *{transform-box:fill-box}
@keyframes hbOrder{0%{transform:translate(var(--sx),var(--sy));opacity:0}6%{opacity:1}34%{transform:translate(var(--sx),var(--sy))}66%,86%{transform:translate(var(--ex),var(--ey));opacity:1}94%{transform:translate(var(--ex),var(--ey));opacity:0}100%{transform:translate(var(--sx),var(--sy));opacity:0}}
@keyframes hbMove{
  0%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr)) scale(var(--ss));opacity:0}
  6%{opacity:1}
  32%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr)) scale(var(--ss))}
  62%{transform:translate(var(--ex),var(--ey)) rotate(var(--er)) scale(1.07)}
  70%,86%{transform:translate(var(--ex),var(--ey)) rotate(var(--er)) scale(1);opacity:1}
  94%{transform:translate(var(--ex),var(--ey)) rotate(var(--er)) scale(1);opacity:0}
  100%{transform:translate(var(--sx),var(--sy)) rotate(var(--sr)) scale(var(--ss));opacity:0}
}
@keyframes hbFunnel{
  0%{transform:translate(var(--sx),var(--sy));opacity:0}
  6%{opacity:1}
  30%{transform:translate(var(--sx),var(--sy))}
  52%{transform:translate(var(--mx),var(--my))}
  74%,86%{transform:translate(var(--ex),var(--ey));opacity:1}
  94%{transform:translate(var(--ex),var(--ey));opacity:0}
  100%{transform:translate(var(--sx),var(--sy));opacity:0}
}
@keyframes hbTick{from{opacity:0}to{opacity:0}}
@keyframes hbGuide{0%,40%{opacity:0}62%,86%{opacity:1}94%,100%{opacity:0}}
`;

function rng(seed) { let s = seed; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
const px = (n) => `${Math.round(n)}px`;

// One shape that starts scattered and ends in its place (position, rotation).
function Mover({ sx, sy, sr = 0, ss = 1, ex, ey, er = 0, delay = 0, children, name = 'hbMove', mx, my }) {
  return (
    <g style={{
      '--sx': px(sx), '--sy': px(sy), '--sr': `${sr}deg`, '--ss': ss, '--ex': px(ex), '--ey': px(ey), '--er': `${er}deg`,
      ...(mx !== undefined ? { '--mx': px(mx), '--my': px(my) } : {}),
      animation: `${name} 9s ease-in-out ${delay}s infinite`,
    }}>{children}</g>
  );
}
const Guide = ({ children }) => <g style={{ animation: 'hbGuide 9s ease-in-out infinite', opacity: 0 }}>{children}</g>;

// ---- 1: sticky notes settle into a tidy grid ------------------------------
const NOTE = [SOFTA(0.9), ORA(0.55), BLUEA(0.4), 'rgba(255,214,120,.9)'];
function StickyNotes() {
  const r = rng(11);
  return (<>
    <Guide><rect x="540" y="26" width="360" height="212" rx="18" fill="none" stroke={INK(0.16)} strokeWidth="2" strokeDasharray="6 8" /></Guide>
    {Array.from({ length: 12 }, (_, i) => (
      <Mover key={i} sx={90 + r() * 380} sy={50 + r() * 160} sr={(r() - 0.5) * 60} ex={590 + (i % 4) * 90} ey={66 + Math.floor(i / 4) * 76} er={0} delay={(i % 6) * 0.1}>
        <rect x="-32" y="-32" width="64" height="64" rx="9" fill={NOTE[i % 4]} stroke={INK(0.12)} strokeWidth="1.5" />
        <rect x="-20" y="-14" width="38" height="5" rx="2.5" fill={INK(0.28)} /><rect x="-20" y="-2" width="28" height="5" rx="2.5" fill={INK(0.2)} />
      </Mover>
    ))}
  </>);
}

// ---- 3: dots cluster by colour ------------------------------------------
function ColorClusters() {
  const r = rng(3);
  const centers = [[620, 110], [770, 80], [820, 180]], cols = [OR, SOFTA(0.95), BLUEA(0.7)];
  return (<>
    {centers.map(([x, y], c) => <Guide key={c}><circle cx={x} cy={y} r={60} fill={c === 0 ? ORA(0.06) : c === 1 ? SOFTA(0.12) : BLUEA(0.07)} stroke={INK(0.12)} strokeWidth="2" strokeDasharray="5 7" /></Guide>)}
    {Array.from({ length: 30 }, (_, i) => {
      const c = i % 3, a = r() * Math.PI * 2, d = Math.sqrt(r()) * 44;
      return (
        <Mover key={i} sx={70 + r() * 410} sy={30 + r() * 200} ex={centers[c][0] + Math.cos(a) * d} ey={centers[c][1] + Math.sin(a) * d} delay={(i % 10) * 0.07} name="hbOrder">
          <circle cx="0" cy="0" r="7" fill={cols[c]} />
        </Mover>
      );
    })}
  </>);
}

export default function HeroBackdrop() {
  const [which, setWhich] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [faded, setFaded] = useState(false);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onMq = () => setNarrow(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    const onScroll = () => { setPlaying(window.scrollY < 60); setFaded(window.scrollY > window.innerHeight * 0.6); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); mq.removeEventListener('change', onMq); };
  }, []);
  const C = which === 0 ? StickyNotes : ColorClusters;
  return (
    <>
      <style>{CSS}</style>
      <div
        className={`hb-anim${playing ? '' : ' hb-off'}`}
        style={{
          position: 'absolute', left: 'var(--pl-hero)', right: 'var(--pl-hero)', bottom: 'clamp(40px,7vh,84px)',
          height: 'clamp(170px,27vh,260px)', pointerEvents: 'none', zIndex: 0,
          opacity: faded ? 0 : 1, transition: 'opacity .6s ease',
        }}
        aria-hidden="true"
      >
        <svg className="hb-svg" viewBox={narrow ? '440 0 500 260' : '0 0 1000 260'} width="100%" height="100%" preserveAspectRatio="xMidYMax meet" style={{ display: 'block' }}>
          <C key={which} />
          {/* An invisible timer with the same 9s length: when it completes a run,
              the other animation takes over (it pauses with everything else). */}
          <rect width="1" height="1" onAnimationIteration={() => setWhich((w) => 1 - w)} style={{ opacity: 0, animation: 'hbTick 9s linear infinite' }} />
        </svg>
      </div>
    </>
  );
}
