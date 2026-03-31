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

const programs = [
  {
    id: 'primary',
    number: '01',
    name: 'Primary',
    ages: 'Ages 3–6',
    photo: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Where it begins.',
    description: 'The Primary years are the most formative in a child\'s development. At MMS, the classroom is prepared as a complete environment — every material at the right height, every shelf arranged to invite attention, every routine designed to build independence without anyone telling a child what they must do next.',
    description2: 'Children in the Primary classroom choose their own work. They move freely. They develop concentration through repetition, not direction. The guide\'s role is observation — knowing when to step in, and more often, knowing when not to.',
    pillars: ['Practical life', 'Sensorial materials', 'Language development', 'Early mathematics', 'Cultural studies', 'Grace and courtesy'],
    schedule: 'Full day (8:00 am – 3:15 pm) and half day (8:00 am – 12:00 pm) options available.',
  },
  {
    id: 'elementary',
    number: '02',
    name: 'Lower Elementary',
    ages: 'Ages 6–9',
    photo: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The age of why.',
    description: 'Something shifts around age six. Children become intensely interested in the world beyond their immediate experience — in history, in how things work, in fairness and belonging. The Elementary curriculum at MMS meets this moment directly.',
    description2: 'The Great Lessons — five foundational stories about the origin of the universe, life, humans, language, and mathematics — orient children to the whole before the parts. From there, each child\'s curiosity determines the path. Research, projects, and collaborative work are central.',
    pillars: ['The Great Lessons', 'Research and project work', 'Collaborative learning', 'Advanced mathematics', 'Reading and writing', 'Natural science and geography'],
    schedule: 'Full day (8:00 am – 3:15 pm). After-care available until 6:00 pm.',
  },
  {
    id: 'upper-elementary',
    number: '03',
    name: 'Upper Elementary',
    ages: 'Ages 9–12',
    photo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Independent thinking, real work.',
    description: 'Upper Elementary students are developing their capacity for abstract reasoning, sustained effort, and genuine collaboration. The curriculum asks more of them — longer projects, more sophisticated research, peer teaching — and they rise to meet it.',
    description2: 'By this stage, students are largely self-directed. They set their own work plans, manage their time across multi-week projects, and regularly present their learning to the community. Guides shift into the role of consultant and coach.',
    pillars: ['Self-directed research', 'Long-form writing and publication', 'Advanced mathematics and geometry', 'Science experiments and methodology', 'Leadership and mentorship', 'Community service projects'],
    schedule: 'Full day (8:00 am – 3:30 pm). After-care available until 6:00 pm.',
  },
]

export default function ProgramsPage() {
  return (
    <SchoolPage>
      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: 64, paddingTop: 164 }}>
        <Image
          src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=2000&q=80"
          alt="MMS classroom"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(31,41,55,0.9) 0%, rgba(31,41,55,0.3) 70%)' }} />
        <div className="relative px-8 md:px-16" style={{ zIndex: 2, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <p style={{ color: C.sage, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 16 }}>
            <Link href="/studio/demo" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link> &nbsp;/&nbsp; Programs
          </p>
          <h1 style={{ ...serif, fontSize: 'clamp(40px,6vw,80px)', color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            Our Programs
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: C.white, padding: '80px 64px', borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ ...serif, fontSize: 'clamp(20px,2.5vw,30px)', color: C.text, lineHeight: 1.5 }}>
            MMS serves children from age three through twelve across three age-grouped communities.
            Each is a distinct environment — and each flows naturally into the next.
          </p>
          <div style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
            {programs.map(p => (
              <a key={p.id} href={`#${p.id}`} style={{ color: C.copper, fontSize: 12, letterSpacing: '0.06em', textDecoration: 'none', borderBottom: `1px solid ${C.copper}`, paddingBottom: 2 }}>
                {p.name} &rarr;
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Program sections */}
      {programs.map((p, i) => (
        <ProgramSection key={p.id} program={p} flip={i % 2 !== 0} />
      ))}

      {/* CTA */}
      <section style={{ background: C.slate, padding: '80px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <p style={{ ...serif, fontSize: 'clamp(24px,3vw,40px)', color: '#fff', marginBottom: 20 }}>
            Ready to see it in person?
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            Every family who joins MMS started with a classroom visit. We&rsquo;d love to show you around.
          </p>
          <Link
            href="/studio/demo/admissions"
            style={{ background: C.copper, color: '#fff', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '16px 44px', textDecoration: 'none', display: 'inline-block', transition: 'background 0.2s' }}
          >
            Schedule a Visit
          </Link>
        </div>
      </section>
    </SchoolPage>
  )
}

function ProgramSection({ program: p, flip }: { program: typeof programs[0]; flip: boolean }) {
  const { ref, visible } = useReveal(0.08)
  return (
    <section id={p.id} style={{ background: flip ? C.cream : C.white, padding: '100px 64px', borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
      <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-start`} style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Photo — flips side on even rows */}
        <div style={{ order: flip ? 2 : 1, position: 'relative', height: 500, opacity: visible ? 1 : 0, transform: visible ? 'none' : `translateX(${flip ? 24 : -24}px)`, transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.1s' }}>
          <Image src={p.photo} alt={p.name} fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 20, left: flip ? 'auto' : 20, right: flip ? 20 : 'auto', background: C.copper, color: '#fff', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 14px' }}>
            {p.ages}
          </div>
        </div>

        {/* Text */}
        <div style={{ order: flip ? 1 : 2, opacity: visible ? 1 : 0, transform: visible ? 'none' : `translateX(${flip ? -24 : 24}px)`, transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
          <p style={{ color: C.copper, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 8 }}>{p.number}</p>
          <p style={{ color: C.muted, fontSize: 14, fontStyle: 'italic', marginBottom: 12 }}>{p.tagline}</p>
          <h2 style={{ ...serif, fontSize: 'clamp(28px,3.5vw,46px)', color: C.text, marginBottom: 24, lineHeight: 1.1 }}>{p.name}</h2>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>{p.description}</p>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8, marginBottom: 36 }}>{p.description2}</p>

          <div style={{ marginBottom: 32 }}>
            <p style={{ color: C.text, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>What&rsquo;s included</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
              {p.pillars.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: C.copper, flexShrink: 0 }} />
                  <p style={{ color: C.muted, fontSize: 13 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: `1px solid rgba(0,0,0,0.08)`, paddingTop: 20 }}>
            <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
              <span style={{ fontWeight: 600, color: C.text }}>Schedule: </span>{p.schedule}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
