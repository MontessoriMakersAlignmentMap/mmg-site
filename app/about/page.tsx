import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/Logo'
import { FadeIn } from '@/components/FadeIn'

const serif = { fontFamily: 'var(--font-heading)' }

const beliefs = [
  'Montessori works best when the whole organization is aligned — not just the classroom.',
  'Strong systems protect people and make excellence sustainable.',
  'Adult culture is not separate from child outcomes. It shapes them.',
  'Peace requires justice: safety, dignity, belonging, and courage for every child and adult.',
  'Montessori is not sustained by ideals alone. It needs structures that let those ideals live.',
]

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="grain bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">About</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            25 years building what Montessori needs.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed max-w-2xl">
            Montessori Makers was built to help Montessori schools do more than believe the right
            things — it was built to help them operate in alignment with those beliefs.
          </p>
        </div>
      </section>

      {/* ── ABOUT MONTESSORI MAKERS ───────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">About Montessori Makers</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-10" style={serif}>
              Built for coherence. Built for the long term.
            </h2>
            <Image
              src="/logos/mmg-logo-transparent.png"
              alt="Montessori Makers Group"
              width={220}
              height={110}
              className="object-contain"
            />
          </div>
          <div className="space-y-5 text-[#374151] text-base leading-relaxed">
            <p>
              Founded in Chicago, Montessori Makers began as a consulting practice grounded in one
              clear reality: Montessori schools often carry extraordinary vision, but not always the
              structures needed to sustain it. Over time, that work grew into a broader ecosystem of
              supports designed to help schools align philosophy with practice, mission with systems,
              and values with daily operations.
            </p>
            <p>
              Today, Montessori Makers supports schools and organizations across the country through
              advisory services, leadership development, strategic hiring, professional learning,
              operational tools, and Montessori-aligned resources. Whether the work is focused on
              staffing, adult culture, leadership systems, implementation, or long-term organizational
              clarity, the goal remains the same: to help Montessori function with coherence,
              courage, and care.
            </p>
            <p>
              At its core, Montessori Makers exists to make the work work — so schools can move
              beyond survival and into stability, alignment, and meaningful possibility.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE FOUNDER ────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="rounded-sm overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] w-full md:max-w-md md:sticky md:top-32">
            <Image
              src="/images/hannah-about.jpg"
              alt="Hannah Richardson, Founder of Montessori Makers Group"
              width={560}
              height={700}
              className="w-full h-auto object-cover object-[center_20%]"
              priority
            />
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">About the Founder</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Hannah Richardson
            </h2>
            <blockquote className="border-l-4 border-[#d6a758] pl-6 mb-10">
              <p className="text-[#374151] text-lg leading-relaxed italic">
                &ldquo;I built Montessori Makers because I saw leaders doing extraordinary work —
                without the structures to sustain it. We don&apos;t reform Montessori.
                We help it operate with coherence, equity, and courage.&rdquo;
              </p>
              <p className="text-[#64748B] text-sm mt-3">— Hannah Richardson, Founder</p>
            </blockquote>
            <div className="space-y-5 text-[#374151] text-base leading-relaxed">
              <p>
                Hannah Richardson is a Montessori leader, strategist, and systems-builder with
                nearly 25 years of experience across independent, public, charter, and
                justice-centered Montessori communities.
              </p>
              <p>
                She has worked across almost every layer of Montessori leadership and practice —
                as a guide, coach, coordinator, consultant, director of curriculum and instruction,
                and Head of School — supporting programs from infancy through middle school. Her
                experience spans schools as small as 90 students and as large as nearly 800, giving
                her an unusually broad view of what Montessori schools need to thrive across
                different structures, scales, and communities.
              </p>
              <p>
                Hannah&rsquo;s work is grounded in one core belief: Montessori only works fully
                when everything works together — people, practice, systems, and purpose. She helps
                schools translate vision into structures by strengthening leadership, stabilizing
                adult culture, improving hiring and retention, building practical systems, and
                designing conditions that support children without relying on burnout from the adults
                around them.
              </p>
              <p>
                She is the founder of Montessori Makers Group and its connected ecosystem, including
                Montessori Makers Learning, MatchHub, Montessori Makers Alignment Map, and related
                initiatives designed to strengthen Montessori practice across leadership, literacy,
                hiring, operations, and public presence.
              </p>
              <p>
                Hannah is trained in anti-bias, anti-racist practice and brings equity, belonging,
                and social responsibility into every level of her work. She has completed doctoral
                coursework in Early Childhood Education (PhD studies completed, ABD) and serves on
                the boards of Indigo Montessori and The Peace Rebellion. Her work reflects
                a justice-centered commitment to the future of Montessori — one that asks not only
                whether a school is Montessori in method, but whether it is prepared to live its
                values in practice.
              </p>
            </div>

            {/* Credential chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {['Nearly 25 years in Montessori', 'Infant–Middle School', 'Head of School', 'ABD, Early Childhood Ed.', 'ABAR Trained'].map((chip) => (
                <span key={chip} className="bg-[#F2EDE6] text-[#374151] text-xs px-3 py-1.5 border border-[#E2DDD6]">
                  {chip}
                </span>
              ))}
              <a
                href="https://www.indigomontessori.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F2EDE6] text-[#374151] text-xs px-3 py-1.5 border border-[#E2DDD6] hover:border-[#0e1a7a] transition-colors"
              >
                Board: Indigo Montessori ↗
              </a>
              <a
                href="https://www.thepeacerebellion.org"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F2EDE6] text-[#374151] text-xs px-3 py-1.5 border border-[#E2DDD6] hover:border-[#0e1a7a] transition-colors"
              >
                Board: The Peace Rebellion ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BELIEVE ──────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">What We Believe</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Montessori isn&apos;t static. It&apos;s a living framework.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-4">
              It grows with children, communities, and the world we&apos;re actually living in. We
              believe Montessori can evolve with integrity — grounded in research, justice, and deep
              respect for human development.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              We are not neutral about harm — especially harm rooted in racism, exclusion, or
              authoritarianism. Clarity and courage, with real systems behind them, isn&apos;t
              optional. It&apos;s the work.
            </p>
          </div>
          <div>
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">Five things we hold</p>
            <div className="space-y-0">
              {beliefs.map((belief, i) => (
                <div key={i} className="flex items-start gap-4 py-5 border-b border-white/10 last:border-0">
                  <span className="text-[#d6a758] text-xs tracking-[0.15em] uppercase flex-shrink-0 mt-0.5 w-6">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-white text-sm leading-relaxed">{belief}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE ECOSYSTEM ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">The Ecosystem</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              One practice. Many entry points.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Montessori Makers Group is the parent organization for a connected set of services,
              tools, and platforms — each designed to address a specific need in the Montessori
              ecosystem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Advisory', desc: 'Consulting, leadership support, and organizational strategy.', href: '/advisory' },
              { name: 'Institute', desc: 'Leadership formation and professional development.', href: '/institute' },
              { name: 'MatchHub', desc: 'Philosophy-aligned hiring for guides and schools.', href: '/matchhub' },
              { name: 'Toolbox', desc: 'Practical downloadable tools for school operations.', href: '/toolbox' },
              { name: 'Learning', desc: 'Courses, decodable books, and the Origins Series.', href: '/learning' },
              { name: 'Alignment Map', desc: 'Strategic self-assessment and school mapping tools.', href: '/mmap' },
              { name: 'Partners', desc: 'Schools, networks, and organizations we work alongside.', href: '/partners' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white border border-[#E2DDD6] p-7 hover:border-[#0e1a7a] transition-colors group"
              >
                <p className="text-[#0e1a7a] font-semibold text-base mb-2 group-hover:underline" style={serif}>
                  {item.name}
                </p>
                <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#0e1a7a] text-2xl leading-tight mb-2" style={serif}>
              Ready to work together?
            </p>
            <p className="text-[#374151] text-base">
              Start with a conversation about where your school is and what you need.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center"
            >
              Book a Consultation
            </a>
            <Link
              href="/advisory"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center"
            >
              Explore Advisory
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
