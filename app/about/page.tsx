import Link from 'next/link'
import Image from 'next/image'

const serif = { fontFamily: 'var(--font-heading)' }

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#0e1a7a] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-8">About</p>
          <h1 className="text-5xl md:text-6xl text-white leading-[1.05] mb-8" style={serif}>
            Behind the work.
          </h1>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Montessori Makers Group was built from 20+ years of seeing what Montessori
            schools need—and what gets in the way.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-[#FAF9F7] py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-sm overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)] w-full md:max-w-md">
            <Image
              src="/images/hannah.jpg"
              alt="Hannah Richardson, Founder of Montessori Makers Group"
              width={560}
              height={700}
              className="w-full h-auto object-cover object-[center_20%]"
              priority
            />
          </div>
          <div>
            <p className="text-[#8A6014] text-xs tracking-[0.2em] uppercase mb-6">Hannah Richardson</p>
            <h2 className="text-4xl md:text-5xl text-[#0e1a7a] leading-tight mb-8" style={serif}>
              20+ years building what Montessori needs.
            </h2>
            <blockquote className="border-l-4 border-[#d6a758] pl-6 mb-8">
              <p className="text-[#374151] text-lg leading-relaxed italic">
                &ldquo;I built Montessori Makers because I saw leaders doing extraordinary
                work—without the structures to sustain it. We don&apos;t reform Montessori.
                We help it operate with coherence, equity, and courage.&rdquo;
              </p>
              <p className="text-[#64748B] text-sm mt-3">— Hannah Richardson</p>
            </blockquote>
            <p className="text-[#374151] text-base leading-relaxed mb-4">
              Hannah is a Montessori leader, strategist, and creator with experience across
              independent, public, charter, and justice-centered Montessori communities.
            </p>
            <p className="text-[#374151] text-base leading-relaxed">
              Her work blends Montessori philosophy with practical systems design—helping
              schools build clarity, strengthen adult culture, and sustain meaningful change
              without burning out the people doing it.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#0e1a7a] py-24 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Mission</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              Montessori isn&apos;t static. It&apos;s a living method.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-4">
              It grows with children, communities, and the world we&apos;re actually living in.
              We believe Montessori can evolve with integrity—grounded in research, justice,
              and deep respect for human development.
            </p>
            <p className="text-[#94A3B8] text-lg leading-relaxed">
              MMG exists to build the tools, systems, and stories that help schools lead
              that evolution—without losing what makes Montessori powerful.
            </p>
          </div>
          <div>
            <p className="text-[#d6a758] text-xs tracking-[0.2em] uppercase mb-6">Where We Stand</p>
            <h2 className="text-3xl md:text-4xl text-white leading-tight mb-6" style={serif}>
              We work with schools committed to dignity, justice, and belonging.
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-6">
              We are not neutral about harm—especially harm rooted in racism, censorship,
              authoritarianism, or exclusion. Clarity and courage with real systems behind
              it isn&apos;t optional. It&apos;s the work.
            </p>
            <p className="text-white font-semibold text-lg">
              If that&apos;s where you are, you&apos;re in the right place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF9F7] py-20 px-6 md:px-10 border-t border-[#E2DDD6]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[#0e1a7a] text-2xl max-w-lg" style={serif}>
            Ready to work together?
          </p>
          <div className="flex gap-4">
            <a
  href="https://montessorimakersgroup.hbportal.co/public/69c7132cd85a7a0030d956f1"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-[#0e1a7a] text-white text-sm px-10 py-4 tracking-wide hover:bg-[#162270] transition-colors"
>
  Book a Consultation
</a>
            <Link href="/advisory" className="border border-[#0e1a7a] text-[#0e1a7a] text-sm px-10 py-4 tracking-wide hover:bg-[#0e1a7a] hover:text-white transition-colors">
              Explore Advisory
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
