import Link from 'next/link'
import { TimelineViewer } from './TimelineViewer'

const serif = { fontFamily: 'var(--font-heading)' }

const LIFE_LINK      = 'https://buy.stripe.com/dRm8wR3zO7T27EP4Br2cg11'
const HUMANS_LINK    = 'https://buy.stripe.com/eVq7sNfiw7T24sD1pf2cg12'
const COMPLETE_LINK  = 'https://buy.stripe.com/fZucN7gmA4GQbV50lb2cg13'

const timelines = [
  {
    id: 'life',
    name: 'Timeline of Life',
    lesson: 'Second Great Lesson',
    span: '4.6 billion years · 90 milestones',
    size: '36×14 inch strip',
    price: '$75',
    link: LIFE_LINK,
    preview: '/mmg-timelines/timeline_of_life.png',
    summary: 'From the formation of Earth through the emergence of Homo sapiens — with every major evolutionary transition that matters in a Montessori Great Lesson context. Current science. Nothing left out.',
    bullets: [
      'Great Oxidation Event named and placed',
      'Fungi represented as a separate kingdom',
      'Snowball Earth, Ediacaran fauna, Tiktaalik',
      'Independent evolution of flight (insects, pterosaurs, birds)',
      'Five mass extinction events marked',
      'Geological periods color-coded along the bottom',
      'Tiered typography — works for age 6 and age 12',
    ],
  },
  {
    id: 'humans',
    name: 'Timeline of Humans',
    lesson: 'Third Great Lesson',
    span: '300,000 years · 72 milestones · 6 continental tracks',
    size: '36×14 inch strip',
    price: '$85',
    link: HUMANS_LINK,
    preview: '/mmg-timelines/timeline_of_humans.png',
    summary: 'Six parallel tracks — one for each inhabited region of the world — matched to Montessori continent colors. No continent\'s story is subordinate to another\'s.',
    bullets: [
      'Agriculture shown arising independently on every inhabited continent',
      'Kingdom of Ghana, Mali Empire, Great Zimbabwe, Songhai Empire',
      'Ancestral Puebloan cliff dwellings, Khmer Empire',
      'Polynesian deep-ocean voyaging named and placed',
      'Aboriginal Australian cultures as the oldest continuous cultures on Earth',
      'Colonization and the transatlantic slave trade named directly',
      'Resistance movements tracked across continents',
    ],
  },
]

const tracks = [
  { name: 'All Humanity', color: '#94A3B8' },
  { name: 'Africa', color: '#2D8A2D' },
  { name: 'Southwest Asia & Europe', color: '#CC2222' },
  { name: 'South & East Asia', color: '#E8C832' },
  { name: 'The Americas', color: '#E8751A' },
  { name: 'Oceania & the Pacific', color: '#8B5E3C' },
]

const formats = [
  {
    name: 'PNG',
    detail: '200 DPI',
    desc: 'Ready for large-format printing. Display on screen, print at any standard size, or send to a print shop for wall strips.',
  },
  {
    name: 'PDF',
    detail: 'Vector quality',
    desc: 'Scales to any size without loss. Laminate as a shelf strip, print poster-size, or produce at professional quality.',
  },
]

