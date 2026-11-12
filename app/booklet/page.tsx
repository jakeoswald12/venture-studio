import { RequestPanel } from '@/components/booklet/RequestPanel'
import { isAudience } from '@/lib/booklets/audiences'

/** /booklet — the partner interest form. Link with ?for=parents (or students, founders, high-schools, universities) to preselect. */
export default async function BookletRequestPage({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: f } = await searchParams
  return <RequestPanel initial={isAudience(f) ? f : undefined} />
}
