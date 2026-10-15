// "What I heard" — a sub-part of the Problem discovery stage: a small label in
// the left column (aligned with the About block) and the stakeholder quotes on
// the right, followed by what the real problem was.
const DISPLAY = 'var(--font-display)';
const INK = '#1C1917';

const quoteText = {
  fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(20px,2vw,28px)', lineHeight: 1.25,
  letterSpacing: '-0.02em', color: INK, margin: 0,
};

export default function StoryBlock({ story }) {
  return (
    <div className="sb-split" style={{
      display: 'grid', gridTemplateColumns: 'minmax(170px,220px) minmax(0,1fr)',
      columnGap: 'clamp(28px,5vw,64px)', alignItems: 'start', marginTop: 'clamp(64px,10vh,104px)',
    }}>
      <style>{`@media (max-width:900px){.sb-split{grid-template-columns:minmax(0,1fr)!important;row-gap:16px}}`}</style>
      <h3 style={{
        fontFamily: DISPLAY, fontWeight: 700, fontSize: '18px', lineHeight: 1.2, letterSpacing: '-0.01em',
        color: '#7C756E', margin: 0, paddingTop: '4px',
      }}>
        {story.heardLabel}
      </h3>
      <div>
        <div style={{ display: 'grid', gap: '20px' }}>
          {story.quotes.map((q) => (
            <blockquote key={q} style={{ ...quoteText, fontStyle: 'italic', paddingBottom: '20px', borderBottom: '1px solid rgba(28,25,23,.12)' }}>&ldquo;{q}&rdquo;</blockquote>
          ))}
        </div>
        {(story.notReal || story.real) && (
          <div style={{ marginTop: 'clamp(28px,4vh,40px)' }}>
            <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(16px,1.4vw,18px)', fontWeight: 700, color: '#7C756E', margin: 0 }}>{story.notReal}</p>
            <p style={{ ...quoteText, fontSize: 'clamp(22px,2.2vw,30px)', lineHeight: 1.3, maxWidth: '46rem', margin: '12px 0 0', zoom: 1 }}>{story.real}</p>
          </div>
        )}
      </div>
    </div>
  );
}
