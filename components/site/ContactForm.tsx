'use client'

import { useState } from 'react'
import { PERSONAS, PERSONA_LABELS, type FormVariant, type Persona } from '@/lib/contact'
import { CONTACT_EMAIL } from './nav'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIXED_PERSONA: Partial<Record<FormVariant, Persona>> = { partner: 'Partner', venture: 'Founder' }

/**
 * One form, three uses:
 *   general  (homepage)  — includes the "I am a…" dropdown
 *   partner  (/partners) — persona fixed to Partner, no dropdown
 *   venture  (/ventures) — startup or idea submissions; persona fixed to Founder
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

  if (status === 'sent') {
    return (
      <div className="rounded-[22px] bg-panel p-8 sm:p-10" role="status">
        <p className="font-serif text-[1.8rem] font-semibold leading-tight text-ink">Submitted</p>
        <p className="mt-3 max-w-[44ch] text-[1rem] leading-[1.6]">The studio will reply by email.</p>
        <button type="button" onClick={() => setStatus('idle')} className="link-line mt-6 text-[0.92rem] text-ink">
          Submit another
        </button>
      </div>
    )
  }

  const field =
    'w-full rounded-[14px] border border-line bg-paper px-4 py-3.5 text-[1rem] font-normal text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-ink/40 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--bronze)_18%,transparent)]'
  const label = 'mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint'
  const select = `${field} appearance-none bg-no-repeat pr-11 invalid:text-faint`
  const selectStyle: React.CSSProperties = {
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%23a39d93' stroke-width='1.5'><path d='M1 1.5 6 6.5 11 1.5'/></svg>\")",
    backgroundSize: '12px 8px',
    backgroundPosition: 'right 1.1rem center',
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${variant}-first`} className={label}>First name</label>
          <input id={`${variant}-first`} name="firstName" required autoComplete="given-name" className={field} />
        </div>
        <div>
          <label htmlFor={`${variant}-last`} className={label}>Last name</label>
          <input id={`${variant}-last`} name="lastName" required autoComplete="family-name" className={field} />
        </div>
        <div>
          <label htmlFor={`${variant}-email`} className={label}>Email</label>
          <input id={`${variant}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor={`${variant}-phone`} className={label}>Phone</label>
          <input id={`${variant}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>

      {variant === 'general' && (
        <div>
          <label htmlFor="general-persona" className="sr-only">I am a…</label>
          <select id="general-persona" name="persona" required defaultValue="" className={select} style={selectStyle}>
            <option value="" disabled>
              I am a…
            </option>
            {PERSONAS.map((p) => (
              <option key={p} value={p}>
                {PERSONA_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${variant}-org`} className={label}>
            Organization name
          </label>
          <input
            id={`${variant}-org`}
            name="orgName"
            required={variant !== 'general'}
            autoComplete="organization"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${variant}-site`} className={label}>
            Organization website
          </label>
          <input id={`${variant}-site`} name="orgWebsite" type="text" inputMode="url" placeholder="https://" autoComplete="url" className={field} />
        </div>
      </div>


      <div>
        <label htmlFor={`${variant}-message`} className={label}>
          Message
        </label>
        <textarea id={`${variant}-message`} name="message" required rows={5} className={`${field} resize-y`} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${variant}-website-hp`}>Website</label>
        <input id={`${variant}-website-hp`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-[opacity,transform] duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === 'sending' ? 'Submitting…' : 'Submit'}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-[0.9rem] text-bronze">
          {error}
        </p>
      )}
    </form>
  )
}
