'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SchoolPage, C, serif } from '../_components/SchoolShell'

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const faculty = [
  { name: 'Dr. Amara Osei-Bonsu', role: 'Head of School', credential: 'AMI Diploma, Ed.D. — University of Illinois Chicago' },
  { name: 'Sarah Lindqvist',      role: 'Primary Lead Guide', credential: 'AMI Primary Diploma, M.Ed.' },
  { name: 'Marcus Treviño',       role: 'Primary Lead Guide', credential: 'AMS Early Childhood Credential' },
  { name: 'Yuki Nakashima',       role: 'Lower Elementary Lead', credential: 'AMI Elementary Diploma, M.Ed.' },
  { name: 'Kezia Abara',          role: 'Lower Elementary Lead', credential: 'AMS Elementary Credential, M.Ed.' },
  { name: 'James Kowalski',       role: 'Upper Elementary Lead', credential: 'AMI Elementary Diploma' },
]

const values = [
  { label: 'Independence', desc: 'Children choose their own work. The environment — not the guide — sets the invitation.' },
  { label: 'Observation', desc: 'We watch before we intervene. Understanding a child\'s actual needs comes before instruction.' },
  { label: 'Continuity', desc: 'Three-year cycles deepen relationships and let growth happen on a child\'s own timeline.' },
  { label: 'Prepared environment', desc: 'Every material, arrangement, and daily rhythm is intentional. The room itself teaches.' },
  { label: 'Whole child', desc: 'Academic development is inseparable from social, emotional, and physical development.' },
  { label: 'Family partnership', desc: 'We consider families the primary educators. The school extends that work — it doesn\'t replace it.' },
]

export default function AboutPage() {
  return (
    <SchoolPage>
      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: 64, paddingTop: 164 }}>
        <Image
          src="/demo/about-hero.png"
          alt="MMS community"
          fill style={{ objectFit: 'cover', objectPosition: 'center 35%' }} priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,36,16,0.9) 0%, rgba(61,36,16,0.3) 70%)' }} />
        <div className="relative px-8 md:px-16" style={{ zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>
            <Link href="/studio/demo" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &nbsp;/&nbsp; About
          </p>
          <h1 style={{ ...serif, fontSize: 'clamp(40px,6vw,80px)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            Who We Are
          </h1>
        </div>
      </section>

      {/* Mission */}
      <MissionSection />

      {/* Values */}
      <ValuesSection />

      {/* Head of school */}
      <HeadSection />

      {/* Faculty */}
      <FacultySection />

      {/* Accreditation */}
      <AccreditationSection />

      {/* CTA */}
      <section style={{ background: C.copper, padding: '80px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p style={{ ...serif, fontSize: 'clamp(22px,3vw,38px)', color: '#fff', marginBottom: 20 }}>
            Come see what we&rsquo;re about.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            The clearest way to understand this school is to walk through it during a work cycle.
          </p>
          <Link href="/studio/demo/admissions" style={{ background: '#fff', color: C.copper, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 44px', textDecoration: 'none', display: 'inline-block' }}>
            Schedule a Visit
          </Link>
        </div>
      </section>
    </SchoolPage>
  )
}

function MissionSection() {
  const { ref, visible } = useReveal(0.15)
  return (
    <section style={{ background: C.white, padding: '100px 64px' }}>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 1s ease' }}>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>Our Mission</p>
          <p style={{ ...serif, fontSize: 'clamp(22px,2.8vw,36px)', color: C.text, lineHeight: 1.4, marginBottom: 24 }}>
            To prepare children not for the next grade level, but for a life of purpose, curiosity, and contribution.
          </p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Montessori Makers School opened in 2009 in a converted coach house on Orchard Street in Lincoln Park.
            Twelve children enrolled that first year. We now serve 148 students across three classrooms.
          </p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>
            In fifteen years, the building has changed. The belief hasn&rsquo;t: that children, given the right
            environment and the freedom to use it, are capable of far more than most schools ask of them.
          </p>
        </div>
        <div style={{ position: 'relative', height: 460, opacity: visible ? 1 : 0, transition: 'opacity 1s ease 0.2s' }}>
          <Image
            src="/demo/about-detail.png"
            alt="MMS original classroom"
            fill style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section style={{ background: C.slate, padding: '100px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ marginBottom: 56, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>What We Believe</p>
          <h2 style={{ ...serif, fontSize: 'clamp(26px,3.5vw,44px)', color: '#fff', lineHeight: 1.1 }}>
            Six beliefs that shape everything.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={v.label}
              style={{
                borderTop: `2px solid ${C.copper}`,
                paddingTop: 24,
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: `all 0.7s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <p style={{ ...serif, fontSize: 20, color: '#fff', marginBottom: 12 }}>{v.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HeadSection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section style={{ background: C.cream, padding: '100px 64px', borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center" style={{ maxWidth: 1100, margin: '0 auto', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
        <div style={{ position: 'relative', height: 420 }}>
          <Image
            src="/demo/about-classroom.png"
            alt="Dr. Amara Osei-Bonsu, Head of School"
            fill style={{ objectFit: 'cover' }}
          />
        </div>
        <div>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 20 }}>Head of School</p>
          <h2 style={{ ...serif, fontSize: 32, color: C.text, marginBottom: 8 }}>Dr. Amara Osei-Bonsu</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 28, fontStyle: 'italic' }}>AMI Diploma &middot; Ed.D., University of Illinois Chicago</p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Dr. Osei-Bonsu joined MMS in 2015 after eleven years as a Montessori guide and administrator
            in Chicago and Atlanta. Her doctoral research focused on how Montessori environments support
            executive function development in early childhood.
          </p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>
            She believes the most important thing a school can do is take children seriously — their
            questions, their pace, and their readiness to be trusted.
          </p>
        </div>
      </div>
    </section>
  )
}

function FacultySection() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="faculty" style={{ background: C.white, padding: '100px 64px', borderTop: `1px solid rgba(0,0,0,0.06)` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={ref} style={{ marginBottom: 48, opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>Faculty</p>
          <h2 style={{ ...serif, fontSize: 'clamp(26px,3vw,42px)', color: C.text, lineHeight: 1.1 }}>
            100% of lead guides hold AMI or AMS credentials.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((f, i) => (
            <div
              key={f.name}
              style={{
                border: `1px solid rgba(0,0,0,0.08)`,
                padding: '28px 24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(16px)',
                transition: `all 0.7s ease ${0.08 + i * 0.08}s`,
              }}
            >
              <p style={{ ...serif, fontSize: 18, color: C.text, marginBottom: 6 }}>{f.name}</p>
              <p style={{ color: C.copper, fontSize: 12, letterSpacing: '0.04em', marginBottom: 10 }}>{f.role}</p>
              <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{f.credential}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AccreditationSection() {
  const { ref, visible } = useReveal(0.2)
  return (
    <section style={{ background: C.slate, padding: '60px 64px' }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', opacity: visible ? 1 : 0, transition: 'opacity 1s ease' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', flexShrink: 0 }}>
          Accreditation &amp; Memberships
        </p>
        {['American Montessori Society (AMS)', 'Illinois Alliance of Montessori Schools', 'National Association of Independent Schools', 'Midwest Association of Independent Schools'].map(a => (
          <div key={a} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
