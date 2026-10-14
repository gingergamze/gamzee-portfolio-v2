'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ChatWidget from './ChatWidget';
import SiteNav from './SiteNav';
import { works } from './lib/works';

const ACCENT = '#B4470E';

// Hero subheadline rotator — "For" stays fixed, this cycles and loops.
const HERO_PHRASES = ['complex workflows', 'operational processes and tools', 'data-rich products'];
const HERO_HOLD_MS = 2200;
const HERO_HOLD_EXTRA_MS = { 'operational processes and tools': 500 };
const HERO_TRANSITION_MS = 550;

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
  const [heroPhraseIndex, setHeroPhraseIndex] = useState(0);
  const [heroPhraseVisible, setHeroPhraseVisible] = useState(true);

  // Rotate the hero subheadline phrase on a loop: hold, blur out, swap text,
  // blur back in. Skipped entirely for prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let index = 0;
    let timer;
    const schedule = () => {
      const hold = HERO_HOLD_MS + (HERO_HOLD_EXTRA_MS[HERO_PHRASES[index]] || 0);
      timer = setTimeout(() => {
        setHeroPhraseVisible(false);
        timer = setTimeout(() => {
          index = (index + 1) % HERO_PHRASES.length;
          setHeroPhraseIndex(index);
          setHeroPhraseVisible(true);
          schedule();
        }, HERO_TRANSITION_MS);
      }, hold);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

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
    { img: '/asml-cleanroom.jpg', label: 'Work Experience', fit: 'cover', pos: 'center center', text: 'Banking, Consulting Agency, Manufacturing Company, Small to Medium-Sized Construction Engineering Company' },
    { img: '/propic.png', label: 'Background', fit: 'cover', pos: 'center 20%', zoom: 1.7, text: 'Communication, Business Management and Data Driven Design' },
    { img: '/amsterdam.jpeg', label: 'Feels Home', fit: 'cover', pos: 'center center', text: 'Dutch citizen and living in Amsterdam' },
    { img: '/board.png', label: 'Specialization', fit: 'cover', pos: '3% top', zoom: 1.3, text: 'Improving operational processes and tools by tailor made digital solutions, managing product teams and product roadmaps' },
    { img: '/ofis.JPG', label: 'Like Fixing', fit: 'cover', pos: 'center 10%', text: 'Organizations struggling with poor cross-functional collaboration, inefficient workflows and complex processes because of their domain' },
  ];

  // Selected Work card — "showcase" style: a colored visual panel on top
  // (placeholder for whatever mockups/photos get dropped in later) with a
  // white info block below carrying logo, headline, metrics and tags.
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
        cursor: 'pointer', background: 'transparent',
        width: '100%', display: 'flex', flexDirection: 'column',
      }}
    >
      {/* VISUAL PANEL — just the photo/mockup itself, full-bleed, no colored
          frame around it. */}
      <div className="work-card-media" style={{
        position: 'relative', width: '100%', aspectRatio: '6 / 5', overflow: 'hidden',
        background: '#F2F0EC', borderRadius: '8px',
      }}>
        {w.confidential && (
          <span style={{
            position: 'absolute', top: '14px', left: '14px', zIndex: 1,
            fontFamily: 'var(--font-work-sans)', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF',
            background: 'rgba(0,0,0,0.35)', padding: '5px 10px', borderRadius: '999px',
          }}>
            Confidential
          </span>
        )}
        {w.type === 'video' ? (
          <video src={w.media} autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <img src={w.media} alt={w.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>

      {/* INFO BLOCK */}
      <div className="work-card-content" style={{
        padding: '22px 0 0', flex: 1, display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo row — a real wordmark logo (w.logo) is shown on its own, since
            it already says the client name; the placeholder badge falls back
            to an initial + the client name as text until a logo is dropped in. */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '28px', marginBottom: '20px' }}>
          {w.logo ? (
            <img src={w.logo} alt={w.title} style={{ height: w.logoHeight || '22px', width: 'auto', maxWidth: '140px', objectFit: 'contain' }} />
          ) : (
            <>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                background: w.bgColor || '#EDEAE6',
                display: 'grid', placeItems: 'center', overflow: 'hidden',
              }}>
                <span style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 800, fontSize: '12px', color: '#FFFFFF' }}>
                  {w.title?.[0] || '?'}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '14px', letterSpacing: '-0.01em', color: '#3D3631' }}>
                {w.title}
              </span>
            </>
          )}
        </div>

        {/* Headline — the descriptive project title. */}
        <h3 className="work-card-title" style={{
          fontWeight: 400, fontSize: 'clamp(18px,2vw,20px)',
          lineHeight: 1.5, color: '#1C1917', margin: '0 0 24px',
        }}>
          {w.tagline}
        </h3>

        {/* Tag pills — plain grey, mono caps; pushed to the card bottom so
            they line up across side-by-side cards. */}
        {w.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
            {w.tags.map((t, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-work-sans)',
                fontSize: '11px', fontWeight: 600, color: '#5C5C5C', textTransform: 'uppercase',
                letterSpacing: '0.04em', background: '#EBEBEB',
                padding: '6px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
              }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Impact — opens under the tags while the photo is hovered (CSS in
            globals.css; always open on touch screens, which can't hover). */}
        {w.stats?.length > 0 && (
          <div className="work-card-impact">
            <div style={{ overflow: 'hidden', minHeight: 0 }}>
              <div style={{ paddingTop: '20px' }}>
                <div style={{
                  background: '#F6F4F0', border: '1px solid rgba(28,25,23,0.06)',
                  borderRadius: '12px', padding: '18px 20px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px',
                    lineHeight: 1, letterSpacing: '-0.01em', color: '#1C1917', marginBottom: '14px',
                  }}>
                    Impact
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {w.stats.map((st, k) => (
                      <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {st.value && !st.trend ? (
                          <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 800, fontSize: '14px', color: '#1C1917', whiteSpace: 'nowrap' }}>
                            {st.value}
                          </div>
                        ) : (
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d04d03', flexShrink: 0 }} />
                        )}
                        <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: '14px', fontWeight: 500, color: '#3D3631', lineHeight: 1.4 }}>
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
        padding: 'clamp(140px,20vh,200px) var(--pl-hero) clamp(40px,6vh,100px) var(--pl-hero)',
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
          transition: 'filter 0.8s ease, opacity 0.8s ease',
        }}>
          <p className="hero-kicker" style={{
            margin: '0 0 24px -0.066em',
            // Plus Jakarta Sans, not Work Sans, for the big display headline
            // — distinctive design-portfolio-leaning geometric sans with
            // clean kerning at large sizes (no g/y collision), 800 weight
            // for real presence.
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(42px, 10.5vw, 140px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#d04d03',
          }}>
            Design & Strategy
          </p>
          <h1 className="hero-headline" style={{
            margin: '68px 0 0 -0.0976em',
            fontFamily: 'var(--font-work-sans)',
            fontWeight: 500,
            fontSize: 'clamp(22px, 5vw, 44px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#3D3631',
          }}>
            For <span className={`hero-rotator${heroPhraseVisible ? ' is-visible' : ''}`}>{HERO_PHRASES[heroPhraseIndex]}</span>
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

      {/* WHAT I DO — sticky like the hero above it, so "Selected Work"
          (which rises from below with its own negative margin) has
          something pinned in place to fully slide over, instead of both
          sections just scrolling away at the same rate with only a small
          overlap between them. */}
      <section className="reveal reveal-card" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        marginTop: 0,
        marginLeft: 'var(--card-m-what)',
        marginRight: 'var(--card-m-what)',
        minHeight: '0vh',
        boxSizing: 'border-box',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '0.4px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -14px 36px rgba(28,25,23,0.24), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}>
        <div style={{
          padding: 'clamp(80px,14vh,160px) var(--pl-what) clamp(120px,24vh,280px) var(--pl-what)',
        }}>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)',
            fontOpticalSizing: 'auto',
            fontWeight: 700,
            fontSize: 'clamp(20px, 9vw, 60px)',
            lineHeight: 0.99,
            letterSpacing: '-0.02em',
            color: '#1C1917',
            margin: '0 0 76px -0.011em',
          }}>
            What I do
          </h2>
          <p className="reveal" style={{
            fontSize: 'clamp(18px,2vw,20px)',
            lineHeight: 1.5,
            color: '#1C1917',
            margin: '0 0 32px -0.108em',
            maxWidth: '152ch',
          }}>
            <span style={{ display: 'block', marginBottom: '28px' }}>I'm a designer with UX research and project management experience, especially for <strong style={{ fontWeight: 700 }}>internal tools/software</strong> and <strong style={{ fontWeight: 700 }}>business-to-employee (B2E)</strong> products.</span>
            <span style={{ display: 'block', marginBottom: '28px' }}>I like finding where products and workflows underperform.</span>
            <span style={{ display: 'block' }}>Then I fix them where it costs time and money for the business.</span>
          </p>
        </div>
      </section>

      {/* SELECTED WORK — TABS VIEW */}
      <section id="selected-work" style={{
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '120px',
        marginTop: 'clamp(-60px,-8vh,-40px)',
        marginLeft: 'var(--card-m-work)',
        marginRight: 'var(--card-m-work)',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -14px 36px rgba(28,25,23,0.24), inset 0 1px 0 rgba(255,255,255,0.6)',
        // Extra bottom padding (vs. top) so the case study cards get real
        // breathing room before the About card overlaps up beneath them.
        padding: 'clamp(60px,10vh,120px) var(--pl-work) clamp(48px,6vh,72px) var(--pl-work)',
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
            margin: '0 0 clamp(68px,9.5vh,104px) -0.0385em',
          }}>
            Selected Work
          </h2>
        </div>
        <div style={{ maxWidth: '2400px', margin: '0' }}>
          {/* Showcase grid — column count (3 / 2 / 1) is set in .work-grid in
              globals.css. */}
          <div className="work-grid">
            {works.map((w) => renderWorkCard(w))}
          </div>
        </div>
      </section>

      {/* ABOUT ME + FOOTER — shared video background */}
      <section className="reveal reveal-card" style={{
        position: 'relative',
        zIndex: 3,
        marginTop: 'clamp(-60px,-8vh,-40px)',
        marginLeft: 'var(--card-m-about)',
        marginRight: 'var(--card-m-about)',
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

      {/* TOOLS — a first, quieter footer band above the real footer. Logos are
          all the same size (28px square) and colour. */}
      <div id="tools" style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(48px,7vh,88px) var(--page-x) 0',
        background: '#F4F1EA',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <div style={{ fontSize: '13px', color: 'rgba(28,25,23,0.6)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 500 }}>
            Tools I use
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px clamp(28px,5vw,64px)' }}>
            {[
              { name: 'Figma', src: '/tools/figma.svg' },
              { name: 'Claude', src: '/tools/claude.svg' },
              { name: 'Vercel', src: '/tools/vercel.svg' },
              { name: 'Cursor', src: '/tools/cursor.svg' },
              { name: 'Notion', src: '/tools/notion.svg' },
            ].map((t) => (
              <li key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={t.src} alt="" width="28" height="28" style={{ width: '28px', height: '28px', display: 'block' }} />
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#1C1917' }}>{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FOOTER — sits on the plain page background, below the About card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(40px,6vh,72px) var(--page-x)',
        background: '#F4F1EA',
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
