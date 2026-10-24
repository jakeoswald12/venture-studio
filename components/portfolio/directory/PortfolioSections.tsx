import Image from 'next/image'
import { HubSpotFormEmbed } from '@/components/brand/interactive/HubSpotFormEmbed'
import { buildEntrances } from './CompanyTile'
import { AudienceTabs } from './AudienceTabs'
import { ScrollReveal } from './ScrollReveal'
import { VideoCard } from './VideoCard'
import {
  APPLY_BYLINE,
  APPLY_FORM,
  DISCIPLINES,
  ECOSYSTEM_PARTNERS,
  FOUNDER_QUOTE,
  GLOO_VIDEO,
  HIGH_SCHOOL_PLACEHOLDER,
  OVERVIEW_VIDEO_ID,
  STUDENT_BENEFITS,
  STUDENT_QUALITIES,
  type FeatureRow,
  GLOO_VIDEO_URL,
  GLOO_SPONSORED_SCHOOLS,
  PITCH_COMPETITION_PLACEHOLDER,
} from '@/lib/data/portfolio-sections'

/**
 * Everything below the tile wall on /portfolio — the /startups deck unrolled
 * into a scrolling page.
 *
 * Each beat keeps the deck's two-column read (the pitch on one side, the
 * evidence on the other) without the deck's two coloured panels: one cream
 * field throughout, with the split carried by the grid alone. The ecosystem
 * wall mirrors the portfolio wall — copy on the right, tiles stacking to the
 * left — so the page has a turn in it rather than repeating one shape twice.
 *
 * Copy lives in lib/data/portfolio-sections.ts.
 */

/* ── Text primitives ──────────────────────────────────────────────────────── */

/**
 * Renders the deck's inline emphasis: **bronze** and *italic* / _italic_.
 * Split on both markers at once so a string can carry either.
 */
