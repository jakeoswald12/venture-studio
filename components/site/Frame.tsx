/**
 * The page frame: the same outer padding and 1600px width as the homepage
 * hero video frame. The ventures wall, the partners and team grids, and their
 * section titles all sit inside it, so their left edges line up with the hero.
 */
export const FRAME_PAD = 'px-[max(15px,env(safe-area-inset-left))] sm:px-[21px]'

export function Frame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${FRAME_PAD} ${className}`}>
      <div className="mx-auto w-full max-w-[1600px]">{children}</div>
    </div>
  )
}

/** The tile grid shared by the ventures wall, partners and team. */
export const TILE_GRID = 'grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7'
