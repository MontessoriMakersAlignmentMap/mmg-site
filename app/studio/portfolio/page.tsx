import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function StudioPortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">
            Studio — Portfolio
          </p>
          <h1
            className="text-5xl md:text-6xl text-white leading-[1.05] mb-8"
            style={serif}
          >
            The work.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Every project begins with understanding. What you see here is what
            emerges when that process is honored.
          </p>
        </div>
      </section>

      {/* Case Study 1: The Peace Rebellion */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Case Study 01
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              The Peace Rebellion
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Full brand identity, website, messaging framework, and movement
              storytelling system for an education justice organization.
            </p>
          </div>
          {/* Screenshot */}
          <div className="relative w-full aspect-[16/7] overflow-hidden mb-10 group">
            <Image
              src="/portfolio/peace-rebellion.jpg"
              alt="The Peace Rebellion website"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#0e1a7a]/0 group-hover:bg-[#0e1a7a]/40 transition-colors duration-300 flex items-center justify-center">
              <Link
                href="https://www.thepeacerebellion.org"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0e1a7a] text-xs tracking-[0.15em] uppercase font-medium px-6 py-3 hover:bg-[#d6a758] hover:text-white"
              >
                View the live site →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What They Needed
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                The Peace Rebellion is an education justice organization doing
                serious, sustained work at the intersection of Montessori
                pedagogy and equity. They had a powerful mission and a growing
                community — but no visual or verbal identity that matched the
                weight and distinctiveness of what they were building.
              </p>
              <p className="text-[#374151] text-base leading-relaxed mt-4">
                They needed to show up in the world in a way that felt like
                them: movement-oriented, principled, grounded, and urgent
                without being reactive.
              </p>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What Studio Built
              </p>
              <ul className="space-y-3">
                {[
                  'Full brand identity — logo, mark, color system, typography',
                  'Brand guidelines and visual standards',
                  'Website architecture and narrative structure',
                  'Website design and copywriting',
                  'Messaging framework — the words and phrases that are theirs',
                  'Movement storytelling system — how they tell the story of the work in progress',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0e1a7a] p-8">
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
                The Result
              </p>
              <p
                className="text-white text-xl leading-snug mb-6"
                style={serif}
              >
                A visual and verbal identity that feels like the organization.
              </p>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Not a generic nonprofit aesthetic. Not borrowed education
                design patterns. An identity that carries the specific weight
                of what The Peace Rebellion is doing — and gives their
                community something to recognize and rally around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 2: PMAI */}
      <section className="bg-white py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Case Study 02
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Public Montessori in Action
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              Social storytelling strategy, voice system, and reusable template
              library for a public Montessori advocacy organization.
            </p>
          </div>
          {/* Screenshot */}
          <div className="relative w-full aspect-[16/7] overflow-hidden mb-10 group">
            <Image
              src="/portfolio/pmai-instagram.png"
              alt="Public Montessori in Action — Instagram"
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#0e1a7a]/0 group-hover:bg-[#0e1a7a]/40 transition-colors duration-300 flex items-center justify-center">
              <Link
                href="https://www.instagram.com/publicmontessoriinaction/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#0e1a7a] text-xs tracking-[0.15em] uppercase font-medium px-6 py-3 hover:bg-[#d6a758] hover:text-white"
              >
                View on Instagram →
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What They Needed
              </p>
              <p className="text-[#374151] text-base leading-relaxed">
                Public Montessori in Action (PMAI) advocates for Montessori
                education in public school systems — a specific, important, and
                often misunderstood mission. They had compelling stories from
                schools and communities doing this work, but no consistent
                system for sharing them.
              </p>
              <p className="text-[#374151] text-base leading-relaxed mt-4">
                Social media felt like a series of one-off decisions — what to
                post, how to say it, what it should look like. They needed a
                rhythm they could actually sustain.
              </p>
            </div>
            <div className="bg-[#FAF9F7] border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What Studio Built
              </p>
              <ul className="space-y-3">
                {[
                  'Ongoing content creation — writing, designing, and producing every post',
                  'Publishing across Instagram, Facebook, and LinkedIn',
                  'Visual template library — built and used by Studio, not handed off',
                  'Voice and messaging — language, tone, and framing that is distinctly PMAI',
                  'Social storytelling strategy — what stories to tell, in what order, toward what purpose',
                  'Editorial calendar and content planning',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0e1a7a] p-8">
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
                The Result
              </p>
              <p
                className="text-white text-xl leading-snug mb-6"
                style={serif}
              >
                A sustainable content rhythm that didn&apos;t require constant creative decisions.
              </p>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                The PMAI team stopped starting from scratch every time they
                needed to post. The voice system made it clear how to say
                things. The templates made it fast to make them look right.
                Consistency became a function of infrastructure, not heroic effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 3: Demo School */}
      <section className="bg-[#FAF9F7] py-24 md:py-28 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-4">
              Case Study 03
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Montessori Makers School
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed">
              A fully realized demo school website — five pages, live animations, and a complete
              content system — built to show exactly what Studio produces for a Montessori school.
            </p>
          </div>

          {/* Live preview link — full bleed */}
          <div className="relative w-full aspect-[16/7] overflow-hidden mb-10 group bg-[#3D2410]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/40 text-sm tracking-[0.18em] uppercase mb-2">Interactive Demo</p>
                <p className="text-white text-2xl mb-6" style={serif}>This is a live site — explore it.</p>
                <Link
                  href="/studio/demo"
                  className="inline-block bg-[#C8A24A] text-white text-xs tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-[#b8902e] transition-colors"
                >
                  Open the Demo School →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What It Demonstrates
              </p>
              <ul className="space-y-3">
                {[
                  'Fully responsive design — including mobile navigation',
                  'School-specific content system (programs, admissions, school life)',
                  'Scroll-triggered animations and parallax effects',
                  '"From the Classroom" blog/news architecture',
                  'Transparent admissions flow with tuition and FAQ',
                  'Five linked pages: home, about, programs, admissions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E2DDD6] p-8">
              <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-4">
                What's Included in a Real Build
              </p>
              <ul className="space-y-3">
                {[
                  'Your school's actual photography, voice, and brand',
                  'Domain, hosting, and deployment setup',
                  'Contact and inquiry forms with email delivery',
                  'Google Maps and calendar integration',
                  'Ongoing content support (optional)',
                  'Handoff to your team or fully managed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#8A6014] flex-shrink-0 mt-0.5">—</span>
                    <span className="text-[#374151] text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0e1a7a] p-8">
              <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">
                This Is What We Build
              </p>
              <p className="text-white text-xl leading-snug mb-6" style={serif}>
                A website your school actually deserves.
              </p>
              <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                Not a template. Not a CMS you'll forget to update. A site built
                around your school's specific voice, philosophy, and community —
                that works as hard as your admissions team.
              </p>
              <Link
                href="/studio/demo"
                className="inline-block border border-white/30 text-white text-xs tracking-[0.12em] uppercase px-6 py-3 hover:bg-white/10 transition-colors"
              >
                Explore the demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's next */}
      <section className="bg-[#F2EDE6] py-24 md:py-28 px-6 md:px-10 border-t border-[#D4CEC6]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">
              What We&apos;re Working On Next
            </p>
            <h2
              className="text-3xl md:text-4xl text-[#0e1a7a] leading-tight mb-6"
              style={serif}
            >
              Studio takes limited clients. We choose carefully.
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Every project we take gets our full attention. That means we work
              with a small number of organizations at any given time — and we
              choose the ones where we believe the process will produce something
              genuinely good.
            </p>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              The ideal next project: a Montessori school or education-adjacent
              organization doing serious work that isn&apos;t yet visible at the scale
              it deserves. A leader with a distinctive voice who hasn&apos;t found the
              system to make it consistent. An organization that knows something
              is off in their communication but can&apos;t quite name what.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              We&apos;re looking for the organizations where the work is already there
              — and our job is to help it land.
            </p>
          </div>
          <div className="bg-white border border-[#E2DDD6] p-8">
            <p className="text-[#64748B] text-xs tracking-[0.15em] uppercase mb-6">
              Signs we might be a fit
            </p>
            <div className="space-y-0">
              {[
                'You\'re doing Montessori work that the broader world doesn\'t yet understand',
                'Your mission is clear to you but not to the people encountering your school for the first time',
                'You\'re ready to invest in getting the communication right — not just adequate',
                'You want a collaborative process, not a vendor relationship',
                'You can articulate what\'s not working, even if you can\'t yet say why',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-4 border-b border-[#E2DDD6] last:border-0"
                >
                  <span className="text-[#8A6014] flex-shrink-0 mt-0.5">→</span>
                  <p className="text-[#374151] text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0e1a7a] py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p
            className="text-white text-2xl md:text-3xl max-w-xl leading-snug"
            style={serif}
          >
            If any of this sounds like your organization, let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="bg-[#d6a758] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#c09240] transition-colors whitespace-nowrap"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </>
  )
}
