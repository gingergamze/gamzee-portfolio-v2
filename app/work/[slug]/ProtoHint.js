// Small hint above the clickable prototype: a pulsing orange dot and one line
// of text, so it reads as "live" without looking like a button.
export default function ProtoHint() {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
      fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em',
      color: 'rgba(255,255,255,0.85)',
    }}>
      <span aria-hidden="true" style={{
        width: 8, height: 8, borderRadius: '50%', background: '#FFA066',
        animation: 'hintPulse 1.8s ease-out infinite',
      }} />
      Click through the prototype
      <style>{`@keyframes hintPulse{0%{box-shadow:0 0 0 0 rgba(255,160,102,.6)}100%{box-shadow:0 0 0 10px rgba(255,160,102,0)}}@media (prefers-reduced-motion:reduce){@keyframes hintPulse{0%,100%{box-shadow:none}}}`}</style>
    </div>
  );
}
