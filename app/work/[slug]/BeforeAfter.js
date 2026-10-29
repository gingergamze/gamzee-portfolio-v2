// "Before and after" — rows of one before visual and one after visual each.
// Data: `beforeAfter: [{ title, before, after }]` in works.js. An empty image
// path shows a placeholder frame until the real visual is added.
// Frame style: a soft light card with room around the picture, which has
// rounded corners and a soft shadow.
const SANS = 'var(--font-work-sans)';
const DISPLAY = 'var(--font-display)';
const ST = { bg: '#E9ECF9', pad: 'clamp(14px,2vw,24px)', img: { borderRadius: 8, boxShadow: '0 6px 20px rgba(15,35,140,.2)' } };

function Frame({ src, alt, tag, accent }) {
  const st = ST;
  const picture = src ? (
    <img src={src} alt={alt ?? ''} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', ...st.img }} />
  ) : null;
  return (
    <figure style={{ margin: 0 }}>
      <figcaption style={{
        display: 'inline-block', marginBottom: '12px', fontFamily: SANS, fontSize: '12px', fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase', color: accent ? 'var(--accent-light)' : 'rgba(255,255,255,0.7)',
      }}>
        {tag}
      </figcaption>
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '4 / 3', borderRadius: '16px', overflow: 'hidden',
        display: 'grid', placeItems: 'center',
        background: src ? st.bg : 'rgba(255,255,255,0.06)',
        border: src ? (st.border ?? 'none') : '1.5px dashed rgba(255,255,255,0.3)',
        padding: src ? st.pad : 0,
      }}>
        {src ? picture : (
          <span style={{
            fontFamily: SANS, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          }}>{tag} visual</span>
        )}
      </div>
    </figure>
  );
}

export default function BeforeAfter({ items, intro }) {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <style>{`@media (max-width:700px){.ba-row{grid-template-columns:minmax(0,1fr)!important}.ba-item{width:100%!important}}`}</style>
      <h2 style={{
        fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', zoom: 1, lineHeight: 1.1,
        letterSpacing: '-0.02em', color: '#FFFFFF', textAlign: 'center', margin: intro ? '0 0 calc(18px - 0.05em)' : '0 0 clamp(40px,6vh,64px)',
      }}>
        Before and after
      </h2>
      {intro && (
        <p style={{
          fontFamily: SANS, fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7, letterSpacing: '-0.005em',
          color: 'rgba(255,255,255,0.78)', textAlign: 'center', margin: '0 0 clamp(40px,6vh,64px)',
        }}>
          {intro}
        </p>
      )}
      <div style={{ display: 'grid', gap: 'clamp(48px,8vh,88px)' }}>
        {items.map((it, i) => (
          <div key={i} className="ba-item" style={{ width: '85%', margin: '0 auto' }}>
            <h3 style={{
              fontFamily: DISPLAY, fontWeight: 700, fontSize: '18px', lineHeight: 1.2, letterSpacing: '-0.01em',
              color: '#FFFFFF', textAlign: 'left', margin: '0 0 20px', zoom: 1,
            }}>
              {it.title}
            </h3>
            <div className="ba-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(16px,3vw,40px)' }}>
              <Frame src={it.before} alt={it.beforeAlt} tag="Before" />
              <Frame src={it.after} alt={it.afterAlt} tag="After" accent />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
