'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const serif = { fontFamily: 'var(--font-heading)' }

const TESTIMONIALS = [
  {
    quote:
      'We came in thinking we had a communication problem. We left knowing it was a systems problem — and for the first time, we had a real plan for it.',
    name: 'Head of School',
    role: 'Independent Montessori, Mid-Atlantic',
    school: '',
    service: 'Advisory',
    featured: true,
  },
  {
    quote:
      'We had the pleasure of working with Hannah during a critical hiring phase, and her professionalism stood out from the very beginning. She navigated a complex search with care and clarity — combining professionalism with a personal touch.',
    name: 'Alisa Anania',
    role: 'Head of School',
    school: 'The Tidewater School',
    service: 'Strategic Search',
  },
  {
    quote:
      "I couldn't have done this without Montessori Makers Group. We appreciate her Montessori knowledge and background combined with the deep analysis of each candidate. It made all the difference in finding the right fit for our community.",
    name: 'Rebecca',
    role: 'Director',
    school: 'Wheaton Montessori',
    service: 'Strategic Search',
  },
  {
    quote:
      'The frameworks gave me language I didn\'t have before — and practical tools I could use the very next week.',
    name: 'Sonja Villalba',
    role: 'Administrator',
    school: 'School in the Hills',
    service: 'Staffing Course',
  },
  {
    quote:
      'It feels transformed. Working with Hannah gave me the clarity and structure I needed to lead with more intention. You make the hard stuff feel possible.',
    name: 'J. McGee',
    role: 'School Leader',
    school: '',
    service: 'Leadership Coaching',
  },
  {
    quote:
      'This professional development was exactly what our team needed. It bridged the gap between Montessori philosophy and the practical realities of running a school today.',
    name: 'Workshop Participant',
    role: 'Montessori Educator',
    school: '',
    service: 'Professional Development',
  },
  {
    quote:
      'I left the intensive with a framework I could actually use Monday morning. That almost never happens with leadership development.',
    name: 'School Director',
    role: 'Public Montessori, Midwest',
    school: '',
    service: 'Leadership Intensive',
  },
]

function Card({ t, delay, large = false }: { t: typeof TESTIMONIALS[0]; delay: number; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px 0px' })

  return (
    <motion.div
      ref={ref}
      className={`break-inside-avoid mb-5 bg-white/[0.06] border border-white/10 p-7 hover:bg-white/[0.09] transition-colors ${large ? 'border-l-2 border-l-[#d6a758]/60' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <p
        className="text-[#d6a758]/40 text-5xl leading-none mb-3 select-none"
        style={serif}
        aria-hidden
      >
        &ldquo;
      </p>
      <p className={`text-white leading-[1.75] mb-6 ${large ? 'text-lg md:text-xl' : 'text-base'}`} style={large ? serif : undefined}>
        {t.quote}
      </p>
      <div>
        <p className="text-white font-semibold text-sm tracking-wide">{t.name}</p>
        <p className="text-[#94A3B8] text-xs mt-0.5">
          {t.role}{t.school ? `, ${t.school}` : ''}
        </p>
        <span className="inline-block mt-2 text-[#d6a758] text-[9px] tracking-[0.18em] uppercase border border-[#d6a758]/40 px-2 py-0.5">
          {t.service}
        </span>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const featured = TESTIMONIALS.find((t) => t.featured)!
  const rest = TESTIMONIALS.filter((t) => !t.featured)

  return (
    <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-[#d6a758] text-[11px] tracking-[0.24em] uppercase mb-12">
          From the Community
        </p>

        {/* Featured quote — full width */}
        <Card t={featured} delay={0} large />

        {/* Masonry grid — remaining testimonials */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 mt-0">
          {rest.map((t, i) => (
            <Card key={t.name} t={t} delay={0.08 + i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}
