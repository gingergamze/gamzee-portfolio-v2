'use client';

import { useEffect, useRef, useState } from 'react';
import { GROUPS } from './SkillsMap';

// The skills tree for phones and touch tablets. It is plain SVG with fixed positions, so it is part of the
// page from the start: no canvas and no measuring before it can show. Dots can be pulled and spring back.
const W = 360;
const CX = W / 2;
const TOP = 44;
const BAND = 180;
const H = TOP + BAND * (GROUPS.length - 0.5) + 70;
const COLORS = ['var(--accent, #D04D03)', 'var(--map-4, #4F6BD9)', 'var(--map-2, #0E9F8E)', 'var(--map-3, #D6457F)'];
const TWO_LINES = {
  'Product strategy with vision': ['Product strategy', 'with vision'],
  'Stubborn stakeholders 😊': ['Stubborn', 'stakeholders 😊'],
};

const ROOT = { id: 'root', x: CX, y: 16 };
const HUBS = GROUPS.map((g, gi) => ({ id: `h${gi}`, label: g.name, gi, x: CX, y: TOP + BAND * (gi + 0.5) }));
const LEAVES = GROUPS.flatMap((g, gi) => [0, 1].flatMap((sideIdx) => {
  // two columns beside the group dot, names written outward
  const col = g.items.filter((_, k) => k % 2 === sideIdx);
  const side = sideIdx === 0 ? -1 : 1;
  return col.map((label, k) => {
    const dy = (k - (col.length - 1) / 2) * 32;
    const off = 30 + Math.max(0, 24 - Math.abs(dy)) * 0.6;
    return { id: `l${gi}-${sideIdx}-${k}`, label, gi, side, x: CX + side * off, y: HUBS[gi].y + dy };
  });
}));

export default function SkillsTree() {
  const svg = useRef(null);
  const drag = useRef(null);
  const raf = useRef(0);
  const [pull, setPull] = useState(null); // { id, gi, hub, x, y }

  // A finger that starts on a dot pulls it; anywhere else the page scrolls as usual.
  useEffect(() => {
    const el = svg.current;
    const stop = (e) => { if (e.target.getAttribute('data-dot')) e.preventDefault(); };
    el.addEventListener('touchstart', stop, { passive: false });
    return () => { el.removeEventListener('touchstart', stop); cancelAnimationFrame(raf.current); };
  }, []);

  const toLocal = (e) => {
    const r = svg.current.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };

  const down = (node, hub) => (e) => {
    cancelAnimationFrame(raf.current);
    const p = toLocal(e);
    drag.current = { node, hub, from: p, x: 0, y: 0 };
    try { e.target.setPointerCapture(e.pointerId); } catch {}
    setPull({ id: node.id, gi: node.gi, hub, x: 0, y: 0 });
  };

  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const p = toLocal(e);
    const dx = p.x - d.from.x, dy = p.y - d.from.y;
    const dist = Math.hypot(dx, dy) || 0.001;
    const k = (70 * Math.tanh(dist / 70)) / dist; // rubber band: never far from home
    d.x = dx * k; d.y = dy * k;
    setPull({ id: d.node.id, gi: d.node.gi, hub: d.hub, x: d.x, y: d.y });
  };

  const up = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    const start = performance.now();
    const back = (t) => {
      const s = Math.max(0, (t - start) / 1000);
      if (s > 0.7) { setPull(null); return; }
      const f = Math.exp(-7 * s) * Math.cos(16 * s);
      setPull({ id: d.node.id, gi: d.node.gi, hub: d.hub, x: d.x * f, y: d.y * f });
      raf.current = requestAnimationFrame(back);
    };
    raf.current = requestAnimationFrame(back);
  };

  // where a point is right now: the pulled dot moves fully; when a group dot is pulled, its skills follow halfway
  const at = (n) => {
    if (!pull) return n;
    if (n.id === pull.id) return { ...n, x: n.x + pull.x, y: n.y + pull.y };
    if (pull.hub && n.gi === pull.gi && n.side) return { ...n, x: n.x + pull.x * 0.5, y: n.y + pull.y * 0.5 };
    return n;
  };
  const hubs = HUBS.map(at);
  const leaves = LEAVES.map(at);

  return (
    <div style={{ maxWidth: 440, margin: '0 auto' }}>
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Skills tree. ${GROUPS.map((g) => `${g.name}: ${g.items.join(', ')}`).join('. ')}.`}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        style={{ display: 'block', height: 'auto', overflow: 'visible', userSelect: 'none', WebkitUserSelect: 'none', fontFamily: 'var(--font-work-sans), system-ui, sans-serif' }}
      >
        {hubs.map((h, i) => {
          const a = i ? hubs[i - 1] : ROOT;
          return <line key={h.id} x1={a.x} y1={a.y} x2={h.x} y2={h.y} strokeWidth="1.2" opacity="0.6" style={{ stroke: COLORS[h.gi] }} />;
        })}
        {leaves.map((n) => <line key={n.id} x1={hubs[n.gi].x} y1={hubs[n.gi].y} x2={n.x} y2={n.y} strokeWidth="1.2" opacity="0.6" style={{ stroke: COLORS[n.gi] }} />)}
        <circle cx={ROOT.x} cy={ROOT.y} r="8" style={{ fill: COLORS[0] }} />
        {leaves.map((n) => {
          const lines = TWO_LINES[n.label] || [n.label];
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="3.8" style={{ fill: COLORS[n.gi] }} />
              <text textAnchor={n.side > 0 ? 'start' : 'end'} fontSize="11.5" fill="#554E48" stroke="#fff" strokeWidth="4" strokeLinejoin="round" style={{ paintOrder: 'stroke' }}>
                {lines.map((part, li) => <tspan key={part} x={n.x + n.side * 9} y={n.y + (lines.length > 1 ? (li ? 10 : -3) : 4)}>{part}</tspan>)}
              </text>
            </g>
          );
        })}
        {hubs.map((h) => (
          <g key={h.id}>
            <circle cx={h.x} cy={h.y} r="6.5" style={{ fill: COLORS[h.gi] }} />
            <text x={h.x} y={h.y - 64} textAnchor="middle" fontSize="19" fontWeight="700" stroke="#fff" strokeWidth="5" strokeLinejoin="round" style={{ paintOrder: 'stroke', fill: COLORS[h.gi] }}>{h.label}</text>
          </g>
        ))}
        {/* larger invisible circles to catch a finger */}
        {[...LEAVES, ...HUBS].map((n) => {
          const p = at(n);
          return <circle key={n.id} data-dot="1" cx={p.x} cy={p.y} r={n.side ? 13 : 18} fill="transparent" onPointerDown={down(n, !n.side)} style={{ cursor: 'grab', touchAction: 'none' }} />;
        })}
      </svg>
      <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.5, color: '#7C756E', textAlign: 'center' }}>Pull a dot to play.</p>
    </div>
  );
}
