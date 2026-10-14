'use client';

// Footer at the end of every case study page: same format as the homepage
// footer (links, a thin rule, then the copyright line).
const FONT = 'var(--font-work-sans)';
const LINKEDIN = 'https://www.linkedin.com/in/gamze-serviceandproductdesignstrategist/';

const linkStyle = {
  fontFamily: FONT, fontSize: 13, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase',
  color: 'rgba(28,25,23,0.6)', textDecoration: 'none', background: 'none', border: 0, padding: 0, cursor: 'pointer',
};

export default function CaseStudyFooter() {
  return (
    <footer style={{ marginTop: 'clamp(56px,8vh,104px)' }}>
      <div style={{
        maxWidth: 1600, margin: '0 auto', padding: 'clamp(32px,5vh,56px) var(--cs-x)',
        borderTop: '0.5px solid rgba(28,25,23,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <button type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))} style={linkStyle}>
            Contact
          </button>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
        </div>
        <div style={{
          width: '100%', paddingTop: 20, borderTop: '0.5px solid rgba(28,25,23,0.15)', textAlign: 'center',
          fontFamily: FONT, fontSize: 12, color: 'rgba(28,25,23,0.45)',
        }}>
          © 2026 Gamze Bozkurt — made with curiosity
        </div>
      </div>
    </footer>
  );
}
