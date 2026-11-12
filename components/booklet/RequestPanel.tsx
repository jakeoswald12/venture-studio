import { Frame } from '@/components/site/Frame'
import type { AudienceSlug } from '@/lib/booklets/audiences'
import { RequestForm } from './RequestForm'

/** The interest form page body, also shown when a booklet link is missing or expired. */
export function RequestPanel({ initial, notice }: { initial?: AudienceSlug; notice?: string }) {
  return (
    <main>
      <Frame className="pb-10 pt-[calc(108px+env(safe-area-inset-top))] sm:pt-[132px]">
        <div className="max-w-[760px]">
          <h1 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]">Get involved</h1>
          <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-[1.7]">
            Submit this interest form and we’ll get back to you shortly. In the meantime, we’ll send you an info booklet
            that explains how the program works, what it costs and what you’ll get out of it.
          </p>
          {notice && (
            <p role="status" className="mt-6 rounded-[14px] bg-panel px-5 py-4 text-[0.95rem] text-ink">
              {notice}
            </p>
          )}
        </div>
        <div className="mt-14">
          <RequestForm initial={initial} />
        </div>
      </Frame>
    </main>
  )
}
