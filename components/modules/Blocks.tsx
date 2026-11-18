import Image from 'next/image'
import Link from 'next/link'
import { Lines, Media } from './Media'
import { Ticker } from './Ticker'
import type { Person, Role } from '@/lib/data/team'

/** A page's opening: one large serif headline, optionally with a short note
 *  held to a few columns on the right. */
export function PageHero({ lines, indent, note }: { lines: React.ReactNode[]; indent?: number; note?: React.ReactNode }) {
  return (
    <header className="grid12 page-top m-gap" style={{ alignItems: 'end' }}>
      <div className="d-1-8">
        <Lines as="h1" className="t-hero" lines={lines} indent={indent} />
      </div>
      {note && (
        <p className="t-body d-9-4 fade" data-io style={{ margin: 0, '--d': 4 } as React.CSSProperties}>
          {note}
        </p>
      )}
    </header>
  )
}

/** A small grey label over one statement, held to the right half. */
export function TitleAndText({
  label,
  title,
  children,
  id,
}: {
  label?: string
  title?: string
  children?: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="grid12 section m-gap" style={{ scrollMarginTop: 120 }}>
      <div className="d-1-5">
        {label && (
          <p className="t-label fade" data-io style={{ margin: '0 0 12px' }}>
            {label}
          </p>
        )}
        {title && <Lines as="h2" className="t-h2" lines={[title]} />}
      </div>
      <div className="d-7-5">{children}</div>
    </section>
  )
}

/** A section title on its own row, above a full-width module. */
export function SectionHead({ label, title, id }: { label?: string; title: string; id?: string }) {
  return (
    <div id={id} className="grid12 section" style={{ paddingBottom: 'clamp(32px, 4vw, 64px)', scrollMarginTop: 120 }}>
      <div className="col-full">
        {label && (
          <p className="t-label fade" data-io style={{ margin: '0 0 12px' }}>
            {label}
          </p>
        )}
        <Lines as="h2" className="t-h2" lines={[title]} />
      </div>
    </div>
  )
}

/** Columns divided by thin rules: a small label on top, a huge serif number
 *  at the bottom. */
export function VerticalStats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="vstats" data-io style={{ '--n': items.length, margin: 0 } as React.CSSProperties}>
      {items.map((s, i) => {
        const m = s.value.match(/^([\d.,$]+)(.*)$/)
        return (
          <div key={s.label}>
            <dt className="t-label fade" style={{ '--d': i * 1.25 } as React.CSSProperties}>
              {s.label}
            </dt>
            <dd className="v line" style={{ margin: 0, '--i': i * 1.25 } as React.CSSProperties}>
              <span>
                {m ? m[1] : s.value}
                {m && m[2] ? <sup>{m[2].trim()}</sup> : null}
              </span>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

/** Numbered narrow columns. The hovered column widens and shows its
 *  paragraph; its neighbours narrow. The cursor reads "Hover". */
export function HoverColumns({ items }: { items: { title: string; body: React.ReactNode; top?: React.ReactNode }[] }) {
  return (
    <div className="hcols" data-cursor="Hover" data-io>
      {items.map((it, i) => (
        <div key={it.title} className="hcol">
          <div className="hcol-top">
            <span className="hcol-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="hcol-title">{it.title}</span>
            {it.top}
          </div>
          <div className="hcol-body">{it.body}</div>
        </div>
      ))}
    </div>
  )
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

function Roles({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <>
      <p className="pcard-label">{label}</p>
      <ul>
        {roles.map((r) => (
          <li key={`${r.title}-${r.org}`}>
            {r.title},{' '}
            {r.url ? (
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.org}
              </a>
            ) : (
              r.org
            )}
            {r.note && <em>{r.note}</em>}
          </li>
        ))}
      </ul>
    </>
  )
}

/** A person as a portrait card. At rest: portrait, name and title. On hover
 *  the card shows who they are, what they do now and what they did before. */
export function PersonCard({ person }: { person: Person }) {
  const more = person.summary || person.bio || person.roles?.length || person.past?.length || person.linkedin
  return (
    <article className="pcard">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="(min-width: 967px) 18vw, 45vw"
          draggable={false}
          style={{ objectPosition: person.photoPosition ?? 'center' }}
        />
      ) : (
        <span className="initials" aria-hidden="true">
          {initials(person.name)}
        </span>
      )}
      <div className="pcard-shade" />
      <div className="pcard-info">
        <h3 className="pcard-name" style={{ margin: 0, color: '#fff' }}>
          {person.name}
        </h3>
        <p className="pcard-title" style={{ margin: 0 }}>
          {person.title}
        </p>
        {more ? (
          <div className="pcard-more">
            <div>
              {(person.summary || person.bio) && <p>{person.summary ?? person.bio}</p>}
              {person.roles?.length ? <Roles label="Currently" roles={person.roles} /> : null}
              {person.past?.length ? <Roles label="Previously" roles={person.past} /> : null}
              {person.linkedin && (
                <p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

/** The closing teaser: a giant ticker running behind a centred portrait of
 *  the next case study. */
export function NextCaseStudy({ href, name, src, focus }: { href: string; name: string; src?: string; focus?: number }) {
  return (
    <Link href={href} className="next" data-cursor="View" aria-label={`Next case study: ${name}`}>
      <Ticker items={['Next case study', 'Next case study']} seconds={24} />
      <div className="next-card">
        <div>
          <Media src={src} name={name} sizes="(min-width: 967px) 30vw, 60vw" position={focus !== undefined ? `${focus}% 50%` : undefined} />
        </div>
      </div>
      <span className="next-name">{name}</span>
    </Link>
  )
}
