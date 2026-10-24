'use client'

import { useEffect } from 'react'

interface HubSpotFormEmbedProps {
  portalId: string
  formId: string
  region?: string
}

/**
 * Renders a HubSpot form using HubSpot's current embed loader:
 *   <script src="https://js.hsforms.net/forms/embed/{portalId}.js" defer></script>
 *   <div class="hs-form-frame" data-region data-form-id data-portal-id></div>
 *
 * The loader script auto-detects `.hs-form-frame` elements (including ones added
 * after load) and renders the form into them. Use this for forms built in the
 * newer HubSpot forms editor, which don't reliably render via hbspt.forms.create.
 */
export function HubSpotFormEmbed({ portalId, formId, region = 'na1' }: HubSpotFormEmbedProps) {
  useEffect(() => {
    const src = `https://js.hsforms.net/forms/embed/${portalId}.js`
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script')
      script.src = src
      script.defer = true
      document.body.appendChild(script)
    }
  }, [portalId])

  return (
    <div
      className="hs-form-frame"
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  )
}
