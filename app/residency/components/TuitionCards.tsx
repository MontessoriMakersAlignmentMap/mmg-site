import { TRACK_TUITION } from '@/lib/residency/tuition'

export default function TuitionCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '1.5rem',
    }}>
      {(['primary', 'elementary'] as const).map(key => {
        const t = TRACK_TUITION[key]
        return (
          <div key={key} className="r-card" style={{ padding: '2rem' }}>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--r-gold)', marginBottom: '0.5rem',
            }}>
              {t.credential}
            </p>
            <h3 style={{ fontFamily: 'var(--r-font-heading)', fontSize: '1.625rem', marginBottom: '0.25rem' }}>
              {t.name}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--r-text-muted)', marginBottom: '1.25rem' }}>
              {t.programLength} &middot; {t.lessons} lessons &middot; {t.strands} strands
            </p>

            <div style={{
              background: 'var(--r-cream)', padding: '1rem 1.25rem',
              borderRadius: '8px', marginBottom: '1rem',
            }}>
              <p style={{
                fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--r-text-muted)', marginBottom: '0.375rem',
              }}>
                Pay in Full
              </p>
              <p style={{ fontFamily: 'var(--r-font-heading)', fontSize: '2rem', color: 'var(--r-navy)', lineHeight: 1 }}>
                ${t.payInFull.toLocaleString()}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                Total program tuition
              </p>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{
                fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--r-text-muted)', marginBottom: '0.375rem',
              }}>
                Payment Plan
              </p>
              <p style={{ fontFamily: 'var(--r-font-heading)', fontSize: '1.5rem', color: 'var(--r-navy)', lineHeight: 1 }}>
                ${t.monthly} / mo
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginTop: '0.25rem' }}>
                Over {t.monthlyTermMonths} months, no interest
              </p>
            </div>

            <div style={{
              borderLeft: '3px solid var(--r-gold)', padding: '0.625rem 0.875rem',
              background: 'var(--r-gold-light)', borderRadius: '0 6px 6px 0',
            }}>
              <p style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
                <strong>Annual materials intensive:</strong> $200&ndash;$300 per resident, billed separately from tuition. A remote practice option is available at no additional cost for residents who cannot travel.
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
