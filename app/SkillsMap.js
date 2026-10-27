'use client';

import { useEffect, useRef, useState } from 'react';

// Interactive map: pull any dot and the lines stretch, so the dots linked to it
// move too. Springs keep every dot attached to its group and to the center.
const GROUPS = [
  { name: 'Design', color: '#D04D03', items: ['UX research strategy', 'Information architecture', 'Interaction design', 'Prototyping', 'AI design', 'Concept development'] },
  { name: 'Products', color: '#0E9F8E', items: ['Internal tools', 'B2E software', 'B2B workflows', 'Enterprise software', 'Operational processes'] },
  { name: 'Problems I fix', color: '#D6457F', items: ['Too many steps', 'Too many mistakes', 'Confusing navigation', 'Information overload', 'Complex tool language', 'Unclear product vision', 'Stubborn stakeholders 😊'] },
];

const K_EDGE = 0.05;
const K_ROOT_EDGE = 0.09;
const K_HOME_LEAF = 0.02;
const K_HOME_HUB = 0.06;
const DAMPING = 0.82;
const STEP_MS = 1000 / 60;

function build() {
  const nodes = [{ id: 'root', type: 'root', label: 'Gamze', color: '#D04D03', group: -1, x: 0, y: 0, hx: 0, hy: 0, vx: 0, vy: 0, r: 8 }];
  const edges = [];
  let leafCount = 0;
  GROUPS.forEach((g, gi) => {
    const hubIndex = nodes.length;
    nodes.push({ id: `h${gi}`, type: 'hub', label: g.name, color: g.color, group: gi, x: 0, y: 0, hx: 0, hy: 0, vx: 0, vy: 0, r: 6, n: g.items.length });
    edges.push({ a: 0, b: hubIndex, k: K_ROOT_EDGE, rest: 0, trunk: true, group: gi });
    g.items.forEach((label, li) => {
      const idx = nodes.length;
      nodes.push({ id: `l${gi}-${li}`, type: 'leaf', label, color: g.color, group: gi, x: 0, y: 0, hx: 0, hy: 0, vx: 0, vy: 0, r: 3.6, hub: hubIndex, li, level: 0 });
      edges.push({ a: hubIndex, b: idx, k: K_EDGE, rest: 0 });
      leafCount += 1;
    });
  });
  return { nodes, edges };
}

// Hand-tuned ring for a few dots whose labels would touch (wide layout only).
const FIX = { 0: 0.6, 1: 0.78, 2: 1, 4: 0.78, 5: 0.92, 6: 0.72, 7: 0.95, 8: 0.6, 9: 1, 10: 0.8, 11: 0.72, 12: 1, 13: 0.85, 14: 0.65, 15: 0.98, 16: 0.56, 17: 1 };

// Phones: the three groups are stacked under each other and linked in a chain.
// Each group's dots spread around its own center dot.
function layoutVertical(model, w, h) {
  const { nodes, edges } = model;
  const hubs = nodes.map((n, i) => (n.type === 'hub' ? i : -1)).filter((i) => i >= 0);
  edges.forEach((e) => { if (e.trunk) e.a = e.group > 0 ? hubs[e.group - 1] : 0; });
  const cx = w / 2;
  const top = 44;
  const band = (h - top - 14) / GROUPS.length;
  const rx = Math.min(w / 2 - 26, 150);
  const ry = band * 0.4;
  nodes[0].hx = cx; nodes[0].hy = 16; nodes[0].deg = 0;
  GROUPS.forEach((g, gi) => {
    const hub = nodes[hubs[gi]];
    hub.hx = cx; hub.hy = top + band * (gi + 0.5); hub.deg = 0;
    const mine = nodes.filter((n) => n.type === 'leaf' && n.group === gi);
    // Two columns beside the group dot: names are written outward, next to each dot.
    [0, 1].forEach((sideIdx) => {
      const col = mine.filter((_, k) => k % 2 === sideIdx);
      const dir = sideIdx === 0 ? -1 : 1;
      col.forEach((n, k) => {
        const dy = (k - (col.length - 1) / 2) * 32;
        const off = 30 + Math.max(0, 24 - Math.abs(dy)) * 0.6;
        n.hx = cx + dir * off;
        n.hy = hub.hy + dy;
        n.deg = 0; n.side = dir;
      });
    });
  });
  nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = 0; n.vy = 0; });
  edges.forEach((e) => { e.rest = Math.hypot(nodes[e.a].hx - nodes[e.b].hx, nodes[e.a].hy - nodes[e.b].hy); });
  model.rx = rx; model.ry = ry; model.cx = cx; model.cy = h; model.vertical = true;
}

