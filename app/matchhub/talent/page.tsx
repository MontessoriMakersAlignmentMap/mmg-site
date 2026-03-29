import { getApprovedGuideProfiles } from '@/lib/db/profiles'
import TalentClient from './TalentClient'

export default async function MatchHubTalentPage() {
  const guides = await getApprovedGuideProfiles()
  return <TalentClient guides={guides} />
}
