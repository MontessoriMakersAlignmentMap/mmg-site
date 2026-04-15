import Link from 'next/link'

const serif = { fontFamily: 'var(--font-heading)' }

export const metadata = {
  title: 'Sub-processors — MMAP',
  description:
    'Current list of sub-processors used by Montessori Makers Alignment Map. Updated with 30 days notice.',
}

type Row = {
  name: string
  service: string
  data: string
  location: string
  protections: string
  url: string
}

const subprocessors: Row[] = [
  {
    name: 'Supabase (Supabase Inc.)',
    service:
      'Managed Postgres database, authentication, edge functions, file storage, realtime',
    data: 'All student, family, staff, and operational data',
    location: 'us-east-1 (Virginia, USA)',
    protections: 'Supabase DPA; SOC 2 Type II; HIPAA-eligible infrastructure',
    url: 'https://supabase.com/privacy',
  },
  {
    name: 'Vercel (Vercel Inc.)',
    service: 'Frontend hosting, CDN, edge network',
    data: 'HTTP request metadata (IP, user agent); no persistent student PII stored on Vercel',
    location: 'US regions',
    protections: 'Vercel DPA; SOC 2 Type II',
    url: 'https://vercel.com/legal/privacy-policy',
  },
  {
    name: 'Anthropic (Anthropic PBC)',
    service:
      'Claude API for optional AI features (summaries, translation, insights, drafting)',
    data: 'Minimum-necessary text sent for inference only when the school has enabled AI features',
    location: 'US regions',
    protections:
      'Anthropic API commercial terms; no training on customer data; 30-day retention for abuse monitoring only',
    url: 'https://www.anthropic.com/legal/privacy',
  },
  {
    name: 'Resend (Resend Inc.)',
    service: 'Transactional email delivery',
    data: 'Email addresses and content for account and school communications',
    location: 'US regions',
    protections: 'Resend DPA',
    url: 'https://resend.com/legal/privacy-policy',
  },
  {
    name: 'Stripe (Stripe Inc.)',
    service: 'Payment processing (tuition, billing)',
    data: 'Billing contact info and payment method. No student PII transmitted to Stripe.',
    location: 'US regions',
    protections: 'Stripe DPA; PCI-DSS Level 1',
    url: 'https://stripe.com/privacy',
  },
  {
    name: 'QuickBooks Online — Intuit Inc. (optional)',
    service:
      'Optional accounting integration: one-way push of invoices, payments, and household customer records',
    data: 'Household billing contact; invoice line items and amounts. No student records.',
    location: 'US regions',
    protections: 'Intuit Developer Terms',
    url: 'https://quickbooks.intuit.com',
  },
]

export default function MmapSubprocessorsPage() {
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
            Sub-processors
          </h1>
          <p className="text-[#94A3B8] text-sm">
            Last Updated: April 15, 2026 · Version 1.0
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto prose prose-sm md:prose-base prose-neutral">
          <p>
            A <strong>sub-processor</strong> is any third party we engage to help deliver
            the MMAP platform that may process student data in the course of its work.
            This page lists every current sub-processor, what they do, where they store
            data, and what contractual protections are in place.
          </p>
          <p>
            This list is incorporated by reference into every school's Data Processing
            Agreement. We provide schools with at least{' '}
            <strong>30 days' written notice</strong> before adding or replacing a
            sub-processor.
          </p>

          <h2>Current sub-processors</h2>
          {subprocessors.map((row, i) => (
            <div
              key={row.name}
              className="not-prose border border-[#E2E8F0] rounded-lg p-5 mb-4"
            >
              <h3 className="text-base font-semibold text-[#0e1a7a] mb-3">
                {i + 1}. {row.name}
              </h3>
              <dl className="text-sm text-[#334155] space-y-1.5">
                <div>
                  <dt className="inline font-semibold">Service: </dt>
                  <dd className="inline">{row.service}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Data processed: </dt>
                  <dd className="inline">{row.data}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Data location: </dt>
                  <dd className="inline">{row.location}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Protections: </dt>
                  <dd className="inline">{row.protections}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold">Privacy policy: </dt>
                  <dd className="inline">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0e1a7a] underline"
                    >
                      {row.url}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          ))}

          <h2>Sub-processors we do NOT use</h2>
          <p>
            For clarity, MMAP does <strong>not</strong> currently use any of the
            following, and will not add them without the required 30-day notice:
          </p>
          <ul>
            <li>Google Analytics, Google Tag Manager, Google Ads</li>
            <li>Facebook Pixel, Meta Ads, TikTok Pixel</li>
            <li>Any advertising or marketing tracking SDK</li>
            <li>Any data broker</li>
            <li>Any third-party chat/support widget that receives PII</li>
          </ul>

          <h2>Change process</h2>
          <p>When we plan to add or replace a sub-processor:</p>
          <ol>
            <li>We update this page and bump the version</li>
            <li>We publish the update at the canonical URL shared with schools</li>
            <li>
              We send written notice to every school's Designated Privacy Contact at
              least <strong>30 days</strong> before the new sub-processor begins
              processing data
            </li>
            <li>
              Schools may object in writing to the new sub-processor on reasonable
              data-protection grounds. See DPA § 7.3 for the objection and termination
              process.
            </li>
          </ol>

          <h2>Contact</h2>
          <p>
            Questions about sub-processors, or to receive update notifications by
            email: <strong>privacy@montessorimakersalignmentmap.com</strong>
          </p>

          <hr />
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
            <Link href="/mmap/security" className="underline">
              Security &amp; Compliance
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
