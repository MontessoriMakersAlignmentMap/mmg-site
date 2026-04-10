'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ResidencyNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      background: 'var(--r-navy)',
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div className="r-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        <Link href="/residency" style={{
          textDecoration: 'none',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <span style={{
            width: '32px',
            height: '32px',
            background: 'var(--r-gold)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 700,
          }}>
            MM
          </span>
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>
            Montessori Makers Residency
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
             className="residency-desktop-nav">
          <Link href="/residency/curriculum" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.875rem' }}>
            Curriculum
          </Link>
          <Link href="/residency/portal" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.875rem' }}>
            Portal
          </Link>
          <Link href="/residency/auth/login" className="r-btn r-btn-gold" style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
            Sign In
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="residency-mobile-toggle"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="residency-mobile-menu" style={{
          padding: '1rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Link href="/residency/curriculum" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.9375rem' }} onClick={() => setMenuOpen(false)}>
            Curriculum
          </Link>
          <Link href="/residency/portal" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: '0.9375rem' }} onClick={() => setMenuOpen(false)}>
            Portal
          </Link>
          <Link href="/residency/auth/login" className="r-btn r-btn-gold" style={{ justifyContent: 'center', marginTop: '0.5rem' }} onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .residency-desktop-nav { display: none !important; }
          .residency-mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
