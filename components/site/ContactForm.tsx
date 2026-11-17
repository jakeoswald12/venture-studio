'use client'

import { useState } from 'react'
import { PERSONAS, PERSONA_LABELS, type FormVariant, type Persona } from '@/lib/contact'
import { CONTACT_EMAIL } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIXED_PERSONA: Partial<Record<FormVariant, Persona>> = { partner: 'Partner', venture: 'Founder' }

/**
 * One form, three uses:
 *   general  (homepage)  — includes the "I am a…" dropdown
 *   partner  (/partners) — persona fixed to Partner, no dropdown
 *   venture  (/ventures) — startup or idea submissions; persona fixed to Founder
 *
 * Fields are underlines, not boxes. The submit button changes its label in
 * place: "Submit" slides out, "Submitting" slides in, then "Submitted".
 *
 * Posts to /api/contact. If email delivery isn't configured there, it opens
 * the visitor's email app with the submission filled in instead.
 */
export function ContactForm({ variant = 'general' }: { variant?: FormVariant }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const fixedPersona = FIXED_PERSONA[variant]
  const isVenture = variant === 'venture'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    const payload: Record<string, string> = { ...data, variant, persona: fixedPersona ?? data.persona }
    setStatus('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
        return
      }
      if (res.status === 503) {
        // Delivery not configured: hand the submission to the visitor's email app.
        const name = `${payload.firstName} ${payload.lastName}`.trim()
        const subject = isVenture
          ? `West Ventures startup submission: ${payload.orgName || name}`
          : `West Ventures inquiry: ${payload.persona} — ${name}`
        const lines = [
          `Type: ${payload.persona}`,
          `Name: ${name}`,
          `Email: ${payload.email}`,
          payload.phone && `Phone: ${payload.phone}`,
          payload.orgName && `Organization: ${payload.orgName}`,
          payload.orgWebsite && `Website: ${payload.orgWebsite}`,
          '',
          payload.message,
        ].filter((l): l is string => typeof l === 'string')
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
        setStatus('idle')
        return
      }
      const json = await res.json().catch(() => ({}))
      setError(json.error ?? 'The submission could not be sent.')
      setStatus('error')
    } catch {
      setError('The submission could not be sent.')
      setStatus('error')
    }
  }

  const id = (n: string) => `${variant}-${n}`
  const label = status === 'sending' ? 'Submitting' : status === 'sent' ? 'Submitted' : 'Submit'

  return (
    <form onSubmit={onSubmit} className="form" onInput={() => status === 'sent' && setStatus('idle')}>
      <div className="form-2">
        <div className="field">
          <label htmlFor={id('first')}>First name</label>
          <input id={id('first')} name="firstName" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor={id('last')}>Last name</label>
          <input id={id('last')} name="lastName" required autoComplete="family-name" />
        </div>
        <div className="field">
          <label htmlFor={id('email')}>Email</label>
          <input id={id('email')} name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor={id('phone')}>Phone</label>
          <input id={id('phone')} name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      {variant === 'general' && (
        <div className="field">
          <label htmlFor="general-persona">I am a…</label>
          <select id="general-persona" name="persona" required defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {PERSONAS.map((p) => (
              <option key={p} value={p}>
                {PERSONA_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-2">
        <div className="field">
          <label htmlFor={id('org')}>Organization name</label>
          <input id={id('org')} name="orgName" required={variant !== 'general'} autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor={id('site')}>Organization website</label>
          <input id={id('site')} name="orgWebsite" type="text" inputMode="url" placeholder="https://" autoComplete="url" />
        </div>
      </div>

      <div className="field">
        <label htmlFor={id('message')}>Message</label>
        <textarea id={id('message')} name="message" required rows={4} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: -9999, width: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor={id('website-hp')}>Website</label>
        <input id={id('website-hp')} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={status === 'sending'} className="pill lg submit" aria-live="polite">
        <span key={label} className="submit-label">
          {label}
        </span>
      </button>
      {status === 'sent' && (
        <p className="t-body" role="status" style={{ margin: 0 }}>
          The studio will reply by email.
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}
    </form>
  )
}
