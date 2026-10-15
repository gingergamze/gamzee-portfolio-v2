'use client';


import CaseStudyTimeline from './CaseStudyTimeline';

// Process section: title + one-line intro, the interactive stage bar, and for
// the selected stage a "what went well / what was challenging" frame on the
// right. Add `wentWell` and `challenging` text to a stage in works.js.
const GOOD = '#2F7D4F';
const HARD = '#C62828';
const FALLBACK = {
  well: 'Write here what went well in this stage: one or two short sentences.',
  hard: 'Write here what was challenging in this stage: one or two short sentences.',
};

const Mark = ({ emoji }) => (
  <span aria-hidden="true" style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
);

function Reflection({ stage }) {
  const rows = [
    { title: 'What went well', body: stage.wentWell || FALLBACK.well, color: GOOD, emoji: '😊' },
    { title: 'What was challenging', body: stage.challenging || FALLBACK.hard, color: HARD, emoji: '😕' },
  ];
  return (
    <div style={{ border: '1px solid rgba(28,25,23,.12)', borderRadius: '16px', background: '#fff', overflow: 'hidden' }}>
      {rows.map((r, i) => (
        <div key={r.title} style={{ padding: '22px 24px', borderTop: i ? '1px solid rgba(28,25,23,.1)' : 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em',
              lineHeight: 1.2, margin: 0, color: r.color,
            }}>{r.title}</h3>
            <Mark emoji={r.emoji} />
          </div>
          <p style={{
            fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7, letterSpacing: '-0.005em',
            margin: 0, color: '#1C1917',
          }}>{r.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProcessSection({ stages }) {
  return (
    <div id="process" style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(56px,8vh,104px) var(--cs-x) 0' }}>
      <div style={{ marginBottom: 'clamp(44px,7vh,72px)' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', zoom: 1,
          lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1917', margin: 0,
        }}>
          Process
        </h2>
      </div>
      <CaseStudyTimeline stages={stages} ariaLabel="Design process" renderAside={(st) => <Reflection stage={st} />} />
    </div>
  );
}
