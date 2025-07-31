const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing Gmail SMTP configuration...');
  console.log('GMAIL_EMAIL:', process.env.GMAIL_EMAIL);
  console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '***configured***' : 'NOT SET');
  console.log('RECIPIENT_EMAIL_1:', process.env.RECIPIENT_EMAIL_1);
  console.log('RECIPIENT_EMAIL_2:', process.env.RECIPIENT_EMAIL_2);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Test connection
    console.log('Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Sahyogi Test" <${process.env.GMAIL_EMAIL}>`,
      to: [process.env.RECIPIENT_EMAIL_1, process.env.RECIPIENT_EMAIL_2].join(', '),
      subject: 'Test Email from Sahyogi Contact Form',
      text: 'This is a test email to verify the Gmail SMTP configuration.',
      html: '<h1>Test Email</h1><p>This is a test email to verify the Gmail SMTP configuration.</p>'
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
  }
}

testEmail();
