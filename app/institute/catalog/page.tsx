import Link from 'next/link'
import {
  getOrderedSeasons,
  type Season,
} from '@/lib/institute-catalog'
import { CatalogCard } from '@/components/institute/CatalogCard'

// Render fresh on every request so the active-season calculation uses the
// real current date rather than a value baked in at build time.
export const dynamic = 'force-dynamic'

const serif = { fontFamily: 'var(--font-heading)' }


function SeasonSection({
  id,
  bg,
  eyebrow,
  heading,
  offerings,
}: Pick<Season, 'id' | 'eyebrow' | 'heading' | 'offerings'> & { bg: string }) {
  return (
    <section id={id} className={`${bg} py-20 md:py-24 px-6 md:px-10`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">{eyebrow}</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
            {heading}
          </h2>
        </div>
        {offerings.length > 0 ? (
          <div className="space-y-4">
            {offerings.map((o) => (
              <CatalogCard key={o.title} {...o} />
            ))}
          </div>
        ) : (
          <p className="text-[#64748B] text-sm">
            Offerings for this season will be announced shortly.{' '}
            <Link href="/contact" className="text-[#0e1a7a] hover:underline">
              Contact us to be notified &rarr;
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CatalogPage() {
  const orderedSeasons = getOrderedSeasons()
  const currentSeason = orderedSeasons[0]

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Institute Catalog
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              What&apos;s available. When it runs. How to join.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              A full cycle of leadership and systems development for Montessori schools,
              aligned with school-year rhythms and leadership capacity.
            </p>
            <p className="text-[#d6a758] text-sm tracking-wide mb-4">
              Three formats. One aligned system: Workshop. Intensive. Cohort.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed mb-10 max-w-2xl">
              Workshops &mdash; $200 &nbsp;&middot;&nbsp;
              Intensives &mdash; $350 &nbsp;&middot;&nbsp;
              Systems Cohorts &mdash; $450
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`#${currentSeason.id}`}
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Jump to {currentSeason.eyebrow} &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Season navigation */}
      <nav className="bg-[#FAF9F7] py-6 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-8">
          {orderedSeasons.map((season) => (
            <a
              key={season.id}
              href={`#${season.id}`}
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              {season.eyebrow}
            </a>
          ))}
        </div>
      </nav>

      {/* Season sections */}
      {orderedSeasons.map((season, i) => (
        <SeasonSection
          key={season.id}
          id={season.id}
          bg={i % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-[#F2EDE6]'}
          eyebrow={season.eyebrow}
          heading={season.heading}
          offerings={season.offerings}
        />
      ))}

      {/* Bottom CTA */}
      <section className="bg-[#0e1a7a] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight mb-6"
            style={serif}
          >
            Not sure which program fits?
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Start with a conversation. We can help identify the right format for where you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
            >
              Book a Consultation &rarr;
            </a>
            <Link
              href="/institute/about"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
            >
              About the Institute &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
