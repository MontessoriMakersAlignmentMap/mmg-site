import Link from 'next/link'

export default function MmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

      {/* MMAP compliance strip — appears on every /mmap/* page, above the site footer */}
      <section className="bg-[#0B1430] px-6 md:px-10 py-8 border-t border-[#1a2550]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[#94A3B8] text-[10px] tracking-[0.22em] uppercase">
            MMAP · Built for schools
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/mmap/privacy"
              className="text-[#CBD5E1] text-xs hover:text-[#d6a758] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/mmap/terms"
              className="text-[#CBD5E1] text-xs hover:text-[#d6a758] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/mmap/security"
              className="text-[#CBD5E1] text-xs hover:text-[#d6a758] transition-colors"
            >
              Security &amp; FERPA
            </Link>
            <Link
              href="/mmap/sub-processors"
              className="text-[#CBD5E1] text-xs hover:text-[#d6a758] transition-colors"
            >
              Sub-processors
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
