'use client';

import { useState, useEffect, useRef } from 'react';
import ChatWidget from './ChatWidget';

const ACCENT = '#B4470E';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const cardRefs = useRef([]);
  const [activeCard, setActiveCard] = useState(0);
  const [activeWork, setActiveWork] = useState(0);

  const works = [
    { title: 'Sintek Procurement Platform', role: 'Lead Product Designer', year: '2025', domain: 'Enterprise', desc: 'An enterprise-grade internal procurement and supply-chain platform. Consolidated fragmented vendor data into one operational source of truth.', tags: ['Enterprise', 'Supply chain', 'Internal tooling'], type: 'image', media: '/asmltest.jpg' },
    { title: 'ASML Similarity Model', role: 'Product Designer', year: '2024', domain: 'Data tooling', desc: 'Redesigned an internal TIBCO Spotfire tool into a modern decision app for platform engineers, cutting review cycles.', tags: ['Data tooling', 'Spotfire', 'Decision support'], type: 'video', media: '/A1.mp4' },
    { title: 'Project title three', role: 'Role', year: 'Year', domain: 'Domain', desc: 'A short description of the project — the problem, what you designed, and the outcome.', tags: ['Tag one', 'Tag two'], type: 'image', media: '/project-three.png' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-driven scale/fade/tilt for the stacking cards
  useEffect(() => {
    const STICK_TOP = 120;
    const MIN_SCALE = 0.88;
    const MIN_OPACITY = 0.55;
    const MAX_TILT = 8; // degrees the card tilts back as it recedes

    const onScroll = () => {
      const cards = cardRefs.current.filter(Boolean);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) {
          card.style.transform = 'perspective(1600px) rotateX(0deg) scale(1)';
          card.style.opacity = '1';
          return;
        }
        const nextTop = next.getBoundingClientRect().top;
        const start = window.innerHeight;
        const end = STICK_TOP + 20;
        let p = (start - nextTop) / (start - end);
        p = Math.max(0, Math.min(1, p));
        const scale = 1 - (1 - MIN_SCALE) * p;
        const opacity = 1 - (1 - MIN_OPACITY) * p;
        const tilt = MAX_TILT * p;
        card.style.transform = `perspective(1600px) rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.opacity = opacity.toFixed(3);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Reveal elements on scroll into view (fade + rise)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  const cardShell = {
    position: 'sticky',
    top: '120px',
    background: '#EDE8DF',
    border: '1px solid rgba(28,25,23,0.11)',
    borderRadius: '16px',
    boxShadow: '0 -6px 28px rgba(28,25,23,0.10)',
    overflow: 'hidden',
    transformOrigin: 'center top',
    willChange: 'transform, opacity',
    transition: 'transform 0.1s linear, opacity 0.1s linear',
  };

  const peekStrip = {
    padding: '18px clamp(24px,4vw,56px)',
    borderBottom: '1px solid rgba(255,255,255,0.10)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const mediaBox = {
    width: '100%',
    maxWidth: '460px',
    aspectRatio: '1 / 1',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(28,25,23,0.04)',
    overflow: 'hidden',
    display: 'grid',
    placeItems: 'center',
    marginBottom: '28px',
  };

  const titleStyle = {
    fontFamily: 'var(--font-plus-jakarta-sans)',
    fontWeight: 600,
    fontSize: 'clamp(18px,3vw,28px)',
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    color: '#1C1917',
    margin: '0 0 14px',
  };

  const descStyle = {
    fontSize: 'clamp(13px,1.5vw,16px)',
    lineHeight: 1.55,
    color: '#3D3631',
    margin: 0,
    maxWidth: '72ch',
  };

  const stripLabel = { fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C756E' };
  const stripTag = { fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#d04d03' };
  const mediaLabel = { fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '13px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7C756E' };

  const cards = [
    { n: '01', name: 'Sintek Procurement Platform', title: 'Sintek Procurement Platform', type: 'image', media: '/asmltest.jpg' },
    { n: '02', name: 'ASML Similarity Model', title: 'ASML Similarity Model', type: 'video', media: '/A1.mp4' },
    { n: '03', name: 'Project title three', title: 'Project title three', type: 'image', media: '/project-three.png' },
  ];

  // Per-photo framing: fit = 'cover' (fills, crops) or 'contain' (whole photo, no crop)
  //                    pos = 'center top' / 'center center' / 'center 30%' etc. (only affects 'cover')
  const stories = [
    { img: '/bg.png', label: 'Path so far', fit: 'cover', pos: '45% 1%', zoom: 1.19, text: 'Worked in a bank, data consultancy company and Small Medium Company' },
    { img: '/amsterdam.jpeg', label: 'Feels Home', fit: 'cover', pos: 'center center', text: 'Dutch citizen and living in Amsterdam' },
    { img: '/propic.png', label: 'Background', fit: 'cover', pos: 'center 20%', zoom: 1.7, text: 'Communication, Business Management and Data Driven Design' },
    { img: '/board.png', label: 'Specialization', fit: 'cover', pos: '3% top', zoom: 1.3, text: 'Improving operational processes by tailor made digital solutions, managing product teams and roadmaps' },
    { img: '/ofis.JPG', label: 'Like Fixing', fit: 'cover', pos: 'center 10%', text: 'Organizations struggling with complex processes, poor cross-functional collaboration, inefficient workflows' },
  ];

  return (
    <>
      {/* TOP MASK */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '104px',
        background: '#FCF7EB',
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
          background: scrolled ? 'rgba(252,247,235,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          border: scrolled ? '0.3px solid rgba(28,25,23,0.12)' : '0.3px solid rgba(28,25,23,0.15)',
          borderRadius: '14px',
          padding: '14px clamp(10px, 0.7vw, 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled ? '0 2px 20px rgba(28,25,23,0.06)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          <a href="#" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', paddingLeft: '0px' }}>
            <img src="/sun.png" alt="Gamze" className="sun-spin" style={{ borderRadius: '10px', width: '44px', height: '44px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
              <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontWeight: 800, fontSize: '14px', color: '#1C1917', lineHeight: 1, letterSpacing: '0.01em' }}>GAMZE BOZKURT</div>
              <div className="nav-subtitle" style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', color: '#7C756E', letterSpacing: '0.02em', lineHeight: 1.3 }}>Senior Product Designer &amp; Strategist</div>
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
        background: '#FCF7EB',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(140px,20vh,200px) clamp(24px,5vw,72px) clamp(160px,24vh,320px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
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
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/sunn.mp4" type="video/mp4" />
        </video>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(252,247,235,0.55)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

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
            For complex workflows and data-rich products
          </h1>
        </div>
      </header>

      {/* ABOUT */}
      <section style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        marginTop: 0,
        minHeight: '0vh',
        boxSizing: 'border-box',
        background: '#FCF7EB',
        borderRadius: '12px 12px 0 0',
        border: '0.4px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -5px 18px rgba(28,25,23,0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
      }}>
        <div style={{
          padding: 'clamp(80px,14vh,160px) clamp(24px,5vw,72px) clamp(120px,24vh,280px)',
        }}>
          <h2 className="reveal" style={{
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
          <p className="reveal" style={{
            fontSize: 'clamp(18px,2vw,20px)',
            lineHeight: 1.5,
            color: '#1C1917',
            margin: '0 0 32px',
            maxWidth: '152ch',
          }}>
            I find where products and workflows underperform. Then I fix them where it costs the business.
          </p>
        </div>

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
      </section>

      {/* PROJECTS HEADER */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        marginTop: 'clamp(-60px,-8vh,-40px)',
        background: '#FCF7EB',
        borderRadius: '12px 12px 0 0',
        borderTop: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -5px 18px rgba(28,25,23,0.10), inset 0 1px 0 rgba(255,255,255,0.55)',
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px) clamp(16px,3vh,32px)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0' }}>
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

      {/* WORK SHOWCASE — stacking cards that shrink and tilt as the next covers them */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        background: '#FCF7EB',
        padding: '0 clamp(24px,4vw,56px)',
      }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', perspective: '1600px' }}>

          {cards.map((c, i) => {
            const dark = c.dark;
            return (
              <div key={c.n} style={{ height: '100vh' }}>
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  style={{
                    ...cardShell,
                    zIndex: i + 1,
                    ...(dark && {
                      background: '#000000',
                      border: '1px solid rgba(255,255,255,0.12)',
                      boxShadow: '0 -6px 28px rgba(0,0,0,0.45)',
                    }),
                  }}
                >
                  <div style={{ ...peekStrip, ...(dark && { borderBottom: '1px solid rgba(255,255,255,0.12)' }) }}>
                    <span style={{ ...stripLabel, ...(dark && { color: 'rgba(255,255,255,0.6)' }) }}>{c.n} — {c.name}</span>
                    <span style={stripTag}>{c.tag}</span>
                  </div>
                  <div style={{ padding: 'clamp(12px,2vw,24px)' }}>
                    <div style={{ ...mediaBox, ...(dark && { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)' }) }}>
                      {c.type === 'video' ? (
                        <video src={c.media} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <img src={c.media} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      )}
                    </div>
                    <h3 style={{ ...titleStyle, ...(dark && { color: '#FFFFFF' }) }}>{c.title}</h3>
                    <p style={{ ...descStyle, ...(dark && { color: 'rgba(255,255,255,0.85)' }) }}>
                      A short description of the project — the problem, what you designed, and the outcome.
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ---- METADATA BAR ---- */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'clamp(48px,8vw,48px) clamp(24px,4vw,48px)',
            borderTop: '0.5px solid rgba(28,25,23,0.2)',
            padding: 'clamp(40px,6vh,64px) clamp(24px,4vw,56px) clamp(60px,10vh,120px)',
            marginTop: 'clamp(40px,6vh,64px)',
          }}>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: 'clamp(12px, 4vw, 40px)' }}>TOP Problems I Solve</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Slow decision-making, delayed decisions', 'Confusing information structures', 'Low confidence in business data'].map(t => (
                  <span key={t} style={{ fontSize: '15px', color: '#1C1917' }}>{t}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1C1917', fontWeight: 600, marginBottom: 'clamp(12px, 4vw, 40px)' }}>Focused Products</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Enterprise', 'Data-heavy internal applications', 'Operational softwares', 'B2B platforms for professional users', 'Workflow and decision-making softwares'].map(tag => (
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

      {/* SELECTED WORK — TABS VIEW (TRIAL — delete this whole section once you decide) */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        background: '#FFF8EB',
        borderTop: '2px dashed rgba(208,77,3,0.4)',
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px)',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d04d03', marginBottom: '40px' }}>
            ↑ Gallery above · Tabs view below — trial
          </div>
          <div className="worktabs" style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: 'clamp(24px,4vw,56px)', alignItems: 'start' }}>

            {/* Left rail — numbered tab cards */}
            <div className="worktabs-rail" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {works.map((w, i) => {
                const on = activeWork === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveWork(i)}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: '7px', width: '100%', textAlign: 'left',
                      cursor: 'pointer', padding: '16px 18px', borderRadius: '14px',
                      border: on ? '1px solid rgba(28,25,23,0.10)' : '1px solid transparent',
                      background: on ? '#FCF7EB' : 'transparent',
                      boxShadow: on ? '0 8px 24px rgba(28,25,23,0.08)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                      <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', fontWeight: 800, letterSpacing: '0.06em', color: on ? '#d04d03' : '#BEB29A' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, color: on ? '#1C1917' : '#7C756E' }}>{w.title}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: on ? '#A79B85' : '#BEB29A', paddingLeft: '27px' }}>{w.domain}</span>
                  </button>
                );
              })}
            </div>

            {/* Right panel — framed visual + text block */}
            <div key={activeWork} className="animate-fade-in">
              <div style={{
                position: 'relative', width: '100%', height: 'clamp(190px,30vh,320px)',
                borderRadius: '18px', overflow: 'hidden',
                border: '1px solid rgba(28,25,23,0.1)',
                boxShadow: '0 24px 56px rgba(28,25,23,0.14)',
                background: 'rgba(28,25,23,0.04)', marginBottom: '26px',
              }}>
                {works[activeWork].type === 'video' ? (
                  <video key={works[activeWork].media} src={works[activeWork].media} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={works[activeWork].media} alt={works[activeWork].title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  padding: '6px 13px', borderRadius: '999px',
                  background: 'rgba(28,25,23,0.82)',
                  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                }}>
                  <span style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#FFF8EB' }}>0{activeWork + 1} / 0{works.length}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d04d03' }}>
                  {works[activeWork].role} · {works[activeWork].year}
                </div>
                <a href="#" style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1C1917', textDecoration: 'none' }}>
                  View project →
                </a>
              </div>

              <h3 style={{ fontFamily: 'var(--font-plus-jakarta-sans)', fontWeight: 600, fontSize: 'clamp(20px,2.6vw,28px)', letterSpacing: '-0.035em', lineHeight: 1.05, color: '#1C1917', margin: '0 0 14px' }}>
                {works[activeWork].title}
              </h3>

              <p style={{ fontSize: 'clamp(14px,1.4vw,15px)', lineHeight: 1.6, color: '#3D3631', margin: '0 0 20px', maxWidth: '58ch' }}>
                {works[activeWork].desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {works[activeWork].tags.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-plus-jakarta-sans)', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6B635A',
                    border: '1px solid rgba(28,25,23,0.18)', borderRadius: '8px', padding: '7px 12px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME + FOOTER — shared video background */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        background: '#FCF7EB',
        borderRadius: '8px 8px 0 0',
        borderTop: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -8px 40px rgba(28,25,23,0.15)',
        overflow: 'hidden',
      }}>
        {/* Background video — spans About me AND footer */}
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
            objectFit: 'cover',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src="/sunn.mp4" type="video/mp4" />
        </video>

        {/* Readability wash */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(252,247,235,0.55)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        {/* About me content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0',
          padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px) clamp(80px,14vh,160px)',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-plus-jakarta-sans)',
            fontWeight: 600,
            fontSize: 'clamp(20px, 9vw, 60px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.99,
            color: '#1C1917',
            margin: '0 0 40px',
          }}>
            About
          </h2>
          <div style={{ minHeight: '5em', marginBottom: '40px' }}>
            <div style={{
              fontFamily: 'var(--font-plus-jakarta-sans)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#d04d03',
              marginBottom: '12px',
              transition: 'opacity 0.3s ease',
            }}>
              {stories[activeCard].label}
            </div>
            <p style={{
              fontSize: 'clamp(18px,2vw,20px)',
              lineHeight: 1.5,
              color: '#1C1917',
              margin: 0,
              maxWidth: 'none',
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s ease',
            }}>
              {stories[activeCard].text}
            </p>
          </div>

          {/* STORY DECK — pile fans both ways, active card centered */}
          <div style={{ position: 'relative', height: '280px', marginBottom: '20px', width: '260px', marginLeft: '80px' }}>
            {stories.map((card, i) => {
              const offset = i - activeCard;
              const abs = Math.abs(offset);
              return (
                <div
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className={offset === 0 && activeCard === 0 ? 'deck-nudge' : undefined}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '260px',
                    height: '260px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FCF7EB',
                    border: '1px solid rgba(28,25,23,0.12)',
                    boxShadow: offset === 0 ? '0 12px 34px rgba(28,25,23,0.18)' : '0 6px 20px rgba(28,25,23,0.10)',
                    transform: `translateX(${offset * 42}px) translateY(${abs * 4}px) scale(${1 - abs * 0.05}) rotate(${offset * 1.5}deg)`,
                    opacity: Math.max(0, 1 - abs * 0.42),
                    zIndex: 20 - abs,
                    transformOrigin: 'center center',
                    transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, box-shadow 0.45s ease',
                    cursor: 'pointer',
                    pointerEvents: abs > 3 ? 'none' : 'auto',
                  }}
                >
                  {/* Image — fills the whole card */}
                  <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                    <img src={card.img} alt={card.label} style={{ width: '100%', height: '100%', objectFit: card.fit || 'cover', objectPosition: card.pos || 'center center', transform: card.zoom ? `scale(${card.zoom})` : 'none', transformOrigin: card.pos || 'center center', display: 'block' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deck controls — centered under the photos */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: '380px' }}>
            <button
              onClick={() => setActiveCard((v) => (v - 1 + stories.length) % stories.length)}
              aria-label="Previous story"
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                border: '1px solid rgba(28,25,23,0.2)', background: 'transparent',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
           
            <button
              onClick={() => setActiveCard((v) => (v + 1) % stories.length)}
              aria-label="Next story"
              style={{
                width: '30px', height: '30px', borderRadius: '8px',
                border: '1px solid rgba(28,25,23,0.2)', background: 'transparent',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

        </div>

        {/* Footer — transparent so the video shows through */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(40px,6vh,72px) clamp(20px,5vw,72px) 0',
        }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {[['mailto:gamze@gamzee.nl', 'Email'], ['#', 'LinkedIn']].map(([href, label]) => (
                <a key={label} href={href} style={{ fontSize: '13px', color: 'rgba(28,25,23,0.6)', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>{label}</a>
              ))}
            </div>
          </div>
          <div style={{ maxWidth: '1280px', margin: '32px auto 0', paddingTop: '24px', paddingBottom: '32px', borderTop: '0.5px solid rgba(28,25,23,0.15)', textAlign: 'center', fontSize: '12px', color: 'rgba(28,25,23,0.45)' }}>
            © 2026 Gamze Bozkurt — made with curiosity
          </div>
        </div>
      </section>

      {/* <ChatWidget /> */}
    </>
  );
}