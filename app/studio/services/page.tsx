import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

const offers = [
  {
    id: 'clarity-audit', // anchor target from /studio CTA
    number: '01',
    name: 'Communication Audit & Clarity Map',
    tagline: 'Entry point. The beginning of every engagement.',
    problem:
      'Most Montessori organizations know their work is distinctive. The harder question is whether that comes through clearly &mdash; in the website, the enrollment conversation, the materials families receive before a tour. Often there are gaps: the online experience doesn&rsquo;t quite match what families find in person, and the school gets described differently depending on who&rsquo;s doing the describing.',
    transformation:
      'The Clarity Audit gives you a complete picture of where understanding breaks down. We review your messaging, your website, your enrollment flow, and the communication patterns your organization actually uses &mdash; then produce a structured map of what&rsquo;s working, what isn&rsquo;t, and what to build next.',
    included: [
      'Messaging audit: what you&rsquo;re saying, where it&rsquo;s consistent, where it contradicts itself',
      'Website review: structure, narrative flow, and what a first-time visitor actually understands',
      'Enrollment communication review: inquiry handling, tour framing, follow-up patterns',
      'Communication pattern analysis: how leadership, guides, and public materials describe the school',
      'Clarity Map: a structured document identifying gaps and the sequence for addressing them',
    ],
    engagement: 'Scope determined through a brief intake conversation.',
    cta: 'Start a Conversation',
    href: '/contact',
  },
  {
    id: 'communication-architecture',
    number: '02',
    name: 'Communication Architecture',
    tagline: 'Flagship engagement. The full system.',
    problem:
      'Many organizations reach a point where communication decisions are happening constantly &mdash; but without a shared foundation. Every new piece of content starts from scratch. New staff members are left to interpret the story on their own. Families receive different signals depending on who they talk to. The issue isn&rsquo;t effort or intention. It&rsquo;s that there isn&rsquo;t a structural system everyone can build from.',
    transformation:
      'Communication Architecture produces a narrative system your whole organization can use. Not guidelines. Not a brand deck. A working system: a clear articulation of what you stand for, a messaging hierarchy that tells people what to say first and next, a voice and tone guide with enough specificity to be genuinely useful, and an enrollment communication sequence that moves families from curiosity to clarity to commitment.',
    included: [
      'Core narrative: the single most important thing you want people to understand about your organization',
      'Messaging hierarchy: what gets said first, second, and what can wait',
      'Voice and tone guide: specific enough to use, not just a list of adjectives',
      'Enrollment clarity: the language and structure of your inquiry-to-enrollment sequence',
      'Site architecture and narrative flow recommendations',
      'Communication system design: what you publish, how often, in what format, to whom',
    ],
    engagement: 'Custom engagement. Scope and timeline determined through conversation.',
    cta: 'Start a Conversation',
    href: '/contact',
  },
  {
    id: 'leadership-voice',
    number: '03',
    name: 'Leadership Voice & Visibility',
    tagline: 'For leaders with ideas worth publishing.',
    problem:
      'Many school leaders have perspectives worth sharing &mdash; on education, on leadership, on what Montessori actually makes possible. The ideas are there. What&rsquo;s missing is the infrastructure that makes publishing sustainable. A newsletter gets started, then stalls. A LinkedIn post gets drafted, then sits. The intention is real, but without a system, consistency is hard to maintain.',
    transformation:
      'Leadership Voice & Visibility builds an editorial infrastructure around your existing thinking. We establish the right publication format for your voice and your audience, develop a content rhythm you can actually maintain, and create the system that makes publishing consistent rather than occasional. The goal is not volume &mdash; it&rsquo;s clarity, specificity, and authority.',
    included: [
      'Editorial strategy: publication format, cadence, audience, and content positioning',
      'Substack or newsletter architecture: structure, voice, and first three issues',
      'LinkedIn positioning: profile framing and a content approach that builds authority without performance',
      'Podcast or long-form video positioning (if relevant to your voice and audience)',
      'Content calendar and editorial rhythm design',
      'Quarterly review and recalibration',
    ],
    engagement: 'Custom engagement. Scope determined through conversation.',
    cta: 'Start a Conversation',
    href: '/contact',
  },
  {
    id: 'website-design-build',
    number: '04',
    name: 'Website Design & Build',
    tagline: 'Your online presence, built to match your actual program.',
    problem:
      'Most Montessori websites look like Montessori websites. The same warm tones, the same stock photography, the same language that could belong to any school. A template-based site doesn&rsquo;t communicate what makes your program different &mdash; it communicates that you look like everyone else. Families experience a gap between what they find online and what they find in person.',
    transformation:
      'Studio designs and builds websites that do the work of communication &mdash; not just presentation. Every structural decision, from information architecture to page flow to copy, is grounded in what you actually stand for. The result is a site that earns trust before a family ever walks through your door.',
    included: [
      'Information architecture: how the site is organized and what families find in what order',
      'Visual design: a design system grounded in your identity, not borrowed from a template',
      'Full copywriting or copy editing for all pages',
      'Development and build (Next.js / modern web stack)',
      'Mobile-responsive design across all pages',
      'Enrollment and inquiry flow design',
      'Launch support and post-launch review',
    ],
    engagement: 'Custom engagement. Often delivered as part of a Communication Architecture engagement, or as a standalone project.',
    cta: 'Start a Conversation',
    href: '/contact',
  },
  {
    id: 'social-media',
    number: '05',
    name: 'Social Media Strategy & Content',
    tagline: 'A publishing system, not a posting schedule.',
    problem:
      'Social media for schools often ends up as an afterthought &mdash; inconsistent, reactive, and untethered from any clear purpose. Posts happen when someone remembers. The content is a mix of celebration and announcement with no real through-line. It doesn&rsquo;t build trust or understanding over time because it isn&rsquo;t designed to.',
    transformation:
      'Studio builds a social media system grounded in your communication strategy &mdash; with a clear purpose, a consistent voice, and a publishing rhythm that&rsquo;s actually sustainable. The goal isn&rsquo;t more content. It&rsquo;s content that builds a coherent picture of who you are and why it matters.',
    included: [
      'Platform strategy: where to publish, what for, and why',
      'Content system design: content types, categories, and editorial rhythm',
      'Voice and tone guide for social: distinct from your website, specific to each platform',
      'Content templates and frameworks your team can use independently',
      'Editorial calendar design',
      'Ongoing content support (optional): monthly content creation or review',
    ],
    engagement: 'Custom engagement. Can be scoped as a standalone system build or ongoing support.',
    cta: 'Start a Conversation',
    href: '/contact',
  },
]

