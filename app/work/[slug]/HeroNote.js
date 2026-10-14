// Confidentiality notice under the hero visual: a rounded box, centred text,
// first sentence emphasised, the rest in a lighter colour.
export default function HeroNote({ text, maxWidth = 900 }) {
  const [first, ...rest] = text.split(/(?<=\.)\s+/).filter(Boolean);
  return (
    <div style={{
      maxWidth, margin: 'clamp(20px,3vh,28px) auto 0', padding: '16px 24px', borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)',
      color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-work-sans)', fontSize: 14, lineHeight: 1.6,
      textAlign: 'center',
    }}>
      <p style={{
        margin: 0, color: '#fff', fontWeight: 600, fontSize: 15,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span>{first}</span>
      </p>
      <p style={{ margin: '2px 0 0' }}>{rest.join(' ')}</p>
    </div>
  );
}
