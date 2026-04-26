import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const domains = [
  {
    num: '01',
    name: 'Hiring and Retention Equity',
    desc: 'Who gets hired. Who stays. Who advances. Who leaves and why. The diagnostic looks at whether your hiring practices, retention patterns, and promotion decisions reflect your stated equity commitments or contradict them.',
  },
  {
    num: '02',
    name: 'Adult Culture and Belonging',
    desc: 'Whether the adults in your building actually experience safety, dignity, and belonging at work. Not whether the handbook says they should. Whether they do.',
  },
  {
    num: '03',
    name: 'Curriculum and Representation',
    desc: 'Whether the children in your classrooms see themselves in the materials, the stories, the images on the walls, and in the people teaching them. Whether the curriculum engages honestly with the world those children live in.',
  },
  {
    num: '04',
    name: 'Governance and Accountability',
    desc: 'Whether equity commitments are embedded in governance structures, strategic planning, and leadership accountability systems, or whether they exist only in statements and aspirations that no one is actually responsible for.',
  },
]

const whoItIsFor = [
  'Schools that have made equity commitments publicly and want to audit whether their systems match their words',
  'Schools navigating real tension between stated values and actual practice',
  'Schools that want to do honest assessment before a situation forces them to',
  'Leadership teams ready to look at difficult data together',
  'Schools where equity has been a recurring theme in staff feedback, board conversations, or family concerns',
]

const deliverables = [
  {
    name: 'Diagnostic Instrument',
    desc: 'A structured set of prompts completed by the leadership team across all four domains before the debrief session. Designed to surface honest individual responses before the group conversation.',
  },
  {
    name: 'Facilitated Debrief Session',
    desc: 'A session led by Hannah Richardson where the team reviews findings together. The session surfaces alignment and gaps, names what the data actually shows, and identifies the highest-leverage areas for change.',
  },
  {
    name: 'Written Findings and Recommendations',
    desc: 'A document delivered after the session naming what the audit found, where the organization is, and what a prioritized path forward looks like. Written to be shared with leadership and board, not filed away.',
  },
]

export default function EquityAuditPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory &middot; Montessori Equity Audit
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              Most Montessori schools have equity aspirations. Almost none have equity infrastructure.
            </h1>
            <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              The Montessori Equity Audit is a structured, facilitated diagnostic that helps leadership teams see honestly where their organization stands. Not where it intends to be. Where it actually is.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center"
              >
                Book a Consultation
              </a>
              <Link
                href="/advisory"
                className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center"
              >
                See All Advisory Pathways
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            The Problem This Addresses
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8"
            style={serif}
          >
            Saying the right things is not the same as building the right systems.
          </h2>
          <div className="space-y-6">
            <p className="text-[#374151] text-lg leading-[1.85]">
              Montessori schools often carry deep equity aspirations. Schools that serve children who have been failed by other systems, schools that talk honestly about anti-bias and antiracist practice, schools with mission statements that name justice, belonging, and dignity. And often, those same schools have hiring patterns that reproduce the same demographic year after year. Adult cultures where belonging is not equitably distributed. Governance structures with no equity accountability built in. Curriculum that nods at representation without interrogating what representation actually requires.
            </p>
            <p className="text-[#374151] text-lg leading-[1.85]">
              The gap is not usually about intention. It is about infrastructure. Schools that have committed to equity without auditing whether their systems support that commitment are working on goodwill alone. Goodwill is not a system.
            </p>
            <p className="text-[#374151] text-lg leading-[1.85]">
              This is not DEI training. It is not a checklist. It is not a box to check so that equity work appears on a strategic plan. It is an honest look at whether your organization is built to live what it says it believes.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUR DOMAINS ────────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              The Diagnostic
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Four domains. Honest questions.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              The audit is organized across four areas of organizational life. Together, they give leadership teams a full picture of where equity commitments are supported by actual systems and where they are not.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {domains.map((d) => (
              <div key={d.num} className="bg-white border border-[#E2DDD6] p-9 flex flex-col gap-4">
                <div className="w-0.5 h-8 bg-[#d6a758]" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A6014] mb-1">{d.num}</p>
                  <h3 className="text-[#0e1a7a] font-semibold text-xl" style={serif}>{d.name}</h3>
                </div>
                <p className="text-[#374151] text-sm leading-[1.75] flex-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
              What the Engagement Includes
            </p>
            <h2
              className="text-3xl md:text-4xl text-white leading-tight"
              style={serif}
            >
              Three things. Delivered in sequence.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {deliverables.map((item, i) => (
              <div key={i} className="border border-white/20 p-8 flex flex-col gap-4">
                <div className="w-0.5 h-8 bg-[#d6a758]" />
                <h3 className="text-white font-semibold text-base" style={serif}>
                  {item.name}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              Who It&rsquo;s For
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Schools that are ready to see what the data actually shows.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              This engagement is most valuable for schools that want to do honest work, not defended work. If your leadership team is ready to look at what your systems are actually producing and take that seriously, this is for you.
            </p>
          </div>
          <div className="space-y-3 md:pt-8">
            {whoItIsFor.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0"
              >
                <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                <span className="text-[#374151] text-base leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IT'S NOT ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
            A Direct Note
          </p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
            This is not diversity training. It is not a compliance exercise.
          </h2>
          <div className="space-y-5 text-[#374151] text-lg leading-[1.85]">
            <p>
              DEI training can build awareness. It rarely builds infrastructure. The Montessori Equity Audit is not a workshop, a speaker event, or a professional development day on bias. It is a diagnostic engagement with a leadership team that is ready to look honestly at what their organization is actually doing, not what it intends to do.
            </p>
            <p>
              The goal is not to make leadership feel good about their commitment to equity. The goal is to understand specifically where the gaps are and build a prioritized path to close them. That requires honesty, and it requires a team that can hold honest findings without becoming defensive.
            </p>
            <p>
              If your school is not ready for that kind of look, a consultation conversation will help you figure out what to do first.
            </p>
          </div>
        </div>
      </section>

      {/* ── SELF-GUIDED OPTION ──────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Also Available
            </p>
            <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-3" style={serif}>
              Self-Guided Edition available at $197.
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              The full diagnostic instrument with a self-scoring guide and leadership team debrief protocol. A rigorous starting point for teams who want to begin this work before engaging outside support.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/toolbox/equity-audit"
              className="bg-[#0e1a7a] text-white text-sm px-8 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center inline-block"
            >
              See the Self-Guided Edition
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Next Step
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4"
              style={serif}
            >
              Ready to see where your organization actually stands?
            </h2>
            <p className="text-[#374151] text-base leading-relaxed">
              Book a consultation to talk through the audit process and whether your leadership team is ready for it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap"
            >
              Book a Consultation
            </a>
            <Link
              href="/advisory"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              See All Advisory Pathways
            </Link>
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
