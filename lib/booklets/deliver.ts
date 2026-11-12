/**
 * Delivery for the booklet form: the email and text to the person who asked,
 * a notice to the studio, and (optionally) a HubSpot contact.
 *
 * Each channel runs only when its environment variables are set
 * (Vercel → Project → Settings → Environment Variables):
 *
 *   Email (Resend)     RESEND_API_KEY, BOOKLET_FROM (or CONTACT_FROM)
 *                      e.g. BOOKLET_FROM="West Ventures <partners@west.ventures>"
 *   Studio notice      CONTACT_TO, the address that receives each request
 *   Text (Twilio)      TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and either
 *                      TWILIO_FROM (a number) or TWILIO_MESSAGING_SERVICE_SID
 *   HubSpot            HUBSPOT_TOKEN, a private app token with
 *                      crm.objects.contacts.write
 *
 * A channel that is not configured is skipped and reported as 'off'; a
 * channel that fails is reported as 'failed'. Neither blocks the person from
 * opening the booklet.
 */

import type { Audience } from './audiences'

export type Outcome = 'sent' | 'off' | 'failed'

export interface Request {
  audience: Audience
  firstName: string
  lastName: string
  email: string
  phone: string
  /** E.164, or '' if the number could not be read. */
  phoneE164: string
  smsConsent: boolean
  org: string
  role: string
  message: string
  viewUrl: string
  pdfUrl: string
}

const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** US numbers without a country code get +1. Anything else must already start with +. */
export function toE164(raw: string): string {
  const t = raw.trim()
  const digits = t.replace(/\D/g, '')
  if (t.startsWith('+') && digits.length >= 8 && digits.length <= 15) return `+${digits}`
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return ''
}

/* ─── Email ─────────────────────────────────────────────────────────────── */

export function bookletEmail(r: Request) {
  const subject = `Your West Ventures info booklet`
  const text = [
    `${r.firstName},`,
    '',
    `Thank you for your interest in West Ventures. Your info booklet ${r.audience.title.toLowerCase()} is ready.`,
    '',
    `Open the booklet: ${r.viewUrl}`,
    `Download the PDF: ${r.pdfUrl}`,
    '',
    'We have your interest form and will be in touch soon. If you have a question in the meantime, reply to this email.',
    '',
    'West Ventures',
    'gowest.ventures',
  ].join('\n')

  const html = `<!doctype html><html><body style="margin:0;background:#f6f3ec;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f3ec;">
<tr><td align="center" style="padding:48px 20px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
<tr><td style="font-family:Georgia,'Times New Roman',serif;font-style:italic;font-weight:bold;text-transform:uppercase;letter-spacing:.05em;font-size:22px;color:#151412;">West</td></tr>
<tr><td style="padding-top:40px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8c6a2f;">Info Booklet · ${esc(r.audience.label)}</td></tr>
<tr><td style="padding-top:12px;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.1;color:#151412;">Your booklet is ready, ${esc(r.firstName)}.</td></tr>
<tr><td style="padding-top:18px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#3b3833;">Thank you for your interest in West Ventures. The booklet ${esc(r.audience.title.toLowerCase())} explains how the studio works, what is expected of everyone involved, and what comes of it. You can read it in your browser or download it as a PDF.</td></tr>
<tr><td style="padding-top:28px;">
  <a href="${esc(r.viewUrl)}" style="display:inline-block;background:#151412;color:#f6f3ec;font-family:Helvetica,Arial,sans-serif;font-size:15px;text-decoration:none;padding:14px 26px;border-radius:999px;">Open the booklet</a>
  <a href="${esc(r.pdfUrl)}" style="display:inline-block;margin-left:10px;color:#151412;font-family:Helvetica,Arial,sans-serif;font-size:15px;text-decoration:underline;padding:14px 4px;">Download the PDF</a>
</td></tr>
<tr><td style="padding-top:28px;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#3b3833;">We have your interest form and will be in touch soon. If you have a question in the meantime, reply to this email.</td></tr>
<tr><td style="padding-top:40px;border-bottom:1px solid #ddd6c9;"></td></tr>
<tr><td style="padding-top:16px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#a8a196;">West Ventures · Affiliated with Austin Christian University · gowest.ventures</td></tr>
<tr><td style="padding-top:8px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#a8a196;">This link is personal to you and stays open for six months.</td></tr>
</table></td></tr></table></body></html>`
  return { subject, text, html }
}

async function resend(body: Record<string, unknown>): Promise<Outcome> {
  const key = process.env.RESEND_API_KEY
  if (!key) return 'off'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

export async function sendBookletEmail(r: Request): Promise<Outcome> {
  const from = process.env.BOOKLET_FROM || process.env.CONTACT_FROM
  if (!from) return 'off'
  const { subject, text, html } = bookletEmail(r)
  const replyTo = process.env.CONTACT_TO
  return resend({ from, to: [r.email], subject, text, html, ...(replyTo ? { reply_to: replyTo } : {}) })
}

export async function notifyStudio(r: Request, outcomes: { email: Outcome; text: Outcome }): Promise<Outcome> {
  const from = process.env.BOOKLET_FROM || process.env.CONTACT_FROM
  const to = process.env.CONTACT_TO
  if (!from || !to) return 'off'
  const name = `${r.firstName} ${r.lastName}`.trim()
  const rows: [string, string][] = [
    ['Booklet', r.audience.label],
    ['Name', name],
    ['Email', r.email],
    ['Phone', r.phone || '—'],
    ['Text consent', r.smsConsent ? 'Yes' : 'No'],
    [r.audience.orgLabel ?? 'Organization', r.org || '—'],
    ['Role', r.role || '—'],
    ['Booklet email', outcomes.email],
    ['Booklet text', outcomes.text],
  ]
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#6e6a64">${esc(k)}</td><td>${esc(v)}</td></tr>`)
    .join('')}</table>${r.message ? `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(r.message)}</p>` : ''}`
  return resend({ from, to: [to], reply_to: r.email, subject: `Partner interest (${r.audience.label}): ${name}`, html })
}

/* ─── Text ──────────────────────────────────────────────────────────────── */

export async function sendBookletText(r: Request): Promise<Outcome> {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM
  const service = process.env.TWILIO_MESSAGING_SERVICE_SID
  if (!sid || !token || (!from && !service)) return 'off'
  if (!r.smsConsent || !r.phoneE164) return 'off'
  const body = `West Ventures: ${r.firstName}, your info booklet is ready. Read it or download the PDF here: ${r.viewUrl} Reply STOP to opt out.`
  const form = new URLSearchParams({ To: r.phoneE164, Body: body })
  if (service) form.set('MessagingServiceSid', service)
  else form.set('From', from as string)
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}

/* ─── HubSpot ───────────────────────────────────────────────────────────── */

export async function upsertHubSpot(r: Request): Promise<Outcome> {
  const token = process.env.HUBSPOT_TOKEN
  if (!token) return 'off'
  const properties: Record<string, string> = {
    email: r.email,
    firstname: r.firstName,
    lastname: r.lastName,
    ...(r.phone ? { phone: r.phone } : {}),
    ...(r.org ? { company: r.org } : {}),
    ...(r.role ? { jobtitle: r.role } : {}),
  }
  try {
    // Create-or-update by email in one call.
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: [{ idProperty: 'email', id: r.email, properties }] }),
    })
    return res.ok ? 'sent' : 'failed'
  } catch {
    return 'failed'
  }
}
