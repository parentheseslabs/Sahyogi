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
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
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
          <div class="logo">Sahyogi</div>
          <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new inquiry from your website</p>
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
            <div class="field-label">Message</div>
            <div class="field-value" style="white-space: pre-wrap; line-height: 1.8;">${message}</div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Sahyogi Contact Form</strong></p>
          <p>This email was sent automatically from your website contact form.</p>
          <p style="color: #2ec4f1; font-weight: 600;">Empowering SMEs with AI-driven WhatsApp automation</p>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      New Contact Form Submission - Sahyogi
      
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      
      Message:
      ${message}
      
      ---
      This email was sent from your website contact form.
    `;

    // Email options
    const mailOptions = {
      from: `"Sahyogi Website" <${SMTP_USER}>`,
      to: RECIPIENTS.join(', '),
      subject: `New Contact Form Submission from ${name}`,
      text: textContent,
      html: htmlContent,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
