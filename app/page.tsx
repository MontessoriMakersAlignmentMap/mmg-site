'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/FadeIn'
import { Logo, type LogoName } from '@/components/Logo'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

function Btn({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} className="inline-block w-full sm:w-auto">
      <Link href={href} className={className}>{children}</Link>
    </motion.div>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-[#0e1a7a] pt-32 pb-36 md:pt-48 md:pb-44 px-6 md:px-10 relative overflow-hidden">
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
          <motion.h1
            className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.75rem] text-white leading-[0.97] tracking-tight mb-10"
            style={serif}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            When a Montessori school<br className="hidden sm:block" /> is aligned,<br className="hidden sm:block" /> everything works.
          </motion.h1>
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
              className="bg-[#d6a758] text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center"
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
          <p className="text-[#8A6014] text-[11px] tracking-[0.24em] uppercase mb-8">The Reality</p>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight"
            style={serif}
          >
            Strong classrooms.<br />Complex systems.
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
  return (
    <section className="bg-[#0e1a7a] pt-28 pb-44 md:pt-40 md:pb-56 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-xl mb-20">
          <p className="text-[#d6a758] text-[11px] tracking-[0.24em] uppercase mb-8">Why an Ecosystem?</p>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-white leading-[1.0] tracking-tight mb-6"
            style={serif}
          >
            School challenges don&apos;t arrive alone.
          </h2>
          <p className="text-[#94A3B8] text-lg leading-[1.75]">
            They arrive connected. Addressing them in isolation can resolve one layer while leaving the underlying pattern intact.
          </p>
        </FadeIn>

        <div className="space-y-2 mb-20">
          {connections.map((c, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="border border-white/10 px-8 py-6 flex items-start gap-7 hover:border-white/20 hover:bg-white/[0.02] transition-colors">
                <span className="text-[#8A6014] text-xs font-medium flex-shrink-0 mt-1 tabular-nums tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 sm:flex sm:items-baseline sm:gap-8">
                  <p className="text-white font-medium text-lg sm:text-xl sm:w-60 flex-shrink-0 mb-1 sm:mb-0" style={serif}>
                    {c.trigger}
                  </p>
                  <p className="text-[#64748B] text-base leading-relaxed">{c.reveals}</p>
                </div>
              </div>
            </FadeIn>
          ))}
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
    tagline: 'Communication design',
    desc: 'Communication design that closes the gap between mission and message.',
  },
]

// ─── Ecosystem Strip ────────────────────────────────────────────────────────

const stripItems: { name: string; logo: LogoName; href: string }[] = [
  { name: 'Advisory',  logo: 'advisory',  href: '/advisory'  },
  { name: 'Institute', logo: 'institute', href: '/institute' },
  { name: 'MMAP',      logo: 'mmap',      href: '/mmap'      },
  { name: 'MatchHub',  logo: 'matchhub',  href: '/matchhub'  },
  { name: 'Toolbox',   logo: 'toolbox',   href: '/toolbox'   },
  { name: 'Learning',  logo: 'learning',  href: '/learning'  },
]

function EcosystemStrip() {
  return (
    <section className="bg-white border-t border-[#E2DDD6] py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-0 mb-7">
          {stripItems.map((item, i) => (
            <div key={item.name} className="flex items-center">
              <Link
                href={item.href}
                className="flex flex-col items-center gap-2.5 group px-5 md:px-7"
              >
                <Logo name={item.logo} size="md" className="opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                <span className="text-[#64748B] text-[10px] tracking-[0.15em] uppercase group-hover:text-[#0e1a7a] transition-colors duration-200">
                  {item.name}
                </span>
              </Link>
              {i < stripItems.length - 1 && (
                <span className="hidden md:block text-[#D4CEC6] text-xs select-none">→</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-[#64748B] text-sm tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
          Not separate services. One system.
        </p>
      </div>
    </section>
  )
}

function PrimaryCard({ item, delay }: { item: typeof primaryItems[0]; delay: number }) {
  return (
    <FadeIn delay={delay}>
      <motion.div
        className="bg-white border border-[#E2DDD6] p-9 flex flex-col h-full group"
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(14,26,122,0.09)' }}
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
        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(14,26,122,0.08)' }}
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
          <p className="text-[#8A6014] text-[11px] tracking-[0.24em] uppercase mb-8">The Ecosystem</p>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight mb-6"
            style={serif}
          >
            Where most schools begin.
          </h2>
          <p className="text-[#374151] text-lg leading-[1.75]">
            You don&apos;t need everything. You need the right entry point.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
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
  { question: 'I need to find the right people', label: 'MatchHub', href: '/matchhub' },
  { question: 'Our systems need to work', label: 'MMAP', href: '/mmap' },
  { question: 'I need practical tools now', label: 'Toolbox', href: '/toolbox' },
]

function WhereToStart() {
  return (
    <section className="bg-[#F2EDE6] py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-14">
          <p className="text-[#8A6014] text-[11px] tracking-[0.24em] uppercase mb-8">Start Here</p>
          <h2
            className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] text-[#0e1a7a] leading-[1.0] tracking-tight max-w-[14ch]"
            style={serif}
          >
            What do you need right now?
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-14">
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
    <section className="bg-[#0e1a7a] py-28 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-28 items-center">
        <FadeIn>
          <div className="rounded-sm overflow-hidden shadow-[0_8px_40px_rgba(14,26,122,0.30)] w-full md:max-w-sm">
            <Image
              src="/images/hannah.jpg"
              alt="Hannah Richardson, Founder of Montessori Makers Group"
              width={480}
              height={600}
              className="w-full h-auto object-cover object-[center_20%]"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="text-[#d6a758] text-[11px] tracking-[0.24em] uppercase mb-8">The Work Behind the Work</p>
          <h2
            className="text-[2.5rem] md:text-[3rem] text-white leading-[1.06] tracking-tight mb-10"
            style={serif}
          >
            25 years inside Montessori systems.
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

// ─── Systems Build ──────────────────────────────────────────────────────────────

function SystemsBuild() {
  return (
    <section className="bg-white py-28 md:py-36 px-6 md:px-10 border-t border-[#E2DDD6]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="max-w-3xl">
          <h2
            className="text-[2.5rem] md:text-[3.25rem] text-[#0e1a7a] leading-[1.06] tracking-tight mb-10"
            style={serif}
          >
            This isn&apos;t just a website. It&apos;s a system.
          </h2>
          <div className="space-y-6 mb-10">
            <p className="text-[#374151] text-lg leading-[1.85]">
              Most Montessori schools don&apos;t need a website redesign — they need an integrated system that reflects how they actually work.
            </p>
            <p className="text-[#374151] text-lg leading-[1.85]">
              What you&apos;re seeing here is a fully built example: an integrated system connecting enrollment, hiring, learning, products, and leadership into one aligned experience.
            </p>
            <p className="text-[#374151] text-lg leading-[1.85]">
              We design and build systems like this for schools ready to move beyond disconnected tools and into clarity.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed italic">
              Built from Montessori principles. Designed for real-world operation.
            </p>
          </div>
          <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/contact"
              className="bg-[#0e1a7a] text-white text-[13px] px-9 py-4 tracking-[0.07em] hover:bg-[#162270] transition-colors inline-block"
            >
              Inquire About a Build
            </Link>
          </motion.div>
        </FadeIn>
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
      <EcosystemStrip />
      <WhereToStart />
      <Founder />
      <SystemsBuild />
      <NewsletterSignup />
    </>
  )
}
