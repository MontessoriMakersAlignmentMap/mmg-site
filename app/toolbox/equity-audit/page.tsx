import Link from 'next/link'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const domains = [
  {
    num: '01',
    name: 'Hiring, Retention, and Workforce Equity',
    questions: 9,
    desc: 'Who is hired, who is retained, who is paid what, and who advances. Whether your stated values are reflected in the actual people who keep your school running and in the conditions of their work.',
  },
  {
    num: '02',
    name: 'Adult Culture, Belonging, and Psychological Safety',
    questions: 9,
    desc: 'How adults treat each other, how disagreement and conflict move through the building, and who feels safe to tell the truth. Whether your school is a place where adults can do hard work together or only be polite.',
  },
  {
    num: '03',
    name: 'Curriculum, Representation, and Student Experience',
    questions: 10,
    desc: 'What children encounter on the shelves, in the materials, in the books, in the cultural and history work, and in the daily texture of being seen by adults. Whether your prepared environment honors every child it serves.',
  },
  {
    num: '04',
    name: 'Governance, Accountability, and Organizational Commitment',
    questions: 10,
    desc: 'How the school is governed, financed, and held to account beyond its own self-report. Whether your equity commitments are structural decisions backed by money and authority or aspirations preserved in mission language.',
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
              The Montessori Equity Audit: Toolbox Edition
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A self-guided diagnostic for Montessori leadership teams ready to look honestly at their own practice and translate what they learn into the work the school will actually take up.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>
              $197
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://buy.stripe.com/bJe5kF8U8c9igblfg52cg1n"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Buy Now &rarr;
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
                What&rsquo;s Inside
              </p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-4">48-page PDF &middot; 38 diagnostic questions across 4 domains</p>
              <ul className="space-y-2">
                {[
                  'Diagnostic Instrument — 38 evidence-based questions',
                  'Self-Scoring Guide with domain average and spread analysis',
                  'Debrief Protocol — four rounds, four hours, structured to stay honest',
                  'Next Steps Framework — what schools can do internally and what needs outside support',
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Four domains */}
            <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-4">
              The Four Domains
            </p>
            <div className="space-y-3">
              {domains.map((d) => (
                <div key={d.num} className="bg-white border border-[#E2DDD6] p-5 flex gap-4">
                  <span className="text-[#d6a758] text-[10px] tracking-[0.15em] uppercase font-semibold flex-shrink-0 mt-0.5">
                    {d.num}
                  </span>
                  <div>
                    <p className="text-[#0e1a7a] font-semibold text-sm mb-0.5" style={serif}>
                      {d.name}
                    </p>
                    <p className="text-[#8A6014] text-[10px] tracking-[0.1em] uppercase mb-1">{d.questions} questions</p>
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
                The Toolbox Edition is a structured self-assessment for the leadership team across all four domains of school life. It surfaces what is actually happening in the school, not what the school wishes were happening or what the school looks like from the outside. The questions are written to produce evidence, not affirmation. Schools that complete this audit honestly will find some of what they learn unwelcome. That is the point.
              </p>
              <p>
                This is accountability work, not sensitivity training. The questions are written to produce useful information, not comfortable feelings. If the work feels challenging, that is not a sign you are doing it wrong. It is a sign you are doing it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
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
              Seven steps. Done in sequence.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Plan for approximately ninety minutes per person for the diagnostic and four hours for the debrief, ideally split across two days. The instrument is designed so that independent completion produces the divergence the team needs to do meaningful work in the debrief.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', name: 'Decide who is in the room', desc: 'Identify your three to twelve person leadership team. Confirm the facilitator. The facilitator should not be the head of school.' },
              { step: '02', name: 'Set the conditions', desc: 'Communicate three commitments to the team: honest answers will not result in punitive consequences, the purpose is to look honestly, the head of school will be quiet when others have a closer view.' },
              { step: '03', name: 'Complete the diagnostic independently', desc: 'Each member completes the instrument alone across two sittings in approximately ninety minutes. Do not do this together.' },
              { step: '04', name: 'Score and synthesize', desc: 'The facilitator collects responses and uses the self-scoring guide to identify domain averages, spread, and the highest-leverage questions for discussion.' },
              { step: '05', name: 'Run the debrief protocol', desc: 'Four rounds over four hours, ideally split across two days. The protocol is structured to keep the conversation honest without an outside facilitator.' },
              { step: '06', name: 'Write your priorities', desc: 'Translate what surfaced into a written priority list. Name owners. Name timelines. Name success indicators.' },
              { step: '07', name: 'Decide what is internal and what needs help', desc: 'Use the next steps section to identify which priorities your school can carry internally and which typically require outside support to do honestly.' },
            ].map((item) => (
              <div key={item.step} className="bg-white border border-[#E2DDD6] p-7 flex flex-col gap-3">
                <div className="w-0.5 h-6 bg-[#d6a758]" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A6014]">{item.step}</p>
                <h3 className="text-[#0e1a7a] font-semibold text-sm leading-snug" style={serif}>{item.name}</h3>
                <p className="text-[#374151] text-xs leading-[1.75] flex-1">{item.desc}</p>
              </div>
            ))}
            {/* 7th card gets a full-width treatment on small, fits in 4-col on lg */}
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
              School leadership teams ready to look honestly at what their systems are actually producing.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              This is designed for teams of three to twelve people: the head of school or executive director, program directors across all levels, and senior staff who hold real decision-making authority. Do not run this audit with only the head of school and a single program director. The diagnostic depends on multiple perspectives surfacing different reads of the same school.
            </p>
          </div>
          <div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Schools that have made equity commitments publicly and want to audit whether their systems match their words',
                'Leadership teams that want shared language before a larger equity conversation',
                'Schools not ready for a facilitated engagement but ready to do honest preparatory work',
                'Schools where equity has been a recurring theme in staff feedback or family concerns',
                'Boards wanting a clear picture of where the organization actually stands before setting priorities',
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
            This is not a substitute for the consultant-led Advisory version.
          </h2>
          <div className="space-y-5 text-[#374151] text-lg leading-[1.85]">
            <p>
              The Advisory version includes an outside facilitator who holds the room through the harder conversations the diagnostic produces. The Toolbox version assumes your team is capable of holding that room itself, and it will tell you honestly when you are not.
            </p>
            <p>
              If you complete this Toolbox Edition and decide you need outside support to take the next step, the natural pathway is to bring MMG in for the work that requires it. The diagnostic clarity your team has already produced is the most valuable input to a meaningful Advisory engagement. We pick up where you left off.
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-[#E2DDD6]">
            <Link
              href="/advisory/equity-audit"
              className="text-[#0e1a7a] font-medium text-sm hover:underline"
            >
              Learn about the facilitated Advisory engagement &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── PDF PREVIEW ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-4">
              Inside the Document
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight"
              style={serif}
            >
              A look inside.
            </h2>
          </div>
          <object
            data="/toolbox-previews/equity-audit-toolbox-preview.pdf#toolbar=0&navpanes=0"
            type="application/pdf"
            className="w-full border border-[#E2DDD6]"
            style={{ height: '960px' }}
          >
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-8 text-center">
              <p className="text-[#374151] text-sm">PDF preview not available in this browser.</p>
            </div>
          </object>
        </div>
      </section>

      {/* ── PRICING + BUY ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4"
            style={serif}
          >
            The Montessori Equity Audit: Toolbox Edition
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>
            $197
          </p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            48 pages. 38 questions. A self-scoring guide, a debrief protocol, and a next steps framework. Everything your leadership team needs to do this work honestly.
          </p>
          <a
            href="https://buy.stripe.com/bJe5kF8U8c9igblfg52cg1n"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-8"
          >
            Buy Now &rarr;
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
