interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md'
}

const statusLabels: Record<string, string> = {
  assigned: 'Assigned',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  reviewed: 'Reviewed',
  completed: 'Completed',
  complete: 'Complete',
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
  enrolled: 'Enrolled',
  active: 'Active',
  on_leave: 'On Leave',
  withdrawn: 'Withdrawn',
  approved: 'Approved',
  revision_requested: 'Revision Requested',
  ai_review: 'AI Review',
  ai_passed: 'AI Passed',
  mentor_review: 'Cohort Guide Review',
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const label = statusLabels[status] ?? status
  const className = `r-badge r-badge-status-${status}`
  const fontSize = size === 'sm' ? '0.6875rem' : '0.75rem'

  return (
    <span className={className} style={{ fontSize }}>
      {label}
    </span>
  )
}
