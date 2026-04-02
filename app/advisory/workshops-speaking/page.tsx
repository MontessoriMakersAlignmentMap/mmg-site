'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NewsletterSignup } from '@/components/NewsletterSignup'

const serif = { fontFamily: 'var(--font-heading)' }

const inputClass =
  'w-full border border-[#E2DDD6] bg-[#FAF9F7] px-4 py-3 text-sm text-[#374151] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0e1a7a] transition-colors'
const labelClass = 'block text-[#64748B] text-xs tracking-[0.15em] uppercase mb-2'
const labelLongClass = 'block text-[#374151] text-sm font-medium mb-2'

const topics = [
  {
    theme: 'Leadership Under Pressure',
    framing:
      'What Montessori actually asks of leaders when external forces—policy shifts, community fractures, political pressure—are actively working to destabilize the environment. Principled response over administrative reaction.',
  },
  {
    theme: 'Adult Culture as the Work',
    framing:
      'The relationship between adult culture and child outcomes is not metaphorical. When leadership understands adult trust, communication, and conflict as organizational infrastructure, everything downstream changes.',
  },
  {
    theme: 'ABAR as Montessori Practice',
    framing:
      'Anti-bias and antiracist work is not an add-on to Montessori—it is philosophically required by it. Tracing the direct connections between Montessori\'s vision for human development and the active work of dismantling bias in schools.',
  },
  {
    theme: 'Systems for Liberation',
    framing:
      'Individual practice can only go so far. Building Montessori organizations that are structurally different—not just aspirationally different—requires moving from values on the wall to systems that function differently.',
  },
  {
    theme: 'The Aligned School',
    framing:
      'What organizational alignment actually looks like in Montessori—from governance to classroom—and why the gap between vision and daily reality is a structural problem, not a people problem.',
  },
]

const experience = [
  {
    label: 'Grounded in research',
    detail:
      'Every session draws from organizational theory, Montessori philosophy, and leadership research. The intellectual foundation is visible, not decorative.',
  },
  {
    label: 'Built for practitioners',
    detail:
      'These are rooms full of people doing the work. Sessions are designed for people who are already leading—not preparing to lead.',
  },
  {
    label: 'Interactive by design',
    detail:
      'Participants leave with frameworks they can apply, not concepts they have to translate. Discussion, reflection, and application are built into the structure.',
  },
  {
    label: 'Honest about complexity',
    detail:
      'The work is hard. Sessions name that directly. No oversimplification, no false promise of easy answers—just clearer thinking and sharper tools.',
  },
]

const formats = [
  {
    label: 'Keynote',
    detail:
      'A 45–90 minute address built around a single central argument. Designed for conference openings, community events, or leadership convenings where the room needs a shared frame.',
  },
  {
    label: 'Workshop',
    detail:
      'Half-day to full-day interactive sessions. Participants work through material, not just receive it. Available for school staff, leadership teams, or conference breakouts.',
  },
  {
    label: 'Intensive',
    detail:
      'Multi-session, deep-dive programming for a single community or cohort. Designed when a keynote isn\'t enough and the goal is sustained shift, not a single event.',
  },
  {
    label: 'Panel & Facilitation',
    detail:
      'Moderated panels, facilitated roundtables, and structured dialogue for conferences or leadership convenings that need a skilled external voice to hold the room.',
  },
]

