import { useState } from 'react'
import type { FormEvent } from 'react'
import Button from '../ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/** URL-encode a form body for the Netlify Forms endpoint. */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

/**
 * Email signup that posts to Netlify Forms (form name "newsletter", which is
 * registered as a hidden static form in index.html so Netlify detects it).
 * Submissions appear in the Netlify dashboard under Forms; from there you can
 * forward them to Mailchimp/email. Works only on the deployed Netlify site —
 * in local dev the POST 404s and we surface a friendly note.
 */
export default function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'newsletter', name, email, 'bot-field': '' }),
      })
      if (!res.ok) throw new Error(`Bad status ${res.status}`)
      setStatus('success')
      setEmail('')
      setName('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass rounded-2xl border-wicys-green-400/30 bg-wicys-green-400/10 p-6 text-center">
        <p className="text-lg font-semibold text-wicys-green-200">You're on the list! 💜</p>
        <p className="mt-1 text-sm text-cream/70">
          Watch your inbox for our next issue on cyber events and policy.
        </p>
      </div>
    )
  }

  return (
    <form
      name="newsletter"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full"
    >
      {/* Netlify hidden inputs */}
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      <div className={compact ? 'flex flex-col gap-3 sm:flex-row' : 'grid gap-3 sm:grid-cols-2'}>
        {!compact && (
          <input
            type="text"
            name="name"
            aria-label="Your name"
            placeholder="First name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-wicys-green-400/50 focus:outline-none focus:ring-2 focus:ring-wicys-green-400/30"
          />
        )}
        <input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="you@northeastern.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-wicys-green-400/50 focus:outline-none focus:ring-2 focus:ring-wicys-green-400/30"
        />
        <Button type="submit" onClick={() => {}} className={compact ? 'shrink-0' : 'sm:col-span-2'}>
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </Button>
      </div>

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-300">
          Something went wrong. (Note: the subscribe form only works on the deployed Netlify
          site, not in local dev.) Please try again or email {''}
          <a href="mailto:nuwicys@northeastern.edu" className="underline">
            us
          </a>
          .
        </p>
      )}
    </form>
  )
}
