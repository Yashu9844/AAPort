import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const event = await request.json();

    // Listen for email sent events
    if (event.type === 'email.sent') {
      const { to, subject, from } = event.data;

      // Forward the email data to your Gmail via Resend
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'zubair7035@gmail.com',
        subject: `[FORWARDED] ${subject}`,
        html: `
          <p><strong>Email forwarded from your contact form</strong></p>
          <p><strong>From:</strong> ${from}</p>
          <p><strong>To:</strong> ${to}</p>
          <p><strong>Original Subject:</strong> ${subject}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