function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="text-bronze">
              {part.slice(2, -2)}
            </span>
          )
        }
        if (
          (part.startsWith('*') && part.endsWith('*')) ||
          (part.startsWith('_') && part.endsWith('_'))
        ) {
          return (
            <em key={i} className="italic">
              {part.slice(1, -1)}
            </em>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

/** Deck titles carry their own line breaks; honour them above the fold width. */
function SectionTitle({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string
  className?: string
  as?: 'h2' | 'h3'
}) {
  return (
    <Tag
      className={`font-serif text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-.015em] text-navy-accent text-balance ${className}`}
    >
      {text.split('\n').map((line, i) => (
        <span key={i} className="block">
          <Emphasis text={line} />
        </span>
      ))}
    </Tag>
  )
}

function Lede({ text, className = 'mt-4' }: { text: string; className?: string }) {
  return (
    <p className={`max-w-[56ch] text-[15.5px] leading-[1.68] text-navy-accent/80 ${className}`}>
      <Emphasis text={text} />
    </p>
  )
}

function ApplyButton({ label = 'Apply Now', href = '#apply' }: { label?: string; href?: string }) {
  const external = href.startsWith('http')
  const className =
    'mt-7 inline-flex w-fit items-center justify-center rounded-full bg-bronze px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[.2em] text-paper transition-[background-color,transform] duration-300 hover:bg-bronze/90 active:scale-[.98]'
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  ) : (
    <a href={href} className={className}>
      {label}
    </a>
  )
}

/** Two-line rows — the discipline index and the student benefits. */
function FeatureList({
  rows,
  label,
  className = '',
}: {
  rows: FeatureRow[]
  label?: string
  className?: string
}) {
  return (
    <div className={className}>
      {label && (
        <p className="mb-3 border-b border-border pb-2 text-[10.5px] font-medium uppercase tracking-[.16em] text-muted-foreground">
          {label}
        </p>
      )}
      <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-border/60 py-3">
            <dt className="text-[13.5px] font-medium text-navy-accent">{row.label}</dt>
            <dd className="mt-0.5 text-[12.5px] leading-[1.5] text-muted-foreground">
              {row.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** A section band. Spacing alone separates the beats — no rules; the page is
 *  one continuous cream field and a hairline every screenful reads as a form,
 *  not a story. With nothing drawn between them, the gap has to be big enough
 *  to do the separating on its own. */
function Band({
  id,
  children,
  className = 'py-24 md:py-36',
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}

/* ── Beats ────────────────────────────────────────────────────────────────── */

/**
 * The overview film, on its own. The copy that used to sit beside it now opens
 * the page above the tile wall, so this beat is a single centred frame — the
 * pause between the work and the pitch.
 */
function WhatIsIt() {
  return (
    <Band>
      <div className="mx-auto max-w-[62rem]">
        <VideoCard videoId={OVERVIEW_VIDEO_ID} title="Overview of the studio" />
      </div>
    </Band>
  )
}

function TheOffer() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div className="flex flex-col items-start">
        <SectionTitle text={'What founders **get.**'} />
        <Lede text="A student team works on your project for a full semester. There is no fee. You keep all of the equity and intellectual property. The students earn course credit for the work." />
      </div>
      <FeatureList rows={DISCIPLINES} />
    </div>
  )
}

/**
 * The bridge between the two audience pitches: what a founder is actually
 * getting. The offer beat before it is about cost; this one is about calibre.
 */
function GradeATalent() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div className="flex flex-col items-start">
        <SectionTitle text={'Who the **students** are.'} />
        <Lede text="Students are recruited from Christian high schools across the country and enroll at Austin Christian University. Over four years they contribute to projects, then lead them." />
      </div>
      <FeatureList rows={STUDENT_QUALITIES} />
    </div>
  )
}

/**
 * The founder quote, standing on its own — centred, set at heading scale, no
 * rule beside it. It was a footnote in the column beside the offer; given the
 * width of the page it carries the whole beat.
 */
function FounderVoice() {
  return (
    <Band className="pb-24 pt-8 md:pb-36 md:pt-12">
      <figure className="mx-auto flex max-w-[58rem] flex-col items-center text-center">
        <blockquote>
          <p className="font-serif text-[clamp(1.35rem,2.5vw,1.95rem)] font-normal italic leading-[1.34] tracking-[-.012em] text-navy-accent text-balance">
            “{FOUNDER_QUOTE.quote}”
          </p>
        </blockquote>
        <figcaption className="mt-7 text-[12.5px] text-muted-foreground">
          <span className="font-medium text-navy-accent">{FOUNDER_QUOTE.name}</span>
          <span className="mt-0.5 block">{FOUNDER_QUOTE.title}</span>
        </figcaption>
      </figure>
    </Band>
  )
}

function LearningByDoing() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div className="flex flex-col items-start">
        <SectionTitle text={'What students **get.**'} />
        <Lede text="Students work on real companies with experienced founders and earn course credit for each semester on a project." />
      </div>
      <FeatureList rows={STUDENT_BENEFITS} />
    </div>
  )
}

/**
 * The ecosystem wall — the portfolio grid, mirrored. The copy sits in the
 * right-hand columns and the tiles stack in from the left, so the page turns
 * instead of repeating the same composition.
 *
 * These tiles carry only a name, bottom-left: they are organisations, not
 * projects, so there is no case study to open and nothing to say on hover.
 */
/**
 * The `sizes` hint for one partner tile.
 *
 * These tiles are square but the sources are landscape, and `object-cover`
 * scales an image until its HEIGHT fills the box — so a 2.5:1 photo renders 2.5
 * tiles wide and is cropped either side. Describing the tile width alone (~14vw
 * at the widest breakpoint) makes the browser fetch a rendition sized for a
 * fraction of what actually gets painted, which is exactly how a sharp source
 * ends up looking soft. Scale the hint by the source's aspect instead.
 */
function partnerSizes(aspect = 1): string {
  const factor = Math.max(1, aspect)
  const round = (n: number) => Math.min(100, Math.ceil(n))
  return [
    `(min-width:1280px) ${round(14 * factor)}vw`,
    `(min-width:1024px) ${round(19 * factor)}vw`,
    `(min-width:640px) ${round(32 * factor)}vw`,
    `${round(92 * factor)}vw`,
  ].join(', ')
}

/** Same staggered rise the portfolio wall uses, worked out once for the
 *  partner tiles; ScrollReveal decides when it plays. */
