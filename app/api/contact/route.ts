import { NextResponse } from 'next/server'
import { PERSONAS, type ContactPayload } from '@/lib/contact'

/**
 * Contact form endpoint.
 *
 * Sends each submission as an email through Resend when these environment
 * variables are set (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY   Resend API key
 *   CONTACT_TO       Address that receives submissions (e.g. partners@west.ventures)
 *   CONTACT_FROM     Verified sender, e.g. "West Ventures <forms@west.ventures>"
 *
 * Without them it answers 503, and the form falls back to opening the
 * visitor's email app with the message filled in.
 */

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(req: Request) {
  let body: Partial<ContactPayload>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Bots fill every field, including the hidden one.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const variant = ['general', 'partner', 'venture'].includes(body.variant as string) ? (body.variant as string) : 'general'
  const persona = PERSONAS.includes(body.persona as never) ? (body.persona as string) : ''
  const firstName = clean(body.firstName, 100)
  const lastName = clean(body.lastName, 100)
  const email = clean(body.email, 320)
  const phone = clean(body.phone, 50)
  const orgName = clean(body.orgName, 200)
  const orgWebsite = clean(body.orgWebsite, 300)
  const message = clean(body.message, 5000)
  const name = `${firstName} ${lastName}`.trim()

  if (!persona || !firstName || !lastName || !isEmail(email) || !message) {
    return NextResponse.json({ error: 'Fill in every required field.' }, { status: 422 })
  }
  if (variant !== 'general' && !orgName) {
    return NextResponse.json({ error: 'Fill in every required field.' }, { status: 422 })
  }

  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM
  if (!key || !to || !from) {
    return NextResponse.json({ error: 'Email delivery is not configured.' }, { status: 503 })
  }

  const subject =
    variant === 'venture'
      ? `West Ventures startup submission: ${orgName || name}`
      : `West Ventures inquiry: ${persona} — ${name}`
  const rows: [string, string][] = [
    ['Form', variant],
    ['Type', persona],
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Organization', orgName || '—'],
    ['Website', orgWebsite || '—'],
  ]
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#6e6a64">${k}</td><td>${esc(v)}</td></tr>`)
    .join('')}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(message)}</p>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject, html }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'The message could not be sent.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
