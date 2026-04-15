import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export const metadata = {
  title: 'Security & Compliance — MMAP',
  description:
    'MMAP security posture, FERPA / COPPA / state student privacy law compliance, and technical safeguards.',
}

type Card = { title: string; body: string }

const safeguards: Card[] = [
  {
    title: 'US data residency',
    body: 'Database and application hosted in US regions. Supabase us-east-1 (Virginia) and Vercel US edge network.',
  },
  {
    title: 'Tenant isolation',
    body: 'Row-level security enforced at the Postgres layer. Cross-school access is blocked at the database, not just the application.',
  },
  {
    title: 'Encryption',
    body: 'TLS 1.2+ in transit (HSTS enforced). AES-256 at rest for both database and file storage.',
  },
  {
    title: 'Authentication & MFA',
    body: 'JWT-based auth on every data endpoint. Multi-factor authentication required for admin roles.',
  },
  {
    title: 'Role-based access',
    body: 'Nine distinct roles with scoped permissions: platform_admin, admin, faculty, guide, specialist, coach, board, board_view, parent.',
  },
  {
    title: 'Idle session timeouts',
    body: 'Role-aware timeouts from 30 to 120 minutes. Dismissible warning before automatic logout.',
  },
  {
    title: 'Audit logging',
    body: 'Write actions on student records are logged. FERPA § 99.32 disclosure log records every third-party disclosure.',
  },
  {
    title: 'Backups & recovery',
    body: 'Daily automated backups with 7+ day retention. RTO 4 hours, RPO 24 hours. Quarterly restore testing.',
  },
  {
    title: 'Secrets hygiene',
    body: 'API keys and service tokens stored in Supabase secret store and Vercel environment variables. No secrets in git.',
  },
  {
    title: 'PII-safe logging',
    body: 'Edge function logs sanitized to exclude student PII. Query strings stripped from logged URLs.',
  },
  {
    title: 'Privacy flags per student',
    body: 'Directory-information opt-out (FERPA § 99.37), photo-release consent, media consent, and AI-processing opt-out tracked per student.',
  },
  {
    title: 'Parent amendment workflow',
    body: 'FERPA § 99.20 amendment requests tracked with full status history through hearing completion.',
  },
]

const compliance = [
  'FERPA (20 U.S.C. § 1232g) — MMAP operates as a "school official" under 34 C.F.R. § 99.31(a)(1)(i)(B)',
  'COPPA (15 U.S.C. § 6501 et seq.) — school acts as parent\'s agent for consent under § M.1',
  'New York Education Law § 2-d and 8 NYCRR Part 121 (Parents\' Bill of Rights supplement included in DPA)',
  'California SOPIPA (Ed Code § 22584) and AB 1584 (§ 49073.1)',
  'Colorado HB 16-1423',
  'Connecticut student data privacy law',
  'E-SIGN Act / UETA for in-platform signed documents',
]

export default function MmapSecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0e1a7a] pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#d6a758] text-[11px] tracking-[0.22em] uppercase mb-6">
            MMAP Compliance
          </p>
          <h1
            className="text-4xl md:text-5xl text-white leading-[1.05] tracking-tight mb-6"
            style={serif}
          >
            Security &amp; Compliance
          </h1>
          <p className="text-[#94A3B8] text-sm max-w-2xl">
            MMAP is built from the ground up for schools. FERPA-aligned by design,
            with the technical safeguards and legal paperwork to back it up.
          </p>
        </div>
      </section>

      {/* Compliance frameworks */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-6" style={serif}>
            Compliance frameworks
          </h2>
          <p className="text-[#334155] mb-6">
            MMAP is designed to comply with US federal and state student data privacy
            laws. Every school that licenses MMAP signs a Data Processing Agreement
            (DPA) that names us as a FERPA "school official" and obligates us to the
            commitments below.
          </p>
          <ul className="space-y-3 text-[#334155] text-sm md:text-base">
            {compliance.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="text-[#d6a758] mt-1">✓</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical safeguards */}
      <section className="bg-[#F8FAFC] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-2xl md:text-3xl text-[#0e1a7a] mb-10"
            style={serif}
          >
            Technical safeguards
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {safeguards.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-[#E2E8F0] rounded-lg p-5"
              >
                <h3 className="text-base font-semibold text-[#0e1a7a] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our commitments */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-6" style={serif}>
            Our commitments to schools
          </h2>
          <ul className="space-y-3 text-[#334155] text-sm md:text-base">
            <li>
              <strong>No selling or renting</strong> of student, family, or staff data
              — ever.
            </li>
            <li>
              <strong>No advertising or marketing</strong> use of student data.
            </li>
            <li>
              <strong>No training external ML models</strong> on school data. Anthropic
              Claude API is contractually prohibited from training on customer data.
            </li>
            <li>
              <strong>No student profiling</strong> beyond authorized educational use.
            </li>
            <li>
              <strong>72-hour breach notification</strong> from confirmation of a
              security incident.
            </li>
            <li>
              <strong>30-day data return or deletion</strong> on termination, with a
              certificate of destruction on request.
            </li>
            <li>
              <strong>30 days' notice</strong> before adding or replacing any
              sub-processor.
            </li>
          </ul>
        </div>
      </section>

      {/* Known limitations */}
      <section className="bg-[#F8FAFC] py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-6" style={serif}>
            Honest about what's still in progress
          </h2>
          <p className="text-[#334155] mb-6">
            Transparency matters. Here's where MMAP is still maturing, with target
            remediation timelines:
          </p>
          <ul className="space-y-3 text-[#334155] text-sm md:text-base">
            <li>
              <strong>Read-access audit log</strong> — currently only write actions are
              logged. Target: Q3 2026.
            </li>
            <li>
              <strong>Self-service parent inspect/amend UI</strong> in the family
              portal. Target: Q3 2026.
            </li>
            <li>
              <strong>Third-party penetration test.</strong> Target: before the 10th
              school.
            </li>
            <li>
              <strong>SOC 2 Type II for MMAP itself.</strong> (Our hosting infrastructure
              — Supabase and Vercel — are already SOC 2 Type II.) Target: Year 2+.
            </li>
            <li>
              <strong>Cross-region database failover.</strong> Target: on Supabase Team
              plan upgrade.
            </li>
          </ul>
        </div>
      </section>

      {/* Docs for review */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#0e1a7a] mb-6" style={serif}>
            Documents for school review
          </h2>
          <p className="text-[#334155] mb-6">
            Everything your privacy officer, IT director, or district counsel needs to
            complete vendor review. Request any of the following from{' '}
            <strong>privacy@montessorimakersalignmentmap.com</strong>:
          </p>
          <ul className="space-y-2 text-[#334155] text-sm md:text-base">
            <li>· Data Processing Agreement (DPA) template with NY Parents' Bill of Rights supplement</li>
            <li>· Data Security Plan (NIST CSF 2.0 aligned)</li>
            <li>· Incident Response Plan with 72-hour notification playbook</li>
            <li>· Parent Rights workflow (FERPA inspect / amend / consent / complain)</li>
            <li>· Pre-answered K-12 vendor security questionnaire (CoSN TLE / SDPC format)</li>
          </ul>

          <hr className="my-10 border-[#E2E8F0]" />
          <p className="text-sm text-[#64748B]">
            See also:{' '}
            <Link href="/mmap/privacy" className="underline">
              Privacy Policy
            </Link>{' '}
            ·{' '}
            <Link href="/mmap/terms" className="underline">
              Terms of Service
            </Link>{' '}
            ·{' '}
            <Link href="/mmap/sub-processors" className="underline">
              Sub-processors
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
