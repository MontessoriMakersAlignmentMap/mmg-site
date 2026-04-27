import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const principles = [
  {
    title: 'Care of Environment is a Practical Life area',
    body: 'In every Montessori classroom, children polish silver, water plants, sweep, fold cloths. They learn — by age three — that the room is maintained as a daily, observable practice. The environment is not maintained by accident. It is maintained by attention.',
  },
  {
    title: 'We ask this of the children. We should model it.',
    body: 'Most school management platforms treat compliance as bolt-on paperwork: a Dropbox folder, a calendar reminder, a panicked search through email when the fire marshal calls. That is not what we ask of children. It should not be what we ask of ourselves.',
  },
  {
    title: 'The adult community has its own Practical Life',
    body: 'Fire-marshal visits. Insurance renewals. State licensing. Accreditation cycles. Vendor contracts. Immunization records. Background checks. These are the operational equivalents of polishing silver — the daily, observable acts that keep the school worthy of the children inside it.',
  },
]

const categories = [
  { name: 'Facility Inspections', detail: 'Fire marshal · sprinklers · playground · HVAC · daily safety walkthroughs' },
  { name: 'Insurance Policies', detail: 'General liability · cyber & tech E&O · workers comp · D&O · property' },
  { name: 'Accreditation', detail: 'AMS · AMI · MSA-CESS · regional accreditation cycles' },
  { name: 'Licenses & Permits', detail: 'State child care license · food service · building occupancy · zoning' },
  { name: 'Vendor Contracts', detail: 'Cleaning · ISP · curriculum subscriptions · payroll service · transportation' },
  { name: 'Leases', detail: 'Building · equipment · vehicle' },
  { name: 'Health & Immunization', detail: 'Staff TB tests · CPR · first aid · annual physicals' },
  { name: 'Background Checks', detail: 'State · federal/FBI fingerprint · child abuse registry' },
]

const what = [
  {
    title: 'One record per obligation, with a renewal cadence',
    body: 'Title, issuer, policy/reference number, issued date, effective date, expiration. Frequency tagged: monthly, quarterly, annual, biennial, triennial. The system carries the rhythm so the human does not have to.',
  },
  {
    title: 'File attachments, school-private, signed URLs',
    body: 'Upload the actual fire marshal report, insurance certificate, accreditation letter, license PDF. Stored in private Supabase Storage scoped to your school. Auditors get the source document, not a screenshot of a Dropbox folder.',
  },
  {
    title: 'Auto-correcting alert windows',
    body: 'Records show overdue, due-this-week, due-this-month, due-in-60-days, on-track. A single dashboard pill replaces six calendar reminders. The system corrects itself the way a Montessori material corrects a child — by making the error visible, not by punishing it.',
  },
  {
    title: 'Renewal contact carried with the record',
    body: 'Broker name, carrier email, vendor portal URL, accreditor login — on the record. When something is due, the next action is one click away, not a hunt through email for the right contact.',
  },
  {
    title: 'Linked to your existing Facility Inspections',
    body: 'Already used the daily safety walkthrough or annual fire-marshal checklist in MMAP? Each completed inspection links back to its compliance record. The audit trail tells one story, not two.',
  },
  {
    title: 'Built into the platform schools already use',
    body: 'Not a separate compliance app you log into once a year. Lives inside the school management system you and your staff already use daily. Visible in the same sidebar as attendance, lessons, and the family portal.',
  },
]

const competitors = [
  {
    them: 'Transparent Classroom',
    they: 'Classroom-only. No compliance tracking. Insurance, licensing, accreditation, fire safety: not in the product.',
  },
  {
    them: 'Brightwheel',
    they: 'Parent-communication-first. Document storage exists but with no expiration tracking, no renewal cadence, no Montessori framing — and certainly no model of compliance as care of environment.',
  },
  {
    them: 'Procare, Tadpoles, Famly, Kangarootime',
    they: 'Operations-heavy childcare platforms. Some include static document storage; none model compliance as a recurring lifecycle. None tie the work to the pedagogy.',
  },
  {
    them: 'PowerSchool, Skyward, Infinite Campus',
    they: 'Big-district SIS systems with compliance modules priced for districts, not Montessori schools. Not Montessori-native — built around traditional grade levels, traditional discipline frames, traditional reporting.',
  },
]

const whoItIsFor = [
  'Heads of school who carry the legal weight of the school in their head and want it visible somewhere else',
  'Operations directors who currently keep insurance, licensing, and accreditation in spreadsheets, calendars, and email folders',
  'Faculty leaders preparing for an AMS, AMI, or regional accreditation cycle',
  'Boards reviewing operational risk and wanting one place to see "what is current, what is expiring, what is overdue"',
  'New schools who want to do this right from the beginning, not retrofit it after a missed renewal',
]

const callouts = [
  { title: 'Montessori-native, not Montessori-themed', body: 'The framing is structural, not cosmetic.' },
  { title: 'One primitive, many categories', body: 'Adding "background checks" is not a new product — it is a row.' },
  { title: 'Visible discipline replaces invisible risk', body: 'You cannot manage what you cannot see.' },
]

export default function CareOfPreparedEnvironmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6a758] flex-shrink-0" />
              <span className="text-white text-xs tracking-[0.15em] uppercase">Included on North Star and above</span>
            </div>
            <h1 style={serif} className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-[1.05]">
              Care of the Prepared Environment.
            </h1>
            <p className="text-2xl md:text-3xl text-white/85 mb-6 leading-snug font-light" style={serif}>
              The Practical Life lesson the adults forgot to take.
            </p>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-10 max-w-2xl">
              Fire-marshal visits, insurance renewals, accreditation, licensing, leases, vendor contracts, staff health,
              background checks. Every Montessori school carries a hidden curriculum of operational obligations.
              MMAP makes that curriculum visible — and turns it into a daily, observable practice the way Montessori
              herself would have wanted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/mmap/demo"
                className="inline-flex items-center justify-center bg-[#d6a758] hover:bg-[#c8993f] text-[#0e1a7a] px-8 py-4 text-base font-medium tracking-wide transition-colors"
              >
                See it in MMAP →
              </Link>
              <Link
                href="/mmap/north-star"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 text-base font-medium tracking-wide transition-colors"
              >
                North Star pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Principle */}
      <section className="bg-[#faf8f3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-[#0e1a7a]/70 mb-6">The principle</p>
          <h2 style={serif} className="text-4xl md:text-5xl font-light text-[#0e1a7a] mb-12 leading-tight">
            We ask children to care for the environment.<br />
            <span className="text-[#0e1a7a]/60">Then we model the opposite.</span>
          </h2>
          <div className="space-y-10">
            {principles.map((p) => (
              <div key={p.title} className="border-l-2 border-[#d6a758] pl-6">
                <h3 style={serif} className="text-xl md:text-2xl font-medium text-[#0e1a7a] mb-3">{p.title}</h3>
                <p className="text-base md:text-lg text-[#0e1a7a]/75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eight categories */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#0e1a7a]/70 mb-6">What it tracks</p>
            <h2 style={serif} className="text-4xl md:text-5xl font-light text-[#0e1a7a] mb-6 leading-tight">
              Eight categories. One primitive. Every Montessori school's operational reality.
            </h2>
            <p className="text-lg text-[#0e1a7a]/70 leading-relaxed">
              Add a new category later — it is a row, not a new product. The shape is built once and carried everywhere.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {categories.map((c) => (
              <div key={c.name} className="flex gap-5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d6a758] mt-2.5 flex-shrink-0" />
                <div>
                  <h3 style={serif} className="text-xl font-medium text-[#0e1a7a] mb-2">{c.name}</h3>
                  <p className="text-[#0e1a7a]/70 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#d6a758] mb-6">What is inside</p>
            <h2 style={serif} className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
              Six things every other platform pretends are someone else's job.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {what.map((w) => (
              <div key={w.title} className="bg-white/5 border border-white/10 p-8">
                <h3 style={serif} className="text-xl md:text-2xl font-medium text-white mb-3">{w.title}</h3>
                <p className="text-white/75 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What no one else does */}
      <section className="bg-[#faf8f3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#0e1a7a]/70 mb-6">What no one else does</p>
            <h2 style={serif} className="text-4xl md:text-5xl font-light text-[#0e1a7a] mb-6 leading-tight">
              We surveyed the field. No platform built for Montessori schools tracks operational compliance as care of environment.
            </h2>
            <p className="text-lg text-[#0e1a7a]/70 leading-relaxed">
              Document storage exists. Spreadsheet templates exist. Calendar reminders exist. None of them are framed
              as Practical Life. None of them tie the work to the pedagogy. None of them make the discipline visible
              to the children who are watching the adults model it.
            </p>
          </div>
          <div className="space-y-6">
            {competitors.map((c) => (
              <div key={c.them} className="grid md:grid-cols-[200px_1fr] gap-6 border-t border-[#0e1a7a]/15 pt-6">
                <div style={serif} className="text-xl font-medium text-[#0e1a7a]">{c.them}</div>
                <div className="text-[#0e1a7a]/75 leading-relaxed">{c.they}</div>
              </div>
            ))}
            <div className="grid md:grid-cols-[200px_1fr] gap-6 border-t-2 border-[#d6a758] pt-6 mt-2">
              <div style={serif} className="text-xl font-medium text-[#0e1a7a]">MMAP</div>
              <div className="text-[#0e1a7a] leading-relaxed font-medium">
                One primitive across eight categories. Renewal cadence + file attachments + auto-correcting alert
                windows + Montessori framing — built into the school management platform schools already use daily.
                Not a bolt-on. Not a folder. A pedagogy applied to operations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three callouts */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {callouts.map((c) => (
              <div key={c.title}>
                <div className="w-12 h-px bg-[#d6a758] mb-6" />
                <h3 style={serif} className="text-2xl md:text-3xl font-light text-[#0e1a7a] mb-4 leading-tight">{c.title}</h3>
                <p className="text-[#0e1a7a]/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-[#faf8f3] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-[#0e1a7a]/70 mb-6">Who it is for</p>
          <h2 style={serif} className="text-4xl md:text-5xl font-light text-[#0e1a7a] mb-12 leading-tight">
            If you currently keep this in your head, this is for you.
          </h2>
          <ul className="space-y-5">
            {whoItIsFor.map((line, i) => (
              <li key={i} className="flex gap-4 text-lg text-[#0e1a7a]/85 leading-relaxed">
                <span className="text-[#d6a758] flex-shrink-0 mt-2">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={serif} className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            Make compliance visible.
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
            Care of the Prepared Environment is included on North Star ($3/student/mo) and above. See it in a 30-minute walkthrough — bring your insurance broker's email if you want, we'll set up a real record live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mmap/demo"
              className="inline-flex items-center justify-center bg-[#d6a758] hover:bg-[#c8993f] text-[#0e1a7a] px-8 py-4 text-base font-medium tracking-wide transition-colors"
            >
              Book a walkthrough →
            </Link>
            <Link
              href="/mmap/pricing"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 text-base font-medium tracking-wide transition-colors"
            >
              See full pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