const PARTNER_ENTRANCES = buildEntrances(ECOSYSTEM_PARTNERS.map((p) => p.name))

function Ecosystem() {
  return (
    <Band>
      <ScrollReveal className="grid grid-cols-1 gap-2.5 [grid-auto-flow:dense] sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
        {/* The wall steps in from the left against the copy: two tiles on the
            first row, three on the second, full seven-wide rows after that.
            One spacer holds the remaining cell of the first row — only at the
            7-column width, where there are cells to spare. */}
        <span
          aria-hidden="true"
          className="hidden xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:block"
        />

        {/* Centred as a block inside the columns it occupies — left-aligned
            text, but the group sits in the middle of the space rather than
            hugging an edge. Matches the copy on the portfolio wall. */}
        <div className="col-span-1 flex flex-col justify-center py-8 sm:col-span-3 lg:row-span-2 xl:col-span-4 xl:col-start-4 xl:row-span-2 xl:row-start-1">
          <div className="mx-auto flex w-full max-w-[38rem] flex-col items-start [&_p]:max-w-[33rem]">
            <SectionTitle text="Network" />
            <Lede text="Investors, studios, foundations and organizations that founders and students in the studio work with." />
          </div>
        </div>

        {ECOSYSTEM_PARTNERS.map((partner, index) => (
          <a
            key={partner.name}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            style={
              {
                '--tile-delay': `${PARTNER_ENTRANCES[index].delay.toFixed(3)}s`,
                '--tile-duration': `${PARTNER_ENTRANCES[index].duration.toFixed(3)}s`,
                '--tile-rise': `${PARTNER_ENTRANCES[index].rise.toFixed(1)}px`,
              } as React.CSSProperties
            }
            className="portfolio-tile group relative block aspect-square self-start overflow-hidden rounded-[7px] bg-[#1b1a17] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
          >
            {partner.image ? (
              <Image
                src={partner.image}
                alt=""
                fill
                quality={82}
                sizes={partnerSizes(partner.aspect)}
                style={{ objectPosition: partner.objectPosition ?? 'center' }}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              /* No artwork yet — a plain navy plate carrying the name, so the
                 wall stays flush instead of showing a hole. */
              <span className="absolute inset-0 grid place-items-center bg-[#1b1a17] px-3 text-center font-serif text-[15px] font-medium leading-tight text-[#f7f5f0]">
                {partner.name}
              </span>
            )}

            {/* At rest the tile is only the photograph. On hover a navy wash
                lifts the whole tile and a gradient anchors the name, so the
                text pops without flattening the image the rest of the time. */}
            {partner.image && (
              <>
                <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45 group-focus-visible:bg-black/45" />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-3 text-[12.5px] font-medium leading-tight text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {partner.name}
                </span>
              </>
            )}
          </a>
        ))}
      </ScrollReveal>
    </Band>
  )
}

/** Copy on the left, one piece of media on the right — the shape every
 *  high-school path shares, so switching tabs only changes the content. */
function PathPanel({
  lede,
  cta,
  media,
}: {
  lede: string
  cta: { label: string; href: string }
  media: React.ReactNode
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-16">
      <div className="flex flex-col items-start">
        <Lede className="mt-0" text={lede} />
        <ApplyButton label={cta.label} href={cta.href} />
      </div>
      {media}
    </div>
  )
}

