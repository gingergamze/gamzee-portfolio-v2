// Plain section: a title and text under it, same look as the Process header.
export default function TextSection({ title, paragraphs }) {
  return (
    <section style={{ maxWidth: '1600px', margin: '0 auto', padding: 'clamp(160px,26vh,280px) var(--cs-x) 0' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px,2.4vw,32px)', zoom: 1,
        lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1C1917', margin: '0 0 calc(18px - 0.05em)',
      }}>
        {title}
      </h2>
      <div style={{ maxWidth: '44rem' }}>
        {paragraphs.map((t, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-work-sans)', fontSize: 'clamp(16px,1.4vw,18px)', lineHeight: 1.7,
            letterSpacing: '-0.005em', color: '#554E48', margin: i ? '1em 0 0' : 0,
          }}>{t}</p>
        ))}
      </div>
    </section>
  );
}
