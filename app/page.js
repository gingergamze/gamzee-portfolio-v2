'use client';

import { useState, useEffect } from 'react';
import ChatWidget from './ChatWidget';

const ACCENT = '#B4470E';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* TOP MASK — hides content scrolling up behind the floating navbar (only once scrolled) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '104px',
        background: '#F7F4EF',
        zIndex: 99,
        opacity: scrolled ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      {/* NAVBAR */}
      <div style={{
        position: 'fixed', top: '20px', left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)', maxWidth: '2000px', zIndex: 100,
      }}>
        <nav style={{
          background: scrolled ? 'rgba(247,244,239,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          border: scrolled ? '0.3px solid rgba(28,25,23,0.12)' : '0.3px solid rgba(28,25,23,0.15)',
          borderRadius: '14px',
          padding: '14px clamp(10px, 3vw, 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled ? '0 2px 20px rgba(28,25,23,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', paddingLeft: '0px' }}>
            <img src="/sun.png" alt="Gamze" className="sun-spin" style={{ borderRadius: '10px', width: '44px', height: '44px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
              <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontWeight: 800, fontSize: '14px', color: '#1C1917', lineHeight: 1, letterSpacing: '0.01em' }}>GAMZE BOZKURT</div>
              <div className="nav-subtitle" style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', color: '#7C756E', letterSpacing: '0.02em', lineHeight: 1.3 }}>Product Designer &amp; Strategist</div>
            </div>
          </a>
          <div className="nav-contact-wrap" style={{ display: 'flex', gap: '8px', alignItems: 'center', alignSelf: 'flex-start', marginTop: '6px' }}>
            <a href="/contact" className="nav-contact" style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', fontWeight: 600, color: '#1C1917', textDecoration: 'none', padding: '8px 4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Contact</a>
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
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedMetadata={(e) => { e.target.playbackRate = 0.25; }}
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
          <source src="/sunn.mp4" type="video/mp4" />
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
          <p className="hero-kicker" style={{
            margin: '0 0 32px',
            marginLeft: '-2px',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 900,
            fontSize: 'clamp(24px, 7vw, 90px)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#d04d03',
          }}>
            Design & strategy
          </p>
          <h1 className="hero-headline" style={{
            margin: -3,
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(20px, 9vw, 60px)',
            lineHeight: 0.99,
            letterSpacing: '-0.045em',
            color: '#1C1917',
          }}>
            For complex workflows and data-rich products <br />
            
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
        borderRadius: '4px 4px 0 0',
        border: '0.4px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -8px 40px rgba(28,25,23,0.15)',
      }}>
        {/* Single left-aligned column: heading on top, text stacked below */}
        <div style={{
          padding: 'clamp(80px,14vh,160px) clamp(24px,5vw,72px) clamp(120px,24vh,280px)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(20px, 9vw, 60px)',
            lineHeight: 0.99,
            letterSpacing: '-0.045em',
            color: '#1C1917',
            margin: '0 0 40px',
          }}>
            What I do
          </h2>

          <p style={{
            fontSize: 'clamp(18px,2vw,11px)',
            lineHeight: 1.5,
            color: '#1C1917',
            margin: '0 0 32px',
            maxWidth: '152ch',
          }}>
            I find where products and workflows underperform. Then I fix them where it costs the business. 
          </p>

          
          
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
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px) clamp(16px,3vh,32px)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0' }}>

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(20px, 9vw, 60px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.99,
            color: '#1C1917',
            margin: '0 0 40px',
          }}>
            Selected Work
          </h2>

        </div>
      </section>

      {/* WORK SHOWCASE — 3 big media frames with descriptions */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        background: '#F7F4EF',
        padding: 'clamp(16px,3vh,32px) clamp(24px,5vw,72px) clamp(60px,10vh,120px)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(60px,10vh,120px)' }}>

          {/* ---- FRAME 1 ---- */}
          <div>
            {/* MEDIA — replace the inner placeholder with <img src="/your-image.jpg" .../> or a <video> */}
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '14px',
              border: '1px solid rgba(28,25,23,0.15)',
              background: 'rgba(28,25,23,0.04)',
              overflow: 'hidden',
              display: 'grid',
              placeItems: 'center',
              marginBottom: '24px',
            }}>
              <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C756E' }}>Image / Video 1</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontWeight: 600,
              fontSize: 'clamp(22px,4vw,34px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#1C1917',
              margin: '0 0 12px',
            }}>
              Project title one
            </h3>
            <p style={{
              fontSize: 'clamp(15px,2vw,18px)',
              lineHeight: 1.55,
              color: '#3D3631',
              margin: 0,
              maxWidth: '60ch',
            }}>
              A short description of the project — the problem, what you designed, and the outcome. Replace this with your own words.
            </p>
          </div>

          {/* ---- FRAME 2 ---- */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '14px',
              border: '1px solid rgba(28,25,23,0.15)',
              background: 'rgba(28,25,23,0.04)',
              overflow: 'hidden',
              display: 'grid',
              placeItems: 'center',
              marginBottom: '24px',
            }}>
              <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C756E' }}>Image / Video 2</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontWeight: 600,
              fontSize: 'clamp(22px,4vw,34px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#1C1917',
              margin: '0 0 12px',
            }}>
              Project title two
            </h3>
            <p style={{
              fontSize: 'clamp(15px,2vw,18px)',
              lineHeight: 1.55,
              color: '#3D3631',
              margin: 0,
              maxWidth: '60ch',
            }}>
              A short description of the project — the problem, what you designed, and the outcome. Replace this with your own words.
            </p>
          </div>

          {/* ---- FRAME 3 ---- */}
          <div>
            <div style={{
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '14px',
              border: '1px solid rgba(28,25,23,0.15)',
              background: 'rgba(28,25,23,0.04)',
              overflow: 'hidden',
              display: 'grid',
              placeItems: 'center',
              marginBottom: '24px',
            }}>
              <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C756E' }}>Image / Video 3</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontWeight: 600,
              fontSize: 'clamp(22px,4vw,34px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#1C1917',
              margin: '0 0 12px',
            }}>
              Project title three
            </h3>
            <p style={{
              fontSize: 'clamp(15px,2vw,18px)',
              lineHeight: 1.55,
              color: '#3D3631',
              margin: 0,
              maxWidth: '60ch',
            }}>
              A short description of the project — the problem, what you designed, and the outcome. Replace this with your own words.
            </p>
          </div>

          {/* ---- METADATA BAR — moved here, under the last case study ---- */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(48px,8vw,48px) clamp(24px,4vw,48px)',
            borderTop: '0.5px solid rgba(28,25,23,0.2)',
            paddingTop: 'clamp(40px,6vh,64px)',
          }}>
            

            {/* PROBLEMS I SOLVE */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: 'clamp(12px, 4vw, 40px)' }}>TOP Problems I Solve</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Slow Decisions, Wasted Time ', 'Poor Information Hierarchy', 'Low Data Trust '].map(t => (
                  <span key={t} style={{ fontSize: '15px', color: '#1C1917' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* FOCUSED PRODUCTS — tag boxes */}
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: 'clamp(12px, 4vw, 40px)' }}>Focused Products</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Enterprise', , 'Data-heavy internal applications', 'operational softwares', 'B2B platforms for professional users', 'Workflow and decision-making softwares'].map(tag => (
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