function layout(model, w, h, wideFrom) {
  const { nodes, edges } = model;
  const narrow = w < wideFrom;
  model.vertical = false;
  edges.forEach((e) => { if (e.trunk) e.a = 0; });
  if (narrow) { layoutVertical(model, w, h); return; }
  const span = narrow ? 54 : 76;
  const levels = narrow ? [1, 0.8, 0.6] : [1, 0.72, 0.9, 0.6];
  const margin = narrow ? 46 : Math.min(170, w * 0.16);
  const cx = w / 2;
  const cy = h - 8;
  const rx = Math.max(60, (w / 2 - margin) / Math.sin((span * Math.PI) / 180));
  const ry = Math.max(60, h - (narrow ? 60 : 72));
  const rad = (d) => (d * Math.PI) / 180;
  const place = (n, f, deg) => {
    n.deg = deg;
    n.hx = cx + rx * f * Math.sin(rad(deg));
    n.hy = cy - ry * f * Math.cos(rad(deg));
  };
  const leaves = nodes.filter((n) => n.type === 'leaf');
  const total = leaves.length;
  const gap = 12; // extra degrees between two groups
  const groupCount = GROUPS.length;
  const step = (2 * span - gap * (groupCount - 1)) / (total - 1);
  let deg = -span;
  let prevGroup = leaves[0].group;
  leaves.forEach((n, k) => {
    if (n.group !== prevGroup) { deg += gap; prevGroup = n.group; }
    place(n, !narrow && FIX[k] ? FIX[k] : levels[k % levels.length], deg);
    n.side = !narrow && Math.abs(deg) > 38 ? Math.sign(deg) : 0;
    deg += step;
  });
  nodes.forEach((n) => {
    if (n.type !== 'hub') return;
    const mine = leaves.filter((l) => l.hub === nodes.indexOf(n));
    place(n, narrow ? 0.34 : 0.27, mine.reduce((sum, l) => sum + l.deg, 0) / mine.length);
  });
  nodes[0].hx = cx; nodes[0].hy = cy;
  // Make room between the three groups: the left one moves left and the right one moves right.
  const shift = narrow ? Math.min(26, w * 0.08) : Math.min(80, w * 0.09);
  nodes.forEach((n) => {
    if (n.type === 'root' || !shift) return;
    if (n.group === 0) n.hx -= shift;
    if (n.group === GROUPS.length - 1) n.hx += shift;
  });
  nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = 0; n.vy = 0; });
  edges.forEach((e) => { e.rest = Math.hypot(nodes[e.a].hx - nodes[e.b].hx, nodes[e.a].hy - nodes[e.b].hy); });
  model.rx = rx; model.ry = ry; model.cx = cx; model.cy = cy;
}

