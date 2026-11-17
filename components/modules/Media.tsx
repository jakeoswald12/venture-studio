import Image from 'next/image'
import { tint } from '@/lib/site'

/**
 * A venture's artwork, or a tinted placeholder panel with its name when there
 * is none yet. Fills its positioned parent.
 */
export function Media({
  src,
  name,
  sizes = '100vw',
  position,
  priority,
}: {
  src?: string
  name: string
  sizes?: string
  position?: string
  priority?: boolean
}) {
  if (!src) {
    return (
      <div className="ph" style={{ '--ph': tint(name) } as React.CSSProperties} aria-hidden="true">
        {name}
      </div>
    )
  }
  if (/\.(mp4|webm)$/.test(src)) {
    return <video src={src} muted loop autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: 'cover', objectPosition: position }}
    />
  )
}

/** Media in a clipped box that opens with a mask reveal when it scrolls in. */
export function Mask({
  children,
  className = '',
  style,
  from,
  d,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  from?: 'top'
  d?: number
}) {
  return (
    <div className={`mask ${className}`} data-io data-from={from} style={{ ...style, ...(d ? ({ '--d': d } as React.CSSProperties) : null) }}>
      <div className="mask-in">{children}</div>
    </div>
  )
}

/** A headline whose lines slide up from behind a mask. */
export function Lines({
  as: Tag = 'h2',
  lines,
  className = '',
  indent,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p'
  lines: React.ReactNode[]
  className?: string
  /** Index of a line to indent, as the reference does on two-line heroes. */
  indent?: number
}) {
  return (
    <Tag className={`serif ${className}`} data-io style={{ margin: 0 }}>
      {lines.map((l, i) => (
        <span key={i} className="line" style={{ '--i': i * 1.5 } as React.CSSProperties}>
          <span style={indent === i ? { paddingLeft: 'clamp(40px, 13vw, 200px)' } : undefined}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}

export const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className="arr" width="12" height="12">
    <path d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11" />
  </svg>
)
