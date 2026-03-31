'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const serif = { fontFamily: 'var(--font-heading)' }

// ── Palette ──────────────────────────────────────────────────────────────────
export const C = {
  slate:  '#1F2937',
  cream:  '#F5EDE0',
  copper: '#B5714C',
  sage:   '#8FAA8C',
  white:  '#FDFAF5',
  text:   '#2C1F14',
  muted:  '#7A6A58',
}

// ── Demo Banner ───────────────────────────────────────────────────────────────
export function DemoBanner() {
  return (
    <div
      className="fixed left-0 right-0 flex items-center justify-center gap-6 px-6 text-center"
      style={{ top: 64, zIndex: 45, background: C.copper, height: 40 }}
    >
      <p className="text-white text-[11px] tracking-wide">
        <span className="font-semibold">Studio Demo</span>
        &ensp;&mdash;&ensp;Montessori Makers School is a fictional school built by{' '}
        <Link href="/studio" className="underline underline-offset-2 opacity-80 hover:opacity-100">
          Montessori Makers Studio
        </Link>{' '}
        to demonstrate web design capabilities.
      </p>
      <Link
        href="/studio/services#website-design-build"
        className="hidden sm:block whitespace-nowrap text-white text-[11px] border border-white/40 px-3 py-1 hover:bg-white/10 transition-colors"
      >
        Build yours &rarr;
      </Link>
    </div>
  )
}

// ── School Nav ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'About',      href: '/studio/demo/about' },
  { label: 'Programs',   href: '/studio/demo/programs' },
  { label: 'Admissions', href: '/studio/demo/admissions' },
  { label: 'School Life',href: '/studio/demo#school-life' },
  { label: 'Contact',    href: '/studio/demo#contact' },
]

export function SchoolNav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed left-0 right-0 flex items-center justify-between px-6 md:px-12 transition-all duration-400"
      style={{
        top: 104,
        zIndex: 44,
        height: 60,
        background: scrolled ? `rgba(31,41,55,0.96)` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <Link
        href="/studio/demo"
        style={{ ...serif, color: '#fff', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em', textDecoration: 'none' }}
      >
        MMS
      </Link>

      <div className="hidden md:flex items-center gap-7">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              color: pathname === l.href ? '#fff' : 'rgba(255,255,255,0.65)',
              fontSize: 12,
              letterSpacing: '0.07em',
              textDecoration: 'none',
              transition: 'color 0.2s',
              borderBottom: pathname === l.href ? `1px solid ${C.copper}` : 'none',
              paddingBottom: 2,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/studio/demo/admissions"
        style={{
          background: C.copper,
          color: '#fff',
          fontSize: 11,
          letterSpacing: '0.1em',
          padding: '9px 22px',
          textDecoration: 'none',
          textTransform: 'uppercase',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#9d5f3c')}
        onMouseLeave={e => (e.currentTarget.style.background = C.copper)}
      >
        Apply
      </Link>
    </nav>
  )
}

// ── School Footer ─────────────────────────────────────────────────────────────
export function SchoolFooter() {
  return (
    <footer style={{ background: C.slate, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
      {/* Top section */}
      <div
        className="px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-12"
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <div className="md:col-span-2">
          <p style={{ ...serif, color: '#fff', fontSize: 24, marginBottom: 12 }}>
            Montessori Makers School
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.8 }}>
            2615 N Orchard Street<br />
            Lincoln Park, Chicago, IL 60614
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 8 }}>
            (773) 555-0142
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            hello@montessorimakersschool.org
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            {['Instagram', 'Facebook', 'YouTube'].map(s => (
              <a
                key={s}
                href="#"
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.copper)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
            School
          </p>
          {[
            { label: 'About Us', href: '/studio/demo/about' },
            { label: 'Programs', href: '/studio/demo/programs' },
            { label: 'School Life', href: '/studio/demo#school-life' },
            { label: 'Faculty & Staff', href: '/studio/demo/about' },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 16 }}>
            Admissions
          </p>
          {[
            { label: 'How to Apply', href: '/studio/demo/admissions' },
            { label: 'Tuition & Aid', href: '/studio/demo/admissions#tuition' },
            { label: 'Schedule a Visit', href: '/studio/demo/admissions#visit' },
            { label: 'Open Houses', href: '/studio/demo/admissions#events' },
            { label: 'Contact Us', href: '/studio/demo#contact' },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: 'rgba(255,255,255,0.08) 1px solid', padding: '20px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, maxWidth: 1200, margin: '0 auto' }}
      >
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>
          &copy; 2025 Montessori Makers School. This is a demo site.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, textDecoration: 'none' }}>Accessibility</a>
          <Link href="/studio" style={{ color: C.copper, fontSize: 11, textDecoration: 'none' }}>
            Built by Montessori Makers Studio
          </Link>
        </div>
      </div>
    </footer>
  )
}

// ── Shared page wrapper ───────────────────────────────────────────────────────
export function SchoolPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DemoBanner />
      <SchoolNav />
      {children}
      <SchoolFooter />
    </>
  )
}

// ── Shared hooks ──────────────────────────────────────────────────────────────
export function useReveal(threshold = 0.15) {
  const ref = { current: null as HTMLDivElement | null }
  // Note: this is a factory — import and call in components
  return ref
}

export { serif }