export default function TimelinesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Montessori Timeline Collection
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
              Timelines built on current science. Not adapted from 1990.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-2xl">
              Three data-rich, equity-centered timelines for the Great Lessons.
              Scientifically current. Globally structured. Print-ready at any size —
              PNG and PDF in every set.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={COMPLETE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Get the Complete Collection — $129
              </a>
              <a
                href="#timelines"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Browse individual timelines →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES THESE DIFFERENT ───────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Why These Timelines</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              Most Montessori timelines still reflect science from decades ago.
            </h2>
            <div className="space-y-5 text-[#374151] text-base leading-relaxed">
              <p>
                Most commercially available Montessori timelines treat fungi as plants, omit the
                Great Oxidation Event entirely, and rely on taxonomy that predates molecular
                phylogenetics. The Timeline of Humans still in use at many schools centers Europe
                and Southwest Asia — other continents appear as footnotes, and agriculture is
                presented as a single invention that spread outward from the Fertile Crescent.
              </p>
              <p>
                These timelines were built from current scientific literature. The Timeline of Life
                includes organisms and events that most Montessori suppliers still leave out —
                because the science that named them didn&rsquo;t exist when the original materials
                were made. The Timeline of Humans is structured so that every agricultural
                revolution, every empire, and every resistance movement stands on its own track,
                with no continent&rsquo;s story subordinate to another&rsquo;s.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 border-t border-[#E2DDD6] pt-12">
            {[
              {
                label: 'Current Science',
                body: 'Built from literature published after molecular phylogenetics reshaped our understanding of life — not adapted from materials designed before that science existed.',
              },
              {
                label: 'Tiered Typography',
                body: 'Major milestones read immediately. Supporting details sit at a quieter level. The same timeline works for a six-year-old\'s first encounter and a twelve-year-old\'s deep inquiry.',
              },
              {
                label: 'Equity-Centered Structure',
                body: 'The Timeline of Humans gives every continent its own track. No civilization is a footnote. No continent\'s story depends on another\'s for context.',
              },
            ].map(({ label, body }) => (
              <div key={label}>
                <div className="w-0.5 h-8 bg-[#d6a758] mb-5" />
                <h3 className="text-[#0e1a7a] font-semibold text-base mb-3" style={serif}>{label}</h3>
                <p className="text-[#374151] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATS ──────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Every Timeline Ships In Two Formats</p>
          <div className="grid md:grid-cols-3 gap-6">
            {formats.map(({ name, detail, desc }) => (
              <div key={name} className="bg-white border border-[#E2DDD6] p-7">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-[#0e1a7a] font-bold text-lg" style={serif}>{name}</span>
                  <span className="text-[#8A6014] text-[10px] tracking-[0.15em] uppercase">{detail}</span>
                </div>
                <p className="text-[#374151] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIVIDUAL TIMELINES ─────────────────────────────────────────── */}
      <section id="timelines" className="bg-white py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {timelines.map((t) => (
            <div key={t.id} className="bg-[#FAF9F7] border border-[#E2DDD6]">
              {/* Header */}
              <div className="p-8 md:p-10 border-b border-[#E2DDD6]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="max-w-xl">
                    <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">{t.lesson}</p>
                    <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-3" style={serif}>{t.name}</h2>
                    <p className="text-[#64748B] text-xs tracking-wide mb-4">{t.span} · {t.size}</p>
                    <p className="text-[#374151] text-sm leading-relaxed mb-5">{t.summary}</p>
                    <ul className="space-y-1.5">
                      {t.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-[#374151] leading-relaxed">
                          <span className="text-[#d6a758] flex-shrink-0 mt-0.5">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[#0e1a7a] text-3xl font-semibold mb-1" style={serif}>{t.price}</p>
                    <p className="text-[#94A3B8] text-xs mb-4">2 files · instant download</p>
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors font-medium"
                    >
                      Buy {t.name}
                    </a>
                  </div>
                </div>
              </div>
              {/* Preview */}
              <div className="p-6 md:p-8">
                <TimelineViewer src={t.preview} alt={t.name} />
                {t.id === 'humans' && (
                  <div className="flex flex-wrap gap-3 mt-5">
                    {tracks.map((track) => (
                      <div key={track.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 flex-shrink-0 border border-black/10" style={{ backgroundColor: track.color }} />
                        <span className="text-[#374151] text-xs">{track.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Clock of Eras — included in complete */}
          <div className="bg-[#FAF9F7] border border-[#E2DDD6]">
            <div className="p-8 md:p-10 border-b border-[#E2DDD6]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="max-w-xl">
                  <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">Companion Piece · Included in Complete Collection</p>
                  <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-3" style={serif}>Clock of Eras</h2>
                  <p className="text-[#64748B] text-xs tracking-wide mb-4">4.6 billion years · 18-inch circular diagram · 6 era wedges</p>
                  <p className="text-[#374151] text-sm leading-relaxed mb-5">
                    All 4.6 billion years of Earth&rsquo;s history on a 12-hour clock face.
                    Six color-coded era wedges show at a glance how much time passed before
                    complex life appeared. Phanerozoic events are labeled in a numbered sidebar
                    legend so nothing gets lost in the compression.
                  </p>
                  <p className="text-[#374151] text-sm leading-relaxed font-medium">
                    The visual makes one thing unforgettable: all of human existence fits
                    in the final fraction of a second.
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[#8A6014] text-sm font-medium mb-1">Included free</p>
                  <p className="text-[#94A3B8] text-xs mb-4">with Complete Collection</p>
                  <a
                    href={COMPLETE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#d6a758] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
                  >
                    Get Complete Collection
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 max-w-sm">
              <TimelineViewer src="/mmg-timelines/clock_of_eras.png" alt="Clock of Eras" isCircular />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE COLLECTION CTA ──────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#d6a758] text-[10px] tracking-[0.22em] uppercase mb-5">Complete Collection</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-5" style={serif}>
              All three timelines. 6 files. $129.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed mb-6">
              Timeline of Life, Timeline of Humans, and Clock of Eras — each in PNG and PDF.
              Saves $31 versus buying the two main timelines separately. Clock of Eras included.
              One download, immediate access.
            </p>
            <a
              href={COMPLETE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors font-medium"
            >
              Get the Complete Collection — $129
            </a>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Timeline of Life', detail: '90 milestones · 4.6 billion years', formats: 'PNG · PDF' },
              { label: 'Timeline of Humans', detail: '72 milestones · 6 continental tracks', formats: 'PNG · PDF' },
              { label: 'Clock of Eras', detail: 'Circular companion · 18-inch diagram', formats: 'PNG · PDF' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border border-white/15 px-5 py-4">
                <div>
                  <p className="text-white text-sm font-medium">{item.label}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{item.detail}</p>
                </div>
                <span className="text-[#8A6014] text-[10px] tracking-widest uppercase font-medium flex-shrink-0 ml-4">{item.formats}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-12 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/learning" className="text-[#0e1a7a] text-sm hover:underline">
            ← Back to Learning
          </Link>
          <div className="flex gap-4 text-sm">
            <a href={LIFE_LINK} target="_blank" rel="noopener noreferrer" className="text-[#8A6014] hover:underline">Timeline of Life — $75</a>
            <a href={HUMANS_LINK} target="_blank" rel="noopener noreferrer" className="text-[#8A6014] hover:underline">Timeline of Humans — $85</a>
            <a href={COMPLETE_LINK} target="_blank" rel="noopener noreferrer" className="text-[#8A6014] hover:underline font-medium">Complete — $129</a>
          </div>
        </div>
      </section>
    </>
  )
}
