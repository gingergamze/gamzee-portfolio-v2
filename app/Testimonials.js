'use client';

const ACCENT = '#B4470E';
const INK = '#1C1917';
const SOFT = 'rgba(28,25,23,0.6)';
const FONT = 'var(--font-work-sans)';
const LINKEDIN_BLUE = '#0A66C2';

const T = [
  { name: 'Sylvain Sturtewagen', role: 'Process Architect', photo: '/people/sylvain.png', logo: '/asmllogo.png', logoH: 16, company: 'ASML', rel: 'Worked with Gamze on the same team',
    text: 'Gamze is a passionate UX designer, customer focused and open for learning the environment to maximize the user experience. She knows how to ask the right questions, being able to translate the requirements into application designers language.' },
  { name: 'Ruud Zandbergen', role: 'Team Lead Human Data Interaction (HDI)', photo: '/people/ruud.png', logo: '/brightcape.png', logoH: 30, company: 'Bright Cape', rel: 'Managed Gamze directly',
    text: 'Gamze is a very social person and good team player. She is naturally curious which helps her in her UX research work to ask a lot of good questions and is able to form good relationships with an organization and key users.' },
  { name: 'Sam Vonk', role: 'Lead Consultant', photo: '/people/sam.png', logo: '/brightcape.png', logoH: 30, company: 'Bright Cape', rel: 'Worked with Gamze on the same team',
    text: 'Gamze is able to think along with others and can convert user research to ideas and ideas to prototypes very well. She has up-to-date domain knowledge about UX and is familiar with a lot of methods. Next to this, she is kind and interested, which makes it always nice to work with Gamze.' },
];

export default function Testimonials() {
  return (
    <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(48px,7vh,88px) var(--page-x)', background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontSize: 13, color: SOFT, letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>Recommended on LinkedIn</div>
          <a href="https://www.linkedin.com/in/gamze-serviceandproductdesignstrategist/details/recommendations/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: LINKEDIN_BLUE, fontWeight: 600, textDecoration: 'none' }}>See all on LinkedIn →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 20, marginTop: 24 }}>
          {T.map((t) => (
            <figure key={t.name} style={{ margin: 0, padding: 24, borderRadius: 12, background: '#fff', boxShadow: '0 1px 2px rgba(28,25,23,0.08), 0 8px 24px rgba(28,25,23,0.06)', border: '0.7px solid rgba(28,25,23,0.08)' }}>
              <figcaption style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
                <img src={t.photo} alt={t.name} width="52" height="52" style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flex: 'none', display: 'block', background: '#F4F1EA' }} />
                <div style={{ lineHeight: 1.35, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: INK }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: SOFT }}>{t.role}</div>
                </div>
                {t.logo && <img src={t.logo} alt={t.company} style={{ height: t.logoH, width: 'auto', display: 'block', marginLeft: 'auto', flex: 'none' }} />}
              </figcaption>
              <div style={{ fontSize: 12, color: SOFT, marginBottom: 14 }}>{t.rel}</div>
              <blockquote style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.6, color: INK, margin: 0 }}>{t.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
