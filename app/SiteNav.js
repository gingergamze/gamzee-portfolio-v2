'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Shared site navigation + contact modal — the SAME component renders on
// the homepage and on every case study page, so branding/links/behavior
// never drift between pages.
//
// variant:
//   'floating' (default) — the homepage's fixed, blurred pill nav that
//     overlays the top of the hero.
//   'static' — a plain in-flow top bar (white background, thin bottom
//     border) that sits above a page's own content, e.g. a case study's
//     full-bleed hero image. Same logo/links, just not fixed/floating.
//
// backHref: when set, renders an additional "← Back" link (used on case
// study pages) alongside the logo, which itself always links home.
//
// Any "Contact" trigger elsewhere in the app (e.g. the footer button) can
// open this same modal by dispatching: window.dispatchEvent(new Event('open-contact'))
export default function SiteNav({ variant = 'floating', backHref, theme = 'light' }) {
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('idle'); // idle | sending | success | error
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (variant !== 'floating') return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  useEffect(() => {
    const openHandler = () => setContactOpen(true);
    window.addEventListener('open-contact', openHandler);
    return () => window.removeEventListener('open-contact', openHandler);
  }, []);

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('gamzeebozkurt@gmail.com').catch(() => {});
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const closeContact = () => {
    setContactOpen(false);
    setContactStatus('idle');
    setContactForm({ name: '', email: '', message: '' });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/gamzeebozkurt@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          _subject: `New message from ${contactForm.name} via gamzee.nl`,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setContactStatus('success');
    } catch {
      setContactStatus('error');
    }
  };

  const navRow = (
    <nav style={{
      background: variant === 'floating' ? (scrolled ? 'rgba(255,255,255,0.92)' : 'transparent') : (isDark ? 'transparent' : '#FFFFFF'),
      backdropFilter: variant === 'floating' && scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: variant === 'floating' && scrolled ? 'blur(16px)' : 'none',
      border: 'none',
      borderRadius: 0,
      padding: variant === 'floating' ? '14px clamp(10px, 0.7vw, 20px)' : '20px clamp(24px,5vw,72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'none',
      transition: 'all 0.3s ease',
    }}>
      <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', paddingLeft: '0px' }}>
        <img src="/sun.png" alt="Gamze" className="sun-spin" style={{ borderRadius: '10px', width: '44px', height: '44px', objectFit: 'cover', display: 'block', flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px', marginTop: '6px' }}>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '20px', color: '#d04d03', lineHeight: 1, letterSpacing: '-0.01em' }}>Gamze Bozkurt</div>
          <div className="nav-subtitle" style={{ fontFamily: 'var(--font-work-sans)', fontSize: '12px', color: isDark ? 'rgba(255,255,255,0.6)' : '#7C756E', letterSpacing: '0.02em', lineHeight: 1.3 }}>Design products, services and strategies</div>
        </div>
      </Link>
      <div className="nav-contact-wrap" style={{ display: 'flex', gap: '16px', alignItems: 'center', alignSelf: 'flex-start', marginTop: '6px' }}>
        <button
          onClick={() => setContactOpen(true)}
          className="nav-contact"
          style={{ fontFamily: 'var(--font-work-sans)', fontSize: '12px', fontWeight: 600, color: isDark ? '#FFFFFF' : '#1C1917', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}
        >
          Contact
        </button>
        <a
          href="https://www.linkedin.com/in/gamze-serviceandproductdesignstrategist/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-contact"
          style={{ fontFamily: 'var(--font-work-sans)', fontSize: '12px', fontWeight: 600, color: isDark ? '#FFFFFF' : '#1C1917', textDecoration: 'none', padding: '8px 4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}
        >
          LinkedIn
        </a>
      </div>
    </nav>
  );

  return (
    <>
      {variant === 'floating' ? (
        <>
          {/* TOP MASK — always opaque so nothing (a stray huge glyph, a future
              edge case) can ever visually render behind/through the fixed nav */}
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '104px',
            background: '#FFFFFF', zIndex: 99, opacity: 1, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'fixed', top: '20px', left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)', maxWidth: '2000px', zIndex: 100,
          }}>
            {navRow}
          </div>
        </>
      ) : (
        <div style={{ position: 'relative', zIndex: 10, borderBottom: isDark ? 'none' : '1px solid rgba(28,25,23,0.08)' }}>
          {navRow}
        </div>
      )}

      {/* BACK BUTTON — icon-only, pinned to the left edge, stays put while
          the user scrolls down the case study */}
      {backHref && (
        <Link
          href={backHref}
          aria-label="Back"
          className="deck-arrow-btn"
          style={{
            position: 'fixed', top: '24px', left: 'clamp(16px,3vw,32px)', zIndex: 150,
            width: '40px', height: '40px', borderRadius: '10px',
            border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(28,25,23,0.15)',
            background: isDark ? 'rgba(28,25,23,0.6)' : '#FFFFFF',
            backdropFilter: isDark ? 'blur(8px)' : 'none',
            display: 'grid', placeItems: 'center', textDecoration: 'none',
            boxShadow: '0 8px 20px rgba(28,25,23,0.12)',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke={isDark ? '#FFFFFF' : '#1C1917'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
      )}

      {/* CONTACT MODAL — shared by every "Contact" trigger on the site */}
      {contactOpen && (
        <div
          onClick={closeContact}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(28,25,23,0.45)',
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '440px',
              background: '#FFFFFF', borderRadius: '20px',
              border: '1px solid rgba(28,25,23,0.1)',
              boxShadow: '0 32px 80px rgba(28,25,23,0.28)',
              padding: 'clamp(28px,5vw,40px)',
            }}
            className="animate-pop-forward"
          >
            <button
              onClick={closeContact}
              aria-label="Close"
              style={{
                position: 'absolute', top: '18px', right: '18px',
                width: '32px', height: '32px', borderRadius: '8px',
                border: '1px solid rgba(28,25,23,0.15)', background: 'transparent',
                cursor: 'pointer', display: 'grid', placeItems: 'center',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 3L13 13M13 3L3 13" stroke="#1C1917" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>

            {contactStatus === 'success' ? (
              <div style={{ padding: '20px 0' }}>
                <h3 style={{ fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.02em', color: '#1C1917', margin: '0 0 12px' }}>
                  Message sent
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#3D3631', margin: 0 }}>
                  Thanks {contactForm.name || 'there'} — it landed straight in my inbox. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-work-sans)', fontOpticalSizing: 'auto', fontWeight: 700, fontSize: '26px', letterSpacing: '-0.02em', color: '#1C1917', margin: '0 0 8px' }}>
                  Let's talk
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.5, color: '#7C756E', margin: '0 0 10px' }}>
                  Send a message — it goes straight to gamzeebozkurt@gmail.com.
                </p>

                <button
                  type="button"
                  onClick={copyEmail}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    margin: '0 0 24px', padding: '6px 12px', borderRadius: '999px',
                    border: '1px solid rgba(28,25,23,0.15)', background: emailCopied ? '#1C1917' : 'transparent',
                    color: emailCopied ? '#FFFFFF' : '#1C1917',
                    fontFamily: 'var(--font-work-sans)', fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {emailCopied ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="#1C1917" strokeWidth="1.3"/><path d="M2.5 10.5V3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H10.5" stroke="#1C1917" strokeWidth="1.3" strokeLinecap="round"/></svg>
                      Copy email instead
                    </>
                  )}
                </button>

                <form onSubmit={submitContact} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '10px',
                      border: '1px solid rgba(28,25,23,0.15)', background: '#FFFFFF',
                      fontSize: '14px', fontFamily: 'inherit', color: '#1C1917', outline: 'none',
                    }}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '10px',
                      border: '1px solid rgba(28,25,23,0.15)', background: '#FFFFFF',
                      fontSize: '14px', fontFamily: 'inherit', color: '#1C1917', outline: 'none',
                    }}
                  />
                  <textarea
                    required
                    placeholder="What's on your mind?"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                    style={{
                      width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '10px',
                      border: '1px solid rgba(28,25,23,0.15)', background: '#FFFFFF',
                      fontSize: '14px', fontFamily: 'inherit', color: '#1C1917', outline: 'none', resize: 'vertical',
                    }}
                  />

                  <button
                    type="submit"
                    disabled={contactStatus === 'sending'}
                    style={{
                      marginTop: '6px', padding: '13px 20px', borderRadius: '10px',
                      border: 'none', background: '#1C1917', color: '#FFFFFF',
                      fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 700,
                      letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
                      opacity: contactStatus === 'sending' ? 0.6 : 1,
                    }}
                  >
                    {contactStatus === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  {contactStatus === 'error' && (
                    <p style={{ fontSize: '13px', color: '#B4470E', margin: '4px 0 0' }}>
                      Something went wrong. You can also email me directly at{' '}
                      <a href="mailto:gamzeebozkurt@gmail.com" style={{ color: '#B4470E', textDecoration: 'underline' }}>gamzeebozkurt@gmail.com</a>.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
