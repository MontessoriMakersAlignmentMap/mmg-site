interface EmptyStateProps {
  title: string
  message: string
  action?: React.ReactNode
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="r-empty">
      <div style={{
        width: '64px',
        height: '64px',
        background: 'var(--r-gold-light)',
        borderRadius: '50%',
        margin: '0 auto 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ width: '24px', height: '24px', background: 'var(--r-gold)', borderRadius: '6px', opacity: 0.6 }} />
      </div>
      <h3 style={{ fontSize: '1.125rem' }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', maxWidth: '400px', margin: '0 auto' }}>{message}</p>
      {action && <div style={{ marginTop: '1.5rem' }}>{action}</div>}
    </div>
  )
}
