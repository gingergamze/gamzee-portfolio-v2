// Magazine-style opening for case studies that start with a question
// (set `headline` in works.js): big bold question, then the tagline as the deck.

const FONT = 'var(--font-work-sans)';
const ASML_BLUE = '#0F238C'; // same blue as the prototype band

export default function CaseHeadline({ headline, tagline }) {
  // Non-breaking hyphen keeps "cost-effective" on one line
  const text = headline.replace('cost-effective', 'cost‑effective');
  return (
    <div>
      {/* A div, not an h2: the site's global h2 rule forces weight 500. */}
      <div role="heading" aria-level={2} style={{
        fontFamily: FONT, fontWeight: 700, color: '#1C1917', margin: 0,
        fontSize: 'clamp(40px,6vw,88px)', lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: '14ch',
      }}>
        {text.split(/(ASML)/).map((part, i) => (part === 'ASML' ? <span key={i} style={{ color: ASML_BLUE }}>{part}</span> : part))}
      </div>
      {tagline && (
        <p style={{
          fontFamily: FONT, fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.55, color: '#554E48',
          margin: 0, marginTop: 32, maxWidth: '46ch',
        }}>
          {tagline}
        </p>
      )}
    </div>
  );
}
