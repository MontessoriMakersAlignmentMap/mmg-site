import Image from 'next/image'
import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }
const STRIPE = 'https://buy.stripe.com/fZu6oJb2g7T26AL9VL2cg1i'

export default function EnrollmentSystemsToolkitPage() {
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
              Enrollment Systems Toolkit
            </h1>
            <p className="text-[#94A3B8] text-xl leading-relaxed mb-10 max-w-2xl">
              End-to-end enrollment infrastructure for Montessori schools — from first inquiry through re-enrollment,
              built for the complexity that most schools are managing without a real system.
            </p>
            <p className="text-[#d6a758] text-4xl font-semibold tracking-tight mb-10" style={serif}>$425</p>
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
            <Image src="/images/toolbox/enrollment-systems-toolkit.png"
              alt="Enrollment Systems Toolkit — Montessori Makers Toolbox"
              fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 40vw" />
          </div>
          <div>
            {/* ── METADATA PANEL ──── */}
            <div className="bg-[#F2EDE6] border-l-4 border-[#d6a758] px-6 py-5 mb-10">
              <p className="text-[#8A6014] text-[10px] tracking-[0.2em] uppercase mb-3">What&rsquo;s Inside</p>
              <p className="text-[#0e1a7a] text-sm font-semibold mb-3">8 documents &middot; Editable DOCX</p>
              <ul className="space-y-1.5">
                {['Enrollment Process Map', 'Inquiry Management Protocol', 'Tour Protocol & Guide', 'Admissions Decision Framework', 'Waitlist Management System', 'Re-enrollment Process Guide', 'Family Communication Templates (8)', 'Enrollment Metrics Dashboard'].map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[#374151] text-sm leading-snug">
                    <span className="text-[#d6a758] font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-[#8A6014] text-[11px] tracking-[0.22em] uppercase mb-6">The Problem This Solves</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight tracking-tight mb-10" style={serif}>
              Enrollment is one of the highest-stakes operational systems in a school. Almost none have it properly built.
            </h2>
            <div className="space-y-6 text-[#374151] text-lg leading-relaxed">
              <p>
                Enrollment is where a school&rsquo;s survival and its mission connect. Families are deciding whether
                to trust the school with their children. The school is deciding whether a family is a good fit. Both
                sides are forming impressions that will determine not just the enrollment decision but the quality of
                the relationship for years.
              </p>
              <p>
                Most Montessori schools manage this through a combination of spreadsheets, email threads, and informal
                processes owned by one person. When that person is out or leaves, institutional knowledge walks out
                with them. When inquiry volume grows, the process breaks down. When families don&rsquo;t hear back in
                time, they choose somewhere else.
              </p>
              <p>
                The Enrollment Systems Toolkit builds the infrastructure that makes enrollment reliable, consistent,
                and scalable — with documented processes from the first inquiry through re-enrollment decisions.
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
            The full enrollment pipeline — documented and ready to implement.
          </h2>
          <p className="text-[#374151] text-lg leading-relaxed mb-14 max-w-2xl">
            Every component covers a specific failure point in how schools handle enrollment — from inquiry response
            time through waitlist management to re-enrollment retention.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Enrollment Process Map', desc: 'A full end-to-end map of the enrollment process — every stage, every handoff, every decision point — from first contact to enrolled family. The structural foundation for everything else in the toolkit.' },
              { title: 'Inquiry Management Protocol', desc: 'Standards for how inquiries are received, logged, responded to, and followed up — including response time expectations, tracking structure, and the difference between an inquiry that converts and one that goes cold.' },
              { title: 'Tour Protocol & Guide', desc: 'A structured approach to school tours — what to cover, in what sequence, how to read the family, and how to close the visit in a way that moves the family toward a decision. Includes a preparation checklist for the guide or director leading the tour.' },
              { title: 'Admissions Decision Framework', desc: 'A structured framework for making admissions decisions — covering fit criteria, how to handle borderline situations, documentation standards, and how to communicate decisions to families in a way that maintains the relationship.' },
              { title: 'Waitlist Management System', desc: 'A documented waitlist process covering how families are added, how they move, how they&rsquo;re communicated with, and how decisions are made when a spot opens. Prevents the informal inconsistencies that create family complaints.' },
              { title: 'Re-enrollment Process Guide', desc: 'A structured re-enrollment process covering timeline, communication sequence, decision criteria for non-renewal, and how to retain families who are wavering. Re-enrollment is easier to win than new enrollment — most schools under-invest in it.' },
              { title: 'Family Communication Templates (8)', desc: 'Editable templates for every major enrollment communication — inquiry acknowledgment, tour confirmation, acceptance, waitlist placement, waitlist offer, non-renewal, re-enrollment invitation, and deposit confirmation.' },
              { title: 'Enrollment Metrics Dashboard', desc: 'A simple tracking structure for enrollment metrics — inquiry volume, conversion rates by stage, tour-to-application ratio, and re-enrollment rate — so the head and board can see where the pipeline is healthy and where it isn&rsquo;t.' },
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
                Every school where enrollment lives in someone&rsquo;s head instead of a system.
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                This toolkit is for schools that are serious about enrollment — not as a marketing exercise but as
                an operational discipline. The schools that convert more inquiries and retain more families aren&rsquo;t
                better at selling. They&rsquo;re better at running a consistent, responsive, well-documented process.
              </p>
            </div>
            <ul className="space-y-4 text-[#374151] text-base leading-relaxed">
              {[
                'Heads of school who manage enrollment alongside everything else',
                'Admissions directors building their process from scratch or rebuilding after a staff transition',
                'Schools with declining enrollment who want to understand where inquiries are being lost',
                'Growing schools whose informal process is starting to break under volume',
                'Schools that have had complaints about inconsistent communication with families',
                'Boards who want enrollment reported on systematically, not anecdotally',
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
              Start with the Enrollment Process Map before touching any individual component. Understanding the full
              pipeline — where your school is strong and where it has gaps — determines which documents you need to
              implement first. Schools with inquiry volume problems start with the Inquiry Management Protocol.
              Schools with conversion problems start with the Tour Protocol and Admissions Decision Framework.
              Schools losing re-enrollments start at the end of the pipeline.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. BUY CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight tracking-tight mb-4" style={serif}>
            Enrollment Systems Toolkit
          </h2>
          <p className="text-[#d6a758] text-5xl font-semibold tracking-tight mb-6" style={serif}>$425</p>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            The infrastructure to run enrollment as a real organizational system — documented, consistent, and scalable.
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
              { title: 'Annual Cycle Planning Toolkit', slug: 'annual-cycle-planning-toolkit', desc: 'Enrollment has a seasonal rhythm — open houses, decision deadlines, re-enrollment windows. The Annual Cycle Planning Toolkit maps the full school year so enrollment milestones are never caught by surprise.' },
              { title: 'Montessori Family Handbook', slug: 'family-handbook', desc: 'Enrolled families who understand the school\'s philosophy and expectations stay longer. The Family Handbook sets those expectations from the start and reduces the misunderstandings that lead to non-renewals.' },
              { title: 'Montessori Leadership Operations Playbook', slug: 'leadership-operations-playbook', desc: 'Enrollment is an organizational function that needs to live in the school\'s operating infrastructure. The Leadership Operations Playbook structures how leadership teams manage cross-functional work like enrollment.' },
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
