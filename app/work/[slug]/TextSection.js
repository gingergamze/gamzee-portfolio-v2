// Plain section: a title, then the text under it. With a photo, the text sits
// in a narrow column on the left and the photo on the right, next to it.
const body = {
  fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7,
  letterSpacing: '-0.005em', color: '#554E48',
};

export default function TextSection({ title, paragraphs, image }) {
  const text = paragraphs.map((t, i) => typeof t === 'object' ? (
    <h3 key={i} style={{
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', lineHeight: 1.2,
      letterSpacing: '-0.01em', color: '#1C1917', margin: '40px 0 12px', zoom: 1,
    }}>{t.sub}</h3>
  ) : (
    <p key={i} style={{ ...body, margin: i ? '1em 0 0' : 0 }}>
      {t.split('**').map((part, j) => (j % 2 ? <strong key={j} style={{ fontWeight: 700, color: '#1C1917' }}>{part}</strong> : part))}
    </p>
  ));

  return (
    <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(96px,14vh,160px) var(--cs-x) clamp(32px,5vh,56px)' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', zoom: 1,
        lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1917', margin: '0 0 calc(18px - 0.05em)',
      }}>
        {title}
      </h2>
      {image ? (
        <div className="ts-split" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0,26rem) minmax(0,1fr)',
          columnGap: 'clamp(32px,5vw,72px)', alignItems: 'start',
        }}>
          <style>{`@media (max-width:900px){.ts-split{grid-template-columns:minmax(0,1fr)!important;row-gap:32px}}`}</style>
          <div>{text}</div>
          <figure style={{ margin: 0, maxWidth: '37rem', justifySelf: 'end', width: '100%' }}>
            <img src={image.src} alt={image.alt ?? ''} loading="lazy" style={{
              display: 'block', width: '100%', height: 'auto', borderRadius: '16px', background: '#F1EEE8',
            }} />
            {image.caption && (
              <figcaption style={{
                marginTop: '12px', textAlign: 'center', fontFamily: 'var(--font-work-sans)', fontSize: '14px',
                lineHeight: 1.4, letterSpacing: '-0.005em', color: '#7C756E',
              }}>
                {image.caption}
              </figcaption>
            )}
          </figure>
        </div>
      ) : (
        <div style={{ maxWidth: '44rem' }}>{text}</div>
      )}
    </section>
  );
}
