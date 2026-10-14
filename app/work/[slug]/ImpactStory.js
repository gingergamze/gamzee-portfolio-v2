// Metrics with their own Before / After visuals under each one. Before / After
// labels sit once on the left. Each metric and its visuals share an outlined frame.
const FONT = 'var(--font-work-sans)';
const ORANGE = '#d04d03';
const GAP = 'clamp(48px,6vw,88px)';
const LABEL_W = 'clamp(56px,6vw,80px)';
const RULE = '1px solid rgba(28,25,23,0.12)';

const lab = (i) => ({
  fontFamily: FONT, fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
  color: i === 0 ? '#8A8178' : ORANGE,
});

function Shot({ step }) {
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '24px', overflow: 'hidden',
      background: step.image ? 'transparent' : 'rgba(28,25,23,0.04)',
      border: step.image ? 'none' : '1.5px dashed rgba(28,25,23,0.22)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {step.image
        ? <img src={step.image} alt={step.stage} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontFamily: FONT, fontSize: '14px', color: 'rgba(28,25,23,0.45)' }}>{step.stage} visual</span>}
    </div>
  );
}

// backdrop behind a whole column (metric + both visuals), per option
const BACK = {
  1: { inset: '-24px -16px', background: '#F1EEE8', borderRadius: '24px' },
  2: { top: 0, bottom: 0, left: '-16px', width: '3px', background: ORANGE, borderRadius: '2px' },
  3: { top: '-20px', left: 0, right: 0, height: '3px', background: ORANGE, borderRadius: '2px' },
  4: { inset: '-24px -16px', border: '1.5px solid rgba(28,25,23,0.18)', borderRadius: '24px' },
  5: null,
};
const LEFT = { 2: true, 3: true };


export default function ImpactStory({ steps, stats }) {
  const v = 4;
  const n = stats.length;
  const left = !!LEFT[v];

  return (
    <>
      <div style={{ margin: '0 0 clamp(24px,3.5vh,40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1917', margin: 0 }}>What changed adoption by design</h2>
        </div>
      </div>
      <div className="impact-cols" style={{
        display: 'grid', gridTemplateColumns: `${LABEL_W} repeat(${n}, 1fr)`, columnGap: GAP, rowGap: '16px',
        padding: 'clamp(48px,7vh,88px) 0', borderTop: RULE, borderBottom: RULE, alignItems: 'center',
      }}>
        {BACK[v] && stats.map((s, c) => (
          <div key={'b' + c} aria-hidden className="is-cell is-back" style={{ '--c': c + 2, '--r': '1 / span 3', gridColumn: c + 2, gridRow: '1 / span 3', position: 'relative', alignSelf: 'stretch', zIndex: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', ...BACK[v] }} />
          </div>
        ))}
        {stats.map((s, c) => (
          <div key={'m' + c} className="is-cell" style={{ '--c': c + 2, '--r': 1, '--k': c, gridColumn: c + 2, gridRow: 1, position: 'relative', zIndex: 1, textAlign: left ? 'left' : 'center', alignSelf: 'start' }}>
            {!left && <div style={{ width: '32px', height: '3px', borderRadius: '2px', background: ORANGE, margin: '0 auto 16px', position: 'relative' }} />}
            <div style={{
              position: 'relative', fontFamily: FONT, fontWeight: 500, fontSize: 'clamp(15px,1.4vw,20px)', lineHeight: 1.5,
              letterSpacing: '-0.005em', color: '#3D3631', maxWidth: '30ch', margin: left ? 0 : '0 auto',
            }}>{s.label}</div>
                      </div>
        ))}
        {steps.map((st, i) => (
          <div key={i} style={{ display: 'contents' }}>
            <div className="is-cell impact-side" style={{ '--c': 1, '--r': i + 2, gridColumn: 1, gridRow: i + 2, ...lab(i) }}>{st.stage}</div>
            {stats.map((s, c) => (
              <div key={c} className="is-cell" style={{ '--c': c + 2, '--r': i + 2, '--k': c, gridColumn: c + 2, gridRow: i + 2, position: 'relative', zIndex: 1 }}>
                <div className="impact-mlabel" style={{ ...lab(i), marginBottom: '8px' }}>{st.stage}</div>
                <Shot step={st} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </>
  );
}