export default function SkillsMap({ height = 'clamp(600px, 62vw, 680px)', labels = 'auto', wideFrom = 760, fontSize }) {
  const wrap = useRef(null);
  const stage = useRef(null);
  const canvas = useRef(null);
  const apiRef = useRef(null);
  const [narrow, setNarrow] = useState(false);
  const [activeG, setActiveG] = useState(null);

  useEffect(() => {
    const el = stage.current;
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const model = build();
    const { nodes, edges } = model;
    let w = 0, h = 0, dpr = 1, padX = 0, padTop = 0;
    let raf = 0, last = 0, acc = 0, awake = false, running = false, visible = true;
    const motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nodes.forEach((n, i) => { n.ph = i * 2.399; n.amp = n.type === 'leaf' ? 3.2 : n.type === 'hub' ? 1.6 : 0; n.ox = 0; n.oy = 0; });
    let drag = null, hover = null, pointer = { x: 0, y: 0 };
    const family = getComputedStyle(el).fontFamily;

    const startLoop = () => { if (!running && visible) { running = true; last = 0; raf = requestAnimationFrame(frame); } };
    const wake = () => { awake = true; startLoop(); };

    const resize = () => {
      const r = el.getBoundingClientRect();
      if (r.height < 120) return;
      setNarrow(r.width < wideFrom);
      w = Math.max(280, r.width); h = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      // The canvas is larger than the map so pulled dots and labels are never cut off.
      padX = w < wideFrom ? 40 : 140; padTop = 70;
      cv.width = Math.round((w + padX * 2) * dpr); cv.height = Math.round((h + padTop) * dpr);
      cv.style.width = `${w + padX * 2}px`; cv.style.height = `${h + padTop}px`;
      cv.style.left = `${-padX}px`; cv.style.top = `${-padTop}px`;
      layout(model, w, h, wideFrom);
      draw();
    };

    const step = () => {
      const f = nodes.map(() => [0, 0]);
      edges.forEach((e) => {
        const a = nodes[e.a], b = nodes[e.b];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const m = e.k * (d - e.rest);
        const fx = (dx / d) * m, fy = (dy / d) * m;
        f[e.a][0] += fx; f[e.a][1] += fy;
        f[e.b][0] -= fx; f[e.b][1] -= fy;
      });
      let energy = 0;
      nodes.forEach((n, i) => {
        if (n.type === 'root' || n === drag) return;
        const k = n.type === 'hub' ? K_HOME_HUB : K_HOME_LEAF;
        n.vx = (n.vx + f[i][0] + (n.hx - n.x) * k) * DAMPING;
        n.vy = (n.vy + f[i][1] + (n.hy - n.y) * k) * DAMPING;
        n.x += n.vx; n.y += n.vy;
        energy += Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.hx - n.x) * 0.02 + Math.abs(n.hy - n.y) * 0.02;
      });
      return energy;
    };

    const draw = (t = performance.now()) => {
      // Gentle drift: each dot floats a few pixels around its place (drawing only).
      nodes.forEach((n) => {
        n.ox = motion ? n.amp * Math.sin(t * 0.0007 + n.ph) : 0;
        n.oy = motion ? n.amp * Math.cos(t * 0.0005 + n.ph * 1.3) : 0;
        n.x += n.ox; n.y += n.oy;
      });
      drawBody();
      nodes.forEach((n) => { n.x -= n.ox; n.y -= n.oy; });
    };

    const drawBody = () => {
      ctx.setTransform(dpr, 0, 0, dpr, padX * dpr, padTop * dpr);
      ctx.clearRect(-padX, -padTop, w + padX * 2, h + padTop);

      const active = drag || hover;
      const ag = active ? active.group : null;
      const dim = (g) => (ag == null || ag === -1 || g === ag ? 1 : 0.28);

      // faint rings around the center
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(28,25,23,0.07)';
      (model.vertical ? [] : [0.27, 0.64, 1]).forEach((m) => {
        ctx.beginPath();
        ctx.ellipse(model.cx, model.cy, model.rx * m, model.ry * m, 0, Math.PI, Math.PI * 2);
        ctx.stroke();
      });

      edges.forEach((e) => {
        const a = nodes[e.a], b = nodes[e.b];
        ctx.globalAlpha = 0.6 * dim(b.group);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });

      if (active && active.type !== 'root') {
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = active.color;
        ctx.beginPath(); ctx.arc(active.x, active.y, 40, 0, Math.PI * 2); ctx.fill();
      }

      nodes.forEach((n) => {
        const grow = n === active ? 1.5 : 1;
        ctx.globalAlpha = dim(n.group);
        ctx.fillStyle = n.color;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * grow, 0, Math.PI * 2); ctx.fill();
      });

      ctx.textBaseline = 'alphabetic';
      nodes.forEach((n) => {
        if (n.type === 'root') return;
        ctx.globalAlpha = n.type === 'leaf' ? dim(n.group) * 0.9 : dim(n.group);
        const small = w < 520;
        if (n.type === 'leaf' && labels === 'bubble') {
          if (n === active) {
            ctx.globalAlpha = 1;
            ctx.font = `700 13px ${family}`;
            const tw = ctx.measureText(n.label).width + 20;
            const bx = Math.max(-padX + 4, Math.min(w + padX - tw - 4, n.x - tw / 2));
            const by = n.y - 40;
            ctx.fillStyle = n.color;
            ctx.beginPath(); ctx.roundRect(bx, by, tw, 26, 13); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
            ctx.fillText(n.label, bx + tw / 2, by + 17.5);
          }
          return;
        }
        if (n.type === 'leaf' && labels === 'active' && ag !== n.group) return;
        if (n.type === 'leaf') {
          ctx.font = `400 ${model.vertical ? (w < 340 ? 10 : 11) : fontSize ?? (small ? 11 : w < 900 ? 13 : 14)}px ${family}`;
          ctx.fillStyle = '#554E48';
          ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.lineJoin = 'round';
          let tx = n.x, ty = n.y - 11;
          if (n.side) { ctx.textAlign = n.side > 0 ? 'left' : 'right'; tx = n.x + n.side * 9; ty = n.y + 3; }
          else {
            ctx.textAlign = 'center';
            const half = ctx.measureText(n.label).width / 2 + 4;
            tx = Math.max(-padX + half, Math.min(w + padX - half, tx));
          }
          ctx.strokeText(n.label, tx, ty); ctx.fillText(n.label, tx, ty);
        } else {
          ctx.font = `700 ${fontSize ? fontSize + 1 : small ? 12 : 15}px ${family}`;
          const leftHub = n.type === 'hub' && n.deg < -12;
          const rightHub = n.type === 'hub' && n.deg > 12;
          ctx.textAlign = leftHub ? 'right' : 'left';
          ctx.fillStyle = n.color;
          // The outer groups put their name below the dot so the start of the lines stays visible.
          if (model.vertical) ctx.textAlign = 'center';
          const tx = model.vertical ? n.x : leftHub ? n.x - 4 : rightHub ? n.x + 4 : n.x + 10;
          const ty = model.vertical ? n.y - 64 : leftHub || rightHub ? n.y + 22 : n.y - 8;
          ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.lineJoin = 'round';
          ctx.strokeText(n.label, tx, ty); ctx.fillText(n.label, tx, ty);
        }
      });
      ctx.globalAlpha = 1;
    };

    function frame(t) {
      raf = 0;
      if (!visible) { running = false; return; }
      if (!last) last = t;
      const dt = Math.min(t - last, 100); last = t;
      if (awake) {
        acc += dt;
        let energy = 0;
        while (acc >= STEP_MS) { energy = step(); acc -= STEP_MS; }
        if (!drag && energy <= 0.05) {
          nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = 0; n.vy = 0; });
          awake = false; acc = 0;
        }
      }
      draw(t);
      if (motion || awake || drag) raf = requestAnimationFrame(frame);
      else running = false;
    }

    // Rubber band: the farther you pull, the more the dot resists (never more than ~R from home).
    const pullTo = (n, p) => {
      const R = w < wideFrom ? 80 : 120;
      const dx = p.x - n.hx, dy = p.y - n.hy;
      const d = Math.hypot(dx, dy) || 0.001;
      const k = (R * Math.tanh(d / R)) / d;
      n.x = Math.max(-padX + 8, Math.min(w + padX - 8, n.hx + dx * k));
      n.y = Math.max(-padTop + 8, Math.min(h - 8, n.hy + dy * k));
    };

    const toLocal = (e) => {
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left - padX, y = e.clientY - r.top - padTop;
      return { x, y };
    };
    const pick = (p, reach) => {
      let best = null, bd = reach;
      nodes.forEach((n) => {
        if (n.type === 'root') return;
        const d = Math.hypot(n.x - p.x, n.y - p.y);
        if (d < bd) { bd = d; best = n; }
      });
      return best;
    };

    const down = (e) => {
      pointer = toLocal(e);
      const n = pick(pointer, e.pointerType === 'touch' ? 30 : 22);
      if (!n) { if (hover) { hover = null; setActiveG(null); draw(); } return; }
      drag = n; hover = n; setActiveG(n.group);
      try { cv.setPointerCapture(e.pointerId); } catch {}
      cv.style.cursor = 'grabbing';
      pullTo(n, pointer); n.vx = 0; n.vy = 0;
      wake();
    };
    const move = (e) => {
      pointer = toLocal(e);
      if (drag) {
        pullTo(drag, pointer);
        wake();
      } else {
        const n = pick(pointer, 20);
        if (n !== hover) { hover = n; setActiveG(n ? n.group : null); cv.style.cursor = n ? 'grab' : 'default'; draw(); }
      }
    };
    const up = () => {
      if (!drag) return;
      drag = null; cv.style.cursor = hover ? 'grab' : 'default';
      wake();
    };
    const leave = (e) => { if (e && e.pointerType === 'touch') return; if (!drag && hover) { hover = null; setActiveG(null); cv.style.cursor = 'default'; draw(); } };

    apiRef.current = {
      select: (g) => {
        const hub = nodes.find((n) => n.type === 'hub' && n.group === g);
        hover = hover && hover.group === g ? null : hub || null;
        setActiveG(hover ? hover.group : null);
        draw();
      },
    };
    cv.addEventListener('pointerdown', down);
    cv.addEventListener('pointermove', move);
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('pointerleave', leave);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) startLoop(); });
    io.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    startLoop();
    if (document.fonts?.ready) document.fonts.ready.then(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      cv.removeEventListener('pointerdown', down);
      cv.removeEventListener('pointermove', move);
      cv.removeEventListener('pointerup', up);
      cv.removeEventListener('pointercancel', up);
      cv.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={wrap} style={{ position: 'relative', width: '100%', height, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-work-sans), system-ui, sans-serif' }}>
      <div ref={stage} style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <canvas
          ref={canvas}
          role="img"
          aria-label={`Interactive map. ${GROUPS.map((g) => `${g.name}: ${g.items.join(', ')}`).join('. ')}.`}
          style={{ position: 'absolute', display: 'block', touchAction: 'none' }}
        />
      </div>
      {narrow && (
        <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.5, color: '#7C756E', textAlign: 'center' }}>
          Pull a dot to play.
        </p>
      )}
    </div>
  );
}
