const FONT = 'var(--font-work-sans)';
const DISPLAY = 'var(--font-display)';
const ORANGE = 'var(--accent)';

const label = { fontFamily: FONT, fontWeight: 600, fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.45, letterSpacing: '-0.005em', color: '#1C1917' };
const text = { fontFamily: FONT, fontSize: 'clamp(15px,1.3vw,17px)', lineHeight: 1.5, color: '#554E48' };
const big = { fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(34px,3.4vw,48px)', lineHeight: 1, letterSpacing: '-0.03em', color: ORANGE, whiteSpace: 'nowrap' };

// Keep a number and its unit together ("90 sec" never splits across lines).
const glue = (t) => t.replace(/(\d)\s(sec|min)/g, '$1 $2');

// Impact: title on top, three metrics under it. Each part of a metric (title,
// number + text) sits in its own grid row, so the three columns line up
// whatever the text lengths. The big number and its text are top-aligned.
// The block uses the same two columns as the intro, so it starts on the same
// line as "About".
export default function ImpactBlock({ stats }) {
  return (
    <div className="case-columns" style={{ display: 'grid', gridTemplateColumns: 'minmax(170px,220px) 1fr', gap: 'clamp(32px,5vw,72px)' }}>
      <div aria-hidden="true" className="ib-spacer" />
      <div>
        <h2 style={{
          fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', zoom: 1, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: '#1C1917', margin: '0 0 clamp(44px,7vh,72px)',
        }}>
          What changed adoption by design
        </h2>
        <div className="case-stats" style={{ display: 'grid', gridTemplateColumns: `repeat(${stats.length}, 1fr)`, columnGap: 'clamp(24px,3vw,48px)', alignItems: 'start' }}>
          {stats.map((s, i) => [
            <div key={`${i}-0`} className="ib-cell ib-label" style={{ ...label, gridColumn: i + 1, gridRow: 1, '--o': i * 10 }}>{s.label}</div>,
            // Metrics without a big number yet (big + text in works.js) show just the title.
            s.big && s.text && (
              <div key={`${i}-1`} className="ib-cell" style={{ gridColumn: i + 1, gridRow: 2, '--o': i * 10 + 1, display: 'flex', alignItems: 'flex-start', gap: '14px', marginTop: '14px' }}>
                <strong style={big}>{s.big}</strong>
                <div className="ib-text" style={{ ...text, maxWidth: '18ch', paddingTop: '0.3em' }}>{glue(s.text)}</div>
              </div>
            ),
          ])}
        </div>
      </div>
    </div>
  );
}
