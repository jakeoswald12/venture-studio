'use client'

import { useState } from 'react'
import { ContactForm } from './ContactForm'
import { PACKETS, PERSONAS, PERSONA_LABELS, type Persona } from '@/lib/contact'

/**
 * The Info Packet page body: the inquiry form on the right, and on the left
 * the packet that goes with the visitor's answer to "I am a…". Before they
 * answer, the left side lists every packet.
 */
export function InfoPacket() {
  const [persona, setPersona] = useState<Persona | null>(null)
  const packet = persona ? PACKETS[persona] : null

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">
          {packet ? 'Your packet' : 'Packets'}
        </p>
        {packet ? (
          <div key={persona} className="page-enter rounded-[22px] bg-panel p-7 sm:p-8">
            <h2 className="text-[1.8rem] leading-tight">{packet.title}</h2>
            <ol className="mt-6">
              {packet.contents.map((line, i) => (
                <li key={line} className="flex items-baseline gap-4 border-t border-line py-3 text-[0.98rem] text-ink/85">
                  <span className="font-mono text-[0.68rem] tracking-[0.1em] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  {line}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.9rem]">Sent by email after you submit the inquiry.</p>
          </div>
        ) : (
          <ul className="border-t border-line">
            {PERSONAS.map((p) => (
              <li key={p} className="flex items-baseline justify-between gap-6 border-b border-line py-3">
                <span className="font-serif text-[1.15rem] font-semibold text-ink">{PACKETS[p].title}</span>
                <span className="text-right text-[0.85rem]">{PERSONA_LABELS[p]}</span>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <div>
        <ContactForm onPersonaChange={setPersona} />
      </div>
    </div>
  )
}