function BuilderScholarPath() {
  return (
    <PathPanel
      lede="Builder Scholars are high school students who join studio project teams and earn college credit for the work. A teacher, counselor or principal nominates them. Each school may nominate up to three students per academic year."
      cta={{ label: 'Nominate a student', href: 'https://www.austinchristianuniversity.org/builderscholars' }}
      media={
        <figure>
          <a
            href={HIGH_SCHOOL_PLACEHOLDER.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video overflow-hidden rounded-[7px] bg-[#1b1a17]"
          >
            <Image
              src={HIGH_SCHOOL_PLACEHOLDER.image}
              alt={HIGH_SCHOOL_PLACEHOLDER.name}
              fill
              sizes="(min-width:768px) 46vw, 92vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 text-[13.5px] font-medium text-white">
              {HIGH_SCHOOL_PLACEHOLDER.name}
            </span>
          </a>
        </figure>
      }
    />
  )
}

function GlooPath() {
  return (
    <PathPanel
      lede={`Each fall, Austin Christian University sends a team to the Gloo AI Hackathon in Boulder, Colorado. ACU teams won first place in 2025, with a $100,000 prize, and again in 2026. ACU also sponsors ${GLOO_SPONSORED_SCHOOLS} high schools each year to enter teams of their own.`}
      cta={{ label: '2025 recap video', href: GLOO_VIDEO_URL }}
      media={
        <div className="overflow-hidden rounded-[7px] border border-bronze/30 shadow-[0_22px_50px_-28px_rgba(0,0,0,0.55)]">
          <iframe
            className="aspect-video w-full"
            src={`https://player.vimeo.com/video/${GLOO_VIDEO.id}?h=${GLOO_VIDEO.hash}`}
            title="Gloo Hackathon recap"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      }
    />
  )
}

function PitchCompetitionPath() {
  return (
    <PathPanel
      lede="Each spring, high school teams pitch a venture of their own at Austin Christian University. The school forms and coaches the team. ACU provides the venue, the judges and the prize money."
      cta={{ label: 'Competition details', href: 'https://www.austinchristianuniversity.org/pitch' }}
      media={
        <div className="relative aspect-video overflow-hidden rounded-[7px] bg-[#1b1a17]">
          <Image
            src={PITCH_COMPETITION_PLACEHOLDER.image}
            alt={PITCH_COMPETITION_PLACEHOLDER.alt}
            fill
            sizes="(min-width:768px) 46vw, 92vw"
            className="object-cover"
          />
        </div>
      }
    />
  )
}

/**
 * The three ways a high school gets involved, merged into one tabbed beat.
 * Every path here is started by an adult at the school — a team is assembled
 * and coached, or a student is nominated — so the copy addresses the teacher,
 * counselor, or principal reading it rather than the student.
 */
function HighSchool() {
  return (
    <Band id="high-school">
      <div className="mx-auto w-full max-w-[64rem]">
        <SectionTitle text={'For **high schools**'} />
      </div>
      <AudienceTabs
        className="mt-12 md:mt-16"
        label="Ways a high school can get involved"
        tabs={[
          { id: 'scholars', label: 'Builder Scholars', content: <BuilderScholarPath /> },
          { id: 'gloo', label: 'Gloo Hackathon', content: <GlooPath /> },
          { id: 'pitch', label: 'Pitch Competition', content: <PitchCompetitionPath /> },
        ]}
      />
    </Band>
  )
}

function Apply() {
  return (
    <Band id="apply">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col items-start">
          <SectionTitle text="Contact" />
          <Lede text="Founders, students and schools can use this form to contact the studio." />

          <div className="mt-10 flex items-center gap-3.5">
            <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-bronze/40">
              <Image
                src={APPLY_BYLINE.photo}
                alt={APPLY_BYLINE.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </span>
            <span>
              <span className="block text-[13.5px] font-medium text-navy-accent">
                {APPLY_BYLINE.name}
              </span>
              <span className="block text-[12px] text-muted-foreground">{APPLY_BYLINE.title}</span>
              <a
                href={APPLY_BYLINE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-block text-[12px] text-bronze hover:underline"
              >
                LinkedIn
              </a>
            </span>
          </div>
        </div>
        <div className="rounded-[7px] border border-border bg-[#fbfaf7] p-6">
          <HubSpotFormEmbed
            portalId={APPLY_FORM.portalId}
            formId={APPLY_FORM.formId}
            region={APPLY_FORM.region}
          />
        </div>
      </div>
    </Band>
  )
}

export function PortfolioSections() {
  return (
    <>
      <Band>
        <AudienceTabs
          label="Who the studio is for"
          tabs={[
            { id: 'founders', label: 'For founders', content: <TheOffer /> },
            {
              id: 'executives',
              label: 'For executives',
              content: <GradeATalent />,
            },
            {
              id: 'students',
              label: 'For students',
              content: <LearningByDoing />,
            },
          ]}
        />
      </Band>
      <WhatIsIt />
      <FounderVoice />
      <Ecosystem />
      <HighSchool />
      <Apply />
    </>
  )
}
