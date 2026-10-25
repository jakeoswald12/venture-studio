'use client'

import { useState } from 'react'
import { PERSONAS, type Persona } from '@/lib/contact'
import { CONTACT_EMAIL } from './nav'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/**
 * Contact form for prospective partners, advisors, Student Fellows and
 * founders. Pass `persona` to fix the type and hide the selector (the
 * partners page uses 'Partner').
 *
 * Posts to /api/contact. If email delivery isn't configured there, it opens
 * the visitor's email app with the message filled in instead.
 */
export function ContactForm({ persona: fixedPersona }: { persona?: Persona }) {
  const [persona, setPersona] = useState<Persona | ''>(fixedPersona ?? '')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    const payload: Record<string, string> = { ...data, persona: fixedPersona ?? persona }
    delete payload['persona-choice']
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
        if (!fixedPersona) setPersona('')
        return
      }
      if (res.status === 503) {
        // Delivery not configured: hand the message to the visitor's email app.
        const subject = `West Ventures inquiry: ${payload.persona} — ${payload.name}`
        const body = [
          `Type: ${payload.persona}`,
          `Name: ${payload.name}`,
          `Email: ${payload.email}`,
          payload.organization ? `Organization: ${payload.organization}` : '',
          '',
          payload.message,
        ]
          .filter((l, i) => l !== '' || i === 4)
          .join('\n')
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setStatus('idle')
        return
      }
      const json = await res.json().catch(() => ({}))
      setError(json.error ?? 'The message could not be sent.')
      setStatus('error')
    } catch {
      setError('The message could not be sent.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[22px] bg-panel p-8 sm:p-10" role="status">
        <p className="font-serif text-[1.8rem] font-semibold leading-tight text-ink">Message sent</p>
        <p className="mt-3 max-w-[44ch] text-[1rem] leading-[1.6]">
          The studio will reply by email. Questions in the meantime: {CONTACT_EMAIL}.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-line mt-6 text-[0.92rem] text-ink"
        >
          Send another message
        </button>
      </div>
    )
  }

  const field =
    'w-full rounded-[14px] border border-line bg-paper px-4 py-3.5 text-[1rem] font-normal text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-ink/40 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--bronze)_18%,transparent)]'
  const label = 'mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint'

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      {!fixedPersona && (
        <fieldset>
          <legend className={label}>I am a</legend>
          <div className="flex flex-wrap gap-2">
            {PERSONAS.map((p) => (
              <label key={p} className="cursor-pointer">
                <input
                  type="radio"
                  name="persona-choice"
                  value={p}
                  required
                  checked={persona === p}
                  onChange={() => setPersona(p)}
                  className="peer sr-only"
                />
                <span className="inline-flex rounded-full border border-line px-4 py-2.5 text-[0.92rem] text-grey transition-colors duration-300 hover:border-faint peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze">
                  {p === 'Partner' ? 'Prospective partner' : p === 'Advisor' ? 'Prospective advisor' : p === 'Student Fellow' ? 'Prospective Student Fellow' : 'Founder'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name</label>
          <input id="cf-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-org" className={label}>
          {fixedPersona === 'Partner' ? 'Organization' : 'Organization or school (optional)'}
        </label>
        <input
          id="cf-org"
          name="organization"
          required={fixedPersona === 'Partner'}
          autoComplete="organization"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea id="cf-message" name="message" required rows={5} className={`${field} resize-y`} />
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending' || (!fixedPersona && !persona)}
          className="arrow-nudge inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-[opacity,transform] duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          {status === 'sending' ? 'Sending…' : 'Send'} <span className="arrow">→</span>
        </button>
        <p className="text-[0.85rem]">
          Or email <a href={`mailto:${CONTACT_EMAIL}`} className="link-line text-ink">{CONTACT_EMAIL}</a>
        </p>
      </div>
      {status === 'error' && (
        <p role="alert" className="text-[0.9rem] text-bronze">
          {error}
        </p>
      )}
    </form>
  )
}
