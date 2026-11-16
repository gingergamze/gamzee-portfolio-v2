'use client';

// Parked: the old "About" card from the homepage (story deck with photos).
// It is not shown anywhere on the site right now. To bring it back, import it
// and render <AboutStory /> where the card should sit (it was between "Selected
// Work" and the Tools band).

import { useState, useEffect } from 'react';

export default function AboutStory() {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

    // Per-photo framing: fit = 'cover' (fills, crops) or 'contain' (whole photo, no crop)
    //                    pos = 'center top' / 'center center' / 'center 30%' etc. (only affects 'cover')
    const stories = [
      { img: '/amsterdam.jpeg', label: 'Feels Home', fit: 'cover', pos: 'center center', text: 'Dutch citizen and living in Amsterdam' },
      { img: '/work-experience-workshop.jpg', label: 'Work Experience in:', fit: 'cover', pos: 'center center', text: 'Banking, Consulting Agency, Manufacturing Company, Small to Medium-Sized Construction Engineering Company' },
      { img: '/propic.png', label: 'Background', fit: 'cover', pos: 'center 20%', zoom: 1.7, text: 'Communication, Business Management and Data Driven Design' },
      { img: '/board.png', label: 'Specialization', fit: 'cover', pos: '3% top', zoom: 1.3, text: 'Improving operational processes and tools by tailor made digital solutions, managing product teams and product roadmaps' },
      { img: '/ofis.JPG', label: 'Like Fixing', fit: 'cover', pos: 'center 10%', text: 'Organizations struggling with poor cross-functional collaboration, inefficient workflows and complex processes because of their domain' },
    ];

  return (
        <section className="reveal reveal-card" style={{
          position: 'relative',
          zIndex: 3,
          marginTop: 'clamp(32px,5vh,56px)',
          marginLeft: 'var(--card-m-about)',
          marginRight: 'var(--card-m-about)',
          background: 'var(--card)',
          borderRadius: '12px',
          border: '0.7px solid rgba(28,25,23,0.1)',
          boxShadow: '0 -2px 6px rgba(28,25,23,0.08), 0 -8px 24px rgba(28,25,23,0.08)',
        }}>
          {/* About me content */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '2000px',
            margin: '0',
            padding: 'clamp(60px,10vh,120px) var(--pl-about) clamp(80px,14vh,160px) var(--pl-about)',
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
              margin: '0 0 64px -0.011em',
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
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#000000',
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
  );
}
