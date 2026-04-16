import type { Metadata } from 'next'
import InterimLeaderForm from './InterimLeaderForm'

export const metadata: Metadata = {
  title: 'Interim Leader Profile | Montessori Makers Group',
  robots: { index: false, follow: false },
}

export default function InterimLeaderProfilePage() {
  return <InterimLeaderForm />
}
