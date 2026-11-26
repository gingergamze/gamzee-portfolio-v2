import SiteNav from '../SiteNav';

export const metadata = {
  title: 'Path',
  description: 'My evolution and direction: from Product Designer & Researcher to Head of Product Design & Strategy.',
};

const F = 'var(--font-work-sans)';
const INK = '#1C1917';

const COLUMNS = [
  {
    title: 'Product Designer & Researcher',
    years: '2021 – 2024',
    ink: '#2F45A0',
    bg: '#E4E9FB',
    items: [
      'UI/UX design',
      ['Spread user-centred approach', '& design thinking'],
      'UX work facilitation',
      'Usability tests',
      ['Get requirements', 'with UX methods'],
      'Prototyping',
      'Work in ambiguous projects',
      ['Storytelling of design impact', 'to management'],
      ['Differentiate', 'what’s a problem and what’s not'],
    ],
  },
  {
    title: 'Product Designer Team Lead & Project Lead',
    years: '2024 – 2026',
    ink: '#9A3A06',
    bg: '#FFE3D1',
    items: [
      'Lead a small product team',
      ['ROI thinking', 'Business impact of design decisions'],
      ['Monitor product performance', 'and report to CEO'],
      ['KPI definition', 'and connect them to business'],
      'Product scope management',
      'Timeline planning',
      'Product roadmap ownership',
      ['Responsible', 'for product evolution'],
      'Prioritisation',
      'AI design with tools',
    ],
  },
  {
    title: 'Head of Product Design & Strategy',
    years: '2027 →',
    ink: '#0A6A5F',
    bg: '#CFEFEA',
    items: [
      ['Lead a bigger team', 'with more business metrics'],
      ['Grow in leadership', 'while staying creative'],
      ['Build growth culture', 'in my team'],
      ['Challenge more people', 'and get challenged'],
      ['AI literacy & fluency', 'and new UX of AI'],
      ['Build frameworks', 'for human-AI coordination'],
      ['Highly contribute', 'to company’s revenue'],
      ['Impact', 'on more varied user groups'],
    ],
  },
];

const Stairs = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="17" cy="8" r="3.2" fill={INK} />
    <path d="M16 13l-3 10 6 5-1 9" />
    <path d="M16 14l7 6" />
    <path d="M13 23l-6 6" />
    <path d="M19 28l5 4" />
    <path d="M4 44h8v-8h8v-8h8v-8h8" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 160 40" width="100%" style={{ maxWidth: 150, display: 'block', margin: '0 auto' }} fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 24C40 8 100 6 148 26" />
    <path d="M132 25l17 2-9-14" transform="translate(-2 -2)" />
  </svg>
);

const Plus = () => (
  <svg viewBox="0 0 40 40" width="44" height="44" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
    <path d="M20 5v30M5 21h30" />
  </svg>
);

