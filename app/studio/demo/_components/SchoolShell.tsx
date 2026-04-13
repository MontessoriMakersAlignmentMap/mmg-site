'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const serif = { fontFamily: 'var(--font-heading)' }

// ── Palette ──────────────────────────────────────────────────────────────────
export const C = {
  slate:  '#3D2410',   // deep walnut
  cream:  '#FAF5ED',   // warm cream
  copper: '#C8A24A',   // gold
  sage:   '#2A7A58',   // jade / emerald
  white:  '#FDFAF4',   // warm white
  text:   '#2C1A0E',   // dark walnut
  muted:  '#8A7060',   // warm brown-gray
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
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed left-0 right-0 flex items-center justify-between px-6 md:px-12 transition-all duration-400"
        style={{
          top: 104,
          zIndex: 44,
          height: 60,
          background: scrolled || menuOpen ? `rgba(61,36,16,0.97)` : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
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

        <div className="flex items-center gap-4">
          <Link
            href="/studio/demo/admissions"
            className="hidden md:block"
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
            onMouseEnter={e => (e.currentTarget.style.background = '#b8902e')}
            onMouseLeave={e => (e.currentTarget.style.background = C.copper)}
          >
            Apply
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                display: 'block', width: 22, height: 1.5, background: '#fff',
                transformOrigin: 'center',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block', width: 22, height: 1.5, background: '#fff',
                transition: 'opacity 0.3s',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block', width: 22, height: 1.5, background: '#fff',
                transformOrigin: 'center',
                transition: 'transform 0.3s, opacity 0.3s',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className="md:hidden fixed inset-0 flex flex-col"
        style={{
          top: 164,
          zIndex: 43,
          background: C.slate,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                ...serif,
                color: pathname === l.href ? C.copper : 'rgba(255,255,255,0.85)',
                fontSize: 28,
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                transform: menuOpen ? 'none' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.06}s, opacity 0.4s ease ${0.05 + i * 0.06}s`,
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div
          style={{
            marginTop: 40,
            transform: menuOpen ? 'none' : 'translateY(20px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.5s ease 0.35s',
          }}
        >
          <Link
            href="/studio/demo/admissions"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-block',
              background: C.copper,
              color: '#fff',
              fontSize: 12,
              letterSpacing: '0.12em',
              padding: '14px 36px',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            Apply Now
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 32 }}>
            2615 N Orchard Street · Lincoln Park, Chicago
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 6 }}>
            (773) 555-0142
          </p>
        </div>
      </div>
    </>
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
