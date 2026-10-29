'use client';

import { useState } from 'react';

// Small "Info" pill next to the client name. Clicking it doesn't open a
// separate popover — the button itself swaps in place for a tiny card
// carrying one sentence about the client, and clicking that closes it
// back down to the pill.
export default function ClientInfoButton({ description }) {
  const [open, setOpen] = useState(false);

  if (!description) return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="client-info-btn"
        aria-label={`About ${description ? 'this client' : ''}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontFamily: 'var(--font-work-sans)', fontSize: '10.5px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase', color: '#3D3631',
          background: '#F2EFE9', border: '1px solid rgba(28,25,23,0.16)',
          borderRadius: '999px', padding: '4px 12px 4px 8px', cursor: 'pointer',
        }}
      >
        <span style={{
          display: 'grid', placeItems: 'center', width: '14px', height: '14px',
          borderRadius: '50%', background: 'var(--accent)', color: '#FFFFFF',
          fontSize: '10px', fontWeight: 800, fontStyle: 'italic', lineHeight: 1,
          textTransform: 'none', letterSpacing: 0, fontFamily: 'Georgia, serif',
        }}>
          i
        </span>
        Info
      </button>
    );
  }

  return (
    <div
      onClick={() => setOpen(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setOpen(false); }}
      style={{
        fontFamily: 'var(--font-work-sans)', fontSize: '12.5px', lineHeight: 1.45,
        color: '#3D3631', background: '#FAF8F5', border: '1px solid rgba(28,25,23,0.16)',
        borderRadius: '12px', padding: '10px 14px', maxWidth: '240px',
        boxShadow: '0 10px 26px rgba(28,25,23,0.14)', cursor: 'pointer',
      }}
    >
      {description}
    </div>
  );
}