export default function StudioServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-8">
            Studio &mdash; Offers
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] tracking-tight mb-8"
            style={serif}
          >
            Built around what you actually stand for.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed mb-5 max-w-2xl">
            Studio is a strategic communication partner.
            Every engagement starts with understanding what you actually stand for &mdash;
            and builds from there.
          </p>
          <p className="text-[#7A8FA3] text-sm leading-relaxed max-w-xl">
            This includes strategic engagement structures, website design and build, and social
            media systems &mdash; all grounded in the same discipline. Not sure where to begin?
            The Clarity Audit is the entry point.
          </p>
        </div>
      </section>

      {/* Offers */}
      {offers.map((offer, i) => (
        <section
          key={offer.id}
          id={offer.id}
          className={`py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6] ${
            i % 2 === 0 ? 'bg-[#FAF9F7]' : 'bg-white'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-4">
                  {offer.number}
                </p>
                <h2
                  className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-2"
                  style={serif}
                >
                  {offer.name}
                </h2>
                <p className="text-[#64748B] text-sm italic mb-10">{offer.tagline}</p>

                <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-3">
                  Where this often starts
                </p>
                <p
                  className="text-[#374151] text-base leading-relaxed mb-10"
                  dangerouslySetInnerHTML={{ __html: offer.problem }}
                />

                <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-3">
                  The transformation
                </p>
                <p
                  className="text-[#374151] text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: offer.transformation }}
                />
              </div>
              <div>
                <div className="bg-white border border-[#E2DDD6] p-8 mb-6">
                  <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-5">
                    What&rsquo;s included
                  </p>
                  <ul className="space-y-3.5">
                    {offer.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&mdash;</span>
                        <span
                          className="text-[#374151] text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-1">
                      Engagement
                    </p>
                    <p className="text-[#374151] text-sm leading-relaxed">
                      {offer.engagement}
                    </p>
                  </div>
                  <Link
                    href={offer.href}
                    className="bg-[#d6a758] text-white text-sm px-8 py-3 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {offer.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process callout */}
      <section className="bg-[#F2EDE6] py-20 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#8A6014] text-[10px] tracking-[0.22em] uppercase mb-6">
              The Discipline Behind the Work
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              We don&rsquo;t begin with graphics. We begin with understanding.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-8">
              Every offer is grounded in the same sequence: Meaning &rarr; Structure &rarr; Expression.
              We identify what you actually stand for before designing how it should be communicated.
              That order matters. Expression first produces work you eventually have to redo.
            </p>
            <Link
              href="/studio/approach"
              className="text-[#0e1a7a] text-sm font-medium hover:underline tracking-wide"
            >
              Read about the approach &rarr;
            </Link>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#64748B] text-[10px] tracking-[0.18em] uppercase mb-6">
              What changes after the work
            </p>
            <div className="space-y-4">
              {[
                'You have a clear, consistent way to describe what you do &mdash; one that actually fits.',
                'Families understand what you stand for before the first tour.',
                'Communication becomes a system, not a scramble.',
                'New staff can orient to the narrative and use it.',
                'Your public presence reflects the environment you&rsquo;ve actually built.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">&rarr;</span>
                  <p
                    className="text-[#374151] text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="max-w-xl">
            <p className="text-white text-2xl md:text-3xl leading-snug mb-4" style={serif}>
              Not sure which offer fits? That&rsquo;s what the first conversation is for.
            </p>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Most engagements begin with a Clarity Audit. We scope everything else from there.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link
              href="/contact"
              className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors text-center font-medium whitespace-nowrap"
            >
              Start a Conversation
            </Link>
            <Link
              href="/studio/approach"
              className="border border-white/30 text-white text-sm px-8 py-4 tracking-wide hover:border-white/60 transition-colors text-center whitespace-nowrap"
            >
              How We Work &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
