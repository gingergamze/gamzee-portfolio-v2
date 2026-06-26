'use client';

import ChatWidget from './ChatWidget';

const ACCENT = '#B4470E';

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <div style={{
        position: 'fixed', top: '20px', left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)', maxWidth: '2000px', zIndex: 100,
      }}>
        <nav style={{
          background: 'rgba(247,244,239,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '0.5px solid rgba(28,25,23,0.12)',
          borderRadius: '18px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 20px rgba(28,25,23,0.06)',
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', paddingLeft: '20px' }}>
            <img src="/sun.png" alt="Gamze" className="sun-spin" style={{ borderRadius: '10px', width: '44px', height: '44px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
              <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontWeight: 800, fontSize: '14px', color: '#1C1917', lineHeight: 1, letterSpacing: '0.01em' }}>GAMZE BOZKURT</div>
              <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', color: '#7C756E', letterSpacing: '0.02em', lineHeight: 1 }}>Product Designer & Strategist</div>
            </div>
          </a>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="/contact" style={{ fontSize: '12px', fontWeight: 600, color: '#1C1917', textDecoration: 'none', padding: '8px 4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Contact</a>
          </div>
        </nav>
      </div>

      {/* HERO */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        minHeight: '100vh',
        background: '#F7F4EF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(140px,20vh,200px) clamp(24px,5vw,72px) clamp(160px,24vh,320px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

        {/* ===== HERO BACKGROUND VIDEO — lives only in the hero ===== */}
        {/* ===== HERO BACKGROUND VIDEO — lives only in the hero ===== */}
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={(e) => { e.target.playbackRate = 0.5; }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',   // fills the hero; try 'contain' to show whole video
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/sunvid-compressed.mp4" type="video/mp4" />
        </video>

        {/* ===== Cloud Dancer wash so text stays readable ===== */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(247,244,239,0.55)',  // 👈 last number = wash strength (0 = none, 1 = solid)
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* Scroll down cue — bottom left of hero */}
        <div className="scroll-cue" style={{
          position: 'absolute',
          zIndex: 1,
          left: 'clamp(24px,5vw,72px)',
          bottom: 'clamp(48px,10vh,120px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div className="scroll-arrow" style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            border: '0.5px solid rgba(28,25,23,0.2)',
            display: 'grid',
            placeItems: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V13M8 13L3.5 8.5M8 13L12.5 8.5" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#1C1917',
          }}>
            Scroll Down
          </span>
        </div>

        {/* Kicker + headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            margin: '0 0 32px',
            marginLeft: '2px',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 900,
            fontSize: 'clamp(13px, 1.4vw, 24px)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#d04d03',
          }}>
            Design & strategy
          </p>
          <h1 style={{
            margin: -3,
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(40px, 9vw, 100px)',
            lineHeight: 0.99,
            letterSpacing: '-0.045em',
            color: '#1C1917',
          }}>
            For complex workflows<br />
            and data-rich products
          </h1>
        </div>
      </header>

      {/* ABOUT — now STICKY so Projects scrolls up over it */}
      <section style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        marginTop: 0,
        background: '#F7F4EF',
        borderRadius: '8px 8px 0 0',
        border: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -8px 40px rgba(28,25,23,0.15)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(32px,6vw,100px)',
          alignItems: 'center',
          padding: 'clamp(140px,28vh,320px) clamp(24px,5vw,72px) clamp(140px,28vh,320px)',
        }}>
          {/* LEFT — big title ABOUT ME SECTION COLOR */}
          <div>
          <h2 style={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontWeight: 600,
              fontSize: 'clamp(40px, 9vw, 100px)',
              lineHeight: 0.99,
              letterSpacing: '-0.045em',
              color: '#1C1917',
              margin: 0,
            }}>
              What I do
            </h2>
          </div>

          {/* RIGHT — paragraph + tagline */}
          <div style={{ paddingTop: '8px' }}>
            <p style={{
              fontSize: 'clamp(18px,2vw,26px)',
              lineHeight: 1.5,
              color: '#3D3631',
              margin: '0 0 40px',
              maxWidth: '52ch',
            }}>
              I find where products and workflows underperform and I fix them where it costs the business.
            </p>

            <p style={{
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#7C756E',
              fontWeight: 600,
              margin: '0 0 24px',
            }}>
              Enterprise — B2B — SaaS — Internal Tools
            </p>

          </div>
        </div>
      </section>

      {/* PROJECTS — scrolls up over the sticky About */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        marginTop: 'clamp(-60px,-8vh,-40px)',
        background: '#F7F4EF',
        borderRadius: '8px 8px 0 0',
        borderTop: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -8px 40px rgba(28,25,23,0.15)',
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0' }}>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(40px, 9vw, 100px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.99,
            color: '#1C1917',
            margin: '0 0 40px',
          }}>
            Selected Work
          </h2>

          {/* Metadata bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(24px,4vw,48px)',
            borderTop: '0.5px solid rgba(28,25,23,0.2)',
            paddingTop: '40px',
          }}>
            {/* TIMEFRAME */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: '40px' }}>Timeframe</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '15px', color: '#1C1917' }}>Year 2022–26</span>
              </div>
            </div>

            {/* DISCIPLINE */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: '40px' }}>Discipline</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['UX Design', 'UX Research', 'Systems Thinking', 'Strategy'].map(d => (
                  <span key={d} style={{ fontSize: '15px', color: '#1C1917' }}>{d}</span>
                ))}
              </div>
            </div>

            {/* TOOLS */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: '40px' }}>Tools</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Figma', 'Spotfire', 'Cursor', 'Notion'].map(t => (
                  <span key={t} style={{ fontSize: '15px', color: '#1C1917' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* FOCUSED PRODUCTS — tag boxes */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: '40px' }}>Focused Products</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Enterprise', 'Complex software', 'Data-heavy internal applications', 'operational software', 'B2B platforms for professional users', 'Workflow and decision-making software'].map(tag => (
                  <span key={tag} style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#1C1917',
                    border: '1px solid rgba(28,25,23,0.85)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#F7F4EF', padding: 'clamp(40px,6vh,72px) clamp(20px,5vw,72px) 0', position: 'relative', zIndex: 2 }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
          
          <div style={{ display: 'flex', gap: '24px' }}>
            {[['mailto:gamze@gamzee.nl', 'Email'], ['#', 'LinkedIn']].map(([href, label]) => (
              <a key={label} href={href} style={{ fontSize: '13px', color: 'rgba(28,25,23,0.5)', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: '1280px', margin: '32px auto 0', paddingTop: '24px', paddingBottom: '32px', borderTop: '0.5px solid rgba(28,25,23,0.1)', textAlign: 'center', fontSize: '12px', color: 'rgba(28,25,23,0.35)' }}>
          © 2026 Gamze Bozkurt — made with curiosity
        </div>
      </footer>

      <ChatWidget />
    </>
  );
}