const workshops = [
  {
    number: '01',
    title: 'Equitable Interviewing & Hiring Practices',
    description:
      'How to design an interview process that reduces bias, surfaces real capacity, and reflects your organizational values from the first interaction.',
    audience: 'School leaders, hiring managers, HR leads',
  },
  {
    number: '02',
    title: 'Coaching Conversations That Support Growth',
    description:
      'A framework for having the conversations that develop adults — not just evaluate them. Grounded in Montessori principles and designed for real schools.',
    audience: 'Heads of school, department leads, instructional coaches',
  },
  {
    number: '03',
    title: 'People Policies That Reflect Your Values',
    description:
      'Audit and redesign your HR policies so they say what you actually believe — about people, fairness, and what it means to work in your organization.',
    audience: 'School leaders, operations leads, board members',
  },
  {
    number: '04',
    title: 'Community Architecture: Rituals, Belonging & Collective Care',
    description:
      'How organizations build the conditions for belonging — the rhythms, rituals, and structures that make adults feel genuinely part of something.',
    audience: 'Full staff, leadership teams, DEI coordinators',
  },
  {
    number: '05',
    title: 'Designing Onboarding for Belonging',
    description:
      'Move beyond orientation checklists to onboarding that actually integrates new staff — into the culture, the philosophy, and the community.',
    audience: 'School leaders, operations teams, department heads',
  },
  {
    number: '06',
    title: 'Boundaries, Workflows & Sustainable Leadership',
    description:
      'The systems, structures, and practices that make it possible to lead long-term without burning out — for heads and their teams.',
    audience: 'School leaders, leadership teams, administrators',
  },
  {
    number: '07',
    title: 'Equity in Adult Culture: Practices That Shift the Day-to-Day',
    description:
      'Equity is not a policy — it is a set of daily practices. This workshop identifies where inequity shows up in adult culture and builds practical responses.',
    audience: 'Full staff, leadership teams, ABAR leads',
  },
  {
    number: '08',
    title: 'Storytelling & Identity: Communicating Who You Are',
    description:
      'Help your school develop a clear, consistent organizational identity and the language to communicate it — internally and to prospective families and staff.',
    audience: 'School leaders, communications staff, enrollment teams',
  },
  {
    number: '09',
    title: 'Communication Rhythms That Build Trust',
    description:
      'Trust is built or eroded through repeated patterns of communication. This workshop builds the routines, cadences, and practices that grow trust over time.',
    audience: 'Leadership teams, full staff, boards',
  },
  {
    number: '10',
    title: 'Evaluating With Dignity: Foundations of the Montessori Makers Appraisal Cycle',
    description:
      'An introduction to the Montessori Makers Appraisal Cycle — a performance evaluation framework built on dignity, development, and Montessori organizational values.',
    audience: 'Heads of school, instructional leaders, HR leads',
  },
  {
    number: '11',
    title: 'Conflict Resolution & Difficult Conversations for Montessori Teams',
    description:
      'How to navigate the conversations that most leaders avoid — with a framework grounded in Montessori values and designed for the specific culture of Montessori schools.',
    audience: 'Full staff, leadership teams, board members',
  },
  {
    number: '12',
    title: 'Strategic Visioning: Turning Montessori Values Into Action',
    description:
      'Move from values statements to actionable organizational direction — with a process that grounds strategic planning in Montessori philosophy rather than generic business frameworks.',
    audience: 'Leadership teams, boards, strategic planning groups',
  },
  {
    number: '13',
    title: 'Equity in Daily Practice',
    description:
      'An applied workshop on how equity principles show up (or don\'t) in the moment-to-moment work of school life — for both adults and the children in their care.',
    audience: 'Full staff, classroom teachers, support staff',
  },
  {
    number: '14',
    title: 'The Prepared Adult: Mindset, Modeling & Presence',
    description:
      'Montessori asks the adult to be prepared — not just the environment. This workshop explores what that preparation means for adult culture, self-awareness, and leadership presence.',
    audience: 'Full staff, leadership teams, teacher educators',
  },
  {
    number: '15',
    title: 'Montessori 101: Foundations of the Philosophy',
    description:
      'An accessible, grounded introduction to Montessori philosophy — for new staff, board members, or community members who want to understand what Montessori actually is.',
    audience: 'New staff, board members, prospective families, community partners',
  },
]

const connectedPathways = [
  {
    title: 'Montessori Mapping',
    href: '/advisory/mapping',
    description: 'Whole-school diagnostic. See your organization clearly.',
  },
  {
    title: 'Leadership Coaching',
    href: '/advisory/coaching',
    description: '1:1 support for heads of school navigating real decisions.',
  },
  {
    title: 'Strategic Partnership',
    href: '/advisory/partnership',
    description: 'Retained advisory embedded in your leadership work.',
  },
]

