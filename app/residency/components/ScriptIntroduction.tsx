export default function ScriptIntroduction({
  script,
  levelName,
}: {
  script: string
  levelName?: string
}) {
  if (!script) return null

  const instructorLabel = levelName === 'Elementary'
    ? 'Elementary Instructor'
    : 'Primary Instructor'

  return (
    <div style={{
      background: '#f5e8cc',
      borderLeft: '4px solid #d6a758',
      borderRadius: '0 8px 8px 0',
      padding: '1.25rem 1.5rem',
      marginBottom: '2rem',
    }}>
      <p style={{
        fontSize: '0.6875rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--r-navy)',
        marginBottom: '0.625rem',
      }}>
        {instructorLabel}
      </p>
      <hr style={{
        border: 'none',
        borderTop: '1px solid #d6a758',
        opacity: 0.4,
        marginBottom: '0.75rem',
      }} />
      <p style={{
        fontSize: '0.9375rem',
        fontStyle: 'italic',
        lineHeight: 1.7,
        color: 'var(--r-text)',
        whiteSpace: 'pre-wrap',
        margin: 0,
      }}>
        {script}
      </p>
    </div>
  )
}
