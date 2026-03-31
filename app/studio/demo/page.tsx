'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Word-by-word reveal ───────────────────────────────────────────────────────
function WordReveal({
  text,
  baseDelay = 0,
  visible,
  className,
}: {
  text: string
  baseDelay?: number
  visible: boolean
  className?: string
}) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ marginRight: '0.28em' }}>
          <span
            style={{
              display: 'inline-block',
              transform: visible ? 'translateY(0)' : 'translateY(115%)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${baseDelay + i * 0.07}s, opacity 0.5s ease ${baseDelay + i * 0.07}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}

// ── Magnetic button ───────────────────────────────────────────────────────────
function MagneticLink({
  href,
  children,
  className,
  style,
}: {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'inline-block', ...style }}
    >
      {children}
    </a>
  )
}

// ── Hover card (program card) ─────────────────────────────────────────────────
const programs = [
  {
    age: '3–6',
    name: 'Primary',
    desc: 'The foundational years. Children build independence, concentration, and the habit of following their own curiosity through self-directed work.',
    accent: '#4a8a5a',
  },
  {
    age: '6–9',
    name: 'Lower Elementary',
    desc: 'The age of imagination. Children explore history, language, mathematics, and the physical world — drawn forward by their own questions.',
    accent: '#1C3A2A',
  },
  {
    age: '9–12',
    name: 'Upper Elementary',
    desc: 'Young people ready for deeper reasoning, longer projects, and growing responsibility for the direction of their own learning.',
    accent: '#B85C28',
  },
]

function ProgramCard({
  program,
  visible,
  delay,
}: {
  program: (typeof programs)[0]
  visible: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? program.accent : '#FDFAF5',
        border: `1px solid ${hovered ? 'transparent' : '#E4DDD3'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `background 0.45s ease, border-color 0.45s ease, opacity 0.7s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        cursor: 'default',
      }}
      className="p-10"
    >
      <p
        style={{
          color: hovered ? 'rgba(255,255,255,0.5)' : '#B85C28',
          transition: 'color 0.4s',
          fontSize: 10,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: 24,
        }}
      >
        Ages {program.age}
      </p>
      <h3
        style={{
          ...serif,
          color: hovered ? '#fff' : '#1C3A2A',
          transition: 'color 0.4s',
          fontSize: 28,
          marginBottom: 16,
          lineHeight: 1.1,
        }}
      >
        {program.name}
      </h3>
      <p
        style={{
          color: hovered ? 'rgba(255,255,255,0.75)' : '#6B5E4C',
          transition: 'color 0.4s',
          fontSize: 14,
          lineHeight: 1.75,
        }}
      >
        {program.desc}
      </p>
    </div>
  )
}