type FormState = {
  name: string
  email: string
  organization: string
  role: string
  message: string      // What topic or challenge (required)
  situation: string    // Who is the audience and how many
  supportType: string  // Preferred format
  timeline: string     // Preferred length
  schoolSize: string   // Desired date(s)
  goals: string        // Anything else about context/goals
}

const emptyForm: FormState = {
  name: '',
  email: '',
  organization: '',
  role: '',
  message: '',
  situation: '',
  supportType: '',
  timeline: '',
  schoolSize: '',
  goals: '',
}

export default function WorkshopsSpeakingPage() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [hp, setHp] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFormError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.organization,
          role: form.role,
          message: form.message,
          situation: form.situation,
          supportType: form.supportType,
          timeline: form.timeline,
          schoolSize: form.schoolSize,
          goals: form.goals,
          service: 'Custom Workshop Request',
          source: 'workshops page — request form',
          hp,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setFormError(
        'Something went wrong. Please try again or email us at info@montessorimakers.org.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
              Advisory · Workshops &amp; Speaking
            </p>
            <h1
              className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
              style={serif}
            >
              The work that often starts here.
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-2xl">
              Keynotes, workshops, and facilitation for Montessori schools and organizations.
              Grounded in philosophy. Built to move rooms—and the leaders in them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#request-workshop"
                className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium"
              >
                Request a Workshop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic framing strip */}
      <section className="bg-[#FAF9F7] py-12 md:py-16 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#0e1a7a] text-xl md:text-2xl leading-relaxed max-w-3xl" style={serif}>
            Most engagements begin as a workshop or keynote and grow into deeper advisory work over time.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Topics</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Five themes. Each built around a real problem.
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              Sessions are tailored to the audience and context. These themes represent the
              territory—not a menu you pick from, but a map of where the work lives.
            </p>
          </div>
          <div className="space-y-0">
            {topics.map((topic, i) => (
              <div
                key={topic.theme}
                className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-16 py-8 border-t border-[#E2DDD6] last:border-b"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[#8A6014] text-xs tracking-[0.15em] font-medium flex-shrink-0 mt-1">
                    0{i + 1}
                  </span>
                  <h3 className="text-[#0e1a7a] text-lg font-semibold leading-snug" style={serif}>
                    {topic.theme}
                  </h3>
                </div>
                <p className="text-[#374151] text-base leading-relaxed">{topic.framing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image break */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80"
          alt="School leaders engaged in professional development — the collaborative spirit of Montessori workshops"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0e1a7a]/30" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p
            className="text-white text-xl md:text-2xl lg:text-3xl text-center max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            &ldquo;These are rooms full of people doing the work. Sessions are designed for people who are already leading.&rdquo;
          </p>
        </div>
      </div>

      {/* What to expect */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">What to Expect</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight" style={serif}>
              What these sessions are actually like.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {experience.map((item) => (
              <div key={item.label} className="border border-white/15 p-8">
                <h3 className="text-[#d6a758] text-sm font-semibold tracking-wide uppercase mb-4">
                  {item.label}
                </h3>
                <p className="text-[#94A3B8] text-base leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-[#64748B] text-sm leading-relaxed mt-10 max-w-2xl">
            Hannah speaks regularly at AMI, AMS, and independent Montessori conferences, and works
            directly with school communities and leadership teams nationwide. All formats are
            available in-person and virtually.
          </p>
        </div>
      </section>

      {/* Formats */}
      <section id="formats" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Formats</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              Four formats. Matched to what the moment needs.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formats.map((format) => (
              <div key={format.label} className="bg-white border border-[#E2DDD6] p-7">
                <h3 className="text-[#0e1a7a] text-sm font-semibold tracking-wide uppercase mb-4">
                  {format.label}
                </h3>
                <p className="text-[#374151] text-sm leading-relaxed">{format.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop menu intro strip */}
      <section className="bg-[#FAF9F7] py-16 md:py-20 px-6 md:px-10 border-b border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="flex items-start gap-4">
            <span className="text-[#8A6014] text-sm flex-shrink-0 mt-1">—</span>
            <div>
              <p className="text-[#0e1a7a] font-semibold text-base mb-1" style={serif}>Fully customizable</p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Each workshop is adapted to your school&rsquo;s context, team, and specific goals.
                No two deliveries are identical.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-[#8A6014] text-sm flex-shrink-0 mt-1">—</span>
            <div>
              <p className="text-[#0e1a7a] font-semibold text-base mb-1" style={serif}>Half-day to multi-day</p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Format scales to your needs. Topics can be combined into a full professional
                development day or series.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-[#8A6014] text-sm flex-shrink-0 mt-1">—</span>
            <div>
              <p className="text-[#0e1a7a] font-semibold text-base mb-1" style={serif}>In-person &amp; virtual</p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                All workshops are available in both formats. Virtual sessions are designed
                for active engagement, not passive attendance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop list */}
      <section id="workshops" className="bg-[#F2EDE6] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Workshop Menu</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight" style={serif}>
              All 15 topics.
            </h2>
          </div>
          <div className="space-y-3">
            {workshops.map((workshop) => (
              <div
                key={workshop.number}
                className="bg-white border border-[#E2DDD6] p-7 md:p-8 grid md:grid-cols-12 gap-4 md:gap-8 items-start hover:border-[#C8C0B6] hover:shadow-sm transition-all duration-200"
              >
                <div className="md:col-span-5">
                  <div className="flex items-start gap-3">
                    <span className="text-[#8A6014] text-xs tracking-[0.2em] font-medium flex-shrink-0 mt-1">
                      {workshop.number}
                    </span>
                    <h3 className="text-[#0e1a7a] font-semibold text-base leading-snug" style={serif}>
                      {workshop.title}
                    </h3>
                  </div>
                </div>
                <div className="md:col-span-5 pl-6 md:pl-0">
                  <p className="text-[#374151] text-sm leading-relaxed">{workshop.description}</p>
                </div>
                <div className="md:col-span-2 pl-6 md:pl-0">
                  <p className="text-[#64748B] text-xs tracking-[0.1em] uppercase mb-1">Audience</p>
                  <p className="text-[#374151] text-xs leading-relaxed">{workshop.audience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom workshops */}
      <section className="bg-[#FAF9F7] py-20 md:py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Custom Workshops</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6" style={serif}>
              Don&rsquo;t see exactly what you need?
            </h2>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Hannah designs custom workshops for schools and organizations with specific needs
              not covered by the menu above. Custom engagements begin with a consultation to
              understand the context, the audience, and the outcomes that matter.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed">
              Share the context, audience, and goals below. We&rsquo;ll review your request and
              determine whether a custom workshop is the right fit.
            </p>
          </div>
          <div className="bg-[#F2EDE6] border border-[#E2DDD6] p-8">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-5">To Request a Workshop</p>
            <div className="space-y-4">
              {[
                "What topic or challenge you're addressing",
                'Who the audience is and how many participants',
                'Your preferred format and length',
                'Desired date(s) and whether in-person or virtual',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5 text-sm">—</span>
                  <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="#request-workshop"
                className="inline-block bg-[#0e1a7a] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#162270] transition-colors"
              >
                Request a Workshop
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Workshop Request Form */}
      <section id="request-workshop" className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Left — heading + context */}
            <div>
              <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
                Custom Workshops
              </p>
              <h2
                className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
                style={serif}
              >
                Request a Workshop
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-8">
                Share the context, audience, and desired outcomes. We&rsquo;ll review your
                request and determine whether a custom workshop is the right fit.
              </p>
              <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-6">
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Requests are reviewed individually. If there is alignment, the next step
                  will be a conversation.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div>
              {submitted ? (
                <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-10">
                  <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
                    Received
                  </p>
                  <p
                    className="text-[#0e1a7a] text-xl font-semibold mb-3"
                    style={serif}
                  >
                    Thank you, {form.name || 'there'}.
                  </p>
                  <p className="text-[#374151] text-sm leading-relaxed">
                    Your workshop request has been received. If there is alignment, you will
                    hear back within two weeks.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="hp"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                  />

                  {/* Full Name */}
                  <div>
                    <label className={labelClass}>
                      Full Name <span className="text-[#8A6014]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>
                      Email <span className="text-[#8A6014]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@school.org"
                      className={inputClass}
                    />
                  </div>

                  {/* School / Organization */}
                  <div>
                    <label className={labelClass}>
                      School / Organization <span className="text-[#8A6014]">*</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      required
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="School or organization name"
                      className={inputClass}
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className={labelClass}>
                      Role <span className="text-[#8A6014]">*</span>
                    </label>
                    <input
                      type="text"
                      name="role"
                      required
                      value={form.role}
                      onChange={handleChange}
                      placeholder="Head of School, Director, Conference Organizer..."
                      className={inputClass}
                    />
                  </div>

                  {/* Topic / challenge */}
                  <div>
                    <label className={labelLongClass}>
                      What topic or challenge are you addressing?{' '}
                      <span className="text-[#8A6014]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the challenge, theme, or area of focus you want the workshop to address."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {/* Audience */}
                  <div>
                    <label className={labelLongClass}>
                      Who is the audience and how many participants?
                    </label>
                    <input
                      type="text"
                      name="situation"
                      value={form.situation}
                      onChange={handleChange}
                      placeholder="e.g. Full staff of 30, leadership team of 8, conference breakout of 50..."
                      className={inputClass}
                    />
                  </div>

                  {/* Preferred format */}
                  <div>
                    <label className={labelClass}>
                      Preferred Format
                    </label>
                    <input
                      type="text"
                      name="supportType"
                      value={form.supportType}
                      onChange={handleChange}
                      placeholder="Virtual, in-person, or hybrid"
                      className={inputClass}
                    />
                  </div>

                  {/* Preferred length */}
                  <div>
                    <label className={labelClass}>
                      Preferred Length
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      placeholder="e.g. 90 minutes, half-day, full day, multi-session..."
                      className={inputClass}
                    />
                  </div>

                  {/* Desired date(s) */}
                  <div>
                    <label className={labelClass}>
                      Desired Date(s)
                    </label>
                    <input
                      type="text"
                      name="schoolSize"
                      value={form.schoolSize}
                      onChange={handleChange}
                      placeholder="e.g. March 2026, flexible within Q1, specific conference date..."
                      className={inputClass}
                    />
                  </div>

                  {/* Context / goals */}
                  <div>
                    <label className={labelLongClass}>
                      Anything else we should know about the context or goals?
                    </label>
                    <textarea
                      name="goals"
                      value={form.goals}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any additional context about your school, event, or what you're hoping participants leave with."
                      className={`${inputClass} resize-none leading-relaxed`}
                    />
                  </div>

                  {formError && (
                    <p className="text-red-600 text-sm">{formError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* How this work connects */}
      <section className="bg-[#0e1a7a] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">How This Work Connects</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Workshops and speaking are often where the work begins.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              For schools working through deeper challenges—alignment, leadership structure,
              communication, or adult culture—this work extends into advisory partnerships.
              A single session often surfaces what a full engagement can address.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {connectedPathways.map((pathway) => (
              <Link
                key={pathway.title}
                href={pathway.href}
                className="border border-white/15 p-8 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
              >
                <h3 className="text-white text-lg font-semibold mb-3 group-hover:text-[#8A6014] transition-colors" style={serif}>
                  {pathway.title}
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-4">{pathway.description}</p>
                <span className="text-[#8A6014] text-xs tracking-[0.15em] uppercase">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF9F7] py-24 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Next Step</p>
            <h2 className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-4" style={serif}>
              Ready to bring this work to your community?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0e1a7a] text-white text-sm px-12 py-5 tracking-wide hover:bg-[#162270] transition-colors text-center whitespace-nowrap font-medium"
            >
              Book a Consultation
            </a>
            <a
              href="#request-workshop"
              className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-12 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors text-center whitespace-nowrap"
            >
              Request a Workshop
            </a>
          </div>
          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xl">
            Workshops and keynotes are typically scheduled 4–8 weeks in advance. Major conferences: 3–6 months.
          </p>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
