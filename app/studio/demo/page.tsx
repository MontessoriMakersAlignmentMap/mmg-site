'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SchoolPage, C, serif } from './_components/SchoolShell'

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
      onMouseEnter={e => (e.currentTarget.style.background = light ? C.cream : '#9d5f3c')}
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

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: 80, paddingTop: 164 }}>
        {/* Photo */}
        <Image
          src="https://images.unsplash.com/photo-MvWgKCjEi6o?auto=format&fit=crop&w=2000&q=85"
          alt="Children in Montessori classroom circle"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%', transform: `scale(1.04) translateY(${scrollY * 0.08}px)` }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,41,55,0.92) 0%, rgba(31,41,55,0.35) 60%, rgba(31,41,55,0.2) 100%)' }} />

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
    <section style={{ background: C.white, padding: '100px 64px' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto' }}>
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
    <section style={{ background: C.slate, padding: '80px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
    photo: 'https://images.unsplash.com/photo-8H0EBM9LCZQ?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Lower Elementary',
    ages: '6–9',
    slug: 'elementary',
    desc: 'The age of imagination. Children explore history, mathematics, language, and the living world — drawn forward by their own questions and supported by small-group work.',
    photo: 'https://images.unsplash.com/photo-vr2l5FGuJQI?auto=format&fit=crop&w=900&q=80',
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
  return (
    <Link
      href={`/studio/demo/programs#${program.slug}`}
      style={{ textDecoration: 'none', display: 'block', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'relative', height: 260, overflow: 'hidden', marginBottom: 24 }}>
        <Image
          src={program.photo}
          alt={`${program.name} classroom`}
          fill
          style={{ objectFit: 'cover', transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.6s ease' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(31,41,55,0.3)' : 'transparent', transition: 'background 0.4s' }} />
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
            src="https://images.unsplash.com/photo-oKe_Dwv-Kkk?auto=format&fit=crop&w=900&q=80"
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
  { src: 'https://images.unsplash.com/photo-8H0EBM9LCZQ?auto=format&fit=crop&w=700&q=80', label: 'Montessori materials', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-domMQ19vNBk?auto=format&fit=crop&w=700&q=80', label: 'Art & ceramics', span: '' },
  { src: 'https://images.unsplash.com/photo-6vXTBvk2ECM?auto=format&fit=crop&w=700&q=80', label: 'Outdoor learning', span: '' },
  { src: 'https://images.unsplash.com/photo-MvWgKCjEi6o?auto=format&fit=crop&w=700&q=80', label: 'Community circle', span: '' },
  { src: 'https://images.unsplash.com/photo-9NiGvGnscrY?auto=format&fit=crop&w=700&q=80', label: 'School community', span: '' },
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
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,41,55,0.7) 0%, transparent 60%)' }} />
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(31,41,55,0.82)' }} />
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