// ── Stat ticker ───────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useReveal(0.5)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [visible, target])
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function DemoSchoolPage() {
  const [scrollY, setScrollY] = useState(0)
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    // Slight delay so CSS transitions fire after mount
    const t = setTimeout(() => setHeroIn(true), 80)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* ── Grain overlay ───────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9999,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.032,
        }}
      />

      {/* ── Demo banner (fixed below MMG nav ~64px) ─────────────────────────── */}
      <div
        className="fixed left-0 right-0 flex items-center justify-center gap-8 px-6"
        style={{
          top: 64,
          zIndex: 45,
          background: '#B85C28',
          height: 40,
        }}
      >
        <p className="text-white text-[11px] tracking-wide">
          <span className="font-semibold">Studio Demo</span>
          &ensp;&mdash;&ensp;Montessori Makers School is a fictional school.{' '}
          <Link href="/studio/services#website-design-build" className="underline underline-offset-2 opacity-80 hover:opacity-100">
            Want one like this?
          </Link>
        </p>
      </div>

      {/* ── School nav (fixed below MMG nav + banner) ───────────────────────── */}
      <nav
        className="fixed left-0 right-0 flex items-center justify-between px-8 md:px-14"
        style={{
          top: 104,
          zIndex: 44,
          height: 56,
          background: scrollY > 60 ? 'rgba(28,58,42,0.96)' : 'transparent',
          backdropFilter: scrollY > 60 ? 'blur(12px)' : 'none',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <span style={{ ...serif, color: '#fff', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>
          MMS
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Program', 'Environment', 'Philosophy', 'Enroll'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 12,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#enroll"
          style={{
            border: '1px solid rgba(255,255,255,0.35)',
            color: '#fff',
            fontSize: 11,
            letterSpacing: '0.1em',
            padding: '8px 20px',
            textDecoration: 'none',
            transition: 'background 0.2s, border-color 0.2s',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = '#fff'
            el.style.color = '#1C3A2A'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = '#fff'
          }}
        >
          Begin Enrollment
        </a>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#1C3A2A',
          minHeight: '100vh',
          paddingTop: 200, // clears: MMG nav(64) + banner(40) + school nav(56) + breathing room
          paddingBottom: 80,
          paddingLeft: 0,
          paddingRight: 0,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* Parallax organic shape */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 25% 55%, rgba(74,138,90,0.25) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.12}px)`,
            pointerEvents: 'none',
          }}
        />
        {/* Floating circle */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '8%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: '#B85C28',
            opacity: 0.08,
            transform: `translateY(${scrollY * 0.18}px)`,
            pointerEvents: 'none',
          }}
        />
        {/* Second circle outline */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '4%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.06)',
            transform: `translateY(${scrollY * 0.09}px)`,
            pointerEvents: 'none',
          }}
        />

        <div className="relative px-8 md:px-16 max-w-7xl" style={{ zIndex: 2 }}>
          <p
            style={{
              color: '#7aaa8a',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: 36,
              opacity: heroIn ? 1 : 0,
              transform: heroIn ? 'none' : 'translateY(10px)',
              transition: 'all 0.8s ease 0.15s',
            }}
          >
            Montessori Makers School &mdash; Portland, Oregon
          </p>

          <h1
            style={{
              ...serif,
              fontSize: 'clamp(56px, 10vw, 120px)',
              color: '#fff',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginBottom: 48,
            }}
          >
            {[
              { word: 'Learning', delay: 0.35 },
              { word: 'that', delay: 0.44 },
              { word: 'takes', delay: 0.53 },
              { word: 'root.', delay: 0.62 },
            ].map(({ word, delay }) => (
              <span
                key={word}
                style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em' }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transform: heroIn ? 'translateY(0)' : 'translateY(110%)',
                    transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 32,
            }}
          >
            <p
              style={{
                color: '#9abba8',
                fontSize: 18,
                lineHeight: 1.65,
                maxWidth: 440,
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? 'none' : 'translateY(16px)',
                transition: 'all 0.9s ease 0.85s',
              }}
            >
              A prepared environment for children ages 3–12 in Portland&rsquo;s
              Sellwood neighborhood. Opened 2009.
            </p>

            {/* Scroll indicator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                color: 'rgba(255,255,255,0.3)',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: heroIn ? 1 : 0,
                transition: 'opacity 1s ease 1.2s',
              }}
            >
              <span>Scroll</span>
              <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.15)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LEAD STATEMENT ──────────────────────────────────────────────────── */}
      <LeadSection />

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ── PROGRAMS ────────────────────────────────────────────────────────── */}
      <ProgramSection />

      {/* ── ENVIRONMENT FULL BLEED ──────────────────────────────────────────── */}
      <EnvironmentSection scrollY={scrollY} />

      {/* ── PHILOSOPHY ──────────────────────────────────────────────────────── */}
      <PhilosophySection />

      {/* ── ENROLLMENT CTA ──────────────────────────────────────────────────── */}
      <EnrollSection />

      {/* ── SCHOOL FOOTER ───────────────────────────────────────────────────── */}
      <footer
        style={{ background: '#111', padding: '48px 56px', borderTop: '1px solid #222' }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 32,
          }}
        >
          <div>
            <p style={{ ...serif, color: '#fff', fontSize: 20, marginBottom: 8 }}>
              Montessori Makers School
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
              4211 SE Milwaukie Ave, Portland OR 97202
            </p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 4 }}>
              hello@montessorimakersschool.org
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, marginBottom: 6 }}>
              This is a Studio demo. Not a real school.
            </p>
            <Link
              href="/studio"
              style={{ color: '#B85C28', fontSize: 12, textDecoration: 'none' }}
            >
              Built by Montessori Makers Studio &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}

// ── Section components ────────────────────────────────────────────────────────

function LeadSection() {
  const { ref, visible } = useReveal(0.2)
  return (
    <section style={{ background: '#F7F0E4', padding: '120px 64px' }}>
      <div ref={ref} style={{ maxWidth: 860, margin: '0 auto' }}>
        <p
          style={{
            ...serif,
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#1C3A2A',
            lineHeight: 1.3,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
            transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          Children learn best when the environment answers before the question is asked.
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 40,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.35s',
          }}
        >
          <div style={{ width: 40, height: 1, background: '#B85C28' }} />
          <p style={{ color: '#8a7560', fontSize: 13, letterSpacing: '0.05em' }}>
            Serving Portland families since 2009
          </p>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section
      style={{
        background: '#1C3A2A',
        padding: '80px 64px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 48,
        }}
      >
        {[
          { value: 15, suffix: '+', label: 'Years in Portland' },
          { value: 120, suffix: '', label: 'Children enrolled' },
          { value: 3, suffix: '', label: 'Age-grouped classrooms' },
          { value: 94, suffix: '%', label: 'Family retention rate' },
        ].map((stat) => (
          <div key={stat.label}>
            <p
              style={{
                ...serif,
                fontSize: 56,
                color: '#fff',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p style={{ color: '#7aaa8a', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProgramSection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="program" style={{ background: '#FDFAF5', padding: '100px 64px', borderTop: '1px solid #EAE3D9' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          ref={ref}
          style={{
            marginBottom: 56,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'all 0.8s ease',
          }}
        >
          <p style={{ color: '#B85C28', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            Program
          </p>
          <h2 style={{ ...serif, fontSize: 'clamp(32px, 4vw, 52px)', color: '#1C3A2A', lineHeight: 1.1 }}>
            Three communities.<br />One continuum.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {programs.map((p, i) => (
            <ProgramCard key={p.name} program={p} visible={visible} delay={0.1 + i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EnvironmentSection({ scrollY }: { scrollY: number }) {
  const { ref, visible } = useReveal(0.05)
  return (
    <section
      id="environment"
      ref={ref}
      style={{
        background: '#1C3A2A',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 64px',
      }}
    >
      {/* Animated background elements */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.04}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.07)',
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.06}px)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: '#B85C28',
          opacity: 0.07,
          transform: `translateY(${scrollY * 0.08}px)`,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 760, textAlign: 'center' }}>
        <p
          style={{
            color: '#7aaa8a',
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 32,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          The Environment
        </p>
        <p
          style={{
            ...serif,
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#fff',
            lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(40px)',
            transition: 'all 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s',
          }}
        >
          The classroom is not a room.
          <br />
          <span style={{ color: '#7aaa8a' }}>It&rsquo;s a set of conditions.</span>
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '32px auto 0',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 0.6s',
          }}
        >
          Every shelf is arranged to invite attention. Every material exists for a reason.
          The environment itself teaches.
        </p>
      </div>
    </section>
  )
}

const values = [
  {
    label: 'Independence',
    desc: 'Children choose their own work and sustain their own attention — not because they are told to, but because the environment makes it possible.',
  },
  {
    label: 'Observation',
    desc: 'Guides watch before intervening. Understanding what a child actually needs comes before instruction.',
  },
  {
    label: 'Continuity',
    desc: 'Three-year cycles allow relationships to deepen and growth to happen on a child&rsquo;s own timeline.',
  },
  {
    label: 'The prepared environment',
    desc: 'Every material, every arrangement, every daily rhythm is intentional. The room itself communicates what is valued.',
  },
]

function PhilosophySection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="philosophy" style={{ background: '#F7F0E4', padding: '110px 64px' }}>
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start"
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(-24px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p style={{ color: '#B85C28', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>
            How We Work
          </p>
          <h2 style={{ ...serif, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#1C3A2A', lineHeight: 1.15 }}>
            The method is not a technique. It&rsquo;s a set of beliefs about children.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {values.map((v, i) => (
            <div
              key={v.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `all 0.8s ease ${0.15 + i * 0.1}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 20, height: 1, background: '#B85C28', flexShrink: 0 }} />
                <p style={{ color: '#1C3A2A', fontSize: 14, fontWeight: 600, letterSpacing: '0.02em' }}>
                  {v.label}
                </p>
              </div>
              <p
                style={{ color: '#6B5E4C', fontSize: 14, lineHeight: 1.75, paddingLeft: 32 }}
                dangerouslySetInnerHTML={{ __html: v.desc }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EnrollSection() {
  const { ref, visible } = useReveal(0.15)
  return (
    <section id="enroll" style={{ background: '#1C3A2A', padding: '120px 64px' }}>
      <div ref={ref} style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <p
          style={{
            color: '#7aaa8a',
            fontSize: 10,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: 32,
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          Enrollment
        </p>
        <h2
          style={{
            ...serif,
            fontSize: 'clamp(36px, 5vw, 68px)',
            color: '#fff',
            lineHeight: 1.05,
            marginBottom: 24,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(28px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          Begin with a conversation.
        </h2>
        <p
          style={{
            color: '#9abba8',
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 480,
            margin: '0 auto 52px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 0.35s',
          }}
        >
          We meet with every family before enrollment. It&rsquo;s how we learn what a child needs
          — and how you learn whether this is the right environment.
        </p>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(12px)',
            transition: 'all 0.8s ease 0.5s',
          }}
        >
          <MagneticLink
            href="#"
            className="inline-block text-white text-xs tracking-[0.12em] uppercase"
            style={{ background: '#B85C28', padding: '18px 52px', textDecoration: 'none' }}
          >
            Schedule a Visit
          </MagneticLink>
        </div>
      </div>
    </section>
  )
}
