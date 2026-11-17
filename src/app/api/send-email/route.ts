import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { profile } from '@/lib/site';

// Env:
//   RESEND_API_KEY      required
//   CONTACT_TO_EMAIL    inbox that receives messages (defaults to the public profile email)
//   CONTACT_FROM_EMAIL  sender on a Resend-verified domain, e.g. "Portfolio <hello@yourdomain.com>".
//                       The default onboarding@resend.dev only delivers to the Resend account owner.
const TO = process.env.CONTACT_TO_EMAIL ?? profile.email;
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>';

const MAX = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance rate limit (serverless instances don't share memory).
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// The footer form sends rich text from a contentEditable. Escape everything, then
// restore only bare formatting tags (no attributes), so no markup can be injected.
const toSafeHtml = (s: string) =>
  escapeHtml(s).replace(/&lt;(\/?)(b|strong|i|em|u|br|p|div|ul|ol|li)\s*\/?&gt;/gi, '<$1$2>');

const stripTags = (s: string) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "website" field. Pretend success for bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !stripTags(message)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('send-email: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 });
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Portfolio contact from ${stripTags(name)}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${stripTags(message.replace(/<br\s*\/?>|<\/(p|div|li)>/gi, '\n'))}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; word-wrap: break-word;">${toSafeHtml(message)}</div>
        </div>
        <p style="color: #999; font-size: 12px;">Sent from the portfolio contact form. Reply directly to respond.</p>
      </div>
    `,
  });

  if (error) {
    console.error('send-email: Resend error', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
  }

  return NextResponse.json({ success: true, message: "Email sent successfully! I'll get back to you soon." });
}
