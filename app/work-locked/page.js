'use client';

import { useState } from 'react';
import Link from 'next/link';

// Served by middleware.js in place of any /work/<slug> page the visitor
// isn't authenticated for yet (the URL bar still shows the real case
// study URL — this is a rewrite, not a redirect). On a correct password,
// the API route sets an httpOnly cookie and we just reload: middleware
// then lets the real page through.
export default function WorkLockedPage() {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | checking | error

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
        <p style={{ fontFamily: 'var(--font-work-sans)', fontSize: '15px', lineHeight: 1.6, color: '#7C756E', margin: '0 0 32px' }}>
          Enter the password to view it. Don't have one? <a href="mailto:gamze@gamzee.nl" style={{ color: '#1C1917', textDecoration: 'underline' }}>Ask Gamze for access</a>.
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

        <Link href="/" style={{ display: 'inline-block', marginTop: '32px', fontFamily: 'var(--font-work-sans)', fontSize: '13px', fontWeight: 600, color: '#7C756E', textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
