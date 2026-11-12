import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { isAudience, type AudienceSlug } from './audiences'

/**
 * Signed access links for the booklets.
 *
 * Each person who submits the form gets their own link. The token carries the
 * booklet, the person's first name and an expiry, signed with BOOKLET_SECRET
 * (Vercel → Project → Settings → Environment Variables). Nothing is stored;
 * a link is valid if its signature checks out and it has not expired.
 */

const DAYS = 180

export interface Access {
  a: AudienceSlug
  /** First name, for the greeting. */
  n: string
  /** Expiry, ms since epoch. */
  x: number
  /** Random id, so two links for the same person differ. */
  i: string
}

function secret(): string | null {
  const s = process.env.BOOKLET_SECRET
  if (s) return s
  return process.env.NODE_ENV === 'production' ? null : 'dev-only-booklet-secret'
}

export const accessConfigured = () => secret() !== null

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url')

export function signAccess(audience: AudienceSlug, firstName: string): string | null {
  const key = secret()
  if (!key) return null
  const body: Access = { a: audience, n: firstName.slice(0, 40), x: Date.now() + DAYS * 864e5, i: randomBytes(4).toString('hex') }
  const payload = b64(JSON.stringify(body))
  const sig = b64(createHmac('sha256', key).update(payload).digest())
  return `${payload}.${sig}`
}

export function verifyAccess(token: string | undefined | null): Access | null {
  const key = secret()
  if (!key || !token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  const want = createHmac('sha256', key).update(payload).digest()
  const got = Buffer.from(sig, 'base64url')
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null
  try {
    const body = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Access
    if (!isAudience(body.a) || typeof body.x !== 'number' || body.x < Date.now()) return null
    return body
  } catch {
    return null
  }
}
