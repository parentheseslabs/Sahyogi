# Google reCAPTCHA Setup Guide

## Getting Started with Google reCAPTCHA

To set up Google reCAPTCHA for your website, follow these steps:

### 1. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click on the **+ (Plus)** button to create a new site
3. Fill in the form:
   - **Label**: Enter a name for your site (e.g., "Sahyogi Contact Form")
   - **reCAPTCHA type**: Select **reCAPTCHA v2** → **"I'm not a robot" Checkbox**
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - Your production domain (e.g., `sahyogi.com`)
   - Accept the reCAPTCHA Terms of Service
4. Click **Submit**

### 2. Copy Your Keys

After creating the site, you'll get two keys:
- **Site Key** (starts with `6L...`) - This is public and goes in the frontend
- **Secret Key** (starts with `6L...`) - This is private and goes in the backend

### 3. Update Environment Variables

Replace the placeholder values in your `.env.local` file:

```bash
# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
RECAPTCHA_SECRET_KEY=6LxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA
```

### 4. Test the Implementation

1. Start your development server: `npm run dev`
2. Go to your contact form
3. You should see the reCAPTCHA checkbox
4. Fill out and submit the form to test

### 5. Production Deployment

When deploying to production:
1. Make sure to add your production domain to the reCAPTCHA site configuration
2. Update the environment variables in your hosting platform
3. Test the contact form on your live site

## Features Implemented

✅ **Frontend Integration**
- reCAPTCHA widget in contact form
- Form validation with reCAPTCHA check
- Auto-reset after successful submission

✅ **Backend Verification**
- Server-side token verification with Google
- Proper error handling
- Security validation

✅ **User Experience**
- Clear error messages
- Responsive design
- Accessible implementation

## Troubleshooting

### Common Issues:

1. **"Invalid site key"** - Check that your site key is correct and the domain is registered
2. **"reCAPTCHA verification failed"** - Verify your secret key is correct
3. **Not showing on localhost** - Make sure `localhost` is added to your reCAPTCHA domains

### Development Notes:

- reCAPTCHA works on `localhost` for development
- Keys are environment-specific (dev/staging/production)
- The implementation uses reCAPTCHA v2 for better user experience
