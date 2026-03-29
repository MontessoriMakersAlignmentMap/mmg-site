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

// ─── Supporting data (seminars page only) ─────────────────────────────────────

const formats = [
  {
    name: 'Workshop — $200',
    description:
      'A focused 3-hour live session. Practical tools and frameworks you can apply the next day. Best for individual leaders or distributed teams.',
  },
  {
    name: 'Intensive — $350',
    description:
      'A 5-hour deep-dive into a single system or challenge. Structured for action, not just understanding. Includes scenario-based practice.',
  },
  {
    name: 'Systems Cohort — $450',
    description:
      'Three 2-hour sessions held across several weeks. A full implementation cycle — build the system in session, apply it between sessions, refine in the next.',
  },
]

const whoAttends = [
  'Heads of school and directors',
  'Assistant heads and associate leaders',
  'Lead guides in leadership roles',
  'Board members seeking context',
  'Emerging leaders preparing for senior roles',
]

// ─── Season group component ────────────────────────────────────────────────────

function SeasonGroup({
  id,
  eyebrow,
  heading,
  offerings,
  bg,
}: Pick<Season, 'id' | 'eyebrow' | 'heading' | 'offerings'> & { bg: string }) {
  return (
    <div id={id} className={`${bg} py-14 md:py-16 px-6 md:px-10`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-3">{eyebrow}</p>
          <h3 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight" style={serif}>
            {heading}
          </h3>
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
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SeminarsPage() {
  const orderedSeasons = getOrderedSeasons()
  const currentSeason = orderedSeasons[0]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Applied Seminars
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Leadership skills. Applied immediately.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-6 max-w-2xl">
              Focused workshops, intensives, and cohort sessions on the specific
              leadership challenges Montessori schools face. No prerequisites. No
              theory overload. Practical work you use the next day.
            </p>
            <p className="text-[#7A8FA3] text-sm leading-relaxed mb-12 max-w-2xl">
              Each offering is standalone &mdash; you don&apos;t need to complete a
              sequence to get value. Three formats, one aligned system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#upcoming"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Browse the Catalog &rarr;
              </a>
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why These Exist ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Why These Exist
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Most leaders learn to have hard conversations after they&apos;ve
              already had too many of them badly.
            </h2>
          </div>
          <div className="space-y-6 pt-2">
            <p className="text-[#374151] text-base leading-relaxed">
              Montessori credentials prepare leaders for the classroom. They
              don&apos;t address the organizational complexity that comes with
              the role &mdash; the difficult personnel decisions, the board
              dynamics, the communication failures that erode community.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Applied Seminars exist to address specific, practical leadership
              challenges &mdash; the ones that come up again and again in real
              schools and that most leaders navigate by instinct, not by design.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Each session is a working session. You bring your context. We
              build the skills in the room.
            </p>
          </div>
        </div>
      </section>

      {/* ── Upcoming Seminars & Courses ──────────────────────────────────── */}
      <section id="upcoming" className="bg-[#0e1a7a] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-4">
                Upcoming Seminars &amp; Courses
              </p>
              <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
                What&rsquo;s running — starting with {currentSeason.eyebrow}.
              </h2>
              <p className="text-[#7A8FA3] text-sm leading-relaxed mt-4 max-w-xl">
                Workshops ($200) &nbsp;&middot;&nbsp; Intensives ($350) &nbsp;&middot;&nbsp; Systems Cohorts ($450)
              </p>
            </div>
            {/* Season jump links */}
            <div className="flex flex-wrap gap-4 flex-shrink-0">
              {orderedSeasons.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-[#94A3B8] text-xs tracking-wide hover:text-white transition-colors whitespace-nowrap"
                >
                  {s.eyebrow}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Season groups — alternating background */}
      {orderedSeasons.map((season, i) => (
        <SeasonGroup
          key={season.id}
          id={season.id}
          bg={i % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-[#F2EDE6]'}
          eyebrow={season.eyebrow}
          heading={season.heading}
          offerings={season.offerings}
        />
      ))}

      {/* ── Format ───────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              Format
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight"
              style={serif}
            >
              Three formats. One aligned system.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map((format) => (
              <div key={format.name} className="border border-white/20 p-8">
                <h3
                  className="text-white text-base font-semibold mb-4"
                  style={serif}
                >
                  {format.name}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Attends ──────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who Attends
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight"
              style={serif}
            >
              Built for people actively leading.
            </h2>
          </div>
          <div className="space-y-4 pt-2">
            {whoAttends.map((person) => (
              <div
                key={person}
                className="flex items-start gap-4 py-3 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">
                  &mdash;
                </span>
                <span className="text-[#374151] text-base">{person}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p
              className="text-[#0e1a7a] text-2xl font-medium leading-snug mb-4"
              style={serif}
            >
              Practical work you use the next day.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed">
              No prerequisites. No theory overload. Register for an individual
              session or explore the full catalog.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/institute/catalog"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center whitespace-nowrap font-medium"
            >
              Full Catalog &rarr;
            </Link>
            <Link
              href="/institute/intensive"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Explore the Intensive &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
