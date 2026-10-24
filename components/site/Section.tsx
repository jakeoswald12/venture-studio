/**
 * Layout primitives shared by the home, ventures and thesis pages.
 */

export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1320px] pl-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))] sm:px-8 ${className}`}
    >
      {children}
    </div>
  )
}

/** Small mono label: section numbers and field names. */
export function Label({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`font-mono text-[0.7rem] font-normal uppercase tracking-[0.16em] text-faint ${className}`}
    >
      {children}
    </p>
  )
}

/** A page's opening block: label, title, one paragraph. */
export function PageIntro({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <Container className="pt-[calc(140px+env(safe-area-inset-top))] pb-16 sm:pt-[180px] sm:pb-24">
      <Label className="mb-6" >
        <span data-reveal-item style={{ '--d': 0 } as React.CSSProperties} className="inline-block">
          {label}
        </span>
      </Label>
      <h1
        data-reveal-item
        style={{ '--d': 1 } as React.CSSProperties}
        className="max-w-[16ch] text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.98]"
      >
        {title}
      </h1>
      {children && (
        <div
          data-reveal-item
          style={{ '--d': 2 } as React.CSSProperties}
          className="mt-8 max-w-[58ch] text-[clamp(1.02rem,1.3vw,1.15rem)] leading-[1.65]"
        >
          {children}
        </div>
      )}
    </Container>
  )
}

/** Thin rule that draws itself in when it scrolls into view. */
export function Rule({ className = '' }: { className?: string }) {
  return (
    <div data-reveal-item className={`h-px w-full overflow-hidden ${className}`}>
      <div className="rule-draw h-px w-full bg-line" />
    </div>
  )
}
