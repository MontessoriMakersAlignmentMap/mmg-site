interface ProgressBarProps {
  completed: number
  total: number
  label?: string
}

export default function ProgressBar({ completed, total, label }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.375rem',
          fontSize: '0.8125rem',
        }}>
          <span style={{ fontWeight: 500 }}>{label}</span>
          <span style={{ color: 'var(--r-text-muted)' }}>{completed}/{total}</span>
        </div>
      )}
      <div className="r-progress-track">
        <div className="r-progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