export default function PathPage() {
  return (
    <>
      <SiteNav variant="static" />
      <main style={{ background: '#FFFFFF', padding: 'clamp(28px,5vw,64px) var(--cs-x, 24px) clamp(48px,8vw,96px)', fontFamily: F, color: INK }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(34px,5.4vw,76px)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 clamp(24px,4vw,56px)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0 0.3em', zoom: 1 }}>
            PATH <span style={{ display: 'inline-flex' }}><Stairs size={56} /></span>
          </h1>

          <div className="evo-grid">
            {COLUMNS.map((c, ci) => (
              <div key={c.title} style={{ display: 'contents' }}>
                <div className={`evo-head evo-c${ci}`}>
                  {ci === 2 && <div className="evo-headstairs"><Stairs size={56} /></div>}
                  <h2 className="evo-title" style={{ fontFamily: F, fontWeight: 500, lineHeight: 1.3, margin: 0, zoom: 1 }}>{c.title}</h2>
                  <div className="evo-years" style={{ color: c.ink, borderColor: c.ink, background: c.bg }}>{c.years}</div>
                </div>
                {ci < 2 && <div className={`evo-gap evo-g${ci}`} />}
              </div>
            ))}
            <div className="evo-rule" />
            {COLUMNS.map((c, ci) => (
              <div key={c.title} style={{ display: 'contents' }}>
                <ul className={`evo-list evo-c${ci}`} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {c.items.map((item) => {
                    const [main, sub] = Array.isArray(item) ? item : [item];
                    return (
                    <li key={main} className="evo-pill" style={{ background: c.bg, borderRadius: 999, padding: '0 18px', textAlign: 'center', lineHeight: 1.25, marginBottom: 14 }}>
                      <span className="evo-main">{main}</span>
                      {sub && <span className="evo-sub">{sub}</span>}
                    </li>
                    );
                  })}
                </ul>
                {ci < 2 && (
                  <div className={`evo-conn evo-k${ci}`}>
                    {ci === 1 && <div className="evo-connstairs"><Stairs size={56} /></div>}
                    <Arrow />
                    <div style={{ height: 22 }} />
                    <Plus />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <style>{`
        .evo-pill{height:64px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center}
        .evo-main{font-size:clamp(14px,1.18vw,17px);font-weight:700;letter-spacing:-.005em}
        .evo-sub{font-size:clamp(12.5px,.98vw,14px);font-weight:400;color:#554E48;margin-top:3px}
        .evo-pill{box-shadow:0 3px 6px rgba(28,25,23,.10);transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s ease}
        @media (hover:hover){.evo-pill:hover{transform:translateY(-5px) scale(1.04);box-shadow:0 12px 22px rgba(28,25,23,.18)}}
        @media (prefers-reduced-motion:reduce){.evo-pill{transition:none}.evo-pill:hover{transform:none}}
        @media (min-width:900px) and (max-width:1199px){.evo-pill{height:82px}}
        .evo-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.4fr) minmax(0,1fr) minmax(0,.4fr) minmax(0,1fr);column-gap:0;align-items:start}
        .evo-head{padding:0 0 22px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;position:relative}
        .evo-c0.evo-head{grid-column:1}.evo-c1.evo-head{grid-column:3}.evo-c2.evo-head{grid-column:5}
        .evo-title{font-size:clamp(17px,1.7vw,24px);min-height:2.6em}
        .evo-years{margin-top:9px;font-size:11px;font-weight:700;letter-spacing:.08em;line-height:1;padding:5px 11px;border-radius:999px;border:1.5px solid;white-space:nowrap}
        @media (min-width:1200px){.evo-title{font-size:min(1.25vw,21px);min-height:0;white-space:nowrap}}
        .evo-rule{grid-column:1 / -1;height:3px;background:#E4DED6;margin:0 0 34px}
        .evo-list.evo-c0{grid-column:1}.evo-list.evo-c1{grid-column:3}.evo-list.evo-c2{grid-column:5}
        .evo-gap{display:none}
        .evo-conn{display:flex;flex-direction:column;align-items:center;justify-content:center;align-self:stretch;position:relative;padding:0 10px}
        .evo-k0{grid-column:2}.evo-k1{grid-column:4}
        .evo-connstairs{position:absolute;top:8%}
        .evo-headstairs{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:6px}
        .evo-grid{padding-top:60px}
        @media (max-width:899px){
          .evo-grid{display:flex;flex-direction:column}
          .evo-head{padding:0 0 14px}
          .evo-rule{display:none}
          .evo-list{width:100%}
          .evo-conn{padding:6px 0 22px}
          .evo-conn svg:first-of-type{transform:rotate(90deg);max-width:70px !important;margin:6px auto}
          .evo-connstairs{display:none}
          .evo-title{min-height:0}.evo-years{margin-top:9px}
          .evo-head{margin-top:6px;min-height:0;align-items:flex-start;text-align:left}.evo-grid{padding-top:0}.evo-headstairs{position:static;transform:none}
          .evo-head.evo-c0{order:0}.evo-list.evo-c0{order:1}.evo-k0{order:2}.evo-head.evo-c1{order:3}.evo-list.evo-c1{order:4}.evo-k1{order:5}.evo-head.evo-c2{order:6}.evo-list.evo-c2{order:7}
        }
      `}</style>
    </>
  );
}
