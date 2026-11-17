/** One giant line of sans text that loops sideways forever. The text is
 *  doubled to fill the width; the copy is hidden from assistive technology. */
export function Ticker({ items, seconds = 40 }: { items: string[]; seconds?: number }) {
  const run = (hidden?: boolean) => (
    <span aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i}>{t} •</span>
      ))}
    </span>
  )
  return (
    <div className="ticker" style={{ '--dur': `${seconds}s` } as React.CSSProperties}>
      <div>
        {run()}
        {run(true)}
      </div>
    </div>
  )
}
