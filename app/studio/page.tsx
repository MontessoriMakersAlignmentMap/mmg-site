'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { AnimatedStat } from '@/components/AnimatedStat'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Logo } from '@/components/Logo'

// ── PRICING — update these before launch ───────────────────────────────────
const PRICING = {
  clarityAudit: 'Starting at $1,800',
  commArchitecture: 'From $6,000',
  leadershipVoice: 'From $3,000 / quarter',
}

const serif = { fontFamily: 'var(--font-heading)' }

const MARQUEE_ITEMS = [
  'Brand Identity',
  'Messaging Architecture',
  'Website Narrative',
  'Enrollment Systems',
  'Leadership Voice',
  'Content Strategy',
  'Visual Identity',
  'Voice & Tone',
  'Movement Storytelling',
  'Editorial Infrastructure',
]

// ── Marquee ────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="overflow-hidden border-t border-white/10 mt-16 py-5">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="text-[#94A3B8] text-[11px] tracking-[0.22em] uppercase flex-shrink-0">
            {item}
            <span className="text-[#d6a758] mx-6">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// ── Process step ───────────────────────────────────────────────────────────
function ProcessStep({
  num, label, desc, delay,
}: { num: string; label: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <span className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">{num}</span>
      <h3 className="text-[#0e1a7a] text-xl font-semibold mb-3" style={serif}>{label}</h3>
      <p className="text-[#374151] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

// ── Offer card ─────────────────────────────────────────────────────────────
function OfferCard({
  number, name, tagline, desc, forWho, price, href, highlight, delay,
}: {
  number: string
  name: string
  tagline: string
  desc: string
  forWho: string
  price: string
  href: string
  highlight?: boolean
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col p-8 border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(14,26,122,0.12)] ${
        highlight
          ? 'bg-[#0e1a7a] border-[#1e3ab0]'
          : 'bg-white border-[#D4CEC6]'
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <span className={`text-xs tracking-[0.2em] font-semibold ${highlight ? 'text-[#d6a758]' : 'text-[#8A6014]'}`}>
          {number}
        </span>
        <span className={`text-[10px] tracking-wide uppercase px-2 py-0.5 border ${
          highlight ? 'text-[#d6a758] border-[#d6a758]/40' : 'text-[#64748B] border-[#D4CEC6]'
        }`}>
          {tagline}
        </span>
      </div>
      <h3 className={`font-semibold text-lg leading-snug mb-3 ${highlight ? 'text-white' : 'text-[#0e1a7a]'}`} style={serif}>
        {name}
      </h3>
      <p className={`text-sm leading-relaxed mb-5 flex-1 ${highlight ? 'text-[#94A3B8]' : 'text-[#374151]'}`}>
        {desc}
      </p>
      <div className={`text-[11px] leading-relaxed mb-5 p-3 border-l-2 ${
        highlight ? 'border-[#d6a758] bg-white/5 text-[#94A3B8]' : 'border-[#8A6014] bg-[#FAF9F7] text-[#374151]'
      }`}>
        <span className={`font-semibold block mb-1 ${highlight ? 'text-[#d6a758]' : 'text-[#8A6014]'}`}>
          Is this right for you?
        </span>
        {forWho}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-[11px] tracking-wide font-medium ${highlight ? 'text-[#d6a758]' : 'text-[#8A6014]'}`}>
          {price}
        </span>
        <Link
          href={href}
          className={`text-xs font-medium tracking-wide hover:underline ${highlight ? 'text-white' : 'text-[#0e1a7a]'}`}
        >
          Learn more →
        </Link>
      </div>
    </motion.div>
  )
}

// ── Stat bar item ──────────────────────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-6">
      <AnimatedStat
        value={value}
        className="text-4xl md:text-5xl text-[#d6a758] font-semibold leading-none mb-2"
        style={serif}
      />
      <p className="text-[#94A3B8] text-[11px] tracking-[0.18em] uppercase max-w-[120px]">{label}</p>
    </div>
  )
}

// ── Portfolio card ─────────────────────────────────────────────────────────
function PortfolioCard({
  index, client, type, what, result, delay, image, imageAlt, href,
}: {
  index: string
  client: string
  type: string
  what: string[]
  result: string
  delay: number
  image: string
  imageAlt: string
  href: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border border-[#E2DDD6] overflow-hidden"
    >
      {/* Screenshot mockup */}
      <div className="relative w-full aspect-[16/7] overflow-hidden bg-[#0e1a7a] group">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* Subtle overlay with view link */}
        <div className="absolute inset-0 bg-[#0e1a7a]/0 group-hover:bg-[#0e1a7a]/40 transition-colors duration-300 flex items-center justify-center">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0e1a7a] text-xs tracking-[0.15em] uppercase font-medium px-6 py-3 hover:bg-[#d6a758] hover:text-white transition-colors"
          >
            View the work →
          </Link>
        </div>
      </div>

      {/* Detail panel */}
      <div className="grid md:grid-cols-2 gap-0">
        <div className="bg-white p-8">
          <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-3">Case {index}</p>
          <h3 className="text-[#0e1a7a] text-2xl font-semibold leading-tight mb-2" style={serif}>{client}</h3>
          <p className="text-[#64748B] text-sm mb-6">{type}</p>
          <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-3">What Studio built</p>
          <ul className="space-y-2">
            {what.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#374151] text-sm">
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-6 text-[#0e1a7a] text-xs tracking-wide hover:text-[#8A6014] transition-colors"
          >
            See the live work →
          </Link>
        </div>
        <div className="bg-[#0e1a7a] p-8 flex flex-col justify-between">
          <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-4">The result</p>
          <p className="text-white text-lg leading-snug flex-1" style={serif}>{result}</p>
          <div className="mt-8 w-12 h-px bg-[#d6a758]/40" />
        </div>
      </div>
    </motion.div>
  )
}

// ── Testimonial rotator ────────────────────────────────────────────────────
const STUDIO_QUOTES = [
  {
    quote: 'Working with Studio gave us language we had been reaching for for years. The clarity map alone was worth the entire engagement.',
    name: 'School Leader',
    role: 'Montessori Head of School',
  },
  {
    quote: 'The identity they built for us doesn\'t look like any other Montessori school. It looks like us. That was the whole point.',
    name: 'The Peace Rebellion',
    role: 'Education justice organization',
  },
  {
    quote: 'Consistency became a function of infrastructure, not heroic effort. The system they built made publishing the obvious next step.',
    name: 'PMAI',
    role: 'Public Montessori in Action',
  },
]

function StudioTestimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false })

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % STUDIO_QUOTES.length), 5500)
    return () => clearInterval(id)
  }, [inView, paused])

  const t = STUDIO_QUOTES[active]

  return (
    <section
      ref={ref}
      className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto">
        <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-10">
          What clients say
        </p>
        <div className="min-h-[8rem] flex items-start mb-8">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#0e1a7a] text-2xl md:text-3xl leading-[1.4] tracking-tight"
              style={serif}
            >
              &ldquo;{t.quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active + '-attr'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-[#374151] font-semibold text-sm">{t.name}</p>
              <p className="text-[#64748B] text-sm mt-0.5">{t.role}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2">
            {STUDIO_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setPaused(true) }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active ? 'bg-[#8A6014] scale-125' : 'bg-[#D4CEC6] hover:bg-[#8A6014]/40'
                }`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {!paused && inView && (
          <div className="mt-8 h-px bg-[#D4CEC6] relative overflow-hidden">
            <motion.div
              key={active}
              className="absolute inset-y-0 left-0 bg-[#8A6014]/50"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────────
export default function StudioPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-0 md:pt-40 px-6 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-16 pb-20 md:pb-28">
            <div className="max-w-2xl flex-1">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8"
              >
                Montessori Makers Studio
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl lg:text-7xl text-white leading-[1.02] tracking-tight mb-8"
                style={serif}
              >
                Communication is a prepared environment.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-[#94A3B8] text-lg leading-relaxed mb-3 max-w-xl"
              >
                We design how Montessori is understood &mdash; not just how it&rsquo;s presented.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.34 }}
                className="text-[#7A8FA3] text-base leading-relaxed mb-12 max-w-lg"
              >
                For Montessori schools, organizations, and leaders doing serious work that isn&rsquo;t yet visible at the scale it deserves.
                Studio closes the gap between what you stand for and how it lands.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/studio/services#clarity-audit"
                  className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
                >
                  Start with a Clarity Audit
                </Link>
                <a
                  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
                >
                  Book a Consultation
                </a>
              </motion.div>
            </div>
            {/* Logo — right */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex items-center justify-end flex-shrink-0"
            >
              <Logo name="studio" heroWidth={400} heroHeight={400} />
            </motion.div>
          </div>
          <Marquee />
        </div>
      </section>

      {/* ── VISUAL BREAK ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-72 md:h-[440px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&q=80"
          alt="The craft behind Studio — finding truth, giving it structure, giving it voice"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a7a]/85 via-[#0e1a7a]/50 to-[#0e1a7a]/10" />
        <div className="absolute inset-0 flex items-center px-6 md:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-[#d6a758] text-[10px] tracking-[0.25em] uppercase mb-5">Studio</p>
            <p
              className="text-white text-2xl md:text-4xl lg:text-[2.75rem] leading-tight max-w-2xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              We don&rsquo;t make things look different.<br className="hidden md:block" /> We make them read true.
            </p>
          </div>
        </div>
      </div>

      {/* ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              The Core Problem
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Most Montessori schools and organizations don&rsquo;t have a marketing problem. They have a translation problem.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              The work is extraordinary. The story isn&rsquo;t reaching anyone.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Montessori philosophy is distinctly different from conventional education &mdash; but the
              language used to communicate it is often borrowed from traditional education marketing,
              which flattens everything it touches.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-8">
              Communication is a prepared environment. It needs to be designed with the same
              intentionality as the physical space &mdash; with clear purpose, coherent structure, and
              an eye toward the experience of the person moving through it.
            </p>
            <Link
              href="/studio/approach"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              How we work: Meaning → Structure → Expression
            </Link>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-[10px] tracking-[0.2em] uppercase mb-6">
                You might recognize this
              </p>
              <div className="space-y-4">
                {[
                  'You describe your work differently every time someone asks.',
                  'People encounter you online and don\'t feel what they\'d find if they walked through your door.',
                  'You have strong outcomes but struggle to communicate them clearly.',
                  'Visual and messaging decisions get made by committee, slowly, and inconsistently.',
                  'Your audience asks questions your materials should already answer.',
                  'Your online presence looks like every other Montessori school or organization in the sector.',
                  'New team members describe the work differently than veterans do.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#E2DDD6]">
                <p className="text-[#0e1a7a] text-sm font-medium" style={serif}>
                  If two or more of these are true, you have a translation problem. We fix those.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE PROCESS ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-5">
              How Studio Works
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight mb-16 max-w-2xl"
              style={serif}
            >
              Every engagement follows the same discipline.
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 border border-white/10">
            {[
              {
                num: '01',
                label: 'Meaning',
                desc: "We begin by understanding what you actually stand for — not the language you've been using, but the truth underneath it. This is the excavation phase. It is careful, slow, and essential.",
                delay: 0,
              },
              {
                num: '02',
                label: 'Structure',
                desc: "Meaning without structure doesn't communicate. We design the architecture — what gets said first, what gets said next, what carries the weight, what can wait. Most organizations skip this. It shows.",
                delay: 0.1,
              },
              {
                num: '03',
                label: 'Expression',
                desc: "With meaning and structure in place, expression — the words, visuals, and systems — has something to rest on. This is where the deliverables are built. But they work because the foundation is solid.",
                delay: 0.2,
              },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={step.delay}>
                <div className={`p-10 md:p-12 h-full ${i < 2 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}>
                  <p className="text-[#d6a758] text-5xl font-light mb-8 leading-none" style={serif}>{step.num}</p>
                  <h3 className="text-white text-2xl md:text-3xl mb-5 leading-tight" style={serif}>{step.label}</h3>
                  <p className="text-white/55 text-sm md:text-base leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3} className="mt-10">
            <Link
              href="/studio/approach"
              className="text-white/50 text-sm font-medium hover:text-white transition-colors tracking-wide"
            >
              Read more about our approach →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── THREE OFFERS ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Three Ways to Engage
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-5"
              style={serif}
            >
              All grounded in the same discipline. Scoped for where you are.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Studio is not a service provider. It&rsquo;s a strategic communication partner.
              Every engagement begins with understanding what you actually stand for — and builds from there.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-5">
            <OfferCard
              number="01"
              name="Communication Audit & Clarity Map"
              tagline="Entry point"
              desc="A structured audit of your messaging, website, public communication, and digital presence. The result is a clear picture of where understanding breaks down — and a map of what to build next."
              forWho="You know something is off but can't quite name it. You want a clear picture before committing to a larger engagement. Works for schools, organizations, and individual leaders alike."
              price={PRICING.clarityAudit}
              href="/studio/services#clarity-audit"
              delay={0}
            />
            <OfferCard
              number="02"
              name="Communication Architecture"
              tagline="Flagship engagement"
              desc="A narrative system your whole organization can use — voice and tone, messaging hierarchy, audience clarity, and the structural design of how your story moves through the world."
              forWho="You're ready to invest in getting this right. You want a system your whole team can use — not a one-time deliverable that collects dust. For schools, organizations, and movements."
              price={PRICING.commArchitecture}
              href="/studio/services#communication-architecture"
              highlight
              delay={0.1}
            />
            <OfferCard
              number="03"
              name="Leadership Voice & Visibility"
              tagline="For leaders with ideas worth sharing"
              desc="Editorial infrastructure for Montessori leaders and organization directors building authority. Newsletter, LinkedIn, podcast positioning — a publishing system that makes consistency the default, not the exception."
              forWho="You're a school or organization leader with ideas worth sharing who hasn't built the infrastructure to share them reliably. You want to publish — and to have a system that makes it sustainable."
              price={PRICING.leadershipVoice}
              href="/studio/services#leadership-voice"
              delay={0.2}
            />
          </div>

          {/* Leadership Voice spotlight */}
          <FadeIn delay={0.1} className="mt-8">
            <div className="bg-white border border-[#D4CEC6] p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-3">Worth highlighting</p>
                  <h3 className="text-[#0e1a7a] text-xl font-semibold mb-2" style={serif}>
                    Leadership Voice is the most underused offer in the Montessori sector.
                  </h3>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    The people doing the most interesting work in Montessori education are often the least visible.
                    They have genuine ideas about leadership, learning, and what Montessori makes possible — but no
                    publishing infrastructure. The field needs their voice. Leadership Voice builds the system
                    that makes sharing it the path of least resistance.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href="/studio/services#leadership-voice"
                    className="block bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#1e3ab0] transition-colors text-center whitespace-nowrap"
                  >
                    See the offer →
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-8 text-center">
            <Link
              href="/studio/services"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              See all three offers in full →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-5">
              Recent Work
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
              style={serif}
            >
              The work speaks for itself.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Studio takes limited clients. Every project receives full attention.
              Here&rsquo;s what that produces.
            </p>
          </FadeIn>
          <div className="space-y-6">
            <PortfolioCard
              index="01"
              client="The Peace Rebellion"
              type="Brand identity · Narrative architecture · Website · Movement communication"
              what={[
                'Full brand identity — logo, mark, color system, typography',
                'Brand guidelines and visual standards',
                'Website architecture, narrative structure, and copywriting',
                'Messaging framework — the words and phrases that are distinctly theirs',
                'Movement storytelling system for ongoing communication',
              ]}
              result="A visual and verbal identity that actually feels like the organization — not borrowed nonprofit aesthetics, not generic education design. Something The Peace Rebellion community can recognize and rally around."
              image="/portfolio/peace-rebellion.jpg"
              imageAlt="The Peace Rebellion website — Montessori as Movement"
              href="https://www.thepeacerebellion.org"
              delay={0}
            />
            <PortfolioCard
              index="02"
              client="Public Montessori in Action"
              type="Instagram · Facebook · LinkedIn — design, produce &amp; post"
              what={[
                'Social storytelling strategy — what stories to tell, in what order, toward what purpose',
                'Voice system — the specific language, tone, and framing that is distinctly PMAI',
                'Reusable visual template library for consistent social presence',
                'Content categories, posting framework, and editorial calendar',
                'Ongoing production and posting across Instagram, Facebook, and LinkedIn',
              ]}
              result="Consistency became a function of infrastructure, not heroic effort. The PMAI team stopped starting from scratch every time they needed to post. The system made publishing the obvious next move."
              image="/portfolio/pmai-instagram.png"
              imageAlt="Public Montessori in Action — brand and social content system"
              href="https://www.instagram.com/publicmontessoriinaction/"
              delay={0.1}
            />
          </div>
          <FadeIn delay={0.2} className="mt-8 flex justify-end">
            <Link
              href="/studio/portfolio"
              className="inline-flex items-center gap-2 text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              View the full portfolio →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <StudioTestimonials />

      {/* ── SELECTIVITY / FIT ─────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              Studio Takes Limited Clients
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              We choose carefully. Because the work requires it.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Every project we take gets our full attention. That means a small number of
              organizations at any given time — and we choose the ones where the process
              will produce something genuinely worth producing.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              The ideal next client: a Montessori school, a national Montessori organization,
              or a leader doing serious work that isn&rsquo;t yet visible at the scale it deserves.
              A person with a distinctive voice who hasn&rsquo;t found the system to make it consistent.
              An organization that knows something is off but can&rsquo;t quite name what.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#1e3ab0] transition-colors mt-4"
            >
              Start a Conversation
            </Link>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-[10px] tracking-[0.15em] uppercase mb-6">
                Signs we might be a fit
              </p>
              <div className="space-y-0">
                {[
                  'You\'re doing Montessori work the broader world doesn\'t yet understand',
                  'Your mission is clear to you but not to the communities and audiences you\u2019re trying to reach',
                  'You\'re ready to invest in getting communication right — not just adequate',
                  'You want a collaborative process, not a vendor relationship',
                  'You can articulate what\'s not working, even if you can\'t yet say why',
                  'You\'re a leader with ideas that deserve a bigger audience',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0"
                  >
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">→</span>
                    <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div>
              <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-5">
                Let&rsquo;s build it
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl"
                style={serif}
              >
                If your work deserves to land the way it was meant to, this is where it starts.
              </h2>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link
                href="/studio/services#clarity-audit"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
              >
                Start with a Clarity Audit
              </Link>
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
              >
                Book a Consultation
              </a>
              <Link
                href="/studio/portfolio"
                className="text-[#64748B] text-sm text-center hover:text-white transition-colors py-2 tracking-wide"
              >
                View the Portfolio →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NAV STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-8 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
          {[
            { label: 'Our Offers', href: '/studio/services' },
            { label: 'How We Work', href: '/studio/approach' },
            { label: 'Portfolio', href: '/studio/portfolio' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              {link.label} →
            </Link>
          ))}
          <a
            href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
          >
            Book a Consultation →
          </a>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
