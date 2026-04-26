import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const contents = [
  'Diagnostic Instrument (full 4-domain survey, 40+ prompts)',
  'Self-Scoring Guide with interpretation notes per domain',
  'Leadership Team Debrief Protocol (facilitation guide)',
  'Next Steps Framework: how to prioritize findings',
]

const domains = [
  {
    num: '01',
    name: 'Hiring and Retention Equity',
    desc: 'Who gets hired, who stays, who advances, and who leaves — and whether your systems are producing equitable outcomes or just equitable intentions.',
  },
  {
    num: '02',
    name: 'Adult Culture and Belonging',
    desc: 'Whether the adults in your building actually experience safety, dignity, and belonging at work — not whether the handbook says they should.',
  },
  {
    num: '03',
    name: 'Curriculum and Representation',
    desc: 'Whether the children in your classrooms see themselves in the materials, the stories, the images, and the people teaching them.',
  },
  {
    num: '04',
    name: 'Governance and Accountability',
    desc: 'Whether equity commitments are embedded in governance structures and leadership accountability systems, or exist only as aspirations.',
  },
]

export default function EquityAuditToolboxPage() {
  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Equity Tools &middot; Montessori Makers Toolbox
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6"
              style={serif}
            >
              Montessori Equity Audit: Self-Guided Edition
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              The full diagnostic instrument across four domains of organizational equity. With a self-scoring guide and a leadership team debrief protocol.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $197
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Get Started &rarr;
              </a>
              <Link
                href="/toolbox/store"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center"
              >
                Back to Toolbox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE + PROBLEM ─────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: metadata panel */}
          <div>
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">
                What&rsquo;s Included
              </p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">4 documents &middot; PDF + editable DOCX</p>
              <ul className="space-y-1.5">
                {contents.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Four domains preview */}
            <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-4">
              Four Domains
            </p>
            <div className="space-y-3">
              {domains.map((d) => (
                <div key={d.num} className="bg-white border border-[#E2DDD6] p-5 flex gap-4">
                  <span className="text-[#d6a758] text-[10px] tracking-[0.15em] uppercase font-semibold flex-shrink-0 mt-0.5">
                    {d.num}
                  </span>
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm mb-1" style={serif}>
                      {d.name}
                    </p>
                    <p className="text-[#374151] text-xs leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: problem text */}
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              What This Addresses
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10"
              style={serif}
            >
              Most Montessori schools have equity aspirations. Almost none have equity infrastructure.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Schools that have committed to equity without auditing whether their systems support that commitment are working on goodwill alone. Goodwill is not a system. The gap is rarely about intention. It is about infrastructure.
              </p>
              <p>
                The Self-Guided Edition gives leadership teams the same diagnostic instrument used in the facilitated Advisory engagement — the full set of prompts across all four domains, organized to surface honest individual responses before the group conversation. The self-scoring guide helps teams interpret what they find. The debrief protocol gives them a structure for holding that conversation without it devolving into defensiveness.
              </p>
              <p>
                It is a rigorous starting point. It will surface real gaps. What you do with those gaps depends on what your team is ready for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO USE IT ───────────────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              How to Use It
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-6"
              style={serif}
            >
              Three steps. Done in sequence.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                name: 'Complete the Diagnostic',
                desc: 'Each member of your leadership team completes the diagnostic instrument independently before any group conversation. The instrument is structured to surface honest individual responses — not consensus. Do this part alone.',
              },
              {
                step: '02',
                name: 'Score and Interpret',
                desc: 'Use the self-scoring guide to map your team\'s responses across all four domains. The guide includes interpretation notes for each domain — what strong scores typically indicate, what gaps typically mean, and where to look first.',
              },
              {
                step: '03',
                name: 'Run the Debrief',
                desc: 'Use the debrief protocol to facilitate the leadership team conversation. The protocol is designed to surface alignment and gaps, name what the data shows, and identify the highest-leverage areas for change — without the conversation becoming defensive.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-[#E2DDD6] p-9 flex flex-col gap-4">
                <div className="w-0.5 h-8 bg-[#d6a758]" />
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8A6014] mb-1">{item.step}</p>
                  <h3 className="text-[#0e1a7a] font-semibold text-lg" style={serif}>{item.name}</h3>
                </div>
                <p className="text-[#374151] text-sm leading-[1.75] flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
              Who It&rsquo;s For
            </p>
            <h2
              className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6"
              style={serif}
            >
              Schools that want to begin this work before engaging outside support.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              The Self-Guided Edition is for leadership teams ready to do an honest audit of where their organization actually stands on equity. It does not require outside facilitation. It requires a team willing to look at what the data shows and have a real conversation about it.
            </p>
          </div>
          <div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Schools that have made equity commitments and want to audit whether their systems match their words',
                'Leadership teams that want to understand where the gaps are before deciding what to do',
                'Schools that are not yet ready for a facilitated engagement but want to do real preparatory work',
                'Boards and leadership teams wanting shared language before a larger equity conversation',
                'Schools where equity has been a recurring theme in staff feedback or family concerns',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d6a758]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT NOTE ──────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">
            A Direct Note
          </p>
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
            This is not a substitute for the facilitated Advisory engagement.
          </h2>
          <div className="space-y-5 text-[#374151] text-lg leading-[1.85]">
            <p>
              The Self-Guided Edition uses the same diagnostic instrument. It does not include Hannah Richardson facilitating the debrief, the organizational read that comes from an outside perspective, or the written findings and recommendations document delivered after the session.
            </p>
            <p>
              What it does: it gives your leadership team a structured, rigorous starting point. It will surface real information. What you do with that information is up to your team. If the diagnostic reveals gaps your team is not equipped to close on your own, that is when the Advisory engagement becomes the right next step.
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-[#E2DDD6]">
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Ready for the full facilitated engagement?
            </p>
            <Link
              href="/advisory/equity-audit"
              className="text-[#0e1a7a] font-medium text-sm hover:underline"
            >
              Learn about the Montessori Equity Audit Advisory service &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRICING + BUY ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            Montessori Equity Audit: Self-Guided Edition
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $197
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The full diagnostic instrument, self-scoring guide, debrief protocol, and next steps framework. A rigorous starting point for honest equity work.
          </p>
          <a
            href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-8"
          >
            Get Started &rarr;
          </a>
          <div>
            <Link
              href="/toolbox/store"
              className="text-white/50 text-sm hover:text-white/80 transition-colors"
            >
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />
    </>
  )
}
