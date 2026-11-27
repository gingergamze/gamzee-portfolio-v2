'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ChatWidget from './ChatWidget';
import SiteNav from './SiteNav';
import SkillsGraph from './SkillsGraph';
import HeroVideo from './HeroVideo';
import Testimonials from './Testimonials';
import AboutStory from './AboutStory';
import { works } from './lib/works';

const ACCENT = 'var(--accent-deep)';

// Hero subheadline rotator — "For" stays fixed, this cycles and loops.
const HERO_PHRASES = ['end-to-end business processes', 'operational processes', 'internal analysis tools', 'data-rich products', 'enterprise products',' B2B products'];
const HERO_HOLD_MS = 2200;
const HERO_HOLD_EXTRA_MS = { 'operational processes and tools': 500 };
const HERO_TRANSITION_MS = 550;


export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [atTop, setAtTop] = useState(true);
  // Which Selected Work card is hovered — tracked in React state (not pure
  // CSS :hover) so it resets cleanly when this page remounts after a
  // click-through-and-back navigation, instead of staying "stuck" showing
  // the hover look wherever the cursor happened to be left sitting.
  const [hoveredWork, setHoveredWork] = useState(null);
  // Case studies that are not ready open this popup instead of the page.
  const [constructionOpen, setConstructionOpen] = useState(false);
  useEffect(() => {
    if (!constructionOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setConstructionOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [constructionOpen]);
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

  // The hero pins the skills map to the bottom of the screen. On short screens
  // (Windows laptops at 125–150% scaling) there is no room left for it under the
  // text, so the hero stacks instead: text first, then the map at full size.

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
      setAtTop(window.scrollY < 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Phones: the bulb video sits right under the intro text, and takes the space that is left in the hero.
  useEffect(() => {
    const hero = document.querySelector('header.hero');
    const intro = document.querySelector('.hero-intro');
    if (!hero || !intro) return undefined;
    const apply = () => {
      if (window.innerWidth >= 760) { hero.style.removeProperty('--bulb-top'); hero.style.removeProperty('--bulb-w'); return; }
      const h = hero.getBoundingClientRect();
      const i = intro.getBoundingClientRect();
      const top = i.bottom - h.top + 24;
      const room = h.height - top - 16;
      // Very small screens: no room left under the text, so the bulb is left out instead of being cut off
      const w = room < 110 ? 0 : Math.min(window.innerWidth * 0.62, 340, room / 0.75);
      hero.style.setProperty('--bulb-top', `${top}px`);
      hero.style.setProperty('--bulb-w', `${w}px`);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(hero);
    ro.observe(intro.parentElement);
    window.addEventListener('resize', apply);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
    return () => { ro.disconnect(); window.removeEventListener('resize', apply); };
  }, []);

  // Reveal elements on scroll into view (fade + rise)
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-lines');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Reveal when a third of the element is on screen, or when it already fills a third of the screen
          // (a tall card on a short phone can never reach a third of its own height).
          const tall = entry.rootBounds && entry.intersectionRect.height >= entry.rootBounds.height * 0.3;
          if (entry.isIntersecting && (entry.intersectionRatio >= 0.35 || tall)) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  // Selected Work: the title and the description of each card get the same height as the tallest one in their row,
  // so the logos, descriptions and tag pills line up across the cards at every screen size.
  useEffect(() => {
    const grid = document.querySelector('.work-grid');
    if (!grid) return undefined;
    const apply = () => {
      const lists = ['.work-card-title', '.work-card-tagline'].map((q) => [...grid.querySelectorAll(q)]);
      lists.forEach((l) => l.forEach((e) => { e.style.minHeight = ''; }));
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
      if (cols < 2) return;
      lists.forEach((l) => {
        for (let i = 0; i < l.length; i += cols) {
          const row = l.slice(i, i + cols);
          const max = Math.max(...row.map((e) => parseFloat(getComputedStyle(e).height) || 0));
          row.forEach((e) => { e.style.minHeight = `${max}px`; });
        }
      });
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(grid);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
    return () => ro.disconnect();
  }, []);

  // Selected Work card — "showcase" style: a colored visual panel on top
  // (placeholder for whatever mockups/photos get dropped in later) with a
  // white info block below carrying logo, headline, metrics and tags.
  const renderWorkCard = (w) => (
    <div
      key={w.slug}
      className={`work-card${hoveredWork === w.slug ? ' is-hovered' : ''}`}
      onClick={() => (w.underConstruction ? setConstructionOpen(true) : router.push(`/work/${w.slug}`))}
      onMouseEnter={() => setHoveredWork(w.slug)}
      onMouseLeave={() => setHoveredWork(null)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') { if (w.underConstruction) setConstructionOpen(true); else router.push(`/work/${w.slug}`); } }}
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
        {w.underConstruction && (
          <span style={{
            position: 'absolute', bottom: '14px', right: '14px', zIndex: 1,
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-work-sans)', fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.06em', textTransform: 'uppercase', color: '#1C1917',
            background: '#FFFFFF', padding: '6px 11px', borderRadius: '999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            <span aria-hidden="true" style={{ fontSize: '14px', lineHeight: 1 }}>🚧</span>
            <span style={{ display: 'block', lineHeight: 1.35 }}>Under construction<br />Coming soon</span>
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
        {w.cardLine ? (
          <>
            {/* Bold line under the logo, then the original line stays below it */}
            <h3 className="work-card-title work-card-bold" style={{
              fontWeight: 700, fontSize: 'clamp(18px,2vw,20px)',
              lineHeight: 1.5, color: '#1C1917', margin: '0 0 10px',
            }}>
              {w.cardLine}
            </h3>
            <p className="work-card-tagline" style={{
              fontWeight: 400, fontSize: 'clamp(18px,2vw,20px)',
              lineHeight: 1.5, color: '#1C1917', margin: '0 0 24px',
            }}>
              {w.tagline}
            </p>
          </>
        ) : (
          <h3 className="work-card-title" style={{
            fontWeight: 400, fontSize: 'clamp(18px,2vw,20px)',
            lineHeight: 1.5, color: '#1C1917', margin: '0 0 24px',
          }}>
            {w.tagline}
          </h3>
        )}

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
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
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
      <SiteNav theme="dark" />

      {/* HERO */}
      <header className="hero" style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        minHeight: '100vh',
        // Dark while the video is up; plain page colour once the cards cover it, so nothing dark shows in the gaps beside them
        background: scrolled ? 'var(--bg)' : '#0E1320',
        transition: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(140px,20vh,200px) var(--pl-hero) clamp(40px,6vh,100px) var(--pl-hero)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        <HeroVideo off={scrolled} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          // Once the cards have risen over the hero, blur what's left of it
          // so the red kicker doesn't read through the gaps beside the cards
          filter: scrolled ? 'blur(28px)' : 'none',
          opacity: scrolled ? 0 : 1,
          transition: 'none',
        }}>
          <p className="hero-kicker" style={{
            margin: '0 0 24px -0.066em',
            // Plus Jakarta Sans, not Work Sans, for the big display headline
            // — distinctive design-portfolio-leaning geometric sans with
            // clean kerning at large sizes (no g/y collision), 800 weight
            // for real presence.
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(34px, 8.4vw, 112px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            textShadow: '0 2px 26px rgba(0,0,0,0.45)',
          }}>
            <span style={{ color: '#FFA066' }}>Design</span>, <span style={{ color: '#5FD3C0' }}>Build</span>, <span style={{ color: '#9DB4FF' }}>Manage</span>
          </p>
          <h1 className="hero-headline" style={{
            margin: '68px 0 0 -0.0976em',
            fontFamily: 'var(--font-work-sans)',
            fontWeight: 500,
            fontSize: 'clamp(22px, 5vw, 44px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            textShadow: '0 2px 22px rgba(0,0,0,0.45)',
          }}>
            {/* All phrases are laid in one grid cell (invisible) so the headline always keeps the height of the longest phrase and the text below never moves */}
            <span style={{ display: 'grid' }}>
              {HERO_PHRASES.map((ph) => (
                <span key={ph} aria-hidden="true" style={{ gridArea: '1 / 1', visibility: 'hidden' }}>For <span className="hero-rotator is-visible">{ph}</span></span>
              ))}
              <span style={{ gridArea: '1 / 1' }}>For <span className={`hero-rotator${heroPhraseVisible ? ' is-visible' : ''}`}>{HERO_PHRASES[heroPhraseIndex]}</span></span>
            </span>
          </h1>
          <p className="hero-intro" style={{
            margin: '76px 0 0 -0.1em',
            maxWidth: '56ch',
            fontFamily: 'var(--font-work-sans)',
            fontWeight: 400,
            fontSize: 'clamp(18px, 2vw, 20px)',
            lineHeight: 1.55,
            letterSpacing: '-0.005em',
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 14px rgba(0,0,0,0.5)',
          }}>
            <span className="hero-intro-p" style={{ '--i': 0, display: 'block', marginBottom: '14px', maxWidth: '36em' }}>My full-time job is leading within product teams that build data-rich business tools.</span>
            <span className="hero-intro-p" style={{ '--i': 1, display: 'block', marginBottom: '14px', maxWidth: '36em' }}>I guide team members, decide what comes next and shape design. And I use AI with critical thinking.</span>
            <span className="hero-intro-p" style={{ '--i': 2, display: 'block', marginBottom: '14px', maxWidth: '36em' }}>My leadership experience covers design, research, project management and CX.</span>
            <span className="hero-intro-p" style={{ '--i': 3, display: 'block', maxWidth: '36em', fontWeight: 700 }}>10+ years.</span>
          </p>
        </div>
        <button
          type="button"
          className="scroll-cue"
          aria-label="Scroll down"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          style={{
            position: 'absolute', left: 'var(--pl-hero)', bottom: 88, zIndex: 3,
            display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none',
            cursor: 'pointer', padding: 0,
            opacity: atTop ? 1 : 0, pointerEvents: atTop ? 'auto' : 'none', transition: 'opacity 0.3s ease',
          }}
        >
          <span className="scroll-arrow" style={{
            width: 44, height: 44, borderRadius: 10, border: '0.5px solid rgba(28,25,23,0.2)',
            display: 'grid', placeItems: 'center', background: '#fff',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V13M8 13L3.5 8.5M8 13L12.5 8.5" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span style={{
            fontFamily: 'var(--font-work-sans)', fontSize: 12, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFFFFF',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}>
            Scroll Down
          </span>
        </button>
      </header>

      {/* WHAT I DO — sticky like the hero above it, so "Selected Work"
          (which rises from below with its own negative margin) has
          something pinned in place to fully slide over, instead of both
          sections just scrolling away at the same rate with only a small
          overlap between them. */}
      <section className="reveal reveal-card" style={{
        position: 'relative',
        zIndex: 1,
        marginTop: 0,
        marginLeft: 'var(--card-m-what)',
        marginRight: 'var(--card-m-what)',
        minHeight: '0vh',
        boxSizing: 'border-box',
        background: 'var(--card)',
        borderRadius: '12px',
        border: '0.4px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -2px 6px rgba(28,25,23,0.08), 0 -8px 24px rgba(28,25,23,0.08)',
      }}>
        <div style={{
          padding: 'clamp(80px,14vh,160px) var(--pl-what) clamp(72px,12vh,140px) var(--pl-what)',
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
          <p className="reveal-lines" style={{
            fontSize: 'clamp(18px,2vw,20px)',
            lineHeight: 1.5,
            color: '#1C1917',
            margin: '0 0 clamp(40px,6vh,72px) -0.108em',
            maxWidth: '152ch',
          }}>
            <span className="line" style={{ '--i': 0, display: 'block' }}>Unclear product strategy, inefficient workflows and confusing interactions cost businesses time and money.</span>
            <span className="line" style={{ '--i': 1, display: 'block', marginTop: '6px' }}>I bring clarity and efficiency to product teams. I help my team to focus on the most important thing at that time. I also lead design decisions that generate user adoption and company revenue.</span>
          </p>
          {/* The skills map: design, products and the problems I fix */}
          <SkillsGraph />
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
        background: 'var(--card)',
        borderRadius: '12px',
        border: '0.7px solid rgba(28,25,23,0.1)',
        boxShadow: '0 -2px 6px rgba(28,25,23,0.08), 0 -8px 24px rgba(28,25,23,0.08)',
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


      {/* TOOLS — a first, quieter footer band above the real footer. Logos are
          all the same size (28px square) and colour. */}
      <div id="tools" style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(48px,7vh,88px) var(--page-x) 0',
        background: 'var(--bg)',
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

      <Testimonials />
      <AboutStory />


      {/* FOOTER — sits on the plain page background, below the About card */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(40px,6vh,72px) var(--page-x)',
        background: 'var(--bg)',
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

      {constructionOpen && (
        <div
          onClick={() => setConstructionOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(28,25,23,0.55)', display: 'grid', placeItems: 'center', padding: '24px' }}
        >
          <div
            role="dialog" aria-modal="true" aria-label="Under construction"
            onClick={(e) => e.stopPropagation()}
            style={{ background: '#FFFFFF', borderRadius: '20px', padding: 'clamp(28px,4vw,44px)', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}
          >
            <div aria-hidden="true" style={{ fontSize: '48px', lineHeight: 1, marginBottom: '16px' }}>🚧</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#1C1917', margin: '0 0 12px', zoom: 1 }}>Under construction</h3>
            <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: '16px', lineHeight: 1.6, color: '#554E48', margin: '0 0 24px' }}>This case study is coming soon.</p>
            <button
              type="button" autoFocus onClick={() => setConstructionOpen(false)}
              style={{ border: 0, cursor: 'pointer', borderRadius: '10px', padding: '12px 24px', background: '#1C1917', color: '#FFFFFF', fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* <ChatWidget /> */}
    </>
  );
}
