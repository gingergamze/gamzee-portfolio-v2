'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONTACT_EMAIL, sendToInbox } from '../lib/contact';

// Served by middleware.js in place of any /work/<slug> page the visitor
// isn't authenticated for yet (the URL bar still shows the real case
// study URL — this is a rewrite, not a redirect). On a correct password,
// the API route sets an httpOnly cookie and we just reload: middleware
// then lets the real page through.
export default function WorkLockedPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | error
  // "Ask for access" form — sends a message straight to the inbox.
  const [askOpen, setAskOpen] = useState(false);
  const [ask, setAsk] = useState({ email: '', message: '' });
  const [askStatus, setAskStatus] = useState('idle'); // idle | sending | sent | error

  const sendAsk = async (e) => {
    e.preventDefault();
    setAskStatus('sending');
    const ok = await sendToInbox({
      name: ask.email,
      email: ask.email,
      message: ask.message || 'Could I get the password for your case studies?',
      subject: `Case study access request from ${ask.email} via gamzee.nl`,
    });
    setAskStatus(ok ? 'sent' : 'error');
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('checking');
    try {
      const res = await fetch('/api/case-study-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#FFFFFF', padding: '24px',
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', marginBottom: 'clamp(40px,6vh,64px)' }}>
        <img src="/sun.png" alt="Gamze" style={{ borderRadius: '10px', width: '44px', height: '44px', objectFit: 'cover', display: 'block' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: '20px', color: '#d04d03', lineHeight: 1, letterSpacing: '-0.01em' }}>Gamze Bozkurt</div>
          <div style={{ fontFamily: 'var(--font-work-sans)', fontSize: '12px', color: '#7C756E', letterSpacing: '0.02em' }}>Design products, services and strategies</div>
        </div>
      </Link>

      <div style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
        <div style={{
          width: '48px', height: '48px', margin: '0 auto 24px', borderRadius: '12px',
          background: '#F1EEE8', display: 'grid', placeItems: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#1C1917" strokeWidth="1.3"/>
            <path d="M5.5 7V4.75C5.5 3.23122 6.61929 2 8 2C9.38071 2 10.5 3.23122 10.5 4.75V7" stroke="#1C1917" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-work-sans)', fontWeight: 700, fontSize: 'clamp(24px,4vw,32px)',
          letterSpacing: '-0.01em', color: '#1C1917', margin: '0 0 12px',
        }}>
          This case study is private
        </h1>
        <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', lineHeight: 1.6, color: '#7C756E', margin: '0 0 28px' }}>
          Enter the password to view it.
        </p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            required
            type="password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (status === 'error') setStatus('idle'); }}
            style={{
              width: '100%', boxSizing: 'border-box', padding: '13px 16px', borderRadius: '10px',
              border: status === 'error' ? '1px solid #B4470E' : '1px solid rgba(28,25,23,0.15)',
              background: '#FFFFFF', fontSize: '15px', fontFamily: 'inherit', color: '#1C1917', outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'checking'}
            style={{
              padding: '13px 20px', borderRadius: '10px', border: 'none',
              background: '#1C1917', color: '#FFFFFF',
              fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer',
              opacity: status === 'checking' ? 0.6 : 1,
            }}
          >
            {status === 'checking' ? 'Checking…' : 'Unlock'}
          </button>
          {status === 'error' && (
            <p style={{ fontSize: '13px', color: '#B4470E', margin: '4px 0 0' }}>
              That password isn't right — try again.
            </p>
          )}
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '28px 0 16px', color: '#9A938B', fontFamily: 'var(--font-work-sans)', fontSize: '13px' }}>
          <span style={{ flex: 1, height: '1px', background: 'rgba(28,25,23,0.12)' }} />
          Don't have the password?
          <span style={{ flex: 1, height: '1px', background: 'rgba(28,25,23,0.12)' }} />
        </div>
        <button
          type="button"
          onClick={() => setAskOpen((o) => !o)}
          aria-expanded={askOpen}
          style={{
            width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '14px 20px', borderRadius: '10px', background: '#d04d03', color: '#FFFFFF', border: 'none',
            fontFamily: 'var(--font-work-sans)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase', cursor: 'pointer', marginBottom: '16px',
            boxShadow: '0 6px 18px rgba(208,77,3,0.28)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          Ask Gamze for access
        </button>
        {askOpen && (
          askStatus === 'sent' ? (
            <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', lineHeight: 1.6, color: '#1C1917', background: '#F1EEE8', borderRadius: '12px', padding: '16px', margin: '0 0 16px' }}>
              Thanks — your request is on its way. I'll send you the password soon.
            </p>
          ) : (
            <form onSubmit={sendAsk} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', background: '#F1EEE8', borderRadius: '16px', padding: '16px', margin: '0 0 16px' }}>
              {[
                { k: 'email', type: 'email', ph: 'Your email', req: true },
              ].map((f) => (
                <input
                  key={f.k}
                  required={f.req}
                  type={f.type}
                  placeholder={f.ph}
                  value={ask[f.k]}
                  onChange={(e) => setAsk({ ...ask, [f.k]: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(28,25,23,0.15)', background: '#FFFFFF', fontSize: '15px', fontFamily: 'inherit', color: '#1C1917', outline: 'none' }}
                />
              ))}
              <textarea
                placeholder="Optional message — e.g. your name and why you'd like to see it"
                rows={3}
                value={ask.message}
                onChange={(e) => setAsk({ ...ask, message: e.target.value })}
                style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(28,25,23,0.15)', background: '#FFFFFF', fontSize: '15px', fontFamily: 'inherit', color: '#1C1917', outline: 'none', resize: 'vertical' }}
              />
              <button
                type="submit"
                disabled={askStatus === 'sending'}
                style={{ padding: '12px 18px', borderRadius: '10px', border: 'none', background: '#d04d03', color: '#FFFFFF', fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', opacity: askStatus === 'sending' ? 0.6 : 1 }}
              >
                {askStatus === 'sending' ? 'Sending…' : 'Request access'}
              </button>
              {askStatus === 'error' && (
                <p style={{ fontSize: '13px', color: '#B4470E', margin: '2px 0 0' }}>
                  Something went wrong. You can also email me at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Case%20study%20access%20request`} style={{ color: '#B4470E', textDecoration: 'underline' }}>{CONTACT_EMAIL}</a>.
                </p>
              )}
            </form>
          )
        )}

        <Link href="/" style={{ display: 'inline-block', marginTop: '32px', fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 600, color: '#7C756E', textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
