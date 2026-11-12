import { notFound } from 'next/navigation'
import { BookletPage, bookletPages } from '@/components/booklet/pages'
import { AUDIENCES, isAudience } from '@/lib/booklets/audiences'
import { verifyAccess } from '@/lib/booklets/token'

/**
 * Every page of a booklet at print size (8.5 × 11 in), one after another.
 * scripts/build-booklet-pdfs.py prints this page to make the PDFs.
 */
export default async function BookletPrintPage({
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
  if (!access || access.a !== audience) notFound()

  return (
    <div className="bk bk-print fixed inset-0 z-[300] overflow-auto" data-lenis-prevent>
      {bookletPages(AUDIENCES[audience], 'print').map((ctx) => (
        <BookletPage key={ctx.number} ctx={ctx} />
      ))}
    </div>
  )
}
