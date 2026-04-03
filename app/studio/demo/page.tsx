'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SchoolPage, C, serif } from './_components/SchoolShell'

// ── CSS keyframes injected once ───────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes gradientShift {
    0%   { background-position: 0% 50% }
    50%  { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  @keyframes particleRise {
    0%   { transform: translateY(0) scale(1); opacity: 0 }
    10%  { opacity: 1 }
    90%  { opacity: 0.4 }
    100% { transform: translateY(-120vh) scale(0.4); opacity: 0 }
  }
`

// ── Floating orbs config ──────────────────────────────────────────────────────
const ORBS = [
  { size: 480, left: '5%',  top: '15%', color: 'rgba(200,162,74,0.13)',  dur: 9,  delay: 0 },
  { size: 360, left: '65%', top: '5%',  color: 'rgba(42,122,88,0.10)',   dur: 12, delay: 2 },
  { size: 520, left: '38%', top: '55%', color: 'rgba(200,162,74,0.07)',  dur: 14, delay: 1 },
  { size: 240, left: '80%', top: '65%', color: 'rgba(255,255,255,0.05)', dur: 10, delay: 3.5 },
  { size: 200, left: '18%', top: '75%', color: 'rgba(42,122,88,0.08)',   dur: 11, delay: 0.8 },
]

// ── Rising particles config ───────────────────────────────────────────────────
const PARTICLES = [2,5,9,13,18,23,30,37,44,51,58,65,72,78,84,90].map((left, i) => ({
  left: `${left}%`,
  size: i % 3 === 0 ? 3 : 2,
  delay: i * 0.55,
  dur: 6 + (i % 4) * 2.5,
}))

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Count-up ──────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!visible) return
    let v = 0
    const step = target / 45
    const t = setInterval(() => {
      v += step
      if (v >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(v))
    }, 28)
    return () => clearInterval(t)
  }, [visible, target])
  return <span ref={ref}>{count}{suffix}</span>
}

// ── Magnetic CTA ──────────────────────────────────────────────────────────────
function MagButton({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.28}px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'none' }
  return (
    <Link
      ref={ref} href={href}
      onMouseMove={move} onMouseLeave={reset}
      style={{
        display: 'inline-block',
        background: light ? '#fff' : C.copper,
        color: light ? C.slate : '#fff',
        padding: '16px 44px',
        fontSize: 12,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.2s',
        fontWeight: 500,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = light ? C.cream : '#b8902e')}
    >
      {children}
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DemoHome() {
  const [scrollY, setScrollY] = useState(0)
  const [heroIn, setHeroIn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 100)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <SchoolPage>
      <style>{KEYFRAMES}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: 80, paddingTop: 164 }}>
        {/* Photo */}
        <Image
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2000&q=85"
          alt="Child engaged in Montessori work"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%', transform: `scale(1.04) translateY(${scrollY * 0.08}px)` }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,36,16,0.92) 0%, rgba(61,36,16,0.35) 60%, rgba(61,36,16,0.2) 100%)' }} />

        {/* Floating orbs */}
        {ORBS.map((orb, i) => (
          <motion.div
            key={i}
            style={{ position: 'absolute', width: orb.size, height: orb.size, left: orb.left, top: orb.top, borderRadius: '50%', background: orb.color, filter: 'blur(72px)', pointerEvents: 'none', zIndex: 1 }}
            animate={{ y: [0, -50, 0], x: [0, 25, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: orb.dur, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Rising particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', bottom: 0, left: p.left, width: p.size, height: p.size,
              borderRadius: '50%', background: 'rgba(200,162,74,0.7)', pointerEvents: 'none', zIndex: 1,
              animation: `particleRise ${p.dur}s ${p.delay}s ease-out infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative px-8 md:px-16 w-full" style={{ zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: 32, opacity: heroIn ? 1 : 0, transition: 'opacity 0.8s ease 0.2s' }}>
            Lincoln Park &mdash; Chicago, Illinois
          </p>

          <h1 style={{ ...serif, fontSize: 'clamp(52px,9vw,112px)', color: '#fff', lineHeight: 0.93, letterSpacing: '-0.02em', marginBottom: 40 }}>
            {['A place', 'where children', 'go further.'].map((line, i) => (
              <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'block', transform: heroIn ? 'none' : 'translateY(110%)', transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.12}s` }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', opacity: heroIn ? 1 : 0, transition: 'opacity 0.9s ease 0.85s' }}>
            <MagButton href="/studio/demo/admissions">Schedule a Visit</MagButton>
            <Link
              href="/studio/demo/programs"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, letterSpacing: '0.05em', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2 }}
            >
              Explore Programs &rarr;
            </Link>
          </div>
        </div>

        {/* Scroll nudge */}
        <div style={{ position: 'absolute', bottom: 32, right: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2, opacity: heroIn ? 0.4 : 0, transition: 'opacity 1s ease 1.2s' }}>
          <div style={{ width: 1, height: 52, background: '#fff' }} />
        </div>
      </section>

      {/* ── QUICK LINKS BAR ───────────────────────────────────────────────── */}
      <nav style={{ background: C.copper, padding: '0 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', overflowX: 'auto' }}>
          {[
            { label: 'Who We Are',    href: '/studio/demo/about' },
            { label: 'Our Programs',  href: '/studio/demo/programs' },
            { label: 'Admissions',    href: '/studio/demo/admissions' },
            { label: 'School Life',   href: '/studio/demo#school-life' },
            { label: 'Open Houses',   href: '/studio/demo/admissions#events' },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', padding: '16px 28px', whiteSpace: 'nowrap', borderRight: '1px solid rgba(255,255,255,0.15)', transition: 'color 0.2s, background 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'transparent' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── LEAD STATEMENT ────────────────────────────────────────────────── */}
      <LeadStatement />

      {/* ── BY THE NUMBERS ────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ── PROGRAMS ──────────────────────────────────────────────────────── */}
      <ProgramsSection />

      {/* ── ABOUT PREVIEW ─────────────────────────────────────────────────── */}
      <AboutPreview />

      {/* ── SCHOOL LIFE ───────────────────────────────────────────────────── */}
      <SchoolLifeSection />

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── OPEN HOUSE CTA ────────────────────────────────────────────────── */}
      <OpenHouseSection />

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <ContactSection />

    </SchoolPage>
  )
}

// ── Section components ────────────────────────────────────────────────────────

function LeadStatement() {
  const { ref, visible } = useReveal(0.2)
  return (
    <section style={{ background: C.white, padding: '100px 64px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blob */}
      <div style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: 500, height: 500, opacity: 0.05, pointerEvents: 'none' }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
          <motion.path
            fill={C.sage}
            animate={{ d: [
              'M42.3,-60.1C54.5,-51.3,63.7,-37.8,69.1,-22.5C74.5,-7.2,76.1,9.9,70.5,24.2C64.9,38.5,52.1,50,38,58.2C23.9,66.4,8.5,71.3,-7.4,71.2C-23.3,71.1,-39.7,66,-52.4,55.9C-65.1,45.8,-74.1,30.7,-76.1,14.6C-78.1,-1.5,-73.1,-18.6,-64.2,-32.9C-55.3,-47.2,-42.5,-58.7,-28.5,-66.9C-14.5,-75.1,0.7,-80,15.6,-78.3C30.5,-76.6,30.1,-68.9,42.3,-60.1Z',
              'M35.6,-52.8C46.3,-44.6,55.3,-34.4,61.2,-22C67.1,-9.6,69.9,5,67.1,18.6C64.3,32.2,55.9,44.8,44.6,54.8C33.3,64.8,19.1,72.2,3.6,73C-11.9,73.8,-28.7,68,-42.7,58.3C-56.7,48.6,-67.9,35,-72.3,19.6C-76.7,4.2,-74.3,-13,-67.1,-27.8C-59.9,-42.6,-47.9,-55,-34.5,-62.8C-21.1,-70.6,-6.3,-73.8,6.8,-72.3C19.9,-70.8,24.9,-61,35.6,-52.8Z',
            ]}}
            transition={{ duration: 11, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </svg>
      </div>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 24, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          Our Philosophy
        </p>
        <p style={{ ...serif, fontSize: 'clamp(26px,3.5vw,44px)', color: C.text, lineHeight: 1.35, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
          Children are not vessels to be filled. They are builders of themselves —
          and the environment is the most powerful teacher in the room.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 36, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s' }}>
          <div style={{ width: 36, height: 1, background: C.copper }} />
          <Link href="/studio/demo/about" style={{ color: C.muted, fontSize: 13, letterSpacing: '0.04em', textDecoration: 'none' }}>
            Our approach to Montessori &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section style={{ position: 'relative', padding: '80px 64px', overflow: 'hidden', background: 'linear-gradient(-45deg, #3D2410, #2C1A0E, #1a0f06, #4a2e14)', backgroundSize: '400% 400%', animation: 'gradientShift 18s ease infinite' }}>
      {/* Floating blob accent */}
      <motion.div
        style={{ position: 'absolute', right: '-8%', top: '50%', translateY: '-50%', width: 420, height: 420, opacity: 0.07, pointerEvents: 'none' }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="420" height="420">
          <motion.path
            fill={C.copper}
            animate={{ d: [
              'M47.3,-64.1C60.5,-53.9,69.7,-39.2,73.4,-23.2C77.1,-7.2,75.2,9.9,68.9,24.8C62.6,39.7,51.9,52.4,38.5,61.4C25.1,70.4,9,75.7,-7.4,75.4C-23.8,75.1,-40.5,69.1,-53.1,58.2C-65.7,47.3,-74.3,31.5,-76.4,14.8C-78.5,-1.9,-74.2,-19.5,-65.1,-33.4C-56,-47.3,-42.1,-57.5,-27.8,-67.3C-13.5,-77.1,1.2,-86.5,15.1,-83.6C29,-80.7,34.1,-74.3,47.3,-64.1Z',
              'M39.7,-58.5C50.7,-49.8,58.2,-37.4,63.5,-23.5C68.8,-9.6,71.9,5.8,68.2,19.4C64.5,33,54,44.9,41.4,54.3C28.8,63.7,14.4,70.6,-1.6,72.6C-17.6,74.6,-35.2,71.7,-49.1,62.5C-63,53.3,-73.2,37.9,-76.3,21.1C-79.4,4.3,-75.4,-13.9,-67,-29.6C-58.6,-45.3,-45.8,-58.5,-31.4,-66.6C-17,-74.7,-1,-77.7,12.8,-75.2C26.6,-72.7,28.7,-67.2,39.7,-58.5Z',
            ]}}
            transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 52 }}>
          MMS by the Numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { value: 15, suffix: '+', label: 'Years in Lincoln Park' },
            { value: 148, suffix: '', label: 'Children enrolled' },
            { value: 9, suffix: ':1', label: 'Student to guide ratio' },
            { value: 98, suffix: '%', label: 'Families who re-enroll' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ ...serif, fontSize: 'clamp(40px,5vw,64px)', color: '#fff', lineHeight: 1, marginBottom: 8 }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const programs = [
  {
    name: 'Primary',
    ages: '3–6',
    slug: 'primary',
    desc: 'The foundational years. Children develop independence, concentration, and the habit of following their own curiosity through self-directed work with purpose-built materials.',
    photo: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lower Elementary',
    ages: '6–9',
    slug: 'elementary',
    desc: 'The age of imagination. Children explore history, mathematics, language, and the living world — drawn forward by their own questions and supported by small-group work.',
    photo: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Upper Elementary',
    ages: '9–12',
    slug: 'upper-elementary',
    desc: 'Young people ready for longer projects, deeper reasoning, and growing responsibility for the direction of their own learning. Collaboration and research are central.',
    photo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
  },
]

function ProgramsSection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="programs" style={{ background: C.cream, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 20, opacity: visible ? 1 : 0, transition: 'all 0.8s ease' }}>
          <div>
            <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 12 }}>Programs</p>
            <h2 style={{ ...serif, fontSize: 'clamp(30px,4vw,50px)', color: C.text, lineHeight: 1.1 }}>
              Three communities.<br />One continuum.
            </h2>
          </div>
          <Link
            href="/studio/demo/programs"
            style={{ color: C.copper, fontSize: 12, letterSpacing: '0.06em', textDecoration: 'none', borderBottom: `1px solid ${C.copper}`, paddingBottom: 2 }}
          >
            See all programs &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <ProgramCard key={p.slug} program={p} visible={visible} delay={0.1 + i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program, visible, delay }: { program: typeof programs[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ cx: 50, cy: 50 })
  const cardRef = useRef<HTMLAnchorElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width   // 0–1
    const ny = (e.clientY - r.top)  / r.height  // 0–1
    setTilt({ x: (ny - 0.5) * -14, y: (nx - 0.5) * 14 })
    setShine({ cx: nx * 100, cy: ny * 100 })
  }

  return (
    <Link
      ref={cardRef}
      href={`/studio/demo/programs#${program.slug}`}
      style={{
        textDecoration: 'none', display: 'block', position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.025)` : 'none'
          : 'translateY(28px)',
        transition: hovered
          ? `opacity 0.7s ease ${delay}s, transform 0.12s ease`
          : `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      onMouseMove={handleMouseMove}
    >
      {/* Specular shine overlay */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', borderRadius: 0,
          background: `radial-gradient(circle at ${shine.cx}% ${shine.cy}%, rgba(255,255,255,0.18) 0%, transparent 55%)`,
          transition: 'background 0.05s',
        }} />
      )}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', marginBottom: 24 }}>
        <Image
          src={program.photo}
          alt={`${program.name} classroom`}
          fill
          style={{ objectFit: 'cover', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(61,36,16,0.3)' : 'transparent', transition: 'background 0.4s' }} />
        <div style={{ position: 'absolute', top: 16, left: 16, background: C.copper, color: '#fff', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '5px 12px' }}>
          Ages {program.ages}
        </div>
      </div>
      <h3 style={{ ...serif, fontSize: 22, color: C.text, marginBottom: 10, transition: 'color 0.3s', ...(hovered ? { color: C.copper } : {}) }}>
        {program.name}
      </h3>
      <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{program.desc}</p>
      <p style={{ color: C.copper, fontSize: 12, marginTop: 16, letterSpacing: '0.04em' }}>Learn more &rarr;</p>
    </Link>
  )
}

function AboutPreview() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section style={{ background: C.white, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-24px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>About MMS</p>
          <h2 style={{ ...serif, fontSize: 'clamp(28px,3.5vw,46px)', color: C.text, lineHeight: 1.15, marginBottom: 24 }}>
            Rooted in Lincoln Park since 2009.
          </h2>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Montessori Makers School opened with twelve children in a converted coach house on Orchard Street.
            Fifteen years later, we serve 148 students across three classrooms — and the philosophy hasn't changed.
          </p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>
            We are accredited by the American Montessori Society and are members of the Illinois Alliance of
            Montessori Schools. Every lead guide holds AMI or AMS credentials.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/studio/demo/about" style={{ background: C.slate, color: '#fff', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', transition: 'background 0.2s' }}>
              Our Story
            </Link>
            <Link href="/studio/demo/about#faculty" style={{ border: `1px solid ${C.slate}`, color: C.slate, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', transition: 'all 0.2s' }}>
              Faculty & Staff
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', height: 480, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(24px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.2s' }}>
          <Image
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
            alt="MMS classroom environment"
            fill
            style={{ objectFit: 'cover' }}
          />
          {/* Accreditation badge */}
          <div style={{ position: 'absolute', bottom: -20, left: -20, background: C.copper, color: '#fff', padding: '20px 24px', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.6 }}>
            AMS Accredited<br />Since 2012
          </div>
        </div>
      </div>
    </section>
  )
}

const lifePhotos = [
  { src: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=700&q=80', label: 'Hands-on learning', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80', label: 'Collaborative work', span: '' },
  { src: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=700&q=80', label: 'Art & expression', span: '' },
  { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80', label: 'Community circle', span: '' },
  { src: 'https://images.unsplash.com/photo-1536337005238-94b997371b40?auto=format&fit=crop&w=700&q=80', label: 'Science exploration', span: '' },
]

function SchoolLifeSection() {
  const { ref, visible } = useReveal(0.08)
  return (
    <section id="school-life" style={{ background: C.slate, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20, opacity: visible ? 1 : 0, transition: 'all 0.8s ease' }}>
          <div>
            <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 12 }}>School Life</p>
            <h2 style={{ ...serif, fontSize: 'clamp(28px,3.5vw,46px)', color: '#fff', lineHeight: 1.1 }}>
              Learning that looks like living.
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, maxWidth: 380, lineHeight: 1.7 }}>
            From morning meeting to afternoon work cycle — every part of the day is
            part of the education.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: '220px' }}>
          {lifePhotos.map((photo, i) => (
            <div
              key={i}
              className={photo.span}
              style={{
                position: 'relative',
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <Image src={photo.src} alt={photo.label} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,36,16,0.7) 0%, transparent 60%)' }} />
              <p style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {photo.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const testimonials = [
  {
    quote: 'After two years in a traditional school, we were worried our daughter had lost her love of learning. Within three months at MMS, she was staying after the work cycle to finish a project she started on her own.',
    name: 'The Okafor Family',
    child: 'Primary, since 2021',
  },
  {
    quote: 'The guides actually know our son. Not just his name — his learning patterns, what excites him, where he gets stuck. That depth of observation is unlike anything we experienced elsewhere.',
    name: 'The Reinholt Family',
    child: 'Lower Elementary, since 2020',
  },
  {
    quote: "The three-year cycle seemed like a strange choice to us at first. Now we understand. Watching our daughter mentor a younger child using a material she mastered two years ago — that's not just learning. That's formation.",
    name: 'The Vasquez Family',
    child: 'Upper Elementary, since 2018',
  },
]

function TestimonialsSection() {
  const { ref, visible } = useReveal(0.1)
  const [active, setActive] = useState(0)
  return (
    <section style={{ background: C.cream, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
        <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 52 }}>
          From Our Families
        </p>
        <div style={{ position: 'relative', minHeight: 200 }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                opacity: active === i ? 1 : 0,
                transition: 'opacity 0.6s ease',
                pointerEvents: active === i ? 'auto' : 'none',
              }}
            >
              <p style={{ ...serif, fontSize: 'clamp(20px,2.5vw,30px)', color: C.text, lineHeight: 1.5, marginBottom: 32 }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 1, background: C.copper }} />
                <div>
                  <p style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{t.name}</p>
                  <p style={{ color: C.muted, fontSize: 12 }}>{t.child}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: active === i ? 32 : 8, height: 2, background: active === i ? C.copper : 'rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function OpenHouseSection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <Image
        src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1800&q=80"
        alt="MMS open house"
        fill
        style={{ objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(61,36,16,0.82)' }} />
      <div ref={ref} style={{ position: 'relative', zIndex: 2, padding: '100px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 1s ease' }}>
            <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>
              Upcoming Events
            </p>
            <h2 style={{ ...serif, fontSize: 'clamp(28px,3.5vw,48px)', color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              Come see it for yourself.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.75, marginBottom: 32 }}>
              The best way to understand what we do is to walk through the classroom during a
              work cycle. Every family who joins MMS started with a visit.
            </p>
            <MagButton href="/studio/demo/admissions#events">Reserve a Spot</MagButton>
          </div>
          <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.9s ease 0.25s' }}>
            {[
              { date: 'January 18, 2026', label: 'Open House — Primary & Elementary', time: '9:00–11:00 am' },
              { date: 'February 7, 2026',  label: 'Saturday Campus Tour',             time: '10:00–11:30 am' },
              { date: 'February 22, 2026', label: 'Open House — All Programs',        time: '9:00–11:00 am' },
              { date: 'March 8, 2026',     label: 'Coffee Chat with the Head of School', time: '8:30–9:30 am' },
            ].map((ev, i) => (
              <div key={i} style={{ borderTop: i === 0 ? `1px solid rgba(255,255,255,0.15)` : undefined, borderBottom: '1px solid rgba(255,255,255,0.15)', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16 }}>
                <div>
                  <p style={{ color: C.sage, fontSize: 11, marginBottom: 4 }}>{ev.date}</p>
                  <p style={{ color: '#fff', fontSize: 14 }}>{ev.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{ev.time}</p>
                </div>
                <Link href="/studio/demo/admissions#events" style={{ color: C.copper, fontSize: 11, letterSpacing: '0.08em', textDecoration: 'none', whiteSpace: 'nowrap', marginTop: 4 }}>
                  RSVP &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { ref, visible } = useReveal(0.2)
  return (
    <section id="contact" style={{ background: C.white, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-16" style={{ maxWidth: 1200, margin: '0 auto', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
        <div>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>Find Us</p>
          <h2 style={{ ...serif, fontSize: 'clamp(26px,3vw,40px)', color: C.text, marginBottom: 24 }}>
            We&rsquo;re on Orchard Street<br />in Lincoln Park.
          </h2>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 8 }}>2615 N Orchard Street</p>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 8 }}>Chicago, IL 60614</p>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 8 }}>(773) 555-0142</p>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>hello@montessorimakersschool.org</p>
          <Link href="/studio/demo/admissions" style={{ background: C.slate, color: '#fff', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>
            Begin Enrollment
          </Link>
        </div>
        <div>
          {/* Map placeholder */}
          <div style={{ background: '#E8E0D4', height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: C.muted, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Lincoln Park</p>
              <p style={{ ...serif, color: C.text, fontSize: 18 }}>2615 N Orchard St</p>
              <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>Chicago, IL 60614</p>
            </div>
            <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 11, color: C.muted }}>
              CTA: Red Line — Fullerton
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
