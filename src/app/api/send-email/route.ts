import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json();

    // Validate inputs
    if (!email || !name || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to Resend test inbox (viewable in dashboard)
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev', // Test inbox - view in Resend dashboard
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; word-wrap: break-word;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Email sent successfully! I\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
