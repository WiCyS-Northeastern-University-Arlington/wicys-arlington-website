// Serverless endpoint that adds a newsletter subscriber to MailerLite.
//
// The SubscribeForm in the React app POSTs JSON ({ email, name, botField })
// here. We keep the MailerLite API key server-side so it never ships to the
// browser — set it in the Netlify dashboard under:
//   Site settings → Environment variables → MAILERLITE_API_KEY
// Optionally set MAILERLITE_GROUP_ID to drop subscribers into a specific group.
//
// MailerLite upserts by email: 201 = newly created, 200 = already existed.

interface SubscribePayload {
  email?: string
  name?: string
  botField?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed.' }, 405)
  }

  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) {
    return json({ error: 'The newsletter is not configured yet.' }, 500)
  }

  let body: SubscribePayload
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  // Honeypot: real users leave this empty. If a bot filled it, pretend success
  // so we don't reveal the trap, but never touch MailerLite.
  if (body.botField && body.botField.trim() !== '') {
    return json({ ok: true }, 200)
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const name = (body.name ?? '').trim()
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400)
  }

  const groupId = process.env.MAILERLITE_GROUP_ID
  const payload: Record<string, unknown> = {
    email,
    ...(name ? { fields: { name } } : {}),
    ...(groupId ? { groups: [groupId] } : {}),
  }

  let res: Response
  try {
    res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('MailerLite request failed', err)
    return json({ error: 'Could not reach the mail service. Please try again.' }, 502)
  }

  if (res.status === 200 || res.status === 201) {
    return json({ ok: true }, 200)
  }

  // Log MailerLite's response for debugging; keep the user-facing message generic.
  const detail = await res.text().catch(() => '')
  console.error('MailerLite error', res.status, detail)
  return json({ error: 'Could not subscribe right now. Please try again.' }, 502)
}

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
