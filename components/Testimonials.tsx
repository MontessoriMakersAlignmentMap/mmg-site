'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const serif = { fontFamily: 'var(--font-heading)' }

const TESTIMONIALS = [
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
      'I have already suggested the course for my team in leadership. The frameworks gave me language I didn\'t have before — and practical tools I could use the very next week.',
    name: 'Sonja Villalba',
    role: 'Administrator',
    school: 'School in the Hills',
    service: 'Staffing Course',
  },
  {
    quote:
      'It feels transformed. Working with Hannah gave me the clarity and structure I needed to lead with more intention. You are such a fun person to connect with — and you make the hard stuff feel possible.',
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
      'We came in thinking we had a communication problem. We left knowing it was a systems problem — and for the first time, we had a real plan for it.',
    name: 'Head of School',
    role: 'Independent Montessori, Mid-Atlantic',
    school: '',
    service: 'Advisory',
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

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [inView, paused])

  const t = TESTIMONIALS[active]

  return (
    <section
      ref={ref}
      className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <p className="text-[#d6a758] text-[11px] tracking-[0.24em] uppercase mb-12">
          From the Community
        </p>

        {/* Quote */}
        <div className="min-h-[10rem] flex items-start mb-10">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-white text-xl md:text-2xl lg:text-3xl leading-[1.45] tracking-tight"
              style={serif}
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Attribution + nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-attr'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white font-semibold text-sm tracking-wide">{t.name}</p>
              <p className="text-[#94A3B8] text-sm mt-0.5">
                {t.role}{t.school ? `, ${t.school}` : ''}
              </p>
              <span className="inline-block mt-2 text-[#d6a758] text-[9px] tracking-[0.18em] uppercase border border-[#d6a758]/40 px-2 py-0.5">
                {t.service}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true) }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-[#d6a758] scale-125'
                    : 'bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        {!paused && inView && (
          <div className="mt-10 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              key={active}
              className="absolute inset-y-0 left-0 bg-[#d6a758]/60"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </section>
  )
}
