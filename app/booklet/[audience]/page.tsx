import { notFound } from 'next/navigation'
import { BookletViewer } from '@/components/booklet/BookletViewer'
import { RequestPanel } from '@/components/booklet/RequestPanel'
import { AUDIENCES, isAudience } from '@/lib/booklets/audiences'
import { verifyAccess } from '@/lib/booklets/token'

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params
  return { title: isAudience(audience) ? `Info Booklet ${AUDIENCES[audience].title}` : 'Info Booklet' }
}

/** /booklet/<audience>?t=<token> — the booklet itself, for anyone with a valid personal link. */
export default async function BookletPage({
  params,
  searchParams,
}: {
  params: Promise<{ audience: string }>
  searchParams: Promise<{ t?: string }>
}) {
  const { audience } = await params
  const { t } = await searchParams
  if (!isAudience(audience)) notFound()

  const access = verifyAccess(t)
  if (!access || access.a !== audience) {
    return (
      <RequestPanel
        initial={audience}
        notice={t ? 'This link has expired or is incomplete. Submit the form again and a new link will open here.' : undefined}
      />
    )
  }
  return <BookletViewer slug={audience} pdfHref={`/api/booklet/pdf?t=${encodeURIComponent(t as string)}`} />
}
