import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/cNi8wR8U8ehqcZ9aZP2cg1j'

export default function NewLeaderOnboardingToolkitPage() {
  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
              Leadership Tools &middot; Montessori Makers Toolbox
            </p>
            <h1 className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-6" style={serif}>
              New Leader Onboarding Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              A structured first 90 days for incoming heads of school and directors — the relationships to build,
              the decisions that can&rsquo;t wait, and the institutional knowledge to absorb before acting.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$375</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={STRIPE} target="_blank" rel="noopener noreferrer"
                className="bg-[#d6a758] text-white text-[13px] px-10 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors text-center font-medium">
                Buy Now &rarr;
              </a>
              <Link href="/toolbox/store"
                className="border border-white/30 text-white text-[13px] px-8 py-4 tracking-[0.07em] hover:border-white/60 hover:bg-white/5 transition-colors text-center">
                Back to Toolbox
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ───────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(14,26,122,0.10)]">
            <Image src="/images/toolbox/new-leader-onboarding-toolkit.png"
              alt="New Leader Onboarding Toolkit — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            {/* ── METADATA PANEL ──── */}
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&rsquo;s Inside</p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">7 documents &middot; Editable DOCX</p>
              <ul className="space-y-1.5">
                {['90-Day Onboarding Framework', 'Stakeholder Listening Guide', 'Quick-Read School Profile Template', 'Decision Inventory Framework', 'Board Relationship Guide', 'Staff Introduction Protocol', '90-Day Review Framework'].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              New leaders are left to figure out the first 90 days on their own. Most of the critical mistakes happen there.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Leadership transitions are treated as complete once someone is hired. The offer is signed, the
                announcement is made, and then the new leader arrives — often to a school that is relieved someone
                is there but hasn&rsquo;t prepared to help them succeed.
              </p>
              <p>
                The first 90 days determine an enormous amount: which relationships are established, which early
                decisions build or damage trust, what institutional knowledge gets absorbed before changes are made.
                Leaders who move too fast lose the room. Leaders who move too slow lose credibility. The distinction
                between the two is almost entirely a function of preparation.
              </p>
              <p>
                The New Leader Onboarding Toolkit provides the structure, the listening framework, and the decision
                inventory that turns the first 90 days from improvised orientation into a deliberate start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">What&rsquo;s Included</p>
          <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
            A complete structure for the first 90 days in a new leadership role.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Designed for the incoming leader and the board or outgoing head supporting the transition — with
            tools for both sides of the handoff.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: '90-Day Onboarding Framework', desc: 'A phased structure for the first 30, 60, and 90 days — covering what to observe, what to ask, what to defer, and what to act on at each stage. The organizing frame for everything else in the toolkit.' },
              { title: 'Stakeholder Listening Guide', desc: 'A structured approach to the listening tour — who to meet with, what questions to ask staff, board members, and families, and how to synthesize what you hear without acting prematurely on partial information.' },
              { title: 'Quick-Read School Profile Template', desc: 'A document structure for capturing institutional knowledge — school history, culture patterns, staff relationships, key families, board dynamics, and the informal knowledge that shapes every decision. Completed before or during the first month.' },
              { title: 'Decision Inventory Framework', desc: 'A framework for sorting decisions in the first 90 days by urgency and reversibility — what requires immediate action, what can wait, and what should wait until relationships are established. Prevents the early missteps that cost trust.' },
              { title: 'Board Relationship Guide', desc: 'A framework for establishing a productive working relationship with the board in the first 90 days — covering communication expectations, early meeting structure, and the dynamics that new heads most often misread.' },
              { title: 'Staff Introduction Protocol', desc: 'A structured approach to introducing yourself to staff — what to share, what to ask, and how to establish the tone of the leadership relationship from the first week. Includes a template for the first all-staff communication.' },
              { title: '90-Day Review Framework', desc: 'A structure for the formal 90-day review between the new leader and the board — what to assess, how to surface concerns on both sides, and how to set expectations for the next phase of the tenure.' },
            ].map((item) => (
              <div key={item.title} className="bg-white flex flex-col">
                <div className="h-1 bg-[#d6a758]" />
                <div className="p-7 flex-1">
                  <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>{item.title}</h3>
                  <p className="text-[#374151] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHO IT'S FOR ──────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Who It&rsquo;s For</p>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-6" style={serif}>
                New leaders who want to start right — and boards who want to support them.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is most effective when used by the incoming leader in coordination with their board
                or the outgoing head. The Quick-Read School Profile in particular is designed to be completed
                during the transition, not after — so the incoming leader arrives with context, not just a job title.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Incoming heads of school in their first 90 days',
                'New program directors stepping into a complex role',
                'Boards preparing for a leadership transition who want to support the incoming leader',
                'Outgoing leaders who want to leave the school in the best position for whoever comes next',
                'Leaders placed through MatchHub who want a structured entry framework',
                'Interim leaders navigating a new school community quickly',
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

      {/* ── 5. HOW TO USE IT ─────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">How to Use It</p>
            <p className="text-[#374151] text-lg leading-relaxed">
              Begin with the 90-Day Onboarding Framework and the Decision Inventory Framework before your first week.
              The framework sets the arc; the inventory gives you a way to triage what comes at you. The Stakeholder
              Listening Guide is your primary tool for the first 30 days — focus on listening before acting. The
              Quick-Read School Profile should be started by the outgoing leader or board before you arrive, and
              completed in your first two weeks. The 90-Day Review is not optional — schedule it in advance.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. BUY CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            New Leader Onboarding Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$375</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The structure to start right — building relationships, absorbing context, and acting with the confidence
            that comes from preparation.
          </p>
          <a href={STRIPE} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-[#d6a758] text-white text-[13px] px-12 py-4 tracking-[0.07em] hover:bg-[#c09240] transition-colors font-medium mb-8">
            Buy Now &rarr;
          </a>
          <div>
            <Link href="/toolbox/store" className="text-white/50 text-sm hover:text-white/80 transition-colors">
              &larr; Back to Toolbox
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. RELATED ───────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F7] border-t border-[#E2DDD6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">Related Tools</p>
          <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight tracking-tight mb-14" style={serif}>
            Tools that work alongside this one.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Leadership Transition & Succession Toolkit', slug: 'leadership-transition-toolkit', desc: 'The New Leader Onboarding Toolkit is the incoming side of a leadership transition. The Leadership Transition Toolkit covers the outgoing side — knowledge transfer, documentation, and the school infrastructure a departing leader leaves behind.' },
              { title: 'Montessori Leadership Operations Playbook', slug: 'leadership-operations-playbook', desc: 'After the first 90 days, new leaders need operating infrastructure. The Leadership Operations Playbook provides the meeting rhythms, decision protocols, and delegation frameworks that make the role sustainable.' },
              { title: 'Board Onboarding & Alignment Toolkit', slug: 'board-onboarding-toolkit', desc: 'New leaders work most effectively with boards that are themselves well-oriented. The Board Onboarding Toolkit builds the shared understanding that makes the head-board relationship productive from the start.' },
            ].map((item) => (
              <div key={item.slug} className="bg-white border border-[#E2DDD6] p-7">
                <h3 className="text-[#0e1a7a] text-lg font-semibold mb-3 leading-snug" style={serif}>{item.title}</h3>
                <p className="text-[#374151] text-sm leading-relaxed mb-5">{item.desc}</p>
                <Link href={`/toolbox/${item.slug}`} className="text-[#0e1a7a] text-xs font-medium tracking-wide hover:underline">
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
