'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChatWidget from './ChatWidget';
import SiteNav from './SiteNav';
import { works } from './lib/works';

const ACCENT = '#B4470E';

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  // Which Selected Work card is hovered — tracked in React state (not pure
  // CSS :hover) so it resets cleanly when this page remounts after a
  // click-through-and-back navigation, instead of staying "stuck" showing
  // the hover look wherever the cursor happened to be left sitting.
  const [hoveredWork, setHoveredWork] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
      setAtTop(window.scrollY < 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
      { threshold: 0.35 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  // Per-photo framing: fit = 'cover' (fills, crops) or 'contain' (whole photo, no crop)
  //                    pos = 'center top' / 'center center' / 'center 30%' etc. (only affects 'cover')
  const stories = [
    { img: '/board.png', label: 'Specialization', fit: 'cover', pos: '3% top', zoom: 1.3, text: 'Improving operational processes by tailor made digital solutions, managing product teams and product roadmaps' },
    { img: '/propic.png', label: 'Background', fit: 'cover', pos: 'center 20%', zoom: 1.7, text: 'Communication, Business Management and Data Driven Design' },
    { img: '/ofis.JPG', label: 'Like Fixing', fit: 'cover', pos: 'center 10%', text: 'Organizations struggling with poor cross-functional collaboration, inefficient workflows and complex processes because of their domain' },
    { img: '/amsterdam.jpeg', label: 'Feels Home', fit: 'cover', pos: 'center center', text: 'Dutch citizen and living in Amsterdam' },
  ];

  // Selected Work card — shared by the pyramid layout below. Width is
  // computed the same way a 3-across grid would (equal thirds minus two of
  // the "normal" gaps), so every card is identical in size no matter which
  // row it sits in or how far apart that row's cards are spaced.
  const CARD_GAP = 'clamp(24px,3vw,40px)';
  const CARD_SCALE = 1; // widened back out to pair with the wider 16:9 photo below, height stays ~unchanged
  const renderWorkCard = (w) => (
    <div
      key={w.slug}
      className={`work-card${hoveredWork === w.slug ? ' is-hovered' : ''}`}
      onClick={() => router.push(`/work/${w.slug}`)}
      onMouseEnter={() => setHoveredWork(w.slug)}
      onMouseLeave={() => setHoveredWork(null)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/work/${w.slug}`); }}
      style={{
        borderRadius: '40px', overflow: 'hidden', cursor: 'pointer',
        background: 'transparent',
        width: `calc((100% - 2 * ${CARD_GAP}) / 3 * ${CARD_SCALE})`,
        // Every card stretches to the tallest in its row, and the caption
        // block (flex: 1) fills the remainder — so frames stay identical
        // in size regardless of how many lines the title/description wrap.
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Photo keeps its original fixed 3:2 sizing. The caption below sizes
          to its own content (title + a 2-line-clamped description) instead
          of stretching — so the black portion stays compact. */}
      <div className="work-card-media" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', background: 'transparent', flexShrink: 0 }}>
        {w.type === 'video' ? (
          <video src={w.media} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <img src={w.media} alt={w.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      <div className="work-card-content" style={{ background: '#1C1917', padding: '18px 24px 20px', flexShrink: 0 }}>
        <h3 style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: 'clamp(18px,2.1vw,22px)', letterSpacing: '-0.01em', lineHeight: 1.15, color: '#FFFFFF', margin: '0 0 6px' }}>
          {w.title}
          {w.titleSuffix && (
            <span style={{ fontWeight: 400, fontSize: '0.7em', color: 'rgba(255,255,255,0.75)' }}>
              {' - '}{w.titleSuffix}
            </span>
          )}
        </h3>
        <p style={{
          fontFamily: 'var(--font-work-sans)', fontSize: '13px', lineHeight: 1.45, color: 'rgba(255,255,255,0.85)', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {w.tagline}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <SiteNav />

      {/* HERO */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        minHeight: '100vh',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(140px,20vh,200px) clamp(24px,5vw,72px) clamp(40px,6vh,100px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          zIndex: 1,
          // Once the cards have risen over the hero, blur what's left of it
          // so the red kicker doesn't read through the gaps beside the cards
          filter: scrolled ? 'blur(28px)' : 'none',
          opacity: scrolled ? 0.35 : 1,
          transition: 'filter 0.6s ease, opacity 0.6s ease',
        }}>
          <p className="hero-kicker" style={{
            margin: '0 0 24px',
            marginLeft: '-3px',
            // Plus Jakarta Sans, not Work Sans, for the big display headline
            // — distinctive design-portfolio-leaning geometric sans with
            // clean kerning at large sizes (no g/y collision), 800 weight
            // for real presence.
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(46px, 12vw, 160px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#d04d03',
          }}>
            Design & Strategy
          </p>
          <h1 className="hero-headline" style={{
            margin: '68px -3px -3px',
            fontFamily: 'var(--font-work-sans)',
            fontWeight: 500,
            fontSize: 'clamp(22px, 5vw, 44px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#3D3631',
          }}>
            For complex workflows, operational processes and data-rich products
          </h1>
          <div className="scroll-cue" style={{
            marginTop: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: atTop ? 1 : 0,
            pointerEvents: atTop ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
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
              fontFamily: 'var(--font-work-sans)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#1C1917',
            }}>
              Scroll Down
            </span>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="reveal reveal-card" style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 0,
        marginLeft: 'clamp(8px,1vw,20px)',
        marginRight: 'clamp(8px,1vw,20px)',
        minHeight: '0vh',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '0.4px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -14px 36px rgba(28,25,23,0.24), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}>
        <div style={{
          padding: 'clamp(80px,14vh,160px) clamp(24px,5vw,72px) clamp(120px,24vh,280px)',
        }}>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontSize: 'clamp(20px, 9vw, 60px)',
            lineHeight: 0.99,
            letterSpacing: '-0.02em',
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
            I find where products and workflows underperform. Then I fix them where it costs time and money for the business.
          </p>
        </div>
      </section>

      {/* SELECTED WORK — TABS VIEW */}
      <section id="selected-work" style={{
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '120px',
        marginTop: 'clamp(-60px,-8vh,-40px)',
        marginLeft: 'clamp(24px,2.8vw,56px)',
        marginRight: 'clamp(24px,2.8vw,56px)',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -14px 36px rgba(28,25,23,0.24), inset 0 1px 0 rgba(255,255,255,0.6)',
        // Extra bottom padding (vs. top) so the case study cards get real
        // breathing room before the About card overlaps up beneath them.
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px) clamp(140px,18vh,220px)',
      }}>
        <div style={{ maxWidth: '2400px', margin: '0' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontSize: 'clamp(20px, 9vw, 60px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.99,
            color: '#1C1917',
            margin: '0 0 clamp(48px,7vh,80px)',
          }}>
            Selected Work
          </h2>
        </div>
        <div style={{ maxWidth: '2400px', margin: '0' }}>
          {/* Pyramid layout: the first case study sits alone, centered, on
              the top row; the next two sit on the row below, offset left
              and right of it with extra breathing room between them.
              CARD_WIDTH is computed the same way a 3-across grid would
              (equal thirds minus two of the "normal" gaps) so all three
              cards stay identical in size — independent of BOTTOM_GAP,
              which only controls the space between the bottom two. Stacks
              to one column on mobile via .work-grid in globals.css. */}
          <div className="work-grid" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(24px,3vw,40px)', width: '100%' }}>
            {renderWorkCard(works[0])}
            <div className="work-grid-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(56px,7vw,88px)', width: '100%' }}>
              {renderWorkCard(works[1])}
              {renderWorkCard(works[2])}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ME + FOOTER — shared video background */}
      <section style={{
        position: 'relative',
        zIndex: 3,
        marginTop: 'clamp(-60px,-8vh,-40px)',
        marginLeft: 'clamp(44px,5vw,96px)',
        marginRight: 'clamp(44px,5vw,96px)',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -18px 60px rgba(28,25,23,0.30)',
      }}>
        {/* About me content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '2000px',
          margin: '0',
          padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,72px) clamp(80px,14vh,160px)',
        }}>
          {/* Not sticky: the deck below only advances via the prev/next
              buttons (no scroll-linked story), so pinning these while the
              deck scrolled underneath just meant its top edge kept getting
              covered by these opaque panels — a real bug, not a style choice. */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontSize: 'clamp(20px, 9vw, 60px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.99,
            color: '#1C1917',
            margin: '0 0 40px',
            padding: '8px 0',
          }}>
            About
          </h2>
          <div style={{
            minHeight: '5em',
            marginBottom: '40px',
            paddingBottom: '8px',
          }}>
            <div style={{
              fontFamily: 'var(--font-work-sans)',
              fontOpticalSizing: 'auto',
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
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              transition: 'opacity 0.3s ease',
            }}>
              {stories[activeCard].text}
            </p>
          </div>

          {/* STORY DECK — pile fans both ways, centered like the Selected Work photo */}
          <div style={{ width: 'fit-content', margin: '0 auto', marginTop: '80px', position: 'relative', zIndex: 1, isolation: 'isolate' }}>
          <div style={{
            position: 'relative',
            height: isMobile ? '190px' : '320px',
            marginBottom: '20px',
            width: isMobile ? '170px' : '300px',
            margin: isMobile ? '0' : '0 auto 20px',
          }}>
            {stories.map((card, i) => {
              const offset = i - activeCard;
              const abs = Math.abs(offset);
              const cardSize = isMobile ? 170 : 300;
              const offsetStep = isMobile ? 22 : 48;
              return (
                <div
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className={offset === 0 && activeCard === 0 ? 'deck-nudge' : undefined}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${cardSize}px`,
                    height: `${cardSize}px`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    border: '1px solid rgba(28,25,23,0.12)',
                    boxShadow: offset === 0 ? '0 12px 34px rgba(28,25,23,0.18)' : '0 6px 20px rgba(28,25,23,0.10)',
                    transform: `translateX(${offset * offsetStep}px) translateY(${abs * 4}px) scale(${1 - abs * 0.05}) rotate(${offset * 1.5}deg)`,
                    opacity: offset === 0 ? 1 : Math.max(0, 0.35 - abs * 0.12),
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
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', width: isMobile ? '170px' : '380px' }}>
            <button
              onClick={() => setActiveCard((v) => (v - 1 + stories.length) % stories.length)}
              aria-label="Previous story"
              className="deck-arrow-btn"
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
              className="deck-arrow-btn"
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

        </div>
      </section>

      {/* FOOTER — sits on the plain page background, below the About card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(40px,6vh,72px) clamp(20px,5vw,72px)',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <button
              onClick={() => window.dispatchEvent(new Event('open-contact'))}
              style={{ fontSize: '13px', color: 'rgba(28,25,23,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}
            >
              Contact
            </button>
            <a href="https://www.linkedin.com/in/gamze-serviceandproductdesignstrategist/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'rgba(28,25,23,0.6)', textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>LinkedIn</a>
          </div>
          <div style={{ width: '100%', paddingTop: '20px', borderTop: '0.5px solid rgba(28,25,23,0.15)', textAlign: 'center', fontSize: '12px', color: 'rgba(28,25,23,0.45)' }}>
            © 2026 Gamze Bozkurt — made with curiosity
          </div>
        </div>
      </div>

      {/* <ChatWidget /> */}
    </>
  );
}