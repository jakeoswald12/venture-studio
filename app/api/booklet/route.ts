import { NextResponse } from 'next/server'
import { AUDIENCES, isAudience } from '@/lib/booklets/audiences'
import { notifyStudio, sendBookletEmail, sendBookletText, toE164, upsertHubSpot, type Request as BookletRequest } from '@/lib/booklets/deliver'
import { signAccess } from '@/lib/booklets/token'

/**
 * Partner interest form → info booklet.
 *
 * Signs a personal link to the booklet, emails and texts it to the person,
 * tells the studio, and returns the link so the page can open the booklet
 * straight away. See lib/booklets/deliver.ts for the environment variables.
 */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Bots fill every field, including the hidden one.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true, url: '/booklet' })

  if (!isAudience(body.audience)) return NextResponse.json({ error: 'Choose who the booklet is for.' }, { status: 422 })
  const audience = AUDIENCES[body.audience]
  const firstName = clean(body.firstName, 100)
  const lastName = clean(body.lastName, 100)
  const email = clean(body.email, 320)
  const phone = clean(body.phone, 40)
  const smsConsent = body.smsConsent === true || body.smsConsent === 'on'
  if (!firstName || !lastName || !isEmail(email)) {
    return NextResponse.json({ error: 'Fill in your name and email.' }, { status: 422 })
  }
  const phoneE164 = phone ? toE164(phone) : ''
  if (smsConsent && !phoneE164) {
    return NextResponse.json({ error: 'Enter a mobile number with its area code, or untick the text option.' }, { status: 422 })
  }

  const token = signAccess(audience.slug, firstName)
  if (!token) return NextResponse.json({ error: 'The booklet is not available right now.' }, { status: 503 })

  const origin = process.env.SITE_URL?.replace(/\/$/, '') || new URL(req.url).origin
  const path = `/booklet/${audience.slug}?t=${token}`
  const r: BookletRequest = {
    audience,
    firstName,
    lastName,
    email,
    phone,
    phoneE164,
    smsConsent,
    org: clean(body.org, 200),
    role: clean(body.role, 200),
    message: clean(body.message, 4000),
    viewUrl: `${origin}${path}`,
    pdfUrl: `${origin}/api/booklet/pdf?t=${token}`,
  }

  const [emailOut, textOut, crm] = await Promise.all([sendBookletEmail(r), sendBookletText(r), upsertHubSpot(r)])
  const studio = await notifyStudio(r, { email: emailOut, text: textOut })

  return NextResponse.json({ ok: true, url: path, delivery: { email: emailOut, text: textOut, studio, crm } })
}
