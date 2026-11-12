import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { verifyAccess } from '@/lib/booklets/token'

/**
 * The pre-built PDF of a booklet, for anyone holding a valid link.
 * The files are built by scripts/build-booklet-pdfs.py into booklets/pdf/,
 * outside /public so they can't be fetched without a link.
 */
export async function GET(req: Request) {
  const access = verifyAccess(new URL(req.url).searchParams.get('t'))
  if (!access) return NextResponse.redirect(new URL('/booklet', req.url))
  const name = `west-ventures-info-booklet-${access.a}.pdf`
  try {
    const file = await readFile(path.join(process.cwd(), 'booklets', 'pdf', name))
    return new NextResponse(new Uint8Array(file), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${name}"`,
        'Cache-Control': 'private, max-age=3600',
        'X-Robots-Tag': 'noindex',
      },
    })
  } catch {
    return NextResponse.json({ error: 'The PDF is not available yet.' }, { status: 404 })
  }
}
