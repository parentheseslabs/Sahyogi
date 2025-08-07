import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Gmail SMTP configuration
const SMTP_SERVER = "smtp.gmail.com";
const SMTP_PORT = 587;
const SMTP_USER = process.env.GMAIL_EMAIL;
const SMTP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

// Recipients (your Outlook email addresses)
const RECIPIENTS = [
  process.env.RECIPIENT_EMAIL_1 || "first-author@outlook.com",
  process.env.RECIPIENT_EMAIL_2 || "second-author@outlook.com"
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token (only if configured)
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification is required' },
          { status: 400 }
        );
      }

      // Verify reCAPTCHA with Google
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      });

      const recaptchaResult = await recaptchaResponse.json();

      if (!recaptchaResult.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        );
      }
    }

    // Create transporter with updated Gmail configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: SMTP_SERVER,
      port: SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
          }
          .header { 
            background: linear-gradient(135deg, #1a355e 0%, #2ec4f1 100%); 
            color: white; 
            padding: 30px; 
            border-radius: 10px 10px 0 0; 
            text-align: center;
          }
          .content { 
            background: #f8f9fa; 
            padding: 30px; 
            border-radius: 0 0 10px 10px; 
            border: 1px solid #e9ecef;
          }
          .field { 
            margin-bottom: 20px; 
            padding: 15px; 
            background: white; 
            border-radius: 8px; 
            border-left: 4px solid #2ec4f1;
          }
          .field-label { 
            font-weight: bold; 
            color: #1a355e; 
            margin-bottom: 5px; 
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .field-value { 
            color: #495057; 
            font-size: 16px;
          }
          .message-field { 
            border-left-color: #25D366;
          }
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding: 20px; 
            color: #6c757d; 
            font-size: 14px;
          }
          .logo { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🤝 Sahyogi</div>
          <h1 style="margin: 0; font-size: 24px;">New Customer Inquiry</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 14px;">
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #2ec4f1; text-decoration: none;">${email}</a>
            </div>
          </div>
          
          ${phone ? `
          <div class="field">
            <div class="field-label">Mobile Number</div>
            <div class="field-value">
              <a href="tel:${phone}" style="color: #2ec4f1; text-decoration: none;">${phone}</a>
            </div>
          </div>
          ` : ''}
          
          <div class="field message-field">
            <div class="field-label">Customer Inquiry</div>
            <div class="field-value" style="white-space: pre-wrap; line-height: 1.8;">${message}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Sahyogi Customer Contact System</strong></p>
          <p>📧 To reply to this customer, use: <a href="mailto:${email}" style="color: #2ec4f1;">${email}</a></p>
          <p style="color: #2ec4f1; font-weight: 600;">🚀 Empowering SMEs with AI-driven WhatsApp automation</p>
          <p style="font-size: 12px; color: #999;">This email was automatically generated from your website contact form.</p>
        </div>
      </body>
      </html>
    `;

    const textContent = `
SAHYOGI CONTACT FORM SUBMISSION
${new Date().toLocaleString()}

Customer Details:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Inquiry:
${message}

---
This message was sent via the Sahyogi website contact form.
To reply directly to the customer, use: ${email}

Sahyogi - Empowering SMEs with AI-driven WhatsApp automation
Website: https://sahyogi.io
    `;

    // Email options with improved deliverability
    const mailOptions = {
      from: `"Sahyogi Contact Form" <${SMTP_USER}>`,
      to: RECIPIENTS.join(', '),
      subject: `[Sahyogi] Contact Form: ${name} - ${new Date().toLocaleDateString()}`,
      text: textContent,
      html: htmlContent,
      replyTo: email,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'X-Mailer': 'Sahyogi Contact System',
        'X-Auto-Response-Suppress': 'All',
        'List-Unsubscribe': '<mailto:noreply@sahyogi.io>',
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@sahyogi.contact>`
      }
    };

    // Send email
    console.log('Attempting to send email with config:', {
      from: `"Sahyogi Website" <${SMTP_USER}>`,
      to: RECIPIENTS.join(', '),
      subject: `New Contact Form Submission from ${name}`
    });
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorCode = error instanceof Error && 'code' in error ? (error as any).code : undefined;
    const errorCommand = error instanceof Error && 'command' in error ? (error as any).command : undefined;
    
    console.error('Detailed error sending email:', {
      error: errorMessage,
      code: errorCode,
      command: errorCommand,
      fullError: error
    });
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again.',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
