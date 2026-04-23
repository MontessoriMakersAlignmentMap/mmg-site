'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { FadeIn, RevealEyebrow, GoldUnderline } from '@/components/FadeIn'
import { Logo, type LogoName } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Testimonials } from '@/components/Testimonials'

const serif = { fontFamily: 'var(--font-heading)' }

// ─── Counter — scroll-triggered number animation ───────────────────────────

function Counter({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

function Btn({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="inline-block w-full sm:w-auto">
      <Link href={href} className={className}>{children}</Link>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <section
      className="grain bg-[#0e1a7a] pt-32 pb-36 md:pt-48 md:pb-44 px-6 md:px-10 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(214,167,88,0.07), transparent 60%)`,
        }}
      />
      {/* Logo — top-right corner, sized so it clears the headline */}
      <motion.div
        className="hidden md:block absolute right-6 lg:right-12 top-6"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/logos/mmg.png"
          alt="Montessori Makers Group"
          width={280}
          height={280}
          className="object-contain"
          priority
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <motion.p
            className="text-[#d6a758] text-[11px] tracking-[0.24em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Montessori Makers Group
          </motion.p>
          <h1
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.75rem] text-white leading-[0.97] tracking-tight mb-10"
            style={serif}
          >
            {/* Line 1 — word by word */}
            {(['When', 'a', 'Montessori', 'school'] as const).map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                style={{ marginRight: '0.22em' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.10 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <br className="hidden sm:block" />{' '}
            {/* "is aligned," — single unit so underline spans it */}
            <span className="relative inline-block whitespace-nowrap" style={{ marginRight: '0.22em' }}>
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              >
                is aligned,
              </motion.span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-[#d6a758] w-full block"
                style={{ transformOrigin: 'left center' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <br className="hidden sm:block" />{' '}
            {/* Line 3 */}
            {(['everything', 'works.'] as const).map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                style={{ marginRight: i === 0 ? '0.22em' : 0 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.63 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="text-[#94A3B8] text-lg md:text-xl leading-[1.75] mb-12 max-w-[480px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Designing the systems, building the leadership, and placing the people that help Montessori schools thrive—for the long term.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.46 }}
          >
            <Btn
              href="/contact"
              className="btn-shimmer bg-[#d6a758] text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center"
            >
              Start Here
            </Btn>
            <Btn
              href="/advisory"
              className="border border-white/30 text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
            >
              Explore Advisory
            </Btn>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Problem ───────────────────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeIn>
          <RevealEyebrow className="mb-8">The Reality</RevealEyebrow>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight"
            style={serif}
          >
            <GoldUnderline>Strong classrooms.</GoldUnderline><br />Complex systems.
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="space-y-7 md:pt-24">
            <p className="text-[#374151] text-lg leading-[1.88] max-w-[44ch]">
              Montessori schools invest deeply in the quality of classroom life — and that investment shows. But organizational systems often develop reactively, shaped by growth and urgency rather than intentional design. Leadership structures, communication, hiring, planning: these layers rarely receive the same care as the pedagogy.
            </p>
            <p className="text-[#374151] text-lg leading-[1.88]">
              That&apos;s not a failure of leadership. It&apos;s a structural gap — and it&apos;s addressable.
            </p>
            <div className="pt-4 border-l-[3px] border-[#d6a758] pl-6">
              <p className="text-[#0e1a7a] font-semibold text-xl leading-snug" style={serif}>
                Alignment is not an aspiration. It is infrastructure.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Why Ecosystem ─────────────────────────────────────────────────────────────

const connections = [
  { trigger: 'A leadership transition', reveals: 'surfaces questions about roles, communication, and culture that were always present' },
  { trigger: 'Role ambiguity', reveals: 'creates friction that teams absorb — often quietly, and over time' },
  { trigger: 'Cultural friction', reveals: 'shapes who gets hired and how well they carry the mission' },
  { trigger: 'Misaligned hires', reveals: 'widen the distance between stated values and daily practice' },
]

function WhyEcosystem() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="grain bg-[#0e1a7a] pt-28 pb-44 md:pt-40 md:pb-56 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-xl mb-20">
          <RevealEyebrow variant="dark" className="mb-8">Why an Ecosystem?</RevealEyebrow>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-white leading-[1.0] tracking-tight mb-6"
            style={serif}
          >
            School challenges <GoldUnderline>don&apos;t arrive alone.</GoldUnderline>
          </h2>
          <p className="text-[#94A3B8] text-lg leading-[1.75]">
            They arrive connected. Addressing them in isolation can resolve one layer while leaving the underlying pattern intact.
          </p>
        </FadeIn>

        {/* Chain visualization — horizontal on desktop, vertical on mobile */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-stretch">
            {connections.flatMap((c, i) => {
              const nodes = [
                <FadeIn key={`node-${i}`} delay={i * 0.1} className="flex-1 min-w-0">
                  <motion.div
                    className="h-full border border-white/10 p-8 flex flex-col cursor-default"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      borderColor: hovered === i ? 'rgba(214,167,88,0.45)' : 'rgba(255,255,255,0.1)',
                      backgroundColor: hovered === i ? 'rgba(214,167,88,0.04)' : 'rgba(255,255,255,0)',
                    }}
                    transition={{ duration: 0.18 }}
                  >
                    <motion.span
                      className="text-[11px] tracking-[0.22em] uppercase mb-5 block font-medium"
                      animate={{ color: hovered === i ? '#d6a758' : 'rgba(214,167,88,0.35)' }}
                      transition={{ duration: 0.18 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.span>
                    <p className="text-white font-medium text-xl leading-snug mb-5 flex-1" style={serif}>
                      {c.trigger}
                    </p>
                    <motion.div
                      className="h-px mb-5"
                      style={{ transformOrigin: 'left' }}
                      animate={{
                        backgroundColor: hovered === i ? '#d6a758' : 'rgba(255,255,255,0.15)',
                        scaleX: hovered === i ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.22 }}
                    />
                    <p className="text-[#64748B] text-sm leading-[1.8]">{c.reveals}</p>
                  </motion.div>
                </FadeIn>,
              ]
              if (i < connections.length - 1) {
                nodes.push(
                  /* Mobile: vertical connector */
                  <div key={`conn-mobile-${i}`} className="md:hidden w-[2px] h-8 bg-gradient-to-b from-white/20 to-transparent ml-8 flex-shrink-0" />,
                  /* Desktop: horizontal arrow */
                  <FadeIn key={`conn-${i}`} delay={i * 0.1 + 0.08} className="hidden md:flex items-center flex-shrink-0 w-10 justify-center">
                    <motion.span
                      className="text-xl leading-none"
                      animate={{
                        color: hovered === i || hovered === i + 1 ? '#d6a758' : 'rgba(255,255,255,0.12)',
                        x: hovered === i ? 3 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </FadeIn>
                )
              }
              return nodes
            })}
          </div>
        </div>

        <FadeIn>
          <div className="border-t border-white/10 pt-14">
            <p className="text-white/90 text-2xl md:text-3xl max-w-2xl leading-[1.38]" style={serif}>
              Montessori Makers Group was built to hold the whole picture — not just the piece that&apos;s most visible. That&apos;s why it&apos;s an ecosystem.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Ecosystem ─────────────────────────────────────────────────────────────────

const primaryItems = [
  {
    name: 'Advisory',
    logo: 'advisory' as LogoName,
    href: '/advisory',
    tagline: 'School consulting & alignment',
    desc: 'Strategic consulting for schools navigating growth, transition, or culture repair.',
  },
  {
    name: 'Institute',
    logo: 'institute' as LogoName,
    href: '/institute',
    tagline: 'Leadership formation',
    desc: 'Formation programs for people actively leading — seminars through residency.',
  },
  {
    name: 'MMAP',
    logo: 'mmap' as LogoName,
    href: '/mmap',
    tagline: 'School operating system',
    desc: 'The operating system for Montessori schools. Classroom to boardroom.',
  },
  {
    name: 'MatchHub',
    logo: 'matchhub' as LogoName,
    href: '/matchhub',
    tagline: 'Montessori hiring',
    desc: 'Philosophy-aligned matching for guides, directors, and heads of school.',
  },
  {
    name: 'Residency',
    logo: 'residency' as LogoName,
    href: '/residency',
    tagline: 'Montessori teacher preparation',
    desc: 'A MACTE-track credential program for educators who want rigorous, accessible Montessori preparation.',
  },
]

const secondaryItems = [
  {
    name: 'Toolbox',
    logo: 'toolbox' as LogoName,
    href: '/toolbox',
    tagline: 'Templates & frameworks',
    desc: 'Leadership templates for governance, hiring, and communication.',
  },
  {
    name: 'Learning',
    logo: 'learning' as LogoName,
    href: '/learning',
    tagline: 'Curriculum & materials',
    desc: 'Curriculum and courses grounded in Montessori philosophy.',
  },
  {
    name: 'MMAS',
    logo: 'mmas' as LogoName,
    href: '/mmas',
    tagline: 'Assessment platform',
    desc: 'Assessment built for the Montessori sequence, not grade-level standards.',
  },
  {
    name: 'Studio',
    logo: 'studio' as LogoName,
    href: '/studio',
    tagline: 'Web & communication design',
    desc: 'Website design and communication strategy that closes the gap between mission and message.',
  },
]

function PrimaryCard({ item, delay }: { item: typeof primaryItems[0]; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="bg-white border border-[#E2DDD6] p-9 flex flex-col h-full group"
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(14,26,122,0.09)', borderColor: 'rgba(214,167,88,0.55)' }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={item.href} className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo name={item.logo} size="md" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-[#64748B] text-[11px] tracking-[0.16em] uppercase mb-2">{item.tagline}</p>
            <h3 className="text-[#0e1a7a] text-2xl mb-3" style={serif}>{item.name}</h3>
            <p className="text-[#374151] text-base leading-relaxed">{item.desc}</p>
          </div>
          <div className="flex items-center justify-between pt-5 mt-6 border-t border-[#F2EDE6]">
            <span className="text-[#0e1a7a] text-xs tracking-wide font-medium group-hover:underline">
              Learn more
            </span>
            <span className="text-[#8A6014] group-hover:translate-x-1 transition-transform inline-block">→</span>
          </div>
        </Link>
      </motion.div>
    </FadeIn>
  )
}

function SecondaryCard({ item, delay }: { item: typeof secondaryItems[0]; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="bg-white border border-[#E2DDD6] p-8 flex flex-col h-full group"
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(14,26,122,0.08)', borderColor: 'rgba(214,167,88,0.45)' }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href={item.href} className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Logo name={item.logo} size="md" />
          </div>
          <div className="flex-1 text-center">
            <p className="text-[#64748B] text-[11px] tracking-[0.16em] uppercase mb-2">{item.tagline}</p>
            <h3 className="text-[#0e1a7a] text-lg mb-2" style={serif}>{item.name}</h3>
            <p className="text-[#4B5563] text-sm leading-[1.7]">{item.desc}</p>
          </div>
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F2EDE6]">
            <span className="text-[#64748B] text-xs font-medium group-hover:text-[#0e1a7a] group-hover:underline transition-colors">
              Explore
            </span>
            <span className="text-[#8A6014] text-sm group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </div>
        </Link>
      </motion.div>
    </FadeIn>
  )
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="bg-[#FAF9F7] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-2xl mb-20">
          <RevealEyebrow className="mb-8">The Ecosystem</RevealEyebrow>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight mb-6"
            style={serif}
          >
            Where most schools <GoldUnderline>begin.</GoldUnderline>
          </h2>
          <p className="text-[#374151] text-lg leading-[1.75]">
            You don&apos;t need everything. You need the right entry point.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {primaryItems.map((item, i) => (
            <PrimaryCard key={item.name} item={item} delay={i * 0.07} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {secondaryItems.map((item, i) => (
            <SecondaryCard key={item.name} item={item} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Where to Start ────────────────────────────────────────────────────────────

const pathways = [
  { question: 'My school is at a turning point', label: 'Advisory', href: '/advisory' },
  { question: 'I need to develop as a leader', label: 'Institute', href: '/institute' },
  { question: 'I want to earn a Montessori credential', label: 'Residency', href: '/residency' },
  { question: 'I need to find the right people', label: 'MatchHub', href: '/matchhub' },
  { question: 'Our systems need to work', label: 'MMAP', href: '/mmap' },
  { question: 'I need practical tools now', label: 'Toolbox', href: '/toolbox' },
]

function WhereToStart() {
  return (
    <section className="bg-[#F2EDE6] py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <RevealEyebrow className="mb-8">Start Here</RevealEyebrow>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight max-w-[14ch]"
            style={serif}
          >
            What do you need right now?
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-14">
          {pathways.map((p, i) => (
            <FadeIn key={p.label} delay={i * 0.06}>
              <motion.div
                className="bg-white border border-[#D4CEC6] p-8 flex flex-col h-full"
                whileHover={{
                  y: -5,
                  boxShadow: '0 14px 36px rgba(14,26,122,0.10)',
                  borderColor: '#0e1a7a',
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Link href={p.href} className="flex flex-col h-full group">
                  <p className="text-[#4B5563] text-sm leading-[1.6] mb-8">{p.question}</p>
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-[#F2EDE6]">
                    <span className="text-[#0e1a7a] font-semibold text-base">{p.label}</span>
                    <span className="text-[#8A6014] text-base group-hover:translate-x-1 transition-transform inline-block">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <p className="text-[#64748B] text-base">Not sure where to start? Let&apos;s talk.</p>
            <motion.div whileTap={{ scale: 0.97 }}>
              <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:bg-[#162270] transition-colors whitespace-nowrap inline-block"
>
  Book a Consultation
</a>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Founder ───────────────────────────────────────────────────────────────────

function Founder() {
  return (
    <section className="grain bg-[#0e1a7a] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
        <FadeIn>
          <div className="rounded-sm overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.30)] w-full md:max-w-sm">
            <Image
              src="/images/hannah-home.jpg"
              alt="Hannah Richardson, Founder of Montessori Makers Group"
              width={480}
              height={600}
              className="w-full h-auto object-cover object-[center_20%]"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <RevealEyebrow variant="dark" className="mb-8">The Work Behind the Work</RevealEyebrow>
          <h2
            className="text-[2.5rem] md:text-[3rem] text-white leading-[1.06] tracking-tight mb-10"
            style={serif}
          >
            <Counter to={25} /> years inside Montessori systems.
          </h2>
          <blockquote className="mb-10">
            <p className="text-white text-2xl md:text-[1.75rem] leading-[1.42] italic mb-5" style={serif}>
              &ldquo;I built Montessori Makers because I saw leaders doing extraordinary work—without the structures to sustain it.&rdquo;
            </p>
            <p className="text-[#94A3B8] text-sm tracking-wide">— Hannah Richardson, Founder</p>
          </blockquote>
          <p className="text-[#94A3B8] text-base leading-[1.78] mb-10 max-w-[44ch]">
            Montessori leader, strategist, and creator with 25 years across independent, public, charter, and justice-centered Montessori communities.
          </p>
          <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/about"
              className="border border-white/30 text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors inline-block"
            >
              About Hannah →
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Press & Speaking ──────────────────────────────────────────────────────────

const PRESS = [
  {
    org: 'AMI',
    full: 'Association Montessori Internationale',
    role: 'Conference Presenter',
    context: 'Featured presenter on Montessori leadership and organizational alignment.',
  },
  {
    org: 'Asia Montessori Conference',
    full: 'Hanoi, Vietnam',
    role: 'Invited Presenter',
    context: 'International keynote on Montessori systems thinking and school leadership.',
  },
  {
    org: 'Breaking the Paradigm',
    full: 'Podcast · January 2026',
    role: 'Featured Guest',
    context: 'Co-founder of The Peace Rebellion in conversation on justice, Montessori, and structural change.',
  },
  {
    org: 'Montessori in Action',
    full: 'Public Montessori in Action International · Podcast',
    role: 'Featured Guest',
    context: 'Highlighted for the Decodable Book Series — called out as a primary classroom veteran and school leader.',
  },
  {
    org: 'PMAI',
    full: 'Public Montessori in Action International',
    role: 'Recurring Guest',
    context: 'Multiple episodes on school reopening strategies, adult culture, and Montessori leadership.',
  },
]

function Press() {
  return (
    <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <RevealEyebrow className="mb-3">Voices &amp; Appearances</RevealEyebrow>
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight" style={serif}>
            Featured in Montessori's leading voices.
          </h2>
        </FadeIn>

        {/* Top strip — org names */}
        <div className="flex flex-wrap gap-x-10 gap-y-4 items-center mb-14 pb-10 border-b border-[#E2DDD6]">
          {PRESS.map((p) => (
            <div key={p.org} className="flex flex-col">
              <span className="text-[#0e1a7a] text-sm font-semibold tracking-wide" style={serif}>{p.org}</span>
              <span className="text-[#94A3B8] text-[10px] tracking-[0.12em] uppercase mt-0.5">{p.role}</span>
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRESS.map((p, i) => (
            <FadeIn key={p.org} delay={i * 0.07}>
              <div className="bg-white border border-[#E2DDD6] p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>{p.org}</p>
                    <p className="text-[#8A6014] text-[10px] tracking-[0.14em] uppercase mt-1">{p.full}</p>
                  </div>
                  <span className="text-[#d6a758] text-[9px] tracking-[0.14em] uppercase font-medium whitespace-nowrap flex-shrink-0 mt-0.5 border border-[#d6a758]/40 px-2 py-0.5">
                    {p.role}
                  </span>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed flex-1">{p.context}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Trust Ticker ──────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  'AMI', 'AMS', 'Public Montessori in Action International', 'Breaking the Paradigm',
  'Asia Montessori Conference', 'Montessori in Action', 'The Peace Rebellion',
  'AMI', 'AMS', 'Public Montessori in Action International', 'Breaking the Paradigm',
  'Asia Montessori Conference', 'Montessori in Action', 'The Peace Rebellion',
]

function TrustTicker() {
  return (
    <div className="bg-[#0e1a7a] border-y border-white/10 py-4 overflow-hidden">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {TICKER_ITEMS.map((item, i) => (
          <span key={i} className="flex items-center gap-12 flex-shrink-0">
            <span className="text-white/60 text-[11px] tracking-[0.22em] uppercase">{item}</span>
            <span className="text-[#d6a758] text-[8px]">◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

// ─── Fall Booking ──────────────────────────────────────────────────────────────

function FallBooking() {
  return (
    <section className="bg-[#0e1a7a] border-t border-white/10 py-16 md:py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
        <div className="flex-1">
          <p className="text-[#d6a758] text-[11px] tracking-[0.2em] uppercase mb-4">Now Booking · Fall 2026</p>
          <h2 className="text-2xl md:text-3xl text-white leading-snug mb-3" style={serif}>
            Fall professional development dates are open.
          </h2>
          <p className="text-[#94A3B8] text-base leading-relaxed max-w-xl">
            Schools and conferences planning keynotes, workshops, or leadership retreats for August and beyond — reach out now. Dates are filling.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="/advisory/workshops-speaking"
            className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
          >
            Book a Speaking Engagement →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <WhyEcosystem />
      {/* Wave transition — navy → beige */}
      <div className="relative bg-[#0e1a7a] overflow-hidden" style={{ height: 60, marginBottom: -1 }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" fill="#FAF9F7" />
        </svg>
      </div>
      <Ecosystem />
      {/* Image break — full study room */}
      <div className="w-full overflow-hidden">
        <Image
          src="/images/montessori-study-room.jpg"
          alt="Maria Montessori's study — Amsterdam, Netherlands"
          width={1600}
          height={1200}
          className="w-full h-[280px] md:h-[420px] object-cover object-center"
        />
        <div className="bg-[#FAF9F7] py-3 text-center">
          <p className="text-[#94A3B8] text-[11px] tracking-[0.18em] uppercase">
            Rooted in Montessori. Built for today&apos;s schools.
          </p>
        </div>
      </div>
      <TrustTicker />
      <WhereToStart />
      <Founder />
      <Testimonials />
      <Press />
      <FallBooking />
      <NewsletterSignup />
    </>
  )
}
