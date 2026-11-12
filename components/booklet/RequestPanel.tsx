import { Frame } from '@/components/site/Frame'
import type { AudienceSlug } from '@/lib/booklets/audiences'
import { RequestForm } from './RequestForm'

/** The interest form page body, also shown when a booklet link is missing or expired. */
export function RequestPanel({ initial, notice }: { initial?: AudienceSlug; notice?: string }) {
  return (
    <main>
      <Frame className="pb-10 pt-[calc(108px+env(safe-area-inset-top))] sm:pt-[132px]">
        <div className="max-w-[760px]">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">Partner interest · Info Booklet</p>
          <h1 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02]">Want to be a partner?</h1>
          <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-[1.7]">
            Submit this interest form and the studio will get back to you soon. In the meantime, we will send you an info
            booklet written for you: how the program works, what is expected of everyone involved, and what comes of it.
            It opens here as soon as you submit, and a copy goes to your email and phone.
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
