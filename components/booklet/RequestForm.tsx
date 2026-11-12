'use client'

import { useState } from 'react'
import { AUDIENCES, FORM_ORDER, type AudienceSlug } from '@/lib/booklets/audiences'
import { BookletPage, bookletPages } from './pages'

type Status = 'idle' | 'sending' | 'error'

/**
 * The partner interest form. Choosing who you are picks the booklet, and the
 * cover beside the form changes to match. On submit the booklet opens here;
 * the API also emails and texts the same link.
 */
export function RequestForm({ initial }: { initial?: AudienceSlug }) {
  const [audience, setAudience] = useState<AudienceSlug | null>(initial ?? null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')
  const a = audience ? AUDIENCES[audience] : null

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!audience) {
      setError('Choose who the booklet is for.')
      setStatus('error')
      return
    }
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/booklet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, audience, smsConsent: data.smsConsent === 'on' }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.url) {
        window.location.assign(json.url)
        return
      }
      setError(json.error ?? 'The form could not be sent.')
      setStatus('error')
    } catch {
      setError('The form could not be sent.')
      setStatus('error')
    }
  }

  const field =
    'w-full rounded-[14px] border border-line bg-paper px-4 py-3.5 text-[1rem] font-normal text-ink outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-faint focus:border-ink/40 focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--bronze)_18%,transparent)]'
  const label = 'mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint'
  const cover = bookletPages(AUDIENCES[audience ?? 'parents'], 'print')[0]
  const needsTitle = audience === 'founders' || audience === 'high-schools' || audience === 'universities'

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
      <form onSubmit={onSubmit} className="relative grid gap-8">
        <fieldset>
          <legend className={label}>I am a</legend>
          <div className="grid gap-2.5">
            {FORM_ORDER.map((s) => {
              const on = s === audience
              return (
                <label
                  key={s}
                  className={`cursor-pointer rounded-[16px] border p-4 transition-colors duration-300 ${on ? 'border-ink bg-panel' : 'border-line hover:border-faint'}`}
                >
                  <input
                    type="radio"
                    name="audienceChoice"
                    value={s}
                    checked={on}
                    onChange={() => setAudience(s)}
                    className="sr-only"
                  />
                  <span className="block font-serif text-[1.15rem] font-semibold leading-tight text-ink">{AUDIENCES[s].formLabel}</span>
                  <span className="mt-1 block text-[0.9rem] leading-[1.45]">{AUDIENCES[s].formLine}</span>
                </label>
              )
            })}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="bk-first" className={label}>First name</label>
            <input id="bk-first" name="firstName" required autoComplete="given-name" className={field} />
          </div>
          <div>
            <label htmlFor="bk-last" className={label}>Last name</label>
            <input id="bk-last" name="lastName" required autoComplete="family-name" className={field} />
          </div>
          <div>
            <label htmlFor="bk-email" className={label}>Email</label>
            <input id="bk-email" name="email" type="email" required autoComplete="email" className={field} />
          </div>
          <div>
            <label htmlFor="bk-phone" className={label}>Mobile phone</label>
            <input
              id="bk-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={field}
            />
          </div>
          {a?.orgLabel && (
            <div>
              <label htmlFor="bk-org" className={label}>{a.orgLabel}</label>
              <input id="bk-org" name="org" autoComplete="organization" className={field} />
            </div>
          )}
          {needsTitle && (
            <div>
              <label htmlFor="bk-role" className={label}>Title</label>
              <input id="bk-role" name="role" autoComplete="organization-title" className={field} />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="bk-message" className={label}>Anything we should know (optional)</label>
          <textarea id="bk-message" name="message" rows={3} className={`${field} resize-y`} />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-[0.92rem] leading-[1.5]">
          <input
            type="checkbox"
            name="smsConsent"
            disabled={!phone.trim()}
            className="mt-[0.3em] h-4 w-4 shrink-0 accent-[var(--bronze)] disabled:opacity-40"
          />
          <span className={phone.trim() ? '' : 'opacity-50'}>
            Text the booklet link to my mobile number. One message from West Ventures; reply STOP to opt out. Message and
            data rates may apply.
          </span>
        </label>

        {/* Honeypot: hidden from people, filled by bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="bk-website-hp">Website</label>
          <input id="bk-website-hp" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-[0.95rem] font-medium text-paper transition-[opacity,transform] duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'sending' ? 'Sending…' : 'Submit and open the booklet'}
          </button>
          <span className="text-[0.88rem] text-faint">The booklet opens here and is sent to your email.</span>
        </div>
        {status === 'error' && (
          <p role="alert" className="text-[0.9rem] text-bronze">
            {error}
          </p>
        )}
      </form>

      {/* Live cover */}
      <aside className="hidden lg:block">
        <div className="sticky top-32">
          <div
            className="bk overflow-hidden rounded-[3px] shadow-[0_40px_80px_-40px_rgba(0,0,0,.55),0_10px_24px_-14px_rgba(0,0,0,.4)]"
            style={{ ['--u' as string]: `${400 / 680}px`, width: 400, height: (880 * 400) / 680 }}
          >
            <div key={audience ?? 'none'} className="bk-fade">
              <BookletPage ctx={cover} />
            </div>
          </div>
          <p className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">
            {a ? `Info Booklet ${a.title.toLowerCase()}` : 'Choose who you are to see your booklet'}
          </p>
        </div>
      </aside>
    </div>
  )
}
