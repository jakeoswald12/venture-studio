import Image from 'next/image'
import type { PortfolioCompany } from '@/lib/data/portfolio-directory'
import { monogram } from '@/components/portfolio/directory/PortfolioBits'

const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src)

/**
 * A venture's artwork, filling its parent. Ventures with no artwork yet get a
 * panel carrying their monogram, so the layout holds until the image exists.
 */
export function WorkArt({ company, sizes, priority = false }: { company: PortfolioCompany; sizes: string; priority?: boolean }) {
  if (!company.tile) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-card">
        <span className="font-serif text-[clamp(4rem,12vw,11rem)] font-semibold italic leading-none text-ink/15">
          {monogram(company.name)}
        </span>
      </div>
    )
  }
  if (isVideo(company.tile)) {
    return <video src={company.tile} muted loop autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />
  }
  return (
    <Image
      src={company.tile}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      style={{ objectPosition: `${company.tileFocus ?? 50}% 50%` }}
    />
  )
}
